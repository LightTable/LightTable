(ns lt.objs.metrics
  (:refer-clojure :exclude [send flush])
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.cache :as cache]
            [fetch.remotes :as remotes]
            [lt.util.js :refer [now every]])
  (:require-macros [fetch.macros :refer [letrem remote]]
                   [lt.macros :refer [behavior]]))

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
  (remote (metrics! mtrs (cache/fetch :uid))))

(defn flush []
  (when active?
    (when-let [cur (seq @_metrics)]
      (reset! _metrics [])
      (send cur))))

(defn init []
  (when (cache/fetch :no-metrics)
    (set! active? false))
  (when active?
    (letrem [uid (session)]
            (when-not (cache/fetch :uid)
              (cache/store! :uid uid))
            (capture! :session-created)
            (every metric-rate flush))
    (every 60000 (fn []
                   (when used?
                     (set! used? false)
                     (capture! :metrics.minute))))))

(behavior ::init-metrics
          :triggers #{:init}
          :reaction (fn []
                      (init)))

(behavior ::disable-metrics
          :type :user
          :desc "App: Disable metrics"
          :triggers #{:object.instant}
          :reaction (fn [this]
                      (set! active? false)))
