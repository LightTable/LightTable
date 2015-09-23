(ns lt.objs.clients.devtools
  "Provide devtools client for interacting with Chromium's remote debugging
  protocol - https://developer.chrome.com/devtools/docs/debugger-protocol"
  (:refer-clojure :exclude [send])
  (:require [cljs.reader :as reader]
            [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.console :as console]
            [lt.objs.app :as app]
            [lt.objs.clients :as clients]
            [fetch.core :as fetch]
            [crate.core :as crate]
            [lt.util.dom :as dom]
            [lt.util.js :refer [every wait ->clj]]
            [lt.util.ipc :as ipc]
            [crate.binding :refer [bound subatom]]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [behavior defui]]))

(declare local)

(def cbs (atom {}))
(def id (atom 0))
(def devtools-url "http://localhost:8315/json")

(defn next-id []
  (swap! id inc))

(defn find-debugger-info [info url]
  (->
   (filter (fn [cur]
             (and (= (:url cur) url)
                  (:webSocketDebuggerUrl cur)))
           info)
   (first)))

(defn socket [this url]
  (let [sock (js/WebSocket. url)]
    (set! (.-onopen sock) #(do
                             (object/merge! this {:connected true})
                             (object/raise this :connect)))
    (set! (.-onmessage sock) #(object/raise this
                                            :message
                                            (-> (js/JSON.parse (.-data %))
                                                (js->clj :keywordize-keys true))))
    sock))

(defn send* [client m cb]
  (.send (:socket @client) (js/JSON.stringify (clj->js m)))
  (when cb
    (swap! cbs assoc (:id m) cb)))

(defn send [client m & [cb]]
  (if (:connected @client)
    (send* client m cb)
    (object/update! client [:queue] conj [client m cb])))

(defn close [client]
  (.close (:socket @client))
  (object/merge! client {:socket nil
                         :connected nil}))

(defn format-value [v]
  (let [val (:value v)]
    (cond
     (= val "undefined") "undefined"
     (= (:type v) "string") (pr-str val)
     (or (true? val) (false? val)) (pr-str val)
     (or (nil? val)
         (empty? val)) "null"
     :else (:value v))))

(defn msg->log [this m]
  (let [params (:parameters m)]
    (for [p params]
      (do
        [:span.log-val (cond
                        (and (= (:type p) "object") (:value p) (not (-> p :value :value))) "null"
                        (= (:type p) "object") (object/->content (object/create ::inspector-object this {:value p}))
                        :else (:value p (:text p)))]))))

(defn msg->string [m]
  (let [params (:parameters m)]
    (reduce (fn [res p]
              (str res " " (:value p)))
            ""
            params)))

(defn error->string [e]
  (str
   "ERROR: "(:text e) ": " (:url e) "\n"
   (reduce (fn [res f]
             (str res "       " (files/basename (:url f)) " [" (:lineNumber f) "]: " (if (empty? (:functionName f))
                                                                                       "anonymous"
                                                                                       (:functionName f))
                  "\n"))
           ""
           (:stackTrace e))))

(defui frame [f]
  [:tr [:td.url (files/basename (:url f)) " [" (:lineNumber f) "]"] [:td (if (empty? (:functionName f))
                                                                           "anonymous"
                                                                           (:functionName f))]])

(defmulti handle-log-msg #(:level %2))

(defn valid-error? [text]
  (let [text (.toLowerCase text)]
    (every? #(= -1 (.indexOf text %)) ["failed to load resource: http://app.kodowa.com"])))

(defmethod handle-log-msg "error" [this msg]
  (when (valid-error? (str (:text msg) ": " (:url msg)))
    (let [top (first (:stackTrace msg))]
      (console/verbatim [:div [:h3 (:text msg)
                               (when-not (:url top)
                                 (str ": " (:url msg)))]
                         [:table
                          (for [f (:stackTrace msg)]
                            (frame f)
                            )]]
                        "error" (error->string msg))
      )))

(defmethod handle-log-msg "log" [this msg]
  (let [stack (first (filter #(not= (files/basename (:url %)) "bootstrap.js") (-> msg :stackTrace)))
        stack (if-not stack
                (first (-> msg :stackTrace))
                stack)]
    (console/loc-log {:file (files/basename (:url stack))
                      :line (:lineNumber stack)
                      :content (msg->log this msg)
                      :str-content (msg->string msg)})))

(defmethod handle-log-msg "warning" [this msg]
  (console/loc-log {:file (files/basename (:url msg))
                    :line (:line msg)
                    :class "warning"
                    :content (:text msg)
                    :str-content (:text msg)}))

(defmethod handle-log-msg :default [this msg]
  (console/loc-log {:file (files/basename (:url msg))
                    :line (:line msg)
                    :content (:text msg)
                    :str-content (:text msg)}))

(defn extra-escape [code]
  (-> code
      (string/replace  "\\" "\\\\")
      (string/replace "\n" "\\n")
      (string/replace "'" "\\'")))

(defn eval-in-webview-client [webview-client msg cb]
  (send webview-client {:id (next-id) :method "Runtime.evaluate" :params {:expression (-> msg :code)}}
        cb))

(defn clear-scripts! [this]
  (object/merge! this {:scripts {}}))

(defn find-script [client path]
  (let [found? (-> (@client :scripts)
                   (get (files/basename path)))]
    found?))

(defn script-exists? [this id cb]
  (send this {:id (next-id) :method "Debugger.canSetScriptSource" :params {:scriptId id}}
        (fn [res]
          (cb (-> res :result :result)))))

(defn remove-script! [client path id]
  (let [[k v] (first (filter #(= id (:scriptId (second %))) (find-script client path)))]
    (object/update! client [:scripts (files/basename path)] dissoc k)))

(defn changelive! [obj path code cb else]
  (if-let [s (find-script obj path)]
    (let [id (-> s vals first :scriptId)]
      (script-exists? obj id
                      (fn [exists?]
                        (if-not exists?
                          (do (remove-script! obj path id) (changelive! obj path code cb))
                          (do
                            (object/merge! obj {:script-id id})
                            ;;TODO: handle multiples
                            (send obj {:id (next-id) :method "Debugger.setScriptSource" :params {:scriptId id :scriptSource code}}
                                  cb))))))
    (else)))
;;*********************************************************
;; Object
;;*********************************************************

(object/object* ::devtools-client
                :tags #{:clients.devtools}
                :init (fn [this url]
                        (object/merge! this {:url url})
                        nil))

(def local (object/create ::devtools-client (app/app-url)))

;; Handle events e.g. disconnect and reconnect!
(ipc/on "devtools" #(object/raise local (keyword %)))

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::connect!
          :triggers #{:connect!}
          :reaction (fn [this url]
                      (object/merge! this {:socket (socket this url)})
                      (send this {:id (next-id) :method "Console.enable"})
                      (send this {:id (next-id) :method "Debugger.enable"})
                      (send this {:id (next-id) :method "Network.setCacheDisabled" :params {:cacheDisabled true}})))

(behavior ::clear-queue-on-connect
          :triggers #{:connect}
          :reaction (fn [this]
                      (doseq [msg (:queue @this)]
                        (apply send msg))))

(behavior ::print-messages
          :triggers #{:message}
          :reaction (fn [this m]
                      ;;(console/log (pr-str m))
                      ))

(behavior ::handle-message
          :triggers #{:message}
          :reaction (fn [this m]
                      (if-let [cb (@cbs (:id m))]
                        (do
                          (cb m)
                          (swap! cbs dissoc (:id m)))
                        (when (:method m)
                          (object/raise this (keyword (:method m)) m)))))

(behavior ::script-parsed
          :triggers #{:Debugger.scriptParsed}
          :reaction (fn [this s]
                      (let [url (-> s :params :url)]
                        (object/update! this [:scripts] assoc-in [(files/basename url) url] (:params s))
                        )))

(behavior ::console-log
          :triggers #{:Console.messageAdded}
          :reaction (fn [this m]
                      (let [msg (-> m :params :message)]
                        (handle-log-msg this msg))))

(behavior ::clear-console
          :triggers #{:clear!}
          :reaction (fn [this]
                      (send this {:id (next-id) :method "Console.clearMessages"})))

(behavior ::disconnect
          :triggers #{:disconnect}
          :reaction (fn [this]
                      (when (:socket @this)
                        (close this))))

(behavior ::reconnect
          :triggers #{:reconnect!}
          :reaction (fn [this]
                      (object/raise this :disconnect)
                      (fetch/xhr devtools-url {}
                                 (fn [d]
                                   (if-let [url (-> (js/JSON.parse d)
                                                    (js->clj :keywordize-keys true)
                                                    (find-debugger-info (:url @this))
                                                    (:webSocketDebuggerUrl))]
                                     (object/raise this :connect! url)
                                     (wait 1000 #(object/raise this :reconnect!)))))))

(behavior ::connect-on-init
          :triggers #{:init}
          :reaction (fn [app]
                      (object/raise local :reconnect!)))

;;*********************************************************
;; Inspectors
;;*********************************************************

(defn i-compare [a b]
  (let [ia (.indexOf a "__")
        ib (.indexOf b "__")]
    (if (and (= ia -1)
             (= ib -1))
      (compare a b)
      (cond
       (and (> ia -1)
            (> ib -1)) (compare a b)
       (> ia -1) 1
       :else -1))))

(defn ->name [obj]
  (let [n (or (-> obj :name) (-> obj :value :description) (:description obj) "UnknownObject")]
    (cond
     (> (.indexOf n "e.fn.e.init") -1) (str "jQuery" (subs n 11))
     :else n)))

(defui desc [this obj]
  [:h2 [:em (->name obj)] (when (:value obj) (str ": " (-> obj :value :description)))]
  :click (fn []
           (if (:open @this)
             (object/merge! this {:open false})
             (do
               (object/merge! this {:open true})
               (when-not (seq (:children @this))
                 (send (:client @this) {:id 1 :method "Runtime.getProperties" :params {:objectId (or (-> obj :value :objectId) (:objectId obj)) :ownProperties true}}
                       (fn [d]
                         (object/merge! this {:children (-> d :result :result)}))))))))

(defui props [this children]
  [:ul
   (for [c (sort-by :name i-compare children)]
     (do
       (if (and (= (-> c :value :type) "object")
                (-> c :value :objectId))
         [:li (object/->content (object/create ::inspector-object (:client @this) c))]
         [:li [:em (:name c)] ": " (or (-> c :value :description) (str (-> c :value format-value)))])))])

(defn ->open [this]
  (if (:open this)
    "inspector-object open"
    "inspector-object"))

(defn inspector->result [this o]
  (let [res (-> o :result)
        data (:result res)]
    (if (:wasThrown res)
      {:ex (:description data)}
      {:result (condp = (:type data)
                 "object" (object/->content (object/create ::inspector-object this data))
                 (or (:description data) (pr-str (:value data)))
                 )})))

(defn clear-unused-inspectors []
  (doseq [obj (object/by-tag :inspector.object)
          :when (or (not (object/->content obj))
                    (not (dom/parents (object/->content obj) :body)))]
    (object/destroy! obj)))

(behavior ::clean-inspectors-timer
          :triggers #{:init}
          :reaction (fn [this]
                      ;;Every minute clear extraneous inspectors
                      (every 60000 clear-unused-inspectors)
                      ))

(behavior ::clear-inspector-object
          :triggers #{:destroy}
          :reaction (fn [this]
                      (when-let [id (or (-> @this :info :value :objectId)
                                        (-> @this :info :objectId))]
                        (send (:client @this) {:id (next-id) :method "Runtime.releaseObject" :params {:objectId id}}))))

(object/object* ::inspector-object
                :tags #{:inspector.object}
                :init (fn [this client m]
                        (object/merge! this {:client client
                                             :info m})
                        [:div {:class (bound this ->open)}
                         (desc this m)
                         [:div
                          (bound (subatom this :children) (partial props this))]]))
