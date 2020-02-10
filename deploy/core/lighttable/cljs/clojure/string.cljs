;   Copyright (c) Rich Hickey. All rights reserved.
;   The use and distribution terms for this software are covered by the
;   Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
;   which can be found in the file epl-v10.html at the root of this distribution.
;   By using this software in any fashion, you are agreeing to be bound by
;   the terms of this license.
;   You must not remove this notice, or any other, from this software.

(ns clojure.string
  (:refer-clojure :exclude [replace reverse])
  (:require [goog.string :as gstring])
  (:import [goog.string StringBuffer]))

(defn- seq-reverse
  [coll]
  (reduce conj () coll))

(def ^:private re-surrogate-pair
  (js/RegExp. "([\\uD800-\\uDBFF])([\\uDC00-\\uDFFF])" "g"))

(defn reverse
  "Returns s with its characters reversed."
  [s]
  (-> (.replace s re-surrogate-pair "$2$1")
      (.. (split "") (reverse) (join ""))))

(defn- replace-all
  [s re replacement]
  (.replace s (js/RegExp. (.-source re) "g") replacement))

(defn- replace-with
  [f]
  (fn [& args]
    (let [matches (drop-last 2 args)]
      (if (= (count matches) 1)
        (f (first matches))
        (f (vec matches))))))

(defn replace
  "Replaces all instance of match with replacement in s.
   match/replacement can be:

   string / string
   pattern / (string or function of match)."
  [s match replacement]
  (cond
    (string? match)
    (.replace s (js/RegExp. (gstring/regExpEscape match) "g") replacement)

    (instance? js/RegExp match)
    (if (string? replacement)
      (replace-all s match replacement)
      (replace-all s match (replace-with replacement)))

    :else (throw (str "Invalid match arg: " match))))

(defn replace-first
  "Replaces the first instance of match with replacement in s.
   match/replacement can be:

   string / string
   pattern / (string or function of match)."
  [s match replacement]
  (.replace s match replacement))

(defn join
  "Returns a string of all elements in coll, as returned by (seq coll),
  separated by an optional separator."
  ([coll]
   (loop [sb (StringBuffer.) coll (seq coll)]
     (if-not (nil? coll)
       (recur (. sb (append (str (first coll)))) (next coll))
       (.toString sb))))
  ([separator coll]
   (loop [sb (StringBuffer.) coll (seq coll)]
     (if-not (nil? coll)
       (do
         (. sb (append (str (first coll))))
         (let [coll (next coll)]
           (when-not (nil? coll)
             (. sb (append separator)))
           (recur sb coll)))
       (.toString sb)))))

(defn upper-case
  "Converts string to all upper-case."
  [s]
  (.toUpperCase s))

(defn lower-case
  "Converts string to all lower-case."
  [s]
  (.toLowerCase s))

(defn capitalize
  "Converts first character of the string to upper-case, all other
  characters to lower-case."
  [s]
  (if (< (count s) 2)
    (upper-case s)
    (str (upper-case (subs s 0 1))
         (lower-case (subs s 1)))))

;; The JavaScript split function takes a limit argument but the return
;; value is not the same as the Java split function.
;;
;; Java: (.split "a-b-c" #"-" 2) => ["a" "b-c"]
;; JavaScript: (.split "a-b-c" #"-" 2) => ["a" "b"]
;;
;; For consistency, the three arg version has been implemented to
;; mimic Java's behavior.

(defn- pop-last-while-empty
  [v]
  (loop [v v]
    (if (identical? "" (peek v))
      (recur (pop v))
      v)))

(defn- discard-trailing-if-needed
  [limit v]
  (if (and (== 0 limit) (< 1 (count v)))
    (pop-last-while-empty v)
    v))

(defn- split-with-empty-regex
  [s limit]
  (if (or (<= limit 0) (>= limit (+ 2 (count s))))
    (conj (vec (cons "" (map str (seq s)))) "")
    (condp == limit
      1 (vector s)
      2 (vector "" s)
      (let [c (- limit 2)]
        (conj (vec (cons "" (subvec (vec (map str (seq s))) 0 c))) (subs s c))))))

(defn split
  "Splits string on a regular expression. Optional argument limit is
  the maximum number of splits. Not lazy. Returns vector of the splits."
  ([s re]
     (split s re 0))
    ([s re limit]
     (discard-trailing-if-needed limit
       (if (identical? "/(?:)/" (str re))
         (split-with-empty-regex s limit)
         (if (< limit 1)
           (vec (.split (str s) re))
           (loop [s s
                  limit limit
                  parts []]
             (if (== 1 limit)
               (conj parts s)
               (let [m (re-find re s)]
                 (if-not (nil? m)
                   (let [index (.indexOf s m)]
                     (recur (.substring s (+ index (count m)))
                       (dec limit)
                       (conj parts (.substring s 0 index))))
                   (conj parts s))))))))))

(defn split-lines
  "Splits s on \n or \r\n."
  [s]
  (split s #"\n|\r\n"))

(defn trim
  "Removes whitespace from both ends of string."
  [s]
  (gstring/trim s))

(defn triml
  "Removes whitespace from the left side of string."
  [s]
  (gstring/trimLeft s))

(defn trimr
  "Removes whitespace from the right side of string."
  [s]
  (gstring/trimRight s))

(defn trim-newline
  "Removes all trailing newline \\n or return \\r characters from
  string.  Similar to Perl's chomp."
  [s]
  (loop [index (.-length s)]
    (if (zero? index)
      ""
      (let [ch (get s (dec index))]
        (if (or (identical? \newline ch)
                (identical? \return ch))
          (recur (dec index))
          (.substring s 0 index))))))

(defn ^boolean blank?
  "True is s is nil, empty, or contains only whitespace."
  [s]
  (gstring/isEmptySafe s))

(defn escape
  "Return a new string, using cmap to escape each character ch
   from s as follows:

   If (cmap ch) is nil, append ch to the new string.
   If (cmap ch) is non-nil, append (str (cmap ch)) instead."
  [s cmap]
  (let [buffer (StringBuffer.)
        length (.-length s)]
    (loop [index 0]
      (if (== length index)
        (. buffer (toString))
        (let [ch (.charAt s index)
              replacement (get cmap ch)]
          (if-not (nil? replacement)
            (.append buffer (str replacement))
            (.append buffer ch))
          (recur (inc index)))))))

(defn index-of
  "Return index of value (string or char) in s, optionally searching
  forward from from-index or nil if not found."
  ([s value]
   (let [result (.indexOf s value)]
     (if (neg? result)
       nil
       result)))
  ([s value from-index]
   (let [result (.indexOf s value from-index)]
     (if (neg? result)
       nil
       result))))

(defn last-index-of
  "Return last index of value (string or char) in s, optionally
  searching backward from from-index or nil if not found."
  ([s value]
   (let [result (.lastIndexOf s value)]
     (if (neg? result)
       nil
       result)))
  ([s value from-index]
   (let [result (.lastIndexOf s value from-index)]
     (if (neg? result)
       nil
       result))))

(defn ^boolean starts-with?
  "True if s starts with substr."
  [s substr]
  (gstring/startsWith s substr))

(defn ^boolean ends-with?
  "True if s ends with substr."
  [s substr]
  (gstring/endsWith s substr))

(defn ^boolean includes?
  "True if s includes substr."
  [s substr]
  (gstring/contains s substr))
