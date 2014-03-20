(ns lt.objs.jump-stack
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd]
            [lt.objs.notifos :as notifos])
  (:use [lt.object :only [object* behavior*]])
  (:require-macros [lt.macros :refer [behavior]]))

(defn jump-to [file pos]
  (cmd/exec! :open-path file)
  (let [cur (pool/last-active)]
    (editor/move-cursor cur pos)
    (editor/center-cursor cur)))

(behavior ::jump-stack.push
           :triggers #{:jump-stack.push!}
           :reaction (fn [jump-stack editor file pos]
                       (let [old-file (:path (:info @editor))
                             old-pos (editor/->cursor (lt.objs.editor.pool/last-active))]
                         (if-not (files/exists? file)
                           (notifos/set-msg! (str "Could not find file: " file) {:class "error"})
                           (do (jump-to file pos)
                             (object/update! jump-stack [:stack] conj [old-file old-pos]))))))

(behavior ::jump-stack.pop
           :triggers #{:jump-stack.pop!}
           :reaction (fn [jump-stack file pos]
                       (let [stack (:stack @jump-stack)]
                         (if (empty? stack)
                           (notifos/set-msg! "Nowhere left to jump" {:class "error"})
                           (let [[file pos] (last stack)]
                             (if-not (files/exists? file)
                               (notifos/set-msg! (str "Could not find file: " file) {:class "error"})
                               (do (jump-to file pos)
                                 (object/update! jump-stack [:stack] pop))))))))


(def jump-stack (object/create (object/object* ::jump-stack
                                               :tags [:jump-stack]
                                               :stack [])))

(cmd/command
 {:command :editor.jump-to-definition-at-cursor
  :desc "Editor: Jump to definition at cursor"
  :exec (fn []
          (when-let [ed (lt.objs.editor.pool/last-active)]
            (object/raise ed :editor.jump-to-definition-at-cursor!)))})

(cmd/command
 {:command :editor.unjump
  :desc "Editor: Jump back to where you jumped from"
  :exec (fn []
          (object/raise jump-stack :jump-stack.pop!))})

(cmd/command
 {:command :editor.jump-to
  :desc "Editor: Jump to file/pos"
  :hidden true
  :exec (fn [file pos]
          (jump-to file pos))})
