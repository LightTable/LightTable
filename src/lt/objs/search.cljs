(ns lt.objs.search
  (:require [lt.object :as object]
            [lt.objs.proc :as proc]
            [lt.objs.tabs :as tabs]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd]
            [lt.util.dom :as dom]
            [lt.objs.sidebar.workspace :as workspace]
            [crate.core :as crate]
            [crate.binding :refer [computed]]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [defui]]))

(defn construct-grep [term locs]
  (str "grep -nr " term " " (string/join " " locs)))

(defn parse-grep-result [r]
  (let [[file line & r] (string/split r ":")]
    {:file file
     :line (js/parseInt line)
     :text (string/join ":" r)}))

(defn split-lines [s]
  (string/split s #"\n|\r\n"))

(defn ->res [this]
  (dom/$ :.res (object/->content this)))

(defn wrap-search [s r]
  (.replace r (js/RegExp (str "(" s ")") "gi") "<em>$1</em>"))

(defui ->entry [s r]
  [:p.entry [:span.line (:line r)] [:pre (crate/raw (wrap-search s (:text r)))]]
  :click (fn []
           (cmd/exec! :open-path (:file r))
           (cmd/exec! :goto-line (:line r))))

(defui ->result-item [s r]
  [:li
   [:p.path (files/parent (:file r)) files/separator [:span.file (files/basename (:file r))]]
   (->entry s r)])

(object/behavior* ::on-close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (tabs/rem! this)))

(object/behavior* ::on-data
                  :triggers #{:proc.out}
                  :reaction (fn [this d]
                              (object/update! this [:buffer] str d)
                              (when (= (last (:buffer @this)) "\n")
                                (doseq [s (split-lines (:buffer @this))
                                        :when (not (empty? s))]
                                  (object/raise this :result s))
                                (object/merge! this {:buffer ""}))))

(object/behavior* ::clear!
                  :triggers #{:clear!}
                  :reaction (fn [this]
                              (dom/empty (->res this))))

(object/behavior* ::search!
                  :triggers #{:search!}
                  :reaction (fn [this s folder]
                              (object/raise this :clear!)
                              (object/merge! this {:search s})
                              (proc/exec {:command (construct-grep s [folder])
                                          :obj this})
                              ))

(object/behavior* ::on-result
                  :triggers #{:result}
                  :reaction (fn [this s]
                              (let [result (parse-grep-result s)]
                                (if (= (:cur-path @this) (:file result))
                                  (dom/append (:cur-item @this) (->entry (:search @this) result))
                                  (let [neue (->result-item (:search @this) result)]
                                    (println s)
                                    (object/merge! this {:cur-item neue
                                                         :cur-path (:file result)})
                                    (dom/append (->res this) neue))))))

(object/object* ::workspace-search
                :tags #{:searcher}
                :name "Search results"
                :init (fn [this]
                        [:div.search-results
                         [:ul.res
                          ]
                         ]
                        ))

(object/tag-behaviors :searcher [::on-data ::on-result ::search! ::clear! ::on-close])

(def searcher (object/create ::workspace-search))

;(time (object/raise searcher :search! "pool/create" "/users/chris/lighttable/playground/src"))

;(do (tabs/add! searcher) nil)
