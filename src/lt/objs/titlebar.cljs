(ns lt.objs.titlebar
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [lt.objs.sidebar :as sidebar]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.canvas :as canvas]
            [lt.util.dom :refer [$ append add-class remove-class]]
            )
  (:require-macros [lt.macros :refer [defui]]))

(def gui (js/require "nw.gui"))
(def win (.Window.get gui))

(def fullscreen? false)

(.on win "enter-fullscreen" (fn []
                              (set! fullscreen? true)
                              (add-class ($ :body) :fullscreen)))
(.on win "leave-fullscreen" (fn []
                              (set! fullscreen? false)
                              (remove-class ($ :body) :fullscreen)))

(defn close []
  (.close win)
  )

(defn minimize []
  (.minimize win)
  )

(defn maximize []
  (.maximize win)
  )

(defn fullscreen []
  (if-not fullscreen?
    (.enterFullscreen win)
    (.leaveFullscreen win))
  )

(defui button [class action label]
       [:span {:class (name class)}
        [:span label]]
       :click (fn []
                (action)))

(defui window-buttons []
  [:div.window-buttons
   (button :close close "x")
   (button :minimize minimize "-")
   (button :maximize maximize "+")])

;;We no longer need the window buttons as we're using a frame on all platforms
;;(append ($ :#sidebar-wrapper) (window-buttons))
;;(append ($ :#multi) (button :fullscreen fullscreen))

(cmd/command {:command :toggle-fullscreen
              :desc "Window: Toggle fullscreen"
              :exec (fn []
                      (fullscreen))})