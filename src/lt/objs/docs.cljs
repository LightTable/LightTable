(ns lt.objs.docs
  (:require [lt.object :as object]
            [lt.objs.settings :as settings]
            [lt.objs.deploy :as deploy]
            [lt.objs.app :as app]
            [lt.objs.command :as cmd]
            [lt.objs.tabs :as tabs]
            [crate.core :refer [raw]]
            [crate.binding :refer [bound]]))

(object/behavior* ::on-close-destroy
                  :triggers #{:close}
                  :reaction (fn [this]
                              (object/raise this :destroy)))

(object/object* ::docs
                :tags #{:docs}
                :name "Docs"
                :init (fn [this]
                        [:div.docs
                         [:div.frame-shade]
                         [:iframe {:src "http://docs.lighttable.com" :nwdisable "true" :nwfaketop "true"}]]))

(object/tag-behaviors :docs [::on-close-destroy])

(cmd/command {:command :show-docs
              :desc "Docs: Open Light Table's documentation"
              :exec (fn []
                      (let [docs (object/create ::docs)]
                        (cmd/exec! :tabset.new)
                        (tabs/add! docs)
                        (tabs/active! docs)))})
