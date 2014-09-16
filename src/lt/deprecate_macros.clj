(ns lt.deprecate-macros)

(defn full-name
  ([ns-key sym]
   (let [ns-str (clojure.core/namespace ns-key)]
     (str ns-str
          (when sym (str "/" sym)))))
  ([ns-key] (full-name ns-key nil)))

;; Functions
(defn wrap-bodies [old-name new-name body]
  (let [wrapper (fn [item]
                  `(~(first item)
                     (lt.util.deprecate/mark-activated :fn ~old-name ~new-name)
                     ~(second item)))
        body (if (vector? (first body))
               (list body)
               body)
        body (map wrapper body)]
    body))

(defmacro function [ns-key old-name new-name & body]
  `(let []
     (lt.util.deprecate/mark-deprecated :fn ~(full-name ns-key old-name) nil)
     ~(conj body new-name 'defn)
     ~(conj (wrap-bodies (full-name ns-key old-name)
                         (full-name ns-key new-name)
                         body)
            old-name 'defn)))

;; Ex.
;; (macroexpand-1 '(function ::ns old-name new-name [x] x))
;; (function ::ns old-name new-name [x] x)
;; (new-name 5)
;; (old-name 5)


;; Variables

;; @TODO: Add warning.
(defmacro variable [ns-key old-name new-name val]
  (let [old-str (full-name ns-key old-name)
        new-str (full-name ns-key new-name)
        old-root (clojure.string/split (full-name ns-key) #"\.")]
    `(let [root-obj# (lt.util.deprecate/safe-aget ~old-root)]
       (lt.util.deprecate/mark-deprecated :var ~old-str nil)
       (def ~new-name ~val)
       (.__defineGetter__
        root-obj# ~old-str
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

;; No inline example possible -- this wankery only runs in cljs.
;; (macroexpand-1 '(namespace lt.objs.statusbar lt.objs.status-bar))
