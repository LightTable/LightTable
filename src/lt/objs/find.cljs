(ns lt.objs.find
  (:require [lt.object :as object]
            [lt.objs.context :as ctx]
            [lt.objs.canvas :as canvas]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.editor.pool :as pool]
            [lt.objs.keyboard :as keyboard]
            [lt.objs.editor :as editor]
            [lt.objs.tabs :as tabs]
            [lt.util.dom :as dom]
            [crate.binding :refer [bound subatom]]
            [lt.util.style :refer [->px]])
  (:require-macros [lt.macros :refer [defui]]))

(def find-height 30)

(defui input [this]
  [:input {:type "text"
           :placeholder "find"}]
  :keyup (fn []
           (this-as me
                    (object/raise this :search! (dom/val me))))
  :focus (fn []
           (ctx/in! :find-bar this)
           (object/raise bar :active))
  :blur (fn []
          (ctx/out! :find-bar)
          (object/raise bar :inactive)))

(defui replace-input [this]
  [:input {:type "text"
           :placeholder "replace"}]
  :keyup (fn []
           (this-as me
                    (object/raise this :replace.changed (dom/val me))))
  :focus (fn []
           (ctx/in! :find-bar.replace this)
           (object/raise bar :active))
  :blur (fn []
          (ctx/out! :find-bar.replace)
          (object/raise bar :inactive)))

(defn current-ed []
  (editor/->cm-ed (pool/last-active)))

(defn ->shown [shown?]
  (if shown?
    "block"
    "none"))

(defn ->val [this]
  (dom/val (dom/$ :input (object/->content this))))

(defn set-val [this v]
  (dom/val (dom/$ :input (object/->content this)) v))

(object/behavior* ::show!
                  :triggers #{:show!}
                  :reaction (fn [this]
                              (let [e (pool/last-active)]
                                (when e
                                  (when-let [sel (editor/selection e)]
                                    (when-not (empty? sel)
                                      (set-val this sel)))))
                              (when-not (:shown @this)
                                (let [tabs (ctx/->obj :tabs)]
                                  (object/merge! this {:bottom (:bottom @tabs)
                                                       :left (:left @tabs)
                                                       :shown true})
                                  (object/raise tabs :bottom! find-height)
                                  ))))

(object/behavior* ::adjust-find-on-resize
                  :triggers #{:resize}
                  :reaction (fn [this]
                              (when (:shown @bar)
                                (object/merge! bar {:bottom (- (:bottom @tabs/multi) find-height)}))))

(object/behavior* ::hide!
                  :triggers #{:hide!}
                  :reaction (fn [this]
                              (when (:shown @this)
                                (let [tabs (ctx/->obj :tabs)]
                                  (object/merge! this {:shown false})
                                  (object/raise tabs :bottom! (- find-height))
                                  (editor/focus (pool/last-active))
                                  ))))

(object/behavior* ::next!
                  :triggers #{:next!}
                  :reaction (fn [this]
                              (if (and (:searching? @this)
                                       (= (:searching.for @(pool/last-active)) (->val this)))
                                (js/CodeMirror.commands.findNext (current-ed) (:reverse? @this))
                                (object/raise this :search! (->val this)))))

(object/behavior* ::prev!
                  :triggers #{:prev!}
                  :reaction (fn [this]
                              (if (and (:searching? @this)
                                       (= (:searching.for @(pool/last-active)) (->val this)))
                                (js/CodeMirror.commands.findPrev (current-ed) (:reverse? @this))
                                (object/raise this :search! (->val this)))))

(object/behavior* ::focus!
                  :triggers #{:focus!}
                  :reaction (fn [this]
                              (let [input (dom/$ :input (object/->content this))]
                                (dom/focus input)
                                (.select input))))

(object/behavior* ::clear!
                  :triggers #{:clear!}
                  :reaction (fn [this]
                              (object/merge! this {:searching? false})
                              (js/CodeMirror.commands.clearSearch (editor/->cm-ed (pool/last-active)))
                              (dom/val (dom/$ :input (object/->content this))
                                       "")))

(object/behavior* ::search!
                  :triggers #{:search!}
                  :debounce 50
                  :reaction (fn [this v]
                              (if (empty? v)
                                (object/raise this :clear!)
                                (do
                                  (object/merge! this {:searching? true})
                                  (object/merge! (pool/last-active) {:searching.for v})
                                  (let [ed (editor/->cm-ed (pool/last-active))]
                                    (js/CodeMirror.commands.find ed v (:reverse? @this)))))))

(object/object* ::find-bar
                :tags #{:find-bar}
                :bottom 0
                :left 0
                :searching? false
                :reverse? false
                :shown false
                :init (fn [this]
                        [:div#find-bar {:style {:bottom (bound (subatom this :bottom) ->px)
                                                :left (bound (subatom (ctx/->obj :tabs) :left) ->px)
                                                :display (bound (subatom this :shown) ->shown)}}
                         (input this)
                         (replace-input this)]))

(def bar (object/create ::find-bar))

(canvas/add! bar)

(cmd/command {:command :find-in-editor
              :desc "Find: In current editor"
              :exec (fn []
                      (object/merge! bar {:reverse? false})
                      (object/raise bar :show!)
                      (object/raise bar :focus!))})

(cmd/command {:command :find-in-editor-reverse
              :desc "Find: Backward in current editor"
              :exec (fn []
                      (object/merge! bar {:reverse? true})
                      (object/raise bar :show!)
                      (object/raise bar :focus!))})

(cmd/command {:command :clear-and-hide-find
              :desc "Find: Clear and hide the find bar"
              :hidden true
              :exec (fn []
                      (object/raise bar :clear!)
                      (object/raise bar :hide!))})

(cmd/command {:command :clear-find
              :desc "Find: Clear the find bar"
              :hidden true
              :exec (fn []
                      (object/raise bar :clear!))})

(cmd/command {:command :hide-find
              :desc "Find: Hide the find bar"
              :exec (fn []
                      (object/raise bar :hide!))})

(cmd/command {:command :find-next
              :desc "Find: Next find result"
              :exec (fn []
                      (object/raise bar :next!))})

(cmd/command {:command :find-prev
              :desc "Find: Previous find result"
              :exec (fn []
                      (object/raise bar :prev!))})

(def line-input (cmd/options-input {:placeholder "line number"}))

(object/behavior* ::exec-active!
                  :triggers #{:select}
                  :reaction (fn [this l]
                              (cmd/exec-active! l)))

(object/add-behavior! line-input ::exec-active!)

(cmd/command {:command :goto-line
              :desc "Editor: Goto line"
              :options line-input
              :exec (fn [l]
                      (when (or (number? l) (not (empty? l)))
                        (let [cur (pool/last-active)]
                          (editor/move-cursor cur {:ch 0
                                                   :line (dec (if-not (number? l)
                                                                (js/parseInt l)
                                                                l))})
                          (editor/center-cursor cur))))})
