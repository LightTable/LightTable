(ns lt.util.cljs
  (:refer-clojure :exclude [js->clj])
  (:require [clojure.string :as string]))

(set! *print-fn* (fn [x]
                   (when (and x (not= x "") (not= x "\n"))
                     (.log js/console (string/trim x)))))


;;NEEDED for latest CLJS
(extend-type cljs.core/ChunkedCons
  INext
  (-next [this] (-seq (-rest this))))

(extend-type nil
  ISeqable
  (-seq [coll] nil))

(extend-type cljs.core/RSeq
  INext
  (-next [this] (-seq (-rest this))))

(extend-type js/global.String
  IFn
  (-invoke
    ([this coll]
       (get coll (.toString this)))
    ([this coll not-found]
       (get coll (.toString this) not-found)))
  ISeqable
  (-seq [coll]
    (when (and coll (not (zero? (alength coll))))
                 (IndexedSeq. (js/String. coll) 0))))

(set! js/global.String.prototype.apply
  (fn
    [s args]
    (if (< (alength args) 2)
      (get (aget args 0) s)
      (get (aget args 0) s (aget args 1)))))


(extend-type js/global.Array
  ISeqable
  (-seq [coll]
    (when (and coll (not (zero? (alength coll))))
                 (IndexedSeq. coll 0))))


(defn ->dottedkw [& args]
  (keyword (string/join "." (map name (filter identity args)))))

(defn js->clj
  "Recursively transforms JavaScript arrays into ClojureScript
  vectors, and JavaScript objects into ClojureScript maps.  With
  option ':keywordize-keys true' will convert object fields from
  strings to keywords."
  ([x] (js->clj x {:keywordize-keys false}))
  ([x & opts]
    (cond
      (satisfies? IEncodeClojure x)
      (-js->clj x (apply array-map opts))

      (seq opts)
      (let [{:keys [keywordize-keys force-obj]} opts
            keyfn (if keywordize-keys keyword str)
            f (fn thisfn [x]
                (cond
                  (seq? x)
                  (doall (map thisfn x))

                  (coll? x)
                  (into (empty x) (map thisfn x))

                 (keyword? x)
                 x

                  (or (array? x)
                      (identical? (type x) js/global.Array))
                  (vec (map thisfn x))

                  (or force-obj
                      (identical? x (js/Object x))
                      (identical? (type x) js/Object)
                      (identical? (type x) js/global.Object))
                  (into {} (for [k (js-keys x)]
                             [(keyfn k) (thisfn (aget x k))]))

                  :else x))]
        (f x)))))

(defn clj->js
   "Recursively transforms ClojureScript values to JavaScript.
sets/vectors/lists become Arrays, Keywords and Symbol become Strings,
Maps become Objects. Arbitrary keys are encoded to by key->js."
   [x]
   (when-not (nil? x)
     (if (satisfies? IEncodeJS x)
       (-clj->js x)
       (cond
         (keyword? x) (name x)
         (symbol? x) (str x)
         (map? x) (let [m (js-obj)]
                    (doseq [[k v] x]
                      (aset m (key->js k) (clj->js v)))
                    m)
         (coll? x) (apply array (map clj->js x))
         :else x))))

(defn str-contains? [str x]
  (> (.indexOf str x) -1))

(defn index-of [e coll]
  (first (keep-indexed #(if (= e %2) %1) coll)))
