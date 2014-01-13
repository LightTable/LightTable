(ns lt.objs.docs
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.tabs :as tabs])
  (:require-macros [lt.macros :refer [behavior]]))

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

(behavior ::on-close-destroy
                  :triggers #{:close}
                  :reaction (fn [this]
                              (when-let [ts (:lt.objs.tabs/tabset @this)]
                                (when (= (count (:objs @ts)) 1)
                                  (tabs/rem-tabset ts)))
                              (object/raise this :destroy)))

;;*********************************************************
;; Commands
;;*********************************************************

(cmd/command {:command :show-docs
              :desc "Docs: Open Light Table's documentation"
              :exec (fn []
                      (let [docs (object/create ::docs)
                            ts (tabs/spawn-tabset)]
                        (tabs/equalize-tabset-widths)
                        (tabs/add! docs ts)
                        (tabs/active! docs)))})
