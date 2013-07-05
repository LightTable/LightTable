(ns lt.objs.keyboard
  (:refer-clojure :exclude [keys])
  (:require [clojure.string :as string]
            [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.settings :as settings]
            [lt.objs.platform :as platform]
            [lt.objs.metrics :as metrics]
            [lt.objs.context :as ctx]
            [lt.util.events :as utev])
  (:use [lt.util.js :only [every]]))

(def capturing? true)
(def keys (atom {}))

(def key-map (atom {}))

(defn activity []
  (metrics/used!))

(defn merge-keys [_ _ _ ctx]
  (let [ctx-set (into (sorted-set) ctx)
        ks @keys
        neue (apply merge {} (map ks ctx-set))]
    (reset! key-map neue)))

(defn refresh []
  (merge-keys nil nil nil (ctx/current)))

;;When the context changes, create our new keymap
(add-watch ctx/contexts :commands2 merge-keys)
(refresh)

(defn ->keystr [ev]
  (str (when (.-altKey ev) "alt-")
       (when (or (.-altGraphKey ev) altgr) "altgr-")
       (when (.-ctrlKey ev) "ctrl-")
       (when (.-metaKey ev) "cmd-")
       (when (.-shiftKey ev) "shift-")
       (. (or (.-key ev) "") toLowerCase)))

(def ^:dynamic *capture* true)

(defn passthrough []
  (set! *capture* false))

(defn disable []
  (set! capturing? false))

(defn enable []
  (set! capturing? true))

(defn all-mappings [key]
  (reduce (fn [res [ctx keys]]
            (if-not (keys key)
              res
              (conj res [ctx (keys key)])))
          []
          @keys))

(defn trigger [cmd]
  (activity)
  (if (coll? cmd)
    (apply cmd/exec! cmd)
    (cmd/exec! cmd))
  *capture*)

(defn capture [ev]
  (activity)
  (binding [*capture* true]
    (when-let [cs (or (@key-map (aget ev "char")) (@key-map (->keystr ev)))]
      (doseq [c cs]
        (trigger c))
      *capture*)))

(defn capture-up [ev]
  (or (@key-map (aget ev "char")) (@key-map (->keystr ev))))

(utev/capture :keydown
              (fn [ev]
                (when (and capturing?
                           (capture ev))
                  (.preventDefault ev)
                  (.stopPropagation ev))))

(utev/capture :keyup
              (fn [ev]
                (when (and capturing?
                           (capture-up ev))
                  (.preventDefault ev)
                  (.stopPropagation ev))))

(def meta (if (platform/mac?)
            "cmd"
            "ctrl"))
