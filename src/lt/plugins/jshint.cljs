(ns lt.plugins.jshint
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.thread :as thread]
            [lt.util.setup :refer [npm-require]])
  (:require-macros [lt.macros :refer [defui background]]))

(def errors (background (fn [obj-id code]
                          (let [jshint (.-JSHINT (js/require (str js/ltpath "/js/node_modules/jshint")))]
                            (jshint code)
                            (->> (js->clj (.-errors jshint) :keywordize-keys true)
                                 (group-by :line)
                                 (raise obj-id :hinted))))))

(defui mark [errors spacing]
  [:div.hintwrapper
   [:span.spacer spacing]
   [:ul {:class "jshinterrors"}
    (for [e errors]
      [:li (:reason e (:raw e))])]])

(defn ->spacing [text]
  (when text
    (-> (re-seq #"^\s+" text)
        (first))))

(defn hint-operation [this]
  (fn []
    (let [prev (.getScrollInfo (editor/->cm-ed this))]
      (doseq [hint (:jshint @this)]
        (editor/remove-line-widget this hint))
      (object/merge! this {:jshint (doall (for [[line es] (errors this (editor/->val this))]
                                            (editor/line-widget this (dec line) (mark es (->spacing (editor/line this (dec line)))))))})
      ;;Ensure scroll position is the same as it was when we started
      (.scrollTo (editor/->cm-ed this) (.-left prev) (.-top prev)))))

(object/behavior* ::inline-hints
                  :triggers #{:hinted}
                  :reaction (fn [this hints]
                              (editor/operation (editor/->cm-ed this)
                                                (fn []
                                                  (let [prev (.getScrollInfo (editor/->cm-ed this))]
                                                    (doseq [hint (:jshint @this)]
                                                      (editor/remove-line-widget this hint))
                                                    (object/merge! this {:jshint (doall (for [[line es] hints]
                                                                                          (editor/line-widget this (dec line) (mark es (->spacing (editor/line this (dec line)))))))})
                                                    ;;Ensure scroll position is the same as it was when we started
                                                    (.scrollTo (editor/->cm-ed this) (.-left prev) (.-top prev)))))))

(object/behavior* ::on-change
                  :debounce 750
                  :triggers #{:change}
                  :reaction (fn [this]
                              ;;(errors this (editor/->val this))
                              ))

(object/behavior* ::on-save
                  :triggers #{:save}
                  :reaction (fn [this]
                              ;(errors this (editor/->val this))
                              ))


;; TODO: move to default.behaviors
(object/tag-behaviors :editor.javascript [::on-save ::inline-hints])
