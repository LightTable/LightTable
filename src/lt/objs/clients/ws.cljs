(ns lt.objs.clients.ws
  "Define websocket server for use with language plugins e.g. JavaScript"
  (:refer-clojure :exclude [send])
  (:require [cljs.reader :as reader]
            [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.clients :as clients]
            [lt.util.load :as load]
            [clojure.string :as string])
  (:use [lt.util.js :only [wait ->clj]])
  (:require-macros [lt.macros :refer [behavior]]))

(def port 0)
(def sockets (atom {}))
(def io (load/node-module "socket.io"))
(def net (js/require "net"))

(defn send-to [sock data]
  (if sock
    (.emit sock (-> data second) data)
    ;;TODO: some system-wide error reporting
    (.log js/console (str "No such client: " sock))))

(defn ->client [data]
  (let [d (js->clj data :keywordize-keys true)]
    (assoc d
           :type :ws)))

(defn store-client! [socket data]
  (let [data (js->clj data :keywordize-keys true)
        client (clients/by-name (:name data))
        data (if-not (:tags data)
               (assoc data :tags [:ws.client])
               (assoc data :tags (map keyword (:tags data))))]
    (.on socket "disconnect" (fn []
                               (when-let [cur (clients/by-name (:name data))]
                                 (when (= socket (:socket @cur))
                                   (clients/rem! cur)))))
    (if (clients/available? client)
      (object/merge! client {:socket socket})
      (clients/handle-connection! (assoc data :socket socket :type :websocket)))))

(defn on-result [socket data]
  (object/raise clients/clients :message (js->clj data :keywordize-keys true)))

(defn on-connect [socket]
  (.on socket "result" #(on-result socket %))
  (.on socket "init" (partial store-client! socket)))

(behavior ::send!
          :triggers #{:send!}
          :reaction (fn [this msg]
                      (send-to (:socket @this) (array (:cb msg) (:command msg) (-> msg :data clj->js)))))

(def server
  (try
    (let [ ws (.listen io 5678)]
      (.set ws "log level" 1)
      (.on (.-server ws) "error" #(do
                                    (if (= (.-code %) "EADDRINUSE")
                                      (do
                                        (.log js/console "Default socket.io port already used. Retrying with a random port.")
                                        (.listen (.-server ws) 0))
                                      (throw %))))
      (.on (.-server ws) "listening" #(do
                                        (set! port (.-port (.address (.-server ws))))))
      (.add (aget ws "static") "/lighttable/ws.js" (clj->js {:file (files/lt-home "core/node_modules/lighttable/ws.js")}))
      (.on (.-sockets ws) "connection" on-connect)
      ws)
    (catch :default e
      (.error js/console "Error starting socket.io server" e))))

(behavior ::kill-on-closed
          :triggers #{:closed}
          :reaction (fn [app]
                      (.close server)))
