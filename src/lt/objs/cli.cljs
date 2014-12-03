(ns lt.objs.cli
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.files :as files]
            [lt.objs.workspace :as workspace]
            [lt.objs.command :as cmd]
            [lt.util.load :refer [node-module]]
            [lt.util.cljs :refer [js->clj]]
            [clojure.string :as string]
            [lt.objs.opener :as opener])
  (:require-macros [lt.macros :refer [behavior]]))

(defn rebuild-argv [argstr]
  (to-array
    (map #(string/replace % "<d>" "-")
      (map #(string/replace % "<s>" " ")
        (-> (subs argstr (.indexOf argstr "<d><d>dir"))
          (string/split #"<S>"))))))

(defn parse-args [argv]
  (-> (.. (node-module "optimist")
          (options (js-obj "n" (js-obj "boolean" true "alias" "new")
                           "a" (js-obj "boolean" true "alias" "add")
                           "w" (js-obj "boolean" true "alias" "wait")
                           "h" (js-obj "boolean" true "alias" "help")))
          (parse argv))
      (js->clj :keywordize-keys true)))

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

(defn args-key [winid]
  (str "window" winid "args"))

(defn args []
  (or (app/fetch (args-key (app/window-number)))
      (and (= (app/window-number) 0) (first (app/args)))))

(defn is-lt-binary? [path]
  (#{"ltbin" "node-webkit" "LightTable.exe" "LightTable"} (string/trim (files/basename path))))

(defn valid-path? [path]
  (and (string? path)
       (not (empty? path))
       (not (is-lt-binary? path))))

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::open-on-args
          :triggers #{:post-init}
          :desc "App: Process commandline arguments"
          :reaction (fn [this]
                      (when (args)
                        (let [args-str (or (app/extract! (args-key (app/window-number)))
                                           (first (app/args)))
                              args (parse-args (rebuild-argv args-str))
                              path-line-pairs (map #(let [[_ path line] (re-find #"^(.*?):?(\d+)?$" %)]
                                                      [(files/resolve (:dir args) path) line])
                                                   (filter valid-path? (:_ args)))
                              paths (map first path-line-pairs)
                              open-dir? (some files/dir? paths)]
                          (when open-dir?
                            (object/merge! workspace/current-ws {:initialized? true}))
                          (open-paths path-line-pairs (:add args))))))

(behavior ::open!
          :triggers #{:open!}
          :desc "App: Open a path from a file manager e.g. Finder"
          :reaction (fn [this path]
                      (when (= (app/fetch :focusedWindow) (app/window-number))
                        (let [args (parse-args (rebuild-argv path))
                              paths (map #(files/resolve (:dir args) %) (filter valid-path? (:_ args)))
                              open-dir? (some files/dir? paths)]
                          (if (or (:new args)
                                  (and open-dir? (not (:add args))))
                            (let [winid (inc (app/fetch :window-id))]
                              (app/store! (args-key winid) path)
                              (app/open-window))
                            (open-paths (map vector paths) (:add args)))))))
