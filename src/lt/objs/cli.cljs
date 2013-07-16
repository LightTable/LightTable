(ns lt.objs.cli
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.window :as window]
            [lt.objs.files :as files]
            [lt.objs.workspace :as workspace]
            [lt.util.load :refer [node-module]]
            [lt.util.cljs :refer [js->clj]]
            [clojure.string :as string]
            [lt.objs.opener :as opener]))

(defn rebuild-argv [argstr]
  (-> (string/replace argstr "<s>" " ")
      (string/replace "<d>" "-")
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
  (doseq [path paths]
    (if (files/exists? path)
      (if (files/dir? path)
        (object/raise workspace/current-ws :add.folder! path)
        (do
          (object/raise opener/opener :open! path)
          (when add?
            (object/raise workspace/current-ws :add.file! path))))
      (object/raise opener/opener :new! path))))

;;*********************************************************
;; Behaviors
;;*********************************************************

(object/behavior* ::open-on-args
                  :triggers #{:init}
                  :reaction (fn [this]
                              (println "Win args: " (window/window-number) (window/app-fetch (window/window-number) :args))
                              (when (or (window/app-fetch (window/window-number) :args) (and (app/args) (= (window/window-number) 0)))
                                (let [args-str (or (window/app-extract! (window/window-number) :args)
                                                   (first (app/args)))
                                      args (parse-args (rebuild-argv args-str))
                                      _ (println "parsed args:" (pr-str args))
                                      paths (map #(files/resolve (:dir args) %) (filter (complement empty?) (:_ args)))
                                      open-dir? (some files/dir? paths)]
                                  (when open-dir?
                                    (object/merge! workspace/current-ws {:initialized? true}))
                                  (open-paths paths (:add args))))))

(object/behavior* ::open!
                  :triggers #{:open!}
                  :reaction (fn [this path]
                              (println "here with: " path (app/fetch :focusedWindow) (window/window-number))
                              (when (= (app/fetch :focusedWindow) (window/window-number))
                                (let [args (parse-args (rebuild-argv path))
                                      paths (map #(files/resolve (:dir args) %) (filter (complement empty?) (:_ args)))
                                      open-dir? (some files/dir? paths)]
                                  (if (or (:new args)
                                          (and open-dir? (not (:add args))))
                                    (let [winid (inc (app/fetch :window-id))]
                                      (window/app-store! winid :args path)
                                      (app/open-window))
                                    (open-paths paths (:add args)))))))
