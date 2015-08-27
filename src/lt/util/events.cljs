(ns lt.util.events
  "Provide DOM event related fns")

(defn capture
  ([ev handler] (capture js/document ev handler))
  ([elem ev handler] (.addEventListener elem (name ev) handler true)))
