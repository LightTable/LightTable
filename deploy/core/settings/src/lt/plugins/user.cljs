(ns lt.plugins.user
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [lt.objs.command :as cmd])
  (:require-macros [lt.macros :refer [defui behavior]]))

(defui hello-panel [this]
  [:h1 "Hello World!"])

(object/object* ::user.hello
                :tags [:user.hello]
                :behaviors [::on-close-destroy]
                :init (fn [this]
                        (hello-panel this)))

(behavior ::on-close-destroy
          :triggers #{:close}
          :reaction (fn [this]
                      (object/raise this :destroy)))

(def hello (object/create ::user.hello))

(cmd/command {:command :user.say-hello
              :desc "User: Say Hello"
              :exec (fn []
                      (tabs/add-or-focus! hello))})
