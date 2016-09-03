(ns lt.objs.platform
  "Provide platform-agnostic and platform related fns"
  (:require [lt.object :as object]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [behavior]]))

(def electron true)

(def fs (js/require "fs"))
(def clipboard (js/require "clipboard"))
(def electron-shell (js/require "shell"))

(defn get-data-path []
  (.getDataPath (.require (js/require "remote") "app")))

(defn normalize [plat]
  (condp = plat
    "win32" :windows
    "linux" :linux
    "darwin" :mac))

(defn open-url [path]
  (.openExternal electron-shell path))

(defn open
  "If the given path exists, open it with the desktop's default manner.
  Otherwise, open it as an external protocol e.g. a url."
  [path]
  (if (.existsSync fs path)
    (.openItem electron-shell path)
    (open-url path)))

(defn show-item [path]
  (.showItemInFolder electron-shell path))

(defn copy
  "Copies given text to platform's clipboard"
  [text]
  (.writeText clipboard text))

(defn paste
  "Returns text of last copy to platform's clipboard"
  []
  (.readText clipboard))

(def platform (normalize (.-platform js/process)))

(defn mac? []
  (= platform :mac))

(defn win? []
  (= platform :windows))

(defn linux? []
  (= platform :linux))
