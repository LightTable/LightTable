(ns crate.binding (:require [clojure.set :as set]))

;;*********************************************************
;; subatom
;;*********************************************************

(deftype SubAtom [atm path prevhash watches key]

  IEquiv
  (-equiv [o other] (identical? o other))

  IDeref
  (-deref [_] (when atm (get-in @atm path)))

  IPrintWithWriter
  (-pr-writer [this writer opts]
    (-write writer (str "#<SubAtom: " (pr-str (get-in @atm path)) ">")))

  IWatchable
  (-notify-watches [this oldval newval]
    (doseq [[key f] watches]
      (f key this oldval newval)))
  (-add-watch [this key f]
    (when f
      (set! (.-watches this) (assoc watches key f))))
  (-remove-watch [this key]
    (set! (.-watches this) (dissoc watches key)))

  IHash
  (-hash [this] (goog.getUid this)))

(defn subatom
  ([atm path]
   (let [path (if (coll? path)
                path
                [path])
         [atm path] (if (instance? SubAtom atm)
                      [(.-atm atm) (concat (.-path atm) path)]
                      [atm path])
         k (gensym "subatom")
         sa (SubAtom. atm path (hash (get-in @atm path)) nil k)]
     (add-watch atm k
                (fn [_ _ ov nv]
                  (let [latest (get-in nv path)
                        prev (get-in ov path)
                        latest-hash (hash latest)]
                    (when (and (not= (.-prevhash sa) latest-hash)
                               ;;TODO: How is it possible that the hashes are different
                               ;;when the items are the same? This seems like a CLJS bug.
                               (not= prev latest))
                      (set! (.-prevhash sa) latest-hash)
                      (-notify-watches sa (get-in ov path) latest)))))
     sa)))

(defn sub-reset!
  "Sets the value of atom to newval without regard for the
  current value. Returns newval."
  [sa new-value]
  (swap! (.-atm sa) assoc-in (.-path sa) new-value)
  new-value)

(defn sub-swap!
  "Atomically swaps the value of atom to be:
  (apply f current-value-of-atom args). Note that f may be called
  multiple times, and thus should be free of side effects.  Returns
  the value that was swapped in."
  ([sa f]
     (sub-reset! sa (f @sa)))
  ([sa f x]
     (sub-reset! sa (f @sa x)))
  ([sa f x y]
     (sub-reset! sa (f @sa x y)))
  ([sa f x y z]
     (sub-reset! sa (f @sa x y z)))
  ([sa f x y z & more]
     (sub-reset! sa (apply f @sa x y z more))))

(defn sub-destroy! [sa]
  (remove-watch (.-atm sa) (.-key sa))
  (set! (.-watches sa) nil)
  (set! (.-atm sa) nil))

;;*********************************************************
;; computed
;;*********************************************************

(defprotocol computable
  (-depend [this atm] "depend on an atom")
  (-compute [this] "compute the latest value"))

(deftype Computed [atms value func watches key meta]

  IEquiv
  (-equiv [o other] (identical? o other))

  IDeref
  (-deref [_] value)

  IPrintWithWriter
  (-pr-writer [this writer opts]
    (-write writer (str "#<Computed: " (pr-str value) ">")))

  IWatchable
  (-notify-watches [this oldval newval]
    (doseq [[key f] watches]
      (f key this oldval newval)))
  (-add-watch [this key f]
    (when f
      (set! (.-watches this) (assoc watches key f))))
  (-remove-watch [this key]
    (set! (.-watches this) (dissoc watches key)))

  IHash
  (-hash [this] (goog.getUid this))

  IMeta
  (-meta [this] meta)

  computable
  (-depend [this atm]
           (set! (.-atms this) (conj (.-atms this) atm))
           (add-watch atm key (fn [_ _ _ _]
                                (-compute this))))
  (-compute [this]
            (let [old (.-value this)
                  nv (apply func (map deref atms))]
              (set! (.-value this) nv)
              (-notify-watches this old nv)
            )))

(defn computed [atms func]
   (let [k (gensym "computed")
         neue (Computed. [] nil func nil k nil)]
     (-compute neue)
     (doseq [atm atms]
       (-depend neue atm))
     neue))

(defn compute [compu]
  (-compute compu))

(defn depend-on [compu atm]
  (-depend compu atm))

;;*********************************************************
;;rest
;;*********************************************************

(defn notify [w o v]
  (-notify-watches w o v))

(defprotocol bindable-coll)

(defprotocol bindable
  (-value [this] "get the current value of this binding")
  (-on-change [this func] "On change of this binding execute func"))

(deftype atom-binding [atm value-func]
  bindable
  (-value [this] (value-func @atm))
  (-on-change [this func]
    (add-watch atm (gensym "atom-binding") #(func (-value this)))))

(deftype notifier [watches]
  IWatchable
  (-notify-watches [this oldval newval]
    (doseq [[key f] watches]
      (f key this oldval newval)))
  (-add-watch [this key f]
    (set! (.-watches this) (assoc watches key f)))
  (-remove-watch [this key]
    (set! (.-watches this) (dissoc watches key))))

(deftype bound-collection [atm notif opts stuff]
  bindable-coll
  bindable
  (-value [this] (map :elem (vals (.-stuff this))))
  (-on-change [this func]
    (add-watch notif
               (gensym "bound-coll")
               (fn [_ _ _ [event el v]]
                 (func event el v)))))

(defn opt [bc k]
  ((.-opts bc) k))

(defn- bc-add [bc path key]
  (let [sa (subatom (.-atm bc) path)
        elem ((opt bc :as) sa)]
    (set! (.-stuff bc) (assoc (.-stuff bc) key {:elem elem
                                                :subatom sa}))
    (notify (.-notif bc) nil [:add elem @sa])))

(defn- bc-remove [bc key]
  (let [notif (.-notif bc)
        prev  ((.-stuff bc) key)]
    (set! (.-stuff bc) (dissoc (.-stuff bc) key))
    (notify (.-notif bc) nil [:remove (:elem prev) nil])
    (sub-destroy! (:subatom prev))))

(defn ->indexed [coll]
  (cond
    (map? coll) (seq coll)
    (set? coll) (map (juxt identity identity) coll)
    :else (map-indexed vector coll)))

(defn ->keyed [coll keyfn]
  (into #{} (map keyfn (->indexed coll))))

(defn ->path [bc & segs]
  (concat (or (opt bc :path) []) segs))

(defn- bc-compare [bc neue]
  (let [prev (.-stuff bc)
        pset (into #{} (keys prev))
        nset (->keyed neue (opt bc :keyfn))
        added (into (sorted-set) (set/difference nset pset))
        removed (into (sorted-set) (set/difference pset nset))]
    (doseq [a added]
      (bc-add bc a a))
    (doseq [r removed]
      (bc-remove bc r))))

(defn bound-coll [atm & [path opts]]
  (let [[path opts] (if opts
                      [path opts]
                      [nil path])
        atm (if-not path
              atm
              (subatom atm path))
        opts (assoc opts :path path)
        opts (if-not (:keyfn opts)
               (assoc opts :keyfn first)
               (assoc opts :keyfn (comp (:keyfn opts) second)))
        bc (bound-collection. atm (notifier. nil) opts (sorted-map))]
    (add-watch atm (gensym "bound-coll") (fn [_ _ _ neue]
                                           (bc-compare bc neue)))
    (bc-compare bc @atm)
    bc))

(defn map-bound [as atm & [opts]]
  (let [opts (assoc opts :as as)
        atm (if-not (:path opts)
              atm
              (subatom atm (:path opts)))
        opts (if-not (:keyfn opts)
               (assoc opts :keyfn first)
               (assoc opts :keyfn (comp (:keyfn opts) second)))
        bc (bound-collection. atm (notifier. nil) opts (sorted-map))]
    (add-watch atm (gensym "bound-coll") (fn [_ _ _ neue]
                                           (bc-compare bc neue)))
    (bc-compare bc @atm)
    bc))

(defn binding? [b]
  (satisfies? bindable b))

(defn binding-coll? [b]
  (satisfies? bindable-coll b))

(defn deref? [atm]
  (satisfies? IDeref atm))

(defn value [b]
  (-value b))

(defn index [sub-atom]
  (last (.-path sub-atom)))

(defn on-change [b func]
  (-on-change b func))

(defn bound [atm & [func]]
  (let [func (or func identity)]
    (atom-binding. atm func)))
