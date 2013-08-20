(ns lt.objs.search
  (:require [lt.object :as object]
            [lt.objs.proc :as proc]
            [lt.objs.tabs :as tabs]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd]
            [lt.objs.context :as ctx]
            [lt.objs.notifos :as notifos]
            [lt.objs.platform :as platform]
            [lt.objs.thread :as thread]
            [lt.util.dom :as dom]
            [lt.objs.workspace :as workspace2]
            [crate.core :as crate]
            [crate.binding :refer [computed bound]]
            [lt.util.js :refer [wait now]]
            [lt.util.load :as load]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [defui extract foreach background]]))

(def search! (background (fn [obj-id opts]
                          (let [replacer (js/require (str js/ltpath "/core/node_modules/replace"))
                                search (if-let [pattern (re-seq #"^/(.+)/$" (:search opts))]
                                         (js/RegExp. (-> pattern first second))
                                         (:search opts))
                                final (replacer (clj->js {:regex search
                                                          :exclude (when (:exclude opts)
                                                                     (js/RegExp. (:exclude opts)))
                                                          :recursive true
                                                          :ignoreCase (-> (re-seq #"[A-Z]" (:search opts))
                                                                          (boolean)
                                                                          (not))
                                                          :replacement (:replacement opts)
                                                          :paths (:paths opts)
                                                          :result (fn [r]
                                                                    (js/_send obj-id :result r))}))]
                            (raise obj-id :done-searching {:total (.-totalFiles final)
                                                           :time (.-time final)})))))

(def result-threshold 300)

(defmulti location identity)

(defmethod location "<workspace>" [_]
  (apply concat ((juxt :folders :files) (workspace2/serialize @workspace2/current-ws))))

(defmethod location :default [loc]
  [loc])

(defn string->loc [loc-str]
  (mapcat (comp location string/trim) (string/split loc-str ",")))

(defn ->res [this]
  (dom/$ :.res (object/->content this)))

(defui ->entry [r file]
  [:p.entry (crate/raw (str "<span class='line'>" (.-line r) "</span><pre>" (.-text r) "</pre>"))]
  :click (fn []
           (cmd/exec! :open-path file)
           (cmd/exec! :goto-line (.-line r))))

(defui ->result-item [r]
  (let [file (.-file r)]
    [:li
     [:p.path [:span.file (files/basename file)] "(" (files/parent file) ")"]
     (for [r (.-results r)]
       (->entry r file))]))

(defui search-box [this]
  [:input.search {:type "text" :placeholder "Search"}]
  :focus (fn []
           (ctx/in! :searcher.search this))
  :blur (fn []
          (ctx/out! :searcher.search)))

(defui replace-box [this]
  [:input.replace {:type "text" :placeholder "Replace"}]
  :focus (fn []
           (ctx/in! :searcher.replace this))
  :blur (fn []
          (ctx/out! :searcher.replace)))

(defui location-box [this]
  [:input.loc {:type "text" :placeholder "Locations" :value "<workspace>"}]
  :focus (fn []
           (ctx/in! :searcher.location this))
  :blur (fn []
          (ctx/out! :searcher.location)))

(defn ->search-info [this]
  (extract (object/->content this)
           [search :.search
            replace :.replace
            loc :.loc]
    {:search (dom/val search)
     :replace (dom/val replace)
     :loc (dom/val loc)}))

(object/behavior* ::on-close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (tabs/rem! this)))

(object/behavior* ::clear!
                  :triggers #{:clear!}
                  :reaction (fn [this]
                              (object/merge! this {:timeout nil :results (array) :result-count 0 ::time nil ::filesSearched nil})
                              (dom/empty (->res this))))

(object/behavior* ::search!
                  :triggers #{:search!}
                  :reaction (fn [this]
                              (object/raise this :clear!)
                              (let [info (->search-info this)]
                                (object/merge! this info)
                                (notifos/working "Searching workspace...")
                                (search! this (assoc info
                                                :exclude (.-source files/ignore-pattern)
                                                :paths (string->loc (:loc info)))))))

(object/behavior* ::replace!
                  :triggers #{:replace!}
                  :reaction (fn [this]
                              (object/raise this :clear!)
                              (let [info (->search-info this)]
                                (object/merge! this info)
                                (notifos/working "Replacing all in workspace...")
                                (search! this (assoc info
                                                :replacement (:replace info)
                                                :exclude (.-source files/ignore-pattern)
                                                :paths (string->loc (:loc info)))))))

(object/behavior* ::done-searching
                  :triggers #{:done-searching}
                  :reaction (fn [this info]
                              (object/merge! this {::time (/ (:time info) 1000)
                                                   ::filesSearched (:total info)})
                              (notifos/done-working (str "Found " (:result-count @this) " results searching " (:total info) " files in " (/ (:time info) 1000) "s." ))))

(object/behavior* ::on-result
                  :triggers #{:result}
                  :reaction (fn [this result]
                              (let [total (count (.-results result))
                                    result (if (> (+ total (:result-count @this)))
                                             (js-obj "file" (.-file result)
                                                     "results" (.slice (.-results result) 0 (- result-threshold (:result-count @this))))
                                             result)]
                                (when (< (:result-count @this) result-threshold)
                                  (dom/append (->res this) (->result-item result)))
                                (object/update! this [:result-count] + total))))

(object/behavior* ::focus
                  :triggers #{:focus! :show}
                  :reaction (fn [this]
                              (.focus (dom/$ :.search (object/->content this)))))

(defn result-count [this]
  (list "Found  " [:span (:result-count this) " results"]
        (when (> (:result-count this) result-threshold)
          (list " (showing " [:span result-threshold] ")"))
        (when (::time this)
          (list " in " (::time this) "s")
          )
        ))

(object/object* ::workspace-search
                :tags #{:searcher}
                :results (array)
                :name "Search results"
                :init (fn [this]
                        (object/add-tags this [(if (platform/win?)
                                                 :searcher.win
                                                 :searcher.unix)])
                        [:div.search-results
                         [:ul.res
                          ]
                         [:div.searcher
                          [:p (bound this result-count)]
                          (search-box this)
                          (replace-box this)
                          (location-box this)
                          ]
                         ]
                        ))

(cmd/command {:command :searcher.search
              :desc "Searcher: Execute search"
              :hidden true
              :exec (fn [info]
                      (let [info (or info (->search-info searcher))]
                        (object/raise searcher :search! info)))})

(cmd/command {:command :searcher.show
              :desc "Searcher: Search in workspace"
              :exec (fn []
                      (tabs/add-or-focus! searcher))})


(def searcher (object/create ::workspace-search))
