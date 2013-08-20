(ns lt.plugins.emacs
  (:require [lt.object :as object]
            [lt.objs.context :as ctx]
            [lt.util.load :as load]
            [lt.objs.editor.pool :as pool]
            [lt.objs.sidebar.command :as cmd :refer [command]]
            [lt.objs.editor :as editor]
            [lt.objs.settings :as settings]))

(defn make-emacs-editor [ed]
  (editor/set-options ed {:keyMap "emacs"})
  (object/add-tags ed [:editor.keys.emacs]))

(defn make-normal-editor [ed]
  (editor/set-options ed {:keyMap "default"})
  (object/remove-tags ed [:editor.keys.emacs]))

(cmd/command {:command :emacs.keymap-cmd
              :desc "Emacs: map to CodeMirror's emacs keymap"
              :hidden true
              :exec (fn [keys km]
                      (when-let [cmd (-> (aget js/CodeMirror.keyMap (or km "emacs"))
                                         (aget keys))]
                        (if (string? cmd)
                          (.execCommand (editor/->cm-ed (pool/last-active)) cmd)
                          (cmd (editor/->cm-ed (pool/last-active))))))})

(object/behavior* ::activate-emacs
                  :triggers #{:object.instant}
                  :desc "Emacs: Activate Emacs mode"
                  :type :user
                  :exclusive [:lt.plugins.vim/activate-vim]
                  :reaction (fn [this]
                              (when-not js/CodeMirror.keyMap.emacs
                                 (load/js "core/node_modules/codemirror/emacs.js" :sync))
                              (when-not (object/has-tag? this :editor.keys.emacs)
                                (make-emacs-editor this))))
