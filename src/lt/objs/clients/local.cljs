(ns lt.objs.clients.local
  (:refer-clojure :exclude [send])
  (:require [cljs.reader :as reader]
            [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.sidebar.clients :as scl]
            [lt.objs.eval :as eval]
            [lt.objs.console :as console]
            [clojure.string :as string]
            [crate.core :as crate]
            [lt.util.dom :refer [$ append remove]])
  (:use [lt.util.js :only [wait ->clj]]))

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
                        :meta (:meta res)}])
        (catch js/global.Error e
          (object/raise clients/clients :message [cb :editor.eval.cljs.exception {:ex e :meta (:meta res)}]))
        (catch js/Error e
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
        (catch js/Error e
          (object/raise clients/clients :message [cb :editor.eval.js.exception {:ex e :meta (:meta data)}]))
        (catch js/global.Error e
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

(object/behavior* ::send!
                  :triggers #{:send!}
                  :reaction (fn [this data]
                              (let [[cb command data] (->clj data)]
                                (on-message (keyword command) data cb))
                              ))

(object/tag-behaviors :client.local [::send!])

(defn init []
  (clients/handle-connection! {:name client-name
                               :tags [:client.local]
                               :commands #{:editor.eval.cljs.exec
                                           :editor.eval.js
                                           :editor.eval.css}
                               :type "LT-UI"}))

(object/behavior* ::startup-with-local-client
                  :triggers #{:init}
                  :reaction (fn [app]
                              ;(init)
                              ))

(object/tag-behaviors :app [::startup-with-local-client])

(scl/add-connector {:name "Light Table UI"
                    :desc "Connect to this instance of Light Table and evaluate in the local context."
                    :connect (fn []
                               (when-not (clients/by-name client-name)
                                 (init)))})
