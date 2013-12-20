(ns lt.objs.animations
  (:require [lt.object :as object]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [behavior]]))

(def $body (dom/$ :body))
(def force-off false)

(defn on []
  (when-not force-off
    (dom/add-class $body :animated)))

(defn off []
  (when-not force-off
    (dom/remove-class $body :animated)))

(defn on? []
  (when-not force-off
    (dom/has-class? $body :animated)))

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::animate-on-init
                  :triggers #{:init}
                  :reaction (fn [app]
                              (on)))

(behavior ::toggle-animations
                  :desc "App: Enable or disable UI animations"
                  :triggers #{:object.instant}
                  :type :user
                  :reaction (fn [this active?]
                              (set! force-off (not active?))
                              (if active?
                                (on)
                                (off))))
