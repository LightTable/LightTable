(ns lt.objs.clients.ws
  (:refer-clojure :exclude [send])
  (:require [cljs.reader :as reader]
            [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.window :as window]
            [lt.objs.clients :as clients]
            [lt.util.load :as load]
            [lt.util.cljs :refer [js->clj]]
            [clojure.string :as string])
  (:use [lt.util.js :only [wait ->clj]]))

(when-not (window/fetch :wsockets)
  (window/store! :wsockets (atom {})))

(def port 0)
(def sockets (window/fetch :wsockets))
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
    (.on socket "close" (fn []
                          (when-let [cur (clients/by-name (:name data))]
                            (when (= socket (:socket @cur))
                              (clients/rem! cur)))))
    (if (clients/available? client)
      (object/merge! client {:socket socket})
      (clients/handle-connection! (assoc data :socket socket :type :websocket)))))

(defn on-result [socket data]
  (object/raise clients/clients :message (js->clj data :keywordize-keys true)))

(window/store! :ws-msg on-result)

(defn on-connect [socket]
  (.on socket "result" #((window/fetch :ws-msg) socket %))
  (.on socket "init" (partial store-client! socket)))

(object/behavior* ::send!
                  :triggers #{:send!}
                  :reaction (fn [this msg]
                              (send-to (:socket @this) (array (:cb msg) (:command msg) (-> msg :data clj->js)))))

(object/tag-behaviors :ws.client [::send!])

(when (window/fetch :ws-server)
  (set! port (.-port (.server.address (window/fetch :ws-server)))))


(when-not (window/fetch :ws-server)
  (try
    (let [ ws (.listen io 0)]
      (window/store! :ws-server ws)
      (.set ws "log level" 1)
      (.on (.-server ws) "listening" #(do
                                 (set! port (.-port (.address (.-server ws))))
                                 ))
      (.add (aget ws "static") "/lighttable/ws.js" (clj->js {:file (files/lt-home "core/node_modules/lighttable/ws.js")}))
      ;(js/eval "global.ws.static.add(\"/lighttable/ws.js\",{\"file\":\"deploy/js/ws.js\"});")
      (.on (.-sockets ws) "connection" on-connect))
    ;;TODO: warn the user that they're not connected to anything
    (catch js/Error e
      )
    (catch js/global.Error e
      )
    ))

(object/behavior* ::kill-on-closed
                  :triggers #{:closed}
                  :reaction (fn [app]
                              (try
                                (.close (.-ws.server js/global))
                                (catch js/Error e)
                                (catch js/global.Error e))))

(object/tag-behaviors :app [::kill-on-closed])
