(ns lt.objs.popup
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.context :as ctx]
            [lt.objs.canvas :as canvas]
            [lt.objs.keyboard :as keyboard]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def *no-close* nil)

(behavior ::on-click-destroy
          :triggers #{:click}
          :reaction (fn [this]
                      (object/raise this :close!)))

(behavior ::close!
          :triggers #{:close!}
          :reaction (fn [this]
                      (object/raise this :close)
                      (object/destroy! this)
                      (if-let [others (-> (object/by-tag :popup)
                                          (seq))]
                        (ctx/in! :popup (last others))
                        (ctx/out! :popup)
                        )))

(behavior ::refocus-on-close
          :triggers #{:close}
          :reaction (fn [this]
                      (cmd/exec! :tabs.focus-active)))

(behavior ::change-active-button
          :triggers #{:move-active}
          :reaction (fn [this dir]
                      (let [buttons (dom/$$ ".button" (object/->content this))
                            button (mod (+ (:button @this) dir) (count buttons))]
                        (dom/remove-class (aget buttons (:button @this)) :active)
                        (dom/add-class (aget buttons button) :active)
                        (object/merge! this {:button button})
                        )
                      ))

(behavior ::exec-active
          :triggers #{:exec-active}
          :reaction (fn [this]
                      (let [buttons (dom/$$ ".button" (object/->content this))]
                        (dom/trigger (aget buttons (:button @this)) :click))))

(defn remain-open []
  (set! *no-close* true))

(defui ->button [this {:keys [label action post-action]}]
  [:li.button label]
  :click (fn []
           (binding [*no-close* nil]
             (when (fn? action)
               (action))
             (when-not *no-close*
               (object/raise this :close!))
             (when (fn? post-action)
               (post-action)))))

(defui popup-content [this opts]
  [:div [:div
         [:h2 (:header opts)]
         [:p (:body opts)]
         [:ul.buttons
          (for [b (reverse (:buttons opts))]
            (->button this b))]]]
  :click (fn [e]
           (dom/prevent e)
           (dom/stop-propagation e)))

(defui popup [this opts]
  [:div.popup {:tabindex -1}
   [:div
    (popup-content this opts)]]
  :click (fn []
           (object/raise this :click)))

(object/object* ::popup
                :tags #{:popup}
                :button 0
                :init (fn [this content]
                        (popup this content)
                        ))

(cmd/command {:command :popup.exec-active
              :desc "Popup: execute active option"
              :hidden true
              :exec (fn []
                      (when-let [p (ctx/->obj :popup)]
                        (object/raise p :exec-active)))})

(cmd/command {:command :popup.move-active
              :desc "Popup: move selection"
              :hidden true
              :exec (fn [dir]
                      (when-let [p (ctx/->obj :popup)]
                        (object/raise p :move-active dir)))})

(cmd/command {:command :popup.escape
              :desc "Popup: escape"
              :hidden true
              :exec (fn []
                      (when-let [p (ctx/->obj :popup)]
                        (object/raise p :click)))})

(defn popup! [options]
  (let [p (object/create ::popup options)]
    (object/raise p :move-active 0)
    (dom/append (dom/$ :body) (object/->content p))
    (.focus (object/->content p))
    (ctx/in! :popup p)
    p))

(def cancel-button {:label "cancel" :action :cancel})

