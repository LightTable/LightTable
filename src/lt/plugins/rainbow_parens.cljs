(ns lt.plugins.rainbow-parens
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.command :as cmd]))

(def opposites (js-obj "]" "["
                       "}" "{"
                       ")" "("))

(defn apeek [a]
  (aget a (dec (.-length a))))

(defn overlay [allow-single-quote-strings]
  (clj->js {:startState (fn []
                          (js-obj "stack" (array)
                                  "mode" nil))
            :token (fn [stream state]
                     (when-let [cur (.next stream)]
                       ;;ignore inside of strings
                       (cond
                        (or (= cur "\"")
                            (and allow-single-quote-strings (= cur "'"))
                            (= (.-mode state) "string")) (loop [n (if-not (= (.-mode state) "string")
                                                                    (.next stream)
                                                                    cur)
                                                                escaped false]
                                                           (set! (.-mode state) "string")
                                                           (if-not n
                                                             (do (set! (.-escaped state) escaped) nil)
                                                             (condp = n
                                                               "'" (if-not allow-single-quote-strings
                                                                     (recur (.next stream) false)
                                                                     (if-not escaped
                                                                       (do
                                                                         (set! (.-mode state) nil)
                                                                         nil)
                                                                       (recur (.next stream) false)))
                                                               "\"" (if-not escaped
                                                                      (do
                                                                        (set! (.-mode state) nil)
                                                                        nil)
                                                                      (recur (.next stream) false))
                                                               "\\" (if-not escaped
                                                                      (recur (.next stream) true)
                                                                      (recur (.next stream) false))
                                                               (recur (.next stream) false))))
                        (= cur "\\") (do (set! (.-escaped state) true) nil)
                        (and (not (.-escaped state))
                             (or (= cur "(")
                                 (= cur "[")
                                 (= cur "{"))) (let [level (-> (.-stack state)
                                                               (apeek)
                                                               (:level 0)
                                                               (inc))]
                                                 (.push (.-stack state)
                                                        {:type cur
                                                         :level level})
                                                 (+ "bracket" level))
                        (and (not (.-escaped state))
                             (or (= cur ")")
                                 (= cur "]")
                                 (= cur "}"))) (let [prev (-> (.-stack state)
                                                              (apeek))]
                                                 (if (= (:type prev) (aget opposites cur))
                                                   (do
                                                     (.pop (.-stack state))
                                                     (+ "bracket" (:level prev)))
                                                   "bracket-mismatched"))
                        :else (do (set! (.-escaped state) false) nil))))}))

(object/behavior* ::rainbow-parens
                  :triggers #{:object.instant}
                  :reaction (fn [this]
                              (let [mode-name (editor/option this :mode)
                                    mode (editor/->mode this)
                                    rmode (str mode-name "-rainbow")]
                                (when-not (aget js/CodeMirror.modes rmode)
                                  (js/CodeMirror.defineMode rmode (fn []
                                                                    (js/CodeMirror.overlayMode mode (overlay (not (.-disallowSingleQuoteStrings mode)))))))
                                (editor/set-mode this rmode)
                                (object/merge! this {::real-mode mode-name}))))

(object/behavior* ::hide-rainbow-parens
                  :triggers #{:object.instant}
                  :reaction (fn [this]
                              (when (::real-mode @this)
                                (editor/set-mode this (::real-mode @this)))))

(cmd/command {:command :toggle-rainbow-parens
              :desc "Editor: Toggle rainbow parens"
              :exec (fn []
                      (if (object/in-tag? :editor ::rainbow-parens)
                        (do
                          (object/remove-tag-behaviors :editor [::rainbow-parens])
                          (object/tag-behaviors :editor [::hide-rainbow-parens]))
                        (do
                          (object/remove-tag-behaviors :editor [::hide-rainbow-parens])
                          (object/tag-behaviors :editor [::rainbow-parens])))
                      )})
