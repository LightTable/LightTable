(ns lt.objs.editor.pool
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.files :as files]
            [lt.objs.file-manager :as fileman]
            [lt.objs.canvas :as canvas]
            [lt.objs.settings :as settings]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.popup :as popup]
            [lt.objs.notifos :as notifos]
            [lt.objs.editor :as editor]
            [lt.util.cljs :refer [->dottedkw]]
            [clojure.string :as string]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [defui]]))

(defn get-all []
  (object/by-tag :editor))

(object/behavior* ::theme-changed
                  :triggers #{:theme-change}
                  :reaction (fn [this theme]
                              (doseq [ed (get-all)
                                      :let [e (:ed @ed)]]
                                (editor/set-options e {:theme theme}))))

(object/behavior* ::line-numbers-changed
                  :triggers #{:line-numbers-change}
                  :reaction (fn [this numbers?]
                              (doseq [ed (get-all)
                                      :let [e (:ed @ed)]]
                                (editor/set-options e {:lineNumbers numbers?}))))

(object/behavior* ::options-changed
                  :triggers #{:options-changed}
                  :reaction (fn [this opts]
                              (doseq [ed (get-all)
                                      :let [e (:ed @ed)]]
                                (editor/set-options e opts))))

(object/object* ::pool
                :tags #{:editor.pool})

(object/tag-behaviors :editor.pool [::theme-changed ::line-numbers-changed ::options-changed])

(defn unsaved? []
  (some #(:dirty (deref %)) (object/by-tag :editor)))

(defn by-path [path]
  (let [path (string/lower-case path)]
    (filter #(= (-> @% :info :path string/lower-case) path) (object/by-tag :editor))))

(defn containing-path [path]
  (let [path (string/lower-case path)]
    (filter #(> (.indexOf (-> @% :info :path string/lower-case) path) -1) (object/by-tag :editor))))

(defui button [label & [cb]]
       [:div.button.right label]
       :click (fn []
                (when cb
                  (cb))))

(defn unsaved-prompt [on-yes]
  (popup/popup! {:header "You will lose changes."
                 :body "If you close now, you'll lose any unsaved changes. Are you sure you want to do that?"
                 :buttons [{:label "Discard changes"
                            :action on-yes}
                           popup/cancel-button]}))

(def pool (object/create ::pool))

(object/behavior* ::track-active
                  :triggers #{:active}
                  :reaction (fn [this]
                              (object/merge! pool {:last this})))

(object/behavior* ::stop-close-dirty
                  :triggers #{:close}
                  :reaction (fn [this]
                              (when (unsaved?)
                                (app/prevent-close)
                                (unsaved-prompt (partial app/close true)))))

(object/behavior* ::stop-reload-dirty
                  :triggers #{:reload}
                  :reaction (fn [this]
                              (when (unsaved?)
                                (app/prevent-close)
                                (unsaved-prompt app/refresh))))

(object/behavior* ::ed-close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (if (:dirty @this)
                                (unsaved-prompt #(object/raise this :close.force))
                                (object/raise this :close.force))))

(object/behavior* ::focus-last-on-focus
                  :triggers #{:focus!}
                  :reaction (fn [this]
                              (focus-last)))

(defn make-transient-dirty [ed]
  (object/merge! ed {:dirty true})
  (object/update! ed [:info] assoc :path nil)
  (object/remove-tags ed [:editor.file-backed])
  (object/add-tags ed [:editor.transient]))

(defn active-warn [ed popup]
  (if-not (= (last-active) ed)
    (object/merge! ed {:active-warn popup})
    (popup/popup! popup)))

(defn reload [ed]
  (editor/set-val ed (:content (files/open-sync (-> @ed :info :path))))
  (fileman/update-stats (-> @ed :info :path))
  (object/merge! ed {:dirty false}))

(object/behavior* ::warn-on-active
                  :triggers #{:active}
                  :reaction (fn [this]
                              (when (:active-warn @this)
                                (popup/popup! (:active-warn @this))
                                (object/merge! this {:active-warn nil}))))

(object/behavior* ::watched.update
                  :triggers #{:watched.update}
                  :reaction (fn [ws f stat]
                              (when (files/file? f)
                                (when-let [ed (first (by-path f))]
                                  (when-not (fileman/check-mtime (fileman/->stats f) stat)
                                    (if (:dirty @ed)
                                      (active-warn ed {:header "This file has been modified."
                                                       :body "This file seems to have been modified outside of Light Table. Do you want to load the latest and lose your changs?"
                                                       :buttons [{:label "Reload from disk"
                                                                  :action (fn []
                                                                            (reload ed))}
                                                                 {:label "Cancel"}
                                                                 ]})
                                      (reload ed)))))))

(defn warn-delete [ed]
  (active-warn ed {:header "This file has been deleted."
                   :body "This file seems to have been deleted and we've marked it as unsaved."
                   :buttons [{:label "Save as.."
                              :action (fn []
                                        (object/raise ed :save))}
                             {:label "ok"}]}))

(object/behavior* ::watched.delete
                  :triggers #{:watched.delete}
                  :reaction (fn [ws del]
                              (if (files/file? del)
                                (when-let [ed (first (by-path del))]
                                  (warn-delete ed)
                                  (make-transient-dirty ed)
                                  (when-let [ts (:lt.objs.tabs/tabset @ed)]
                                    (object/raise ts :tab.updated)))
                                (let [open (filter #(if-let  [path (-> @% :info :path)]
                                                      (= 0 (.indexOf path del))
                                                      false)
                                                   (object/by-tag :editor))]
                                  (doseq [ed open]
                                    (warn-delete ed)
                                    (make-transient-dirty ed))))))

(object/behavior* ::watched.rename
                  :triggers #{:watched.rename :rename}
                  :reaction (fn [this old neue]
                              (if (files/file? old)
                                (when-let [ed (first (by-path old))]
                                  (fileman/update-stats neue)
                                  (object/update! ed [:info] assoc :path neue :name (files/basename neue))
                                  (when-let [ts (:lt.objs.tabs/tabset @ed)]
                                    (object/raise ts :tab.updated)))
                                (let [open (filter #(= 0 (.indexOf (-> @% :info :path) old)) (object/by-tag :editor))]
                                  (doseq [ed open
                                          :let [neue-path (string/replace (-> @ed :info :path) old neue)]]
                                    (fileman/update-stats neue-path)
                                    (object/update! ed [:info] assoc :path neue-path :name (files/basename neue-path)))))))

(defn last-active []
  (let [l (:last @pool)]
    (when (and l @l)
      l)))

(defn focus-last []
  (when-let [ed (last-active)]
    (when-let [ed (:ed @ed)]
      (dom/focus js/document.body)
      (editor/focus ed))))

(defn set-syntax [ed {:keys [mode item] :as all}]
  (let [type (string/lower-case item)
        prev-type (-> @ed :info :type)]
    (object/update! ed [:info] assoc :type type)
    (editor/set-mode ed mode)
    (when prev-type
      (object/remove-tags ed [(->dottedkw :editor prev-type)]))
    (object/add-tags ed [(->dottedkw :editor type)])))

(defn create [info]
  (let [ed (object/create :lt.objs.editor/editor info)]
    (object/add-tags ed (:tags info []))
    (object/raise pool :create ed info)
    ed))

(object/add-behavior! canvas/canvas ::focus-last-on-focus)
(object/tag-behaviors :app [::stop-close-dirty ::stop-reload-dirty])
(object/tag-behaviors :editor [::ed-close ::track-active ::warn-on-active])
(object/tag-behaviors :workspace [::watched.rename ::watched.delete ::watched.update])

(def default-tab-settings {:indentWithTabs false
                           :indentUnit 2
                           :tabSize 2})
(def tab-size (cmd/options-input {:placeholder "Tab size"}))
(def indent-unit (cmd/options-input {:placeholder "Indent unit"}))
(def use-tabs (cmd/filter-list {:items [{:item "true" :value true} {:item "false" :value false}]
                                :key :item
                                :set-on-select true
                                :placeholder "Use tabs?"}))

(object/object* ::tab-options
                :tags #{:tab-options}
                :init (fn [this]
                        [:div.tab-settings
                         [:label "Tab size (width of a tab character)"]
                         (object/->content tab-size)
                         [:label "Indent unit (spaces per indent)"]
                         (object/->content indent-unit)
                         [:label "Indent with tabs?"]
                         (object/->content use-tabs)]))

(object/behavior* ::focus-options
                  :triggers #{:focus!}
                  :reaction (fn [this]
                              (object/raise tab-size :focus!)))

(object/behavior* ::set-tab-settings
                  :triggers #{:select}
                  :reaction (fn [this v]
                              (cmd/exec-active! {:indentWithTabs (:value (cmd/current-selected use-tabs))
                                                 :indentUnit (js/parseInt (dom/val (object/->content indent-unit)))
                                                 :tabSize (js/parseInt (dom/val (object/->content tab-size)))
                                                 })))

(object/behavior* ::add-tab-settings
                  :triggers #{:create}
                  :reaction (fn [this ed]
                              (let [stts (or (settings/fetch :tab-settings) default-tab-settings)]
                                (editor/set-options ed stts))
                              ))

(object/behavior* ::init-tab-settings
                  :triggers #{:init}
                  :reaction (fn [this]
                              (let [stts (or (settings/fetch :tab-settings) default-tab-settings)]
                                (object/merge! tab-size {:value (:tabSize stts)})
                                (object/merge! indent-unit {:value (:indentUnit stts)})
                                (cmd/set-and-select use-tabs (if (:indentWithTabs stts)
                                                               "true"
                                                               "false")))))

(object/add-behavior! tab-size ::set-tab-settings)
(object/add-behavior! indent-unit ::set-tab-settings)
(object/add-behavior! use-tabs ::set-tab-settings)
(object/tag-behaviors :tab-options [::focus-options])
(object/tag-behaviors :editor.pool [::add-tab-settings])
(object/tag-behaviors :app [::init-tab-settings])

(cmd/command {:command :change-tab-settings
              :desc "Settings: Set tab size/behavior"
              :options (object/create ::tab-options)
              :exec (fn [opts]
                      (settings/store! :tab-settings opts)
                      (object/raise pool :options-changed opts)
                      )})

(cmd/command {:command :focus-last-editor
              :desc "Editor: Focus last active editor"
              :hidden true
              :exec (fn []
                      (focus-last))})

(def syntaxes [{:item "CSS" :mode "css"}
               {:item "HTML" :mode "htmlmixed"}
               {:item "Javascript" :mode "javascript"}
               {:item "JSON" :mode "javascript"}
               {:item "C" :mode "text/x-c"}
               {:item "C++" :mode "text/x-c++src"}
               {:item "C++ Header" :mode "text/x-c++hdr"}
               {:item "Java" :mode "text/x-java"}
               {:item "C#" :mode "text/x-csharp"}
               {:item "Scala" :mode "text/x-scala"}
               {:item "CoffeeScript" :mode "text/x-coffeescript"}
               {:item "Common Lisp" :mode "text/x-common-lisp"}
               {:item "Diff" :mode "text/x-diff"}
               {:item "Patch" :mode "text/x-diff"}
               {:item "Erlang" :mode "text/x-erlang"}
               {:item "Go" :mode "text/x-go"}
               {:item "Groovy" :mode "text/x-groovy"}
               {:item "Haml" :mode "text/x-haml"}
               {:item "Haskell" :mode "text/x-haskell"}
               {:item "Haxe" :mode "text/x-haxe"}
               {:item "LESS" :mode "text/x-less"}
               {:item "Lua" :mode "text/x-lua"}
               {:item "OCaml" :mode "text/x-ocaml"}
               {:item "Pascal" :mode "text/x-pascal"}
               {:item "Perl" :mode "text/x-perl"}
               {:item "PHP" :mode "text/x-php"}
               {:item "Plain Text" :mode "plaintext"}
               {:item "SQL" :mode "text/x-plsql"}
               {:item "Ini" :mode "text/x-ini"}
               {:item "R" :mode "text/x-rsrc"}
               {:item "Rust" :mode "text/x-rustsrc"}
               {:item "LaTeX" :mode "text/x-stex"}
               {:item "Sass" :mode "text/x-sass"}
               {:item "Scheme" :mode "text/x-scheme"}
               {:item "Shell" :mode "text/x-sh"}
               {:item "SCSS" :mode "text/x-scss"}
               {:item "St" :mode "text/x-stsrc"}
               {:item "Smarty" :mode "text/x-smarty"}
               {:item "SPARQL" :mode "text/x-sparql-query"}
               {:item "Visual Basic" :mode "text/x-vb"}
               {:item "XML" :mode "text/x-xml"}
               {:item "Ruby" :mode "ruby"}
               {:item "Clojure" :mode "clj"}
               {:item "ClojureScript" :mode "cljs"}
               {:item "Yaml" :mode "yaml"}
               {:item "Python" :mode "python"}
               {:item "Markdown" :mode "markdown"}])

(def syntax-selector (cmd/filter-list {:items syntaxes
                                       :key :item
                                       :placeholder "Syntax"}))

(object/behavior* ::set-syntax
                  :triggers #{:select}
                  :reaction (fn [this v]
                              (cmd/exec-active! v)))

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

(cmd/command {:command :comment-selection
              :desc "Editor: Comment line(s)"
              :exec (fn []
                      (when-let [cur (last-active)]
                        (let [cursor (editor/->cursor cur "start")]
                          (if (editor/selection? cur)
                            (editor/line-comment cur cursor (editor/->cursor cur "end"))
                            (editor/line-comment cur cursor cursor)))))})

(cmd/command {:command :uncomment-selection
              :desc "Editor: Uncomment line(s)"
              :exec (fn []
                      (when-let [cur (last-active)]
                        (let [cursor (editor/->cursor cur "start")]
                          (if (editor/selection? cur)
                            (editor/uncomment cur cursor (editor/->cursor cur "end"))
                            (editor/uncomment cur cursor cursor)))))})

(cmd/command {:command :toggle-comment-selection
              :desc "Editor: Toggle comment line(s)"
              :exec (fn []
                      (when-let [cur (last-active)]
                        (let [cursor (editor/->cursor cur "start")
                              [start end] (if (editor/selection? cur)
                                            [cursor (editor/->cursor cur "end")]
                                            [cursor cursor])]
                          (when-not (editor/uncomment cur start end)
                            (editor/line-comment cur cursor (editor/->cursor cur "end"))))))})

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
                        (let [line (-> cur (editor/->cursor "start") :line)]
                          (if (editor/selection? cur)
                            (editor/indent-selection cur "smart")
                            (editor/indent-line cur line "smart")))))})

(cmd/command {:command :line-numbers
              :desc "Editor: Toggle line numbers"
              :exec (fn []
                      (let [v (not (settings/fetch :line-numbers))]
                        (settings/store! :line-numbers v)
                        (object/raise pool :line-numbers-change v))
                      )})

(cmd/command {:command :toggle-wrap
              :desc "Editor: Toggle line wrapping for current"
              :exec (fn []
                      (let [ed (pool/last-active)
                            v (not (editor/option ed :lineWrapping))]
                        (editor/set-options ed {:lineWrapping v}))
                      )})
