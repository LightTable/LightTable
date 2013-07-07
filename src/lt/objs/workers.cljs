(ns lt.objs.workers
  (:require [lt.object :as object]
            [cljs.reader :as reader]
            [lt.objs.files :as files])
  (:require-macros [lt.macros :refer [worker]]))

(defn worker* [func listeners]
  (let [func-str (str "" func)
        trimmed-func-str (subs func-str 13 (- (count func-str) 14)) ;;trim off the errant return and outer function
        url (.URL.createObjectURL js/window (js/Blob. (array trimmed-func-str)))
        w (js/Worker. url)]
    (.postMessage w (files/lt-home))
    (.addEventListener w "message" (fn [m]
                                     (when-let [handler (listeners (.-data.type m))]
                                       (handler (reader/read-string (.-data.msg m))))))
    (fn [msg]
      (if (= msg ::close!)
        (.URL.revokeObjectURL js/window url)
        (.postMessage w (js-obj "type" "message" "data" (pr-str msg)))))))
