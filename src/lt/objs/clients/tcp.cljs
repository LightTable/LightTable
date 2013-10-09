(ns lt.objs.clients.tcp
  (:refer-clojure :exclude [send])
  (:require [cljs.reader :as reader]
            [lt.object :as object]
            [lt.objs.window :as window]
            [lt.objs.clients :as clients]
            [lt.objs.console :as console]
            [clojure.string :as string])
  (:use [lt.util.js :only [wait ->clj]]))

(def port 0)
(def waiting (atom #{}))

(def net (js/require "net"))

(defn send-to [sock msg]
  (if sock
    (.write sock (str (.stringify js/JSON msg) "\n"))
    ;;TODO: some system-wide error reporting
    (println (str "No such client: " sock))))

(defn store-client! [socket data]
  (let [client (clients/by-name (:name data))
        data (if-not (:tags data)
               (assoc data :tags [:tcp.client])
               (assoc data :tags (map keyword (:tags data))))]
    (when (clients/available? client)
      (clients/close! client))
    (.on socket "close" (fn []
                          (when-let [cur (clients/by-name (:name data))]
                            (when (= socket (:socket @cur))
                              (clients/rem! cur)))))
    (clients/handle-connection! (assoc data :socket socket))))

(defn on-message [data]
  (object/raise clients/clients :message data))

(defn each-message [socket cb]
  (let [buffer (.-ltbuffer socket)
        loc (.indexOf buffer "\n")]
  (loop [loc loc
         buf buffer]
    (if (and loc
               (> loc -1)
               (not (empty? buf)))
      (let [cur (subs buf 0 loc)
            next (subs buf (inc loc))
            data (try
                   (->clj (.parse js/JSON cur))
                   (catch js/Error e
                     (console/error e))
                   (catch js/global.Error e
                     (console/error e)))]
        (cb data)
        (recur (.indexOf next "\n") next))
      (set! (.-ltbuffer socket) buf)))))

(defn on-result [socket data]
  ;;handle the case where two events come in at once and get joined
  ;;on a new line
  (set! (.-ltbuffer socket) (str (or (.-ltbuffer socket) "") data))
  (each-message socket (fn [data]
                         (if (map? data)
                           (store-client! socket data)
                           (on-message data)))))

(window/store! :tcp-msg on-result)

(defn on-connect [socket]
  (set! (.-ltbuffer socket) "")
  (.on socket "data" #((window/fetch :tcp-msg) socket %)))

(clients/register-type :tcp send-to)

(when (window/fetch :server)
  (set! port (.-port (.address (window/fetch :server)))))

(when-not (window/fetch :server)
  (try
    (let [s (.createServer net on-connect)]
      (window/store! :server )
      (.listen s 0)
      (.on s "listening" #(set! port (.-port (.address s)))))
    ;;TODO: warn the user that they're not connected to anything
    (catch js/Error e
      )
    (catch js/global.Error e
      )))

(object/behavior* ::send!
                  :triggers #{:send!}
                  :reaction (fn [this msg]
                              (send-to (:socket @this) (array (:cb msg) (:command msg) (-> msg :data clj->js)))))

(object/tag-behaviors :tcp.client [::send!])

(object/behavior* ::kill-on-closed
                  :triggers #{:closed}
                  :reaction (fn [app]
                              (try
                                (.close (window/fetch :server))
                                (catch js/Error e)
                                (catch js/global.Error e))))

(object/tag-behaviors :window [::kill-on-closed])

