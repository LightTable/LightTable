(ns lt.objs.commands.set
  (:require [lt.object :as object]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.settings :as settings]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [clojure.string :as string]
            [cljs.reader :as reader]))

(defn ->val [v]
  (let [res (reader/read-string v)]
    (cond
     (symbol? res) (str res)
     :else res)))

(cmd/command {:command :line-numbers
              :desc "Editor: Toggle line numbers"
              :exec (fn []
                      (let [v (not (settings/fetch :line-numbers))]
                        (settings/store! :line-numbers v)
                        (object/raise pool/pool :line-numbers-change v))
                      )})

(cmd/command {:command :toggle-wrap
              :desc "Editor: Toggle line wrapping for current"
              :exec (fn []
                      (let [ed (pool/last-active)
                            v (not (editor/option ed :lineWrapping))]
                        (editor/set-options ed {:lineWrapping v}))
                      )})

