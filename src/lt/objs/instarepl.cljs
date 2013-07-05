(ns lt.objs.instarepl
  (:require [lt.object :as object]
            [lt.objs.eval :as eval]
            [lt.objs.clients :as clients]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.console :as console]
            [lt.objs.langs.clj :as clj]
            [lt.objs.notifos :as notifos]
            [lt.objs.tabs :as tabs]
            [lt.util.dom :refer [prevent]]
            [lt.objs.sidebar.command :as cmd]
            [crate.binding :refer [bound subatom]]
            [crate.core :as crate]

            [cljs.reader :as reader])
  (:require-macros [lt.macros :refer [defui]]))

;;TODO: version out of sync

(object/behavior* ::on-eval-sonar
                  :triggers #{:eval}
                  :reaction (fn [obj auto? pos?]
                              (let [ed (:ed @obj)
                                    v (editor/->val ed)
                                    info (-> @obj :info)
                                    info (if (editor/selection? ed)
                                           (assoc info :local true :code (editor/selection ed) :auto? false :meta {:start (-> (editor/->cursor ed "start") :line)})
                                           (assoc info :local true :code v :auto? auto? :pos (when pos? (editor/->cursor ed)))
                                           )]
                                (notifos/working "")
                                (clients/send (eval/get-client! {:origin obj
                                                                 :info info
                                                                 :create clj/try-connect
                                                                 :command :editor.eval.clj.sonar})
                                              :editor.eval.clj.sonar
                                              info
                                              :only
                                              (object/parent obj)))))

(object/behavior* ::on-eval-one
                  :triggers #{:eval.one}
                  :reaction (fn [this]
                              (object/raise this :eval false :pos)))

(object/behavior* ::eval-on-change
                  :triggers #{:change}
                  :debounce 300
                  :reaction (fn [this]
                              (let [parent @(object/parent this)]
                                (when (:live parent)
                                  (object/raise this :eval true)))))

(object/behavior* ::sonar-result
                  :triggers #{:editor.eval.clj.sonar.result}
                  :reaction (fn [this res]
                              (notifos/done-working)
                              (object/merge! this {:error nil})
                              (object/merge! (:main @this) {:info (assoc (-> @this :main deref :info) :ns (or (:ns res) "user"))})
                              (update-res this res)
                              ))

(object/behavior* ::no-op
                  :triggers #{:editor.eval.clj.sonar.noop}
                  :reaction (fn [this]
                              (notifos/done-working)))

(object/behavior* ::clj-exception
                  :triggers #{:editor.eval.clj.exception}
                  :reaction (fn [this ex]
                              (notifos/done-working)
                              (object/merge! this {:error (:msg ex)})
                              ))

(object/behavior* ::destroy-on-close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (object/raise (:main @this) :close)))


(object/behavior* ::cleanup-on-destroy
                  :triggers #{:destroy}
                  :reaction (fn [this]
                              (doseq [[_ w] (-> @this :main deref :widgets)]
                                (object/raise w :clear!))))

(object/behavior* ::dirty-parent
                  :triggers #{:dirty :clean}
                  :reaction (fn [this]
                              (object/merge! (object/parent this) {:dirty (:dirty @this)})))

(object/behavior* ::close-parent
                  :triggers #{:destroy}
                  :reaction (fn [this]
                              (object/destroy! (object/parent this))))

(object/behavior* ::set-parent-title
                  :triggers #{:save-as :path-changed}
                  :reaction (fn [this]
                              (object/remove-tags this [:editor.clj])
                              (object/merge! (object/parent this) {:name (-> @this :info :name)})))

(object/behavior* ::on-show-refresh-eds
                  :triggers #{:show}
                  :reaction (fn [this]
                              (object/raise (:main @this) :show)
                              (editor/focus (:main @this))
                              ))

(object/behavior* ::live-toggle
                  :triggers #{:live.toggle!}
                  :reaction (fn [this]
                              (cmd/exec! :clear-inline-results)
                              (object/merge! this {:live (not (:live @this))})
                              (editor/focus (:main @this))))

(def default-content ";; Anything you type in here will be executed
;; immediately with the results shown on the
;; right.

")

(defui ->result [r]
  [:span.usage.result r]
  )

(defui ->ex [msg stack]
  [:span.usage.exception
   [:span.stack stack]])

(defui ->usage [sym u]
  [:span.usage u])


(object/behavior* ::expand-on-click
                  :triggers #{:click :expand!}
                  :reaction (fn [this]
                              (object/merge! this {:open true})
                              (object/raise this :changed)))

(object/behavior* ::shrink-on-double-click
                  :triggers #{:double-click :shrink!}
                  :reaction (fn [this]
                              (object/merge! this {:open false})
                              (object/raise this :changed)
                              (ed/focus (:ed @this))))

(object/behavior* ::soft-clear
                  :triggers #{:soft-clear!}
                  :reaction (fn [this]
                              (object/merge! this {:active false :group nil :vs nil})))

(object/behavior* ::clear-mark
                  :triggers #{:clear!}
                  :reaction (fn [this]
                              (js/CodeMirror.off (:lineh @this) "change" (:listener @this))
                              (js/CodeMirror.off (:lineh @this) "delete" (:delete @this))
                              (.clear (:mark @this))
                              (object/destroy! this)))

(object/behavior* ::changed
                  :triggers #{:changed}
                  :reaction (fn [this]
                              ;(.changed (:mark @this))
                              ))

(def new-line-change ["" ""])
(object/behavior* ::move-mark
                  :triggers #{:move!}
                  :reaction (fn [this ch]
                                (let [orig (:mark @this)
                                      loc (.find orig)
                                      cur-line (editor/lh->line (:ed @this) (:lineh @this))]
                                  (if (or (not loc)
                                          (not= (.-line loc) cur-line)
                                          (empty? (.-text (:lineh @this))))
                                    (object/raise this :clear!)
                                    (when (and (not= new-line-change (seq (.-text ch)))
                                               (>= (.-to.ch ch) (.-ch (.find orig))))
                                      (object/merge! this {:mark (editor/bookmark (editor/->cm-ed (:ed @this))
                                                                                  {:line cur-line}
                                                                                  {:widget (object/->content this)
                                                                                   :insertLeft false})})
                                      (when orig
                                        (.clear orig)))))))

(defui ->group [this]
  (let [{:keys [group vs]} @this]
    [:span
     (for [{:keys [cur root]} group]
       (condp = root
         "result" (->result (nth cur 2))
         "ex" (->ex (nth cur 2) (nth cur 3))
         (->usage (nth cur 2) (vs root))))]))

(defn ->group-class [this]
  (str "result-group "
       (if (:active this)
         ""
         "inactive")))

(defui use-group [this]
  [:span {:class (bound this ->group-class)}
   (bound this (partial ->group this))])

(object/object* ::inline-result-group
                :tags #{:inline :inline.result-group}
                :active true
                :init (fn [this info]
                        (let [content (use-group this)
                              delete (fn [cm]
                                       (object/raise this :clear!))
                              listener (fn [line change]
                                         (object/raise this :move! change))]
                          (js/CodeMirror.on (:lineh info) "change" listener)
                          (js/CodeMirror.on (:lineh info) "delete" delete)
                          (object/merge! this (assoc info
                                                :listener listener
                                                :delete delete
                                                :mark (editor/bookmark (editor/->cm-ed (:ed info))
                                                                   {:line (:line info)}
                                                                   {:widget content
                                                                    :insertLeft false})))
                          content)))

(object/tag-behaviors :inline.result-group [::clear-mark ::shrink-on-double-click ::expand-on-click ::move-mark ::soft-clear ::changed])

(defn update-use-group! [this ed group vs]
  (let [line (-> group first :cur first dec)
        lineh (editor/line-handle ed line)
        main (-> @this :main)]
    (if-let [ug (-> @main :widgets (get lineh))]
      (object/merge! ug {:group group :vs vs :active true})
      (object/update! main [:widgets] assoc lineh (object/create ::inline-result-group {:ed ed :line line :lineh lineh :group group :vs vs})))))

(defn update-res [this results]
  ;(reset! cur-error nil)
  (let [main (-> @this :main deref :ed)
        vs (-> results :vals reader/read-string)
        repls (-> results :uses)
        used-lines (into #{} (map #(-> % :cur first dec) repls))
        out (:out results)]
    ;;TODO: where do we get "Version"
    (doseq [[lh v] (-> @this :main deref :widgets)]
      (if-not @v
        (object/update! (-> @this :main) [:widgets] dissoc lh)
        (when-not (used-lines (editor/lh->line main lh))
          (object/raise v :soft-clear!))))
    (doseq [group (partition-by #(-> % :cur first) repls)]
      (update-use-group! this main group vs))))

(defui live-toggle [this]
       [:span {:class (bound this #(str "livetoggler " (when-not (:live %) "off")))} "live"]
       :click (fn [e]
                (prevent e)
                (object/raise this :live.toggle!)))

(object/object* ::instarepl
                :triggers []
                :behaviors [::sonar-result ::clj-exception ::on-show-refresh-eds ::destroy-on-close
                            ::live-toggle ::no-op ::cleanup-on-destroy :lt.objs.langs.clj/eval-print-err :lt.objs.langs.clj/eval-print]
                :name "Instarepl"
                :live true
                :init (fn [this]
                        (let [main (-> (pool/create {:type "clj" :content default-content :ns "user"})
                                       (object/remove-tags [:editor.inline-result :editor.clj])
                                       (object/add-tags [:editor.clj.instarepl :editor.transient]))]
                          (object/parent! this main)
                          (object/merge! this {:main main})
                          (editor/+class main :main)
                          (editor/move-cursor main {:line 10000 :ch 0})
                          [:div#instarepl
                           (live-toggle this)
                           (object/->content main)
                           [:p.error (bound this :error)]
                           ]
                        )))

(object/tag-behaviors :editor.clj.instarepl  [::set-parent-title ::dirty-parent ::close-parent ::on-eval-sonar ::no-op ::eval-on-change ::on-eval-one :lt.objs.editor.find/find-in-editor])

(defn add []
  (let [instarepl (object/create ::instarepl)]
    (tabs/add! instarepl)
    (tabs/active! instarepl)
    instarepl))

(cmd/command {:command :instarepl-current
              :desc "Instarepl: Make current editor an instarepl"
              :exec (fn []
                      (let [cur (pool/last-active)
                            info (:info @cur)]
                        (if-not (= (:type info) "clj")
                          (notifos/set-msg! "Instarepl only works for Clojure" {:class "error"})
                          (let [content (editor/->val cur)
                                inst (object/create ::instarepl)
                                ed (:main @inst)]
                            (object/merge! ed {:info info
                                               :widgets {}
                                               :dirty dirty})
                            (object/merge! inst {:name (-> info :name)
                                                 :dirty dirty})
                            (object/remove-tags ed [:editor.transient])
                            (object/add-tags ed [:editor.file-backed])
                            (editor/set-val ed content)
                            (object/raise cur :close)
                            (tabs/add! inst)
                            (tabs/active! inst)
                            ))
                      ))})

(cmd/command {:command :instarepl
              :desc "Instarepl: Open a clojure instarepl"
              :exec (fn []
                      (add))})
