(ns lt.objs.connector
  (:require [lt.object :as object]
            [lt.objs.canvas :as canvas]
            [lt.objs.popup :as popup]
            [lt.objs.eval :as eval])
  (:require-macros [lt.macros :refer [defui]]))

(object/behavior* ::on-selected-cb
                  :triggers #{:selected}
                  :reaction (fn [obj client]
                              (let [cb (@obj :cb)]
                                (cb client))))

(object/behavior* ::on-selected-destroy
                  :triggers #{:selected}
                  :reaction (fn [this client]
                              (object/raise this :close!)
                              ))

(object/behavior* ::on-close!
                  :triggers #{:close!}
                  :reaction (fn [this]
                              (object/raise (:popup @this) :close!)
                              (object/destroy! this)
                              ))

(object/behavior* ::on-exec-clear-client-alerts
                  :triggers #{:exec}
                  :reaction (fn [obj]
                              (doseq [o (object/by-type ::client-alert)]
                                (object/raise o :close!))))

(defui client-button [obj client]
       [:li.button (:name @client)]
       :click (fn []
                (object/raise obj :selected client)
                ))

(defui local-button [obj label]
       [:span.button label]
       :click (fn []
                (object/raise obj :connect.local (:cb @obj))))

(object/object* ::client-selector
                :triggers []
                :behaviors [::on-selected-cb ::on-selected-destroy ::on-close!]
                :init (fn [this clients cb]
                        (object/merge! this {:cb cb
                                             :popup
                                             (popup/popup!
                                              {:header "Which client?"
                                               :body (list [:p "There are multiple clients that could potentially handle this.
                                                            Which one do you want us to use for this file?"]
                                                           [:ul
                                                            (map (partial client-button this) clients)])})})
                        nil
                        ))

(object/object* ::client-alert
                :triggers []
                :behaviors [::on-selected-cb ::on-click-destroy ::on-close!]
                :init (fn [this cb]
                        (let [[_ info _] cb]
                          (object/merge! this {:cb cb
                                               :popup (popup/show!
                                                       [:div.bottom.emph
                                                        [:h2 "You're not connected."]
                                                        [:p "Looks like you don't have a client to execute this code in.
                                                         Let's fix that using the 'connect' command. It will connect Light Table to a project."]
                                                        (when (:local info)
                                                          [:p "Don't have a project?"
                                                           (local-button connector "start a local client")])
                                                        [:p "Syntax: connect [/path/to/project]"]
                                                        [:span.big "⇣"]])})
                          (cbar/write "connect ")
                          (cbar/focus))
                        nil
                        ))

(object/behavior* ::alert-no-client
                  :triggers #{:no-client}
                  :reaction (fn [obj info]
                              (object/create ::client-alert info)
                              ))

(object/behavior* ::select-client
                  :triggers #{:select-client}
                  :reaction (fn [obj potentials cb]
                              (object/create ::client-selector potentials cb)))

(object/object* ::connector
                :triggers []
                :behaviors []
                :init (fn [this]
                        ))

(def connector (object/create ::connector))

(object/add-behavior! eval/evaler ::select-client)
