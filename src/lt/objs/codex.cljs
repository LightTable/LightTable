(ns lt.objs.codex
  (:require [lt.object :as object]
            [lt.util.dom :as dom]
            [lt.objs.editor.pool :as pool]
            [lt.objs.tabs :as tabs])
  (:require-macros [lt.macros :refer [defui]]))

(def fake-content "(object/behavior* ::close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (tabs/rem! this)))

(object/behavior* ::add!
                  :triggers #{:add!}
                  :reaction (fn [this info]
                              (add-item! this info)))")

(defui codex-item [info]
  [:li (object/->content (:ed info))])

(defn add-item! [codex info]
  (let [ed (pool/create {:content fake-content :name "fake codex editor" :mime "cljs"})]
    (dom/append (object/->content codex) (codex-item (assoc info :ed ed)))
    ed))

(defn open-codex! []
  (let [c (object/create ::codex)]
    (tabs/add! c)
    c))

;;*********************************************************
;; Object
;;*********************************************************

(object/object* ::codex
                :name "Codex"
                :eds []
                :tags #{:codex}
                :init (fn []
                        [:ul.codex
                         ]
                        ))

;;*********************************************************
;; Behaviors
;;*********************************************************

(object/behavior* ::close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (tabs/rem! this)))

(object/behavior* ::add!
                  :triggers #{:add!}
                  :reaction (fn [this info]
                              (let [ed (add-item! this info)]
                                (object/update! this [:eds] conj ed)
                                (object/raise ed :refresh!))))

(object/behavior* ::clear!
                  :triggers #{:clear!}
                  :reaction (fn [this]
                              (doseq [ed (:eds @this)]
                                (object/destroy! ed))))


;(def cur (open-codex!))
;(object/raise cur :add! {:name "blah"})
