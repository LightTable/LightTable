(ns lt.objs.titlebar
  "Provide titlebar (not enabled by default) and window related commands"
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
