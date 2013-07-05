(ns lt.plugins.watches
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.editor :as ed]
            [lt.objs.editor.pool :as pool]))

(object/behavior* ::watch!
                  :triggers #{:watch!}
                  :reaction (fn [this]
                              (when-let [sel (ed/selection-bounds this)]
                                (let [mark (ed/mark this (:from sel) (:to sel) {:className "watched"
                                                                                :inclusiveLeft true
                                                                                :inclusiveRight true})]
                                  (set! (.-lttype mark) :watch)
                                  (object/update! this [:watches] conj mark)
                                  (object/raise this :watch)))))

(object/behavior* ::unwatch!
                  :triggers #{:unwatch!}
                  :reaction (fn [this]
                              (when-let [cur (ed/->cursor this)]
                                (doseq [mark (ed/find-marks this cur)
                                        :when (= (.-lttype mark) :watch)]
                                  (object/update! this [:watches] #(remove #{mark} %))
                                  (.clear mark))
                                (object/raise this :unwatch))))

(object/behavior* ::eval-on-watch-or-unwatch
                  :triggers #{:unwatch :watch}
                  :reaction (fn [this]
                              (when (ed/selection? this)
                                (let [cursor (ed/->cursor this)]
                                  (ed/set-selection this cursor cursor)))
                              (object/raise this :eval.one)))

(object/tag-behaviors :editor.javascript [::eval-on-watch-or-unwatch ::watch! ::unwatch!])

(cmd/command {:command :editor.watch.watch-selection
              :desc "Editor: watch selection"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (object/raise ed :watch!))
                      )})

(cmd/command {:command :editor.watch.unwatch
              :desc "Editor: remove watch under cursor"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (object/raise ed :unwatch!))
                      )})

