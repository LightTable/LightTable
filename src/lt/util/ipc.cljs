(ns lt.util.ipc
  "Util functions for the ipc renderer - https://github.com/atom/electron/blob/master/docs/api/ipc-renderer.md")

(def ipc (js/require "ipc"))

(defn send
  "Delegates to ipc.send which asynchronously sends args to the browser process's channel."
  [channel & args]
  (apply (.-send ipc) channel (clj->js args)))

(defn on
  "Delegates to ipc.on which defines a callback to fire for the given channel."
  [channel cb]
  (.on ipc channel cb))

;; Set $IPC_DEBUG to debug incoming and outgoing ipc messages for the renderer process
(when (aget js/process.env "IPC_DEBUG")
  (let [old-send send
        old-on on]
    (def send (fn [& args]
                (prn "RENDERER->" args)
                (apply old-send args)))
    (def on (fn [channel cb]
              (old-on channel (fn [& args]
                                (prn "->RENDERER" channel args)
                                (apply cb args)))))))
