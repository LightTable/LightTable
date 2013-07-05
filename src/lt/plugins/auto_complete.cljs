(ns lt.plugins.auto-complete
  (:require [lt.object :as object]
            [lt.objs.keyboard :as keyboard]
            [lt.objs.command :as cmd]
            [lt.objs.sidebar.command :as scmd]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as editor]
            [lt.objs.context :as ctx]
            [lt.objs.workers :as workers]
            [clojure.string :as string]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [defui worker]]))

(defn stream [str]
  (js/CodeMirror.StringStream. str))

(defn advance [s]
  (set! (.-start s) (.-pos s)))

(defn next* [s]
  (.next s))

(defn current [s]
  (.current s))

(defn skip-space [s]
  (when (and (peek* s) (re-seq #"\s" (peek* s)))
    (.eatSpace s)
    (advance s)))

(defn eat-while [s r]
  (.eatWhile s r))

(defn peek* [s]
  (.peek s))

(defn string->tokens [str pattern]
  (let [s (stream str)
        res (js-obj)]
    (skip-space s)
    (while (peek* s)
      (eat-while s pattern)
      (if-not (empty? (current s))
        (do
          (aset res (current s) true)
          (advance s))
        (do
          (next* s)
          (advance s)))
      (skip-space s))
    (map #(do {:completion %}) (js/Object.keys res))))

(defn get-token [ed pos]
  (let [line (editor/line ed (:line pos))
        pattern (get-pattern ed)
        s (stream line)
        ch (:ch pos)]
    (skip-space s)
    (loop []
      (eat-while s pattern)
      (if (and (not (empty? (current s)))
               (<= (.-start s) ch)
               (>= (.-pos s) ch))
        {:start (.-start s)
         :end (.-pos s)
         :line (:line pos)
         :string (current s)}
        (if-not (peek* s)
          {:line (:line pos) :start (:ch pos) :end (:ch pos)}
          (do
            (next* s)
            (advance s)
            (skip-space s)
            (recur)))))))

(defn non-token-change? [ed ch]
  (let [pattern (get-pattern ed)
        text (map str (.-text ch))]
    (when (= (.-origin ch) "+input")
      (some #(not (re-seq pattern %)) text))))

(def w (worker (fn [m]
                 (js/importScripts (str "file://" lthome "/js/lib/stringstream.js"))
                 (let [stream (fn [s]
                                (js/StringStream. s))
                       advance (fn [s]
                                 (set! (.-start s) (.-pos s)))
                       next* (fn [s]
                               (.next s))
                       peek* (fn [s]
                               (.peek s))
                       current (fn [s]
                                 (.current s))
                       skip-space (fn [s]
                                    (when (and (peek* s) (re-seq #"\s" (peek* s)))
                                      (.eatSpace s)
                                      (advance s)))
                       eat-while (fn [s r]
                                   (.eatWhile s r))
                       string->tokens (fn [str pattern]
                                        (let [s (stream str)
                                              pattern (re-pattern pattern)
                                              res (js-obj)]
                                          (skip-space s)
                                          (while (peek* s)
                                            (eat-while s pattern)
                                            (if-not (empty? (current s))
                                              (do
                                                (aset res (current s) true)
                                                (advance s))
                                              (do
                                                (next* s)
                                                (advance s)))
                                            (skip-space s))
                                          (map #(do {:completion %}) (js/Object.keys res))))]
                   (send :tokens {:tokens (string->tokens (:string m) (:pattern m))
                                  :obj (:obj m)})))
        :tokens (fn [m]
                  (let [obj (object/by-id (:obj m))]
                    (object/raise obj :hint-tokens (:tokens m))))))

(def default-pattern #"[\w_$]")

(defn get-pattern [ed]
  (let [mode (editor/->mode ed)]
    (or (aget mode "hint-pattern") default-pattern)))

(defn async-hints [this]
  (w {:obj (object/->id this)
      :string (editor/->val this)
      :pattern (.-source (get-pattern this))}))

(def hinter (scmd/filter-list {:items (fn []
                                        (when-let [cur (pool/last-active)]
                                          (if (:starting-token @hinter)
                                            (remove #(= (-> @hinter :starting-token :string) (-> % :completion))
                                                    (::hints @cur))
                                            (::hints @cur))))
                               :key :completion}))

(object/behavior* ::escape!
                  :triggers #{:escape!}
                  :reaction (fn [this]
                              (let [elem (object/->content this)]
                                (when (:line @this)
                                  (js/CodeMirror.off (:line @this) "change" on-line-change))
                                (object/remove-tags (:ed @this) [:editor.hinting])
                                (object/merge! this {:active false
                                                     :selected 0
                                                     :ed nil
                                                     :starting-token nil
                                                     :token nil
                                                     :search ""})
                                (object/raise this :inactive)
                                (when (dom/parent elem)
                                  (dom/remove elem)))))


(object/behavior* ::select
                  :triggers #{:select}
                  :reaction (fn [this c]
                              (let [token (:token @this)]
                                (editor/replace (:ed @this)
                                                {:line (:line token)
                                                 :ch (:start token)}
                                                {:line (:line token)
                                                 :ch (:end token)}
                                                (:completion c)))
                                (object/raise this :escape!)))

(object/behavior* ::line-change
                  :triggers #{:line-change}
                  :reaction (fn [this l c]
                              (when (:active @hinter)
                                (let [pos (editor/->cursor (:ed @this))
                                      token (get-token (:ed @this) pos)]
                                  (if (or (non-token-change? (:ed @this) c)
                                          (< (:ch pos) (-> @hinter :starting-token :start)))
                                    (object/raise hinter :escape!)
                                    (do
                                      (object/raise hinter :change! (:string token))
                                      (object/merge! hinter {:token token})))))))

(defn on-line-change [line ch]
  (object/raise hinter :line-change line ch))

(object/tag-behaviors :hinter [::escape! ::select ::line-change])
(object/add-tags hinter [:hinter])

(object/behavior* ::async-hint-tokens
                  :triggers #{:hint-tokens}
                  :reaction (fn [this tokens]
                              (object/merge! this {::hints tokens})))

(object/behavior* ::intra-buffer-string-hints
                  :triggers #{:change}
                  :debounce 200
                  :reaction (fn [this ch]
                              (when (or (not= (:ed @hinter) this)
                                        (not (:active @hinter)))
                                (async-hints this))
                              ))

(defn start-hinting [this]
  (let [pos (editor/->cursor this)
        token (get-token this pos)
        line (editor/line-handle this (:line pos))
        elem (object/->content hinter)]
    (object/add-tags this [:editor.hinting])
    (object/merge! hinter {:token token
                           :starting-token token
                           :ed this
                           :active true
                           :line line})
    (object/raise hinter :change! (:string token))
    (object/raise hinter :active)
    (condp = (count (:cur @hinter))
      0 (object/raise hinter :escape!)
      1 (object/raise hinter :select! 0)
      (do
        (js/CodeMirror.on line "change" on-line-change)
        (dom/append (dom/$ :body) elem)
        (js/CodeMirror.positionHint (editor/->cm-ed this) elem (:start token))))))

(object/behavior* ::show-hint
                  :triggers #{:hint}
                  :reaction (fn [this]
                              (let [cur (string/trim (editor/get-char this -1))]
                                (cond
                                 (and (:active @hinter)
                                      (= (:ed @hinter) this)) (object/raise hinter :select!)
                                 (empty? cur) (keyboard/passthrough)
                                 (:active @hinter) (do (object/raise hinter :escape!) (start-hinting this))
                                 :else (start-hinting this)))))

(object/behavior* ::remove-on-scroll-inactive
                  :triggers #{:scroll :inactive}
                  :reaction (fn [this]
                              (object/raise hinter :escape!)))

(object/behavior* ::remove-on-move-line
                  :triggers #{:move}
                  :reaction (fn [this]
                              (when (and (:starting-token @hinter)
                                         (not= (-> @hinter :starting-token :line)
                                               (-> (editor/->cursor this) :line)))
                                (object/raise hinter :escape!))))

(object/tag-behaviors :editor.hinting [::remove-on-scroll-inactive ::remove-on-move-line])

(cmd/command {:command :auto-complete
              :hidden true
              :desc "Auto complete"
              :exec (fn []
                      (let [ed (pool/last-active)]
                        (if-not (editor/selection? ed)
                          (object/raise ed :hint)
                          (keyboard/passthrough))))})

(comment
(defui mark [klass]
  [:span {:class klass}])

(editor/set-options (pool/last-active) {:gutters (array "gitmarks")})

(.setGutterMarker (editor/->cm-ed (pool/last-active)) 30 "gitmarks" (mark "gitmodified"))
  )

(object/tag-behaviors :editor [::intra-buffer-string-hints ::show-hint ::async-hint-tokens])

;;*********************************************************
;; Mode extensions
;;*********************************************************

(js/CodeMirror.extendMode "clojure" (clj->js {:hint-pattern #"[\w\-\>\:\*\$\?\<\!\+]"}))
(js/CodeMirror.extendMode "css" (clj->js {:hint-pattern #"[\w\.\-\#]"}))
