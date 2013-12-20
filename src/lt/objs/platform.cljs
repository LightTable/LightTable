(ns lt.objs.platform
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [behavior]]))

(defn normalize [plat]
  (condp = plat
    "win32" :windows
    "linux" :linux
    "darwin" :mac))

(defn open [path]
  (.Shell.openExternal (js/require "nw.gui") path))

(def platform (normalize (.-platform js/process)))

(defn mac? []
  (= platform :mac))

(defn win? []
  (= platform :windows))

(defn linux? []
  (= platform :linux))

(behavior ::add-platform-class
                  :triggers #{:init}
                  :reaction (fn [this]
                              (dom/add-class (dom/$ :body) (name platform))
                              ))

(object/add-behavior! app/app ::add-platform-class)
