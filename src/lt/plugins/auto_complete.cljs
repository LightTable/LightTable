(ns lt.plugins.auto-complete
  (:require [lt.object :as object]
            [lt.objs.keyboard :as keyboard]
            [lt.objs.command :as cmd]
            [lt.util.load :as load]
            [lt.objs.thread :as thread]
            [lt.objs.sidebar.command :as scmd]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as editor]
            [lt.objs.context :as ctx]
            [clojure.string :as string]
            [lt.util.js :refer [wait]]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [behavior defui background]]))

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
    (into-array (map #(do #js {:completion %}) (js/Object.keys res)))))

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
    (condp = (.-origin ch)
      "+input" (some #(not (re-seq pattern %)) text)
      "paste" true
      false)))

(def w (background (fn [obj-id m]
                     (let [StringStream (-> (js/require (str js/ltpath "/core/node_modules/codemirror/stringstream.js"))
                                            (.-StringStream))
                           stream (fn [s]
                                    (StringStream. s))
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
                                              (into-array (map #(do #js {:completion %}) (js/Object.keys res)))))]
                       (js/_send obj-id :hint-tokens (string->tokens (:string m) (:pattern m)))))))

(def default-pattern #"[\w_$]")

(defn get-pattern [ed]
  (let [mode (editor/inner-mode ed)]
    (or (:hint-pattern @ed) (aget mode "hint-pattern") default-pattern)))

(defn async-hints [this]
  (when @this
    (w this {:string (editor/->val this)
             :pattern (.-source (get-pattern this))})))

(defn text|completion [x]
  (or (.-text x) (.-completion x)))

(defn text+completion [x]
  (str (.-text x) (.-completion x)))

(defn distinct-completions [hints]
  (let [seen #js {}]
    (filter (fn [hint]
              (if (true? (aget seen (.-completion hint)))
                false
                (aset seen (.-completion hint) true)))
            hints)))

(def hinter (-> (scmd/filter-list {:items (fn []
                                            (when-let [cur (pool/last-active)]
                                              (let [token (-> @hinter :starting-token :string)]
                                                (distinct-completions
                                                 (if token
                                                   (remove #(= token (.-completion %))
                                                           (object/raise-reduce cur :hints+ [] token))
                                                   (object/raise-reduce cur :hints+ []))))))
                                   :key text|completion})
                (object/add-tags [:hinter])))

(behavior ::textual-hints
          :triggers #{:hints+}
          :reaction (fn [this hints]
                      (concat (::hints @this) hints)))

(behavior ::escape!
          :triggers #{:escape!}
          :reaction (fn [this force?]
                      (let [elem (object/->content this)]
                        (when (:line @this)
                          (js/CodeMirror.off (:line @this) "change" on-line-change))
                        (ctx/out! [:editor.keys.hinting.active])
                        (when (or force? (= 0 (count (:cur @this))))
                          (keyboard/passthrough))
                        (object/merge! this {:active false
                                             :selected 0
                                             :ed nil
                                             :starting-token nil
                                             :token nil
                                             :search ""})
                        (object/raise this :inactive)
                        (when (dom/parent elem)
                          (dom/remove elem)))))

(behavior ::select
          :triggers #{:select}
          :reaction (fn [this c]
                      (let [token (:token @this)
                            start {:line (:line token)
                                   :ch (:start token)}
                            end {:line (:line token)
                                 :ch (:end token)}]
                        (object/merge! this {:active false})
                        (if (.-select c)
                          ((.-select c) (partial editor/replace (:ed @this) start end) c)
                          (editor/replace (:ed @this) start end (.-completion c)))
                        (object/raise this :escape!))))

(behavior ::select-unknown
          :triggers #{:select-unknown}
          :reaction (fn [this v]
                      (object/raise this :escape!)
                      (keyboard/passthrough)))

(behavior ::line-change
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
                              (if (= 0 (count (:cur @hinter)))
                                (ctx/out! [:editor.keys.hinting.active :filter-list.input])
                                (when-not (ctx/in? :editor.keys.hinting.active)
                                  (ctx/in! [:filter-list.input] hinter)
                                  (ctx/in! [:editor.keys.hinting.active] (:ed @hinter))))
                              (object/merge! hinter {:token token})))))))

(defn on-line-change [line ch]
  (object/raise hinter :line-change line ch))

(behavior ::async-hint-tokens
          :triggers #{:hint-tokens}
          :reaction (fn [this tokens]
                      (object/merge! this {::hints tokens})))

(behavior ::intra-buffer-string-hints
          :triggers #{:change}
          :debounce 400
          :reaction (fn [this ch]
                      (when (or (not= (:ed @hinter) this)
                                (not (:active @hinter)))
                        (async-hints this))
                      ))

(defn start-hinting [this opts]
  (let [pos (editor/->cursor this)
        token (get-token this pos)
        line (editor/line-handle this (:line pos))
        elem (object/->content hinter)]
    (ctx/in! [:editor.keys.hinting.active] this)
    (object/merge! hinter {:token token
                           :starting-token token
                           :ed this
                           :active true
                           :line line})
    (object/raise hinter :change! (:string token))
    (object/raise hinter :active)
    (let [count (count (:cur @hinter))]
      (cond
       (= 0 count) (ctx/out! [:editor.keys.hinting.active :filter-list.input])
       (and (= 1 count)
            (:select-single opts)) (object/raise hinter :select! 0)
       :else (do
               (js/CodeMirror.on line "change" on-line-change)
               (dom/append (dom/$ :body) elem)
               (js/CodeMirror.positionHint (editor/->cm-ed this) elem (:start token)))))))

(behavior ::show-hint
          :triggers #{:hint}
          :reaction (fn [this opts]
                      (let [cur (string/trim (editor/get-char this -1))
                            opts (merge {:select-single true} opts)]
                        (cond
                         (and (:active @hinter)
                              (= (:ed @hinter) this)) (object/raise hinter :select!)
                         (and (empty? cur)
                              (not (:force? opts))) (keyboard/passthrough)
                         (:active @hinter) (do (object/raise hinter :escape!) (start-hinting this))
                         :else (start-hinting this opts)))))

(behavior ::remove-on-scroll-inactive
          :triggers #{:scroll :inactive}
          :reaction (fn [this]
                      (when (:active @hinter)
                        (object/raise hinter :escape!))))

(behavior ::remove-on-move-line
          :triggers #{:move}
          :reaction (fn [this c]
                      (when (:active @hinter)
                        ;;HACK: line change events are sent *after* cursor move
                        ;;this means that we need to wait for those to fire and then
                        ;;check if we're out of bounds.
                        (wait 0 (fn []
                                  (let [starting (:starting-token @hinter)
                                        cur (:token @hinter)
                                        cursor (editor/->cursor this)]
                                    (when (and starting
                                               cur
                                               (or (not (<= (:start cur) (:ch cursor) (:end cur)))
                                                   (not= (:line starting) (:line cursor))))
                                      (object/raise hinter :escape!))))))))

(behavior ::auto-show-on-input
          :triggers #{:input}
          :type :user
          :desc "Auto-complete: Show on change"
          :reaction (fn [this _ ch]
                      (when-not (non-token-change? this ch)
                        (when-not (and (:active @hinter)
                                       (= (:ed @hinter) this))
                          (object/raise this :hint {:select-single false})))))

(cmd/command {:command :auto-complete.remove
              :hidden true
              :desc "Editor: Auto complete hide"
              :exec (fn []
                      (when (:active @hinter)
                        (object/raise hinter :escape!))
                      (keyboard/passthrough))})

(cmd/command {:command :auto-complete
              :hidden true
              :desc "Editor: Auto complete"
              :exec (fn []
                      (let [ed (pool/last-active)]
                        (if-not (editor/selection? ed)
                          (object/raise ed :hint)
                          (keyboard/passthrough))))})

(cmd/command {:command :auto-complete.force
              :hidden true
              :desc "Editor: Force auto complete"
              :exec (fn []
                      (let [ed (pool/last-active)]
                        (object/raise ed :hint {:force? true})))})

;;*********************************************************
;; Mode extensions
;;*********************************************************

(behavior ::init
          :triggers #{:init}
          :reaction (fn [this]
                      (load/js "core/node_modules/codemirror/show-hint.js" :sync)
                      (js/CodeMirror.extendMode "clojure" (clj->js {:hint-pattern #"[\w\-\>\:\*\$\?\<\!\+\.\/foo]"}))
                      (js/CodeMirror.extendMode "text/x-clojurescript" (clj->js {:hint-pattern #"[\w\-\>\:\*\$\?\<\!\+\.\/foo]"}))
                      (js/CodeMirror.extendMode "css" (clj->js {:hint-pattern #"[\w\.\-\#]"}))
                      ))
