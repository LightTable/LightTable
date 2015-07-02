(ns lt.objs.titlebar
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.tabs :as tabs]
            [lt.objs.sidebar :as sidebar]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.canvas :as canvas]
            [lt.util.dom :refer [$ append add-class remove-class]]
            )
  (:require-macros [lt.macros :refer [behavior defui]]))

(defn close []
  (.close app/win))

(defn minimize []
  (.minimize app/win))

(defn maximize []
  (.maximize app/win))

(defn fullscreen []
  (.setFullScreen app/win (not (.isFullScreen app/win))))

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
