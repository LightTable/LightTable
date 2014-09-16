(ns lt.deprecate-macros)

(defn full-name
  ([ns-key sym]
   (let [ns-str (clojure.core/namespace ns-key)]
     (str ns-str
          (when sym (str "/" sym)))))
  ([ns-key] (full-name ns-key nil)))

;; Functions

;; Injects a call to mark-activated into the given function body or bodies.
(defn wrap-bodies [old-name new-name & bodies]
  (map
   (fn [[args body]]
     `(~args
       (lt.util.deprecate/mark-activated :fn ~old-name ~new-name)
       ~body))
   (if (vector? (first bodies))
     (list bodies)
     bodies)))

(defmacro function [ns-key old-name new-name & body]
  `(do
     (lt.util.deprecate/mark-deprecated :fn ~(full-name ns-key old-name) nil)
     (defn ~new-name ~@body)
     (defn ~old-name
       ~@(wrap-bodies (full-name ns-key old-name)
                      (full-name ns-key new-name)
                      body))))

;; Ex.
;; (macroexpand-1 '(function ::ns old-name new-name [x] x))
;; (function ::ns old-name new-name [x] x)
;; (macroexpand-1 '(function ::ns old-name-2 new-name-2 ([x] x) ([x y] (+ x y))))
;; (function ::ns old-name-2 new-name-2 ([x] x) ([x y] (+ x y)))


;; Variables
(defmacro variable [ns-key old-name new-name val]
  (let [old-str (full-name ns-key old-name)
        new-str (full-name ns-key new-name)
        old-root (clojure.string/split (full-name ns-key) #"\.")]
    `(let [root-obj# (lt.util.deprecate/safe-aget ~old-root)]
       (lt.util.deprecate/mark-deprecated :var ~old-str nil)
       (def ~new-name ~val)
       (.__defineGetter__
        root-obj# ~(str old-name)
        (fn []
          (lt.util.deprecate/mark-activated :var ~old-str ~new-str)
          ~new-name)))))

;; Ex.
;; (macroexpand-1 '(variable ::ns old-var new-var 5))


;; Namespaces
(defmacro namespace [old-name new-name]
  (let [old-str (str old-name)
        new-str (str new-name)
        old-proxy (clojure.string/split old-str #"\.")
        old-root (vec (butlast old-proxy))
        old-tail (last old-proxy)]
    `(let [root-obj# (lt.util.deprecate/safe-aget ~old-root)]
       (lt.util.deprecate/mark-deprecated :ns ~old-str nil)
       (.__defineGetter__
        root-obj# ~old-tail
        (fn []
          (lt.util.deprecate/mark-activated :ns ~old-str ~new-str)
            ~new-name)))))

;; Ex.
;; (macroexpand-1 '(namespace lt.objs.statusbar lt.objs.status-bar))
