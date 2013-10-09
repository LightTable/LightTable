(ns lt.plugins.doc
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd])
  (:require-macros [lt.macros :refer [defui]]))

(defn doc-on-line? [editor line]
  (let [line (editor/line-handle editor line)]
    (get-in @editor [:widgets [line :underline]])))

(defn remove! [editor cur]
  (object/update! editor [:widgets] dissoc [(:line @cur) :underline])
  (object/raise cur :clear!))

(defn inline-doc [this res opts loc]
  (let [ed (:ed @this)
        type :underline
        line (editor/line-handle ed (:line loc))
        res-obj (object/create :lt.objs.eval/underline-result {:ed this
                                                            :class (name type)
                                                            :opts opts
                                                            :result res
                                                            :loc loc
                                                            :line line})]
    (object/add-tags res-obj [:inline.doc])
    (object/update! this [:widgets] assoc [line :underline] res-obj)
    res-obj))

(comment

(cmd/command {:command :editor.doc
              :desc "Editor: Get documentation at cursor"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (object/raise ed :editor.doc))
                      )})

(cmd/command {:command :editor.doc.toggle
              :desc "Editor: Toggle documentation at cursor"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (let [loc (editor/->cursor ed)]
                          (if-let [cur (doc-on-line? ed (:line loc))]
                            (remove! ed cur)
                            (object/raise ed :editor.doc)
                            )))
                      )})
  )

(defui doc-ui [doc]
  [:div.inline-doc
   [:h1 (:name doc)]
   (when (and (:args doc)
              (not= (:args doc) "nil"))
     [:h3 (:args doc)])
   (when (and (:doc doc)
              (not= (:doc doc) "nil"))
     [:pre (:doc doc)])])

(object/behavior* ::editor.doc.show!
                  :triggers #{:editor.doc.show!}
                  :reaction (fn [editor doc]
                              (when (not= (:name doc) "")
                                (inline-doc editor (doc-ui doc) {} (:loc doc)))
                              ))
