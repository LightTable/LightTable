(ns lt.objs.langs.behaviors
  (:require [lt.object :as object]
            [lt.objs.context :as ctx]
            [lt.objs.command :as cmd]
            [lt.util.dom :as dom]
            [lt.objs.editor :as editor]
            [clojure.string :as string]
            [lt.util.js :refer [wait]]
            [lt.util.cljs :refer [js->clj]])
  (:require-macros [lt.macros :refer [behavior background defui]]))

(def parser (background (fn [obj-id contents]
                          (let [StringStream (-> (js/require (str js/ltpath "/core/node_modules/codemirror/stringstream.js"))
                                                 (.-StringStream))
                                parser (-> (js/require (str js/ltpath "/core/node_modules/lighttable/background/behaviorsParser.js"))
                                           (.-parseBehaviors))
                                parsed (-> (StringStream. contents)
                                           (parser))]
                            (js/_send obj-id :parsed parsed)))))

(defn pos->state [ed]
  (let [token (editor/->token ed (editor/->cursor ed))
        _ (set! tok token)
        level (-> (get-in token [:state :overlay :rainbowstack])
                  (last)
                  (:level))]
    (cond
     (not level) :none
     (= level 1) :root
     (= level 2) :tag
     (= level 3) :behavior
     (= level 4) :behavior-param
     :else :param)))

(defn locate [idx positions]
  (first (filter #(> (inc (:to %)) idx (dec (:from %))) positions)))

(defn ->index [this]
  (editor/pos->index this (editor/cursor this)))

(defn str->ns-keyword [s]
  (when s
   (let [s (if (= ":" (first s))
             (subs s 1)
             s)
         parts (string/split s "/")]
     (when (seq parts)
       (apply keyword parts)))))

(defn pos->behavior [this idx]
  (let [res (locate idx (:positions @this))]
    (when (and res (:behavior res))
      (assoc res :behavior (@object/behaviors (-> (:behavior res)
                                                  (str->ns-keyword)
                                                  ))))))


(defn index-of [needle haystack]
  (first (keep-indexed #(when (= %2 needle) %1) haystack)))

(defn param-index [idx params]
  (when (seq params)
  (let [res (locate idx params)]
    (when res
      (index-of res params)))))

(defn wrapped-replacement [replace cur]
  (replace (+ "(" (.-completion cur) " )"))
  (cmd/exec! :editor.char-left))

(defn ->wrapped-behavior [beh cur]
  (aset cur "completion" (str (:name beh)))
  (when (:params beh)
    (aset cur "select" wrapped-replacement))
  cur)

(defn user-behavior-completions [_ _ token]
  (if (and token
           (= (subs token 0 1) ":"))
    (map #(->wrapped-behavior % #js {:text (str (:name %))}) (vals @object/behaviors))
    (map #(if-not (:desc %)
            (->wrapped-behavior % #js {:text (str (:name %))})
            (->wrapped-behavior % #js {:text (:desc %)}))
         (filter #(= (:type %) :user) (vals @object/behaviors)))))

(def completions {:root [#js {:completion ":+"}
                         #js {:completion ":-"}]
                  :tag (fn []
                         (map #(do #js {:completion (str %) :text (str %)}) (keys @object/tags)))
                  :behavior user-behavior-completions
                  :behavior-param (fn [beh idx]
                                    (cond
                                     (not beh) (user-behavior-completions)
                                     (-> beh :behavior :params) (let [params (-> beh :behavior :params )
                                                                      cur (or (param-index idx (:args beh)) (if (> (count (:args beh)) 0)
                                                                                                              (dec (count (:args beh)))
                                                                                                              0))
                                                                      param (get params cur)]
                                                                  (when (= (:type param) :list)
                                                                    (if (fn? (:items param))
                                                                      ((:items param))
                                                                      (:items param))))
                                     :else nil)
                                    )})

(behavior ::behavior-hints
                  :triggers #{:hints+}
                  :reaction (fn [this hints token]
                              (let [comps (completions (pos->state this))]
                                (if-not comps
                                  hints
                                  (if (fn? comps)
                                    (let [idx (->index this)]
                                      (comps (pos->behavior this (- idx 2)) (dec idx) token))
                                    comps)))))

(behavior ::show-info-on-move
                  :triggers #{:move}
                  :debounce 200
                  :reaction (fn [this]
                              (let [idx (->index this)]
                                (if-let [beh (or (pos->behavior this idx) (pos->behavior this (dec idx)))]
                                  (when (-> beh :behavior :desc)
                                    (object/raise helper :show! this beh (param-index idx (-> beh :args))))
                                  (object/raise helper :clear!)
                                  ))))

(behavior ::behavior-hint-pattern
                  :triggers #{:object.instant}
                  :reaction (fn [this]
                              (object/merge! this {:hint-pattern #"[\w\-\>\:\*\$\?\<\!\+\.\"\/]"})))

(behavior ::on-changed
                  :triggers #{:change :create}
                  :debounce 100
                  :reaction (fn [this]
                              (parser this (editor/->val this))))

(behavior ::parsed
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


(defui ->helper [beh]
  [:div
   [:h2 (:desc beh (:name beh))]
   (when (:params beh)
     [:div
                (for [p (:params beh)]
        [:span.param (:label p)
         (when (:example p)
           (list " =>" [:pre.example (:example p)]))])
      ])])

(defn set-param [this idx]
    (let [lis (dom/$$ "span.param" (object/->content this))]
      (doseq [li lis]
        (dom/remove-class li :active))
      (when idx
        (-> lis
            (aget idx)
            (dom/add-class :active)))))

(object/object* ::helper
                :tags #{:editor.behaviors.helper})

(behavior ::helper.clear!
                  :desc "Behaviors.helper: clear"
                  :triggers #{:clear!}
                  :reaction (fn [this]
                                  (when (:mark @this)
                                    (object/raise (:mark @this) :clear!))
                                  (object/merge! this {:content nil})
                                  (object/merge! this {:mark nil
                                                       :behavior nil
                                                       :line nil
                                                       :ed nil})))

(behavior ::helper.show!
                  :desc "Behaviors.helper: show"
                  :triggers #{:show!}
                  :reaction (fn [this ed beh param-idx]
                              (let [loc (editor/->cursor ed)]
                                (when (or (not= beh (:behavior @this))
                                          (not= ed (:ed @this)))
                                  ;;clear old
                                  (when (:mark @this)
                                    (object/raise (:mark @this) :clear!))
                                  (object/merge! this {:content (->helper (:behavior beh))})
                                  (object/merge! this {:mark (inline this ed (assoc loc :prev-line (:line @this)))
                                                       :behavior beh
                                                       :line (:line loc)
                                                       :ed ed}))
                                (set-param this param-idx))))

(def helper (object/create ::helper))
