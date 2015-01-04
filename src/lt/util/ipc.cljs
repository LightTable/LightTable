(ns lt.util.ipc
  "Util functions for the ipc renderer - https://github.com/atom/atom-shell/blob/master/docs/api/ipc-renderer.md")

(def ipc (js/require "ipc"))

(defn send
  "Delegates to ipc.send which asynchronously sends args to the browser process's channel."
  [channel & args]
  (apply (.-send ipc) channel (clj->js args)))

(defn on
  "Delegates to ipc.on which defines a callback to fire for the given channel."
  [channel cb]
  (.on ipc channel cb))
