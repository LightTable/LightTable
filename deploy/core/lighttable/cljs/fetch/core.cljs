(ns fetch.core
  (:require [clojure.string :as string]
            [clojure.browser.net :as net]
            [clojure.browser.event :as event]
            [cljs.reader :as reader]
            [goog.Uri.QueryData :as query-data]
            [goog.structs :as structs]))

(defn ->method [m]
  (string/upper-case (name m)))

(defn parse-route [route]
  (cond
    (string? route) ["GET" route]
    (vector? route) (let [[m u] route]
                      [(->method m) u])
    :else ["GET" route]))

(defn ->data [d]
  (let [cur (clj->js d)
        query (query-data/createFromMap (structs/Map. cur))]
    (str query)))

(defn ->callback [callback]
  (when callback
    (fn [req]
      (let [data (. req (getResponseText))]
        (callback data)))))

(defn xhr [route content callback & [opts]]
  (let [req (net/xhr-connection)
        [method uri] (parse-route route)
        data (->data content)
        callback (->callback callback)]
    (when callback
      (event/listen req :success #(callback req)))
    (net/transmit req uri method data (when opts (clj->js opts)))))
