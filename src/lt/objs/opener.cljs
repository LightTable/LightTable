(ns lt.objs.opener
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.editor.file :as fed]
            [lt.objs.tabs :as tabs]
            [lt.objs.app :as app]
            [lt.objs.notifos :as notifos]
            [lt.objs.files :as files]
            [lt.objs.file-manager :as file-man]
            [lt.util.dom :as dom]
            [lt.util.cljs :refer [->dottedkw]])
  (:use [crate.binding :only [bound map-bound]])
  (:use-macros [crate.def-macros :only [defpartial]]
               [lt.macros :only [defui]]))

;;**********************************************************
;; transient docs
;;**********************************************************

(def active-dialog nil)

(defui open-input [this]
  [:input {:type "file"}]
  :change (fn []
            (this-as me
                     (when-not (empty? (dom/val me))
                       (object/raise this :open! (dom/val me))))))

(defui save-input [this]
  [:input {:type "file" :nwsaveas true}]
  :change (fn []
            (this-as me
                     (when-not (empty? (dom/val me))
                       (object/raise this :save-as! (dom/val me))))))

(defn path->info [path]
  (when path
    (let [type (files/path->type path)]
      {:name (files/basename path) :path path :type (:mime type) :tags (:tags type)})))

(object/behavior* ::open-transient-editor
                  :triggers #{:new!}
                  :reaction (fn [this path dirty?]
                              (let [last (pool/last-active)
                                    type (if last
                                           (-> last deref :info :type)
                                           "plaintext")
                                    info (merge {:name "untitled" :type type} (path->info path))
                                    ed (pool/create info)]
                                (object/add-tags ed [:editor.transient])
                                (object/merge! ed {:dirty dirty?})
                                (object/raise this :open ed)
                                (tabs/add! ed)
                                (tabs/active! ed))))

(object/behavior* ::transient-save
                  :triggers #{:save :save-as-rename!}
                  :reaction (fn [this]
                              (let [s (save-input this)]
                                (set! active-dialog s)
                                (dom/trigger s :click))))

(object/behavior* ::save-as-rename!
                  :triggers #{:save-as-rename!}
                  :reaction (fn [this]
                              (dom/trigger (save-input this) :click)))

(object/behavior* ::save-as
                  :triggers #{:save-as!}
                  :reaction (fn [this path]
                              (let [type (files/path->type path)
                                    prev-tags (-> @this :info :tags)]
                                (object/update! this [:info] merge (path->info path))
                                (object/merge! this {:dirty true})
                                (editor/set-mode this (files/path->mode path))
                                (object/remove-tags this (conj prev-tags :editor.transient))
                                (object/add-tags this (conj (:tags type) :editor.file-backed))
                                (object/raise this :save-as)
                                (object/raise this :save))))

(object/behavior* ::open-from-info
                  :triggers #{:open-info!}
                  :reaction (fn [obj info]
                              (let [ed (pool/create info)]
                                (object/add-tags ed [:editor.transient])
                                (object/raise obj :open ed)
                                (tabs/add! ed)
                                (tabs/active! ed))))


(object/behavior* ::open-standard-editor
                  :triggers #{:open!}
                  :reaction (fn [obj path]
                              (if-not (files/file? path)
                                (if (files/dir? path)
                                  (notifos/set-msg! (str "Cannot open a directory: " path))
                                  (notifos/set-msg! (str "No such file: " path)))
                                (if-let [ed (first (pool/by-path path))]
                                  (tabs/active! ed)
                                  (file-man/open path
                                                 (fn [{:keys [content type line-ending]}]
                                                   (let [type (files/path->type path)
                                                         ed (pool/create (merge {:content content :line-ending line-ending} (path->info path)))]
                                                     (object/add-tags ed [:editor.file-backed])
                                                     (object/raise obj :open ed)
                                                     (tabs/add! ed)
                                                     (tabs/active! ed))))))))

(object/object* ::opener
                :tags #{:opener}
                :triggers #{}
                :behaviors [::open-standard-editor]
                :init (fn [this]))

(def opener (object/create ::opener))

(cmd/command {:command :new-file
              :desc "File: New file"
              :exec (fn [dirty?]
                      (object/raise opener :new! nil dirty?))})

(cmd/command {:command :open-file
              :desc "File: Open file"
              :exec (fn []
                      (set! active-dialog (open-input opener))
                      (dom/trigger active-dialog :click))})

(cmd/command {:command :open-path
              :desc "File: Open path"
              :hidden true
              :exec (fn [path]
                      (object/raise opener :open! path))})

(cmd/command {:command :save
              :desc "File: Save file"
              :exec (fn []
                      (object/raise (pool/last-active) :save))})

(cmd/command {:command :save-as
              :desc "File: Save file as.."
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (object/raise ed :save-as-rename!)))
                      })

(set! js/window.ondragover  (fn [e]
                              (set! (.-dataTransfer.dropEffect e) "move")
                              (dom/prevent e)
                              false))

(set! js/window.ondrop  (fn [e]
                          (try
                            (let [size (.-dataTransfer.files.length e)]
                              (loop [i 0]
                                (when (< i size)
                                  (object/raise opener :open! (-> (.-dataTransfer.files e)
                                                                  (aget i)
                                                                  (.-path)))
                                  (recur (inc i)))))
                            (catch js/Error e
                              (println e)))
                          (dom/prevent e)
                          false))
