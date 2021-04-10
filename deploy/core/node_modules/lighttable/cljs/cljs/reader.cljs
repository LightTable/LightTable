;   Copyright (c) Rich Hickey. All rights reserved.
;   The use and distribution terms for this software are covered by the
;   Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
;   which can be found in the file epl-v10.html at the root of this distribution.
;   By using this software in any fashion, you are agreeing to be bound by
;   the terms of this license.
;   You must not remove this notice, or any other, from this software.

(ns cljs.reader
  (:require-macros [cljs.reader :refer [add-data-readers]])
  (:require [goog.object :as gobject]
            [cljs.tools.reader :as treader]
            [cljs.tools.reader.edn :as edn])
  (:import [goog.string StringBuffer]))

(defn ^:private zero-fill-right-and-truncate [s width]
  (cond
    (= width (count s)) s
    (< width (count s)) (subs s 0 width)
    :else
    (loop [b (StringBuffer. s)]
      (if (< (.getLength b) width)
        (recur (.append b "0"))
        (.toString b)))))

(defn ^:private divisible?
  [num div]
  (zero? (mod num div)))

(defn ^:private indivisible?
  [num div]
  (not (divisible? num div)))

(defn ^:private leap-year?
  [year]
  (and (divisible? year 4)
       (or (indivisible? year 100)
           (divisible? year 400))))

(def ^:private days-in-month
  (let [dim-norm [nil 31 28 31 30 31 30 31 31 30 31 30 31]
        dim-leap [nil 31 29 31 30 31 30 31 31 30 31 30 31]]
    (fn [month leap-year?]
      (get (if leap-year? dim-leap dim-norm) month))))

(def ^:private timestamp-regex #"(\d\d\d\d)(?:-(\d\d)(?:-(\d\d)(?:[T](\d\d)(?::(\d\d)(?::(\d\d)(?:[.](\d+))?)?)?)?)?)?(?:[Z]|([-+])(\d\d):(\d\d))?")

(defn ^:private parse-int [s]
  (let [n (js/parseInt s 10)]
    (if-not (js/isNaN n)
      n)))

(defn ^:private check [low n high msg]
  (when-not (<= low n high)
    (throw (js/Error. (str msg " Failed:  " low "<=" n "<=" high))))
  n)

(defn parse-and-validate-timestamp [s]
  (let [[_ years months days hours minutes seconds fraction offset-sign offset-hours offset-minutes :as v]
        (re-matches timestamp-regex s)]
    (if-not v
      (throw (js/Error. (str "Unrecognized date/time syntax: " s)))
      (let [years (parse-int years)
            months (or (parse-int months) 1)
            days (or (parse-int days) 1)
            hours (or (parse-int hours) 0)
            minutes (or (parse-int minutes) 0)
            seconds (or (parse-int seconds) 0)
            fraction (or (parse-int (zero-fill-right-and-truncate fraction 3)) 0)
            offset-sign (if (= offset-sign "-") -1 1)
            offset-hours (or (parse-int offset-hours) 0)
            offset-minutes (or (parse-int offset-minutes) 0)
            offset (* offset-sign (+ (* offset-hours 60) offset-minutes))]
        [years
         (check 1 months 12 "timestamp month field must be in range 1..12")
         (check 1 days (days-in-month months (leap-year? years)) "timestamp day field must be in range 1..last day in month")
         (check 0 hours 23 "timestamp hour field must be in range 0..23")
         (check 0 minutes 59 "timestamp minute field must be in range 0..59")
         (check 0 seconds (if (= minutes 59) 60 59) "timestamp second field must be in range 0..60")
         (check 0 fraction 999 "timestamp millisecond field must be in range 0..999")
         offset]))))

(defn parse-timestamp
  [ts]
  (if-let [[years months days hours minutes seconds ms offset]
           (parse-and-validate-timestamp ts)]
    (js/Date.
      (- (.UTC js/Date years (dec months) days hours minutes seconds ms)
        (* offset 60 1000)))
    (throw (js/Error. (str "Unrecognized date/time syntax: " ts)))))

(defn ^:private read-date
  [s]
  (if (string? s)
    (parse-timestamp s)
    (throw (js/Error. "Instance literal expects a string for its timestamp."))))

(defn ^:private read-queue
  [elems]
  (if (vector? elems)
    (into cljs.core/PersistentQueue.EMPTY elems)
    (throw (js/Error. "Queue literal expects a vector for its elements."))))

(defn ^:private read-js
  [form]
  (cond
    (vector? form)
    (let [arr (array)]
      (doseq [x form]
        (.push arr x))
      arr)

    (map? form)
    (let [obj (js-obj)]
      (doseq [[k v] form]
        (gobject/set obj (name k) v))
      obj)

    :else
    (throw
      (js/Error.
        (str "JS literal expects a vector or map containing "
             "only string or unqualified keyword keys")))))

(defn ^:private read-uuid
  [uuid]
  (if (string? uuid)
    (cljs.core/uuid uuid)
    (throw (js/Error. "UUID literal expects a string as its representation."))))

(def ^:dynamic *default-data-reader-fn*
  (atom nil))

(def ^:dynamic *tag-table*
  (atom
    (add-data-readers
      {'inst  read-date
       'uuid  read-uuid
       'queue read-queue
       'js    read-js})))

(defn read
  "Reads the first object from an cljs.tools.reader.reader-types/IPushbackReader.
   Returns the object read. If EOF, throws if eof-error? is true otherwise returns eof.
   If no reader is provided, *in* will be used.

   Reads data in the edn format (subset of Clojure data):
   http://edn-format.org

   cljs.tools.reader.edn/read doesn't depend on dynamic Vars, all configuration
   is done by passing an opt map.

   opts is a map that can include the following keys:
   :eof - value to return on end-of-file. When not supplied, eof throws an exception.
   :readers  - a map of tag symbols to data-reader functions to be considered before default-data-readers.
              When not supplied, only the default-data-readers will be used.
   :default - A function of two args, that will, if present and no reader is found for a tag,
              be called with the tag and the value."
  ([reader]
   (edn/read
     {:readers @*tag-table*
      :default @*default-data-reader-fn*
      :eof nil}
     reader))
  ([{:keys [eof] :as opts} reader]
   (edn/read
     (update (merge opts {:default @*default-data-reader-fn*})
       :readers (fn [m] (merge @*tag-table* m))) reader))
  ([reader eof-error? eof opts]
   (edn/read reader eof-error? eof
     (update (merge opts {:default @*default-data-reader-fn*})
       :readers (fn [m] (merge @*tag-table* m))))))

(defn read-string
  "Reads one object from the string s.
   Returns nil when s is nil or empty.

   Reads data in the edn format (subset of Clojure data):
   http://edn-format.org

   opts is a map as per cljs.tools.reader.edn/read"
  ([s]
   (edn/read-string
     {:readers @*tag-table*
      :default @*default-data-reader-fn*
      :eof nil} s))
  ([opts s]
   (edn/read-string
     (update (merge {:default @*default-data-reader-fn*} opts)
       :readers (fn [m] (merge @*tag-table* m))) s)))

(defn register-tag-parser!
  [tag f]
  (let [old-parser (get @*tag-table* tag)]
    (swap! *tag-table* assoc tag f)
    old-parser))

(defn deregister-tag-parser!
  [tag]
  (let [old-parser (get @*tag-table* tag)]
    (swap! *tag-table* dissoc tag)
    old-parser))

(defn register-default-tag-parser!
  [f]
  (let [old-parser @*default-data-reader-fn*]
    (swap! *default-data-reader-fn* (fn [_] f))
    old-parser))

(defn deregister-default-tag-parser!
  []
  (let [old-parser @*default-data-reader-fn*]
    (swap! *default-data-reader-fn* (fn [_] nil))
    old-parser))
