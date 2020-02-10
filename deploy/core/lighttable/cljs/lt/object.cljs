(ns lt.object
  "Define core of BOT architecture and provide fns for manipulating objects,
  behaviors and tags"
  (:refer-clojure :exclude [set!])
  (:require [crate.core :as crate]
            [clojure.set :as set]
            [clojure.string :as string]
            [crate.binding :refer [sub-swap! subatom sub-reset! deref?]]
            [lt.util.cljs :as cljs]
            [lt.util.dom :refer [replace-with] :as dom]
            [lt.util.js :refer [throttle debounce]])
  (:require-macros [lt.macros :refer [behavior with-time aloop]]))

;; HEART of BOT Architecture!
(def ^:private obj-id
  "Counter to guarantee unique object ids"
  (atom 0))

(def ^:private instances
  "Map of object ids to objects created by object/create"
  (atom (sorted-map)))

(def ^:private behaviors
  "Map of behavior names to behaviors created by macros/behavior"
  (atom {}))

(def ^:private object-defs
  "Map of object template keys to template maps created by object/object*"
  (atom {}))

(def ^:private tags
  "Map of tags to associated lists of behaviors"
  (atom {}))

(def ^:private negated-tags
  "Map of tags to dissociated lists of behaviors e.g. :-behavior"
  (atom {}))

(def ^{:dynamic true} *behavior-meta*
  "Metadata of current behavior set during raise and raise-reduce"
  nil)

(defn- add [obj]
  (swap! object-defs assoc (::type obj) obj))

(defn- add-behavior [beh]
  (swap! behaviors assoc (:name beh) beh))

(defn ->id
  "Return id of given object"
  [obj]
  (if (deref? obj)
    (::id @obj)
    (::id obj)))

(defn- ->behavior-name [beh]
  (if (coll? beh)
    (first beh)
    beh))

(defn- ->behavior [beh]
  (@behaviors (->behavior-name beh)))

(defn- ->triggers [behs]
  (let [result (atom (transient {}))]
    (doseq [beh behs
            t (:triggers (->behavior beh))]
      (swap! result assoc! t (conj (or (get @result t) '[]) beh)))
    (persistent! @result)))

(defn- specificity-sort
  ([xs] (specificity-sort xs nil))
  ([xs dir]
   (let [arr #js []]
     (doseq [x xs]
       (.push arr #js [(.-length (.split (str x) ".")) (str x) x]))
     (.sort arr)
     (when-not dir (.reverse arr))
     (aloop [i arr] (aset arr i (aget arr i 2)))
     arr)))

(defn- ts->negations [ts]
  (let [seen (js-obj)]
    (doseq [beh (apply concat (map @negated-tags ts))]
      (aset seen (->behavior-name beh) true))
    seen))

(defn- tags->behaviors [ts]
  (let [duped (apply concat (map @tags (specificity-sort ts)))
        de-duped (reduce
                   (fn [res cur]
                     (if (aget (:seen res) (->behavior-name cur))
                       res
                       (let [beh (->behavior cur)]
                         (when (:exclusive beh)
                           (when (coll? (:exclusive beh))
                             (doseq [exclude (:exclusive beh)]
                               (aset (:seen res) exclude true)))
                           (aset (:seen res) (->behavior-name cur) true))
                         (conj! (:final res) cur)
                         res)))
                   {:seen (ts->negations ts)
                    :final (transient [])}
                   duped)]
    (reverse (persistent! (:final de-duped)))))

(defn- trigger->behaviors [trig ts]
  (get (->triggers (tags->behaviors ts)) trig))

(defn safe-report-error [e]
  ;; This check is necessary because this can be called before
  ;; the console ns has been loaded
  (if js/lt.objs.console
    (js/lt.objs.console.error e)
    (.error js/console (if (string? e)
                         e
                         (.-stack e)))))

(declare raise)

(defn- raise*
  ([obj reactions args] (raise* obj reactions args nil))
  ([obj reactions args trigger]
   (doseq [r reactions
           :let [func (:reaction (->behavior r))
                 args (if (coll? r)
                        (concat (rest r) args)
                        args)
                 meta (if (coll? r)
                        (meta r)
                        {})]
           :when func]
     (try
     (with-time
       (binding [*behavior-meta* meta]
         (apply func obj args))
       (when-not (= trigger :object.behavior.time)
         (raise obj :object.behavior.time r time trigger)))
       (catch :default e
         (safe-report-error (str "Invalid behavior: " (-> (->behavior r) :name)))
         (safe-report-error e))))))

(defn raise
  "Invoke object's behavior fns for given trigger. Args are passed to behavior fns"
  [obj k & args]
  (let [reactions (-> @obj :listeners k)]
    (raise* obj reactions args k)))

(defn call-behavior-reaction
  "For a given behavior keyword id, call its :reaction fn with given args"
  [id & args]
  (let [behavior-fn (:reaction (->behavior id))]
    (assert behavior-fn)
    (apply behavior-fn args)))

(defn- update-listeners
  ([obj] (update-listeners obj nil))
  ([obj instants]
   (let [cur @obj
         behs (set (concat (:behaviors cur) (tags->behaviors (:tags cur))))
         trigs (->triggers behs)
         ;;We need to load new JS files here because they may define the behaviors that we're meant to
         ;;capture. If we have a load, then load and recalculate the triggers to pick up those newly
         ;;defined behaviors
         trigs (if (:object.instant-load trigs)
                 (do
                   (raise* obj (:object.instant-load trigs) nil :object.instant-load)
                   (->triggers behs))
                 trigs)
         trigs (if instants
                 trigs
                 (dissoc trigs :object.instant :object.instant-load))]
     ;;deref again in case :object.instant-load made any updates
     (assoc @obj :listeners trigs))))

(defn- make-object* [name & r]
  (let [obj (merge {:behaviors #{} :tags #{} :triggers [] :listeners {} ::type name :children {}}
                   (apply hash-map r))]
    obj))

(defn- store-object* [obj]
  (add obj)
  obj)

(defn instances-by-type
  "Return all objects for given type (template name)"
  [type]
  (filter #(= type (::type (deref %))) (vals @instances)))

(defn merge!
  "Merge map into object"
  [obj m]
  (when (and m (not (map? m)))
    (throw (js/Error. (str "Merge requires a map: " m))))
  (swap! obj merge m))

(defn- handle-redef [odef]
  (let [id (::type odef)]
    (doseq [o (instances-by-type id)
            :let [o (deref o)
                  args (:args o)
                  old (:content o)
                  behs (set (:behaviors o))
                  inst (@instances (->id o))
                  neue (when (:init odef)
                         (apply (:init odef) inst args))
                  neue (if (vector? neue)
                         (crate/html neue)
                         neue)]]
      (merge! inst {:tags (set/union (:tags o) (:tags odef))
                                      :behaviors (set/union behs (set (:behaviors odef)))
                                      :content neue})
      (merge! inst (update-listeners inst))
      (when (and old neue)
        (replace-with old neue))
      (raise inst :redef))
    id))

(defn object*
  "Create object template (type) given keyword name and key-value pairs.
  These pairs serve as default attributes for an object. Following keys
  have special meaning:

  * :behaviors - Set of object's behaviors
  * :tags - Set of object's tags
  * :triggers - Set of object's triggers
  * :init - Init fn called when object is created. Fn's return value
            is hiccup html content and saved to :content
  * :listeners (internal) - Map of triggers to vectors of behaviors
  * :doc - Equivalent to a traditional function docstring."
  [name & r]
  (-> (apply make-object* name r)
      (store-object*)
      (handle-redef)))

(defn- make-behavior* [name & r]
  (let [be (merge {:name name}
                  (apply hash-map r))]
    be))

(defn- store-behavior* [beh]
  (add-behavior beh)
  (:name beh))

(defn- wrap-throttle [beh]
  (if-let [thr (:throttle beh)]
    (assoc beh :reaction (throttle thr (:reaction beh)))
    beh))

(defn- wrap-debounce [beh]
  (if-let [thr (:debounce beh)]
    (assoc beh :reaction (debounce thr (:reaction beh)))
    beh))

(defn- behavior* [name & r]
  (-> (apply make-behavior* name r)
      (wrap-throttle)
      (wrap-debounce)
      (store-behavior*)))

(defn raise-reduce
  "Reduce over invoked object's behavior fns for given trigger. Start
  is initial value for reduce and any args are passed to behavior fn"
  [obj k start & args]
  (let [reactions (-> @obj :listeners k)]
    (reduce (fn [res cur]
              (let [func (:reaction (->behavior cur))
                    args (if (coll? cur)
                           (concat (rest cur) args)
                           args)
                    meta (if (coll? cur)
                           (meta cur)
                           {})]
                (if-not func
                  res
                  (binding [*behavior-meta* meta]
                    (apply func obj res args)))))
            start
            reactions)))

(declare create)

(defn update!
  "Update object with update-in with [:key], fn and args"
  [obj & r]
  (swap! obj #(apply update-in % r)))

(defn assoc-in!
  "Update object with assoc-in for given key and value"
  [obj k v]
  (when (and k (not (sequential? k)))
    (throw (js/Error. (str "Associate requires a sequence of keys: " k))))
  (swap! obj #(assoc-in % k v)))

(defn- ->inst [o]
  (cond
   (map? o) (@instances (->id o))
   (deref? o) o
   :else (@instances o)))

(defn ->content
  "Return DOM content associated with object"
  [obj]
  (:content @obj))

(defn destroy!
  "Destroy object by calling its :destroy trigger, removing it from
  cache and removing associated DOM content"
  [obj]
  (when-let [inst (->inst obj)]
    (raise inst :destroy)
    (swap! instances dissoc (->id inst))
    (when (->content obj)
      (dom/remove (->content obj)))
    (reset! obj nil)))

(defn- store-inst [inst]
  (swap! instances assoc (::id @inst) inst)
  inst)

(defn create
  "Create object given keyword name of object template or an object template
  and key-value pairs. See object* for special keys.
  During object creation the following happens to object in order:

  * :init fn is called with given args
  * :object.instant trigger is raised
  * :init trigger is raised"
  [obj-name & args]
  (let [obj (if (keyword? obj-name)
              (@object-defs obj-name)
              obj-name)
        id (or (::id obj) (swap! obj-id inc))
        inst (atom (assoc (dissoc obj :init)
                     ::id id
                     :args args
                     :behaviors (set (:behaviors obj))
                     :tags (set (conj (:tags obj) :object))))
        inst (store-inst inst)
        _ (merge! inst (update-listeners inst))
        content (when (:init obj)
                  (apply (:init obj) inst args))
        content (if (vector? content)
                  (crate/html content)
                  content)
        final (merge! inst {:content content})]

    (add-watch inst ::change (fn [_ _ _ _]
                               (raise inst :object.change)))
    (raise* inst (trigger->behaviors :object.instant (:tags @inst)) nil)
    (raise inst :init)
    inst))

(defn- refresh! [obj]
  (reset! obj (update-listeners obj))
  (raise* obj (trigger->behaviors :object.instant (:tags @obj)) nil)
  (raise obj :object.refresh))

(defn add-behavior!
  "Add behavior to object and update its listeners"
  [obj behavior]
  (update! obj [:behaviors] conj behavior)
  (reset! obj (update-listeners obj)))

(defn rem-behavior!
  "Remove behavior from object and update its listeners"
  [obj behavior]
  (update! obj [:behaviors] #(remove #{behavior} %))
  (reset! obj (update-listeners obj)))

(defn- ->def [def|name]
  (if (map? def|name)
    def|name
    (@object-defs def|name)))

(defn by-id
  "Find object by its unique numerical id"
  [id]
  (when id
    (@instances id)))

(defn by-tag
  "Find objects that have given tag"
  [tag]
  (sort-by (comp ::id deref)
           (filter #(when-let [ts (:tags (deref %))]
                      (ts tag))
                   (vals @instances))))

(defn- in-tag? [tag behavior]
  (first (filter #{behavior} (@tags tag))))

(defn has-tag?
  "Return truthy if object has tag"
  [obj tag]
  ((:tags @obj) tag))

(defn add-tags
  "Add tags to given object and updates effected behaviors and listeners.
  ::tags-added trigger is raised on object after update"
  [obj ts]
  (update! obj [:tags] #(reduce conj % (filter identity ts)))
  (reset! obj (update-listeners obj))
  (raise obj ::tags-added ts)
  (raise* obj (trigger->behaviors :object.instant ts) nil)
  obj)

(defn remove-tags
  "Remove tags from given object and updates effected behaviors and listeners.
  ::tags-removed trigger is raised on object after update"
  [obj ts]
  (let [cur @obj
        behs (apply concat (map @tags ts))
        cur (-> cur
                (update-in [:tags] #(reduce disj % ts))
                (update-in [:behaviors] #(remove #{behs} %))
                (update-in [:listeners] #(apply dissoc % ts)))]
    (merge! obj cur)
    (reset! obj (update-listeners obj))
    (raise obj ::tags-removed ts)
    obj))

(defn tag-behaviors
  "Associate behaviors to given tag and refresh objects with given tag"
  [tag behs]
  (swap! tags update-in [tag] #(reduce conj
                                       (or % '())
                                       behs))
  (doseq [cur (by-tag tag)]
    (refresh! cur))
  (@tags tag))

(defn- remove-tag-behaviors [tag behs]
  (swap! tags update-in [tag] #(remove (set behs) (or % '())))
  (doseq [cur (by-tag tag)
          b behs]
    (rem-behavior! cur b)))

(behavior ::add-tag
          :desc "App: Add tag to object"
          :params [{:label "tag"}]
          :type :user
          :triggers #{:object.instant}
          :reaction (fn [this t]
                      (when t
                        (add-tags this (if (coll? t)
                                         t
                                         [t])))))

(behavior ::remove-tag
          :desc "App: Remove tag from object"
          :params [{:label "tag"}]
          :type :user
          :triggers #{:object.instant ::tags-added}
          :reaction (fn [this t]
                      (when (has-tag? this t)
                        (remove-tags this (if (coll? t)
                                            t
                                            [t])))))

(behavior ::shadow-tag
          :desc "App: Shadow a tag on an object"
          :params [{:label "tag to shadow"}
                   {:label "tag to add"}]
          :type :user
          :triggers #{:object.instant ::tags-added ::tags-removed}
          :reaction (fn [this to-shadow to-add]
                      (let [has-shadow? (has-tag? this to-shadow)
                            has-add? (has-tag? this to-add)]
                        (cond
                         (and has-shadow? (not has-add?)) (add-tags this [to-add])
                         (and (not has-shadow?) has-add?) (remove-tags this [to-add])
                         :else nil))))

(behavior ::report-time
          :triggers #{:object.behavior.time}
          :reaction (fn [this beh time trigger]
                      (when js/lt.objs.console
                        (js/lt.objs.console.log (str beh " triggered by "
                                                     trigger " took "
                                                     time "ms")))))
