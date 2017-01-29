(ns lt.objs.cache
  "Provide cache which persists to disk and thus across application reboots"
  (:require [lt.object :as object]
            [lt.objs.files :as files]
            [cljs.reader :as reader])
  (:require-macros [lt.macros :refer [behavior]]))

(def cache-path (files/lt-user-dir "ltcache"))
(def settings-path (str (files/lt-user-dir "ltcache/default.clj")))
(def settings (atom {}))

(defn on-disk [cb]
  ;; We must ensure the file's existence before attempting to open it.
  (when-not (files/file? settings-path)
    (files/save settings-path {}))
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

(behavior ::init
          :triggers #{:deploy}
          :reaction (fn [this]
                      (when-not (files/exists? cache-path)
                        (files/mkdir cache-path))
                      (init)))

(object/tag-behaviors :app [::init])
