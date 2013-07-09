(ns lt.objs.proc
  (:require [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.files :as files]
            [lt.objs.platform :as platform]
            [lt.objs.app :as app]
            [clojure.string :as string]))

;;TODO: kill processes on shutdown

(def shell (js/require "shelljs"))
(def spawn (.-spawn (js/require "child_process")))
(def cur-path (.pwd shell))

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

(defn spawn* [{:keys [command args]} cwd?]
  (let [proc (spawn command
                    (when (seq args) (clj->js args))
                    (js-obj "cwd" cwd?
                            "windowsVerbatimArguments" (when (= js/process.platform "win32") true)))]
    (add! proc)
    (.on proc "exit" (partial rem! proc))
    proc))

(defn pipe* [procs]
  (let [ps (partition 2 1 procs)]
    (doseq [[a b] ps]
      (.stdout.on a "data" (fn [data]
                             (.stdin.write b data))))))

(defn pipe [procs obj com]
  (when (> (count procs) 1)
    (pipe* procs))
  (doseq [p procs]
    (.stderr.on p "data" #(if-not @obj
                            (println "ERROR running: " com)
                            (object/raise obj :proc.error %))))
  (-> (last procs)
      (.stdout.on "data" #(when @obj (object/raise obj :proc.out %)))
      (.on "exit" #(when @obj (object/raise obj :proc.exit %)))))

(defn merge-env [o]
  (if-not o
    js/process.env
    (clj->js (into o (for [k (js/Object.keys js/process.env)]
                       [k (aget js/process.env k)])))))

(defn simple-spawn* [obj {:keys [command args]} cwd? env]
  (let [proc (spawn command
                    (when (seq args) (clj->js args))
                    (js-obj "cwd" cwd?
                            "env" (merge-env env)
                            "windowsVerbatimArguments" (when (= js/process.platform "win32") true)))]
    (add! proc)
    (.on proc "exit" (partial rem! proc))
    (.stderr.on proc "data" #(if-not @obj
                               (println "ERROR running: " com)
                               (object/raise obj :proc.error %)))
    (.stdout.on proc "data" #(do
                               (when @obj (object/raise obj :proc.out %))))
    (.on proc "exit" #(when @obj (object/raise obj :proc.exit %))
    proc)))

(defn exec [com]
  (let [{:keys [command obj cwd env]} com
        commands (parse-commands command)
        ;;spawn and store them
        procs (doall(for [c commands]
                      (simple-spawn* obj c cwd env)))]
    (object/merge! obj {:procs procs})
    ;(pipe procs obj com)
    nil))

(object/behavior* ::kill-procs-on-close
                  :triggers #{:closed}
                  :reaction (fn [this]
                              (kill-all)))

(object/add-behavior! app/app ::kill-procs-on-close)


;;*******************************************************
;; Testing
;;*******************************************************

(object/behavior* ::print-all
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

(object/behavior* ::set-path-OSX
                  :triggers #{:init}
                  :reaction (fn [app]
                              (when (and (platform/mac?)
                                         (not (aget js/process.env "LTCLI")))
                                (.exec (js/require "child_process") (str (etc-paths->PATH) (get-path-command))
                                       (fn [err out serr]
                                         (when-not (empty? out)
                                           (set! js/process.env.PATH out)))))))

(object/tag-behaviors :app [::set-path-OSX])

(defn var-caps [vs]
  (if (platform/win?)
    (str "echo " (apply str (map #(str "%" % "%;") vs)))
    (str "echo \"" (apply str (map #(str "$" % ";") vs)) "\"")))


(defn capture [cmd vars cb]
  (.exec (js/require "child_process") (str cmd " && " (var-caps vars))
         (fn [err out serr]
           (let [vs (zipmap vars (string/split out ";"))]
             (cb vs)))))
