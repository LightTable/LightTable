(ns lt.objs.version
  (:require [lt.object :as object]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.opener :as opener]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as editor]
            [lt.objs.files :as files]
            [lt.objs.tabs :as tabs]
            [lt.objs.deploy :as deploy])
  (:require-macros [lt.macros :refer [behavior defui]]))

(defui check-button []
       [:div.button "Check for updates"]
       :click (fn []
                (deploy/check-version true)))

(behavior ::on-show-refresh-eds
                  :triggers #{:show}
                  :reaction (fn [this]
                              (object/raise (:ed @this) :show)
                              ))

(behavior ::destroy-on-close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (object/destroy! this)))

(object/object* ::version-pane
                :tags #{:version}
                :name "Version"
                :init (fn [this]
                        (let [main (pool/create {:mime "markdown" :content (-> (files/lt-home "/core/changelog.md")
                                                                               (files/open-sync)
                                                                               (:content))})]
                          (object/merge! this {:ed main})
                          [:div#version-info
                           [:div.info
                            [:dl
                             [:dt "Light Table version"] [:dd (:version deploy/version)]
                             [:dt "Binary version"] [:dd (deploy/binary-version)]
                             ]
                            (check-button)
                            ]
                           (editor/->elem main)
                           ]
                          )))

(defn add []
  (let [v (object/create ::version-pane)]
    (tabs/add! v)
    (tabs/active! v)
    ))

(cmd/command {:command :version
              :desc "App: Light Table version"
              :exec (fn [_]
                       (add))})
