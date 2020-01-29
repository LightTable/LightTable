(ns lt.objs.langs.keymap
  "Provide hints for keymaps"
  (:require [lt.object :as object]
            [lt.objs.context :as ctx]
            [lt.objs.command :as cmd]
            [lt.util.dom :as dom]
            [lt.objs.langs.behaviors :as beh]
            [lt.objs.editor :as editor]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [behavior background defui]]))


(def completions {:tag (:tag beh/completions)
                  :command cmd/completions})

(defn idx->entry-info [idx entries]
  (let [[ix entry] (beh/idx->item idx entries)
        [tokenIx token] (beh/idx->item idx (:tokens entry))
        [argIx arg] (when (:tokens token)
                      (beh/idx->item idx (:tokens token)))
        [tag key first-command] (:tokens entry)
        tag (if tag (beh/str->ns-keyword (:value tag)))
        past-last-token (> idx (-> (:tokens entry)
                                   (last)
                                   (:end)
                                   (inc)))
        pos (cond
             (and (not tokenIx) past-last-token) (count (:tokens entry))
             (not tokenIx) (dec (count (:tokens entry)))
             :else tokenIx)
        past-last-arg (> idx (-> (:tokens token)
                                 (last)
                                 (:end)
                                 (inc)))
        arg-pos (when (:tokens token)
                  (cond
                   (and (not argIx) past-last-arg) (count (:tokens token))
                   (not argIx) (dec (count (:tokens token)))
                   :else argIx))
        command (if (and tokenIx (> tokenIx 1))
                  (cond
                   arg-pos (beh/str->ns-keyword (-> (:tokens token) first :value))
                   :else (beh/str->ns-keyword (:value token))))
        first-command (if first-command
                        (cond
                         (:tokens first-command) (beh/str->ns-keyword (-> (:tokens first-command) first :value))
                         :else (beh/str->ns-keyword (:value first-command))))]
    {:tag tag
     :key key
     :first-command first-command
     :command-at-pos command
     :arg-pos arg-pos
     :pos pos}))

(defn pos->token-type [pos]
  (condp = pos
    0 :tag
    1 :key
    :command))

(declare helper)

(behavior ::keymap-hints
          :triggers #{:hints+}
          :exclusive [:lt.plugins.auto-complete/textual-hints]
          :reaction (fn [this hints token]
                      (let [idx (beh/->index this)
                            {:keys [tag key pos command-at-pos arg-pos]} (idx->entry-info idx (:entries @this))
                            comps (when (or (not arg-pos)
                                            (< arg-pos 1))
                                    (completions (pos->token-type pos)))]
                        (if-not comps
                          hints
                          (comps token)))))

(behavior ::show-info-on-move
          :triggers #{:move}
          :debounce 200
          :reaction (fn [this]
                      (let [idx (beh/->index this)
                            {:keys [command-at-pos arg-pos first-command]} (idx->entry-info idx (:entries @this))
                            command (get (:commands @cmd/manager) (or command-at-pos first-command))]
                        (if command
                          (object/raise helper :show! this command arg-pos)
                          (object/raise helper :clear! this)))))

(behavior ::keymap-hint-pattern
          :triggers #{:object.instant}
          :reaction (fn [this]
                      (object/merge! this {:hint-pattern #"[\w\-\>\:\*\$\?\<\!\+\.\"\/]"})))

(behavior ::on-changed
          :triggers #{:change :create}
          :debounce 50
          :reaction (fn [this]
                      (beh/flat-parser this (editor/->val this))))

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


(behavior ::helper.show!
          :desc "Keymap.helper: show"
          :triggers #{:show!}
          :reaction (fn [this ed keym param-idx]
                      (let [loc (editor/->cursor ed)]
                        (when (or (not= keym (:key @this))
                                  (not= ed (:ed @this)))
                          ;;clear old
                          (when (:mark @this)
                            (editor/-line-class ed (:line @this) :text "behavior-helper-line")
                            (object/raise (:mark @this) :clear!))
                          (editor/+line-class ed (:line loc) :text "behavior-helper-line")
                          (object/merge! this {:content (->helper keym)})
                          (object/merge! this {:mark (inline this ed (assoc loc :prev-line (:line @this)))
                                               :key keym
                                               :line (:line loc)
                                               :ed ed}))
                        (set-param this param-idx))))

(def helper (object/create ::helper))
