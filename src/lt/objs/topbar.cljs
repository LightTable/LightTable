(ns lt.objs.topbar
  "Provide topbar object and associated behaviors"
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [lt.objs.animations :as anim]
            [lt.objs.canvas :as canvas]
            [lt.util.cljs :as cljs]
            [lt.util.dom :as dom]
            [lt.util.style :refer [->px]]
            [crate.binding :refer [map-bound bound subatom]])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def min-height 30)
(def default-height 130)

(defn active-content [active]
  (when active
    (object/->content active)))

(declare topbar)

(defn active? [item]
  (= (:active @topbar) item))

(defn ->active-class [{:keys [active]}]
  (if active
    "open"
    "closed"))

(defn add-item [bar item]
  (object/update! bar [:items] assoc (:order @item) item)
  (dom/append (dom/$ :.content (object/->content bar)) (object/->content item)))

;;*********************************************************
;; Object
;;*********************************************************

(object/object* ::topbar
                :tags #{:topbar}
                :behaviors #{::open! ::close! ::item-toggled}
                :items (sorted-map-by >)
                :height default-height
                :max-height default-height
                :open false
                :init (fn [this]
                        [:div#topbar {:class (bound this ->active-class)
                                      :style {:left (bound (subatom tabs/multi :left) ->px)
                                              :right (bound (subatom tabs/multi :right) ->px)
                                              :top "50px"
                                              :height (bound (subatom this :height) ->px)
                                              }}
                         [:div.content
                          (bound (subatom this :active) active-content)]]))

(def topbar (object/create ::topbar))

(canvas/add! topbar)

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::open!
          :triggers #{:open!}
          :reaction (fn [this]
                      (object/merge! this {:height (:max-height @this)
                                           :open true})
                      (dom/add-class (object/->content (:active @this)) :active)))

(behavior ::close!
          :triggers #{:close!}
          :reaction (fn [this]
                      (when (:active @this)
                        (dom/remove-class (object/->content (:active @this)) :active))
                      (object/merge! this {:height 0
                                           :active false
                                           :open false})))

(behavior ::item-toggled
          :triggers #{:toggle}
          :reaction (fn [this item {:keys [force? transient? soft?]}]
                      (if (and (not force?)
                               (= (:active @this) item)
                               (:open @this))
                        (object/raise this :close!)
                        (when (not= (:active @this) item)
                          (when (:active @this)
                            (dom/remove-class (object/->content (:active @this)) :active))
                          (object/merge! this {:active item})
                          (object/raise this :open!)
                          (when-not soft?
                            (object/raise item :show)
                            )
                          ))))
