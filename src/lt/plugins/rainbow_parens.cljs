(ns lt.plugins.rainbow-parens
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.command :as cmd]))

(def opposites (js-obj "]" "["
                       "}" "{"
                       ")" "("))

(def opens #{"(" "[" "{"})
(def closes #{")" "]" "}"})

(defn apeek [a]
  (aget a (dec (.-length a))))

(defn overlay [allow-single-quote-strings]
  (clj->js {:startState (fn []
                          (js-obj "rainbowstack" (array)
                                  "mode" nil))
            :token (fn [stream state base]
                     (if-not (> (.indexOf (.toLowerCase (or (.-style base) "")) "bracket") -1)
                       (do
                         (aset stream "pos" (.-pos base))
                         nil)
                       (do
                         (aset stream "pos" (dec (.-pos base)))
                         (when-let [cur (.next stream)]
                           ;;ignore inside of strings
                           (cond
                            (opens cur) (let [level (-> (.-rainbowstack state)
                                                        (apeek)
                                                        (:level 0)
                                                        (inc))]
                                          (.push (.-rainbowstack state)
                                                 {:type cur
                                                  :pos (.-pos stream)
                                                  :level level})
                                          (+ "rainbow bracket" level))
                            (closes cur) (let [prev (-> (.-rainbowstack state)
                                                        (apeek))]
                                           (if (= (:type prev) (aget opposites cur))
                                             (do
                                               (.pop (.-rainbowstack state))
                                               (+ "rainbow bracket" (:level prev 0)))
                                             "rainbow bracket-mismatched"))
                            :else nil)))))}))

(object/behavior* ::rainbow-parens
                  :triggers #{:object.instant}
                  :type :user
                  :desc "Editor: Enable rainbow parens"
                  :exclusive [::hide-rainbow-parens]
                  :reaction (fn [this]
                              (let [mode-name (editor/option this :mode)
                                    mode (editor/->mode this)
                                    rmode (str mode-name "-rainbow")]
                                (when (= (.indexOf mode-name "-rainbow") -1)
                                  (when-not (aget js/CodeMirror.modes rmode)
                                    (js/CodeMirror.defineMode rmode (fn []
                                                                      (js/CodeMirror.overlayMode mode (overlay (not (.-disallowSingleQuoteStrings mode))) true))))
                                  (editor/set-mode this rmode)
                                  (object/merge! this {::real-mode mode-name})))))

(object/behavior* ::hide-rainbow-parens
                  :triggers #{:object.instant}
                  :type :user
                  :desc "Editor: Disable rainbow parens"
                  :exclusive [::rainbow-parens]
                  :reaction (fn [this]
                              (when (::real-mode @this)
                                (editor/set-mode this (::real-mode @this)))))
