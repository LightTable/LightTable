(ns lt.objs.cache
  (:require [lt.object :as object]
            [lt.objs.files :as files]
            [cljs.reader :as reader]))

(def settings-path (str (files/lt-home "settings/default.clj")))
(def settings (atom {}))

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

(object/behavior* ::init
                  :triggers #{:init}
                  :reaction (fn [this]
                              (init)))
