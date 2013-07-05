(ns lt.objs.sidebar.info
  (:require [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.opener :as opener]
            [lt.objs.canvas :as canvas]
            [lt.objs.sidebar :as sidebar]
            [lt.util.dom :as dom]
            [lt.util.cljs :refer [->dottedkw]]
            [crate.binding :refer [bound]])
  (:require-macros [lt.macros :refer [defui]])) 

(object/object* ::sidebar.info
                :triggers #{}
                :behaviors [::seg! ::folder! ::toggle]
                :label "info"
                :order 2
                :init (fn [this]
                        [:div#sidebar-open.closed
                         ]
                        )) 

(def sidebar-info (object/create ::sidebar.info)) 

;(sidebar/add-item sidebar-info) 
