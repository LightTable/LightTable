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


(comment
(def w (worker (fn [m]
                 (send :msg (m :cool))
          )
        :msg (fn [m]
               (println m))))

(w {:cool 5})

(def foo (fn [] (.log js/console "hey")))

(def blah (fn []
            (js/importScripts "file:///users/chris/lighttable/playground/deploy/js/cljsDeps.js")
            (set! js/send (fn [v]
                              (.postMessage js/self (js-obj "type" "send"
                                                            "msg" v))))
            (js/require "walkdir")
            (set! js/onmessage (fn [m]
                                      (when (= (.-data.type m) "start")
                                      	(js/send "doing it")
                                        )
                                      ))
            nil))

(subs (str "" blah) 16 (- (count (str "" blah)) 14))

(def testing (fn []
   ;              (js/send (.sync js/walk "/users/chris/lighttable/playground/src/lt/util/"))
               (+ 3 4)
                 ))

(def worker (.URL.createObjectURL js/window (js/Blob. (array (subs (str "" blah) 16 (- (count (str "" blah)) 14))))))

(def w (js/SharedWorker. worker))
(set! (.-onmessage w) #(.log js/console %))

(.addEventListener w "message" #(.log js/console (.-msg (.-data %))))

(.postMessage w (js-obj "type" "start" "func" (str "" testing)))



;;todo you have to remove blob urls

)