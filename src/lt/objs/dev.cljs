(ns lt.objs.dev
  (:require [lt.object :as object]
            [lt.util.js :refer [wait ]]
            [lt.objs.cache :as cache]
            [lt.objs.notifos :as notifos]
            [lt.objs.command :as cmd]
            [lt.util.ipc :as ipc]
            [lt.objs.app :as app]))

(cmd/command {:command :dev-inspector
              :desc "Dev: Open Developer Tools"
              :exec (fn []
                      (ipc/send "toggleDevTools" (app/window-number)))})

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
