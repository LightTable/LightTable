(ns lt.objs.clients.local
  (:refer-clojure :exclude [send])
  (:require [cljs.reader :as reader]
            [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.clients :as clients]
            [lt.objs.sidebar.clients :as scl]
            [lt.objs.eval :as eval]
            [lt.objs.console :as console]
            [clojure.string :as string]
            [crate.core :as crate]
            [lt.util.dom :refer [$ append remove]])
  (:use [lt.util.js :only [wait ->clj]])
  (:require-macros [lt.macros :refer [behavior]]))

(def client-name "LightTable-UI")

(defmulti on-message identity)

(defmethod on-message :editor.eval.cljs.exec [_ data cb]
  (doseq [res (:results data)]
    (let [code (:code res)]
      (try
        (object/raise clients/clients :message
                      [cb
                       :editor.eval.cljs.result
                       {:result (eval/cljs-result-format (.call js/eval js/window code))
                        :meta (merge (:meta data) (:meta res))}])
        (catch :default e
          (object/raise clients/clients :message [cb :editor.eval.cljs.exception {:ex e :meta (:meta res)}]))))))

(defmethod on-message :editor.eval.js [_ data cb]
  (let [code (-> (:code data)
                 (eval/append-source-file (:path data)))]
      (try
        (object/raise clients/clients :message
                      [cb
                       :editor.eval.js.result
                       {:result (.call js/eval js/window code)
                        :meta (:meta data)}])
        (catch :default e
          (object/raise clients/clients :message [cb :editor.eval.js.exception {:ex e :meta (:meta data)}])))))

(defmethod on-message :editor.eval.css [_ data cb]
  (let [name (string/replace (str "local-" (:name data)) #"\." "-")
        cur ($ (str "#" name))]
    (when cur
      (remove cur))
    (append ($ :head)
            (crate/html [:style {:type "text/css" :id name} (:code data)]))))

(defmethod on-message :client.close [_ _ _]
  (clients/rem! (clients/by-name client-name)))

(defmethod on-message :default [])

(behavior ::send!
                  :triggers #{:send!}
                  :reaction (fn [this data]
                                (on-message (keyword (:command data)) (:data data) (:cb data))
                              ))

(defn init []
  (clients/handle-connection! {:name client-name
                               :tags [:client.local]
                               :root-relative (files/lt-home "core")
                               :commands #{:editor.eval.cljs.exec
                                           :editor.eval.js
                                           :editor.eval.css}
                               :type "LT-UI"}))

(scl/add-connector {:name "Light Table UI"
                    :desc "Connect to this instance of Light Table and evaluate in the local context."
                    :connect (fn []
                               (when-not (clients/by-name client-name)
                                 (init)))})
