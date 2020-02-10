;;   Copyright (c) Russ Olsen, Nicola Mometto, Rich Hickey & contributors.
;;   The use and distribution terms for this software are covered by the
;;   Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
;;   which can be found in the file epl-v10.html at the root of this distribution.
;;   By using this software in any fashion, you are agreeing to be bound by
;;   the terms of this license.
;;   You must not remove this notice, or any other, from this software.

(ns cljs.tools.reader.impl.inspect)

(declare inspect*)

(defn- inspect*-col [truncate col start end]
  (let [n (count col)
        l (if truncate 0 (min 10 n))
        elements (map (partial inspect* true) (take l col))
        content (apply str (interpose " " elements))
        suffix (if (< l n) "...")]
    (str start content suffix end)))

(defn- dispatch-inspect
  [_ x]
  (cond
   (nil? x) :nil
   (string? x) :string
   (keyword? x) :strable
   (number? x) :strable
   (symbol? x) :strable
   (vector? x) :vector
   (list? x)  :list
   (map? x) :map
   (set? x) :set
   (= x true) :strable
   (= x false) :strable
   :default (type x)))

(defmulti inspect* dispatch-inspect)

(defmethod inspect* :string [truncate ^String x]
  (let [n (if truncate 5 20)
        suffix (if (> (.-length x) n) "...\"" "\"")]
    (str
      \"
      (.substring ^String x 0 (min n (.-length x)))
      suffix)))

(defmethod inspect* :strable [truncate x] (str x))

(defmethod inspect* cljs.core/IndexedSeq [truncate x]
  "<indexed seq>")

(defmethod inspect* cljs.core/PersistentArrayMapSeq [truncate x]
  "<map seq>")

(defmethod inspect* cljs.core/NodeSeq [truncate x]
  "<map seq>")

(defmethod inspect* cljs.core/Cons [truncate x] "<cons>")

(defmethod inspect* cljs.core/LazySeq [truncate x] "<lazy seq>")

(defmethod inspect* :nil [_ _] "nil")

(defmethod inspect* :list [truncate col]
  (inspect*-col truncate col \( \)))

(defmethod inspect* :map [truncate m]
  (let [len (count m)
        n-shown (if truncate 0 len)
        contents (apply concat (take n-shown m))
        suffix (if (> len n-shown) "...}" \})]
    (inspect*-col truncate contents \{ suffix)))

(defmethod inspect* :set [truncate col]
  (inspect*-col truncate col "#{" \}))

(defmethod inspect* :vector [truncate col]
  (inspect*-col truncate col \[ \]))

(defmethod inspect* :default [truncate x]
  (pr-str (type x)))

(defn inspect
  "Return a string description of the value supplied.
   May be the a string version of the value itself (e.g. \"true\")
   or it may be a description (e.g. \"an instance of Foo\").
   If truncate is true then return a very terse version of
   the inspection."
  ([x] (inspect* false x))
  ([truncate x] (inspect* truncate x)))
