(ns lt.objs.file-manager
  (:require [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.popup :as popup])
  (:require-macros [lt.macros :refer [defui]]))

(declare manager)

(defn open [path cb]
  ;;TODO: check if the file is already open?
  (let [v (files/open-sync path)]
    (object/update! manager [:files] assoc path (files/stats path))
    (cb  v)))

(defn check-mtime [prev updated]
  (if (and prev updated)
    (= (.getTime (.-mtime prev)) (.getTime (.-mtime updated)))
    true))

(defui button [label & [cb]]
       [:div.button.right label]
       :click (fn []
                (when cb
                  (cb))))

(defn overwrite-warn [cb]
  (popup/popup! {:header "This file was modified."
                :body "It looks like this file was modified outside of Light Table and saving
                would overwrite those changes. Do you want to overwrite or cancel?"
                :buttons [{:label "Overwrite" :action cb}
                          popup/cancel-button]}
               ))

(defn ->stats [path]
  (-> @manager :files (get path)))

(defn update-stats [path]
  (object/update! manager [:files] assoc path (files/stats path)))

(defn save* [path content cb]
  (files/save path content (fn [data]
                             (update-stats path)
                             (when-not data
                               (when cb
                                 (cb data))))))

(defn save [path content cb]
  (let [updated (files/stats path)
        prev (get-in @manager [:files path])
        safe? (check-mtime prev updated)]
    (if-not safe?
      (overwrite-warn #(save* path content cb))
      (save* path content cb))))


(object/object* ::file-manager
                :triggers []
                :behaviors []
                :files {}
                :init (fn []
                        ))

(def manager (object/create ::file-manager))
