(ns lt.objs.sidebar.navigate
  "Provide sidebar for finding and opening files"
  (:require [lt.object :as object]
            [lt.objs.workspace :as workspace]
            [lt.objs.context :as ctx]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.files :as files]
            [lt.objs.notifos :as notifos]
            [lt.objs.keyboard :as keyboard]
            [lt.objs.opener :as opener]
            [lt.objs.sidebar :as sidebar]
            [lt.util.dom :as dom]
            [lt.objs.thread]
            [lt.util.load :as load]
            [crate.core :as crate]
            [crate.binding :refer [bound subatom]])
  (:require-macros [lt.macros :refer [behavior defui background]]))


(defn file-filters [f]
  (re-seq files/ignore-pattern f))

(def populate-bg (background (fn [obj-id {:keys [lim pattern ws]}]
                               (let [fs (js/require "fs")
                                     fpath (js/require "path")
                                     walkdir (js/require (str js/ltpath "/core/node_modules/lighttable/background/walkdir2.js"))
                                     grab-files (fn [all-files folder]
                                                  (let [root-length (inc (count (.dirname fpath folder)))
                                                        walked (walkdir folder (js-obj "filter" (js/RegExp. pattern)
                                                                                        "limit" lim))]
                                                    (.concat all-files (.map (.-paths walked)
                                                                             #(js-obj "full" %
                                                                                      "rel" (subs % root-length))))))
                                     all-files (.reduce (to-array (:folders ws)) grab-files (array))
                                     other-files (.map (to-array (:files ws)) #(js-obj "full" % "rel" (.basename fpath %)))
                                     final (.concat all-files other-files)]
                                 (js/_send obj-id :workspace-files final)
                                 ))))

(declare sidebar-navigate)

(behavior ::workspace-files
          :triggers #{:workspace-files}
          :reaction (fn [this files]
                      (object/merge! this {:files (js->clj files :keywordize-keys true)})
                      (object/raise (:filter-list @this) :refresh!)
                      ))

(behavior ::populate-on-ws-update
          :triggers #{:updated :refresh}
          :debounce 150
          :reaction (fn [ws]
                      (populate-bg sidebar-navigate {:lim (dec (:file-limit @sidebar-navigate))
                                                     :pattern (.-source files/ignore-pattern)
                                                     :ws (workspace/serialize @ws)})))

(behavior ::watched.create
          :triggers #{:watched.create}
          :reaction (fn [ws path]
                      (when-not (file-filters (files/basename path))
                        (let [ws-parent (files/parent (first (filter #(= 0 (.indexOf path %)) (:folders @ws))))
                              rel-length (inc (count ws-parent))]
                          (object/update! sidebar-navigate [:files] conj {:full path :rel (subs path rel-length)})
                          (object/raise (:filter-list @sidebar-navigate) :refresh!)))))

(behavior ::watched.delete
          :triggers #{:watched.delete}
          :reaction (fn [ws path]
                      ;;TODO: this is terribly inefficient
                      (object/update! sidebar-navigate [:files] #(remove (fn [x] (= 0 (.indexOf (:full x) path))) %))
                      (object/raise (:filter-list @sidebar-navigate) :refresh!)))

(behavior ::focus!
          :triggers #{:focus!}
          :reaction (fn [this]
                      (object/raise (:filter-list @this) :focus!)
                      ))

(behavior ::focus-on-show
          :triggers #{:show}
          :reaction (fn [this]
                      (object/raise this :focus!)))

(behavior ::open-on-select
          :triggers #{:select}
          :reaction (fn [this cur]
                      (object/raise opener/opener :open! (:full cur))))

(behavior ::escape!
          :triggers #{:escape!}
          :reaction (fn [this]
                      (cmd/exec! :escape-navigate)
                      (cmd/exec! :focus-last-editor)))

(behavior ::pop-transient-on-select
          :triggers #{:selected}
          :reaction (fn [this]
                      (object/raise sidebar/rightbar :close!)))

(behavior ::set-file-limit
          :triggers #{:object.instant}
          :type :user
          :desc "Navigate: set maximum number of indexed files"
          :params [{:label "Number"
                    :example 8000}]
          :reaction (fn [this n]
                      (object/merge! this {:file-limit n})))

(object/object* ::sidebar.navigate
                :tags #{:navigator}
                :label "navigate"
                :order -3
                :selected 0
                :files []
                :file-limit 8000
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

(def sidebar-navigate (object/create ::sidebar.navigate))

(sidebar/add-item sidebar/rightbar sidebar-navigate)

(cmd/command {:command :navigate-workspace
              :desc "Navigate: open navigate"
              :exec (fn []
                      (object/raise sidebar/rightbar :toggle sidebar-navigate {:transient? false})
                      )})

(cmd/command {:command :navigate-workspace-transient
              :desc "Navigate: open navigate transient"
              :hidden true
              :exec (fn []
                      (object/raise sidebar/rightbar :toggle sidebar-navigate {:transient? true})
                      )})

(cmd/command {:command :escape-navigate
              :desc "Navigate: exit navigate"
              :hidden true
              :exec (fn []
                      (cmd/exec! :close-sidebar)
                      (cmd/exec! :focus-last-editor))})
