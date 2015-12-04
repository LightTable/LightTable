(ns lt.objs.connector
  "Provide client-selector object for UI and behaviors to choosing a client"
  (:require [lt.object :as object]
            [lt.objs.canvas :as canvas]
            [lt.objs.popup :as popup]
            [lt.objs.eval :as eval])
  (:require-macros [lt.macros :refer [behavior defui]]))

(behavior ::on-selected
          :triggers #{:selected}
          :reaction (fn [this client]
                      (when-let [cb (:cb @this)]
                        (cb client))
                      (object/raise this :close!)))

(behavior ::on-close!
          :triggers #{:close!}
          :reaction (fn [this]
                      (object/raise (:popup @this) :close!)
                      (object/destroy! this)
                      ))

(defui client-button [obj client]
  [:li.button (:name @client)]
  :click (fn []
           (object/raise obj :selected client)
           ))

(object/object* ::client-selector
                :tags #{:client.selector}
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

(behavior ::select-client
          :triggers #{:select-client}
          :reaction (fn [obj potentials cb]
                      (object/create ::client-selector potentials cb)))

(object/add-behavior! eval/evaler ::select-client)
