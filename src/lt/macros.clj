(ns lt.macros
  (:require [clojure.walk :as walk]))

(defn- namify [type keyword]
  (symbol (str "__" type "__" (.replace (name keyword) "." "__DOT__"))))

(defmacro behavior [name & {:keys [reaction] :as r}]
  (if (and (seq? reaction) (= 'fn (first reaction)))
    (let [[_ args & body] reaction]
      `(do
         (defn- ~(namify "BEH" name) ~args ~@body)
         (lt.object/behavior* ~name ~@(apply concat (assoc r :reaction (namify "BEH" name))))))
    `(lt.object/behavior* ~name ~@(apply concat r))))

(defmacro defui [sym params hiccup & events]
  `(defn ~sym ~params
     (let [e# (crate.core/html ~hiccup)]
       (doseq [[ev# func#] (partition 2 ~(vec events))]
         (lt.util.dom/on e# ev# func#))
       e#)))

(defmacro timed [ev & body]
  `(let [start# (lighttable.util.js/now)
         res# (do ~@body)]
     (lighttable.components.logger/log ~ev (- (lighttable.util.js/now) start#))
     res#))

(defn ->params [body]
  (if (vector? (first body))
    [(first body) (rest body)]
    [[] body]))

(defmacro on [name & body]
  `(lighttable.command/on ~name (fn ~@body)))

(defmacro in [ctx & body]
  (let [[params body] (->params body)]
    `(assoc ~ctx :in (fn ~params ~@body))))

(defmacro out [ctx & body]
  (let [[params body] (->params body)]
    `(assoc ~ctx :out (fn ~params ~@body))))

(defmacro defcontext [name & body]
  `(let [ctx# {:name ~name}]
     (lighttable.context/add-context!
       (-> ctx#
           ~@body))))

(defmacro extract [elem kvs & body]
  (let [defs (vec (apply concat (for [[k v] (partition 2 kvs)]
                                  `[~k (lt.util.dom/$ ~v ~elem)])))]
    `(let ~defs
       ~@body)))

(defmacro foreach [xs & body]
  `(let [xs# ~(second xs)
         len# (.-length xs#)]
     (loop [left# 0]
       (when (< left# len#)
         (let [~(first xs) (aget xs# left)]
           ~@body
           (recur (inc left#)))))))

(defmacro with-time [& body]
  (let [start (gensym "start")
        body (walk/postwalk-replace {'time (list '- '(.getTime (js/Date.)) start)} body)]
  `(let [~start (.getTime (js/Date.))]
     ~@body)))

(defmacro background [func]
  `(lt.objs.thread/thread*
    (fn ~(gensym "tfun") []
      (let [orig# (js/argsArray js/arguments)
            msg# (.shift orig#)
            args# (.map orig# cljs.reader/read-string)
            ~'raise (fn [obj# k# v#]
                     (js/_send obj# k# (pr-str v#) "clj"))]
        (.unshift args# (.-obj msg#))
        (.apply ~func nil args#)))))

(comment

  (worker (fn [v]
            (do-something v))
          :zomg (fn [r]
                  ))

  (defui cool [l]
    [:li (bound l)]

    :click (fn [e]
             (this-as me
                      ))
    :hover (fn [e]
             ))

  )
