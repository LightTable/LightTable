(ns lt.objs.langs.clj
  (:require [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.files :as files]
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
            [lt.util.cljs :refer [->dottedkw]]
            [clojure.string :as string]))

(def shell (js/require "shelljs"))
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
  (string/replace s
                  #"\\x(..)"
                  (fn [res r]
                    (js/String.fromCharCode (js/parseInt r 16)))))

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
                    :client (clients/client! :clojure.client)}))
      (or (clients/by-name local-name)
          (run-local-server (clients/client! :clojure.client))))))

(object/behavior* ::on-eval
                  :triggers #{:eval}
                  :reaction (fn [editor]
                              (object/raise clj-lang :eval! {:origin editor
                                                             :info (assoc (@editor :info)
                                                                     :code (ed/->val (:ed @editor)))})
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
                                           (assoc info :pos pos :code code))]
                                (object/raise clj-lang :eval! {:origin editor
                                                               :info info}))))

(object/behavior* ::on-code
                  :triggers #{:editor.eval.cljs.code}
                  :reaction (fn [this result]
                              (object/raise this :exec.cljs! result)
                              ))

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
                                    command (->dottedkw :editor.eval (-> info :type mime->type))
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
                              (when-not (= (-> @obj :info :ns) (:ns res))
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
                                             (unescape-unicode (:result res))
                                             )]
                                (object/raise obj :editor.result result {:line (dec (:end-line meta))
                                                                         :start-line (dec (:line meta))
                                                                         :ch (:end-column meta)}
                                              {:prefix " => "}))))

(object/behavior* ::clj-result
                  :triggers #{:editor.eval.clj.result}
                  :reaction (fn [obj res]
                              (notifos/done-working)
                              (when (:out res)
                                (println (:out res)))
                              (doseq [result (-> res :results)
                                      :let [meta (:meta result)
                                            loc {:line (dec (:end-line meta)) :ch (:end-column meta)
                                                 :start-line (dec (:line meta))}]]
                                (if (:stack result)
                                  (object/raise obj :editor.eval.clj.exception result)
                                  (do
                                    (object/raise obj :editor.result (:result result) loc {:prefix " => "}))))
                              ))

(object/behavior* ::clj-exception
                  :triggers #{:editor.eval.clj.exception}
                  :reaction (fn [obj res]
                              (notifos/done-working)
                              (let [meta (:meta res)
                                    loc {:line (dec (:end-line meta)) :ch (:end-column meta)
                                         :start-line (dec (:line meta))}]
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
                              (console/loc-log (files/basename (or (-> @this :name) (-> @this :info :path))) nil (string/trim str))))

(object/behavior* ::eval-print-err
                  :triggers #{:editor.eval.clj.print.err}
                  :reaction (fn [this str]
                              (console/error str)))

(object/behavior* ::handle-cancellation
                  :triggers #{:editor.eval.clj.cancel}
                  :reaction (fn [this]
                              (notifos/done-working)
                              (notifos/set-msg! "Canceled clj eval." {:class "error"})))

(object/object* :langs.clj
                :tags #{:clojure.lang})

(def clj-lang (object/create :langs.clj))


(object/behavior* ::connect
                  :triggers #{:connect}
                  :reaction (fn [this path]
                              (try-connect {:info {:path path}})))


(scl/add-connector {:name "Clojure"
                    :desc "Select a project.clj to connect to for either Clojure or ClojureScript."
                    :connect (fn []
                               (dialogs/file clj-lang :connect))})

(object/tag-behaviors :clients [::handle-cancellation])
(object/tag-behaviors :clojure.lang [::eval! ::connect])
(object/tag-behaviors :editor.clj #{::eval-location ::no-op ::eval-print ::eval-print-err ::clj-exception ::on-eval ::on-eval.one ::on-result-set-ns ::clj-result})
(object/tag-behaviors :editor.cljs #{::eval-location ::no-op ::exec.cljs! ::on-eval ::on-eval.one ::on-code ::cljs-exception ::on-result-set-ns ::on-remote-result})

;;****************************************************
;; watches
;;****************************************************

(defn cljs-watch [meta src]
  (let [meta (assoc meta :ev :editor.eval.cljs.watch)]
    (str "(js/lttools.watch " src " (clj->js " (pr-str meta) "))")))

(defn clj-watch [meta src]
  (str "(lighttable.hub.clj.eval/watch " src " " (pr-str meta) ")"))

(object/behavior* ::cljs-watch-result
                  :triggers #{:editor.eval.cljs.watch}
                  :reaction (fn [editor res]
                              (when-let [watch (get (:watches @editor) (-> res :meta :id))]
                                (let [str-result (pr-str (:result res))]
                                  (object/raise (:inline-result watch) :update! str-result)))))

(object/behavior* ::clj-watch-result
                  :triggers #{:editor.eval.clj.watch}
                  :reaction (fn [editor res]
                              (when-let [watch (get (:watches @editor) (-> res :meta :id))]
                                (let [str-result (:result res)]
                                  (object/raise (:inline-result watch) :update! str-result)))))


;;****************************************************
;; Proc
;;****************************************************

(object/behavior* ::on-out
                  :triggers #{:proc.out}
                  :reaction (fn [this data]
                              (let [out (.toString data)]
                                (object/update! this [:buffer] str out)
                                (if (> (.indexOf out "Connected") -1)
                                  (do
                                    (notifos/done-working)
                                    (object/merge! this {:connected true})
                                    (notifos/rem! (:notifier @this))
                                    ;(object/destroy! this)
                                    )
                                  (when-not (:connected @this)
                                    (notifos/set-msg! "Retrieving deps.. "))))
                              ))

(object/behavior* ::on-error
                  :triggers #{:proc.error}
                  :reaction (fn [this data]
                              (let [out (.toString data)]
                                (when-not (> (.indexOf (:buffer @this) "Connected") -1)
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
                              (notifos/rem! (:notifier @this))
                              (object/destroy! this)
                              ))

(object/object* ::connecting-notifier
                :triggers []
                :behaviors [::on-exit ::on-error ::on-out]
                :init (fn [this notifier cid]
                        (object/merge! this {:notifier notifier :buffer "" :cid cid})
                        nil))

(defn escape-spaces [s]
  (if (= files/separator "\\")
    (str "\"" s "\"")
    (string/replace s #" " "\\ ")))

(defn jar-command [path name client]
  ;(println (.which shell "java"))
  (str "java -jar " (escape-spaces jar-path) " " tcp/port " \"" path "\" " (clients/->id client) " " name ""))

(defn run-jar [{:keys [path project-path name client]}]
  (let [n (notifos/working "Connecting..")
        obj (object/create ::connecting-notifier n (clients/->id client))]
    (proc/exec {:command (jar-command project-path name client)
                :cwd project-path
                :obj obj})))

(defn run-local-server [client]
  (check-all {:path (str home-path "/")
              :client client
              :name local-name}))

(defn check-java [obj]
  ;(println (.sync which "java"))
  (assoc obj :java (or (aget js/process.env "JAVA_HOME")
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

(object/behavior* ::run-clj-client
                  :triggers #{:connect.clj}
                  :reaction (fn [this path]
                              (check-all {:path path})
                              ))

(object/behavior* ::run-local-client
                  :triggers #{:connect.local}
                  :reaction (fn [this]
                              (run-local-server)
                              ))

(object/add-behavior! connector/connector ::run-clj-client)
(object/add-behavior! connector/connector ::run-local-client)
