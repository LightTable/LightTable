(ns lt.objs.document
  (:require [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.popup :as popup])
  (:require-macros [lt.macros :refer [defui]]))


;;***************************************************
;; Document
;;***************************************************

(defn create* [info]
  (.Doc js/CodeMirror (:content info) (:mime info)))

(defn linked* [doc info]
  (let [{:keys [from to shared-history type]} info
        cm-doc (-> @doc :doc)]
    (.linkedDoc cm-doc (clj->js {:from from
                                 :to to
                                 :sharedHist shared-history
                                 :mode type}))))

(object/object* ::document
                :triggers #{}
                :behaviors []
                :init (fn [this info]
                        (object/merge! this {:doc (or (:doc info) (create* info))
                                       			 :info info})
                        nil))

(defn create [info]
  (object/create ::document info))

(defn create-sub
  ([doc] (create-sub doc nil))
  ([doc info] (create (assoc info :doc (linked* doc info)))))

;(def orig (create {:content "hey\nzomg\nwoot\ncool\nlah" :mime "text/x-clojure"}))
;(def sub (create-sub orig {:from 1 :to 2}))

(defn ->cm-doc [doc]
  (-> @doc :doc))

(defn ->val [doc]
  (.getValue (->cm-doc doc)))

(defn set-val [doc v]
  (.setValue (->cm-doc doc) v))

(defn replace
  ([d from v]
   (.replaceRange (->cm-doc d) v (clj->js from)))
  ([d from to v]
   (.replaceRange (->cm-doc d) v (clj->js from) (clj->js to))))


;;***************************************************
;; Manager
;;***************************************************

(declare manager)

(defn open [path cb]
  ;;TODO: check if the file is already open?
  (files/open path (fn [data]
                     (object/update! manager [:files] assoc path (files/stats path))
                     (when cb
                       (cb data))))
  )

(defn check-mtime [prev updated]
  (if prev
    (= (.getTime (.-mtime prev)) (.getTime (.-mtime updated)))
    true))

(defui button [label & [cb]]
       [:div.button.right label]
       :click (fn []
                (when cb
                  (cb))))

(defn overwrite-warn [cb]
  (popup/show! [:h2 "This file was modified."]
               [:p "It looks like this file was modified outside of Light Table and saving
                would overwrite those changes. Do you want to overwrite or cancel?"]
               (button "Cancel")
               (button "Overwrite" cb)
               ))

(defn save* [path content cb]
  (files/save path content (fn [data]
                             (object/update! manager [:files] assoc path (files/stats path))
                             (when cb
                             	(cb data)))))

(defn save [path content cb]
  (let [updated (files/stats path)
        prev (get-in @manager [:files path])
        safe? (check-mtime prev updated)]
    (if-not safe?
      (overwrite-warn #(save* path content cb))
      (save* path content cb))))


(object/object* ::doc-manager
                :triggers []
                :behaviors []
                :files {}
                :init (fn []
                        ))

(def manager (object/create ::doc-manager))
