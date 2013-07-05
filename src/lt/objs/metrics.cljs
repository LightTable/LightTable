(ns lt.objs.metrics
  (:refer-clojure :exclude [send flush])
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.settings :as settings]
            [fetch.remotes :as remotes]
            [lt.util.js :refer [now every]])
  (:require-macros [fetch.macros :refer [letrem remote]]))

(def server-url "http://app.kodowa.com")
(set! remotes/remote-uri (str server-url "/_fetch"))

(def active? true)
(def used? false)

(def _metrics (atom []))

(def metric-rate 30000)

(defn used! []
  (set! used? true))

(defn capture! [ev & [ex]]
  (let [mtr {:ev ev :ts (now)}
        mtr (if ex (assoc mtr :ex ex) mtr)]
    (swap! _metrics conj mtr)))

(defn send [mtrs]
  (remote (metrics! mtrs (settings/fetch :uid))))

(defn flush []
  (when active?
    (when-let [cur (seq @_metrics)]
      (reset! _metrics [])
      (send cur))))

(defn init []
  (when (settings/fetch :no-metrics)
    (set! active? false))
  (letrem [uid (session)]
          (when-not (settings/fetch :uid)
            (settings/store! :uid uid))
          (capture! :session-created)
          (every metric-rate flush))
  (every 60000 (fn []
                 (when used?
                   (set! used? false)
                   (capture! :metrics.minute)))))

(object/behavior* ::init-metrics
                  :triggers #{:init}
                  :reaction (fn []
                              (init)
                              ))

(object/add-behavior! app/app ::init-metrics)