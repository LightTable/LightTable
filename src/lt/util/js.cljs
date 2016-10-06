(ns lt.util.js
  "Provide misc Javascript related functions.")

(defn every
  "Execute `func` every `ms` milliseconds."
  [ms func]
  (js/setInterval func ms))

(defn wait
  "Wait `ms` milliseconds before executing `func`."
  [ms func]
  (js/setTimeout func ms))

(defn now
  "Return the current time in milliseconds starting from the Unix epoch."
  []
  (.getTime (js/Date.)))

(defn toggler
  "If `cur` equals `op` then return `op2`. Otherwise return `op`."
  [cur op op2]
  (if (= cur op)
    op2
    op))

(defn debounce
  "Debounce execution of `func` with a delay of `ts` milliseconds.

  In other words, returns a new function that executes `func` only once
  after `ts` milliseconds regardless the number of times the new function is called
  during the `ts` milliseconds.

  See [[throttle]]."
  [ts func]
  ;; For js/Cowboy, see deploy/core/node_modules/lighttable/throttle.js
  (.debounce js/Cowboy ts func))

(defn throttle
  "Throttle execution of `func` with a delay of `ts` milliseconds.

  In other words, returns a new function that executes `func` no more than
  once every `ts` milliseconds.

  See [[debounce]]."
  [ts func]
  ;; For js/Cowboy, see deploy/core/node_modules/lighttable/throttle.js
  (.throttle js/Cowboy ts func))

(defn ->clj
  "Convert JSON `data` to ClojureScript with keywords enabled.

  See [js->clj](http://cljs.github.io/api/cljs.core/js-GTclj)."
  [data]
  (js->clj data :keywordize-keys true))

(def entities
  "Map of entities, such as `&`, to their corresponding character reference."
  {"&" "&amp;"
   "<" "&lt;"
   ">" "&gt;"
   "\"" "&quot;"
   "'" "&#39;"
   "/" "&#x2F;"})

(defn escape
  "Replace characters in `str` that are in [[entities]] with their escaped equivalent."
  [str]
  (when str
    (.replace str (js/RegExp. "[&<>\"'/]" "g") (fn [s]
                                                 (entities s)))))
