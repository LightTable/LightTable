(ns lt.objs.dialogs
  (:require [lt.object :as object]
            [lt.util.dom :as dom]
            [lt.objs.app :as app])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def remote (js/require "remote"))
(def dialog (.require remote "dialog"))

(defn dir [obj event]
  (let [files (.showOpenDialog dialog #js {:properties #js ["openDirectory"]})]
    (when files
      (object/raise obj event (first files)))))

(defn file [obj event]
  (let [files (.showOpenDialog dialog #js {:properties #js ["openFile"]})]
    (when files
      (object/raise obj event (first files)))))

(defn save-as [obj event]
  (let [files (.showSaveDialog dialog #js {:properties #js ["createDirectory"]})]
    (when files
      (object/raise obj event (first files)))))
