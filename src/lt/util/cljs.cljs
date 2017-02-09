(ns lt.util.cljs
  "Set up cljs and provide a few misc util fns"
  (:refer-clojure :exclude [js->clj clj->js])
  (:require [clojure.string :as string]))

(set! *print-fn* (fn [x]
                   (when (and x (not= x "") (not= x "\n"))
                     (.log js/console (string/trim x)))))


;; In v1.7.145. Later version of ChunkedCons implemented INext - looks fancier than this one.
;;NEEDED for latest CLJS
;; (extend-type cljs.core/ChunkedCons
;;   INext
;;   (-next [this] (-seq (-rest this))))

;;  Is implementing ISeqable on nil necessary given that (seq nil) returns nil?
(extend-type nil
  ISeqable
  (-seq [coll] nil))

;; In v1.7.145. Later version of RSeq implemented INext - looks fancier than this one.
;; (extend-type cljs.core/RSeq
;;   INext
;;   (-next [this] (-seq (-rest this))))

;; Appears to still be needed... need to do more searching in ClojureScript.
(extend-type js/global.String
  IFn
  ;; Allows js/global.String to be used like a vector... (["a" "b" "c"] 2) ;;=> "c"
  ;; Returns not-found if coll is not found.
  (-invoke
    ([this coll]
       (get coll (.toString this)))
    ([this coll not-found]
       (get coll (.toString this) not-found)))
  ISeqable
  (-seq [coll]
    (when (and coll (not (zero? (alength coll))))
                 (IndexedSeq. (js/String. coll) 0))))

;; Appears to still be needed... need to do more searching in ClojureScript.
(set! js/global.String.prototype.apply
  (fn
    [s args]
    (if (< (alength args) 2)
      (get (aget args 0) s)
      (get (aget args 0) s (aget args 1)))))

;; Appears to still be needed... need to do more searching in ClojureScript.
(extend-type js/global.Array
  ISeqable
  (-seq [coll]
    (when (and coll (not (zero? (alength coll))))
                 (IndexedSeq. coll 0))))

(defn ->dottedkw [& args]
  (keyword (string/join "." (map name (filter identity args)))))

(defn js->clj [& args]
  (js/lt.objs.console.error "lt.util.cljs/js->clj is deprecated and will be removed in 0.9.0. Use js->clj instead")
  (apply cljs.core/js->clj args))

(defn str-contains? [str x]
  (> (.indexOf str x) -1))

(defn index-of [e coll]
  (first (keep-indexed #(if (= e %2) %1) coll)))
