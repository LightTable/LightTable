(ns lt.objs.langs.clj.auto-complete
  (:require [complete.core]))

(defn clj-hints [ns]
  (concat
   ;; special forms
   complete.core/special-forms
   ;; local vars
   (complete.core/ns-vars ns)
   ;; local classes
   (complete.core/ns-classes ns)
   ;; local java methods
   (complete.core/ns-java-methods ns)
   ;; aliased namespaces
   (for [[alias required-ns] (ns-aliases ns)]
     (str alias))
   ;; aliased vars
   (for [[alias required-ns] (ns-aliases ns)
         var (complete.core/ns-public-vars required-ns)]
     (str alias "/" var))
   ;; global namespaces
   (for [required-ns (all-ns)]
     (str required-ns))
   ;; global vars
   (for [required-ns (all-ns)
         var (complete.core/ns-public-vars required-ns)]
     (str required-ns "/" var))
   ;; global classes
   ;; TODO static methods
   ;; TODO cant do these until quicklist is faster
   ;; (deref complete.core/top-level-classes 0 nil)
   ;; (deref complete.core/nested-classes 0 nil)
   ))

(defn cljs-hints [ns]
  (let [nss (-> @lighttable.nrepl.cljs/compiler-env :cljs.analyzer/namespaces)]
    (concat
     ;; special forms
     complete.core/special-forms
     ;; local vars
     ;; TODO filter private defs
     (for [def (-> nss (get ns) :defs keys)]
       (str def))
     (for [def (-> nss (get ns) :uses keys)]
       (str def))
     ;; aliased namespaces
     (for [[alias aliased-ns] (-> nss (get ns) :requires)
           :when (not= alias aliased-ns)]
       (str alias))
     ;; aliased vars
     (for [[alias aliased-ns] (-> nss (get ns) :requires)
           :when (not= alias aliased-ns)
           def (-> nss (get aliased-ns) :defs keys)]
       (str alias "/" def))
     ;; global namespaces
     (for [global-ns (-> nss keys)]
       (str global-ns))
     ;; global vars
     (for [[global-ns val] nss
           def (-> val :defs keys)]
       (str global-ns "/" def)))))