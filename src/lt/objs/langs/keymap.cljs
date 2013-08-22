(ns lt.objs.langs.keymap
  (:require [lt.object :as object]
            [lt.objs.context :as ctx]
            [lt.objs.command :as cmd]
            [lt.util.dom :as dom]
            [lt.objs.editor :as editor]
            [lt.util.cljs :refer [js->clj]])
  (:require-macros [lt.macros :refer [background defui]]))

(def parser (background (fn [obj-id contents]
                          (let [StringStream (-> (js/require (str js/ltpath "/core/node_modules/codemirror/stringstream.js"))
                                                 (.-StringStream))
                                parser (-> (js/require (str js/ltpath "/core/node_modules/lighttable/background/behaviorsParser.js"))
                                           (.-parseKeymap))
                                parsed (-> (StringStream. contents)
                                           (parser))]
                            (js/_send obj-id :parsed parsed)))))

(defn pos->state [ed]
  (let [token (editor/->token ed (editor/->cursor ed))
        level (-> (get-in token [:state :overlay :rainbowstack])
                  (last)
                  (:level))]
    (cond
     (not level) :none
     (= level 1) :root
     (= level 2) :tag
     (= level 4) :key
     (= level 5) :key-and-params
     :else :param)))

(defn locate [idx positions]
  (first (filter #(> (inc (:to %)) idx (dec (:from %))) positions)))

(defn ->index [this]
  (editor/pos->index this (editor/cursor this)))

(defn pos->key [this idx]
  (let [res (locate idx (:positions @this))]
    (when (and res (:command res))
      (assoc res :command ((:commands @cmd/manager) (-> (:command res)
                                                        (subs 1)
                                                        (keyword)))))))

(defn index-of [needle haystack]
  (first (keep-indexed #(when (= %2 needle) %1) haystack)))

(defn param-index [idx params]
  (when (seq params)
  (let [res (locate idx params)]
    (when res
      (index-of res params)))))

(def completions {:root [{:completion ":+"}
                         {:completion ":-"}]
                  :tag (fn []
                         (map #(do {:completion (str %) :text (str %)}) (keys @object/tags)))
                  :key (fn []
                         (map #(if-not (:desc %)
                                 {:completion (str (:command %)) :text (str (:command %))}
                                 {:completion (str (:command %)) :text (:desc %)})
                              (vals (:commands @cmd/manager))))})

(object/behavior* ::keymap-hints
                  :triggers #{:hints+}
                  :exclusive [:lt.plugins.auto-complete/textual-hints]
                  :reaction (fn [this hints]
                              (let [comps (completions (pos->state this))]
                                (if-not comps
                                  hints
                                  (if (fn? comps)
                                    (comps)
                                    comps)))))

(object/behavior* ::show-info-on-move
                  :triggers #{:move}
                  :debounce 200
                  :reaction (fn [this]
                              (let [idx (->index this)]
                                (when-let [beh (pos->key this idx)]
                                  (object/raise helper :show! this beh (param-index idx (-> beh :args)))
                                  ))))

(object/behavior* ::keymap-hint-pattern
                  :triggers #{:object.instant}
                  :reaction (fn [this]
                              (object/merge! this {:hint-pattern #"[\w\-\>\:\*\$\?\<\!\+\.\"\/]"})))

(object/behavior* ::on-changed
                  :triggers #{:change :create}
                  :debounce 50
                  :reaction (fn [this]
                              (parser this (editor/->val this))))

(object/behavior* ::parsed
                  :triggers #{:parsed}
                  :reaction (fn [this results]
                              (object/merge! this (js->clj results :keywordize-keys true))
                              (object/raise this :move)))

(defn inline [this ed opts]
  (object/create :lt.objs.eval/inline-result {:ed ed
                                              :class "behavior-helper"
                                              :opts opts
                                              :result (object/->content this)
                                                 :above (boolean (< (:prev-line opts) (:line opts)))
                                              :loc opts
                                              :line (editor/line-handle ed (:line opts))}))


(defui ->helper [keym]
  [:div
   [:h2 (:desc keym (:command keym))]
   (when (:params keym)
     (for [p (:params keym)]
        [:span (:label p)
         (when (:example p)
           [:pre.example (:example p)])]))])

(defn set-param [this idx]
    (let [lis (dom/$$ "span" (object/->content this))]
      (doseq [li lis]
        (dom/remove-class li :active))
      (when idx
        (-> lis
            (aget idx)
            (dom/add-class :active)))))

(object/object* ::helper
                :tags #{:editor.keymap.helper})


(object/behavior* ::helper.show!
                  :desc "Keymap.helper: show"
                  :triggers #{:show!}
                  :reaction (fn [this ed keym param-idx]
                              (let [loc (editor/->cursor ed)]
                                (when (or (not= keym (:key @this))
                                          (not= ed (:ed @this)))
                                  ;;clear old
                                  (when (:mark @this)
                                    (object/raise (:mark @this) :clear!))
                                  (object/merge! this {:content (->helper (:command keym))})
                                  (object/merge! this {:mark (inline this ed (assoc loc :prev-line (:line @this)))
                                                       :key keym
                                                       :line (:line loc)
                                                       :ed ed}))
                                (set-param this param-idx))))

(def helper (object/create ::helper))
