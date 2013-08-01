(ns lt.objs.search
  (:require [lt.object :as object]
            [lt.objs.proc :as proc]
            [lt.objs.tabs :as tabs]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd]
            [lt.objs.context :as ctx]
            [lt.util.dom :as dom]
            [lt.objs.workspace :as workspace2]
            [crate.core :as crate]
            [crate.binding :refer [computed bound]]
            [lt.util.js :refer [wait now]]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [defui extract foreach]]))



(def result-threshold 300)

(defmulti location identity)

(defmethod location "<workspace>" [_]
  (apply concat ((juxt :folders :files) (workspace2/serialize @workspace2/current-ws))))

(defmethod location :default [loc]
  [loc])

(defn string->loc [loc-str]
  (mapcat (comp location string/trim) (string/split loc-str ",")))

(defn construct-grep [term locs]
  (str "grep -Iinr " term " " (string/join " " locs)))

(defn parse-grep-result [r]
  (let [[file line & r] (string/split r ":")]
    {:file file
     :line (js/parseInt line)
     :text (string/join ":" r)}))

(defn split-lines [s]
  (.split s #"\n|\r\n"))

(defn ->res [this]
  (dom/$ :.res (object/->content this)))

(defn wrap-search [s r]
  (.replace r (js/RegExp (str "(" s ")") "gi") "<em>$1</em>"))

(defui ->entry [s r]
  [:p.entry (crate/raw (str "<span class='line'>" (:line r) "</span><pre>" (wrap-search s (:text r)) "</pre>"))]
  :click (fn []
           (cmd/exec! :open-path (:file r))
           (cmd/exec! :goto-line (:line r))))

(defui ->result-item [s r]
  [:li
   [:p.path [:span.file (files/basename (:file r))] "(" (files/parent (:file r)) ")"]
   (->entry s r)])

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

(defn result-tick [this]
  (when-not (:timeout @this)
  (if-not (zero? (.-length (:results @this)))
    (let [taken (take 15 (:results @this))]
      (doseq [r taken]
        (when-not (empty? r)
          (object/raise this :result r)))
      (.splice (:results @this) 0 (count taken))
      (object/merge! this {:timeout (wait 20 (fn []
                                               (object/merge! this {:timeout nil})
                                               (result-tick this)))}))
    (object/merge! this {:timeout false}))))

(object/behavior* ::on-close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (tabs/rem! this)))

(object/behavior* ::on-end
                  :triggers #{:proc.exit}
                  :reaction (fn [this]
                              ))

(object/behavior* ::on-data
                  :triggers #{:proc.out}
                  :reaction (fn [this d]
                              (object/update! this [:buffer] str d)
                              (let [s (split-lines (:buffer @this))
                                    last (.pop s)]
                                (object/merge! this {:buffer last
                                                     :result-count (+ (count s) (:result-count @this))})
                                (when (< (:result-count @this) result-threshold)
                                  (.push.apply (:results @this) (:results @this) s)
                                  (result-tick this)))))

(object/behavior* ::clear!
                  :triggers #{:clear!}
                  :reaction (fn [this]
                              (object/merge! this {:timeout nil :results (array) :result-count 0})
                              (dom/empty (->res this))))

(object/behavior* ::search!
                  :triggers #{:search!}
                  :reaction (fn [this info]
                              (object/raise this :clear!)
                              (object/merge! this {:search (:search info)})
                              (proc/exec {:command (construct-grep (:search info) (string->loc (:loc info)))
                                          :obj this})
                              ))

(object/behavior* ::on-result
                  :triggers #{:result}
                  :reaction (fn [this s]
                              (let [result (parse-grep-result s)]
                                (if (= (:cur-path @this) (:file result))
                                  (dom/append (:cur-item @this) (->entry (:search @this) result))
                                  (let [neue (->result-item (:search @this) result)]
                                    (object/merge! this {:cur-item neue
                                                         :cur-path (:file result)})
                                    (dom/append (->res this) neue))))))

(defn result-count [this]
  (list "Num results: " [:span (:result-count this)]
        (when (> (:result-count this) result-threshold)
          (list " Showing " [:span result-threshold]))))

(object/object* ::workspace-search
                :tags #{:searcher}
                :results (array)
                :name "Search results"
                :init (fn [this]
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
                      (tabs/add-or-focus! searcher)
                      (tabs/active! searcher)
                      (object/raise searcher :focus))})


(def searcher (object/create ::workspace-search))
