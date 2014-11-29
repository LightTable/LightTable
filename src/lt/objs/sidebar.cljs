(ns lt.objs.sidebar
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [lt.objs.command :as cmd]
            [lt.objs.animations :as anim]
            [lt.objs.canvas :as canvas]
            [lt.util.dom :as dom]
            [lt.util.cljs :refer [->dottedkw]]
            [crate.binding :refer [map-bound bound subatom]])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def default-width 200)

(defui vertical-grip [this]
  [:div.vertical-grip {:draggable "true"}]
  :dragstart (fn [e]
               (object/raise this :start-drag))
  :dragend (fn [e]
             (object/raise this :end-drag))
  :drag (fn [e]
          (object/raise this :width! e)
          ))

(behavior ::no-anim-on-drag
          :triggers #{:start-drag}
          :reaction (fn [this]
                      (anim/off)))

(behavior ::reanim-on-drop
          :triggers #{:end-drag}
          :reaction (fn [this]
                      (anim/on)))

(behavior ::width!
          :triggers #{:width!}
          :throttle 5
          :reaction (fn [this e]
                      (when-not (= 0 (.-clientX e))
                        (let [width (if (= (:side @this) :left)
                                      (.-clientX e)
                                      (- (dom/width js/document.body) (.-clientX e)))]
                          (object/merge! tabs/multi {(:side @this) width})
                          (object/merge! this {:width width
                                               :max-width width})
                          ))))

(behavior ::pop-transient
          :triggers #{:pop!}
          :reaction (fn [this]
                      (object/raise this :close!)))

(behavior ::open!
          :triggers #{:open!}
          :reaction (fn [this]
                      (object/merge! this {:width (:max-width @this)
                                           :open true})
                      (object/merge! tabs/multi {(:side @this) (+ (:max-width @this) )})
                      (dom/add-class (object/->content (:active @this)) :active)
                      ))

(behavior ::close!
          :triggers #{:close!}
          :reaction (fn [this no-focus]
                      (when (:active @this)
                        (dom/remove-class (object/->content (:active @this)) :active))
                      (object/merge! tabs/multi {(:side @this) 0})
                      (object/merge! this {:width 0
                                           :active false
                                           :open false})
                      (when-not no-focus
                        (cmd/exec! :tabs.focus-active))))


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

(defn active-content [active]
  (when active
    (object/->content active)))

(defn ->width [width]
  (str (or width 0) "px"))

(object/object* ::sidebar
                :tags #{:sidebar}
                :items {}
                :width 0
                :side :left
                :transients '()
                :max-width default-width
                :init (fn [this]
                        [:div#side {:style {:width (bound (subatom this :width) ->width)}}
                         [:div.content
                          (bound (subatom this :active) active-content)]
                         (vertical-grip this)]))

(object/object* ::right-bar
                :items {}
                :tags #{:sidebar}
                :width 0
                :side :right
                :max-width 300
                :init (fn [this]
                        [:div#right-bar {:style {:width (bound (subatom this :width) ->width)}}
                         (vertical-grip this)
                         [:div.content
                          ]]))

(def sidebar (object/create ::sidebar))
(def rightbar (object/create ::right-bar))

(canvas/add! sidebar)
(canvas/add! rightbar)

(defn add-item [bar item]
  (object/update! bar [:items] assoc (:order @item) item)
  (dom/append (dom/$ :.content (object/->content bar)) (object/->content item)))

(cmd/command {:command :close-sidebar
              :desc "Sidebar: close"
              :hidden true
              :exec (fn []
                      (object/raise rightbar :close!))})
