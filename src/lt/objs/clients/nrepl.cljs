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
(def net (js/require "net"))

(defn encode [msg]
  (.encode bencode (clj->js msg)))

(defn decode [msg]
  (loop [msg msg
         msgs []]
    (if (empty? msg)
      msgs
      (let [neue (js->clj (.decode bencode msg "utf-8") :keywordize-keys true)
            pos (.-decode.position bencode)]
        (if (and pos (>= pos (count msg)))
          (conj msgs neue)
          (recur (subs msg pos) (conj msgs neue)))))))

(defn try-decode [client data]
  (let [buffer (str (:buffer @client) data)
        decoded (try
                  (decode buffer)
                  (catch js/global.Error e
                    (object/update! client [:buffer] str data)
                    nil))]
    (when decoded
      (object/merge! client {:buffer ""})
      (doseq [m decoded]
        (object/raise client ::message m)))))


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
                  :reaction (fn [this]
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
                              (send this {:op "client.init"})
                              ))

(object/behavior* ::nrepl-message
                  :triggers #{::message}
                  :reaction (fn [this msg]
                              (let [op (:op msg)
                                    info (when (:data msg) (reader/read-string (:data msg)))]

                                (when (:new-session msg)
                                  (object/raise this :new-session (:new-session msg)))

                                (when ((set (:status msg)) "interrupted")
                                  (notifos/done-working))

                                (if (and op (str-contains? op "client."))
                                  (object/raise this (keyword op) info)
                                  (object/raise clients/clients :message [(:id msg) op info])
                                  ))))

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
