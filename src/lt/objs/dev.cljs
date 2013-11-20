(ns lt.objs.dev
  (:require [lt.object :as object]
            [lt.util.js :refer [wait ]]
            [lt.objs.cache :as cache]
            [lt.objs.notifos :as notifos]
            [lt.objs.command :as cmd]))

(def win (.Window.get (js/require "nw.gui")))

(cmd/command {:command :dev-inspector
              :desc "Dev: Open web inspector"
              :hidden true
              :exec (fn []
                      (object/raise (first (object/by-tag :clients.devtools)) :disconnect)
                      (.showDevTools win)
                      (wait 1000 #(object/raise (first (object/by-tag :clients.devtools)) :reconnect!))
                      )})

(cmd/command {:command :toggle-edge
              :desc "Toggle edge"
              :hidden true
              :exec (fn []
                      (if (cache/fetch :edge)
                        (do
                          (cache/store! :edge false)
                          (notifos/set-msg! "Tracking normal"))
                        (do
                          (cache/store! :edge true)
                          (notifos/set-msg! "Tracking edge"))))})
