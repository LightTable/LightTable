(ns lt.objs.langs.css
  (:require [lt.object :as object]
            [lt.objs.eval :as eval]
            [lt.objs.editor :as ed]
            [lt.objs.files :as files]
            [lt.objs.clients :as clients]
            [lt.util.dom :refer [$ append]])
  (:require-macros [lt.macros :refer [behavior defui]]))

(behavior ::on-eval
                  :triggers #{:eval
                              :eval.one}
                  :reaction (fn [editor]
                              (object/raise css-lang :eval! {:origin editor
                                                             :info (assoc (@editor :info)
                                                                     :code (ed/->val (:ed @editor)))})))

(behavior ::eval-on-save
                  :triggers #{:save}
                  :reaction (fn [editor]
                              (when (and (-> @editor :client :default)
                                         (not (clients/placeholder? (-> @editor :client :default))))
                                (object/raise editor :eval))))

(behavior ::eval!
                  :triggers #{:eval!}
                  :reaction (fn [this event]
                              (let [{:keys [info origin]} event]
                                (clients/send (eval/get-client! {:command :editor.eval.css
                                                                 :origin origin
                                                                 :info info})
                                              :editor.eval.css
                                              info
                                              :only origin))))

(object/object* ::css-lang
                :tags #{}
                :behaviors [::eval!]
                :triggers #{:eval!})

(def css-lang (object/create ::css-lang))