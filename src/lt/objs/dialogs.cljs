(ns lt.objs.dialogs
  (:require [lt.object :as object]
            [lt.util.dom :as dom]
            [lt.objs.app :as app])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def ipc (js/require "ipc"))

(defn dir [obj event]
  (when-let [files (.sendSync ipc "openFolderDialog")]
    (object/raise obj event (first files))))

(defn file [obj event]
  (when-let [files (.sendSync ipc "openFileDialog")]
    (object/raise obj event (first files))))

(defn save-as [obj event]
  (when-let [files (.sendSync ipc "openSaveDialog")]
    (object/raise obj event (first files))))
