(ns lt.plugins.watches
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.editor :as ed]
            [lt.objs.editor.pool :as pool])
  (:require-macros [lt.macros :refer [behavior]]))

(defn inline [this opts loc]
  (let [ed (:ed @this)
        type (or (:type opts) :inline)
        line (ed/line-handle ed (:line loc))
        res-obj (object/create :lt.objs.eval/inline-result {:ed this
                                                            :class (or (:class opts) (name type))
                                                            :opts opts
                                                            :result res
                                                            :loc loc
                                                            :line line})]
    (object/add-tags res-obj [:inline.watch])
    (object/update! this [:widgets] assoc [line type] res-obj)
    res-obj))

(defn watched-range [ed start end src->watch]
  (let [doc (.Doc js/CodeMirror (ed/->val ed))
        range (when start
                (ed/mark doc start (update-in end [:ch] inc) {:inclusiveLeft true :inclusiveRight true}))
        ;;add watch ranges
        watches (doall (filter identity
                               (for [[id watch] (:watches @ed)
                                     :let [watch (:mark watch)
                                           pos (.find watch)
                                           mark (when pos (ed/mark doc (.-from pos) (.-to pos) {:className "watched"}))]]
                                 (when mark
                                   (set! (.-custom mark) (.-custom watch))
                                   (set! (.-ltwatchid mark) id)
                                   mark))))]
    ;;replace watched ranges with code
    (doseq [watch watches
            :let [pos (.find watch)
                  text (ed/range doc (.-from pos) (.-to pos))
                  meta {:obj (object/->id ed)
                        :id (.-ltwatchid watch)}
                  v (if-not (.-custom watch)
                      (object/raise-reduce ed :watch.src+ text meta text)
                      (object/raise-reduce ed :watch.custom.src+ text meta (.-custom watch) text))]]
      (ed/replace doc (.-from pos) (.-to pos) v))
    (if range
      (let [pos (.find range)]
        (ed/range doc (.-from pos) (.-to pos)))
      (ed/->val doc))))

(behavior ::clear!
          :triggers #{:clear}
          :reaction (fn [inline-watch]
                      (let [ed (-> @inline-watch :ed)
                            id (-> @inline-watch :opts :id)]
                        (.clear (-> @ed :watches (get id) :mark))
                        (object/update! ed [:watches] dissoc id)
                        (object/raise ed :unwatch))))

(behavior ::watch!
          :triggers #{:watch!}
          :reaction (fn [this opts]
                      (when-let [sel (ed/selection-bounds this)]
                        (let [id (-> (gensym "watch")
                                     (str))
                              mark (ed/mark this (:from sel) (:to sel) {:className (or (:class opts) "watched")
                                                                        :inclusiveLeft false
                                                                        :inclusiveRight false})
                              res (inline this (merge {:type :watch :id id} opts) (:to sel))]
                          (.on mark "hide" (fn []
                                             (object/raise res :clear!)))
                          (set! (.-custom mark) (when (:exp opts) opts))
                          (set! (.-lttype mark) :watch)
                          (set! (.-ltwatchid mark) id)
                          (object/update! this [:watches] assoc id {:mark mark
                                                                    :inline-result res})
                          (object/raise this :watch)))))

(behavior ::unwatch!
          :triggers #{:unwatch!}
          :reaction (fn [this]
                      (when-let [cur (ed/->cursor this)]
                        (doseq [mark (ed/find-marks this cur)
                                :when (= (.-lttype mark) :watch)]
                          (object/raise (-> @this :watches (get (.-ltwatchid mark)) :inline-result) :clear!)))))

(behavior ::eval-on-watch-or-unwatch
          :triggers #{:unwatch :watch}
          :reaction (fn [this]
                      (when (ed/selection? this)
                        (let [cursor (ed/->cursor this)]
                          (ed/set-selection this cursor cursor)))
                      (object/raise this :eval.one)))

(cmd/command {:command :editor.watch.watch-selection
              :desc "Editor: Watch selection"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (object/raise ed :watch!))
                      )})

(cmd/command {:command :editor.watch.custom-watch-selection
              :desc "Editor: Custom watch selection"
              :hidden true
              :exec (fn [exp opts]
                      (when-let [ed (pool/last-active)]
                        (object/raise ed :watch! (assoc opts :exp exp)))
                      )})


(cmd/command {:command :editor.watch.unwatch
              :desc "Editor: Remove watch under cursor"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (object/raise ed :unwatch!))
                      )})

(cmd/command {:command :editor.watch.remove-all
              :desc "Editor: Clear all watches"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (doseq [w (vals (:watches @ed))]
                          (object/raise (:inline-result w) :clear!))))})

