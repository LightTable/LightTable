(ns fetch.remotes
  (:require [fetch.core :as core]
            [cljs.reader :as reader]))

(def remote-uri "/_fetch")

(defn remote-callback [remote params callback]
  (core/xhr [:post remote-uri]
            {:remote remote
             :params (pr-str params)}
            (when callback
              (fn [data]
                (let [data (if (= data "") "nil" data)]
                  (callback (reader/read-string data)))))))
