(ns lt.util.ipc
  (:require [lt.object :as object]))

(def remote (js/require "remote"))
(def ipc (js/require "ipc"))
(def wid (-> remote .getCurrentWindow .-id))

(def win (str ::win))

(defn send [channel & args]
  (.apply (.-send ipc) ipc (-> args (conj (str channel)) clj->js)))

(defn on* [channel cb]
  (.on ipc (str channel) cb))

(defn on [channel cb]
  (js-delete (.-_events ipc) (str channel))
  (on* channel cb))

(on ::callback
    (fn [id method & args]
      (apply object/raise (object/by-id id) (keyword method) args)))

(defn call [target method func & args]
  (let [[mod func] (if (coll? func)
                     (map name func)
                     (clojure.string/split (name func) "."))]
    (send ::callback wid
           mod func (clj->js (or args []))
           (object/->id target) (name method))))
