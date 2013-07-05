(ns lt.objs.notifos
  (:require [lt.object :as object]
            [lt.objs.canvas :as canvas]
            [lt.objs.statusbar :as statusbar]
            [lt.objs.command :as cmd]
            [lt.util.js :refer [wait]]
            [crate.binding :refer [map-bound bound deref?]])
  (:require-macros [crate.def-macros :refer [defpartial]]
                   [lt.macros :refer [defui]]))

(def standard-timeout 10000)
(def notifos (atom (sorted-map)))
(def id (atom 0))

(def cur-timeout nil)

(defn next-id []
  (swap! id inc))

(defn add! [n]
  (let [n (assoc n ::id (next-id))]
    (swap! notifos assoc (::id n) n)
    (when (:timeout n)
      (wait (:timeout n) (fn []
                           (object/raise notifier :notifo.timeout n)
                           )))
    n))

(defn ->id [n]
  (if (deref? n)
    (::id @n)
    (::id n)))

(defn rem! [n]
  (let [id (->id n)]
    (swap! notifos dissoc id)
    ))

(defn clear! []
  (reset! notifos (sorted-map)))

(object/behavior* ::remove-on-timeout
                  :triggers #{:notifo.timeout}
                  :reaction (fn [obj n]
                              (rem! n)
                              ))

(object/behavior* ::on-click-rem!
                  :triggers #{:notifo.click}
                  :reaction (fn [obj n]
                              (rem! n)))

(defui notifo [obj n]
       [:li (bound n :msg)]
       :click (fn []
                (object/raise obj :notifo.click n)
                ))

(object/object* ::notifier
                :triggers [:notifo.click :notifo.timeout]
                :behaviors [::remove-on-timeout ::on-click-rem!]
                :init (fn [obj]
                        [:ul#notifos
                         (map-bound (partial notifo obj) notifos)
                         ]
                        ))

(def notifier (object/create ::notifier))
(canvas/add! notifier)

(defn standard [msg]
  (add! {:msg msg :timeout standard-timeout}))

(defn no-timeout [msg]
  (add! {:msg msg}))

(defn loader-msg [msg]
  [:div
   [:p.loadp.blue
    [:span.loader]
    [:span.loadersub]]
   [:p msg]])

(defn loader [msg]
  (add! {:msg (loader-msg msg)}))

(defn working [msg]
  (when msg
    (set-msg! msg))
  (statusbar/loader-inc))

(defn done-working []
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