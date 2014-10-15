(ns lt.objs.canvas
  (:refer-clojure :exclude [rem])
  (:require [lt.object :as object]
            [lt.objs.context :as ctx]
            [lt.util.dom :refer [$ parent toggle-class append remove prevent stop-propagation css] :as dom])
  (:require-macros [lt.macros :refer [behavior defui]]))

(defui canvas-elem [obj]
  [:div#canvas])

(defn add! [obj & [position?]]
  (append (object/->content canvas) (object/->content obj))
  (object/raise obj :show rep))

;;*********************************************************
;; Object
;;*********************************************************

(object/object* ::canvas
                :init (fn [obj]
                        (canvas-elem obj)))

(def canvas (object/create ::canvas))
(append ($ "#wrapper") (object/->content canvas))

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::append-canvas
                  :triggers #{:show}
                  :reaction (fn [app]
                              (dom/css ($ :#loader) {:opacity 0})
                              (dom/css ($ :#wrapper) {:opacity 1})))

