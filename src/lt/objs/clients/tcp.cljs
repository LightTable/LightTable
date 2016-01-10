(ns lt.objs.clients.tcp
  "Define tcp server for use with language plugins"
  (:refer-clojure :exclude [send])
  (:require [cljs.reader :as reader]
            [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.console :as console]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [behavior]]))

(def port 0)
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
                   (js->clj (.parse js/JSON cur) :keywordize-keys true)
                   (catch :default e
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

(defn on-connect [socket]
  (set! (.-ltbuffer socket) "")
  (.on socket "data" #(on-result socket %)))

(def server
  (try
    (let [s (.createServer net on-connect)]
      (.listen s 0)
      (.on s "listening" #(set! port (.-port (.address s))))
      s)
    (catch :default e
      (console/error "Error starting tcp server" e))))

(behavior ::send!
          :triggers #{:send!}
          :reaction (fn [this msg]
                      (send-to (:socket @this) (array (:cb msg) (:command msg) (-> msg :data clj->js)))))


(behavior ::kill-on-closed
          :triggers #{:closed}
          :reaction (fn [app]
                      (.close server)))

