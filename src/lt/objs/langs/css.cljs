(ns lt.objs.langs.css
  (:require [lt.object :as object]
            [lt.objs.eval :as eval]
            [lt.objs.editor :as ed]
            [lt.objs.files :as files]
            [lt.objs.clients :as clients]
            [lt.util.dom :refer [$ append]])
  (:require-macros [lt.macros :refer [defui]]))

(object/behavior* ::on-eval
                  :triggers #{:eval
                              :eval.one}
                  :reaction (fn [editor]
                              (object/raise css-lang :eval! {:origin editor
                                                             :info (assoc (@editor :info)
                                                                     :code (ed/->val (:ed @editor)))})))

(object/behavior* ::eval-on-save
                  :triggers #{:save}
                  :reaction (fn [editor]
                              (when (and (-> @editor :client :default)
                                         (not (clients/placeholder? (-> @editor :client :default))))
                                (object/raise editor :eval))))

(object/behavior* ::eval!
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

(object/tag-behaviors :editor.css #{::on-eval ::eval-on-save})

;;*********************************************************
;; parsing (for highlight)
;;*********************************************************

(comment
(def parser (load/node-module "gonzales"))
(def css (files/open-sync "/users/chris/lighttable/playground/deploy/css/structure.css"))
(time (do (.srcToCSSP parser (:content css) nil true) nil))
(def ast (js/srcToCSSP "body .woot.zomg { background:red; }\n#blah > li { color:purple; }\nfoo {}" nil true))

(defn extract-rules [a]
  (filter #(= (aget % 1) "ruleset") (drop 2 ast)))

(defmulti handle-selector-type #(aget % 1))

(defmethod handle-selector-type "shash" [thing]
  (str "#" (aget thing 2)))

(defmethod handle-selector-type "clazz" [thing]
  (str "." (-> thing
      (aget 2)
      (aget 2))))

(defmethod handle-selector-type :default [thing]
  (aget thing 2))

(for [r (extract-rules ast)]
  {:line (.-ln (aget r 0))
   :selector (apply str (map handle-selector-type (drop 2 (-> r (aget 2) (aget 2)))))})

(def tree (.csspToTree parser ast))
(println tree)

  )
