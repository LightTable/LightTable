(ns lt.util.events
  "Provide DOM event related functions.")

(defn capture
  "Add function `handler` to trigger when event listener `ev` fires on `elem`.

  If `elem` is not provided then the event `ev` and its `handler` are bound to the document."
  ([ev handler] (capture js/document ev handler))
  ([elem ev handler] (.addEventListener elem (name ev) handler true)))
