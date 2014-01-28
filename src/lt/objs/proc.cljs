(ns lt.objs.proc
  (:require [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.files :as files]
            [lt.objs.platform :as platform]
            [lt.objs.app :as app]
            [lt.objs.notifos :as notifos]
            [lt.util.load :as load]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [behavior]]))

(def shell (load/node-module "shelljs"))
(def spawn (.-spawn (js/require "child_process")))
(def cur-path (.pwd shell))
(def custom-env (atom {}))

(def procs (atom #{}))

(defn add! [p]
  (swap! procs conj p))

(defn rem! [p]
  (swap! procs disj p))

(defn kill [p]
  (.kill p))

(defn kill-all [& [ps]]
  (doseq [p (or ps @procs)]
    (kill p)))

(defn parse-commands [com]
  (let [pipes (string/split com "|")]
    (for [p pipes
          :let [args (filter (complement empty?) (re-seq #"(?:(?:\\\s)|[^\s\"'])+|\"[^\"]*\"|'[^']*'" p))]]
      {:command (first args)
       :args (rest args)})))

(defn merge-env [env]
  (if-not env
    js/process.env
    (clj->js (merge (into {} (for [k (js/Object.keys js/process.env)]
                               [k (aget js/process.env k)]))
                    env
                    @custom-env))))

(defn simple-spawn* [obj {:keys [command args]} cwd? env]
  (let [proc (spawn command
                    (when (seq args) (clj->js args))
                    (js-obj "cwd" cwd?
                            "env" (merge-env env)
                            "windowsVerbatimArguments" (when (= js/process.platform "win32") true)))]
    (add! proc)
    (.on proc "exit" (partial rem! proc))
    (.on proc "error" #(when @obj
                         (println (str %) (> (.indexOf (str %) "ENOENT") -1))
                         (if (> (.indexOf (str %) "ENOENT") -1)
                           (do
                             (object/raise obj :proc.error (str "Could not find command: " command))
                             (object/raise obj :proc.exit)
                             (.kill proc))
                           (object/raise obj :proc.error %))))
    (.stderr.on proc "data" #(if-not @obj
                               (println "ERROR running: " command)
                               (object/raise obj :proc.error %)))
    (.stdout.on proc "data" #(do
                               (when @obj (object/raise obj :proc.out %))))
    (.on proc "exit" #(when @obj (object/raise obj :proc.exit %))
    proc)))

(defn exec [com]
  (let [{:keys [command obj cwd env args] :as this} com
        commands (if-not args
                   (parse-commands command)
                   [this])
        ;;spawn and store them
        procs (doall(for [c commands]
                      (simple-spawn* obj c cwd env)))]
    (object/merge! obj {:procs procs})
    nil))

(behavior ::kill-procs-on-close
                  :triggers #{:closed}
                  :reaction (fn [this]
                              (kill-all)))

(object/add-behavior! app/app ::kill-procs-on-close)

;;*******************************************************
;; Testing
;;*******************************************************

(behavior ::print-all
                  :triggers #{:proc.error :proc.out :proc.exit}
                  :reaction (fn [this data]
                              (println "PROC: " data)))

(object/object* ::test-printer
                :triggers []
                :behaviors [::print-all]
                :init (fn []))

(def printer (object/create ::test-printer))

;;*********************************************************
;; Path setting
;;********************************************************

(defn find-path-files []
  (filter files/exists? [(files/home ".profile") (files/home ".bash_profile")]))

(defn get-path-command []
  (str (reduce (fn [fin cur]
                 (str fin "source " cur " && "))
               ""
               (find-path-files))
       "echo $PATH"))

(defn etc-paths->PATH []
  (if-not (files/exists? "/etc/paths")
    ""
    (let [ps (-> (files/open-sync "/etc/paths")
                 :content
                 (string/split "\n"))
          path-str (->> ps
                        (filter (complement empty?))
                        (interpose ":")
                        (reduce str))]
      (str "PATH=" path-str ":$PATH && "))))

(behavior ::set-path-OSX
                  :triggers #{:init}
                  :reaction (fn [app]
                              (when (and (platform/mac?)
                                         (not (aget js/process.env "LTCLI")))
                                (.exec (js/require "child_process") (str (etc-paths->PATH) (get-path-command))
                                       (fn [err out serr]
                                         (if-not (empty? err)
                                           (do
                                             (notifos/set-msg! "Failed to source PATH files. See console log for details." {:class "error"})
                                             (.error js/console err))
                                           (when-not (empty? out)
                                             (set! js/process.env.PATH out))))))))

(behavior ::global-path
                  :triggers #{:object.instant}
                  :desc "App: set global PATH for processes"
                  :type :user
                  :params [{:label "path"}]
                  :exclusive true
                  :reaction (fn [app path]
                              (set! js/process.env.PATH path)))

(behavior ::global-env
                  :triggers #{:object.instant}
                  :desc "App: add to the global ENV for processes"
                  :params [{:label "env map"}]
                  :type :user
                  :exclusive true
                  :reaction (fn [app kvs]
                              (reset! custom-env kvs)))


(defn var-caps [vs]
  (if (platform/win?)
    (str "echo " (apply str (map #(str "%" % "%;") vs)))
    (str "echo \"" (apply str (map #(str "$" % ";") vs)) "\"")))


(defn capture [cmd vars cb]
  (.exec (js/require "child_process") (str cmd " && " (var-caps vars))
         (fn [err out serr]
           (let [vs (zipmap vars (string/split out ";"))]
             (cb vs)))))
