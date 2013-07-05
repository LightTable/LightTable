(ns lt.util.events)

(defn capture
  ([ev handler] (capture js/document ev handler))
  ([elem ev handler] (.addEventListener elem (name ev) handler true)))
