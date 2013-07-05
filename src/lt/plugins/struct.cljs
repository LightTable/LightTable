(ns lt.plugins.struct
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [cljs.reader :as reader])
  (:require-macros [lt.macros :refer [defui]]))

(object/behavior* ::rem-on-close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (tabs/rem! this)))

(object/object* ::editor.structural
                :tags #{:editor.structural}
                :name "struct"
                :init (fn [this]
                            [:div.struct

                             [:p "hey"]]
                            ))

(object/tag-behaviors :editor.structural [::rem-on-close])

(defn add! []
  (let [o (object/create ::editor.structural)]
    (tabs/add! o)
    o))

(def content (reader/read-string "(
                                 (defn update-entries! []
  (let [last-entry (latest-entry)
        ds (butlast (drop-while (< (first a) last-entry) (days)))]
    (doseq [[start end] ds
            :let [minutes (minutes-count start end :metrics.minute)
                  uniques (unique-count start end :metrics.minute)]]
      (insert! :minutes-per-day {:start start :end end :minutes minutes})
      (insert! :uniques-per-day {:start start :end end :uniques uniques :count (count uniques)}) )
    ds))

(defn normalized-charts []
  (let [all (minutes-per-day)
        s (sd all)
        m (mean all)
        cleaned (doall (map (/ a 60) (remove (> a (+ s (* 2 m))) all)))
        weeks (partition-all 7 cleaned)
        summed (map (apply + a) (butlast weeks)) ]
    (view (line-chart (range 0 (count summed)) summed))
    (view (line-chart (range 0 (count cleaned)) cleaned)))
  (let [uni (map :count (fetch :uniques-per-day :only [:count]))
        s (sd uni)
        m (mean uni)
        cleaned (doall (map identity (remove (> a (+ s (* 2 m))) uni)))
        weeks (partition-all 7 cleaned)
        summed (map (apply + a) (butlast weeks)) ]
    (view (line-chart (range 0 (count uni)) uni))
    (view (line-chart (range 0 (count summed)) summed))
    (view (line-chart (range 0 (count cleaned)) cleaned))))

(defn uniques-per-day []
  (doall (map :count (fetch :uniques-per-day :only [:count]))))

(defn uniques-per-day-chart []
  (let [days (uniques-per-day)]
    (view (line-chart (range 0 (count days)) days))))

(defn avg-minutes-per-user-chart []
  (view (line-chart (range 0 (count (minutes-per-day)))
                    (doall (map (double (/ a a2)) (minutes-per-day) (uniques-per-day))))))

                          )"))

(defui ->vec [e]
  [:div.vec
              (for [cur e]
                (tree cur))])

(defui ->list [e]
  [:div.tlist  (for [cur e]
                (tree cur))])

(defui ->map [e]
  [:div.map (for [cur e]
                (tree cur))])

(defui ->set [e]
  [:div.set  (for [cur e]
                (tree cur))])

(defn tree [things]
    (cond
     (vector? things) (->vec things)
     (list? things) (->list things)
     (map? things) (->map things)
     (set? things) (->set things)
     :else [:span (pr-str things)]
     ))

(defui ->tree [c]
  [:div.struct-tree c]
  )

;(def cur (add!))
;(object/set-content! cur (->tree (for [form content] (tree form))))

