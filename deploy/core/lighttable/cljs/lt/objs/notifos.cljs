(ns lt.objs.notifos
  "Provide fns for displaying messages and spinner in bottom statusbar"
  (:require [lt.object :as object]
            [lt.objs.statusbar :as statusbar]
            [lt.objs.command :as cmd]
            [lt.util.js :refer [wait]]
            [crate.binding :refer [map-bound bound deref?]])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def ^:private standard-timeout 10000)

(defn- msg* [m & [opts]]
  (let [m (if (string? m)
            m
            (pr-str m))]
    (object/merge! statusbar/statusbar-loader (merge {:message m :class ""} opts))))

(def ^:private cur-timeout)

(defn set-msg!
  "Display message in bottom statusbar. Takes map of options with following keys:

  * :class - css class for message. Use 'error' to display error message
  * :timeout - Number of ms before message times out. Default is 10000 (10s)"
  ([msg]
   (msg* msg)
   (js/clearTimeout cur-timeout)
   (set! cur-timeout (wait standard-timeout #(msg* ""))))
  ([msg opts]
   (msg* msg opts)
   (js/clearTimeout cur-timeout)
   (set! cur-timeout (wait (or (:timeout opts)
                               standard-timeout) #(msg* "")))))

(defn working
  "Display working spinner with optional statusbar message"
  ([] (working nil))
  ([msg]
    (when msg
      (set-msg! msg))
    (statusbar/loader-inc)))

(defn done-working
  "Hide working spinner with optional statusbar message"
  ([]
   (statusbar/loader-dec))
  ([msg]
   (set-msg! msg)
   (statusbar/loader-dec)))

(cmd/command {:command :reset-working
              :desc "Status Bar: Reset working indicator"
              :exec (fn []
                      (statusbar/loader-set)
                      )})
