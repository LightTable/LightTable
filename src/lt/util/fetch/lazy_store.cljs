(ns lt.util.fetch.lazy-store
  (:refer-clojure :exclude [get set])
  (:require [lt.util.fetch.core :as core])
  (:use [cljs.reader :only [read-string]]))

(def cache (atom {}))

(defn ->vector [ks]
  (if-not (vector? ks)
    [ks]
    ks))

(defn set [ks v]
  (let [ks (->vector ks)]
    (swap! cache assoc-in ks v)))

(defn latest [ks callback]
  (let [ks (->vector ks)]
    (core/xhr [:post "/lazy-store"] {:ks (pr-str ks)}
              (fn [data]
                (let [data (if (= data "") "nil" data)
                      d (read-string data)]
                  (set ks d)
                  (callback d))))))

(defn get [ks callback]
  (let [ks (->vector ks)]
    (if-let [v (get-in @cache ks)]
      (callback v)
      (latest ks callback))))

