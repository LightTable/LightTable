(ns lt.plugins.auto-paren
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.context :as ctx]
            [lt.objs.keyboard :refer [passthrough]])
  (:require-macros [lt.macros :refer [behavior]]))

(def pairs {\( \)
            \{ \}
            \[ \]
            \" \"
            \< \>})

(def word-char #"[^\s\)\}\]\(\{\[]")

(defn adjust-loc [loc dir]
  (update-in loc [:ch] + dir))

(defn get-char [ed dir]
  (let [loc (editor/->cursor ed)]
    (if (> dir 0)
      (editor/range ed loc (adjust-loc loc dir))
      (editor/range ed (adjust-loc loc dir) loc))))

(defn move-cursor [ed dir]
  (let [loc (editor/->cursor ed)]
    (editor/move-cursor ed (adjust-loc loc dir))))

(behavior ::open-pair
          :triggers #{:open-pair!}
          :reaction (fn [this ch]
                      (editor/operation this
                       (fn []
                         (let [current-selection (editor/selection this)]
                           (if-not (= current-selection "")
                             (editor/replace-selection this (str ch current-selection (pairs ch)))
                             (if (re-seq word-char (get-char this 1))
                               (editor/insert-at-cursor this ch)
                               (do
                                 (editor/insert-at-cursor this (str ch (pairs ch)))
                                 (move-cursor this -1)))))))))

(behavior ::close-pair
          :triggers #{:close-pair!}
          :reaction (fn [this ch]
                      (if (= ch (get-char this 1))
                        (move-cursor this 1)
                        (passthrough))
                      ))

(behavior ::repeat-pair
          :triggers #{:repeat-pair!}
          :reaction (fn [this ch]
                      (editor/operation this
                                        (fn []
                                          (let [current-selection (editor/selection this)]
                                            (if-not (= current-selection "")
                                              (editor/replace-selection this (str ch current-selection ch))
                                              (cond
                                               (= ch (get-char this 1)) (move-cursor this 1)
                                               (re-seq word-char (get-char this 1)) (editor/insert-at-cursor this ch)
                                               (re-seq word-char (get-char this -1)) (editor/insert-at-cursor this ch)
                                               :else (do
                                                       (editor/insert-at-cursor this (str ch ch))
                                                       (move-cursor this -1)))))))))

(behavior ::try-remove-pair
          :triggers #{:backspace!}
          :reaction (fn [this]
                      (let [ch (get-char this -1)]
                        (if (and (pairs ch)
                                 (= (get-char this 1) (pairs ch)))
                          (let [loc (editor/->cursor this)]
                            (editor/replace this (adjust-loc loc -1) (adjust-loc loc 1) ""))
                          (passthrough)))))


(cmd/command {:command :editor.close-pair
              :hidden true
              :desc "Editor: Close pair character"
              :exec (fn [c]
                      (object/raise (ctx/->obj :editor.keys.normal) :close-pair! c))})

(cmd/command {:command :editor.open-pair
              :hidden true
              :desc "Editor: Open pair character"
              :exec (fn [c]
                      (object/raise (ctx/->obj :editor.keys.normal) :open-pair! c))})

(cmd/command {:command :editor.repeat-pair
              :hidden true
              :desc "Editor: Repeat pair character"
              :exec (fn [c]
                      (object/raise (ctx/->obj :editor.keys.normal) :repeat-pair! c))})

(cmd/command {:command :editor.backspace-pair
              :hidden true
              :desc "Editor: Pair aware backspace"
              :exec (fn [c]
                      (object/raise (ctx/->obj :editor.keys.normal) :backspace! c))})
