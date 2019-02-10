(ns lt.objs.dialogs
  "Provide Electron-based dialogs"
  (:require [lt.object :as object]
            [lt.util.dom :as dom]
            [lt.objs.app :as app])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def remote (js/require "remote"))
(def dialog (.require remote "dialog"))

(defn set-show-file-dialog-fn! [f] (def show-file-dialog f))

(set-show-file-dialog-fn!
 (fn [type options callback]
  (if (= :open type)
    (callback (.showOpenDialog dialog app/win options))
    (callback [(.showSaveDialog dialog app/win options)]))))


(defn broadcast-file-selected [obj event files]
    (doseq [file files]
      (if file (object/raise obj event file))))

(defn dir [obj event]
  (show-file-dialog 
    :open 
    #js {:properties #js ["openDirectory" "multiSelections"]}
    (partial broadcast-file-selected obj event)))

(defn file [obj event]
  (show-file-dialog 
    :open 
    #js {:properties #js ["openFile" "multiSelections"]}
    (partial broadcast-file-selected obj event)))

(defn save-as [obj event path]
  (show-file-dialog 
    :save
    #js {:defaultPath path}
    (partial broadcast-file-selected obj event)))
