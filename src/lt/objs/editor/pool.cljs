(ns lt.objs.editor.pool
  "Provide manager for managing a pool of editors and several misc editor commands"
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.document :as doc]
            [lt.objs.keyboard :as kb]
            [lt.objs.files :as files]
            [lt.objs.canvas :as canvas]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.popup :as popup]
            [lt.objs.notifos :as notifos]
            [lt.objs.editor :as editor]
            [lt.util.cljs :refer [->dottedkw]]
            [clojure.string :as string]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [behavior defui]]))

(defn- get-all []
  (object/by-tag :editor))

(behavior ::theme-changed
          :triggers #{:theme-change}
          :reaction (fn [this theme]
                      (doseq [ed (get-all)
                              :let [e (:ed @ed)]]
                        (editor/set-options e {:theme theme}))))

(behavior ::line-numbers-changed
          :triggers #{:line-numbers-change}
          :reaction (fn [this numbers?]
                      (doseq [ed (get-all)
                              :let [e (:ed @ed)]]
                        (editor/set-options e {:lineNumbers numbers?}))))

(behavior ::options-changed
          :triggers #{:options-changed}
          :reaction (fn [this opts]
                      (doseq [ed (get-all)
                              :let [e (:ed @ed)]]
                        (editor/set-options e opts))))

(object/object* ::pool
                :tags #{:editor.pool})

(defn unsaved?
  "Return truthy if any editors are currently dirty/unsaved?"
  []
  (some #(:dirty (deref %)) (object/by-tag :editor)))

(defn by-path
  "Return editor objects that edit given path"
  [path]
  (when path
    (let [path (string/lower-case path)]
      (filter #(= (-> @% :info (get :path) (or "") string/lower-case) path) (object/by-tag :editor)))))

(defn containing-path
  "Return editor objects that edit paths containing given path string"
  [path]
  (let [path (string/lower-case path)]
    (filter #(> (.indexOf (-> @% :info :path (or "") string/lower-case) path) -1) (object/by-tag :editor))))

(defui ^:private button [label & [cb]]
  [:div.button.right label]
  :click (fn []
           (when cb
             (cb))))

(defn- unsaved-prompt [on-yes]
  (popup/popup! {:header "You will lose changes."
                 :body "If you close now, you'll lose any unsaved changes. Are you sure you want to do that?"
                 :buttons [{:label "Discard changes"
                            :action on-yes}
                           popup/cancel-button]}))

(def ^:private pool (object/create ::pool))

(defn last-active
  "Return current editor object (last active in pool)"
  []
  (let [l (:last @pool)]
    (when (and l @l)
      l)))

(defn- focus-last []
  (when-let [ed (last-active)]
    (when-let [ed (:ed @ed)]
      (dom/focus js/document.body)
      (editor/focus ed))))

(behavior ::track-active
          :triggers #{:active}
          :reaction (fn [this]
                      (object/merge! pool {:last this})))

(behavior ::stop-close-dirty
          :triggers #{:close}
          :reaction (fn [this]
                      (when (unsaved?)
                        (app/prevent-close)
                        (unsaved-prompt (partial app/close true)))))

(behavior ::stop-reload-dirty
          :triggers #{:reload}
          :reaction (fn [this]
                      (when (unsaved?)
                        (app/prevent-close)
                        (unsaved-prompt app/refresh))))

(behavior ::ed-close
          :triggers #{:close}
          :reaction (fn [this]
                      (if (:dirty @this)
                        (unsaved-prompt #(object/raise this :close.force))
                        (object/raise this :close.force))))

(behavior ::focus-last-on-focus
          :triggers #{:focus!}
          :reaction (fn [this]
                      (focus-last)))

(defn- reload [ed]
  (editor/set-val-and-keep-cursor ed (:content (files/open-sync (-> @ed :info :path))))
  (doc/update-stats (-> @ed :info :path))
  (object/merge! ed {:dirty false}))

(behavior ::watched.update
          :triggers #{:watched.update}
          :reaction (fn [ws f stat]
                      (when (files/file? f)
                        (when-let [ed (first (by-path f))]
                          (when-not (doc/check-mtime (doc/->stats f) stat)
                            ;; If dirty no need to warn since user is warned on save
                            (when-not (:dirty @ed)
                              (reload ed)))))))

(defn- set-syntax [ed new-syn]
  (let [prev-info (-> @ed :info)]
    (when prev-info
      (object/remove-tags ed (:tags prev-info)))
    (object/update! ed [:info] merge (dissoc new-syn :name))
    (editor/set-mode ed (:mime new-syn))
    (object/add-tags ed (:tags new-syn))))

(defn- set-syntax-by-path [ed path]
  (set-syntax ed (files/path->type path)))

(behavior ::watched.delete
          :triggers #{:watched.delete}
          :reaction (fn [ws del]
                      (let [editors (or (seq (by-path del))
                                        ;; If del is not a file, assume it's a directory
                                        ;; and look for editors under it
                                        (filter #(if-let  [path (-> @% :info :path)]
                                                   (= 0 (.indexOf path (str del files/separator)))
                                                   false)
                                                (object/by-tag :editor)))]
                        (doseq [ed editors]
                          (when-not (:dirty @ed)
                            (object/raise ed :close))))))

(behavior ::watched.rename
          :triggers #{:watched.rename :rename}
          :reaction (fn [this old neue]
                      (if (files/file? old)
                        (when-let [ed (first (by-path old))]
                          (object/update! ed [:info] assoc :path neue :name (files/basename neue))
                          (doc/move-doc old neue)
                          (set-syntax-by-path ed neue)
                          (when-let [ts (:lt.objs.tabs/tabset @ed)]
                            (object/raise ts :tab.updated)))
                        (let [old-folder (str old files/separator)
                              open (filter #(= 0 (.indexOf (-> @% :info (get :path) (or "")) old-folder)) (object/by-tag :editor))]
                          (doseq [ed open
                                  :let [neue-path (string/replace (-> @ed :info :path) old neue)]]
                            (object/update! ed [:info] assoc :path neue-path :name (files/basename neue-path))
                            (doc/move-doc old neue-path)
                            )))))

(defn create
  "Create a :lt.objs.editor/editor object with given info map and add it to current pool"
  [info]
  (let [ed (object/create :lt.objs.editor/editor info)]
    (object/add-tags ed (:tags info []))
    (object/merge! ed {:editor.generation (editor/->generation ed)})
    (object/raise pool :create ed info)
    (object/raise ed :create)
    ed))

(cmd/command {:command :focus-last-editor
              :desc "Editor: Focus last active editor"
              :hidden true
              :exec (fn []
                      (focus-last))})


(def ^:private syntax-selector (cmd/filter-list {:items (fn []
                                                          (sort-by :name (-> @files/files-obj :types vals)))
                                                 :key :name
                                                 :placeholder "Syntax"}))

(behavior ::set-syntax
          :triggers #{:select}
          :reaction (fn [this v]
                      (cmd/exec-active! v)))

(behavior ::init-syntax-selector
          :triggers #{:init}
          :reaction (fn [app]
                      (object/raise syntax-selector :refresh!)))


(object/add-behavior! syntax-selector ::set-syntax)

(cmd/command {:command :set-syntax
              :desc "Editor: Set current editor syntax"
              :options syntax-selector
              :exec (fn [syn]
                      (if-let [last (last-active)]
                        (set-syntax last syn)
                        (notifos/set-msg! "Set syntax requires an active editor")))})

;;****************************************************
;; Editor commands
;;****************************************************

;; See https://github.com/marijnh/CodeMirror/blob/master/addon/comment/comment.js for options
(behavior ::line-comment-options
          :triggers #{:object.instant}
          :type :user
          :desc "Editor: Set options for line commenting"
          :params [{:label "map"
                    :example "{:indent true}"}]
          :reaction (fn [this options]
                      (object/merge! this {::comment-options options})))

(defn- do-commenting [commenting-fn]
  (when-let [cur (last-active)]
    (let [from (editor/->cursor cur "start")
          to (if (editor/selection? cur)
               (editor/->cursor cur "end")
               from)
          options (::comment-options @cur)]
      (commenting-fn cur from to options))))

(cmd/command {:command :comment-selection
              :desc "Editor: Comment line(s)"
              :exec (partial do-commenting editor/line-comment)})

(cmd/command {:command :block-comment-selection
              :desc "Editor: Block Comment line(s)"
              :exec (partial do-commenting editor/block-comment)})


(cmd/command {:command :uncomment-selection
              :desc "Editor: Uncomment line(s)"
              :exec (partial do-commenting editor/uncomment)})

(cmd/command {:command :toggle-comment-selection
              :desc "Editor: Toggle comment line(s)"
              :exec (partial do-commenting editor/toggle-comment)})

(cmd/command {:command :indent-selection
              :desc "Editor: Indent line(s)"
              :exec (fn []
                      (when-let [cur (last-active)]
                        (let [line (-> cur (editor/->cursor "start") :line)]
                          (if (editor/selection? cur)
                            (editor/indent-selection cur "add")
                            (editor/indent-line cur line "add")))))})

(cmd/command {:command :unindent-selection
              :desc "Editor: Unindent line(s)"
              :exec (fn []
                      (when-let [cur (last-active)]
                        (let [line (-> cur (editor/->cursor "start") :line)]
                          (if (editor/selection? cur)
                            (editor/indent-selection cur "subtract")
                            (editor/indent-line cur line "subtract")))))})

(cmd/command {:command :smart-indent-selection
              :desc "Editor: Smart indent line(s)"
              :exec (fn []
                      (when-let [cur (last-active)]
                        (editor/indent-selection cur "smart")))})

(cmd/command {:command :editor.selection.clear
              :desc "Editor: Clear selection"
              :exec (fn []
                      (when-let [cur (last-active)]
                        (editor/move-cursor cur (editor/->cursor cur))))})

(cmd/command {:command :editor.select-all
              :desc "Editor: Select all"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.selectAll (editor/->cm-ed ed))))})

(cmd/command {:command :editor.kill-line
              :desc "Editor: Kill line"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.killLine (editor/->cm-ed ed))))})

(cmd/command {:command :editor.delete-line
              :desc "Editor: Delete line"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.deleteLine (editor/->cm-ed ed))))})

(cmd/command {:command :editor.delete-line-left
              :desc "Editor: Delete line left"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.delLineLeft (editor/->cm-ed ed))))})

(cmd/command {:command :editor.doc-start
              :desc "Editor: Move to first line"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goDocStart (editor/->cm-ed ed))))})

(cmd/command {:command :editor.doc-end
              :desc "Editor: Move to last line"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goDocEnd (editor/->cm-ed ed))))})

(cmd/command {:command :editor.line-start
              :desc "Editor: Move to start of the line"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goLineStart (editor/->cm-ed ed))))})

(cmd/command {:command :editor.line-start-smart
              :desc "Editor: Move to first non-whitespace char in the line"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goLineStartSmart (editor/->cm-ed ed))))})

(cmd/command {:command :editor.line-end
              :desc "Editor: Move to end of the line"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goLineEnd (editor/->cm-ed ed))))})

(cmd/command {:command :editor.line-right
              :desc "Editor: Goto the right of the line"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goLineRight (editor/->cm-ed ed))))})

(cmd/command {:command :editor.line-left
              :desc "Editor: Goto the left of the line"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goLineLeft (editor/->cm-ed ed))))})

(cmd/command {:command :editor.line-up
              :desc "Editor: Previous line"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goLineUp (editor/->cm-ed ed))))})

(cmd/command {:command :editor.line-down
              :desc "Editor: Next line"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goLineDown (editor/->cm-ed ed))))})

(cmd/command {:command :editor.page-up
              :desc "Editor: Page up"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goPageUp (editor/->cm-ed ed))))})

(cmd/command {:command :editor.page-down
              :desc "Editor: Page down"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goPageDown (editor/->cm-ed ed))))})

(cmd/command {:command :editor.char-left
              :desc "Editor: Move left one character"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goCharLeft (editor/->cm-ed ed))))})

(cmd/command {:command :editor.char-right
              :desc "Editor: Move right one character"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goCharRight (editor/->cm-ed ed))))})


(cmd/command {:command :editor.column-left
              :desc "Editor: Move left one column"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goColumnLeft (editor/->cm-ed ed))))})

(cmd/command {:command :editor.column-right
              :desc "Editor: Move right one column"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goColumnRight (editor/->cm-ed ed))))})

(cmd/command {:command :editor.word-left
              :desc "Editor: Move left one word"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goWordLeft (editor/->cm-ed ed))))})

(cmd/command {:command :editor.word-right
              :desc "Editor: Move right one word"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goWordRight (editor/->cm-ed ed))))})

(cmd/command {:command :editor.group-left
              :desc "Editor: Move left one group"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goGroupLeft (editor/->cm-ed ed))))})

(cmd/command {:command :editor.group-right
              :desc "Editor: Move right one group"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.goGroupRight (editor/->cm-ed ed))))})

(cmd/command {:command :editor.delete-char-left
              :desc "Editor: Delete character to the left"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.delCharBefore (editor/->cm-ed ed))))})

(cmd/command {:command :editor.delete-char-right
              :desc "Editor: Delete character to the right"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.delCharAfter (editor/->cm-ed ed))))})

(cmd/command {:command :editor.delete-word-left
              :desc "Editor: Delete word to the left"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.delWordBefore (editor/->cm-ed ed))))})

(cmd/command {:command :editor.delete-word-right
              :desc "Editor: Delete word to the right"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.delWordAfter (editor/->cm-ed ed))))})

(cmd/command {:command :editor.delete-group-left
              :desc "Editor: Delete group to the left"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.delGroupBefore (editor/->cm-ed ed))))})

(cmd/command {:command :editor.delete-group-right
              :desc "Editor: Delete group to the right"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.delGroupAfter (editor/->cm-ed ed))))})

(cmd/command {:command :editor.transpose-chars
              :desc "Editor: Transpose characters"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.transposeChars (editor/->cm-ed ed))))})

(cmd/command {:command :editor.new-line-indent
              :desc "Editor: Newline and indent"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.newlineAndIndent (editor/->cm-ed ed))))})

(cmd/command {:command :editor.toggle-overwrite
              :desc "Editor: Toggle overwrite"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (js/CodeMirror.commands.toggleOverwrite (editor/->cm-ed ed))))})

(cmd/command {:command :editor.cut
              :desc "Editor: Cut"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (editor/cut ed)))})

(cmd/command {:command :editor.copy
              :desc "Editor: Copy"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (editor/copy ed)))})

(cmd/command {:command :editor.paste
              :desc "Editor: Paste"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (editor/paste ed)))})

(cmd/command {:command :editor.select-all
              :desc "Editor: Select all"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (editor/select-all ed)))})

(cmd/command {:command :editor.select-line
              :desc "Editor: Select line"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "selectLine")
                      )})

(cmd/command {:command :editor.force.wrap
              :desc "Editor: Toggle line wrapping in current editor"
              :exec (fn []
                      (when-let [ed (last-active)]
                        (if (editor/option ed "lineWrapping")
                          (do
                            (object/remove-tags ed [:editor.force.wrap])
                            (object/add-tags ed [:editor.force.unwrap])
                            (notifos/set-msg! "Wrapping off" {:timeout 2000}))
                          (do
                            (object/remove-tags ed [:editor.force.unwrap])
                            (object/add-tags ed [:editor.force.wrap])
                            (notifos/set-msg! "Wrapping on" {:timeout 2000})))))})

(cmd/command {:command :editor.undo
              :desc "Editor: Undo"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (editor/undo ed)))})

(cmd/command {:command :editor.redo
              :desc "Editor: Redo"
              :hidden true
              :exec (fn []
                      (when-let [ed (last-active)]
                        (editor/redo ed)))})

(cmd/command {:command :editor.codemirror.command
              :desc "Editor: Execute a CodeMirror command"
              :hidden true
              :exec (fn [cmd & args]
                      (when-let [ed (last-active)]
                        (when-let [command (aget js/CodeMirror.commands cmd)]
                          (when (= js/CodeMirror.Pass
                                   (apply command (editor/->cm-ed ed) args))
                            (kb/passthrough)))))})

(cmd/command {:command :editor.fold-code
              :desc "Editor: Fold code at cursor"
              :exec (fn []
                      (when-let [ed (last-active)]
                        (editor/fold-code ed)))})

;;;sublime commands

(cmd/command {:command :editor.sublime.singleSelectionTop
              :desc "Editor: Set selection to top most cursor"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "singleSelectionTop"))})

(cmd/command {:command :editor.sublime.singleSelectionTop
              :desc "Editor: Clear multiple cursors"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "singleSelectionTop"))})

(cmd/command {:command :editor.sublime.insertLineAfter
              :desc "Editor: Insert line after"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "insertLineAfter"))})

(cmd/command {:command :editor.sublime.insertLineBefore
              :desc "Editor: Insert line before"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "insertLineBefore"))})

(cmd/command {:command :editor.sublime.selectNextOccurrence
              :desc "Editor: Select next occurrence of word"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "selectNextOccurrence"))})

(cmd/command {:command :editor.sublime.selectBetweenBrackets
              :desc "Editor: Select between brackets"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "selectBetweenBrackets"))})

(cmd/command {:command :editor.sublime.selectScope
              :desc "Editor: Select scope"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "selectScope"))})

(cmd/command {:command :editor.sublime.goToBracket
              :desc "Editor: Go to bracket"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "goToBracket"))})

(cmd/command {:command :editor.sublime.swapLineUp
              :desc "Editor: Swap line up"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "swapLineUp"))})

(cmd/command {:command :editor.sublime.swapLineDown
              :desc "Editor: Swap line down"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "swapLineDown"))})

(cmd/command {:command :editor.sublime.joinLines
              :desc "Editor: Join lines"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "joinLines"))})

(cmd/command {:command :editor.sublime.duplicateLine
              :desc "Editor: Duplicate line"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "duplicateLine"))})


(cmd/command {:command :editor.sublime.sortLines
              :desc "Editor: Sort lines"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "sortLines"))})

(cmd/command {:command :editor.sublime.sortLinesInsensitive
              :desc "Editor: Sort lines insensitive"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "sortLinesInsensitive"))})

(cmd/command {:command :editor.sublime.selectLinesUpward
              :desc "Editor: Select lines upward with multiple cursors"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "selectLinesUpward"))})

(cmd/command {:command :editor.sublime.selectLinesDownward
              :desc "Editor: Select lines downward with multiple cursors"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "selectLinesDownward"))})

(cmd/command {:command :editor.sublime.splitSelectionByLine
              :desc "Editor: Split selection into cursors per line"
              :exec (fn []
                      (cmd/exec! :editor.codemirror.command "splitSelectionByLine"))})
