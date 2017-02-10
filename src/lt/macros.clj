(ns lt.macros
  "Macros used across LT"
  (:require [clojure.walk :as walk]
            [cljs.core :refer [js-arguments]]))

(defn- namify [type keyword]
  (symbol (str "__" type "__" (.replace (name keyword) "." "__DOT__"))))

(defmacro behavior
  "Define a behavior with a unique namespaced keyword and multiple key value pairs.
  Keys are:

  * :reaction (required) - Function to invoke when behavior is called.
                           First arg is object behavior is attached to
  * :triggers (required) - Set of keyword triggers that trigger behavior
  * :desc - Brief description of behavior.
  * :doc - Equivalent to a traditional function docstring.
  * :type - When set to :user, shows up in hints. Not enabled by default
  * :params - Vector of maps describing behavior args. Each map contains required :label key
              and optional keys of :type (:string, :number or :list), :items and :example
  * :throttle - Number of ms to throttle reaction fn
  * :debounce - Number of ms to debounce reaction fn"
  [name & {:keys [reaction] :as r}]
  (if (and (seq? reaction) (= 'fn (first reaction)))
    (let [[_ args & body] reaction]
      `(do
         (defn- ~(namify "BEH" name) ~(:doc r "") ~args ~@body)
         (lt.object/behavior* ~name ~@(apply concat (assoc r :reaction (namify "BEH" name))))))
    `(lt.object/behavior* ~name ~@(apply concat r))))

(defmacro defui
  "Define a UI element for given hiccup data and key-value pairs
  of events for element. Like defn, a docstring is optional."
  [sym & decl]
   (let [doc (if (string? (first decl))
                  (first decl)
                  "")
        [params hiccup & events] (if (string? (first decl))
                (next decl)
                decl)]
   `(defn ~sym ~doc ~params
      (let [e# (crate.core/html ~hiccup)]
        (doseq [[ev# func#] (partition 2 ~(vec events))]
          (lt.util.dom/on e# ev# func#))
        e#))))

(defmacro ^:private timed [ev & body]
  `(let [start# (lighttable.util.js/now)
         res# (do ~@body)]
     (lighttable.components.logger/log ~ev (- (lighttable.util.js/now) start#))
     res#))

(defn ->params [body]
  (if (vector? (first body))
    [(first body) (rest body)]
    [[] body]))

(defmacro ^:private on [name & body]
  `(lighttable.command/on ~name (fn ~@body)))

(defmacro ^:private in [ctx & body]
  (let [[params body] (->params body)]
    `(assoc ~ctx :in (fn ~params ~@body))))

(defmacro ^:private out [ctx & body]
  (let [[params body] (->params body)]
    `(assoc ~ctx :out (fn ~params ~@body))))

(defmacro ^:private defcontext [name & body]
  `(let [ctx# {:name ~name}]
     (lighttable.context/add-context!
       (-> ctx#
           ~@body))))

(defmacro ^:private extract [elem kvs & body]
  (let [defs (vec (apply concat (for [[k v] (partition 2 kvs)]
                                  `[~k (lt.util.dom/$ ~v ~elem)])))]
    `(let ~defs
       ~@body)))

(defmacro ^:private foreach [xs & body]
  `(let [xs# ~(second xs)
         len# (.-length xs#)]
     (loop [left# 0]
       (when (< left# len#)
         (let [~(first xs) (aget xs# left)]
           ~@body
           (recur (inc left#)))))))

(defmacro ^:private with-time [& body]
  (let [start (gensym "start")
        body (walk/postwalk-replace {'time (list '- '(.getTime (js/Date.)) start)} body)]
  `(let [~start (.getTime (js/Date.))]
     ~@body)))

;; ;;  BenjaminVanRyseghem's attempted fix:
;; (defmacro background
;;   "Register given `func` to run on background thread."
;;   [func]
;;   `(lt.objs.thread/thread*
;;     (fn ~(gensym "tfun") [msg# & body#]
;;       (let [args# (map cljs.reader/read-string body#)
;;             ~'raise (fn [obj# k# v#]
;;                      (js/_send obj# k# (pr-str v#) "clj"))]
;;         (.apply ~func nil `(clj->js (cons (.-obj msg#) args#)))))))


;; Original background function
;; js/_send and js/argsArray are both defined in threadworker.js
;; This is misleading and gross.
(defmacro background
 [func]
 `(lt.objs.thread/thread*
   (fn ~(gensym "tfun") []
     (.log js/console (str "orig#: " (js/argsArray js/arguments)))
     (.log js/console (str "msg#: " (.shift (js/argsArray js/arguments))))
     (.log js/console (str "args#: " (.map (js/argsArray js/arguments) cljs.reader/read-string)))
     (let [orig# (js/argsArray js/arguments)
           msg# (.shift orig#)
           args# (.map orig# cljs.reader/read-string)
           ~'raise (fn [obj# k# v#]
                     (js/_send obj# k# (pr-str v#) "clj"))]
       (.apply ~func nil `(clj->js (cons (.-obj msg#) args#)))))))

(defmacro ^:private aloop [[var arr] & body]
  `(let [arr# ~arr]
     (loop [~var 0]
       (when (< ~var (.-length arr#))
         ~@body
         (recur (+ ~var 1))))))
