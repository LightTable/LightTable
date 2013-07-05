(ns lt.util.cljs
  (:refer-clojure :exclude [js->clj])
  (:require [clojure.string :as string]))

(set! *print-fn* (fn [x]
                   (when (and x (not= x "") (not= x "\n"))
                     (.log js/console (string/trim x)))))

(comment
;;NEEDED for latest CLJS
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
  )

(defn ->dottedkw [& args]
  (keyword (string/join "." (map name (filter identity args)))))

(defn js->clj
  "Recursively transforms JavaScript arrays into ClojureScript
  vectors, and JavaScript objects into ClojureScript maps.  With
  option ':keywordize-keys true' will convert object fields from
  strings to keywords."
  [x & options]
  (let [{:keys [keywordize-keys force-obj obj-type]} options
        keyfn (if keywordize-keys keyword str)
        f (fn thisfn [x]
            (cond
              (seq? x) (doall (map thisfn x))
              (coll? x) (into (empty x) (map thisfn x))
              (goog.isArray x) (vec (map thisfn x))
              (or force-obj
                  (identical? x (js/Object x))
                  (identical? (type x) js/Object)
                  (identical? (type x) js/global.Object)) (into {} (for [k (js-keys x)]
                                                                     [(keyfn k)
                                                                      (thisfn (aget x k))]))
              :else x))]
    (f x)))

(defn clj->js
  "Recursively transforms ClojureScript maps into Javascript objects,
   other ClojureScript colls into JavaScript arrays, and ClojureScript
   keywords into JavaScript strings."
  [x]
  (cond
    (string? x) x
    (keyword? x) (name x)
    (map? x) (.-strobj (reduce (fn [m [k v]]
               (assoc m (clj->js k) (clj->js v))) {} x))
    (coll? x) (apply array (map clj->js x))
    :else x))

