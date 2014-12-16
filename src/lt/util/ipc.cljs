(ns lt.util.ipc
  "Util functions for the ipc renderer - https://github.com/atom/atom-shell/blob/master/docs/api/ipc-renderer.md"
  (:require [lt.object :as object]
            [clojure.string :as string]))

(def remote (js/require "remote"))
(def ipc (js/require "ipc"))
(def wid (-> remote .getCurrentWindow .-id))

(def win (str ::win))

(defn send
  "Delegates to ipc.send which asynchronously sends args to the browser process's channel."
  [channel & args]
  (.apply (.-send ipc) ipc (-> args (conj channel) clj->js)))

(defn on
  "Delegates to ipc.on which defines a callback to fire for the given channel."
  [channel cb]
  (.on ipc channel cb))

(defn on-with-delete [channel cb]
  (js-delete (.-_events ipc) channel)
  (on channel cb))

(on-with-delete (str ::callback)
                (fn [id method & args]
                  (apply object/raise (object/by-id id) (keyword method) args)))

(defn callback
  "Similar to a remote module call. Sends a ::callback message which kicks off
  a return ::callback message when the browser process is done. Sent message args
  include the object id and behavior to trigger on the return message."
  [target method func & args]
  (let [[mod func] (if (coll? func)
                     (map name func)
                     (string/split (name func) "."))]
    (send (str ::callback) wid
           mod func (clj->js (or args []))
           (object/->id target) (name method))))
