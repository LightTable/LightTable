(ns lt.objs.keyboard
  "Manage keybindings by wrapping Mousetrap"
  (:refer-clojure :exclude [keys meta])
  (:require [clojure.string :as string]
            [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.command :as cmd]
            [lt.objs.platform :as platform]
            [lt.objs.metrics :as metrics]
            [lt.objs.context :as ctx]
            [lt.util.js :refer [every wait]]
            [lt.util.events :as utev])
  (:require-macros [lt.macros :refer [behavior]]))

(def capturing? true)
(def keys (atom {}))
(def key-map (atom {}))
(def chords (js-obj "current" nil "chords" #{}))
(def chord-timeout 1000)

(defn activity []
  (metrics/used!))

(defn chord-variants [k]
  (let [splits (-> (string/split k " ")
                   (butlast))]
    (reduce (fn [res cur]
              (conj res (str (last res) " " cur)))
            [(first splits)]
            (rest splits))))

(defn extract-chords [ks]
  (reduce (fn [chords [k _]]
            (if-not (> (.indexOf k " ") -1)
              chords
              (apply conj chords (chord-variants k))))
          #{}
          ks))

(defn merge-keys [ctx]
  (let [ctx-set (object/specificity-sort ctx :down)
        ks @keys
        neue (apply merge {} (map ks ctx-set))]
    (set! chords (js-obj "current" nil "chords" (extract-chords neue)))
    (reset! key-map neue)
    (object/raise app/app :app.keys.change)))

(defn refresh []
  (merge-keys (ctx/current)))

;;When the context changes, create our new keymap
(add-watch ctx/contexts :commands2 (fn [_ _ _ ctx] (merge-keys ctx)))
(refresh)

(defn ->keystr [key ev]
  (str
   (when (.-ctrlKey ev) "ctrl-")
   (when (.-metaKey ev) (if (platform/mac?)
                          "cmd-"
                          "meta-"))
   (when (.-altKey ev) "alt-")
   (when (.-altGraphKey ev) "altgr-")
   (when (.-shiftKey ev) "shift-")
   (. (or key "") toLowerCase)))

(defn chord|mapping [key char ev]
  (let [current (aget chords "current")
        cur-chords (aget chords "chords")
        [ks ch] (if current
                  [(str current " " (->keystr key ev)) (str current " " char)]
                  [(->keystr key ev) char])]
    (if-let [chord (or (cur-chords ch) (cur-chords ks))]
      (do
        (aset chords "current" chord)
        (when chord-timeout
          (wait chord-timeout #(aset chords "current" nil)))
        [])
      (do
        (aset chords "current" nil)
        (or (@key-map ch) (@key-map ks) (when current []))))))

(def ^:dynamic *capture* true)
(def ^:dynamic *stop* false)

(defn passthrough []
  (set! *capture* false))

(defn stop-commands!
  "Called to prevent commands after the current one from firing"
  []
  (set! *stop* true))

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

(defn capture [key char ev]
  (activity)
  (binding [*capture* true
            *stop* false]
    (when-let [cs (chord|mapping key char ev)]
      (doseq [c cs]
        (when-not *stop*
          (set! *capture* true)
          (trigger c)))
      *capture*)))

(defn capture-up [key char ev]
  (or (@key-map char) (@key-map (->keystr key ev))))

(def meta (if (platform/mac?)
            "cmd"
            "ctrl"))

(defn cmd->bindings [cmd]
  (filter #(-> % second seq)
          (for [[ctx ms] @keys]
            [ctx (-> (filter #(= (-> % second first) cmd) ms)
                     first
                     first)])))

(defn cmd->current-binding [cmd]
  (first (filter #((-> % second set) cmd) @key-map)))

(set! js/Mousetrap.prototype.handleKey
      (fn [key char ev]
        (when (and capturing?
                   (string? key)
                   (capture key char ev))
          (.preventDefault ev)
          (.stopPropagation ev))))

(set! js/Mousetrap.prototype.handleKeyUp
      (fn [key char ev]
        (when (and capturing?
                   (string? key)
                   (capture-up key char ev))
          (.preventDefault ev)
          (.stopPropagation ev))))

(behavior ::chord-timeout
          :triggers #{:object.instant}
          :desc "App: Set the timeout for chorded shortcuts"
          :type :user
          :reaction (fn [this timeout]
                      (set! chord-timeout timeout)))
