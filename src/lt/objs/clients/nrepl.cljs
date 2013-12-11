(ns lt.objs.clients.nrepl
  (:require [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.files :as files]
            [lt.objs.notifos :as notifos]
            [lt.util.js :refer [wait]]
            [lt.util.cljs :refer [js->clj str-contains?]]
            [lt.util.load :refer [node-module]]
            [cljs.reader :as reader]))

(def bencode (node-module "bencode"))
(def Buffer (js/require "buffer"))
(def net (js/require "net"))

(defn encode [msg]
  (.encode bencode (clj->js msg)))

(defn create-buffer [size]
  (let [b (.-Buffer Buffer)]
    (new b size)))

(defn decode [client msg]
  (let [msgs (array)]
    (loop [msg msg]
      (if (<= (.-length msg) 0)
        (object/merge! client {:buffer nil})
        (try
          (let [neue (js->clj (.decode bencode msg "utf-8") :keywordize-keys true)
                pos (.-decode.position bencode)]
            (.push msgs neue)
            (if (and pos (>= pos (.-length msg)))
              (object/merge! client {:buffer nil})
              (recur (.slice msg pos))))
          (catch js/global.Error e
            (object/merge! client {:buffer msg})
            ))))
    msgs))

(def queue (array))
(def queue-index 0)
(def running? false)

(defn non-blocking-loop [client]
  (when (> queue-index 20)
    (.splice queue 0 queue-index)
    (set! queue-index 0))
  (object/raise client ::message (aget queue queue-index))
  (if (>= queue-index (.-length queue))
    (do
      (set! running? false)
      (set! queue-index 0)
      (set! queue (array)))
    (js/global.setImmediate (fn []
                              (set! queue-index (inc queue-index))
                              (non-blocking-loop client)))))

(defn try-decode [client data]
  (let [buffer (if (:buffer @client)
                 (.Buffer.concat Buffer (array (:buffer @client) data))
                 data)
        decoded (decode client buffer)]
    (set! queue (.concat queue decoded))
    (when-not running?
      (set! running? true)
      (non-blocking-loop client))))


(defn connect-to [host port client]
  (let [socket (.connect net port host)]
    (.on socket "connect" #(when @client (object/raise client ::connect)))
    (.on socket "error" #(when @client (object/raise client ::connect-fail)))
    (.on socket "data" #(when @client
                          (try-decode client %)))
    (.on socket "close" #(when @client
                           (object/raise client :close!)))
    socket))


(object/behavior* ::nrepl-connect
                  :triggers #{::connect}
                  :reaction (fn [this]
                              ;;clone a :session
                              (send* this {:op "clone"})
                              ;;get client info
                              ))

(object/behavior* ::init-remote-session
                  :triggers #{:new-session}
                  :reaction (fn [this session]
                              (object/merge! this {:session session})
                              (send this {:op "client.init"
                                          :id (clients/->id this)
                                          :data (pr-str {:settings {:name (:name @this)
                                                                    :remote true
                                                                    :client-id (clients/->id this)}})})))

(object/behavior* ::client.settings.remote
                  :triggers #{:client.settings}
                  :reaction (fn [this info]
                              (clients/handle-connection! info)
                              (object/merge! this {:dir nil})))

(object/behavior* ::nrepl-send!
                  :triggers #{:send!}
                  :reaction (fn [this msg]
                              (send this {:op (:command msg)
                                          :id (or (:cb msg) 0)
                                          :data (pr-str (:data msg))})
                              ))

(object/behavior* ::client.settings
                  :triggers #{:client.settings}
                  :reaction (fn [this info]
                              (clients/handle-connection! info)))

(object/behavior* ::init-session
                  :triggers #{:new-session}
                  :reaction (fn [this session]
                              (object/merge! this {:session session})
                              (send this {:op "client.init"
                                          :id (clients/->id this)
                                          :data (pr-str {:settings {:client-id (clients/->id this)
                                                                    :dir (:dir @this)}})})))

(object/behavior* ::nrepl-message
                  :triggers #{::message}
                  :reaction (fn [this msg]
                              (let [op (:op msg)
                                    info (when (:data msg) (reader/read-string (:data msg)))]

                                (when (:new-session msg)
                                  (object/raise this :new-session (:new-session msg)))

                                (when ((set (:status msg)) "interrupted")
                                  (notifos/done-working))

                                (when op
                                  (if (str-contains? op "client.")
                                    (object/raise this (keyword op) info)
                                    (object/raise clients/clients :message [(:id msg) op info])
                                    )))))

(object/behavior* ::try-connect!
                  :triggers #{:try-connect!}
                  :reaction (fn [this info]
                              (when (:port @this)
                                (object/raise this :connect!))))

(object/behavior* ::connect!
                  :triggers #{:connect!}
                  :reaction (fn [this]
                              (object/merge! this {:socket (connect-to (:host @this "localhost") (:port @this) this)})))

(object/behavior* ::close
                  :triggers #{:close!}
                  :reaction (fn [this]
                              (clients/rem! this)))

(defn send* [client msg]
  (let [c (encode msg)]
    (.write (:socket @client) c)))

(defn send [client msg]
  (let [session (:session @client)
        msg (merge (when session {:session session}) msg)]
    (send* client msg cb)))