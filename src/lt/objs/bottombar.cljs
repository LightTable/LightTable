(ns lt.objs.bottombar
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [lt.objs.animations :as anim]
            [lt.objs.canvas :as canvas]
            [lt.util.cljs :refer [->dottedkw]]
            [lt.util.style :refer [->px]]
            [crate.binding :refer [map-bound bound subatom]])
  (:require-macros [lt.macros :refer [defui]]))

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

(object/behavior* ::no-anim-on-drag
                  :triggers #{:start-drag}
                  :reaction (fn [this]
                              (anim/off)))

(object/behavior* ::reanim-on-drop
                  :triggers #{:end-drag}
                  :reaction (fn [this]
                              (anim/on)))

(object/behavior* ::height!
                  :triggers #{:height!}
                  :throttle 5
                  :reaction (fn [this e]
                              (when-not (= 0 (.-clientY e))
                                (let [win-height (.-innerHeight js/window)
                                      height (- win-height (.-clientY e))]
                                (object/raise tabs/multi :bottom! (- (:height @this) height))
                                (object/merge! this {:height height
                                                     :max-height height})))
                              ))

(object/behavior* ::item-toggled
                  :triggers #{:toggle}
                  :reaction (fn [this item force?]
                              (if (or (not= item (:active @this))
                                      force?)
                                (do
                                  (object/merge! this {:active item
                                                       :height (:max-height @this)})
                                  (object/raise tabs/multi :bottom! (:max-height @this)))
                                (do
                                  (object/raise tabs/multi :bottom! (- (:max-height @this)))
                                  (object/merge! this {:active nil
                                                       :height 0})))
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

(object/object* ::bottombar
                :tags #{:bottombar}
                :behaviors [::item-toggled ::height! ::no-anim-on-drag ::reanim-on-drop]
                :items (sorted-map-by >)
                :height 0
                :max-height default-height
                :init (fn [this]
                        [:div#bottombar {:class (bound this ->active-class)
                                         :style {:left (bound (subatom tabs/multi :left) ->px)
                                                 :height (bound (subatom this :height) ->px)}}
                         (horizontal-grip this)
                         [:div.content
                          (bound (subatom this :active) active-content)]]))

(def bottombar (object/create ::bottombar))

(canvas/add! bottombar)

(defn add-item [item]
  (object/update! bottombar [:items] assoc (:order @item) item))

(object/object* ::bottom-console
                :order 0
                :init (fn []
                        [:div "woot"]
                        [:img {:src ""}]))

(def console (object/create ::bottom-console))

(add-item console)

;(object/raise bottombar :toggle console)


