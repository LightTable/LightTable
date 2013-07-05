(ns lt.objs.settings
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            ;[lt.objs.commandbar :as cbar]
            [lt.objs.files :as files]
            [cljs.reader :as reader]))

(def settings-path (str (files/lt-home "settings/default.clj")))
(def settings (atom {:font-size 11}))

(defn on-disk [cb]
  (files/open settings-path (fn [data]
                              (if-not (empty? data)
                                (cb (reader/read-string (:content data)))
                                (cb {})))))

(defn save []
  (on-disk (fn [data]
             (let [updated (merge data @settings)]
               (files/save settings-path (pr-str updated))
               (reset! settings updated)))))

(defn fetch [k]
  (@settings k))

(defn store! [k v]
  (swap! settings assoc k v)
  (save))

(defn store-in! [ks v]
  (swap! settings assoc-in ks v)
  (save))

(defn init []
  (on-disk (fn [setts]
             (swap! settings merge setts))))

(object/behavior* ::init-settings
                  :triggers #{:pre-init}
                  :reaction (fn [this]
                              (init)
                              ;;Because we need things to be fully deployed before
                              ;;we go off and try to load the skin
                              (when-not (fetch :skin)
                                (store! :skin "dark"))))

(object/add-behavior! app/app ::init-settings)
