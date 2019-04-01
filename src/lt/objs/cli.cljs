(ns lt.objs.cli
  "Provide behaviors for commandline parsing and opening files from
  commandline or file manager"
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.files :as files]
            [lt.objs.workspace :as workspace]
            [lt.objs.command :as cmd]
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
            (cmd/exec! :go-to-line line))
          (when add?
            (object/raise workspace/current-ws :add.file! path))))
      (object/raise opener/opener :new! path))))

(def parsed-args "Map of commandline options parsed by optimist"
  (js->clj (.getGlobal remote "browserParsedArgs") :keywordize-keys true))

(def open-files "Files to open from a file manager"
  (js->clj (.getGlobal remote "browserOpenFiles")))

(def argv "Arguments used to start LightTable" (js->clj (.-argv (.-process remote))))

(ipc/on "openFileAfterStartup" #(object/raise app/app :open! %))

(defn args
  "Returns path arguments passed to executable or nil if none given. Only returns
  on first window since subsequent windows don't open path arguments."
  []
  (and (app/first-window?)
       ;; OSX adds an extra apple event argument to argv when opening a file from a
       ;; file manager e.g. ["/path/to/electron" "-psn_0_12381134"]. Rather than add
       ;; a brittle check to remove that argument, check open-files first
       (or (seq open-files)
           (seq (if js/process.env.LT_DEV_CLI (subvec argv 2) (rest argv))))))

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::open-on-args
          :triggers #{:post-init}
          :desc "App: Process commandline or file manager arguments"
          :reaction (fn [this]
                      (when (app/first-window?)
                        (let [path-line-pairs (map #(let [[_ path line] (re-find #"^(.*?):?(\d+)?$" %)]
                                                      [(files/resolve files/cwd path) line])
                                                   (args))
                              paths (map first path-line-pairs)
                              open-dir? (some files/dir? paths)]
                          (when open-dir?
                            (object/merge! workspace/current-ws {:initialized? true})
                            (cmd/exec! :workspace.show))
                          (open-paths path-line-pairs (:add parsed-args))))))

(behavior ::open!
          :triggers #{:open!}
          :desc "App: Open path(s) from a file manager after startup"
          :reaction (fn [this path]
                      (when (= (app/fetch :focusedWindow) (app/window-number))
                        (open-paths [[path]] (:add parsed-args)))))
