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

(def remote (js/require "remote"))

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

(def parsed-args "Map of commandline options parsed by optimist"
  (js->clj (.getGlobal remote "browserParsedArgs") :keywordize-keys true))

(def open-files "Files to open from a file manager"
  (js->clj (.getGlobal remote "browserOpenFiles")))

(def argv "Arguments used to start LightTable" (js->clj (.-argv (.-process remote))))

(ipc/on "openFileAfterStartup" #(object/raise app/app :open! %))

(defn args
  "Returns truthy if LT opened with any path arguments. Only returns truthy on first window
  since subsequent windows don't open path arguments."
  []
  (and (app/first-window?)
       (or (seq (filter valid-path? argv))
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
                                                 (filter valid-path? argv))
                            paths (map first path-line-pairs)
                            open-dir? (some files/dir? paths)]
                        (when open-dir?
                          (object/merge! workspace/current-ws {:initialized? true}))
                        (open-paths path-line-pairs (:add parsed-args))))))

(behavior ::open!
          :triggers #{:post-init}
          :desc "App: Open path(s) from a file manager e.g. Finder on startup"
          :reaction (fn [this]
                      (when (app/first-window?)
                        (open-paths (map vector open-files) (:add parsed-args)))))

(behavior ::open-after-startup!
          :triggers #{:open!}
          :desc "App: Open path(s) from a file manager after startup"
          :reaction (fn [this path]
                      (when (= (app/fetch :focusedWindow) (app/window-number))
                        (open-paths [[path]] (:add parsed-args)))))
