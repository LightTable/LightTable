(ns lt.deprecate-macros)

(defn full-name [ns-key sym]
  (let [ns-str (clojure.core/namespace ns-key)]
    (str ns-str "/" sym)))

;; Variables

;; @TODO: Add warning.
(defmacro variable [ns-key old-name new-name val]
  `(let [ns-old-name# (symbol ~(full-name ns-key old-name))]
     (lt.util.deprecate/mark-deprecated :var ns-old-name# "???")
     (def ~new-name ~val)
     (def ~old-name ~new-name)))

;; Ex.
;; (macroexpand-1 '(variable ::ns old-var new-var 5))


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


;; Namespaces
(defmacro namespace [old-name new-name]
  `(do
     (lt.util.deprecate/mark-deprecated :ns ~(str old-name) nil)
     (let [old-proxy# ~(clojure.string/split (str old-name) #"\.")
           old-root# (butlast old-proxy#)
           old-tail# (last old-proxy#)
           mk-ns# (fn [memo# v#]
                    (when-not (aget memo# v#)
                      (aset memo# v# (clojure.core/js-obj)))
                    (aget memo# v#))
           old-obj# (reduce mk-ns# js/window old-root#)]

       (.__defineGetter__
        old-obj# old-tail#
        (fn []
          (lt.util.deprecate/mark-activated :ns ~(str old-name) ~(str new-name))
          ~new-name))
       )))

;; No inline example possible -- this wankery only runs in cljs.
;; (macroexpand-1 '(namespace lt.blues.clues lt.util.deprecate))


