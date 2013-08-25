(ns lt.objs.docs
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.tabs :as tabs]))

;;*********************************************************
;; Object
;;*********************************************************

(object/object* ::docs
                :tags #{:docs}
                :name "Docs"
                :init (fn [this]
                        [:div.docs
                         [:div.frame-shade]
                         [:iframe {:src "http://docs.lighttable.com" :nwdisable "true" :nwfaketop "true"}]]))

;;*********************************************************
;; Behaviors
;;*********************************************************

(object/behavior* ::on-close-destroy
                  :triggers #{:close}
                  :reaction (fn [this]
                              (object/raise this :destroy)))

;;*********************************************************
;; Commands
;;*********************************************************

(cmd/command {:command :show-docs
              :desc "Docs: Open Light Table's documentation"
              :exec (fn []
                      (let [docs (object/create ::docs)]
                        (cmd/exec! :tabset.new)
                        (tabs/add! docs)
                        (tabs/active! docs)
                        (cmd/exec! :tabs.move-next-tabset)))})
