(ns lt.objs.opener
  "Provide functionality around opening and saving files"
  (:require [lt.object :as object]
            [lt.objs.metrics :as metrics]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.document :as doc]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.editor.file :as fed]
            [lt.objs.workspace :as workspace]
            [lt.objs.dialogs :as dialogs]
            [lt.objs.popup :as popup]
            [lt.objs.tabs :as tabs]
            [lt.objs.app :as app]
            [lt.objs.console :as console]
            [lt.objs.notifos :as notifos]
            [lt.objs.files :as files]
            [lt.util.dom :as dom]
            [lt.util.cljs :refer [->dottedkw]])
  (:use [crate.binding :only [bound map-bound]])
  (:use-macros [crate.def-macros :only [defpartial]]
               [lt.macros :only [behavior defui]]))

;;**********************************************************
;; transient docs
;;**********************************************************

(defn path->info [path]
  (when path
    (let [type (files/path->type path)]
      {:name (files/basename path) :type-name (:name type) :path path :mime (:mime type) :tags (:tags type)})))

(def untitled-count (atom 0))

(behavior ::open-transient-editor
          :triggers #{:new!}
          :reaction (fn [this path dirty?]
                      (let [last (pool/last-active)
                            info (merge {:mime "plaintext" :tags [:editor.plaintext] :name (str "untitled-"
                                                                                                (swap! untitled-count inc))}
                                        (path->info path))
                            ed (pool/create info)]
                        (object/add-tags ed [:editor.transient])
                        (object/merge! ed {:dirty dirty?})
                        (object/raise this :open ed)
                        (tabs/add! ed)
                        (tabs/active! ed))))

(behavior ::transient-save
          :triggers #{:save :save-as-rename!}
          :reaction (fn [this]
                      (let [path (or (first (:folders @workspace/current-ws))
                                     (files/home))
                            info (:info @this)
                            fname (:name info)
                            ext (when-let [e (:exts info)]
                                  (str "." (name (first e))))]
                        (dialogs/save-as this :save-as! (files/join path (str fname ext))))))

(behavior ::save-as-rename!
          :triggers #{:save-as-rename!}
          :reaction (fn [this]
                      (dialogs/save-as this :save-as! (-> @this :info :path))))

(behavior ::save-as
          :triggers #{:save-as!}
          :reaction (fn [this path]
                      (when (not (empty? path))
                        (let [type (files/path->type path)
                              prev-tags (-> @this :info :tags)
                              mode (files/path->mode path)
                              neue-doc (doc/create {:doc (editor/get-doc this)
                                                    :line-ending files/line-ending
                                                    :mtime (files/stats path)
                                                    :mime mode})]
                          (when (:doc @this)
                            (object/raise (:doc @this) :close.force))
                          (doc/register-doc neue-doc path)
                          (object/update! this [:info] merge (path->info path))
                          (object/merge! this {:dirty true
                                               :doc neue-doc})
                          (editor/set-mode this mode)
                          (object/remove-tags this (conj prev-tags :editor.transient))
                          (object/add-tags this (conj (:tags type) :editor.file-backed))
                          (object/raise this :save-as)
                          (object/raise this :save)))))

(behavior ::check-read-only
          :desc "Opener: check if file is read only"
          :triggers #{:open}
          :reaction (fn [this ed]
                      (when-let [path (-> @ed :info :path)]
                        (when (files/exists? path)
                          (when-not (files/writable? path)
                            (object/add-tags ed [:editor.read-only]))))))

(behavior ::open-from-info
          :triggers #{:open-info!}
          :reaction (fn [obj info]
                      (let [ed (pool/create info)]
                        (object/raise obj :open ed)
                        (tabs/add! ed)
                        (tabs/active! ed))))

(defn open-path*
  [doc-fn obj path]
  (doc-fn path
          (fn [doc]
            (let [type (files/path->type path)
                  ed (pool/create (merge {:doc doc :line-ending (-> @doc :line-ending)} (path->info path)))]
              (metrics/capture! :editor.open {:type (or (:name type) (files/ext path))
                                              :lines (editor/last-line ed)})
              (object/add-tags ed [:editor.file-backed])
              (object/raise obj :open ed)
              (lt.objs.tabs/add! ed)
              (lt.objs.tabs/active! ed)))))

(def open-path
  "Open a path given an ::opener object and path"
  (partial open-path* doc/open))

(defn open-linked-path
  "Open a path as a linked doc given the editor with the document to be linked to."
  [ed obj path ldoc-options]
  (open-path* (partial doc/linked-open ed ldoc-options) obj path))

(declare opener)

(behavior ::existing-path-opens-linked-doc
          :triggers #{:object.instant}
          :type :user
          :exclusive true
          :desc "Doc: Open a linked document when the file is already opened"
          :reaction (fn [this bool]
                      (object/merge! this {:open-linked-doc bool})))

(behavior ::open-standard-editor
          :triggers #{:open!}
          :reaction (fn [obj path]
                      (if-not (files/file? path)
                        (if (files/dir? path)
                          (notifos/set-msg! (str "Cannot open a directory: " path))
                          (notifos/set-msg! (str "No such file: " path)))
                        (let [resolved-path (files/resolve files/cwd path)]
                          (if-let [ed (first (pool/by-path resolved-path))]
                            (if (:open-linked-doc @obj)
                              (open-linked-path ed obj resolved-path {})
                              (tabs/active! ed))
                            (open-path obj resolved-path))))))

(behavior ::track-open-files
          :triggers #{:open}
          :reaction (fn [this ed]
                      (when-let [path (-> @ed :info :path)]
                        (object/update! this [:open-files] conj path))))

(behavior ::untrack-closed
          :triggers #{:destroy}
          :reaction (fn [this]
                      (when-let [path (-> @this :info :path)]
                        (object/update! opener [:open-files] disj (-> @this :info :path)))))

(behavior ::unwatch-closed
          :triggers #{:close.force}
          :reaction (fn [ed]
                      (when-let [path (-> @ed :info :path)]
                        (workspace/unwatch! (-> @ed :info :path)))))

(behavior ::watch-on-open
          :triggers #{:open}
          :reaction (fn [this ed]
                      (when-let [path (-> @ed :info :path)]
                        (workspace/watch! (-> @ed :info :path)))))

(behavior ::watch-open-files
          :triggers #{:watch-paths+}
          :reaction (fn [this cur]
                      (concat cur (:open-files @opener))))

(behavior ::save-on-focus-lost
          :triggers #{:blur}
          :desc "Editor: Save on focus lost"
          :type :user
          :reaction (fn [this]
                      (if (object/has-tag? this :editor)
                        (object/raise this :save)
                        (cmd/exec! :save))))

(behavior ::save-all-on-focus-lost
          :triggers #{:blur}
          :desc "Editor: Save all on focus lost"
          :type :user
          :reaction (fn [this]
                      (cmd/exec! :save-all)))

(behavior ::save-failed
          :triggers #{:files.save.error}
          :reaction (fn [this path e]
                      (popup/popup! {:header (str "Failed to save: " (files/basename path))
                                     :body [:pre (when e (str e))]
                                     :buttons [{:label "cancel"}]})))

(object/object* ::opener
                :tags #{:opener}
                :triggers #{}
                :open-files #{}
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
                      (dialogs/file opener :open!))})

(cmd/command {:command :open-path
              :desc "File: Open path"
              :hidden true
              :exec (fn [path]
                      (object/raise opener :open! path))})

(cmd/command {:command :save
              :desc "File: Save file"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (object/raise ed :save)))})

(cmd/command {:command :save-all
              :desc "File: Save all"
              :exec (fn []
                      (doseq [ed (object/by-tag :editor.file-backed)
                              :when (:dirty @ed)]
                        (object/raise ed :save)))})

(cmd/command {:command :save-as
              :desc "File: Save file as.."
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (object/raise ed :save-as-rename!)))
                      })

(cmd/command {:command :opener.open-info
              :desc "Opener: open info"
              :exec (fn [info]
                      (object/raise opener :open-info! info))})

(cmd/command {:command :opener.open-linked-doc
              :desc "File: Open another view of current file"
              :exec (fn []
                      (let [ed (pool/last-active)]
                        (open-linked-path ed opener (get-in @ed [:info :path]) {})))})


(set! js/window.ondrop  (fn [e]
                          (try
                            (let [size (.-dataTransfer.files.length e)]
                              (loop [i 0]
                                (when (< i size)
                                  (object/raise opener :open! (-> (.-dataTransfer.files e)
                                                                  (aget i)
                                                                  (.-path)))
                                  (recur (inc i)))))
                            (catch :default err
                              (console/error err)))))
