(ns lt.objs.clients.tcp-client
  (:refer-clojure :exclude [send])
  (:require [cljs.reader :as reader]
            [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.editor :as editor]
            [lt.objs.notifos :as notifos]
            [lt.objs.platform :as platform]
            [lt.objs.popup :as popup]
            [lt.objs.proc :as proc]
            [lt.objs.sidebar.clients :as scl]
            [lt.objs.dialogs :as dialogs]
            [lt.objs.clients :as clients]
            [lt.objs.console :as console]
            [lt.objs.clients.tcp :as tcp]
            [clojure.string :as string])
  (:use [lt.util.cljs :only [clj->js]]
        [lt.util.js :only [wait ->clj]]))

;;****************************************************
;; Proc
;;****************************************************

(def shell (js/require "shelljs"))
(def harbor ((js/require "harbor") 49152 65000))

(defn open-port [id cb]
  (.claim harbor
          (str id)
          #(cb %2)))

(object/behavior* ::on-out
                  :triggers #{:proc.out}
                  :reaction (fn [this data]
                              (let [out (.toString data)]
                                  (console/verbatim
                                   (list [:em.file (or (-> @this :info :client deref :name) "node")] [:em.line "[stdout]"] ": " [:pre (string/trim out)])
                                   ))))

(object/behavior* ::on-error
                  :triggers #{:proc.error}
                  :reaction (fn [this data]
                              (let [out (.toString data)]
                                (when-not (re-seq #"debugger listening on port" out)
                                  (console/verbatim
                                   (list [:em.file (or (-> @this :info :client deref :name) "node")] [:em.line "[stderr]"] ": " [:pre (string/trim out)])
                                   "error"
                                  )))))

(object/behavior* ::on-exit
                  :triggers #{:proc.exit}
                  :reaction (fn [this data]
                              (when-not (:disconnecting @this)
                                (notifos/done-working)
                                (popup/popup! {:header "The node process exited."
                                               :body [:span "The node process you were connected to suddenly quit. Check the console for more information." [:pre (:buffer @this)]]
                                               :buttons [{:label "close"}]})
                                )
                              (when-not (-> @this :info :client deref :restarting)
                                (.release harbor (str (-> @this :info :client clients/->id)))
                                (clients/rem! (-> @this :info :client)))
                              (proc/kill-all (:procs @this))
                              (object/destroy! this)
                              ))

(object/object* ::connecting-notifier
                :triggers []
                :behaviors [::on-exit ::on-error ::on-out]
                :init (fn [this info]
                        (object/merge! this {:info info})
                        nil))

(defn escape-spaces [s]
  (if (= files/separator "\\")
    (str "\"" s "\"")
    (string/replace s #" " "\\ ")))

(def ltnode-path (escape-spaces (files/lt-home "/plugins/nodejs/ltnodeclient.js")))

(defn client-command [client path port]
  (str "node --debug=" port " " ltnode-path " " path " " tcp/port " " (clients/->id client)))

(defn run-node [{:keys [path name client] :as info}]
  (open-port (clients/->id client)
             (fn [port]
               (let [obj (object/create ::connecting-notifier info)]
                 (object/merge! client {:port port
                                        :proc obj})
                 (notifos/working "Connecting..")
                 (proc/exec {:command (client-command client path port)
                             :cwd (files/parent path)
                             :env {"NODE_PATH" (files/join (files/parent path) "node_modules")}
                             :obj obj})
                 ))))

(defn check-node [obj]
  (assoc obj :node (.which shell "node")))

(defn check-client [obj]
  (assoc obj :node-client (files/exists? ltnode-path)))

(defn notify [obj]
  (let [{:keys [node path client]} obj]
    (cond
     (or (not node) (empty? node)) (do
                                     (clients/rem! client)
                                     (popup/popup! {:header "We couldn't find NodeJS."
                                                  :body "In order to start a NodeJS client, you have to have node installed and on your system's PATH."
                                                  :buttons [{:label "Download NodeJS"
                                                             :action (fn []
                                                                       (platform/open "http://nodejs.org/"))}
                                                            {:label "ok"}]}))
     :else (run-node obj))
    obj))

(defn check-all [obj]
  (-> obj
      (check-node)
      (check-client)
      (notify)))

(defn try-connect [{:keys [info]}]
  (let [path (:path info)
        client (clients/client! :nodejs.client)]
    (object/merge! client {:path path})
    (check-all {:path path
                :client client})
    client))

;;****************************************************
;; connection
;;****************************************************

(def net (js/require "net"))

(def cbs (atom {}))
(def id (atom 0))

(defn next-id []
  (swap! id inc))

(defn parse-message [m]
  (let [string (.toString m)]
    (doall (for [m (string/split m "Content-Length")
                 :let [start (.indexOf m "{")]]
             (when (> start -1)
               (try
                 (-> (subs m (dec start))
                     (js/JSON.parse)
                     (js->clj :keywordize-keys true))
                 (catch js/Error e
                   nil)))))))

(defn do-callback [msg]
  (when-let [cb (@cbs (:request_seq msg))]
    (cb msg)
    true))

(defn connect-to [host port client]
  (let [socket (.connect net port host)]
    (.on socket "connect" #(when @client (object/raise client ::connect)))
    (.on socket "error" #(when @client (object/raise client ::connect-fail)))
    (.on socket "data" #(when @client
                          ;(println "msg: " (parse-message %))
                          (doseq [m (parse-message %)
                                  :when m]
                            ;(println m)
                            (when-not (do-callback m)
                              (object/raise client (keyword (str "debugger-" (:command m))) m)))))
    socket))

(defn send [client msg cb]
  (let [id (next-id)
        c (.stringify js/JSON (clj->js (merge {:seq id :type :request} msg)))]
    (when cb
      (swap! cbs assoc id cb))
    (.write (:debugger-socket @client) (str "Content-Length: " (count c) "\r\n\r\n" c))))

(defn global-eval [client code]
  (send client {:command :evaluate :arguments {:expression code :global true}}))

(defn grab-require [client]
  (global-eval client "global.require = global.process.mainModule.require; global.ltclient = global.process.mainModule.exports; //require('/users/chris/lighttable/plugins/nodejs/ltnodeclient.js');"))

(defn load-tools [client]
  (global-eval client (str "global.ltclient.connect('" (-> @client :path) "'," tcp/port "," (clients/->id client) ");")))

(defn init [this]
  (grab-require this)
  ;(load-tools this)
  )

(defn wrap-source [src]
  (str "(function (exports, require, module, __filename, __dirname) { " src " })")
  src)

(defn handle-message [client msg]
  (global-eval client (str "global.ltclient.handle(" (.stringify js/JSON msg) ")")))

(object/behavior* ::send!
                  :triggers #{:send!}
                  :reaction (fn [this msg]
                              (when (= "client.close" (second msg))
                                (object/merge! (:proc @this) {:disconnecting true}))
                              (handle-message this msg)
                              (when (= "editor.eval.js" (second msg))
                                ;(object/raise this :changelive! (js->clj (last msg) :keywordize-keys true))
                                )
                              ))

(object/behavior* ::refresh-scripts!
                  :triggers #{:refresh-scripts!}
                  :reaction (fn [this cb]
                              (send this {:command :scripts} (fn [m]
                                                               (object/raise this :debugger-scripts m)
                                                               (when cb
                                                                 (cb))))))

(object/behavior* ::changelive!
                  :triggers #{:changelive!}
                  :reaction (fn [this info]
                              (if-let [id (-> @this :scripts (get (:path info)))]
                                (let [code (editor/->val (object/by-id (:ed-id info)))]
                                  (send this {:command :changelive :arguments {:script_id id :new_source (wrap-source code)}}))
                                (object/raise this :refresh-scripts! (fn []
                                                                       (when (-> @this :scripts (get (:path info)))
                                                                         (object/raise this :changelive! info)))))))

(object/behavior* ::debugger-changelive
                  :triggers #{:debugger-changelive}
                  :reaction (fn [this msg]
                              ;(println "Changelive response: " msg)
                              ))

(object/behavior* ::debugger-scripts
                  :triggers #{:debugger-scripts}
                  :reaction (fn [this msg]
                              ;(println "scripts response: " (map (juxt :name :id) (:body msg)))
                              (object/merge! this {:scripts (into {} (map (juxt :name :id) (:body msg)))})
                              ))

(object/behavior* ::debugger-evaluate
                  :triggers #{:debugger-evaluate}
                  :reaction (fn [this msg]
                              ;(println "evaluate response: " msg)
                              ))

(object/behavior* ::init-debugger!
                  :triggers #{:init-debugger!}
                  :reaction (fn [this]
                              (init this)
                              ))

(object/behavior* ::connect-success
                  :triggers #{::connect}
                  :reaction (fn [this]
                              (notifos/done-working)
                              (object/raise this :init-debugger!)))

(object/behavior* ::connect-retry
                  :triggers #{::connect-fail}
                  :reaction (fn [this]
                              (wait 20 #(object/raise this :started))))

(object/behavior* ::start-debugger!
                  :triggers #{:connect}
                  :reaction (fn [this]
                               (object/merge! this {:debugger-socket (connect-to "localhost" (:port @this) this)})))

(object/behavior* ::connect!
                  :triggers #{:connect!}
                  :reaction (fn [this path]
                              (try-connect {:info {:path path}})
                              ))

(object/object* ::nodejs-lang
                :tags #{:nodejs.lang})

(object/tag-behaviors :nodejs.client [::init-debugger! ::refresh-scripts! ::changelive! ::start-debugger! ::send! ::connect-success ::connect-retry ::debugger-evaluate ::debugger-changelive ::debugger-scripts])
(object/tag-behaviors :nodejs.lang [::connect!])

(def nodejs-lang (object/create ::nodejs-lang))

(scl/add-connector {:name "NodeJS"
                    :desc "Start a nodejs procss by picking a .js file to run"
                    :connect (fn []
                               (dialogs/file nodejs-lang :connect!))})

(comment
(send cur {:type :request :command :scripts :arguments {:ids [41] :includeSource true}} (fn [m] (println m)))

(send cur {:type :request :command :scripts})
(global-eval cur "")

(init)

(handle-message (clj->js [0 :editor.eval.js {:path "/users/chris/lighttable/plugins/nodejs/test.js"
                                             :name "test.js"
                                             :meta {:line 2}
                                             :code "foo.blah();"}]))
(def s (connect-to "localhost" 5858))

(send s {:type :request :command :evaluate :arguments {:expression "4 + 5" :global true}})
(send cur {:type :request :command :scripts})
(send s {:type :request :command :changelive :arguments {:script_id 138 :new_source "var i = setInterval(function() { console.log(\"yozomg\"); } ,5000);"}})

  )

(object/behavior* ::kill-on-closed
                  :triggers #{:closed}
                  :reaction (fn [app]
                              ))

(object/tag-behaviors :app [::kill-on-closed])
