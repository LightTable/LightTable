(ns lt.objs.bottombar
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [lt.objs.animations :as anim]
            [lt.objs.canvas :as canvas]
            [lt.util.cljs :refer [->dottedkw]]
            [lt.util.style :refer [->px]]
            [crate.binding :refer [map-bound bound subatom]])
  (:require-macros [lt.macros :refer [behavior defui]]))


(def min-height 30)
(def default-height 130)

(defui horizontal-grip [this]
  [:div.horizontal-grip {:draggable "true"}]
  :dragstart (fn [e]
               (object/raise this :start-drag))
  :dragend (fn [e]
             (object/raise this :end-drag))
  :drag (fn [e]
          (object/raise this :height! e)
          ))

(defn active-content [active]
  (when active
    (object/->content active)))

(defn active? [item]
  (= (:active @bottombar) item))

(defn ->active-class [{:keys [active]}]
  (if active
    "open"
    "closed"))

(defn add-item [item]
  (object/update! bottombar [:items] assoc (:order @item) item))

;;*********************************************************
;; Object
;;*********************************************************

(object/object* ::bottombar
                :tags #{:bottombar}
                :items (sorted-map-by >)
                :height 0
                :max-height default-height
                :init (fn [this]
                        [:div#bottombar {:class (bound this ->active-class)
                                         :style {:left (bound (subatom tabs/multi :left) ->px)
                                                 :right (bound (subatom tabs/multi :right) ->px)
                                                 :height (bound (subatom this :height) ->px)}}
                         (horizontal-grip this)
                         [:div.content
                          (bound (subatom this :active) active-content)]]))

(def bottombar (object/create ::bottombar))

(canvas/add! bottombar)

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::no-anim-on-drag
          :triggers #{:start-drag}
          :reaction (fn [this]
                      (anim/off)))

(behavior ::reanim-on-drop
          :triggers #{:end-drag}
          :reaction (fn [this]
                      (anim/on)))

(behavior ::height!
          :triggers #{:height!}
          :throttle 16
          :reaction (fn [this e]
                      (when-not (= 0 (.-clientY e))
                        (let [win-height (.-innerHeight js/window)
                              height (max (- win-height (.-clientY e)) min-height)]
                          (object/raise tabs/multi :bottom! (- height (:height @this)))
                          (object/merge! this {:height height
                                               :max-height height})))
                      ))

(behavior ::show-item
          :triggers #{:show!}
          :reaction (fn [this item]
                      (when (or (not= item (:active @this)))
                        (object/merge! this {:active item
                                             :height (:max-height @this)})
                        (object/raise tabs/multi :bottom! (:max-height @this)))))

(behavior ::hide-item
          :triggers #{:hide!}
          :reaction (fn [this item force?]
                      (when (or (= item (:active @this)) force?)
                          (object/raise tabs/multi :bottom! (- (:max-height @this)))
                          (object/merge! this {:active nil
                                               :height 0}))))

(behavior ::item-toggled
          :triggers #{:toggle}
          :reaction (fn [this item force?]
                      (if (or (not= item (:active @this))
                              force?)
                        (object/raise this :show! item)
                        (object/raise this :hide! item))))

