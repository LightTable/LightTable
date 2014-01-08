(ns lt.objs.editor.file
  (:require [lt.object :as object]
            [lt.objs.editor :as ed]
            [lt.objs.document :as doc]
            [lt.objs.notifos :as notifos]
            [lt.objs.command :as cmd]
            [clojure.string :as string]
            [lt.objs.files :as files])
  (:require-macros [lt.macros :refer [behavior]]))

(behavior ::file-save
          :triggers #{:save}
          :reaction (fn [editor]
                      (let [{:keys [path]} (@editor :info)
                            final (object/raise-reduce editor :save+ (ed/->val editor))]
                        (doc/save path final
                                  (fn []
                                    (object/merge! editor {:dirty false
                                                           :editor.generation (ed/->generation editor)})
                                    (object/raise editor :saved)
                                    (object/raise editor :clean)
                                    ;;TODO: saved
                                    )))))

(behavior ::dirty-on-change
          :throttle 100
          :triggers #{:change}
          :reaction (fn [obj]
                      (let [dirty? (ed/dirty? obj (:editor.generation @obj 0))]
                        (when (not= (:dirty @obj) dirty?)
                          (if dirty?
                            (do
                              (object/merge! obj {:dirty true})
                              (object/raise obj :dirty))
                            (do
                              (object/merge! obj {:dirty false})
                              (object/raise obj :clean)))))))

(behavior ::preserve-line-endings
          :triggers #{:save+}
          :reaction (fn [editor content]
                      (if (= "\r\n" (or (-> @editor :info :line-ending) files/line-ending))
                        (string/replace content "(\r\n|\n)" "\r\n")
                        content)))


(behavior ::remove-trailing-whitespace
          :triggers #{:save+}
          :type :user
          :desc "Save: Remove trailing whitespace"
          :exclusive true
          :reaction (fn [editor content]
                      (.replace content (js/RegExp. "[ \\t]+$" "gm") "")))

(behavior ::last-char-newline
          :desc "Save: Ensure the file ends with a new-line"
          :type :user
          :exclusive true
          :triggers #{:save+}
          :reaction (fn [editor content]
                      (let [line-ending (-> @editor :info :line-ending)]
                        (if (= (last content) "\n")
                          content
                          (str content line-ending)))))

(behavior ::on-save
          :triggers #{:save}
          :type :user
          :desc "Editor: On save execute command"
          :params [{:label "command"}]
          :reaction (fn [this cmd & args]
                      (apply cmd/exec! cmd args)))
