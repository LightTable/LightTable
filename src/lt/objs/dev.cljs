(ns lt.objs.dev
  (:require [lt.object :as object]
            [lt.objs.keyboard :as keyboard]
            [lt.objs.canvas :as canvas]
            [lt.objs.editor :as ed]
            [lt.objs.context :as ctx]
            [lt.objs.clients :as clients])
  (:use [lt.util.dom :only [$ parent toggle-class prevent stop-propagation]]
        [crate.binding :only [bound subatom]])
  (:use-macros [crate.def-macros :only [defpartial]]
               [lt.macros :only [defui]])
  )

(comment
(object/behavior* ::render-on-init
                  :triggers #{:init}
                  :reaction (fn [obj]
                              ;(canvas/add-object (:content @obj))
                              ))

(def active-obj (atom {}))

(object/behavior* ::explode-on-active
                  :triggers #{:active}
                  :reaction (fn [obj]
                              (reset! active-obj obj)))

(defpartial beh-item [[k _]]
  [:li (name k)])

(defpartial beh-list [behaviors]
  [:ul
   (map beh-item behaviors)])

(defui remove-button [obj]
       [:span.remove "x"]
       :click (fn []
                (object/destroy! obj)
                ))

(defui inst-item [[_ inst]]
  [:li (object/->id inst) (:type inst) (remove-button inst)]
  :click (fn []
           (reset! selected (subatom object/instances (object/->id inst)))
           ))

(defpartial inst-list [insts]
  [:ul
   (map inst-item insts)])

(defpartial ctx-list [ctxs]
  [:ul
   (for [c ctxs]
     [:li c])])

(defpartial keys-list [ks]
  [:ul
   (for [[mapping res] ks]
     [:li mapping " " [:span (pr-str res)]])])

(defpartial clients-list [ks]
  [:ul
   (for [[client-name _] ks]
     [:li client-name])])

(defui section-header [name]
       [:h2 name]
       :click (fn []
                (this-as me
                         (let [$me ($ me)
                               p (parent $me)]
                           (toggle-class p :closed)))))

(defpartial section [name content]
  [:div.closed
   (section-header name)
   [:div
    content]])

(def selected (atom (atom {})))

(defpartial ->ul [ls]
  [:ul
   (for [l ls]
     [:li l])])

(defpartial ->listeners [lis]
  [:ul
   (for [[k v] lis]
     [:li k " " (pr-str (mapv (comp keyword name) v))])])

(defpartial ->children [cs]
  [:ul
   (for [[k v] cs]
     [:li
      [:h2 k]
      (explosion v)])])

(defpartial explosion [obj]
  [:table
   [:tr [:td.term "type"] [:td (:type @obj)]]
   [:tr [:td.term "id"] [:td (object/->id obj)]]
   [:tr [:td.term "behaviors"] [:td (->ul (:behaviors @obj))]]
   [:tr [:td.term "listeners"] [:td (->listeners (into (sorted-map) (:listeners @obj)))]]
   [:tr [:td.term "children"] [:td (->children (:children @obj))]]
    ]
  )

(object/behavior* ::explode-on-cmd-click
                  :triggers #{:object.click}
                  :reaction (fn [canvas obj e]
                              (when (.-metaKey e)
                                (reset! selected obj)
                                (prevent e)
                                (stop-propagation e))))

(object/object* ::explosion
                :triggers []
                :behaviors []
                :init (fn [this]
                        [:div.current
                         (bound selected explosion)]
                        ))

(object/object* ::instances
                :triggers []
                :behaviors []
                :init (fn [this]
                        [:div.current
                         (bound object/instances inst-list)]
                        ))

(object/object* ::context
                :triggers []
                :behaviors []
                :init (fn [this]
                        [:div.ctx
                         (bound ctx/contexts ctx-list)]
                        ))

(object/object* ::keymap
                :triggers []
                :behaviors []
                :init (fn [this]
                        [:div.keymap
                         (bound keyboard/key-map keys-list)]
                        ))

(object/object* ::dev-bar
                :triggers []
                :behaviors [::render-on-init]
                :init (fn [obj]
                        [:div#devbar
                         (section "object defs" (bound object/object-defs beh-list))
                         (section "behaviors" (bound object/behaviors beh-list))
                         (section "instances" (bound object/instances inst-list))
                         (section "context" (bound ctx/contexts ctx-list))
                         (section "keymap" (bound keyboard/key-map keys-list))
                         (section "clients" (bound clients/cs clients-list))
                         (section "current" (bound selected explosion))
                         ]
                        ))

(def explosion (object/create ::explosion))
(def context (object/create ::context))
(def keymap (object/create ::keymap))
;(def instances (object/create ::instances))

;(canvas/add! explosion)
;(canvas/add! context)
;(canvas/add! keymap)
;(canvas/add! instances)

(object/add-behavior! canvas/canvas ::explode-on-cmd-click)

  )