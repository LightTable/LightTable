(ns lt.objs.dialogs
  "Provide Electron-based dialogs"
  (:require [lt.object :as object]
            [lt.util.dom :as dom]
            [lt.objs.app :as app])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def remote (.-remote (js/require "electron")))
(def dialog (.-dialog remote))

(defn dir [obj event]
  (let [files (.showOpenDialog dialog app/win #js {:properties #js ["openDirectory" "multiSelections"]})]
    (doseq [file files]
      (object/raise obj event file))))

(defn file [obj event]
  (let [files (.showOpenDialog dialog app/win #js {:properties #js ["openFile" "multiSelections"]})]
    (doseq [file files]
      (object/raise obj event file))))

(defn save-as [obj event path]
  (when-let [file (.showSaveDialog dialog app/win #js {:defaultPath path})]
    (object/raise obj event file)))
