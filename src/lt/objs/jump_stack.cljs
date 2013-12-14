(ns lt.objs.jump-stack
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd]
            [lt.objs.notifos :as notifos])
  (:use [lt.object :only [object* behavior*]]))

(defn jump-to [file line]
  (cmd/exec! :open-path file)
  (cmd/exec! :goto-line line)
  (cmd/exec! :editor.select-line line))

(behavior* ::jump-stack.push
           :triggers #{:jump-stack.push!}
           :reaction (fn [jump-stack editor file line]
                       (let [old-file (:path (:info @editor))
                             old-line (:line (editor/->cursor (lt.objs.editor.pool/last-active)))] ;; TODO for some reason this is off by one...
                         (if-not (files/exists? file)
                           (notifos/set-msg! (str "Could not find file: " file) {:class "error"})
                           (do (jump-to file line)
                             (object/update! jump-stack [:stack] conj [old-file old-line]))))))

(behavior* ::jump-stack.pop
           :triggers #{:jump-stack.pop!}
           :reaction (fn [jump-stack file line]
                       (let [stack (:stack @jump-stack)]
                         (if (empty? stack)
                           (notifos/set-msg! "Nowhere left to jump" {:class "error"})
                           (let [[file line] (last stack)]
                             (if-not (files/exists? file)
                               (notifos/set-msg! (str "Could not find file: " file) {:class "error"})
                               (do (jump-to file line)
                                 (object/update! jump-stack [:stack] pop))))))))


(def jump-stack (object/create (object/object* ::jump-stack
                                               :tags [:jump-stack]
                                               :behaviors [::jump-stack.push ::jump-stack.pop]
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