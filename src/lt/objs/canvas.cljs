(ns lt.objs.canvas
  (:refer-clojure :exclude [rem])
  (:require [lt.object :as object]
            [lt.util.style :refer [->px]]
            [lt.util.js :refer [throttle]]
            [lt.objs.context :as ctx]
            [lt.util.dom :refer [$ parent toggle-class append remove prevent stop-propagation css] :as dom])
  (:use [crate.binding :only [bound]])
  (:use-macros [crate.def-macros :only [defpartial]]
               [lt.macros :only [defui]]))

(object/behavior* ::refresh
                  :triggers #{:refresh}
                  :reaction (fn [obj]
                              (js/window.location.reload true)))

(object/behavior* ::remove-on-destroy
                  :triggers #{:destroy}
                  :reaction (fn [obj]
                              (rem! obj)))

(object/behavior* ::rep-on-redef
                  :triggers #{:redef}
                  :reaction (fn [obj]
                              (->rep obj)))

(object/behavior* ::alt-down-drag
                  :triggers #{:object.mousedown}
                  :reaction (fn [canv obj e]
                              (when (.-altKey e)
                                (object/merge! canv {:dragging obj})
                                (prevent e)
                                (stop-propagation e))
                              ))
(object/behavior* ::dragging
                  :triggers #{:mousemove}
                  :reaction (fn [canv e]
                              (when-let [obj (:dragging @canv)]
                                (let [$drag (get-rep obj)]
                                  (css $drag {:position "absolute"
                                              :margin 0
                                              :z-index 1})
                                  (comment
                                    (object/merge! obj {::position {:top (- (.-pageY e) (/ (dom/height $drag) 2))
                                                                    :left (-  (.-pageX e) (/ (dom/width $drag) 2))}}
                                                   ))
                                  (position! obj {:top (- (.-pageY e) (/ (dom/height $drag) 2))
                                                                  :left (-  (.-pageX e) (/ (dom/width $drag) 2))})))))
(object/behavior* ::drag-end
                  :triggers #{:mouseup}
                  :reaction (fn [canv e]
                              (when-let [obj (:dragging @canv)]
                                (let [$drag (get-rep obj)]
                                  (css $drag {:z-index 0})
                                  (object/merge! canv {:dragging nil})))
                              ))

(defui canvas-elem [obj]
  [:div#canvas]
  :mousemove (throttle 20 (fn [e]
                            (object/raise obj :mousemove e)))
  :click (fn [e]
           (object/raise obj :click e))
  :mousedown (fn [e] (object/raise obj :mousedown e))
  :mouseup (fn [e] (object/raise obj :mouseup e))
  :contextmenu (fn [e] (object/raise obj :contextmenu e)))

(defn ->rep [obj canvas]
  (let [content (:content @obj)]
    (dom/attr content {:objId (object/->id obj)})
    (comment
    (dom/on* content {:mouseup (fn [e]
                                 (object/raise canvas :object.mouseup obj e))
                      :mousemove (throttle 20 (fn [e]
                                                (object/raise canvas :object.mousemove obj e)))
                      :mousedown (fn [e]
                                   (object/raise canvas :object.mousedown obj e))
                      :contextmenu (fn [e]
                                     (object/raise canvas :object.contextmenu obj e))
                      :click (fn [e]
                               (object/raise canvas :object.click obj e))})
     )
    content))

(defn get-rep [obj]
  ($ (str "[objid='" (object/->id obj) "']") (:content @canvas)))

(object/object* ::canvas
                :triggers [:mousemove :mousedown :mouseup :contextmenu :click
                           :object.mousemove :object.mousedown :object.mouseup
                           :object.click :object.contextmenu]
                :behaviors [::alt-down-drag ::dragging ::drag-end]
                :init (fn [obj]
                        (canvas-elem obj)))

(def canvas (object/create ::canvas))

(defn add! [obj & [position?]]
  (object/add-behavior! obj ::remove-on-destroy)
  (object/add-behavior! obj ::rep-on-redef)
  (let [rep (->rep obj canvas)]
    (append (:content @canvas) rep)
    (object/raise obj :show rep)
    (when position?
      (object/merge! obj {::position {:top 50 :right 10}})
      (position! obj {:top 50 :right 10}))))

(defn rem! [obj]
  (when-let [rep (get-rep obj)]
    (remove rep))
  (object/raise obj :object.remove))

(defn position! [obj pos]
  ;(object/update! obj [::position] merge pos)
  (css (get-rep obj) (merge {:position "absolute"
                             :left "auto"
                             :right "auto"
                             :bottom "auto"
                             :top "auto"} pos)))

(object/behavior* ::append-canvas
                  :triggers #{:show}
                  :reaction (fn [app]
                              (dom/css ($ :#loader) {:opacity 0})
                              (dom/css ($ :#wrapper) {:opacity 1})
                              ))

(append ($ "#wrapper") (:content @canvas))
(object/tag-behaviors :app [::append-canvas])
(ctx/in! :global canvas)
