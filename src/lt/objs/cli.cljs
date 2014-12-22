(ns lt.objs.cli
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.files :as files]
            [lt.objs.workspace :as workspace]
            [lt.objs.command :as cmd]
            [lt.util.cljs :refer [js->clj]]
            [clojure.string :as string]
            [lt.util.ipc :as ipc]
            [lt.objs.opener :as opener])
  (:require-macros [lt.macros :refer [behavior]]))

(defn open-paths [path-line-pairs add?]
  (doseq [[path line] path-line-pairs
          :when (not= path (.-execPath js/process))]
    (if (files/exists? path)
      (if (files/dir? path)
        (object/raise workspace/current-ws :add.folder! path)
        (do
          (object/raise opener/opener :open! path)
          (when line
            (cmd/exec! :goto-line line))
          (when add?
            (object/raise workspace/current-ws :add.file! path))))
      (object/raise opener/opener :new! path))))

(defn is-lt-binary? [path]
  (#{"ltbin" "Atom" "deploy" "LightTable.exe" "LightTable"} (string/trim (files/basename path))))

(defn valid-path? [path]
  (and (string? path)
       (not (empty? path))
       (not (is-lt-binary? path))))

(def parsed-args "Map of commandline options parsed by optimist. :_ contains non-option args." nil)

(ipc/on "cli" #(set! parsed-args (js->clj % :keywordize-keys true)))

(def open-files "Files to open from a file manager" nil)

(ipc/on "openFile" #(set! open-files (js->clj %)))

(defn args
  "Returns truthy if LT opened with any path arguments. Only returns truthy on first window
  since subsequent windows don't open path arguments."
  []
  (and (app/first-window?)
       (or (seq (filter valid-path? (:_ parsed-args)))
           (seq open-files))))

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::open-on-args
          :triggers #{:post-init}
          :desc "App: Process commandline arguments"
          :reaction (fn [this]
                      (when (app/first-window?)
                        (let [path-line-pairs (map #(let [[_ path line] (re-find #"^(.*?):?(\d+)?$" %)]
                                                    [(files/resolve (:dir parsed-args) path) line])
                                                 (filter valid-path? (:_ parsed-args)))
                            paths (map first path-line-pairs)
                            open-dir? (some files/dir? paths)]
                        (when open-dir?
                          (object/merge! workspace/current-ws {:initialized? true}))
                        (open-paths path-line-pairs (:add parsed-args))))))

(behavior ::open!
          :triggers #{:post-init}
          :desc "App: Open path(s) from a file manager e.g. Finder"
          :reaction (fn [this]
                      (when (app/first-window?)
                        (open-paths (map vector open-files) (:add parsed-args)))))
