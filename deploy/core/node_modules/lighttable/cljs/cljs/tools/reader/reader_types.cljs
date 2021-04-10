;;   Copyright (c) Nicola Mometto, Rich Hickey & contributors.
;;   The use and distribution terms for this software are covered by the
;;   Eclipse Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
;;   which can be found in the file epl-v10.html at the root of this distribution.
;;   By using this software in any fashion, you are agreeing to be bound by
;;   the terms of this license.
;;   You must not remove this notice, or any other, from this software.

(ns ^{:doc "Protocols and default Reader types implementation"
      :author "Bronsa"}
  cljs.tools.reader.reader-types
  (:refer-clojure :exclude [char read-line])
  (:require [cljs.tools.reader.impl.utils :refer [char whitespace? newline?]]
            [goog.string])
  (:import goog.string.StringBuffer))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; reader protocols
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defprotocol Reader
  (read-char [reader]
    "Returns the next char from the Reader, nil if the end of stream has been reached")
  (peek-char [reader]
    "Returns the next char from the Reader without removing it from the reader stream"))

(defprotocol IPushbackReader
  (unread [reader ch]
    "Pushes back a single character on to the stream"))

(defprotocol IndexingReader
  (get-line-number [reader]
    "Returns the line number of the next character to be read from the stream")
  (get-column-number [reader]
    "Returns the column number of the next character to be read from the stream")
  (get-file-name [reader]
    "Returns the file name the reader is reading from, or nil"))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; reader deftypes
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(deftype StringReader
    [s s-len ^:mutable s-pos]
  Reader
  (read-char [reader]
    (when (> s-len s-pos)
      (let [r (.charAt s s-pos)]
        (set! s-pos (inc s-pos))
        r)))
  (peek-char [reader]
    (when (> s-len s-pos)
      (.charAt s s-pos))))

(deftype NodeReadableReader [readable ^:mutable buf]
  Reader
  (read-char [reader]
    (if buf
      (let [c (aget buf 0)]
        (set! buf nil)
        (char c))
      (let [c (str (.read readable 1))]
        (when c
          (char c)))))
  (peek-char [reader]
    (when-not buf
      (set! buf (str (.read readable 1))))
    (when buf
      (char (aget buf 0)))))

(deftype PushbackReader
  [^not-native rdr buf buf-len ^:mutable buf-pos]
  Reader
  (read-char [reader]
    (let [c (if (< buf-pos buf-len)
              (aget buf buf-pos)
              (read-char rdr))]
      (when (< buf-pos buf-len)
        (set! buf-pos (inc buf-pos)))
      (char c)))
  (peek-char [reader]
    (let [c (if (< buf-pos buf-len)
              (aget buf buf-pos)
              (peek-char rdr))]
      (char c)))
  IPushbackReader
  (unread [reader ch]
    (when ch
      (if (zero? buf-pos) (throw (js/Error. "Pushback buffer is full")))
      (set! buf-pos (dec buf-pos))
      (aset buf buf-pos ch))))

(defn- normalize-newline [^not-native rdr ch]
  (if (identical? \return ch)
    (let [c (peek-char rdr)]
      (when (or (identical? \formfeed c)
                (identical? \newline c))
        (read-char rdr))
      \newline)
    ch))

(deftype IndexingPushbackReader
    [^not-native rdr ^:mutable line ^:mutable column
     ^:mutable line-start? ^:mutable prev
     ^:mutable prev-column file-name]
  Reader
  (read-char [reader]
    (when-let [ch (read-char rdr)]
      (let [ch (normalize-newline rdr ch)]
        (set! prev line-start?)
        (set! line-start? (newline? ch))
        (when line-start?
          (set! prev-column column)
          (set! column 0)
          (set! line (inc line)))
        (set! column (inc column))
        ch)))

  (peek-char [reader]
    (peek-char rdr))

  IPushbackReader
  (unread [reader ch]
    (if line-start?
      (do (set! line (dec line))
          (set! column prev-column))
      (set! column (dec column)))
    (set! line-start? prev)
    (unread rdr ch))

  IndexingReader
  (get-line-number [reader] (int line))
  (get-column-number [reader] (int column))
  (get-file-name [reader] file-name))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Source Logging support
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(defn merge-meta
  "Returns an object of the same type and value as `obj`, with its
metadata merged over `m`."
  [obj m]
  (let [orig-meta (meta obj)]
    (with-meta obj (merge m (dissoc orig-meta :source)))))

(defn- peek-source-log
  "Returns a string containing the contents of the top most source
logging frame."
  [frames]
  (subs (str (:buffer frames)) (first (:offset frames))))

(defn- log-source-char
  "Logs `char` to all currently active source logging frames."
  [frames char]
  (when-let [buffer (:buffer frames)]
    (.append buffer char)))

(defn- drop-last-logged-char
  "Removes the last logged character from all currently active source
logging frames. Called when pushing a character back."
  [frames]
  (when-let [buffer (:buffer frames)]
    (.set buffer (subs (str buffer) 0 (dec (.getLength buffer))))))

(deftype SourceLoggingPushbackReader
    [^not-native rdr ^:mutable line ^:mutable column
     ^:mutable line-start? ^:mutable prev
     ^:mutable prev-column file-name frames]
  Reader
  (read-char [reader]
    (when-let [ch (read-char rdr)]
      (let [ch (normalize-newline rdr ch)]
        (set! prev line-start?)
        (set! line-start? (newline? ch))
        (when line-start?
          (set! prev-column column)
          (set! column 0)
          (set! line (inc line)))
        (set! column (inc column))
        (log-source-char @frames ch)
        ch)))

  (peek-char [reader]
    (peek-char rdr))

  IPushbackReader
  (unread [reader ch]
    (if line-start?
      (do (set! line (dec line))
          (set! column prev-column))
      (set! column (dec column)))
    (set! line-start? prev)
    (when ch
      (drop-last-logged-char @frames))
    (unread rdr ch))

  IndexingReader
  (get-line-number [reader] (int line))
  (get-column-number [reader] (int column))
  (get-file-name [reader] file-name))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Public API
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; fast check for provided implementations
(defn indexing-reader?
  "Returns true if the reader satisfies IndexingReader"
  [rdr]
  (implements? IndexingReader rdr))

(defn string-reader
  "Creates a StringReader from a given string"
  ([s]
     (StringReader. s (count s) 0)))

(defn string-push-back-reader
  "Creates a PushbackReader from a given string"
  ([s]
     (string-push-back-reader s 1))
  ([s buf-len]
     (PushbackReader. (string-reader s) (object-array buf-len) buf-len buf-len)))

(defn node-readable-push-back-reader [readable]
  (PushbackReader. (NodeReadableReader. readable nil) (object-array 1) 1 1))

(defn indexing-push-back-reader
  "Creates an IndexingPushbackReader from a given string or PushbackReader"
  ([s-or-rdr]
     (indexing-push-back-reader s-or-rdr 1))
  ([s-or-rdr buf-len]
     (indexing-push-back-reader s-or-rdr buf-len nil))
  ([s-or-rdr buf-len file-name]
     (IndexingPushbackReader.
      (if (string? s-or-rdr) (string-push-back-reader s-or-rdr buf-len) s-or-rdr) 1 1 true nil 0 file-name)))

(defn source-logging-push-back-reader
  "Creates a SourceLoggingPushbackReader from a given string or PushbackReader"
  ([s-or-rdr]
     (source-logging-push-back-reader s-or-rdr 1))
  ([s-or-rdr buf-len]
     (source-logging-push-back-reader s-or-rdr buf-len nil))
  ([s-or-rdr buf-len file-name]
     (SourceLoggingPushbackReader.
      (if (string? s-or-rdr) (string-push-back-reader s-or-rdr buf-len) s-or-rdr)
      1
      1
      true
      nil
      0
      file-name
      (atom {:buffer (StringBuffer.) :offset '(0)}))))

(defn read-line
  "Reads a line from the reader or from *in* if no reader is specified"
  ([^not-native rdr]
     (loop [c (read-char rdr) s (StringBuffer.)]
       (if (newline? c)
         (str s)
         (recur (read-char rdr) (.append s c))))))

(defn ^boolean source-logging-reader?
  [rdr]
  (instance? SourceLoggingPushbackReader rdr))

(defn ^boolean line-start?
  "Returns true if rdr is an IndexingReader and the current char starts a new line"
  [^not-native rdr]
  (when (indexing-reader? rdr)
    (== 1 (get-column-number rdr))))

(defn log-source*
  [reader f]
  (let [buffer (:buffer @(.-frames reader))]
    (try
      (swap! (.-frames reader) update-in [:offset] conj (.getLength buffer))
      (let [ret (f)]
        (if (implements? IMeta ret)
          (merge-meta ret {:source (peek-source-log @ (.-frames reader))})
          ret))
      (finally
        (swap! (.-frames reader) update-in [:offset] rest)))))

