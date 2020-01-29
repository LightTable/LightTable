(ns lt.plugins.doc
  "Provide documentation sidebar for searching docs. Used by language plugins"
  (:require [lt.object :as object]
            [lt.objs.context :as ctx]
            [lt.objs.clients :as clients]
            [lt.objs.notifos :as notifos]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.sidebar :as sidebar]
            [lt.util.dom :as dom]
            [lt.util.cljs :refer [str-contains?]]
            [clojure.set :as set]
            [lt.objs.command :as cmd])
  (:require-macros [lt.macros :refer [behavior defui]]))

(defn doc-on-line? [editor line]
  (let [line (editor/line-handle editor line)]
    (get-in @editor [:widgets [line :underline]])))

(defn remove! [editor cur]
  (object/update! editor [:widgets] dissoc [(:line @cur) :underline])
  (object/raise cur :clear!))

(behavior ::clear
          :triggers #{:clear}
          :reaction (fn [this]
                      (object/update! (:ed @this) [:widgets] dissoc [(:line @this) :underline])))

(defn inline-doc [this res opts loc]
  (let [ed (:ed @this)
        type :underline
        line (editor/line-handle ed (:line loc))
        res-obj (object/create :lt.objs.eval/underline-result {:ed this
                                                               :class (name type)
                                                               :opts opts
                                                               :result res
                                                               :loc loc
                                                               :line line})]
    (object/add-tags res-obj [:inline.doc])
    (object/update! this [:widgets] assoc [line :underline] res-obj)
    res-obj))

(behavior ::doc-menu+
          :triggers #{:menu+}
          :reaction (fn [this items]
                      (conj items
                            {:label "Toggle docs"
                             :order 0.1
                             :enabled (not (editor/selection? this))
                             :click (fn []
                                      (cmd/exec! :editor.doc.toggle))}
                            {:type "separator"
                             :order 0.2}
                            )))


(cmd/command {:command :editor.doc.toggle
              :desc "Docs: Toggle documentation at cursor"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (let [loc (editor/->cursor ed)]
                          (if-let [cur (doc-on-line? ed (:line loc))]
                            (remove! ed cur)
                            (object/raise ed :editor.doc)
                            )))
                      )})

(defui doc-ui [doc]
  [:div.inline-doc
   [:h1 (:name doc)]
   [:h2 (:ns doc)]
   (when (and (:args doc)
              (not= (:args doc) "nil"))
     [:h3 (:args doc)])
   (when (and (:labels doc)
              (not= (:labels doc) ""))
     [:h3 (str "[" (:labels doc) "]")])
   (when (and (:doc doc)
              (not= (:doc doc) "nil"))
     [:pre (:doc doc)])])

(defn- retrieve-behavior
  "Helper method for behavior `editor.doc.show!` to determine if the given `ns` and `name`
  match existing behaviors.

  Returns found behavior or `nil`."
  [ns name]
  (@object/behaviors (keyword (str ns "/" (subs name 2)))))

(defn- retrieve-object-def
  "Helper method for behavior `editor.doc.show!` to determine if the given `ns` and `name`
  match existing object defs. Not recommended to print whole object def... use destructuring.

  Returns found object def or `nil`."
  [ns name]
  (@object/object-defs (keyword (str ns "/" (subs name 2)))))

(defn- retrieve
  [ns name]
  (or (retrieve-behavior ns name)
      (retrieve-object-def ns name)))

(defn- retrieve-docstring
  "Helper method for behavior `editor.doc.show!` that returns the docstring for a matching
  object or behavior. If `:doc` is not found, then `:desc` is used. Otherwise `nil`."
  [ns name]
  (let [o (retrieve ns name)]
    (or (:doc o) (:desc o))))

(defn- retrieve-labels
  [ns name]
  (let [o (retrieve ns name)]
    (clojure.string/join ", " (map #(get %1 :label) (:params o [])))))

(behavior ::editor.doc.show!
          :triggers #{:editor.doc.show!}
          :reaction (fn [editor doc]
                      (when (not= (:name doc) "")
                        ;; If :file and :doc are nil then this is likely a behavior or object.
                        ;; Check if a match exists and splice the resulting :doc into the doc argument.
                        (let [doc (if (and (nil? (:file doc)) (nil? (:doc doc)))
                                    (merge doc {:doc (retrieve-docstring (:ns doc) (:name doc))
                                                :labels (retrieve-labels (:ns doc) (:name doc))})
                                    doc)]
                          (inline-doc editor (doc-ui doc) {} (:loc doc))))))

(defui search-item [item]
  [:li
   [:h2 (:name item)]
   [:h3 (:ns item)]
   [:pre (str (:args item))]
   [:pre (:doc item)]])

(defui search-input [this]
  [:input.search {:type "text" :placeholder "search docs"}]
  :focus (fn []
           (ctx/in! :sidebar.doc.search.input this))
  :blur (fn []
          (ctx/out! :sidebar.doc.search.input)))

(defui type-item [this i]
  [:li (:label i)]
  :click (fn []
           (object/raise this :set-item! i)))

(defui type-list [this]
  (let [types (object/raise-reduce this :types+ [])
        cur (or (:cur @this) (first types))]
    [:div.types
     [:span (:label cur)]
     [:ul.types
      (map (partial type-item this) types)]]))

(defui connect-button []
  [:button "Connect"]
  :click (fn []
           (cmd/exec! :show-add-connection)))

(defui no-client-ui [this]
  [:div.no-client
   [:p "There's no client for us to use to search for these kinds of docs. "]
   [:p (connect-button) " to one."]])

(defn try-trigger [this cur v]
  (let [cs (clients/discover* (:trigger cur))]
    (if-not (seq cs)
      (object/raise this :no-client)
      (do
        (when-let [nc (dom/$ :.no-client (object/->content this))]
          (dom/remove nc))
        (notifos/set-msg! "Searching for docs...")
        (doseq [c cs]
          (notifos/working)
          (clients/send c (:trigger cur) {:search v} :only this))))))

(defn ->val [this]
  (dom/val (dom/$ :input.search (object/->content this))))

(defn grouped-items [results v prev]
  (let [normal (dom/fragment [])
        exact (dom/fragment [])]
    (doseq [r results
            :when (not (prev r))]
      (if (str-contains? (str (:name r)) v)
        (dom/append exact (search-item r))
        (dom/append normal (search-item r))))
    {:normal normal
     :exact exact}))

(behavior ::set-item
          :triggers #{:set-item!}
          :reaction (fn [this i]
                      (object/merge! this {:cur i})
                      (object/raise this :clear!)
                      (dom/replace-with (dom/$ :.types (object/->content this)) (type-list this))
                      (object/raise this :focus!)))

(behavior ::clear!
          :triggers #{:clear!}
          :reaction (fn [this]
                      (dom/empty (dom/$ :.results (object/->content this)))
                      (object/merge! this {:results #{}})))

(behavior ::no-client
          :triggers #{:no-client}
          :reaction (fn [this]
                      (when-not (dom/$ :.no-client (object/->content this))
                        (dom/before (dom/$ :.results (object/->content this)) (no-client-ui this)))))

(behavior ::cur-from-last-editor
          :triggers #{:show}
          :reaction (fn [this]
                      (when-let [ed (pool/last-active)]
                        (let [ed-type (-> @ed :info :type-name)]
                          (when-not (-> @this :cur :file-types (get ed-type))
                            (when-let [neue (first (filter #(-> % :file-types (get ed-type))
                                                           (object/raise-reduce this :types+ [])))]
                              (object/raise this :set-item! neue)
                              ))))))

(behavior ::sidebar.doc.search.exec
          :triggers #{:sidebar.doc.search.exec}
          :reaction (fn [this]
                      (let [v (->val this)
                            trigger (-> @this :cur :trigger)]
                        (object/raise this :clear!)
                        (when-not (empty? v)
                          (if (fn? trigger)
                            (trigger v)
                            (try-trigger this (:cur @this) v))))))

(behavior ::doc.search.results
          :triggers #{:doc.search.results}
          :reaction (fn [this results]
                      (let [v (->val this)
                            {:keys [normal exact]} (grouped-items results v (:results @this))
                            old (dom/$ :.results (object/->content this))]
                        (object/merge! this {:results (into (:results @this) results)})
                        (notifos/done-working (str "Found " (count (:results @this)) " doc results."))
                        (dom/prepend old exact)
                        (dom/append old normal))))

(behavior ::focus-on-show
          :triggers #{:show}
          :reaction (fn [this]
                      (object/raise this :focus!)))

(behavior ::focus!
          :triggers #{:focus!}
          :reaction (fn [this]
                      (if-not (:active @this)
                        (let [input (dom/$ :input (object/->content this))]
                          (dom/focus input)
                          (.select input))
                        (object/raise (-> @this :active :options) :focus!))))

(object/object* ::sidebar.doc.search
                :tags #{:sidebar.docs.search}
                :label "Doc search"
                :init (fn [this]
                        (object/merge! this {:cur (first (object/raise-reduce this :types+ []))})
                        [:div.docs-search.filter-list
                         (search-input this)
                         (type-list this)
                         [:ul.results
                          ]]
                        ))

(def doc-search nil)

(cmd/command {:command :docs.search.exec
              :desc "Docs: Execute sidebar search"
              :hidden true
              :exec (fn []
                      (when doc-search
                        (object/raise doc-search :sidebar.doc.search.exec))
                      )})

(cmd/command {:command :docs.search.show
              :desc "Docs: Search language docs"
              :exec (fn [force?]
                      (when doc-search
                        (object/raise sidebar/rightbar :toggle doc-search {:force? force?}))
                      )})

(cmd/command {:command :docs.search.hide
              :desc "Docs: hide language docs"
              :hidden true
              :exec (fn [force?]
                      (when doc-search
                        (object/raise sidebar/rightbar :close!))
                      )})

(behavior ::init-doc-search
          :triggers #{:init}
          :reaction (fn [this]
                      (set! doc-search (object/create ::sidebar.doc.search))
                      (sidebar/add-item sidebar/rightbar doc-search)
                      ))
