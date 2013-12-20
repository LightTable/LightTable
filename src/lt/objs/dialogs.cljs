(ns lt.objs.dialogs
  (:require [lt.object :as object]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def active-input nil)

(defui input [obj type event]
  [:input {:type "file" type true :style "display:none;"}]
  :change (fn []
            (this-as me
                     (when-not (empty? (dom/val me))
                       (object/raise obj event (dom/val me)))))) 

(defn trigger []
  (dom/trigger active-input :click))

(defn dir [obj event]
  (set! active-input (input obj :nwdirectory event))
  (trigger))

(defn file [obj event]
  (set! active-input (input obj :b event))
  (trigger))

(defn save-as [obj event]
  (set! active-input (input obj :nwsaveas event))
  (trigger))