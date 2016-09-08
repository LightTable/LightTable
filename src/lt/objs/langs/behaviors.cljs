(ns lt.objs.langs.behaviors
  "Provide hints for behaviors"
  (:require [lt.object :as object]
            [lt.objs.context :as ctx]
            [lt.objs.command :as cmd]
            [lt.util.dom :as dom]
            [lt.objs.thread]
            [lt.objs.editor :as editor]
            [clojure.string :as string]
            [lt.util.js :refer [wait]])
  (:require-macros [lt.macros :refer [behavior background defui]]))

(def flat-parser (background (fn [obj-id contents]
                               (let [StringStream (-> (js/require (str js/ltpath "/core/node_modules/codemirror/addon/runmode/runmode.node.js"))
                                                      (.-StringStream))
                                     parser (-> (js/require (str js/ltpath "/core/node_modules/lighttable/background/behaviorsParser.js"))
                                                (.-parseFlat))
                                     parsed (-> (StringStream. contents)
                                                (parser))]
                                 (js/_send obj-id :parsed parsed)))))


(defn str->ns-keyword [s]
  (when s
   (let [s (if (= ":" (first s))
             (subs s 1)
             s)
         parts (string/split s "/")]
     (when (seq parts)
       (apply keyword parts)))))

(defn ->index [this]
  (editor/pos->index this (editor/cursor this)))

(defn idx->item [idx items]
  (first (filter #(> (inc (:end (second %))) idx (dec (:start (second %)))) (map-indexed vector items))))

(defn idx->entry-info [idx entries]
  (let [[ix entry] (idx->item idx entries)
        [tokenIx token] (idx->item idx (:tokens entry))
        [tag behavior & args] (:tokens entry)
        tag (if tag (str->ns-keyword (:value tag)))
        behavior (if behavior (str->ns-keyword (:value behavior)))
        past-last-token (> idx (-> (:tokens entry)
                                   (last)
                                   (:end)
                                   (inc)))
        pos (cond
             (and (not tokenIx) past-last-token) (count (:tokens entry))
             (not tokenIx) (dec (count (:tokens entry)))
             :else tokenIx)
        param-pos (if (> pos 1) (- pos 2))]
    {:tag tag
     :behavior behavior
     :param-pos param-pos
     :pos pos}))

(defn user-behavior-completions [token _ _]
   (if (and token (= (subs token 0 1) ":"))
     (map #(do #js {:text (str (:name %)) :completion (str (:name %))}) (vals @object/behaviors))
     (map #(if-not (:desc %)
             #js {:text (str (:name %)) :completion (str (:name %))}
             #js {:text (:desc %) :completion (str (:name %))})
          (filter #(= (:type %) :user) (vals @object/behaviors)))))

(def completions {:tag (fn []
                         (map #(do #js {:text (str %) :completion (str %)}) (keys @object/tags)))
                  :behavior user-behavior-completions
                  :behavior-param (fn [token beh param-pos]
                                    (let [params (-> beh :params )
                                          param (get params param-pos)]
                                      (when (= (:type param) :list)
                                        (if (fn? (:items param))
                                          ((:items param))
                                          (:items param)))))})

(defn pos->token-type [pos]
  (condp = pos
    0 :tag
    1 :behavior
    :behavior-param))

(declare helper)

(behavior ::behavior-hints
          :triggers #{:hints+}
          :exclusive [:lt.plugins.auto-complete/textual-hints]
          :reaction (fn [this hints token]
                      (let [idx (->index this)
                            {:keys [tag behavior param-pos pos] :as info} (idx->entry-info idx (:entries @this))
                            behavior-info (@object/behaviors behavior)
                            token-type (pos->token-type pos)
                            completions-set (completions token-type)]
                        (completions-set token behavior-info param-pos token))))

(behavior ::show-info-on-move
          :triggers #{:move}
          :debounce 200
          :reaction (fn [this]
                      (let [idx (->index this)
                            {:keys [tag behavior param-pos] :as info} (idx->entry-info idx (:entries @this))
                            behavior-info (@object/behaviors behavior)]
                        (if (:desc behavior-info)
                          (object/raise helper :show! this behavior-info param-pos)
                          (object/raise helper :clear!)))))

(behavior ::behavior-hint-pattern
          :triggers #{:object.instant}
          :reaction (fn [this]
                      (object/merge! this {:hint-pattern #"[\w\-\>\:\*\$\?\<\!\+\.\"\/]"})))

(behavior ::on-changed
          :triggers #{:change :create}
          :debounce 100
          :reaction (fn [this]
                      (flat-parser this (editor/->val this))))

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
                        (when (and (:ed @this) @(:ed @this))
                          (editor/-line-class (:ed @this) (:line @this) :text "behavior-helper-line"))
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
                            (editor/-line-class ed (:line @this) :text "behavior-helper-line")
                            (object/raise (:mark @this) :clear!))
                          (editor/+line-class ed (:line loc) :text "behavior-helper-line")
                          (object/merge! this {:content (->helper beh)})
                          (object/merge! this {:mark (inline this ed (assoc loc :prev-line (:line @this)))
                                               :behavior beh
                                               :line (:line loc)
                                               :ed ed}))
                        (set-param this param-idx))))

(def helper (object/create ::helper))
