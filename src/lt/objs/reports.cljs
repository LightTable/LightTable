;; File created by Tyrieke Morton - TWM

(ns lt.objs.reports
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.tabs :as tabs])
  (:require-macros [lt.macros :refer [behavior]]))

;;*********************************************************
;; Object
;;*********************************************************

(object/object* ::reports
                :tags #{:reports}
                :name "Report Issue"
                :init (fn [this]
                        [:div.reports
                         [:div.frame-shade]
                         [:iframe {:src "https://github.com/LightTable/LightTable/issues?state=open" :nwdisable "true" :nwfaketop "true"}]]))

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

(cmd/command {:command :show-reports
              :desc "Reports: Report an Issue"
              :exec (fn []
                      (let [reports (object/create ::reports)
                            ts (tabs/spawn-tabset)]
                        (tabs/equalize-tabset-widths)
                        (tabs/add! reports ts)
                        (tabs/active! reports)))})
