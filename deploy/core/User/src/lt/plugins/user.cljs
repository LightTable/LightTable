(ns lt.plugins.user
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [lt.objs.command :as cmd])
  (:require-macros [lt.macros :refer [defui behavior]]))

;; UI to be associated with an object
(defui hello-panel [this]
  [:h1 "Hello World!"])

;; Define an object prototype
(object/object* ::user.hello
                :tags [:user.hello]
                :behaviors [::on-close-destroy]
                :init (fn [this]
                        (hello-panel this)))

;; Currently used by :user.hello but could be reused by any
;; object with a declaration in user.behaviors.
(behavior ::on-close-destroy
          :triggers #{:close}
          :reaction (fn [this]
                      (object/raise this :destroy)))

(def hello (object/create ::user.hello))

;; Create a user command. Commands can call any function
;; and be bound to any keystroke.
(cmd/command {:command :user.say-hello
              :desc "User: Say Hello"
              :exec (fn []
                      (tabs/add-or-focus! hello))})
