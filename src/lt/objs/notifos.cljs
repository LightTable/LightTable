(ns lt.objs.notifos
  (:require [lt.object :as object]
            [lt.objs.statusbar :as statusbar]
            [lt.objs.command :as cmd]
            [lt.util.js :refer [wait]]
            [crate.binding :refer [map-bound bound deref?]])
  (:require-macros [lt.macros :refer [defui]]))

(def standard-timeout 10000)

(defn working [msg]
  (when msg
    (set-msg! msg))
  (statusbar/loader-inc))

(defn done-working [msg]
  (when msg
    (set-msg! msg))
  (statusbar/loader-dec))

(defn msg* [m opts]
  (object/merge! statusbar/statusbar-loader (merge {:message m :class ""} opts)))

(defn set-msg! [msg opts]
  (msg* msg opts)
  (js/clearTimeout cur-timeout)
  (set! cur-timeout (wait standard-timeout #(msg* ""))))

(cmd/command {:command :reset-working
              :desc "Statusbar: Reset working indicator"
              :exec (fn []
                      (statusbar/loader-set 0)
                      )})
