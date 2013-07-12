(ns lt.object
  (:refer-clojure :exclude [set!])
  (:require [crate.core :as crate]
            [clojure.set :as set]
            [clojure.string :as string]
            [lt.util.cljs :as cljs]
            [lt.util.dom :refer [replace-with] :as dom]
            [lt.util.js :refer [throttle debounce]])
  (:use [crate.binding :only [sub-swap! subatom sub-reset! deref?]]))

(def obj-id (atom 0))
(def instances (atom (sorted-map)))
(def behaviors (atom {}))
(def object-defs (atom {}))
(def tags (atom {}))

(defn add [obj]
  (swap! object-defs assoc (::type obj) obj))

(defn add-b [obj]
  (swap! behaviors assoc (:name obj) obj))

(defn ->behavior-name [be]
  (if (coll? be)
    (first be)
    be))

(defn ->behavior [be]
  (@behaviors (->behavior-name be)))

(defn ->triggers [behs]
  (let [listeners (reduce
                   (fn [res be]
                     (merge-with concat
                                 res
                                 (into {}
                                       (for [t (:triggers (->behavior be))]
                                         [t [be]]))))
                   {}
                   behs)]
    listeners))

(defn specificity-sort [xs dir]
  (sort-by #(do [(count (string/split "." %)) %]) (if dir < >) xs))

(defn tags->behaviors [ts]
  (let [duped (apply concat (map @tags (specificity-sort ts :down)))
        de-duped (reduce
                   (fn [res cur]
                     (if (aget (:seen res) (->behavior-name cur))
                       res
                       (do
                         (when (:exclusive (->behavior cur))
                           (aset (:seen res) (->behavior-name cur) true))
                         (conj! (:final res) cur)
                         res)))
                   {:seen (js-obj)
                    :final (transient [])}
                   duped)]
    (reverse (persistent! (:final de-duped)))))

(defn trigger->behaviors [trig ts]
  (get (->triggers (tags->behaviors ts)) trig))

(defn update-listeners [obj instants]
  (let [cur @obj
        behs (set (concat (:behaviors cur) (tags->behaviors (:tags cur))))
        trigs (->triggers behs)
        trigs (if instants
                trigs
                (dissoc trigs :object.instant))]
    (assoc cur :listeners trigs)))

(defn make-object* [name & r]
  (let [obj (merge {:behaviors #{} :tags #{} :triggers [] :listeners {} ::type name :children {}}
                   (apply hash-map r))]
    obj))

(defn store-object* [obj]
  (add obj)
  obj)

(defn set-content! [obj neue]
  (let [old (->content obj)]
    (merge! this {:content neue})
    (when old
      (replace-with old neue))))

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
      (when neue
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
  (add-b beh)
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

(defn raise* [obj reactions args]
  (doseq [r reactions
          :let [func (:reaction (->behavior r))
                args (if (coll? r)
                       (concat (rest r) args)
                       args)]
          :when func]
    (apply func obj args)))

(defn raise [obj k & args]
  (let [reactions (-> @obj :listeners k)]
    (raise* obj reactions args)))

(defn raise-reduce [obj k start & args]
  (let [reactions (-> @obj :listeners k)]
    (reduce (fn [res cur]
              (let [func (:reaction (->behavior cur))
                    args (if (coll? r)
                           (concat (rest cur) args)
                           args)]
                (if-not func
                  res
                  (apply func obj res args))))
            start
            reactions)))

(declare create)

(defn ->sub-objects [parent obj-map]
  (into {}
        (for [[k v] obj-map]
          (if-not (= parent v)
            [k (create v)]
            (throw (js/Error. "Recursive sub-objects are not allowed"))))))

(defn merge! [obj m]
  (when (and m (not (map? m)))
    (throw (js/Error. (str "Merge requires a map: " m))))
  (swap! obj merge m))

(defn update! [obj & r]
  (swap! obj #(apply update-in % r)))

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
        content (when (:init obj)
                  (apply (:init obj) inst args))
        content (if (vector? content)
                  (crate/html content)
                  content)
        final (merge! inst {:content content})]
    (merge! inst (update-listeners inst))
    (add-watch inst ::change (fn [_ _ _ _]
                               (raise inst :object.change)))
    (raise* inst (trigger->behaviors :object.instant (:tags @inst)) nil)
    (raise inst :init)
    inst))

(defn refresh! [obj]
  (reset! obj (update-listeners obj))
  (raise* obj (trigger->behaviors :object.instant (:tags @obj)) nil))

(defn ->def [obj]
  (@object-defs (::type @obj)))

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

(defn parent! [p child & [name]]
  (update! p [:children] assoc (or name (::id @child)) child)
  (merge! child {:parent (->id p)}))

(defn parent [child]
  (@instances (:parent @child)))

(defn child [obj k]
  ((:children @obj) k))

(defn ->content [obj]
  (:content @obj))

(defn by-type [type]
  (instances-by-type type))

(defn by-id [id]
  (@instances id))

(defn instances-by-type [type]
  (filter #(= type (::type (deref %))) (vals @instances)))

(defn by-tag [tag]
  (filter #(when-let [ts (:tags (deref %))]
             (ts tag))
          (vals @instances)))

(defn in-tag? [tag behavior]
  (first (filter #{behavior} (@tags tag))))

(defn has-tag? [obj tag]
  ((:tags @obj) tag))

(defn add-tags [obj ts]
  (update! obj [:tags] #(reduce conj % ts))
  (reset! obj (update-listeners obj))
  (raise obj ::tags-added ts)
  (raise* obj (trigger->behaviors :object.instant ts) nil)
  obj)

(defn remove-tags [obj ts]
  (let [cur @obj
        behs (apply concat (map @tags ts))
        cur (-> cur
                (update-in [:tags] #(reduce disj % ts))
                (update-in [:behaviors] #(-> (remove #{behs} %) (vec)))
                (update-in [:listeners] #(apply dissoc % ts)))]
    (merge! obj cur)
    (reset! obj (update-listeners obj))
    (raise obj ::tags-removed ts)
    obj))

(defn tag-behaviors [tag behs]
  (swap! tags update-in [tag] #(reduce conj
                                       (or % #{})
                                       behs))
  (doseq [cur (by-tag tag)]
    (refresh! cur))
  (@tags tag))

(defn remove-tag-behaviors [tag behs]
  (swap! tags update-in [tag] #(-> (remove (set behs) (or % #{}))
                                   vec))
  (doseq [cur (by-tag tag)
          b behs]
    (rem-behavior! cur b)))

(defn on-change [obj func]
  (add-watch obj (gensym change) (fn [_ _ _ v]
                                   (func v))))

(behavior* ::add-tag
           :triggers #{:object.instant}
           :reaction (fn [this & ts]
                       (add-tags this ts)))
