(ns lt.objs.cli
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.files :as files]
            [lt.objs.workspace :as workspace]
            [lt.util.load :refer [node-module]]
            [lt.util.cljs :refer [js->clj]]
            [clojure.string :as string]
            [lt.objs.opener :as opener])
  (:require-macros [lt.macros :refer [behavior]]))

(defn rebuild-argv [argstr]
  (-> (subs argstr (.indexOf argstr "<d><d>dir"))
      (string/replace "<d>" "-")
      (string/replace "<s>" " ")
      (string/split " ")
      (to-array)))

(defn parse-args [argv]
  (-> (.. (node-module "optimist")
          (options (js-obj "n" (js-obj "boolean" true "alias" "new")
                           "a" (js-obj "boolean" true "alias" "add")
                           "w" (js-obj "boolean" true "alias" "wait")
                           "h" (js-obj "boolean" true "alias" "help")))
          (parse argv))
      (js->clj :keywordize-keys true)))

(defn open-paths [paths add?]
  (doseq [path paths
          :when (not= path (.-execPath js/process))]
    (if (files/exists? path)
      (if (files/dir? path)
        (object/raise workspace/current-ws :add.folder! path)
        (do
          (object/raise opener/opener :open! path)
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
                  :reaction (fn [this]
                              (when (args)
                                (let [args-str (or (app/extract! (args-key (app/window-number)))
                                                   (first (app/args)))
                                      args (parse-args (rebuild-argv args-str))
                                      paths (map #(files/resolve (:dir args) %) (filter valid-path? (:_ args)))
                                      open-dir? (some files/dir? paths)]
                                  (when open-dir?
                                    (object/merge! workspace/current-ws {:initialized? true}))
                                  (open-paths paths (:add args))))))

(behavior ::open!
                  :triggers #{:open!}
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
                                    (open-paths paths (:add args)))))))
