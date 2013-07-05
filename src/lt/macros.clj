(ns lt.macros)

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

(defmacro extract [elem kvs]
  (let [defs (for [[k v] (partition 2 kvs)]
               `(set! ~k (lt.util.dom/$ ~v ~elem)))]
  `(do
     ~@defs)))

(defmacro worker [func & r]
  (let [m (apply hash-map r)]
    `(lt.objs.workers/worker*
      (fn []
        (set! (.-onmessage js/self)
              (fn [msg#]
                (let [~'lthome (.-data msg#)]
                  (js/importScripts (+ "file://" ~'lthome "/js/cljsDeps.js"))
                  (set! js/window (cljs.core/js-obj))
                  (set! js/document (cljs.core/js-obj))
                  (let [~'send (fn [k# v#]
                                 (.postMessage js/self (cljs.core/js-obj "type" k# "msg" (cljs.core/pr-str v#))))]
                    (set! (.-onmessage js/self)
                          (fn [m#]
                            (let [data# (cljs.reader/read-string (.-data.data m#))]
                              (~func data#))
                            ))
                    nil))))
        nil)
      ~m)))


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
