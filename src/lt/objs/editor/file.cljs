(ns lt.objs.editor.file
  (:require [lt.object :as object]
            [lt.objs.editor :as ed]
            [lt.objs.settings :as settings]
            [lt.objs.notifos :as notifos]
            [lt.objs.command :as cmd]
            [clojure.string :as string]
            [lt.objs.files :as files]
            [lt.objs.file-manager :as file-man]))

(object/behavior* ::file-save
                  :triggers #{:save}
                  :reaction (fn [editor]
                              (let [{:keys [path]} (@editor :info)
                                    final (object/raise-reduce editor :save+ (ed/->val editor))]
                                (file-man/save path final
                                               (fn []
                                                 (object/merge! editor {:dirty false})
                                                 (object/raise editor :saved)
                                                 (object/raise editor :clean)
                                                 ;;TODO: saved
                                                 )))))

(object/behavior* ::dirty-on-change
                  :throttle 100
                  :triggers #{:change}
                  :reaction (fn [obj]
                              (when-not (:dirty @obj)
                                (object/merge! obj {:dirty true})
                                (object/raise obj :dirty)
                                )))

(object/behavior* ::preserve-line-endings
                  :triggers #{:save+}
                  :reaction (fn [editor content]
                              (if (= "\r\n" (or (-> @editor :info :line-ending) files/line-ending))
                                (string/replace content "\n" "\r\n")
                                content)))


(object/behavior* ::remove-trailing-whitespace
                  :triggers #{:save+}
                  :reaction (fn [editor content]
                              (if-not (settings/fetch :leave-trailing-whitespace)
                                (.replace content (js/RegExp. "[ \\t]+$" "gm") "")
                                content)))

(object/behavior* ::last-char-newline
                  :desc "Ensure the file ends with an appropriate new-line character"
                  :type :user
                  :triggers #{:save+}
                  :reaction (fn [editor content]
                              (let [line-ending (-> @editor :info :line-ending)]
                                (if (= (last content) line-ending)
                                  content
                                  (str content line-ending)))))

(cmd/command {:command :toggle-trailing-whitespace
              :desc "Settings: Toggle remove trailing whitespace"
              :exec (fn []
                      (if-not (settings/fetch :leave-trailing-whitespace)
                        (do
                          (settings/store! :leave-trailing-whitespace true)
                          (notifos/set-msg! "No longer removing trailing whitespace"))
                        (do
                          (settings/store! :leave-trailing-whitespace false)
                          (notifos/set-msg! "Removing trailing whitespace on save"))))})

(object/tag-behaviors :editor.transient [::dirty-on-change])
(object/tag-behaviors :editor.file-backed [::dirty-on-change ::file-save ::remove-trailing-whitespace ::preserve-line-endings])