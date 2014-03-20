(ns lt.object
  (:refer-clojure :exclude [set!])
  (:require [crate.core :as crate]
            [clojure.set :as set]
            [clojure.string :as string]
            [crate.binding :refer [sub-swap! subatom sub-reset! deref?]]
            [lt.util.cljs :as cljs]
            [lt.util.dom :refer [replace-with] :as dom]
            [lt.util.js :refer [throttle debounce]])
  (:require-macros [lt.macros :refer [behavior with-time aloop]]))

(def obj-id (atom 0))
(def instances (atom (sorted-map)))
(def behaviors (atom {}))
(def object-defs (atom {}))
(def tags (atom {}))
(def negated-tags (atom {}))
(def ^{:dynamic true} *behavior-meta* nil)

(defn add [obj]
  (swap! object-defs assoc (::type obj) obj))

(defn add-behavior [beh]
  (swap! behaviors assoc (:name beh) beh))

(defn ->behavior-name [beh]
  (if (coll? beh)
    (first beh)
    beh))

(defn ->behavior [beh]
  (@behaviors (->behavior-name beh)))

(defn ->triggers [behs]
  (let [result (atom (transient {}))]
    (doseq [beh behs
            t (:triggers (->behavior beh))]
      (swap! result assoc! t (conj (or (get @result t) []) beh)))
    (persistent! @result)))

(defn specificity-sort [xs dir]
  (let [arr #js []]
    (doseq [x xs]
      (.push arr #js [(.-length (.split (str x) ".")) (str x) x]))
    (.sort arr)
    (when-not dir (.reverse arr))
    (aloop [i arr] (aset arr i (aget arr i 2)))
    arr))

(defn ts->negations [ts]
  (let [seen (js-obj)]
    (doseq [beh (apply concat (map @negated-tags ts))]
      (aset seen (->behavior-name beh) true))
    seen))

(defn tags->behaviors [ts]
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

(defn trigger->behaviors [trig ts]
  (get (->triggers (tags->behaviors ts)) trig))

(defn update-listeners [obj instants]
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
    (assoc @obj :listeners trigs)))

(defn make-object* [name & r]
  (let [obj (merge {:behaviors #{} :tags #{} :triggers [] :listeners {} ::type name :children {}}
                   (apply hash-map r))]
    obj))

(defn store-object* [obj]
  (add obj)
  obj)

(defn instances-by-type [type]
  (filter #(= type (::type (deref %))) (vals @instances)))

(defn handle-redef [odef]
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

(defn object* [name & r]
  (-> (apply make-object* name r)
      (store-object*)
      (handle-redef)))

(defn make-behavior* [name & r]
  (let [be (merge {:name name}
                  (apply hash-map r))]
    be))

(defn store-behavior* [beh]
  (add-behavior beh)
  (:name beh))

(defn wrap-throttle [beh]
  (if-let [thr (:throttle beh)]
    (assoc beh :reaction (throttle thr (:reaction beh)))
    beh))

(defn wrap-debounce [beh]
  (if-let [thr (:debounce beh)]
    (assoc beh :reaction (debounce thr (:reaction beh)))
    beh))

(defn behavior* [name & r]
  (-> (apply make-behavior* name r)
      (wrap-throttle)
      (wrap-debounce)
      (store-behavior*)))

(defn safe-report-error [e]
  (if js/lt.objs.console
    (js/lt.objs.console.error e)
    (.error js/console (if (string? e)
                         e
                         (.-stack e)))))

(defn raise* [obj reactions args trigger]
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
      (catch js/Error e
        (safe-report-error (str "Invalid behavior: " (-> (->behavior r) :name)))
        (safe-report-error e)
        )
      (catch js/global.Error e
        (safe-report-error (str "Invalid behavior: " (-> (->behavior r) :name)))
        (safe-report-error e)
        ))))

(defn raise [obj k & args]
  (let [reactions (-> @obj :listeners k)]
    (raise* obj reactions args k)))

(defn raise-reduce [obj k start & args]
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

(defn merge! [obj m]
  (when (and m (not (map? m)))
    (throw (js/Error. (str "Merge requires a map: " m))))
  (swap! obj merge m))

(defn update! [obj & r]
  (swap! obj #(apply update-in % r)))

(defn assoc-in! [obj k v]
  (when (and k (not (sequential? k)))
    (throw (js/Error. (str "Associate requires a sequence of keys: " k))))
  (swap! obj #(assoc-in % k v)))

(defn ->id [obj]
  (if (deref? obj)
    (::id @obj)
    (::id obj)))

(defn ->inst [o]
  (cond
   (map? o) (@instances (->id o))
   (deref? o) o
   :else (@instances o)))

(defn destroy! [obj]
  (when-let [inst (->inst obj)]
    (raise inst :destroy)
    (swap! instances dissoc (->id inst))
    (when (->content obj)
      (dom/remove (->content obj)))
    (reset! obj nil)))

(defn store-inst [inst]
  (swap! instances assoc (::id @inst) inst)
  inst)

(defn create [obj-name & args]
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

(defn refresh! [obj]
  (reset! obj (update-listeners obj))
  (raise* obj (trigger->behaviors :object.instant (:tags @obj)) nil)
  (raise obj :object.refresh))

(defn add-behavior! [obj behavior]
  (update! obj [:behaviors] conj behavior)
  (reset! obj (update-listeners obj)))

(defn rem-behavior! [obj behavior]
  (update! obj [:behaviors] #(remove #{behavior} %))
  (reset! obj (update-listeners obj)))

(defn ->def [def|name]
  (if (map? def|name)
    def|name
    (@object-defs def|name)))

(defn ->content [obj]
  (:content @obj))

(defn by-id [id]
  (when id
    (@instances id)))

(defn by-tag [tag]
  (sort-by (comp ::id deref)
           (filter #(when-let [ts (:tags (deref %))]
                      (ts tag))
                   (vals @instances))))

(defn in-tag? [tag behavior]
  (first (filter #{behavior} (@tags tag))))

(defn has-tag? [obj tag]
  ((:tags @obj) tag))

(defn add-tags [obj ts]
  (update! obj [:tags] #(reduce conj % (filter identity ts)))
  (reset! obj (update-listeners obj))
  (raise obj ::tags-added ts)
  (raise* obj (trigger->behaviors :object.instant ts) nil)
  obj)

(defn remove-tags [obj ts]
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

(defn tag-behaviors [tag behs]
  (swap! tags update-in [tag] #(reduce conj
                                       (or % '())
                                       behs))
  (doseq [cur (by-tag tag)]
    (refresh! cur))
  (@tags tag))

(defn remove-tag-behaviors [tag behs]
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
