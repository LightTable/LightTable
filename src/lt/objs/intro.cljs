(ns lt.objs.intro
  (:require [lt.object :as object]
            [lt.objs.settings :as settings]
            [lt.objs.deploy :as deploy]
            [lt.objs.command :as cmd]
            [lt.objs.app :as app]
            [lt.objs.tabs :as tabs]
            [crate.core :refer [raw]]
            [crate.binding :refer [bound]])
  (:require-macros [lt.macros :refer [defui]]))

(object/behavior* ::on-close-destroy
                  :triggers #{:close}
                  :reaction (fn [this]
                              (object/raise this :destroy)))

(defn ->lt-image [stts]
  (deploy/in-lt (str "img/lighttabletext" (if (= (:skin stts) "light")
                                            "light"
                                            "dark") ".png")))

(defui docs []
  [:button "Light Table's docs"]
  :click (fn []
           (cmd/exec! :show-docs)))

(defui changelog []
  [:button "changelog"]
  :click (fn []
           (cmd/exec! :version)))

(object/object* ::intro
                :tags #{:intro}
                :behaviors [::on-close-destroy]
                :name "Welcome"
                :init (fn [this]
                        [:div#intro
                         [:h1
                          [:img {:height 40 :src (bound settings/settings ->lt-image)}]]
                         [:p "Welcome to the latest version of Light Table. To see the full list of what's been added/changed, checkout the " (changelog) ".
                          Some of the highlights include deeper Javascript support, inline browsers, and Python eval! If you're new, you might want to take a look at " (docs) "to get started."]
                         ]))

(object/behavior* ::show-intro
                  :triggers #{:init}
                  :reaction (fn [this]
                              (when-not (app/args)
                                (let [intro (object/create ::intro)]
                                  (tabs/add! intro)
                                  (tabs/active! intro)))))

(object/add-behavior! app/app ::show-intro)
