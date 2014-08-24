(ns lt.util.deprecate
  (:require-macros [lt.deprecate-macros :as deprecate]))

(def deprecated (atom {:var {}
                       :fn  {}
                       :ns  {}
                       :beh {}
                       :obj {}
                       :tag {}
                       }))

(def key-name {
                :var "variable"
                :fn  "function"
                :ns  "namespace"
                :beh "behavior"
                :obj "object"
                :tag "tag"
                })

(defn mark-deprecated [type old-name val]
  (swap! deprecated assoc-in [type old-name] val))

(defn mark-activated [type old-name new-name]
  (let [deprecations (type @deprecated)]
    (when-not (get deprecations old-name)
      (.warn js/console (str "The " (type key-name) " '" old-name "' has been deprecated. Please use '" new-name "' instead."))
      (mark-deprecated type old-name true))))

