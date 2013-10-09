(ns lt.objs.langs.clj
  (:require [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.files :as files]
            [lt.objs.context :as ctx]
            [lt.objs.app :as app]
            [lt.objs.clients.tcp :as tcp]
            [lt.objs.sidebar.clients :as scl]
            [lt.objs.dialogs :as dialogs]
            [lt.objs.deploy :as deploy]
            [lt.objs.console :as console]
            [lt.objs.editor :as ed]
            [lt.objs.connector :as connector]
            [lt.objs.popup :as popup]
            [lt.objs.platform :as platform]
            [lt.objs.statusbar :as status]
            [lt.objs.proc :as proc]
            [lt.objs.eval :as eval]
            [lt.objs.notifos :as notifos]
            [lt.plugins.watches :as watches]
            [lt.util.dom :as dom]
            [lt.util.js :as util]
            [lt.util.load :as load]
            [lt.util.cljs :refer [->dottedkw]]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [defui]]))

(def shell (load/node-module "shelljs"))
(def cur-path (.pwd shell))
(def home-path deploy/home-path)
(def jar-dir (files/join home-path "plugins" "clojure"))
(def jar-path (files/join jar-dir "lein-light-standalone.jar"))

;;****************************************************
;; Parser
;; REVIEW: should we use this?
;;****************************************************

(defn binary-search [arr loc]
  (let [line (:line loc)]
    (loop [f 0
           l (dec (.-length arr))]
      (let [i (int (/ (+ f l) 2))
            cur (aget arr i)]
        (cond
         (and (>= (.-line cur) line)
              (<= (.-endLine cur) line)) {:line (.-line cur)
                                          :end-line (.-endLine cur)
                                          :col (.-col cur)
                                          :end-col (.-endCol cur)}
         (= f i l) nil
         (> line (.-endLine cur)) (recur (inc i) l)
         :else (recur f i))))))

(defn find-form [str loc]
  (let [parsed (.parse parser str)]
    (binary-search parsed loc)))

;;****************************************************
;; Lang object
;;****************************************************

(def local-name "LightTable-REPL")

(defn unescape-unicode [s]
  (when (string? s)
    (string/replace s
                    #"\\x(..)"
                    (fn [res r]
                      (js/String.fromCharCode (js/parseInt r 16))))))

(defn cljs-result-format [n]
  (cond
   (fn? n) (str "(fn " (.-name n) " ..)")
   (nil? n) "nil"
   (= (pr-str n) "#<[object Object]>") (console/inspect n)
   :else (pr-str n)))

(defn try-connect [{:keys [info]}]
  (let [path (:path info)
        {:keys [project-path]} (when path (find-project {:path path}))]
    (if project-path
      (do
        (check-all {:path path
                    :client (clients/client! :nrepl.client)}))
      (or (clients/by-name local-name)
          (run-local-server (clients/client! :nrepl.client))))))

(object/behavior* ::on-eval
                  :triggers #{:eval}
                  :reaction (fn [editor]
                              (object/raise clj-lang :eval! {:origin editor
                                                             :info (assoc (@editor :info)
                                                                     :print-length (object/raise-reduce editor :clojure.print-length+ nil)
                                                                     :code (watches/watched-range editor nil nil (if (object/has-tag? editor :editor.cljs)
                                                                                 cljs-watch
                                                                                 clj-watch)))})
                             ))

(object/behavior* ::on-eval.one
                  :triggers #{:eval.one}
                  :reaction (fn [editor]
                              (let [code (watches/watched-range editor nil nil (if (object/has-tag? editor :editor.cljs)
                                                                                 cljs-watch
                                                                                 clj-watch))
                                    pos (ed/->cursor editor)
                                    info (:info @editor)
                                    info (if (ed/selection? editor)
                                           (assoc info
                                             :code (ed/selection editor)
                                             :meta {:start (-> (ed/->cursor editor "start") :line)
                                                    :end (-> (ed/->cursor editor "end") :line)})
                                           (assoc info :pos pos :code code))
                                    info (assoc info :print-length (object/raise-reduce editor :clojure.print-length+ nil))]
                                (object/raise clj-lang :eval! {:origin editor
                                                               :info info}))))

(object/behavior* ::on-code
                  :triggers #{:editor.eval.cljs.code}
                  :reaction (fn [this result]
                              (object/raise this :exec.cljs! result)))

(object/behavior* ::exec.cljs!
                  :triggers #{:exec.cljs!}
                  :reaction (fn [this res]
                              (let [client (-> @this :client :exec)
                                    path (-> @this :info :path)
                                    res (update-in res [:results] #(for [r %]
                                                                     (assoc r :code (-> (:code r)
                                                                                        (eval/pad (-> r :meta :line dec))
                                                                                        (eval/append-source-file path)))))]
                                  (clients/send (eval/get-client! {:command :editor.eval.cljs.exec
                                                                   :info {:type "cljs"}
                                                                   :key :exec
                                                                   :origin this})
                                                :editor.eval.cljs.exec res :only this))))

(def mime->type {"text/x-clojure" "clj"
                 "text/x-clojurescript" "cljs"})

(object/behavior* ::eval!
                  :triggers #{:eval!}
                  :reaction (fn [this event]
                              (let [{:keys [info origin]} event
                                    command (->dottedkw :editor.eval (-> info :mime mime->type))
                                    client (-> @origin :client :default)]
                                (notifos/working)
                                (clients/send (eval/get-client! {:command command
                                                                 :info info
                                                                 :origin origin
                                                                 :create try-connect})
                                              command info :only origin))))

(object/behavior* ::on-result-set-ns
                  :triggers #{:editor.eval.cljs.code
                              :editor.eval.clj.result}
                  :reaction (fn [obj res]
                              (when (and (:ns res)
                                         (not= (-> @obj :info :ns) (:ns res)))
                                (object/update! obj [:info] assoc :ns (:ns res)))))

(object/behavior* ::no-op
                  :triggers #{:editor.eval.cljs.no-op
                              :editor.eval.clj.no-op}
                  :reaction (fn [this]
                              (notifos/done-working)))

(object/behavior* ::on-remote-result
                  :triggers #{:editor.eval.cljs.result}
                  :reaction (fn [obj res]
                              (notifos/done-working)
                              (let [meta (:meta res)
                                    result (try
                                             (unescape-unicode (or (:result res) ""))
                                             )]
                                (object/raise obj :editor.result result {:line (dec (:end-line meta))
                                                                         :start-line (dec (:line meta))
                                                                         :ch (:end-column meta)}))))

(object/behavior* ::clj-result
                  :triggers #{:editor.eval.clj.result}
                  :reaction (fn [obj res]
                              (when (:out res)
                                (println (:out res)))
                              (doseq [result (-> res :results)
                                      :let [meta (:meta result)
                                            loc {:line (dec (:end-line meta)) :ch (:end-column meta)
                                                 :start-line (dec (:line meta))}]]
                                (if (:stack result)
                                  (object/raise obj :editor.eval.clj.exception result)
                                  (do
                                    (notifos/done-working)
                                    (object/raise obj :editor.result (:result result) loc))))
                              ))

(object/behavior* ::clj-exception
                  :triggers #{:editor.eval.clj.exception}
                  :reaction (fn [obj res]
                              (notifos/done-working)
                              (let [meta (:meta res)
                                    loc {:line (dec (:end-line meta)) :ch (:end-column meta 0)
                                         :start-line (dec (:line meta 1))}]
                                (notifos/set-msg! (:result res) {:class "error"})
                                (object/raise obj :editor.exception (:stack res) loc))
                              ))

(object/behavior* ::cljs-exception
                  :triggers #{:editor.eval.cljs.exception}
                  :reaction (fn [obj res]
                              (notifos/done-working)
                              (let [meta (:meta res)
                                    loc {:line (dec (:end-line meta)) :ch (:end-column meta)
                                         :start-line (dec (:line meta))}
                                    msg (or (:stack res) (:ex res))
                                    stack (or (:stack res) (.-stack (:ex res)))]
                                (notifos/set-msg! msg {:class "error"})
                                (object/raise obj :editor.exception stack loc))
                              ))

(object/behavior* ::eval-location
                  :triggers #{:editor.eval.clj.location
                              :editor.eval.cljs.location}
                  :reaction (fn [obj loc]
                              ;(println "LOCATION: " loc)
                              ))

(object/behavior* ::eval-print
                  :triggers #{:editor.eval.clj.print}
                  :reaction (fn [this str]
                              (console/loc-log (files/basename (or (-> @this :name) (-> @this :info :path) "unknown"))
                                               (when (object/has-tag? this :nrepl.client)
                                                 "stdout")
                                               (string/trim (:out str)))))

(object/behavior* ::eval-print-err
                  :triggers #{:editor.eval.clj.print.err}
                  :reaction (fn [this str]
                              (console/error (:out str))))

(object/behavior* ::handle-cancellation
                  :triggers #{:editor.eval.clj.cancel}
                  :reaction (fn [this]
                              (notifos/done-working)
                              (notifos/set-msg! "Canceled clj eval." {:class "error"})))

(object/behavior* ::print-length
                  :triggers #{:clojure.print-length+}
                  :desc "Clojure: Set the print length for eval (doesn't affect CLJS)"
                  :params [{:label "length"
                            :type :number}]
                  :type :user
                  :exclusive true
                  :reaction (fn [this res len]
                              len))

(object/object* :langs.clj
                :tags #{:clojure.lang})

(def clj-lang (object/create :langs.clj))

(object/behavior* ::java-exe
                  :triggers #{:object.instant}
                  :desc "Clojure: set the path to the Java executable for clients"
                  :type :user
                  :params [{:label "path"}]
                  :exclusive true
                  :reaction (fn [this path]
                              (object/merge! clj-lang {:java-exe path})))

;;****************************************************
;; Connectors
;;****************************************************

(object/behavior* ::connect
                  :triggers #{:connect}
                  :reaction (fn [this path]
                              (try-connect {:info {:path path}})))


(scl/add-connector {:name "Clojure"
                    :desc "Select a project.clj to connect to for either Clojure or ClojureScript."
                    :connect (fn []
                               (dialogs/file clj-lang :connect))})
(defui server-input []
  [:input {:type "text" :placeholder "host:port" :value "localhost:"}]
  :focus (fn []
           (ctx/in! :popup.input))
  :blur (fn []
          (ctx/out! :popup.input)))

(defn connect-to-remote [server]
  (let [[host port] (string/split server ":")]
    (when (and host port)
      (let [client (clients/client! :nrepl.client.remote)]
        (object/merge! client {:port port
                               :host host
                               :name server})
        (object/raise client :connect!)))))

(defn remote-connect []
  (let [input (server-input)
        p (popup/popup! {:header "Connect to a remote nREPL server."
                         :body [:div
                                [:p "In order to connect to a remote nrepl server, make sure the server is started (e.g. lein repl :headless)
                                 and that you have included the lighttable.nrepl.handler/lighttable-ops middleware."]
                                [:label "Server: "]
                                input
                                ]
                         :buttons [{:label "cancel"}
                                   {:label "connect"
                                    :action (fn []
                                              (connect-to-remote (dom/val input)))}]})]
    (dom/focus input)
    (.setSelectionRange input 1000 1000)
    ))

(scl/add-connector {:name "Clojure (remote nREPL)"
                    :desc "Enter in the host:port address of an nREPL server to connect to"
                    :connect (fn []
                               (remote-connect)
                               )})


;;****************************************************
;; watches
;;****************************************************

(defn cljs-watch [meta src]
  (let [meta (assoc meta :ev :editor.eval.cljs.watch)]
    (str "(js/lttools.watch " src " (clj->js " (pr-str meta) "))")))

(defn clj-watch [meta src]
  (str "(lighttable.nrepl.eval/watch " src " " (pr-str meta) ")"))

(object/behavior* ::cljs-watch-result
                  :triggers #{:editor.eval.cljs.watch}
                  :reaction (fn [editor res]
                              (when-let [watch (get (:watches @editor) (-> res :meta :id))]
                                (let [str-result (pr-str (:result res))
                                      str-result (if (= str-result "#<[object Object]>")
                                                   (console/util-inspect (:result res) false 1)
                                                   str-result)
                                      str-result (util/escape str-result)]
                                  (object/raise (:inline-result watch) :update! str-result)))))

(object/behavior* ::clj-watch-result
                  :triggers #{:editor.eval.clj.watch}
                  :reaction (fn [editor res]
                              (when-let [watch (get (:watches @editor) (-> res :meta :id))]
                                (let [str-result (:result res)
                                      str-result (util/escape str-result)]
                                  (object/raise (:inline-result watch) :update! str-result)))))


;;****************************************************
;; doc
;;****************************************************

(object/behavior* ::clj-doc
                  :triggers #{:editor.doc}
                  :reaction (fn [editor]
                              (let [token (find-symbol-at-cursor editor)
                                    command :editor.clj.doc
                                    info (assoc (@editor :info)
                                           :loc (:loc token)
                                           :sym (:string token)
                                           :print-length (object/raise-reduce editor :clojure.print-length+ nil)
                                           :code (watches/watched-range editor nil nil cljs-watch))]
                                (when token
                              (clients/send (eval/get-client! {:command command
                                                               :info info
                                                               :origin editor
                                                               :create try-connect})
                                            command info :only editor)))
                              ))

(object/behavior* ::print-clj-doc
                  :triggers #{:editor.clj.doc}
                  :reaction (fn [editor result]
                              (object/raise editor :editor.doc.show!
                              {:name (str (:name result))
                               :args (pr-str (:arglists result))
                               :loc (:loc result)
                               :doc (:doc result)})))

(defn symbol-token? [s]
  (re-seq #"[\w\$_\-\.\*\+\/\?\><!]" s))

(defn find-symbol-at-cursor [editor]
  (let [loc (ed/->cursor editor)
        token-left (ed/->token editor loc)
        token-right (ed/->token editor (update-in loc [:ch] inc))]
    (or (when (symbol-token? (:string token-right))
          (assoc token-right :loc loc))
        (when (symbol-token? (:string token-right))
          (assoc token-left :loc loc)))))

(object/behavior* ::cljs-doc
                  :triggers #{:editor.doc}
                  :reaction (fn [editor]
                              (let [token (find-symbol-at-cursor editor)
                                    command :editor.cljs.doc
                                    info (assoc (@editor :info)
                                           :loc (:loc token)
                                           :sym (:string token)
                                           :print-length (object/raise-reduce editor :clojure.print-length+ nil)
                                           :code (watches/watched-range editor nil nil cljs-watch))]
                                (when token
                              (clients/send (eval/get-client! {:command command
                                                               :info info
                                                               :origin editor
                                                               :create try-connect})
                                            command info :only editor)))))

(object/behavior* ::print-cljs-doc
                  :triggers #{:editor.cljs.doc}
                  :reaction (fn [editor result]
                              (object/raise editor :editor.doc.show!
                                            {:name (str (:name result))
                                             :loc (:loc result)
                                             :args (pr-str (second (:arglists result)))
                                             :doc (:doc result)})))


;;****************************************************
;; Proc
;;****************************************************

(object/behavior* ::on-out
                  :triggers #{:proc.out}
                  :reaction (fn [this data]
                              (let [out (.toString data)]
                                (.write console/core-log (str (:name @this) "[stdout]: " data))
                                (object/update! this [:buffer] str out)
                                (if (> (.indexOf out "nREPL server started") -1)
                                  (do
                                    (notifos/done-working)
                                    (object/merge! this {:connected true})
                                    (let [client (clients/by-id (:cid @this))]
                                      (object/merge! client {:port (-> (re-seq #"port ([\d]+)" out) first second)})
                                      (object/raise client :connect!))
                                    ;(object/destroy! this)
                                    )
                                  (when-not (:connected @this)
                                    (notifos/set-msg! "Retrieving deps.. "))))
                              ))

(object/behavior* ::on-error
                  :triggers #{:proc.error}
                  :reaction (fn [this data]
                              (let [out (.toString data)]
                                (.write console/core-log (str (:name @this) "[stderr]: " data))
                                (when-not (> (.indexOf (:buffer @this) "nREPL server started") -1)
                                  (object/update! this [:buffer] str data)
                                  ))
                              ))


(object/behavior* ::on-exit
                  :triggers #{:proc.exit}
                  :reaction (fn [this data]
                              ;(object/update! this [:buffer] str data)
                              (when-not (:connected @this)
                                (notifos/done-working)
                                (notifos/done-working)
                                (popup/popup! {:header "We couldn't connect."
                                               :body [:span "Looks like there was an issue trying to connect
                                                      to the project. Here's what we got:" [:pre (:buffer @this)]]
                                               :buttons [{:label "close"}]})
                                (notifos/set-msg! "Failed to connect" {:class "error"})
                                (clients/rem! (clients/by-id (:cid @this))))
                              (proc/kill-all (:procs @this))
                              (object/destroy! this)
                              ))

(object/object* ::connecting-notifier
                :triggers []
                :behaviors [::on-exit ::on-error ::on-out]
                :init (fn [this notifier cid]
                        (object/merge! this {:notifier notifier :buffer "" :cid cid})
                        nil))

(defn wrap-quotes [s]
  (str "\"" s "\""))

(defn escape-spaces [s]
  (if (= files/separator "\\")
    (wrap-quotes s)
    (string/replace s #" " "\\ ")))


(defn jar-command [path name client]
  ;(println (.which shell "java"))
  (str (or (:java-exe @clj-lang) "java") " -jar " (escape-spaces jar-path) " " tcp/port " \"" path "\" " (clients/->id client) " " name ""))

(defn run-jar [{:keys [path project-path name client]}]
  (let [obj (object/create ::connecting-notifier n (clients/->id client))
        args ["-jar" jar-path (wrap-quotes project-path) (clients/->id client)]]
    (notifos/working "Connecting..")
    (.write console/core-log (str "STARTING CLIENT: " (jar-command project-path name client)))
    (proc/exec {:command (or (:java-exe @clj-lang) "java")
                :args (if name
                        (conj args name)
                        args)
                :cwd project-path
                :obj obj})

    (object/merge! client {:dir project-path})
    (object/raise client :try-connect!)))

(defn run-local-server [client]
  (check-all {:path (str home-path "/plugins/clojure/")
              :client client
              :name local-name}))

(defn check-java [obj]
  ;(println (.sync which "java"))
  (assoc obj :java (or (:java-exe @clj-lang)
                       (aget js/process.env "JAVA_HOME")
                       (.which shell "java"))))

(defn check-ltjar [obj]
  (assoc obj :ltjar (files/exists? jar-path)))

(defn find-project [obj]
  (let [p (:path obj)
        roots (files/get-roots)]
    (loop [cur p
           prev ""]
      (if (or (empty? cur)
              (roots cur)
              (= cur prev))
        (assoc obj :project-path nil)
        (if (files/exists? (files/join cur "project.clj"))
          (assoc obj :project-path cur)
          (recur (files/parent cur) cur))))))

(defn notify [obj]
  (let [{:keys [java project-path path ltjar]} obj]
    (cond
     (or (not java) (empty? java)) (popup/popup! {:header "We couldn't find java."
                                                  :body "Clojure evaluation requires the JDK to be installed."
                                                  :buttons [{:label "Download the JDK"
                                                             :action (fn []
                                                                       (platform/open "http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html"))}
                                                            {:label "ok"}]}) ;;TODO: alert this
     (not ltjar) (do (deploy/deploy) (run-jar obj))
     (not project-path) (console/error (str "Couldn't find a project.clj in any parent of " path))
     :else (run-jar obj))
    obj))

(defn check-all [obj]
  (-> obj
      (check-java)
      (check-ltjar)
      (find-project)
      (notify))
  (:client obj))
