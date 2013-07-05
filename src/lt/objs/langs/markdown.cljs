(ns lt.objs.langs.markdown
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [lt.objs.clients :as clients]
            [lt.objs.eval :as eval]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [cljs.reader :as reader]
            [lt.objs.console :as console]
            [crate.binding :refer [bound]]
            [crate.core :refer [html]]
            [lt.util.dom :as dom]
            [lt.util.cljs :refer [->dottedkw]])
  (:require-macros [lt.macros :refer [defui]]))

(comment
(def marked (js/require "marked"))

(object/behavior* ::preview-on-change
                  :triggers #{:change}
                  :debounce 1000
                  :reaction (fn [this]
                              (let [ed (:ed @this)]
                                (object/merge! (object/parent this)  {:preview (marked (editor/->val ed))}))))

(defn ->preview [md-prev]
  (let [div (html [:div ])]
    (dom/html div (:preview md-prev))
    div))

(object/object* ::markdown-preview
                :triggers []
                :behaviors [:lt.objs.instarepl/destroy-on-close]
                :name "Markdown"
                :preview ""
                :init (fn [this]
                        (let [main (pool/create {:type "markdown" :content ""}
                                                [#(object/with-behaviors % [:lt.objs.editor/wrap ::preview-on-change])])
                              main-ed (:ed @main)]
                          (object/parent! this main)
                        [:div#markdown-preview
                         (editor/->elem main-ed)
                         [:div.preview
                          (bound this ->preview)
                          ]
                         ]
                        )))

(defn add []
  (let [experiments (object/create ::markdown-preview)]
    (tabs/add! experiments)
    (tabs/active! experiments)))

(cbar/command {:trigger "markdown"
               :doc "open the markdown editor"
               :exec (fn []
                       (add)
                       (cbar/exit))})

  )