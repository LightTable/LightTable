;;   Copyright (c) Nicola Mometto, Rich Hickey & contributors.
;;   The use and distribution terms for this software are covered by the
;;   Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
;;   which can be found in the file epl-v10.html at the root of this distribution.
;;   By using this software in any fashion, you are agreeing to be bound by
;;   the terms of this license.
;;   You must not remove this notice, or any other, from this software.

(ns cljs.tools.reader.impl.commons
  (:refer-clojure :exclude [char])
  (:require
   [cljs.tools.reader.impl.errors :refer [reader-error]]
   [cljs.tools.reader.reader-types :refer [peek-char read-char]]
   [cljs.tools.reader.impl.utils :refer [numeric? newline? char]]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; helpers
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn ^boolean number-literal?
  "Checks whether the reader is at the start of a number literal"
  [^not-native reader initch]
  (or (numeric? initch)
      (and (or (identical? \+ initch) (identical?  \- initch))
           (numeric? (peek-char reader)))))

(defn read-past
  "Read until first character that doesn't match pred, returning
   char."
  [pred ^not-native rdr]
  (loop [ch (read-char rdr)]
    (if ^boolean (pred ch)
      (recur (read-char rdr))
      ch)))

(defn skip-line
  "Advances the reader to the end of a line. Returns the reader"
  [^not-native reader]
  (loop []
    (when-not (newline? (read-char reader))
      (recur)))
  reader)

(def int-pattern #"^([-+]?)(?:(0)|([1-9][0-9]*)|0[xX]([0-9A-Fa-f]+)|0([0-7]+)|([1-9][0-9]?)[rR]([0-9A-Za-z]+)|0[0-9]+)(N)?$")
(def ratio-pattern #"([-+]?[0-9]+)/([0-9]+)")
(def float-pattern #"([-+]?[0-9]+(\.[0-9]*)?([eE][-+]?[0-9]+)?)(M)?")

(defn- match-int
  [s]
  (let [m (vec (re-find int-pattern s))]
    (if-not (nil? (m 2))
      0
      (let [^boolean negate? (identical? "-" (m 1))
            a (cond
               (not (nil? (m 3))) [(m 3) 10]
               (not (nil? (m 4))) [(m 4) 16]
               (not (nil? (m 5))) [(m 5) 8]
               (not (nil? (m 7))) [(m 7) (js/parseInt (m 6))]
               :else              [nil nil])
            n (a 0)]
        (when-not (nil? n)
          (let [bn (js/parseInt n (a 1))
                bn (if negate? (* -1 bn) bn)]
            (when-not (js/isNaN bn)
              bn)))))))

(defn- match-ratio
  [s]
  (let [m (vec (re-find ratio-pattern s))
        numerator (m 1)
        denominator (m 2)
        numerator (if (re-find #"^\+" numerator)
                    (subs numerator 1)
                    numerator)]
    (/ (-> numerator   js/parseInt) ;;; No ratio type in cljs
       (-> denominator js/parseInt)))); So will convert to js/Number

(defn- match-float
  [s]
  (let [m (vec (re-find float-pattern s))]
    (if-not (nil? (m 4)) ;; for BigDecimal "10.03M", as all parsed to js/Number
      (js/parseFloat (m 1))
      (js/parseFloat s))))

(defn ^boolean matches? [pattern s]
  (let [[match] (re-find pattern s)]
    (identical? match s)))

(defn match-number [s]
  (if (matches? int-pattern s)
    (match-int s)
    (if (matches? float-pattern s)
      (match-float s)
      (when (matches? ratio-pattern s)
        (match-ratio s)))))

(defn parse-symbol
  "Parses a string into a vector of the namespace and symbol"
  [token]
  (when-not (or (identical? "" token)
                (true? (.test #":$" token))
                (true? (.test #"^::" token)))
    (let [ns-idx (.indexOf token "/")
          ns (when (pos? ns-idx)
               (subs token 0 ns-idx))]
      (if-not (nil? ns)
        (let [ns-idx (inc ns-idx)]
          (when-not (== ns-idx (count token))
            (let [sym (subs token ns-idx)]
              (when (and (not (numeric? (nth sym 0)))
                         (not (identical? "" sym))
                         (false? (.test #":$" ns))
                         (or (identical? sym "/")
                             (== -1 (.indexOf sym "/"))))
                [ns sym]))))
        (when (or (identical? token "/")
                  (== -1 (.indexOf token "/")))
          [nil token])))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; readers
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn read-comment
  [rdr & _]
  (skip-line rdr))

(defn throwing-reader
  [msg]
  (fn [rdr & _]
    (reader-error rdr msg)))
