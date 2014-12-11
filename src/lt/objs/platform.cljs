(ns lt.objs.platform
  (:require [lt.object :as object]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [behavior]]))

(def atom-shell true)

(def clipboard (js/require "clipboard"))
(def shell (js/require "shell"))

(defn get-data-path []
  (.getDataPath app))

(defn normalize [plat]
  (condp = plat
    "win32" :windows
    "linux" :linux
    "darwin" :mac))

(defn open [path]
  (.openItem shell path))

(defn open-url [path]
  (.openExternal shell path))

(defn show-item [path]
  (.showItemInFolder shell path))

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
