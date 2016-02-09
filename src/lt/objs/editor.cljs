(ns lt.objs.editor
  "Provide fns and behaviors for interfacing with a CodeMirror editor
  object. Also manage defining and loading [CodeMirror](http://codemirror.net/doc/manual.html).

  Editor objects are frequently used as arguments for functions, but often only the internal
  CodeMirror object is actually used. Where the following documentation referers to the editor,
  it is informally referring to the editor's CodeMirror object.

  Commonly encountered argument names:

  * `e` - Editor
  * `v` - Value
  * `m` - Map
  * `cm` - CodeMirror object
  * `opts` - Options
  * `ev` - Event Handler
  * `pos` - Position: depending on the context, either a Javascript object
            (e.g., `{\"line\": 0, \"ch\": 0}`) or cljs map (e.g., `{:line 0 :ch 0}`)."
  (:refer-clojure :exclude [val replace range])
  (:require [crate.core :as crate]
            [lt.objs.context :as ctx-obj]
            [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd]
            [lt.objs.menu :as menu]
            [lt.util.events :as ev]
            [lt.util.dom :as dom]
            [lt.util.load :as load]
            [lt.objs.platform :as platform])
  (:use [lt.util.dom :only [remove-class add-class]]
        [lt.object :only [object* behavior*]])
  (:require-macros [lt.macros :refer [behavior]]))

(defn ->cm-ed
  "Return editor `e`'s CodeMirror object."
  [e]
  (if (satisfies? IDeref e)
    (:ed @e)
    e))

(defn ->elem
  "Return DOM element of editor `e`'s CodeMirror object"
  [e]
  (.-parentElement (.getScrollerElement (->cm-ed e))))

(defn set-val
  "Set content value `v` of editor `e`'s CodeMirror object. Cursor position is lost. Returns `e`."
  [e v]
  (. (->cm-ed e) (setValue (or v "")))
  e)

(defn set-val-and-keep-cursor
  "Same as [[set-val]] but current cursor position is kept."
  [e v]
  (let [cursor (.getCursor (->cm-ed e))]
    (set-val e v)
    (.setCursor (->cm-ed e) cursor)))

(defn set-options
  "Given a map of options, set each pair as an option on editor `e`'s
  CodeMirror object. Returns `e`."
  [e m]
  (doseq [[k v] m]
    (.setOption (->cm-ed e) (name k) v))
  e)

(defn clear-history
  "Clear the history of editor `e`. Returns `e`."
  [e]
  (.clearHistory (->cm-ed e))
  e)

(defn get-history
  "Returns the history of editor `e`."
  [e]
  (.getHistory (->cm-ed e)))

(defn set-history
  "Set the history of editor `e` with provided value `v`."
  [e v]
  (.setHistory (->cm-ed e) v)
  e)


;;*********************************************************
;; commands
;;*********************************************************

(defn- expand-tab [cm]
  (cond
   (.somethingSelected cm) (.indentSelection cm "add")
   (.getOption cm "indentWithTabs") (.replaceSelection cm "\t" "end" "+input")
   :else
   (let [spaces (.join (js/Array (inc (.getOption cm "indentUnit"))) " ")]
     (.replaceSelection cm spaces "end" "+input"))))


;;*********************************************************
;; Creating
;;*********************************************************

(defn- headless
  "Create a headless CodeMirror object using `opts`."
  [opts]
  (-> (js/CodeMirror. (fn []))
      (set-options opts)))

(defn- make [context]
  (let [e (headless {:mode (if (:mime context)
                             (name (:mime context))
                             "plaintext")
                     :autoClearEmptyLines true
                     :dragDrop false
                     :undoDepth 10000
                     :matchBrackets true
                     :singleCursorHeightPerLine false
                     :showCursorWhenSelecting true})]
    (when-let [c (:content context)]
      (set-val e c)
      (clear-history e))
    (when (:doc context)
      (.swapDoc e (-> (:doc context) deref :doc)))
    e))

(defn on
  "Register event handler `ev`, which fires `func`, on editor `ed`'s CodeMirror object."
  [ed ev func]
  (.on (->cm-ed ed) (name ev) func))

(defn off
  "Remove event handler `ev`, which fires `func`, on editor `ed`'s CodeMirror object."
  [ed ev func]
  (.off (->cm-ed ed) (name ev) func))

(defn- wrap-object-events [ed obj]
  (dom/on (->elem ed) :contextmenu #(object/raise obj :menu! %))
  (on ed :dragstart #(.preventDefault %2))
  (on ed :dragenter #(.preventDefault %2))
  (on ed :dragover #(.preventDefault %2))
  (on ed :drop #(.preventDefault %2))
  (on ed :scroll #(object/raise obj :scroll %))
  (on ed :update #(object/raise obj :update % %2))
  (on ed :change #(object/raise obj :change % %2))
  (on ed :inputRead #(object/raise obj :input % %2))
  (on ed :cursorActivity #(object/raise obj :move % %2))
  (on ed :focus #(object/raise obj :focus %))
  (on ed :blur #(object/raise obj :blur %)))

;;*********************************************************
;; Params
;;*********************************************************

(defn ->val
  "Return editor `e`'s buffer content."
  [e]
  (. (->cm-ed e) (getValue)))

(defn ->token
  "Returns token located as `pos` within editor `e`.

  See [getTokenAt](http://codemirror.net/doc/manual.html#getTokenAt)."
  [e pos]
  (js->clj (.getTokenAt (->cm-ed e) (clj->js pos)) :keywordize-keys true))

(defn- ->token-js [e pos]
  (.getTokenAt (->cm-ed e) (clj->js pos)))

(defn ->token-type
  "Return the type of token located at position `pos` for editor `e`.

  See [getTokenTypeAt](http://codemirror.net/doc/manual.html#getTokenTypeAt)."
  [e pos]
  (.getTokenTypeAt (->cm-ed e) (clj->js pos)))

(defn- ->coords
  "Returns cursor's coordinates of the form `{:left :top: bottom}` for editor `e`.

  See [cursorCoords](http://codemirror.net/doc/manual.html#cursorCoords)."
  [e]
  (js->clj (.cursorCoords (->cm-ed e)) :keywordize-keys true :force-obj true))

(defn- +class
  "Add class `klass` to editor `e`. Returns `e`."
  [e klass]
  (add-class (->elem e) (name klass))
  e)

(defn- -class
  "Remove class `klass` from editor `e`. Returns `e`."
  [e klass]
  (remove-class (->elem e) (name klass))
  e)

(defn cursor
  "Return cursor position of editor `e`'s as js object. Returns JSON not edn...
  use [[->cursor]] for edn.

  Example:
  ```
  (cursor e)
  ;;=> {\"line\": 144, \"ch\": 9}
  ```"
  ([e] (cursor e nil))
  ([e side] (.getCursor (->cm-ed e) side)))

(defn ->cursor
  "Same as [[cursor]] but returned as edn."
  [e & [side]]
  (let [pos (cursor e side)]
    {:line (.-line pos)
     :ch (.-ch pos)}))

(defn pos->index
  "Returns integer based on position `pos` from editor's CodeMirror Object.
  Position consists of line and character indexes as JSON, such as:

  ```
  {\"line\": 144, \"ch\": 9}
  ```

  Reverse of [posFromIndex](http://codemirror.net/doc/manual.html#posFromIndex)."
  [e pos]
  (.indexFromPos (->cm-ed e) (clj->js pos)))

(defn mark
  "Marks text in editor `e` within range of `from` and `to`.

  See [markText](http://codemirror.net/doc/manual.html#markText)."
  [e from to opts]
  (.markText (->cm-ed e) (clj->js from) (clj->js to) (clj->js opts)))

(defn find-marks
  "Returns marks found at `pos` in .

  See [findMarksAt](http://codemirror.net/doc/manual.html#findMarksAt)."
  [e pos]
  (.findMarksAt (->cm-ed e) (clj->js pos)))

(defn bookmark
  "Insert bookmark at position `from` for widget `widg`.

  See [setBookmark](http://codemirror.net/doc/manual.html#setBookmark)."
  [e from widg]
  (.setBookmark (->cm-ed e) (clj->js from) (clj->js widg)))

(defn option
  "Return value for option name `o` on editor `e`.

  See [getOption](http://codemirror.net/doc/manual.html#getOption)."
  [e o]
  (.getOption (->cm-ed e) (name o)))

(defn set-mode
  "Set mode option for editor `e`.

  See [getOption](http://codemirror.net/doc/manual.html#getOption)."
  [e m]
  (.setOption (->cm-ed e) "mode" m)
  e)

(defn ->mode
  "Return outer mode object for editor `e`.

  See [getMode](http://codemirror.net/doc/manual.html#getMode)."
  [e]
  (.getMode (->cm-ed e)))

(defn focus
  "Return focus of editor.

  See [focus](http://codemirror.net/doc/manual.html#focus)."
  [e]
  (.focus (->cm-ed e))
  e)

(defn input-field
  "Return input field element of editor.

  See [getInputField](http://codemirror.net/doc/manual.html#getInputField)."
  [e]
  (.getInputField e))

(defn blur
  "Blurs input field `e`. Returns `e`."
  [e]
  (.blur (input-field e))
  e)

(defn refresh
  "Refreshes editor. Returns `e`.

  See [refresh](http://codemirror.net/doc/manual.html#refresh)."
  [e]
  (.refresh (->cm-ed e))
  e)

(defn on-move
  "Add function `func` to trigger when `onCursorActivity` event fires.
  `func` should take two arguments, `ed` and `delta`. Returns `e`.

  See [cursorActivity](http://codemirror.net/doc/manual.html#event_cursorActivity)"
  [e func]
  (.on e "onCursorActivity"
       (fn [ed delta]
         (func ed delta)))
  e)

(defn on-change
  "Add function `func` to trigger when `onChange` event fires.
  `func` should take two arguments, `ed` and `delta`. Returns `e`.

  See [change](http://codemirror.net/doc/manual.html#event_change)"
  [e func]
  (.on e "onChange"
       (fn [ed delta]
         (func ed delta)))
  e)

(defn on-update
  "Add function `func` to trigger when `onUpdate` event fires.
  `func` should take two arguments, `ed` and `delta`. Returns `e`.

  See [update](http://codemirror.net/doc/manual.html#event_update)"
  [e func]
  (.on e "onUpdate"
       (fn [ed delta]
         (func ed delta)))
  e)

(defn on-scroll
  "Add function `func` to trigger when `onScroll` event fires.
  `func` should take two arguments, `ed`. Returns `e`.

  See [scroll](http://codemirror.net/doc/manual.html#event_scroll)"
  [e func]
  (.on e "onScroll"
       (fn [ed]
         (func ed)
         ))
  e)

(defn replace
  "Replace text starting at position `from` for editor with text `v`. If provided, replace will stop at position `to`.

  See [replaceRange](http://codemirror.net/doc/manual.html#replaceRange)."
  ([e from v]
   (.replaceRange (->cm-ed e) v (clj->js from)))
  ([e from to v]
   (.replaceRange (->cm-ed e) v (clj->js from) (clj->js to))))

(defn range
  "Returns text between positions `from` and `to`.

  See [getRange](http://codemirror.net/doc/manual.html#getRange)."
  [e from to]
  (.getRange (->cm-ed e) (clj->js from) (clj->js to)))

(defn line-count
  "Returns the number of lines in the editor.

  See [lineCount](http://codemirror.net/doc/manual.html#lineCount)."
  [e]
  (.lineCount (->cm-ed e)))

(defn insert-at-cursor
  "Insert into editor `ed` text `s` at cursor's position. Returns `ed`."
  [ed s]
  (replace (->cm-ed ed) (->cursor ed) s)
  ed)

(defn move-cursor
  "Moves editor `ed`'s cursor to position `pos`. If `pos` is nil then default position of line 0, ch 0 is used.

  See [setCursor](http://codemirror.net/doc/manual.html#setCursor)."
  [ed pos]
  (.setCursor (->cm-ed ed) (clj->js (or pos {:line 0 :ch 0}))))

(defn scroll-to
  "Scroll editor to pixel position `x`,`y`.

  See [scrollTo](http://codemirror.net/doc/manual.html#scrollTo)."
  [ed x y]
  (.scrollTo (->cm-ed ed) x y))

(defn center-cursor
  "Scrolls editor `ed` to the cursor and places it in the center of screen."
  [ed]
  (let [l (:line (->cursor ed))
        y (.-top (.charCoords (->cm-ed ed) (clj->js {:line l :ch 0}) "local"))
        half-h (/ (.-offsetHeight (.getScrollerElement (->cm-ed ed))) 2)]
    (scroll-to ed nil (- y half-h -55))))

(defn selection?
  "True if text is selected in editor.

  See [somethingSelected](http://codemirror.net/doc/manual.html#somethingSelected)."
  [e]
  (.somethingSelected (->cm-ed e)))

(defn selection-bounds
  "When text is selected, returns position `{:from x :to y}` where `x` and `y` are the cursor's start and end values."
  [e]
  (when (selection? e)
    {:from (->cursor e "start")
     :to (->cursor e "end")}))

(defn selection
  "Returns currently selected text in editor.

  See [getSelection](http://codemirror.net/doc/manual.html#getSelection)."
  [e]
  (.getSelection (->cm-ed e)))

(defn set-selection
  "Sets editor's selection to `start` and `end` positions.

  See [setSelection](http://codemirror.net/doc/manual.html#setSelection)."
  [e start end]
  (.setSelection (->cm-ed e) (clj->js start) (clj->js end)))

(defn set-extending
  "Sets editor's 'extending' flag to `ext?`.

  See [setExtending](http://codemirror.net/doc/manual.html#setExtending)."
  [e ext?]
  (.setExtending (->cm-ed e) ext?))

(defn replace-selection
  "Replace selection with `neue` for editor `e`.

  See [replaceSelection](http://codemirror.net/doc/manual.html#replaceSelection)."
  [e neue & [after]]
  (.replaceSelection (->cm-ed e) neue (name (or after :end)) "+input"))

(defn undo
  "Undo one edit for editor `e`, if any exist.

  See [undo](http://codemirror.net/doc/manual.html#undo)."
  [e]
  (.undo (->cm-ed e)))

(defn redo
  "Redo one edit for editor `e`, if any exist.

  See [redo](http://codemirror.net/doc/manual.html#redo)."
  [e]
  (.redo (->cm-ed e)))

(defn copy
  "Copies currently selected text from editor."
  [e]
  (platform/copy (selection e)))

(defn cut
  "Cut currently selected text from editor."
  [e]
  (copy e)
  (replace-selection e ""))

(defn paste
  "Paste into editor's current cursor position "
  [e]
  (replace-selection e (platform/paste)))

(defn char-coords
  "Returns position and dimension, based off of `pos` for editor `e`, in map consisting of `{:left :right :top :bottom}`.

  See [charChords](http://codemirror.net/doc/manual.html#charCoords)."
  [e pos]
  (js->clj (.charCoords (->cm-ed e) (clj->js pos)) :keywordize-keys true :force-obj true))

(defn operation
  "Returns `e` rather than the return value of your function `func`.

  See [operation](http://codemirror.net/doc/manual.html#operation)."
  [e func]
  (.operation (->cm-ed e) func)
  e)

(defn on-click
  "Add function `func` to trigger when `:mousedown` fires.

  Returns editor `e`."
  [e func]
  (let [elem (->elem e)]
    (ev/capture elem :mousedown func)
    e))

(defn extension
  "Add function `func` named `name` to CodeMirror API.

  See [defineExtension](http://codemirror.net/doc/manual.html#defineExtension)."
  [name func]
  (.defineExtension js/CodeMirror name func))

(defn line-widget
  "Add line widget `elem` (an element), along with any options, at `line` to editor `e`.

  See [addLineWidget](http://codemirror.net/doc/manual.html#addLineWidget)."
  [e line elem & [opts]]
  (.addLineWidget (->cm-ed e) line elem (clj->js opts)))

(defn remove-line-widget
  "Remove widget `widg` from editor `e`. Opposite of `line-widget`."
  [e widg]
  (.removeLineWidget (->cm-ed e) widg))

(defn line
  "Returns the content of line `l` from editor `e`.

  See [getLine](http://codemirror.net/doc/manual.html#getLine)."
  [e l]
  (.getLine (->cm-ed e) l))

(defn first-line
  "Returns the first line of editor `e`.

  See [firstLine](http://codemirror.net/doc/manual.html#firstLine)."
  [e]
  (.firstLine (->cm-ed e)))

(defn last-line
  "Returns the last line of editor `e`.

  See [lastLine](http://codemirror.net/doc/manual.html#lastLine)."
  [e]
  (.lastLine (->cm-ed e)))

(defn line-handle
  "Returns `LineHandle` object from editor `e` for line `l`.

  See [getLineHandle](http://codemirror.net/doc/manual.html#getLineHandle)."
  [e l]
  (.getLineHandle (->cm-ed e) l))

(defn lh->line
  "Given LineHandle object `lh`, returns integer for corresponding line from editor `e`.

  See [getLineNumber](http://codemirror.net/doc/manual.html#getLineNumber)."
  [e lh]
  (.getLineNumber (->cm-ed e) lh))

(defn line-length
  "Returns the length of line `l` from editor `e`."
  [e l]
  (count (line e l)))

(defn select-all
  "Select all lines from editor `e`."
  [e]
  (set-selection e
                 {:line (first-line e) :ch 0}
                 {:line (last-line e)}))

(defn set-line
  "Replace content at line `l` with `text` for editor `e`."
  [e l text]
  (let [length (line-length e l)]
    (replace e
             {:line l :ch 0}
             {:line l :ch length}
             text)))

(defn +line-class
  "Add CSS class name `class` to LineHandle `lh` at element `plane` for editor `e`.

  See [addLineClass](http://codemirror.net/doc/manual.html#addLineClass)."
  [e lh plane class]
  (.addLineClass (->cm-ed e) lh (name plane) (name class)))

(defn -line-class
  "Remove CSS class name `class` from LineHandle `lh` at element `plane` for editor `e`.
  Opposite of `+line-class`.

  See [removeLineClass](http://codemirror.net/doc/manual.html#removeLineClass)."
  [e lh plane class]
  (.removeLineClass (->cm-ed e) lh (name plane) (name class)))

(defn show-hints
  "Display hint `hint-fn` for editor `e` with any provided options.

  See [show-hint.js](http://codemirror.net/addon/hint/show-hint.js)."
  [e hint-fn options]
  (js/CodeMirror.showHint (->cm-ed e) hint-fn (clj->js options))
  e)

(defn inner-mode
  "Sets the innerMode of editor `e`'s CodeMirror object with `state` if provided. Returns the mode."
  ([e] (inner-mode e nil))
  ([e state]
   (let [state (or state (->> (cursor e) (->token-js e) (.-state)))]
     (-> (js/CodeMirror.innerMode (.getMode (->cm-ed e)) state)
         (.-mode)))))

(defn adjust-loc
  "Adjust position `loc` with integer offset `dir` and the key `axis`. Axis should either be `:line` or `:ch`.
  If `axis` is not specified, defaults to `:ch`."
  ([loc dir]
   (adjust-loc loc dir :ch))
  ([loc dir axis]
   (when loc
     (update-in loc [axis] + dir))))

(defn get-char
  "Returns the characters found from integer offest `dir` to the current cursor position.

  See range."
  [ed dir]
  (let [loc (->cursor ed)]
    (if (> dir 0)
      (range ed loc (adjust-loc loc dir))
      (range ed (adjust-loc loc dir) loc))))

(defn indent-line
  "Indents the line `l` based on the `dir` specified for editor `e`.

  See [indent-line](http://codemirror.net/doc/manual.html#indentLine)."
  [e l dir]
  (.indentLine (->cm-ed e) l dir))

(defn indent-lines
  "Indents lines within the range resulting from `from` and `to` based on the `dir` specified
  for editor `e`.

  See [indent-line](http://codemirror.net/doc/manual.html#indentLine)."
  [e from to dir]
  (let [ed (->cm-ed e)
        diff (- (:line to) (:line from))]
    (if (zero? diff)
      (.indentLine ed (:line to) dir)
      (dotimes [x (inc diff)]
        (.indentLine ed (+ (:line from) x))))))

(defn indent-selection
  "Intent current selection in editor `e` by integer offset `dir`."
  [e dir]
  (.indentSelection (->cm-ed e) dir))

(defn line-comment
  "Changes lines within range of `from` and `to` into line comments for editor `e`.

  See [lineComment](http://codemirror.net/doc/manual.html#lineComment)."
  [e from to opts]
  (.lineComment (->cm-ed e) (clj->js from) (clj->js to) (clj->js opts)))

(defn uncomment
  "Attempts to uncomment lines within range of `from` and `to` for editor `e`.

  Returns `true` if comment range was successfully removed.

  See [uncomment](http://codemirror.net/doc/manual.html#uncomment)."
  [e from to opts]
  (.uncomment (->cm-ed e) (clj->js from) (clj->js to) (clj->js opts)))

(defn block-comment
  "Wrap lines within range of `from` and `to` for editor `e`.

  See [blockComment](http://codemirror.net/doc/manual.html#blockComment)."
  [e from to opts]
  (.blockComment (->cm-ed e) (clj->js from) (clj->js to) (clj->js opts)))

(defn toggle-comment
  "Toggle comment and if multiline toggle apply block comment"
  [e from to opts]
  (when-not (uncomment e from to opts)
    (if-not (= (:line from) (:line to))
      (block-comment e from to opts)
      (line-comment e from (->cursor e "end") opts))))

(defn ->generation
  "Returns an integer that can be used to test if edits have occurred.

  See [changeGeneration](http://codemirror.net/doc/manual.html#changeGeneration)."
  [e]
  (.changeGeneration (->cm-ed e)))

(defn dirty?
  "Returns true if document is not clean for generation `gen`. The document is not clean if it has been modified since it was in a clean state.

  See [isClean](http://codemirror.net/doc/manual.html#isClean)."
  [e gen]
  (not (.isClean (->cm-ed e) gen)))

(defn get-doc
  "Returns currently active document for the editor.

  See [getDoc](http://codemirror.net/doc/manual.html#getDoc)."
  [e]
  (.getDoc (->cm-ed e)))

(defn set-doc!
  "Adds document `doc` to editor `e`. If there is already a document associated with the editor then it is replaced. Returns old document.

  See [swapDoc](http://codemirror.net/doc/manual.html#swapDoc)."
  [e doc]
  (object/merge! e {:doc doc})
  (.swapDoc (->cm-ed e) (:doc @doc)))

(defn fold-code
  "Attempts to fold code starting at position `loc`. If position is not provided then folding will be attempted at the cursor position.

  If the code is already folded then an attempt to unfold will occur.

  See [foldcode.js](http://codemirror.net/addon/fold/foldcode.js) addon."
  ([e]
   (fold-code e (->cursor e)))
  ([e loc]
   (.foldCode (->cm-ed e) (clj->js loc))))

(defn- gutter-widths [e]
  (let [gutter-div (dom/$ :div.CodeMirror-gutters (object/->content e))
        gutter-divs (dom/$$ :div.CodeMirror-gutter gutter-div)
        current-widths (reduce (fn [res gutter]
                                 (let [gutter-class (clojure.string/replace-first (dom/attr gutter "class") "CodeMirror-gutter " "")]
                                   (assoc res gutter-class (dom/width gutter)))
                                 ) {} gutter-divs)]
    current-widths))

(defn- update-gutters [e class-names class-widths]
  (let [gutter-div (dom/$ :div.CodeMirror-gutters (object/->content e))]
    (operation e (fn[]
                   (set-options e {:gutters (clj->js class-names)})
                   (doseq [[k v] class-widths]
                     (if-let [gutter (dom/$ (str "div." k) gutter-div)]
                       (dom/set-css gutter {"width" (str v "px")})))))))

(defn add-gutter
  "Add gutter with `class-name` of specified `width` to editor `e`."
  [e class-name width]
  (let [gutter-classes (set (conj (js->clj (option e "gutters")) class-name))
        current-widths (gutter-widths e)
        new-gutter-widths (assoc current-widths class-name width)]
    (update-gutters e gutter-classes new-gutter-widths)))

(defn remove-gutter
  "Remove gutter with `class-name` from editor `e`."
  [e class-name]
  (let [gutter-classes (remove #{class-name} (js->clj (option e "gutters")))
        current-widths (gutter-widths e)]
    (update-gutters e gutter-classes current-widths)))

;;*********************************************************
;; Object
;;*********************************************************

(load/js "core/node_modules/codemirror/lib/codemirror.js" :sync)

(object* ::editor
         :tags #{:editor :editor.inline-result :editor.keys.normal}
         :init (fn [obj info]
                 (let [ed (make info)]
                   (object/merge! obj {:ed ed
                                       :doc (:doc info)
                                       :info (dissoc info :content :doc)})
                   (wrap-object-events ed obj)
                   (->elem ed)
                   )))

;;*********************************************************
;; Behaviors
;;*********************************************************


(behavior ::wrap
          :triggers #{:object.instant :lt.object/tags-removed}
          :desc "Editor: Wrap lines"
          :exclusive [::no-wrap]
          :type :user
          :reaction (fn [obj]
                      (set-options obj {:lineWrapping true})))

(behavior ::no-wrap
          :triggers #{:object.instant :lt.object/tags-removed}
          :desc "Editor: Unwrap lines"
          :exclusive [::wrap]
          :type :user
          :reaction (fn [obj]
                      (set-options obj {:lineWrapping false})))

(behavior ::line-numbers
          :triggers #{:object.instant :lt.object/tags-removed}
          :desc "Editor: Show line numbers"
          :exclusive [::hide-line-numbers]
          :type :user
          :reaction (fn [this]
                      (set-options this {:lineNumbers true})))

(behavior ::hide-line-numbers
          :triggers #{:object.instant :lt.object/tags-removed}
          :desc "Editor: Hide line numbers"
          :exclusive [::line-numbers]
          :type :user
          :reaction (fn [this]
                      (set-options this {:lineNumbers false})))

(behavior ::fold-gutter
          :triggers #{:object.instant :lt.object/tags-removed}
          :desc "Editor: Show fold gutter"
          :exclusive [::hide-fold-gutter]
          :type :user
          :reaction (fn [this]
                      (set-options this {:foldGutter true
                                         :gutters (clj->js ["CodeMirror-foldgutter"])})))

(behavior ::hide-fold-gutter
          :triggers #{:object.instant :lt.object/tags-removed}
          :desc "Editor: Hide fold gutter"
          :exclusive [::fold-gutter]
          :type :user
          :reaction (fn [this]
                      (set-options this {:foldGutter false})))

(behavior ::scroll-past-end
          :triggers #{:object.instant :lt.object/tags-removed}
          :desc "Editor: Allow scrolling past the end of the file"
          :exclusive true
          :type :user
          :reaction (fn [this]
                      (set-options this {:scrollPastEnd true})))

(behavior ::tab-settings
          :triggers #{:object.instant}
          :desc "Editor: indent settings (tab size, etc)"
          :params [{:label "Use tabs?"
                    :type :boolean}
                   {:label "Tab size in spaces"
                    :type :number}
                   {:label "Spaces per indent"
                    :type :number}]
          :type :user
          :exclusive true
          :reaction (fn [obj use-tabs? tab-size indent-unit]
                      (set-options obj {:tabSize tab-size
                                        :indentWithTabs use-tabs?
                                        :indentUnit indent-unit})))

(behavior ::set-codemirror-flags
          :triggers #{:object.instant}
          :type :user
          :desc "Editor: Set CodeMirror flags"
          :params [{:label "Flags map"
                    :ex "{:undoDepth 1000}"}]
          :reaction (fn [this flags]
                      (set-options this flags)))

(behavior ::read-only
          :triggers #{:object.instant}
          :desc "Editor: make editor read-only"
          :exclusive [::not-read-only]
          :reaction (fn [this]
                      (object/update! this [:info :name] str " (read-only)")
                      (set-options this {:readOnly true})))

(behavior ::not-read-only
          :triggers #{:object.instant}
          :desc "Editor: make editor writable"
          :exclusive [::read-only]
          :reaction (fn [this]
                      (set-options this {:readOnly false})))

(behavior ::blink-rate
          :triggers #{:object.instant}
          :desc "Editor: set cursor blink rate"
          :exclusive true
          :type :user
          :reaction (fn [this rate]
                      (if rate
                        (set-options this {:cursorBlinkRate rate})
                        (set-options this {:cursorBlinkRate 0}))))

(behavior ::active-on-focus
          :triggers #{:focus}
          :reaction (fn [obj]
                      (object/add-tags obj [:editor.active])
                      (object/raise obj :active)))

(behavior ::inactive-on-blur
          :triggers #{:blur}
          :reaction (fn [obj]
                      (object/remove-tags obj [:editor.active])
                      (object/raise obj :inactive)))

(behavior ::refresh!
          :triggers #{:refresh!}
          :reaction (fn [this]
                      (refresh this)))

(behavior ::on-tags-added
          :triggers #{:lt.object/tags-added}
          :reaction (fn [this added]
                      (doseq [a added
                              :when a]
                        (ctx-obj/in! a this))))

(behavior ::on-tags-removed
          :triggers #{:lt.object/tags-removed}
          :reaction (fn [this removed]
                      (doseq [r removed
                              :when r]
                        (ctx-obj/out! r this))))

(behavior ::context-on-active
          :triggers #{:active}
          :reaction (fn [obj]
                      ;;TODO: this is probably inefficient due to inactive
                      (ctx-obj/in! (:tags @obj) obj)
                      ))

(behavior ::context-on-inactive
          :triggers #{:inactive}
          :reaction (fn [obj]
                      (let [tags (:tags @obj)
                            cur-editor (ctx-obj/->obj :editor)]
                        ;;blur comes after the focus of a second editor
                        ;;so only go out if I was the editor that is active
                        (ctx-obj/out! tags)
                        (when (and cur-editor
                                   (not= cur-editor obj))
                          (ctx-obj/in! (:tags @cur-editor) cur-editor))
                        (object/raise obj :deactivated))))

(behavior ::refresh-on-show
          :triggers #{:show}
          :reaction (fn [obj]
                      (refresh (:ed @obj))
                      (object/raise obj :focus!)
                      ))

(behavior ::focus
          :triggers #{:focus!}
          :reaction (fn [obj]
                      (focus (:ed @obj))))

(behavior ::destroy-on-close
          :triggers #{:close.force}
          :reaction (fn [obj]
                      (object/raise obj :closed)
                      (object/destroy! obj)))

(behavior ::highlight-current-line
          :triggers #{:object.instant}
          :type :user
          :desc "Editor: Highlight the current line"
          :exclusive true
          :reaction (fn [this]
                      (set-options this {:styleActiveLine true})))

(behavior ::on-change
          :debounce 300
          :triggers #{:change}
          :type :user
          :desc "Editor: On change execute command"
          :params [{:label "command"}]
          :reaction (fn [this cmd & args]
                      (apply cmd/exec! cmd args)))

(behavior ::menu!
          :triggers #{:menu!}
          :reaction (fn [this e]
                      (let [items (sort-by :order (object/raise-reduce this :menu+ []))]
                        (-> (menu/menu items)
                            (menu/show-menu)))
                      (dom/prevent e)
                      (dom/stop-propagation e)
                      ))

(behavior ::copy-paste-menu+
          :triggers #{:menu+}
          :reaction (fn [this items]
                      (conj items
                            {:label "Copy"
                             :order 1
                             :enabled (boolean (selection? this))
                             :click (fn []
                                      (copy this))}
                            {:label "Cut"
                             :order 2
                             :enabled (boolean (selection? this))
                             :click (fn []
                                      (cut this))}
                            {:label "Paste"
                             :order 3
                             :enabled (boolean (not (empty? (platform/paste))))
                             :click (fn []
                                      (paste this))}
                            {:type "separator"
                             :order 4}
                            {:label "Select all"
                             :order 5
                             :click (fn []
                                      (select-all this))})))

(def mode-blacklist "Modes to not load on startup"
  #{"clojure" "css" "htmlembedded" "htmlmixed" "javascript" "python"})

(behavior ::init-codemirror
          :triggers #{:init}
          :reaction (fn [this]
                      (load/js "core/node_modules/codemirror/addon/edit/matchbrackets.js" :sync)
                      (load/js "core/node_modules/codemirror/addon/edit/closebrackets.js" :sync)
                      (load/js "core/node_modules/codemirror/addon/comment/comment.js" :sync)
                      (load/js "core/node_modules/codemirror/addon/selection/active-line.js" :sync)
                      ;; TODO: use addon/mode/overlay.js
                      (load/js "core/node_modules/codemirror_addons/overlay.js" :sync)
                      (load/js "core/node_modules/codemirror/addon/scroll/scrollpastend.js" :sync)
                      (doseq [file (files/ls (files/lt-home "core/node_modules/codemirror/addon/fold"))
                              :when (= (files/ext file) "js")]
                        (load/js (str "core/node_modules/codemirror/addon/fold/" file) :sync))
                      (load/css "node_modules/codemirror/addon/fold/foldgutter.css")
                      (load/js "core/node_modules/codemirror/keymap/sublime.js" :sync)

                      ;; Provides defineSimpleMode for some modes
                      (load/js "core/node_modules/codemirror/addon/mode/simple.js" :sync)
                      (doseq [path (files/filter-walk #(and (= (files/ext %) "js")
                                                            (not (some (fn [m] (> (.indexOf % (str "core/node_modules/codemirror/mode/" m "/")) -1))
                                                                       mode-blacklist))
                                                            ;; Remove test files
                                                            (not (.endsWith % "test.js")))
                                                      (files/lt-home "core/node_modules/codemirror/mode"))]
                        (load/js path :sync))
                      (aset js/CodeMirror.keyMap.basic "Tab" expand-tab)))

(behavior ::load-addon
          :triggers #{:object.instant-load}
          :desc "App: Load CodeMirror addon path(s)"
          :params [{:label "path(s)"
                    :example "edit/matchtags.js"}]
          :type :user
          :reaction (fn [this path]
                      (let [paths (map #(files/join (files/lt-home)
                                                    "core/node_modules/codemirror/addon" %)
                                       (if (coll? path) path [path]))]
                        (object/call-behavior-reaction :lt.objs.plugins/load-js
                                                       this
                                                       (filter #(= (files/ext %) "js") paths))
                        (object/call-behavior-reaction :lt.objs.plugins/load-css
                                                       this
                                                       (filter #(= (files/ext %) "css") paths)))))

(behavior ::set-rulers
          :triggers #{:object.instant}
          :type :user
          :desc "Editor: Set CodeMirror rulers"
          :params [{:label "Vector of rulers"
                    :example "[{:color \"#cfc\" :column 100 :lineStyle \"dashed\"}]"}]
          :reaction (fn [this rulers]
                      (when-not (.getOption (->cm-ed this) "rulers")
                        (load/js "core/node_modules/codemirror/addon/display/rulers.js" :sync))
                      (let [rulers (or rulers [{:lineStyle "dashed" :color "#aff" :column 80}])]
                        (set-options this {:rulers (clj->js rulers)}))))

(behavior ::autoclose-brackets
          :triggers #{:object.instant}
          :desc "Editor: Enable autoclose brackets"
          :type :user
          :params [{:label "map"
                    :example "{:pairs \"()[]{}''\\\"\\\"\" :explode \"[]{}\"}"}]
          :reaction (fn [this opts]
                      (if opts
                        (set-options this {:autoCloseBrackets (clj->js opts)})
                        (set-options this {:autoCloseBrackets true}))))
