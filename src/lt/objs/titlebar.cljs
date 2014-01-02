(ns lt.objs.titlebar
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [lt.objs.sidebar :as sidebar]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.canvas :as canvas]
            [lt.util.dom :refer [$ append add-class remove-class]]
            )
  (:require-macros [lt.macros :refer [behavior defui]]))

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
  (.close win))

(defn minimize []
  (.minimize win))

(defn maximize []
  (.maximize win))

(defn fullscreen []
  (if-not fullscreen?
    (.enterFullscreen win)
    (.leaveFullscreen win)))

(defui button [class action label]
       [:span {:class (str "button " (name class))
               :title "Exit fullscreen"}
        [:span label]]
       :click (fn []
                (action)))

(defui window-buttons []
  [:div.window-buttons
   (button :close close "x")
   (button :minimize minimize "-")
   (button :maximize maximize "+")])

(defui titlebar []
  [:div#titlebar
   (window-buttons)
   [:p "Light Table"]
   (button :fullscreen fullscreen "f")])

(behavior ::add-titlebar
          :triggers #{:init}
          :desc "App: Append custom titlebar"
          :reaction (fn [app]
                      (when-not ($ :#titlebar)
                        (append ($ :body) (titlebar)))))

(append ($ :#multi) (button :fullscreen fullscreen "-"))

(cmd/command {:command :window.fullscreen
              :desc "Window: Toggle fullscreen"
              :exec (fn []
                      (fullscreen))})

(cmd/command {:command :window.minimize
              :desc "Window: Minimize"
              :exec (fn []
                      (minimize))})

(cmd/command {:command :window.maximize
              :desc "Window: Maximize"
              :exec (fn []
                      (maximize))})