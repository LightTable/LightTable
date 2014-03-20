(ns lt.objs.editor
  (:refer-clojure :exclude [val replace range])
  (:require [crate.core :as crate]
            [lt.objs.context :as ctx-obj]
            [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd]
            [lt.objs.menu :as menu]
            [lt.util.events :as ev]
            [lt.util.dom :as dom]
            [lt.util.load :as load])
  (:use [lt.util.dom :only [remove-class add-class]]
        [lt.object :only [object* behavior*]]
        [lt.util.cljs :only [js->clj]])
  (:require-macros [lt.macros :refer [behavior]]))

(def gui (js/require "nw.gui"))
(def clipboard (.Clipboard.get gui))

;;*********************************************************
;; commands
;;*********************************************************

(defn expand-tab [cm]
  (cond
   (.somethingSelected cm) (.indentSelection cm "add")
   (.getOption cm "indentWithTabs") (.replaceSelection cm "\t" "end" "+input")
   :else
   (let [spaces (.join (js/Array (inc (.getOption cm "indentUnit"))) " ")]
     (.replaceSelection cm spaces "end" "+input"))))


;;*********************************************************
;; Creating
;;*********************************************************

(defn headless [opts]
  (-> (js/CodeMirror. (fn []))
      (set-options opts)))

(defn make [context]
  (let [e (headless {:mode (if (:mime context)
                             (name (:mime context))
                             "plaintext")
                     :autoClearEmptyLines true
                     :dragDrop false
                     :onDragEvent (fn [] true)
                     :undoDepth 10000
                     :matchBrackets true
                     :showCursorWhenSelecting true})]
    (when-let [c (:content context)]
      (set-val e c)
      (clear-history e))
    (when (:doc context)
      (.swapDoc e (-> (:doc context) deref :doc)))
    e))

(defn ->cm-ed [e]
  (if (satisfies? IDeref e)
    (:ed @e)
    e))

(defn on [ed ev func]
  (.on (->cm-ed ed) (name ev) func))

(defn off [ed ev func]
  (.off (->cm-ed ed) (name ev) func))

(defn wrap-object-events [ed obj]
  (dom/on (->elem ed) :contextmenu #(object/raise obj :menu! %))
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

(defn ->val [e]
  (. (->cm-ed e) (getValue)))

(defn ->token [e pos]
  (js->clj (.getTokenAt (->cm-ed e) (clj->js pos)) :keywordize-keys true))

(defn ->token-js [e pos]
  (.getTokenAt (->cm-ed e) (clj->js pos)))

(defn ->token-type [e pos]
  (.getTokenTypeAt (->cm-ed e) (clj->js pos)))

(defn ->coords [e]
  (js->clj (.cursorCoords (->cm-ed e)) :keywordize-keys true :force-obj true))

(defn ->elem [e]
  (.-parentElement (.getScrollerElement (->cm-ed e))))

(defn +class [e klass]
  (add-class (->elem e) (name klass))
  e)

(defn -class [e klass]
  (remove-class (->elem e) (name klass))
  e)

(defn cursor [e side]
  (.getCursor (->cm-ed e) side))

(defn ->cursor [e & [side]]
  (let [pos (cursor e side)]
    {:line (.-line pos)
     :ch (.-ch pos)}))

(defn pos->index [e pos]
  (.indexFromPos (->cm-ed e) (clj->js pos)))

(defn set-val [e v]
  (. (->cm-ed e) (setValue (or v "")))
  e)

(defn mark [e from to opts]
  (.markText (->cm-ed e) (clj->js from) (clj->js to) (clj->js opts)))

(defn find-marks [e pos]
  (.findMarksAt (->cm-ed e) (clj->js pos)))

(defn bookmark [e from widg]
  (.setBookmark (->cm-ed e) (clj->js from) (clj->js widg)))

(defn option [e o]
  (.getOption (->cm-ed e) (name o)))

(defn set-options [e m]
  (doseq [[k v] m]
    (.setOption (->cm-ed e) (name k) v))
  e)

(defn set-mode [e m]
  (.setOption (->cm-ed e) "mode" m)
  e)

(defn ->mode [e]
  (.getMode (->cm-ed e)))

(defn focus [e]
  (.focus (->cm-ed e))
  e)

(defn input-field [e]
  (.getInputField e))

(defn blur [e]
  (.blur (input-field e))
  e)

(defn refresh [e]
  (.refresh (->cm-ed e))
  e)

(defn on-move [e func]
  (.on e "onCursorActivity"
       (fn [ed delta]
         (func ed delta)))
  e)

(defn on-change [e func]
  (.on e "onChange"
       (fn [ed delta]
         (func ed delta)))
  e)

(defn on-update [e func]
  (.on e "onUpdate"
       (fn [ed delta]
         (func ed delta)))
  e)

(defn on-scroll [e func]
  (.on e "onScroll"
       (fn [ed]
         (func ed)
         ))
  e)

(defn replace
  ([e from v]
   (.replaceRange (->cm-ed e) v (clj->js from)))
  ([e from to v]
   (.replaceRange (->cm-ed e) v (clj->js from) (clj->js to))))

(defn range [e from to]
  (.getRange (->cm-ed e) (clj->js from) (clj->js to)))

(defn line-count [e]
  (.lineCount e))

(defn insert-at-cursor [ed s]
  (replace (->cm-ed ed) (->cursor ed) s)
  ed)

(defn move-cursor [ed pos]
  (.setCursor (->cm-ed ed) (clj->js pos)))

(defn scroll-to [ed x y]
  (.scrollTo (->cm-ed ed) x y))

(defn center-cursor [ed]
  (let [l (:line (->cursor ed))
        y (.-top (.charCoords (->cm-ed ed) (clj->js {:line l :ch 0}) "local"))
        half-h (/ (.-offsetHeight (.getScrollerElement (->cm-ed ed))) 2)]
    (scroll-to ed nil (- y half-h -55))))

(defn selection-bounds [e]
  (when (selection? e)
    {:from (->cursor e"start")
     :to (->cursor e "end")}))

(defn selection [e]
  (.getSelection (->cm-ed e)))

(defn selection? [e]
  (.somethingSelected (->cm-ed e)))

(defn set-selection [e start end]
  (.setSelection (->cm-ed e) (clj->js start) (clj->js end)))

(defn set-extending [e ext?]
  (.setExtending (->cm-ed e) ext?))

(defn replace-selection [e neue]
  (.replaceSelection (->cm-ed e) neue "end" "+input"))

(defn undo [e]
  (.undo (->cm-ed e)))

(defn redo [e]
  (.redo (->cm-ed e)))

(defn copy [e]
  (.set clipboard (selection e) "text"))

(defn cut [e]
  (copy e)
  (replace-selection e ""))

(defn paste [e]
  (replace-selection e (.get clipboard "text")))

(defn select-all [e]
  (set-selection e
                 {:line (first-line e) :ch 0}
                 {:line (last-line e)}))

(defn clear-history [e]
  (.clearHistory (->cm-ed e))
  e)

(defn get-history [e]
  (.getHistory (->cm-ed e)))

(defn set-history [e v]
  (.setHistory (->cm-ed e) v)
  e)

(defn char-coords [e pos]
  (js->clj (.charCoords (->cm-ed e) (clj->js pos)) :keywordize-keys true :force-obj true))

(defn operation [e func]
  (.operation (->cm-ed e) func)
  e)

(defn on-click [e func]
  (let [elem (->elem e)]
    (ev/capture elem :mousedown func)
    e))

(defn extension [name func]
  (.defineExtension js/CodeMirror name func))

(defn line-widget [e line elem & [opts]]
  (.addLineWidget (->cm-ed e) line elem (clj->js opts)))

(defn remove-line-widget [e widg]
  (.removeLineWidget (->cm-ed e) widg))

(defn line [e l]
  (.getLine (->cm-ed e) l))

(defn set-line [e l text]
  (.setLine (->cm-ed e) l text))

(defn first-line [e]
  (.firstLine (->cm-ed e)))

(defn last-line [e]
  (.lastLine (->cm-ed e)))

(defn line-handle [e l]
  (.getLineHandle (->cm-ed e) l))

(defn lh->line [e lh]
  (.getLineNumber (->cm-ed e) lh))

(defn line-length [e l]
  (count (line e l)))

(defn +line-class [e lh plane class]
  (.addLineClass e lh (name plane) (name class)))

(defn -line-class [e lh plane class]
  (.removeLineClass e lh (name plane) (name class)))

(defn show-hints [e hint-fn options]
  (js/CodeMirror.showHint (->cm-ed e) hint-fn (clj->js options))
  e)

(defn inner-mode [e state]
  (let [state (or state (->> (cursor e) (->token-js e) (.-state)))]
    (-> (js/CodeMirror.innerMode (.getMode (->cm-ed e)) state)
        (.-mode))))

(defn adjust-loc
  ([loc dir]
   (adjust-loc loc dir :ch))
  ([loc dir axis]
   (when loc
     (update-in loc [axis] + dir))))

(defn get-char [ed dir]
  (let [loc (->cursor ed)]
    (if (> dir 0)
      (range ed loc (adjust-loc loc dir))
      (range ed (adjust-loc loc dir) loc))))

(defn indent-line [e l dir]
  (.indentLine (->cm-ed e) l dir))

(defn indent-lines [e from to dir]
  (let [ed (->cm-ed e)
        diff (- (:line to) (:line from))]
    (if (zero? diff)
      (.indentLine ed (:line to) dir)
      (dotimes [x (inc diff)]
        (.indentLine ed (+ (:line from) x))))))

(defn indent-selection [e dir]
  (.indentSelection (->cm-ed e) dir))

(defn line-comment [e from to opts]
  (.lineComment (->cm-ed e) (clj->js from) (clj->js to) (clj->js opts)))

(defn uncomment [e from to opts]
  (.uncomment (->cm-ed e) (clj->js from) (clj->js to) (clj->js opts)))

(defn ->generation [e]
  (.changeGeneration (->cm-ed e)))

(defn dirty? [e gen]
  (not (.isClean (->cm-ed e) gen)))

(defn get-doc [e]
  (.getDoc (->cm-ed e)))

(defn set-doc! [e doc]
  (object/merge! e {:doc doc})
  (.swapDoc (->cm-ed e) (:doc @doc)))

(defn fold-code [e]
  (.foldCode (->cm-ed e) (cursor e)))

;;*********************************************************
;; Object
;;*********************************************************

(load/js "core/node_modules/codemirror/codemirror.js" :sync)

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


(behavior ::read-only
          :triggers #{:init}
          :reaction (fn [obj]
                      (set-options (:ed @obj) {:readOnly "nocursor"})))

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
                            (menu/show-menu (.-clientX e) (.-clientY e))))
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
                             :enabled (boolean (not (empty? (.get clipboard "text"))))
                             :click (fn []
                                      (paste this))}
                            {:type "separator"
                             :order 4}
                            {:label "Select all"
                             :order 5
                             :click (fn []
                                      (select-all this))})))

(behavior ::init-codemirror
          :triggers #{:init}
          :reaction (fn [this]
                      (load/js "core/node_modules/codemirror/matchbracket.js" :sync)
                      (load/js "core/node_modules/codemirror/comment.js" :sync)
                      (load/js "core/node_modules/codemirror/active-line.js" :sync)
                      (load/js "core/node_modules/codemirror/overlay.js" :sync)
                      (load/js "core/node_modules/codemirror/scrollpastend.js" :sync)
                      (load/js "core/node_modules/codemirror/fold.js" :sync)
                      (doseq [mode (files/ls "core/node_modules/codemirror/modes")
                              :when (= (files/ext mode) "js")]
                        (load/js (str "core/node_modules/codemirror/modes/" mode) :sync))
                      (aset js/CodeMirror.keyMap.basic "Tab" expand-tab)))
