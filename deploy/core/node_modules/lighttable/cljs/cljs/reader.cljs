;   Copyright (c) Rich Hickey. All rights reserved.
;   The use and distribution terms for this software are covered by the
;   Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
;   which can be found in the file epl-v10.html at the root of this distribution.
;   By using this software in any fashion, you are agreeing to be bound by
;   the terms of this license.
;   You must not remove this notice, or any other, from this software.

(ns cljs.reader
  (:require [goog.string :as gstring])
  (:import goog.string.StringBuffer))

(defprotocol PushbackReader
  (read-char [reader] "Returns the next char from the Reader,
nil if the end of stream has been reached")
  (unread [reader ch] "Push back a single character on to the stream"))

(deftype StringPushbackReader [s buffer ^:mutable idx]
  PushbackReader
  (read-char [reader]
    (if (zero? (alength buffer))
      (do
        (set! idx (inc idx))
        (aget s idx))
      (.pop buffer)))
  (unread [reader ch]
    (.push buffer ch)))

(defn push-back-reader [s]
  "Creates a StringPushbackReader from a given string"
  (StringPushbackReader. s (array) -1))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; predicates
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn- ^boolean whitespace?
  "Checks whether a given character is whitespace"
  [ch]
  (or (gstring/isBreakingWhitespace ch) (identical? \, ch)))

(defn- ^boolean numeric?
  "Checks whether a given character is numeric"
  [ch]
  (gstring/isNumeric ch))

(defn- ^boolean comment-prefix?
  "Checks whether the character begins a comment."
  [ch]
  (identical? \; ch))

(defn- ^boolean number-literal?
  "Checks whether the reader is at the start of a number literal"
  [reader initch]
  (or (numeric? initch)
      (and (or (identical? \+ initch) (identical? \- initch))
           (numeric? (let [next-ch (read-char reader)]
                       (unread reader next-ch)
                       next-ch)))))

(declare read macros dispatch-macros)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; read helpers
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


; later will do e.g. line numbers...
(defn reader-error
  [rdr & msg]
  (throw (js/Error. (apply str msg))))

(defn ^boolean macro-terminating? [ch]
  (and (not (identical? ch "#"))
       (not (identical? ch \'))
       (not (identical? ch ":"))
       (macros ch)))

(defn read-token
  [rdr initch]
  (loop [sb (StringBuffer. initch)
         ch (read-char rdr)]
    (if (or (nil? ch)
            (whitespace? ch)
            (macro-terminating? ch))
      (do (unread rdr ch) (.toString sb))
      (recur (do (.append sb ch) sb) (read-char rdr)))))

(defn skip-line
  "Advances the reader to the end of a line. Returns the reader"
  [reader _]
  (loop []
    (let [ch (read-char reader)]
      (if (or (identical? ch \newline) (identical? ch \return) (nil? ch))
        reader
        (recur)))))

(def int-pattern (re-pattern "^([-+]?)(?:(0)|([1-9][0-9]*)|0[xX]([0-9A-Fa-f]+)|0([0-7]+)|([1-9][0-9]?)[rR]([0-9A-Za-z]+))(N)?$"))
(def ratio-pattern (re-pattern "^([-+]?[0-9]+)/([0-9]+)$"))
(def float-pattern (re-pattern "^([-+]?[0-9]+(\\.[0-9]*)?([eE][-+]?[0-9]+)?)(M)?$"))
(def symbol-pattern (re-pattern "^[:]?([^0-9/].*/)?([^0-9/][^/]*)$"))

(defn- re-matches*
  [re s]
  (let [matches (.exec re s)]
    (when (and (not (nil? matches))
               (identical? (aget matches 0) s))
      (if (== (alength matches) 1)
        (aget matches 0)
        matches))))

(defn- match-int
  [s]
  (let [groups (re-matches* int-pattern s)
        ie8-fix  (aget groups 2)
        zero     (if (= ie8-fix "") nil ie8-fix)]
    (if-not (nil? zero)
      0
      (let [a (cond
               (aget groups 3) (array (aget groups 3) 10)
               (aget groups 4) (array (aget groups 4) 16)
               (aget groups 5) (array (aget groups 5) 8)
               (aget groups 6) (array (aget groups 7)
                                      (js/parseInt (aget groups 6) 10))
               :else (array nil nil))
            n (aget a 0)
            radix (aget a 1)]
        (when-not (nil? n)
          (let [parsed (js/parseInt n radix)]
            (if (identical? "-" (aget groups 1))
              (- parsed)
              parsed)))))))

(defn- match-ratio
  [s]
  (let [groups (re-matches* ratio-pattern s)
        numinator (aget groups 1)
        denominator (aget groups 2)]
    (/ (js/parseInt numinator 10) (js/parseInt denominator 10))))

(defn- match-float
  [s]
  (js/parseFloat s))

(defn- match-number
  [s]
  (cond
   (re-matches* int-pattern s) (match-int s)
   (re-matches* ratio-pattern s) (match-ratio s)
   (re-matches* float-pattern s) (match-float s)))

(defn escape-char-map [c]
  (cond
   (identical? c \t) "\t"
   (identical? c \r) "\r"
   (identical? c \n) "\n"
   (identical? c \\) \\
   (identical? c \") \"
   (identical? c \b) "\b"
   (identical? c \f) "\f"
   :else nil))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; unicode
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn read-2-chars [reader]
  (.toString
    (StringBuffer.
      (read-char reader)
      (read-char reader))))

(defn read-4-chars [reader]
  (.toString
    (StringBuffer.
      (read-char reader)
      (read-char reader)
      (read-char reader)
      (read-char reader))))

(def unicode-2-pattern (re-pattern "^[0-9A-Fa-f]{2}$"))
(def unicode-4-pattern (re-pattern "^[0-9A-Fa-f]{4}$"))

(defn validate-unicode-escape [unicode-pattern reader escape-char unicode-str]
  (if (re-matches unicode-pattern unicode-str)
    unicode-str
    (reader-error reader "Unexpected unicode escape \\" escape-char unicode-str)))

(defn make-unicode-char [code-str]
    (let [code (js/parseInt code-str 16)]
      (.fromCharCode js/String code)))

(defn escape-char
  [buffer reader]
  (let [ch (read-char reader)
        mapresult (escape-char-map ch)]
    (if mapresult
      mapresult
      (cond
        (identical? ch \x)
        (->> (read-2-chars reader)
          (validate-unicode-escape unicode-2-pattern reader ch)
          (make-unicode-char))

        (identical? ch \u)
        (->> (read-4-chars reader)
          (validate-unicode-escape unicode-4-pattern reader ch)
          (make-unicode-char))

        (numeric? ch)
        (.fromCharCode js/String ch)

        :else
        (reader-error reader "Unexpected unicode escape \\" ch )))))

(defn read-past
  "Read until first character that doesn't match pred, returning
   char."
  [pred rdr]
  (loop [ch (read-char rdr)]
    (if (pred ch)
      (recur (read-char rdr))
      ch)))

(defn read-delimited-list
  [delim rdr recursive?]
  (loop [a (array)]
    (let [ch (read-past whitespace? rdr)]
      (when-not ch (reader-error rdr "EOF while reading"))
      (if (identical? delim ch)
        a
        (if-let [macrofn (macros ch)]
          (let [mret (macrofn rdr ch)]
            (recur (if (identical? mret rdr) a (do
                                                 (.push a mret)
                                                 a))))
          (do
            (unread rdr ch)
            (let [o (read rdr true nil recursive?)]
              (recur (if (identical? o rdr) a (do
                                                (.push a o)
                                                a))))))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; data structure readers
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn not-implemented
  [rdr ch]
  (reader-error rdr "Reader for " ch " not implemented yet"))

(declare maybe-read-tagged-type)

(defn read-dispatch
  [rdr _]
  (let [ch (read-char rdr)
        dm (dispatch-macros ch)]
    (if dm
      (dm rdr _)
      (if-let [obj (maybe-read-tagged-type rdr ch)]
        obj
        (reader-error rdr "No dispatch macro for " ch)))))

(defn read-unmatched-delimiter
  [rdr ch]
  (reader-error rdr "Unmatched delimiter " ch))

(defn read-list
  [rdr _]
  (let [arr (read-delimited-list ")" rdr true)]
    (loop [i (alength arr) ^not-native r ()]
      (if (> i 0)
        (recur (dec i) (-conj r (aget arr (dec i))))
        r))))

(def read-comment skip-line)

(defn read-vector
  [rdr _]
  (vec (read-delimited-list "]" rdr true)))

(defn read-map
  [rdr _]
  (let [l (read-delimited-list "}" rdr true)
        c (alength l)]
    (when (odd? c)
      (reader-error rdr "Map literal must contain an even number of forms"))
    (if (<= c (* 2 (.-HASHMAP-THRESHOLD PersistentArrayMap)))
      (.fromArray PersistentArrayMap l true true)
      (.fromArray PersistentHashMap l true))))

(defn read-number
  [reader initch]
  (loop [buffer (gstring/StringBuffer. initch)
         ch (read-char reader)]
    (if (or (nil? ch) (whitespace? ch) (macros ch))
      (do
        (unread reader ch)
        (let [s (.toString buffer)]
          (or (match-number s)
              (reader-error reader "Invalid number format [" s "]"))))
      (recur (do (.append buffer ch) buffer) (read-char reader)))))

(defn read-string*
  [reader _]
  (loop [buffer (gstring/StringBuffer.)
         ch (read-char reader)]
    (cond
     (nil? ch) (reader-error reader "EOF while reading")
     (identical? "\\" ch) (recur (do (.append buffer (escape-char buffer reader)) buffer)
                        (read-char reader))
     (identical? \" ch) (. buffer (toString))
     :default (recur (do (.append buffer ch) buffer) (read-char reader)))))

(defn read-raw-string*
  [reader _]
  (loop [buffer (gstring/StringBuffer.)
         ch (read-char reader)]
    (cond
      (nil? ch) (reader-error reader "EOF while reading")
      (identical? "\\" ch) (do (.append buffer ch)
                             (let [nch (read-char reader)]
                               (if (nil? nch)
                                 (reader-error reader "EOF while reading")
                                 (recur (doto buffer (.append nch))
                                        (read-char reader)))))
      (identical? "\"" ch) (.toString buffer)
      :else (recur (doto buffer (.append ch)) (read-char reader)))))

(defn special-symbols [t not-found]
  (cond
    (identical? t "nil") nil
    (identical? t "true") true
    (identical? t "false") false
    (identical? t "/") '/
    :else not-found))

(defn read-symbol
  [reader initch]
  (let [token (read-token reader initch)]
    (if (and (gstring/contains token "/")
             (not (== (.-length token) 1)))
      (symbol (subs token 0 (.indexOf token "/"))
              (subs token (inc (.indexOf token "/"))
                (.-length token)))
      (special-symbols token (symbol token)))))

(defn read-literal
  [rdr ch]
  (let [token (read-token rdr ch)
        chars (subs token 1)]
    (cond (identical? (.-length chars) 1) chars
          (identical? chars "tab")       "\t"
          (identical? chars "return")    "\r"
          (identical? chars "newline")   "\n"
          (identical? chars "space")     " "
          (identical? chars "backspace") "\b"
          (identical? chars "formfeed")  "\f"
          (identical? (.charAt chars 0) "u") (make-unicode-char (subs chars 1))
          (identical? (.charAt chars 0) "o") (not-implemented rdr token)
          :else (reader-error rdr "Unknown character literal: " token))))

(defn read-keyword
  [reader initch]
  (let [token (read-token reader (read-char reader))
        a (re-matches* symbol-pattern token)
        token (aget a 0)
        ns (aget a 1)
        name (aget a 2)]
    (if (or (and (not (undefined? ns))
                 (identical? (. ns (substring (- (.-length ns) 2) (.-length ns))) ":/"))
            (identical? (aget name (dec (.-length name))) ":")
            (not (== (.indexOf token "::" 1) -1)))
      (reader-error reader "Invalid token: " token)
      (if (and (not (nil? ns)) (> (.-length ns) 0))
        (keyword (.substring ns 0 (.indexOf ns "/")) name)
        (keyword token)))))

(defn desugar-meta
  [f]
  (cond
   (symbol? f) {:tag f}
   (string? f) {:tag f}
   (keyword? f) {f true}
   :else f))

(defn wrapping-reader
  [sym]
  (fn [rdr _]
    (list sym (read rdr true nil true))))

(defn throwing-reader
  [msg]
  (fn [rdr _]
    (reader-error rdr msg)))

(defn read-meta
  [rdr _]
  (let [m (desugar-meta (read rdr true nil true))]
    (when-not (map? m)
      (reader-error rdr "Metadata must be Symbol,Keyword,String or Map"))
    (let [o (read rdr true nil true)]
      (if (satisfies? IWithMeta o)
        (with-meta o (merge (meta o) m))
        (reader-error rdr "Metadata can only be applied to IWithMetas")))))

(defn read-set
  [rdr _]
  (.fromArray PersistentHashSet (read-delimited-list "}" rdr true) true))

(defn read-regex
  [rdr ch]
  (-> (read-raw-string* rdr ch) re-pattern))

(defn read-discard
  [rdr _]
  (read rdr true nil true)
  rdr)

(defn macros [c]
  (cond
   (identical? c \") read-string*
   (identical? c \:) read-keyword
   (identical? c \;) read-comment
   (identical? c \') (wrapping-reader 'quote)
   (identical? c \@) (wrapping-reader 'deref)
   (identical? c \^) read-meta
   (identical? c \`) not-implemented
   (identical? c \~) not-implemented
   (identical? c \() read-list
   (identical? c \)) read-unmatched-delimiter
   (identical? c \[) read-vector
   (identical? c \]) read-unmatched-delimiter
   (identical? c \{) read-map
   (identical? c \}) read-unmatched-delimiter
   (identical? c \\) read-literal
   (identical? c \#) read-dispatch
   :else nil))

;; omitted by design: var reader, eval reader
(defn dispatch-macros [s]
  (cond
   (identical? s "{") read-set
   (identical? s "<") (throwing-reader "Unreadable form")
   (identical? s "\"") read-regex
   (identical? s"!") read-comment
   (identical? s "_") read-discard
   :else nil))

(defn read
  "Reads the first object from a PushbackReader. Returns the object read.
   If EOF, throws if eof-is-error is true. Otherwise returns sentinel.

   Only supports edn (similar to clojure.edn/read)"
  [reader eof-is-error sentinel is-recursive]
  (let [ch (read-char reader)]
    (cond
     (nil? ch) (if eof-is-error (reader-error reader "EOF while reading") sentinel)
     (whitespace? ch) (recur reader eof-is-error sentinel is-recursive)
     (comment-prefix? ch) (recur (read-comment reader ch) eof-is-error sentinel is-recursive)
     :else (let [f (macros ch)
                 res
                 (cond
                  f (f reader ch)
                  (number-literal? reader ch) (read-number reader ch)
                  :else (read-symbol reader ch))]
     (if (identical? res reader)
       (recur reader eof-is-error sentinel is-recursive)
       res)))))

(defn read-string
  "Reads one object from the string s"
  [s]
  (when-not (string? s)
    (throw (js/Error. "Cannot read from non-string object.")))
  (let [r (push-back-reader s)]
    (read r false nil false)))

;; read instances

(defn ^:private zero-fill-right-and-truncate [s width]
  (cond (= width (count s)) s
        (< width (count s)) (subs s 0 width)
        :else (loop [b (StringBuffer. s)]
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
    (reader-error nil (str msg " Failed:  " low "<=" n "<=" high))) 
  n)

(defn parse-and-validate-timestamp [s]
  (let [[_ years months days hours minutes seconds fraction offset-sign offset-hours offset-minutes :as v] 
        (re-matches timestamp-regex s)]
    (if-not v
      (reader-error nil (str "Unrecognized date/time syntax: " s))
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
    (reader-error nil (str "Unrecognized date/time syntax: " ts))))

(defn ^:private read-date
  [s]
  (if (string? s)
    (parse-timestamp s)
    (reader-error nil "Instance literal expects a string for its timestamp.")))


(defn ^:private read-queue
  [elems]
  (if (vector? elems)
    (into cljs.core.PersistentQueue.EMPTY elems)
    (reader-error nil "Queue literal expects a vector for its elements.")))


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
        (aset obj (name k) v))
      obj)
    
    :else
    (reader-error nil
      (str "JS literal expects a vector or map containing "
           "only string or unqualified keyword keys"))))


(defn ^:private read-uuid
  [uuid]
  (if (string? uuid)
    (cljs.core/uuid uuid)
    (reader-error nil "UUID literal expects a string as its representation.")))

(def ^:dynamic *tag-table*
  (atom {"inst"  read-date
         "uuid"  read-uuid
         "queue" read-queue
         "js"    read-js}))

(def ^:dynamic *default-data-reader-fn*
  (atom nil))

(defn maybe-read-tagged-type
  [rdr initch]
  (let [tag (read-symbol rdr initch)
        pfn (get @*tag-table* (str tag))
        dfn @*default-data-reader-fn*]
    (cond
     pfn (pfn (read rdr true nil false))
     dfn (dfn tag (read rdr true nil false))
     :else (reader-error rdr
                         "Could not find tag parser for " (str tag)
                         " in " (pr-str (keys @*tag-table*))))))

(defn register-tag-parser!
  [tag f]
  (let [tag (str tag)
        old-parser (get @*tag-table* tag)]
    (swap! *tag-table* assoc tag f)
    old-parser))

(defn deregister-tag-parser!
  [tag]
  (let [tag (str tag)
        old-parser (get @*tag-table* tag)]
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
