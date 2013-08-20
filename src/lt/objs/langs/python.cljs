(ns lt.objs.langs.python
  (:require [lt.object :as object]
            [lt.objs.eval :as eval]
            [lt.objs.console :as console]
            [lt.objs.command :as cmd]
            [lt.objs.clients.tcp :as tcp]
            [lt.objs.sidebar.clients :as scl]
            [lt.objs.dialogs :as dialogs]
            [lt.objs.files :as files]
            [lt.objs.popup :as popup]
            [lt.objs.platform :as platform]
            [lt.objs.editor :as ed]
            [lt.plugins.watches :as watches]
            [lt.objs.proc :as proc]
            [clojure.string :as string]
            [lt.objs.clients :as clients]
            [lt.objs.notifos :as notifos]
            [lt.util.load :as load]
            [lt.util.cljs :refer [js->clj]])
  (:require-macros [lt.macros :refer [defui]]))

;;****************************************************
;; Proc
;;****************************************************

(def shell (load/node-module "shelljs"))

(object/behavior* ::on-out
                  :triggers #{:proc.out}
                  :reaction (fn [this data]
                              (let [out (.toString data)]
                                (object/update! this [:buffer] str out)
                                (when (> (.indexOf out "Connected") -1)
                                  (do
                                    (notifos/done-working)
                                    (object/merge! this {:connected true})
                                    ;(object/destroy! this)
                                    )))))

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
                                (popup/popup! {:header "We couldn't connect."
                                               :body [:span "Looks like there was an issue trying to connect
                                                      to the project. Here's what we got:" [:pre (:buffer @this)]]
                                               :buttons [{:label "close"}]})
                                )
                              (proc/kill-all (:procs @this))
                              (object/destroy! this)
                              ))

(object/object* ::connecting-notifier
                :triggers []
                :behaviors [::on-exit ::on-error ::on-out]
                :init (fn [this notifier]
                        (object/merge! this {:notifier notifier :buffer ""})
                        nil))

(defn escape-spaces [s]
  (if (= files/separator "\\")
    (str "\"" s "\"")
    (string/replace s #" " "\\ ")))

(def py-path (escape-spaces (files/lt-home "/plugins/python/ltmain.py")))

(defn client-command [info client]
  (str (or (:python-exe @python) (:venv-py info) "python") " " py-path " " tcp/port " " (clients/->id client)))

(defn run-py [{:keys [path project-path name client venv] :as info}]
  (let [n (notifos/working "Connecting..")
        obj (object/create ::connecting-notifier n)
        env (if venv
              {"VIRTUAL_ENV" venv}
              {})
        env (if (:ipython-exe @python)
              (assoc env "LT_IPYTHON_PATH" (:ipython-exe @python))
              env)]
    (println env (client-command info client))
    (proc/exec {:command (client-command info client)
                          :cwd (or venv project-path)
                          :env env
                          :obj obj})))


(defn check-python [obj]
  (assoc obj :python (or (:python-exe @python)
                         (:venv-py obj)
                         (.which shell "python"))))

(defn check-client [obj]
  (assoc obj :python-client (files/exists? py-path)))

(defn find-project [obj]
  (let [p (:path obj)
        roots (files/get-roots)]
    (loop [cur p
           prev ""]
      (if (or (empty? cur)
              (roots cur)
              (= cur prev))
        (assoc obj :project-path nil)
        (if (and (not (files/exists? (files/join cur "__init__.py")))
                 (files/dir? cur))
          (assoc obj :project-path cur)
          (recur (files/parent cur) cur))))))

(defn find-venv [obj]
  (let [to-find (if (platform/win?)
                  "bin\\python"
                  "bin/python")
        vpy (files/walk-up-find (:path obj) to-find)]
    (if (empty? vpy)
      obj
      (assoc obj
        :venv (-> vpy (files/parent) (files/parent))
        :venv-py vpy))))

(defn notify [obj]
  (let [{:keys [python project-path path python-client client]} obj]
    (cond
     (or (not python) (empty? python)) (do
                                         (clients/rem! client)
                                         (notifos/done-working)
                                         (popup/popup! {:header "We couldn't find Python."
                                                      :body "In order to evaluate in Python files, a Python interpreter has to be installed and on your system PATH."
                                                      :buttons [{:label "Download Python"
                                                                 :action (fn []
                                                                           (platform/open "http://www.python.org/download/"))}
                                                                {:label "ok"}]}))
     (not project-path) (do
                          (clients/rem! client)
                          (popup/popup! {:header "We couldn't find this file."
                                       :body "In order to evaluate in Python files, the file has to be on disk somewhere."
                                       :buttons [{:label "Save this file"
                                                  :action (fn []
                                                            (cmd/exec! :save)
                                                            (try-connect obj))}
                                                 {:label "Cancel"
                                                  :action (fn []
                                                            )}]}))
     :else (run-py obj))
    obj))

(defn check-all [obj]
  (-> obj
      (find-venv)
      (check-python)
      (check-client)
      (find-project)
      (notify)))

;;****************************************************
;; Eval
;;****************************************************

(defn try-connect [{:keys [info]}]
  (let [path (:path info)
        client (clients/client! :python.client)]
    (check-all {:path path
                :client client})
    client))

(defn python-watch [meta src]
  (let [meta (js/JSON.stringify (clj->js meta))]
    (str "sys.modules['lttools'].__dict__['watch'](" src ", " meta ")")))

(object/behavior* ::on-eval
                  :triggers #{:eval}
                  :reaction (fn [editor]
                              (object/raise python :eval! {:origin editor
                                                             :info (assoc (@editor :info)
                                                                     :code (watches/watched-range editor nil nil python-watch))})))

(object/behavior* ::on-eval.one
                  :triggers #{:eval.one}
                  :reaction (fn [editor]
                              (let [code (watches/watched-range editor nil nil python-watch)
                                    pos (ed/->cursor editor)
                                    info (:info @editor)
                                    info (if (ed/selection? editor)
                                           (assoc info
                                             :code (ed/selection editor)
                                             :meta {:start (-> (ed/->cursor editor "start") :line)
                                                    :end (-> (ed/->cursor editor "end") :line)})
                                           (assoc info :pos pos :code code))]
                                (object/raise python :eval! {:origin editor
                                                             :info info}))))

(object/behavior* ::python-watch
                  :triggers #{:editor.eval.python.watch}
                  :reaction (fn [editor res]
                              (when-let [watch (get (:watches @editor) (-> res :meta :id))]
                                (let [str-result (:result res)]
                                  (object/raise (:inline-result watch) :update! str-result)))))

(object/behavior* ::python-result
                  :triggers #{:editor.eval.python.result}
                  :reaction (fn [editor res]
                              (notifos/done-working)
                              (object/raise editor :editor.result (:result res) {:line (:end (:meta res))
                                                                                 :start-line (-> res :meta :start)})))

(object/behavior* ::python-success
                  :triggers #{:editor.eval.python.success}
                  :reaction (fn [editor res]
                              (notifos/done-working)
                              (object/raise editor :editor.result "✓" {:line (-> res :meta :end)
                                                                       :start-line (-> res :meta :start)})))

(object/behavior* ::python-exception
                  :triggers #{:editor.eval.python.exception}
                  :reaction (fn [editor ex]
                              (notifos/done-working)
                              (object/raise editor :editor.exception (:ex ex) {:line (-> ex :meta :end)
                                                                               :start-line (-> ex :meta :start)})
                              ))

(defui image [src]
  [:img {:src (str "data:image/png;base64," src)}])

(defui canvas []
  [:canvas])

(object/behavior* ::python-image
                  :triggers #{:editor.eval.python.image}
                  :reaction (fn [editor img]
                              ;(console/log (pr-str img))
                              (object/raise editor :editor.result.underline (image (:image img)) {:line (-> img :meta :end)
                                                                                                  :start-line (-> img :meta :start)})
                              ))

(object/behavior* ::python-printer
                  :triggers #{:editor.eval.python.print}
                  :reaction (fn [editor p]
                              (console/loc-log (files/basename (:file p)) "stdout" (:msg p))))

(object/behavior* ::eval!
                  :triggers #{:eval!}
                  :reaction (fn [this event]
                              (let [{:keys [info origin]} event
                                    client (-> @origin :client :default)]
                                (notifos/working "")
                                (clients/send (eval/get-client! {:command :editor.eval.python
                                                                 :origin origin
                                                                 :info info
                                                                 :create try-connect})
                                              :editor.eval.python
                                              info
                                              :only
                                              origin))))

(def pyzmq-warned false)

(object/behavior* ::pyzmq-error
                  :triggers #{:python.client.error.pyzmq}
                  :reaction (fn [this]
                              (when-not pyzmq-warned
                                (set! pyzmq-warned true)
                                (popup/popup! {:header "Some IPython dependencies are missing."
                                               :body "Looks like you have IPython installed, but you also need pyzmq in order for Light Table to take advantage of the IPython client. You can continue with the default client for a scaled down experience."
                                               :buttons [{:label "Install instructions"
                                                          :action (fn []
                                                                    (platform/open "http://ipython.org/ipython-doc/stable/install/install.html"))}
                                                         {:label "ok"}]}))))

(object/behavior* ::connect
                  :triggers #{:connect}
                  :reaction (fn [this path]
                              (try-connect {:info {:path path}})))


(object/object* ::python-lang
                :tags #{:python.lang})

(def python (object/create ::python-lang))

(scl/add-connector {:name "Python"
                    :desc "Select a directory to serve as the root of your python project."
                    :connect (fn []
                               (dialogs/dir python :connect))})

(object/behavior* ::python-exe
                  :triggers #{:object.instant}
                  :desc "Python: Set the path to the python executable for clients"
                  :type :user
                  :exclusive true
                  :reaction (fn [this exe]
                              (object/merge! python {:python-exe exe})))

(object/behavior* ::ipython-exe
                  :triggers #{:object.instant}
                  :desc "Python: Set the path to ipython for clients"
                  :type :user
                  :exclusive true
                  :reaction (fn [this exe]
                              (object/merge! python {:ipython-exe exe})))

