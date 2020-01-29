(ns lt.objs.docs
  "Provide command to see LT documentation"
  (:require [lt.objs.command :as cmd]))

(cmd/command {:command :show-docs
              :desc "Docs: Open Light Table's documentation"
              :exec (fn []
                      (cmd/exec! :add-browser-tab "http://docs.lighttable.com/"))})
