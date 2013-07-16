(ns lt.objs.sidebar.navigate
  (:require [lt.object :as object]
            [lt.objs.workspace :as workspace]
            [lt.objs.context :as ctx]
            [lt.objs.settings :as settings]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.files :as files]
            [lt.objs.notifos :as notifos]
            [lt.objs.keyboard :as keyboard]
            [lt.objs.opener :as opener]
            [lt.objs.sidebar :as sidebar]
            [lt.util.dom :as dom]
            [lt.util.load :as load]
            [lt.util.cljs :as cljs-util]
            [crate.core :as crate]
            [crate.binding :refer [bound subatom]])
  (:require-macros [lt.macros :refer [defui background]]))


(defn file-filters [f]
  (re-seq files/ignore-pattern f))

(defn populate [ws]
  (let [files (reduce grab-files [] (:folders ws))
        fs (map #(do {:full % :rel (files/basename %)}) (:files ws))]
    (vec (filter #(files/file? (:full %)) (remove #(-> % :rel file-filters) (concat files fs))))))

(def populate-bg (background (fn [obj-id {:keys [ws pattern]}]
                               (time
                               (let [fs (js/require "fs")
                                     fpath (js/require "path")
                                     walkdir (js/require (str js/ltpath "/core/node_modules/lighttable/background/walkdir2.js"))
                                     grab-files (fn [all-files folder]
                                                  (let [root-length (inc (count (.dirname fpath folder)))
                                                        walked (walkdir folder (clj->js {:filter (js/RegExp. pattern)
                                                                                         :limit 8000}))]
                                                    (.concat all-files (.map (.-paths walked)
                                                                             #(js-obj "full" %
                                                                                      "rel" (subs % root-length))))))
                                     all-files (.reduce (to-array (:folders ws)) grab-files (array))
                                     other-files (.map (to-array (:files ws)) #(js-obj "full" % "rel" (.basename fpath %)))
                                     final (.concat all-files other-files)]
                                 (set! *print-fn* (fn [x]
                                                    (when (and x (not= x "") (not= x "\n"))
                                                      (.log js/console (js/clojure.string.trim x)))))
                                 (js/_send obj-id :workspace-files final)
                                 )))))

(object/behavior* ::workspace-files
                  :triggers #{:workspace-files}
                  :reaction (fn [this files]
                              (object/merge! this {:files (time (cljs-util/js->clj files :keywordize-keys true))})
                              (object/raise (:filter-list @this) :refresh!)
                              ))

(object/behavior* ::populate-on-ws-update
                  :triggers #{:updated :refresh}
                  :debounce 500
                  :reaction (fn [ws]
                              (populate-bg sidebar-navigate {:pattern (.-source files/ignore-pattern)
                                                             :ws (workspace/serialize @ws)})))

(object/behavior* ::watched.create
                  :triggers #{:watched.create}
                  :reaction (fn [ws path]
                              (when-not (file-filters (files/basename path))
                                (let [ws-parent (files/parent (first (filter #(= 0 (.indexOf path %)) (:folders @ws))))
                                      rel-length (inc (count ws-parent))]
                                  (object/update! sidebar-navigate [:files] conj {:full path :rel (subs path rel-length)})
                                  (object/raise (:filter-list @sidebar-navigate) :refresh!)))))

(object/behavior* ::watched.delete
                  :triggers #{:watched.delete}
                  :reaction (fn [ws path]
                              ;;TODO: this is terribly inefficient
                              (object/update! sidebar-navigate [:files] #(remove (fn [x] (= 0 (.indexOf (:full x) path))) %))
                              (object/raise (:filter-list @sidebar-navigate) :refresh!)))

(object/behavior* ::focus!
                  :triggers #{:focus!}
                  :reaction (fn [this]
                              (object/raise (:filter-list @this) :focus!)
                              ))

(object/behavior* ::open-on-select
                  :triggers #{:select}
                  :reaction (fn [this cur]
                              (object/raise opener/opener :open! (:full cur))))

(object/behavior* ::escape!
                  :triggers #{:escape!}
                  :reaction (fn [this]
                              (cmd/exec! :escape-navigate)
                              (cmd/exec! :focus-last-editor)))

(object/behavior* ::pop-transient-on-select
                  :triggers #{:selected}
                  :reaction (fn [this]
                              (object/raise sidebar/rightbar :close!)))

(object/object* ::sidebar.navigate
                :tags #{:navigator}
                :label "navigate"
                :order -3
                :selected 0
                :files []
                :search ""
                :init (fn [this]
                        (let [list (cmd/filter-list {:key :rel
                                                     :transform #(str "<h2>" (files/basename %) "</h2><p>" %3 "</p>")
                                                     :items (subatom this :files)
                                                     :placeholder "file"})]
                        (object/add-tags list [:navigate.selector])
                        (object/merge! this {:filter-list list})
                        [:div.navigate
                         (object/->content list)
                         ]
                        )))

(object/tag-behaviors :navigator [::focus! ::workspace-files])
(object/tag-behaviors :navigate.selector [::open-on-select ::escape! ::pop-transient-on-select])

(def sidebar-navigate (object/create ::sidebar.navigate))

(sidebar/add-item sidebar/rightbar sidebar-navigate)

(object/tag-behaviors :workspace [::populate-on-ws-update ::watched.delete ::watched.create])

(cmd/command {:command :navigate-workspace
              :desc "Navigate: open navigate"
              :exec (fn []
                      (object/raise sidebar/rightbar :toggle sidebar-navigate {:force? true
                                                                              :transient? false})
                      (object/raise sidebar-navigate :focus!))})

(cmd/command {:command :navigate-workspace-transient
              :desc "Navigate: open navigate transient"
              :hidden true
              :exec (fn []
                      (object/raise sidebar/rightbar :toggle sidebar-navigate {:transient? true})
                      (object/raise sidebar-navigate :focus!))})

(cmd/command {:command :escape-navigate
              :desc "Navigate: exit navigate"
              :hidden true
              :exec (fn []
                      (cmd/exec! :close-sidebar)
                      (cmd/exec! :focus-last-editor))})

;;**********************************************************
;; Exclude pattern
;;**********************************************************

(defn set-exclude! [v]
  (set! files/ignore-pattern (re-pattern v)))

(def pattern-options (cmd/options-input {:placeholder "pattern"
                                         :value (.-source files/ignore-pattern)}))

(object/behavior* ::set-pattern
                  :triggers #{:select}
                  :reaction (fn [this v]
                              (cmd/exec-active! v)))

(object/add-behavior! pattern-options ::set-pattern)

(cmd/command {:command :set-exclude-pattern
              :desc "Workspace: hide/exclude files pattern"
              :options pattern-options
              :exec (fn [v]
                      (settings/store! :exclude-pattern v)
                      (set-exclude! v)
                      (object/raise workspace/current-ws :refresh)
                      (notifos/set-msg! "Exclusion pattern set"))})

(object/behavior* ::set-exclude-on-init
                  :triggers #{:init}
                  :reaction (fn [this]
                              (when-let [pattern (settings/fetch :exclude-pattern)]
                                (object/merge! pattern-options {:value pattern})
                                (set-exclude! pattern))))

(object/tag-behaviors :app [::set-exclude-on-init])

