(ns lt.objs.document
  "Provide document object for wrapping CodeMirror documents. See
  http://codemirror.org/doc/manual.html#api_doc for more"
  (:require [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.popup :as popup])
  (:require-macros [lt.macros :refer [behavior defui]])
  (:refer-clojure :exclude [replace]))


;;***************************************************
;; Document
;;***************************************************

(def doc-keys [:line-ending :mime])

(defn create* [info]
  (.Doc js/CodeMirror (:content info) (:mime info)))

(defn ->cm-doc [doc]
  (-> @doc :doc))

(defn linked* [doc info]
  (let [{:keys [from to shared-history type]} info]
    (.linkedDoc (->cm-doc doc) (clj->js {:from from
                                 :to to
                                 :sharedHist shared-history
                                 :mode type}))))

(object/object* ::document
                :sub-docs #{::this}
                :tags #{:document}
                :init (fn [this info]
                        (object/merge! this (merge (dissoc info :content) {:doc (or (:doc info) (create* info))}))
                        nil))


(behavior ::close-document-on-editor-close
          :for #{:editor}
          :triggers #{:closed}
          :reaction (fn [editor]
                      (when-let [doc (:doc @editor)]
                        (object/raise doc :close.force))))

(behavior ::close-linked-document
          :for #{:document}
          :triggers #{:close.force}
          :reaction (fn [this]
                      (when-let [root (:root @this)]
                        (.unlinkDoc (->cm-doc this) (->cm-doc root))
                        (object/update! root [:sub-docs] disj this))
                      (object/destroy! this)))

(behavior ::try-close-root-document
          :for #{:document}
          :triggers #{:try-close}
          :reaction (fn [this]
                      (when (= #{::this} (:sub-docs @this))
                        (object/raise this :close.force))))

(behavior ::close-root-document
          :for #{:document}
          :triggers #{:close.force}
          :reaction (fn [this]
                      (if (and (= #{::this} (:sub-docs @this))
                               (not (object/has-tag? this :document.linked)))
                        (object/destroy! this)
                        (object/update! this [:sub-docs] disj ::this))))

(def default-linked-doc-options {})

(behavior ::set-linked-doc-options
          :triggers #{:object.instant}
          :type :user
          :exclusive true
          :desc "Doc: Set default options for new linked docs"
          :reaction (fn [this opts]
                      (set! default-linked-doc-options opts)))

(defn create [info]
  (object/create ::document info))

(defn create-sub
  ([doc] (create-sub doc nil))
  ([doc info]
   (let [info (merge default-linked-doc-options info)
         neue (create (merge (select-keys @doc doc-keys)
                             info
                             {:doc (linked* doc info) :root doc}))]
     (object/add-tags neue [:document.linked])
     (object/update! doc [:sub-docs] conj neue))))

(defn ->snapshot [doc]
  (let [d (->cm-doc doc)
        lines (transient [])]
    (.eachLine d (fn [line]
                   (conj! lines (.-text line))
                   nil))
    {:version (.changeGeneration d)
     :lines (persistent! lines)
     :doc doc}))


(defn latest-snapshot? [snapshot]
  (= (:version snapshot) (-> (:doc snapshot)
                             (->cm-doc)
                             (.changeGeneration))))

(comment
  (def v1 (->snapshot orig))
  (latest-snapshot? v1)

  (set-val orig "hey\nzomg2\n\n\nwoot4\ncool\nlah")
  (def v4 (->snapshot orig))


  (def hist (.getHistory (->cm-doc orig)))

  (-> hist
      (aget "done")
      (aget 0)
      ;(aget "changes")
      ;(aget 0)
      )
  (aget hist "done"))


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

(defn register-doc [doc path]
  (object/update! manager [:files] assoc path doc))

(defn open [path cb]
  (files/open path (fn [data]
                     (let [d (create {:content (:content data)
                                      :line-ending (:line-ending data)
                                      :mtime (files/stats path)
                                      :mime (:type data)})]
                       (register-doc d path)
                       (when cb
                         (cb d)))))
  )

(defn linked-open [ed ldoc-options path cb]
  (create-sub (:doc @ed) ldoc-options)
  (files/open path (fn [data]
                     (let [d (-> @ed :doc deref :sub-docs last)]
                       (when cb
                         (cb d))))))

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
                 :body [:p "It looks like this file was modified outside of Light Table and saving
                  would overwrite those changes. Do you want to overwrite or cancel?"]
                 :buttons [{:label "Overwrite file"
                            :action cb}
                           {:label "Cancel"}]}))

(defn path->doc [path]
  (-> @manager :files (get path)))

(defn ->stats [path]
  (-> (path->doc path) deref :mtime))

(defn update-stats [path]
  (object/merge! (get-in @manager [:files path]) {:mtime (files/stats path)}))

(defn move-doc [old neue]
  (when-let [old-d (path->doc old)]
    (object/update! manager [:files] assoc neue old-d)
    (object/update! manager [:files] dissoc old)
    (update-stats neue)))

(defn save* [path content cb]
  (files/save path content (fn [data]
                             (update-stats path)
                             (when cb
                             	(cb data)))))

(defn save [path content cb]
  (let [updated (files/stats path)
        safe? (check-mtime (->stats path) updated)]
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
