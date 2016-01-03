(ns lt.objs.editor
  "Provide fns and behaviors for interfacing with a CodeMirror editor
  object. Also manage defining and loading CodeMirror. For more about CodeMirror
  objects see http://codemirror.org/doc/manual.html#CodeMirror"
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
  "Return editor's CodeMirror object"
  [e]
  (if (satisfies? IDeref e)
    (:ed @e)
    e))

(defn ->elem
  "Return DOM element of editor's CodeMirror object"
  [e]
  (.-parentElement (.getScrollerElement (->cm-ed e))))

(defn set-val [e v]
  (. (->cm-ed e) (setValue (or v "")))
  e)

(defn set-options
  "Given a map of options, set each pair as an option on editor's
  CodeMirror object"
  [e m]
  (doseq [[k v] m]
    (.setOption (->cm-ed e) (name k) v))
  e)

(defn clear-history [e]
  (.clearHistory (->cm-ed e))
  e)

(defn get-history [e]
  (.getHistory (->cm-ed e)))

(defn set-history [e v]
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

(defn- headless [opts]
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
  "Register event handler on editor's CodeMirror object"
  [ed ev func]
  (.on (->cm-ed ed) (name ev) func))

(defn off
  "Remove event handler on editor's CodeMirror object"
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
  "Return editor's CodeMirror object buffer contents"
  [e]
  (. (->cm-ed e) (getValue)))

(defn ->token [e pos]
  (js->clj (.getTokenAt (->cm-ed e) (clj->js pos)) :keywordize-keys true))

(defn- ->token-js [e pos]
  (.getTokenAt (->cm-ed e) (clj->js pos)))

(defn ->token-type [e pos]
  (.getTokenTypeAt (->cm-ed e) (clj->js pos)))

(defn- ->coords [e]
  (js->clj (.cursorCoords (->cm-ed e)) :keywordize-keys true :force-obj true))

(defn- +class [e klass]
  (add-class (->elem e) (name klass))
  e)

(defn- -class [e klass]
  (remove-class (->elem e) (name klass))
  e)

(defn cursor
  "Return cursor of editor's CodeMirror object as js object.
   Example: #js {:line 144, :ch 9}"
  ([e] (cursor e nil))
  ([e side] (.getCursor (->cm-ed e) side)))

(defn ->cursor
  "Same as cursor but returned as cljs map"
  [e & [side]]
  (let [pos (cursor e side)]
    {:line (.-line pos)
     :ch (.-ch pos)}))

(defn pos->index [e pos]
  (.indexFromPos (->cm-ed e) (clj->js pos)))

(defn mark [e from to opts]
  (.markText (->cm-ed e) (clj->js from) (clj->js to) (clj->js opts)))

(defn find-marks [e pos]
  (.findMarksAt (->cm-ed e) (clj->js pos)))

(defn bookmark [e from widg]
  (.setBookmark (->cm-ed e) (clj->js from) (clj->js widg)))

(defn option
  "Return value for option name on editor's CodeMirror object"
  [e o]
  (.getOption (->cm-ed e) (name o)))

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
  (.lineCount (->cm-ed e)))

(defn insert-at-cursor [ed s]
  (replace (->cm-ed ed) (->cursor ed) s)
  ed)

(defn move-cursor [ed pos]
  (.setCursor (->cm-ed ed) (clj->js (or pos {:line 0 :ch 0}))))

(defn scroll-to [ed x y]
  (.scrollTo (->cm-ed ed) x y))

(defn center-cursor [ed]
  (let [l (:line (->cursor ed))
        y (.-top (.charCoords (->cm-ed ed) (clj->js {:line l :ch 0}) "local"))
        half-h (/ (.-offsetHeight (.getScrollerElement (->cm-ed ed))) 2)]
    (scroll-to ed nil (- y half-h -55))))

(defn selection? [e]
  (.somethingSelected (->cm-ed e)))

(defn selection-bounds [e]
  (when (selection? e)
    {:from (->cursor e"start")
     :to (->cursor e "end")}))

(defn selection [e]
  (.getSelection (->cm-ed e)))

(defn set-selection [e start end]
  (.setSelection (->cm-ed e) (clj->js start) (clj->js end)))

(defn set-extending [e ext?]
  (.setExtending (->cm-ed e) ext?))

(defn replace-selection [e neue & [after]]
  (.replaceSelection (->cm-ed e) neue (name (or after :end)) "+input"))

(defn undo [e]
  (.undo (->cm-ed e)))

(defn redo [e]
  (.redo (->cm-ed e)))

(defn copy [e]
  (platform/copy (selection e)))

(defn cut [e]
  (copy e)
  (replace-selection e ""))

(defn paste [e]
  (replace-selection e (platform/paste)))

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

(defn select-all [e]
  (set-selection e
                 {:line (first-line e) :ch 0}
                 {:line (last-line e)}))

(defn set-line [e l text]
  (let [length (line-length e l)]
    (replace e
             {:line l :ch 0}
             {:line l :ch length}
             text)))

(defn +line-class [e lh plane class]
  (.addLineClass (->cm-ed e) lh (name plane) (name class)))

(defn -line-class [e lh plane class]
  (.removeLineClass (->cm-ed e) lh (name plane) (name class)))

(defn show-hints [e hint-fn options]
  (js/CodeMirror.showHint (->cm-ed e) hint-fn (clj->js options))
  e)

(defn inner-mode
  ([e] (inner-mode e nil))
  ([e state]
   (let [state (or state (->> (cursor e) (->token-js e) (.-state)))]
     (-> (js/CodeMirror.innerMode (.getMode (->cm-ed e)) state)
         (.-mode)))))

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

(defn block-comment [e from to opts]
  (.blockComment (->cm-ed e) (clj->js from) (clj->js to) (clj->js opts)))

(defn toggle-comment
  "Toggle comment and if multiline toggle apply block comment"
  [e from to opts]
  (when-not (uncomment e from to opts)
    (if-not (= (:line from) (:line to))
      (block-comment e from to opts)
      (line-comment e from (->cursor e "end") opts))))

(defn ->generation [e]
  (.changeGeneration (->cm-ed e)))

(defn dirty? [e gen]
  (not (.isClean (->cm-ed e) gen)))

(defn get-doc [e]
  (.getDoc (->cm-ed e)))

(defn set-doc! [e doc]
  (object/merge! e {:doc doc})
  (.swapDoc (->cm-ed e) (:doc @doc)))

(defn fold-code
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

(defn add-gutter [e class-name width]
  (let [gutter-classes (set (conj (js->clj (option e "gutters")) class-name))
        current-widths (gutter-widths e)
        new-gutter-widths (assoc current-widths class-name width)]
    (update-gutters e gutter-classes new-gutter-widths)))

(defn remove-gutter [e class-name]
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

(behavior ::enable-brackets-autoclose
          :triggers #{:object.instant :lt.object/tags-removed}
          :desc "Editor: Enable brackets autoclose"
          :exclusive [::disable-brackets-autoclose]
          :type :user
          :reaction (fn [this]
                      (set-options this {:autoCloseBrackets true})))

(behavior ::disable-brackets-autoclose
          :triggers #{:object.instant :lt.object/tags-removed}
          :desc "Editor: Disable brackets autoclose"
          :exclusive [::enable-brackets-autoclose]
          :type :user
          :reaction (fn [this]
                      (set-options this {:autoCloseBrackets false})))
