(ns lt.util.setup
  (:require [lt.objs.files :as files]))

(defn up-to-date? []
  (and js/window.setup
       (.-upToDate js/window.setup)))

(defn npm-require [path]
  (let [p (if (up-to-date?)
            (files/lt-home "js/node_modules/")
            (files/join files/pwd "deploy/js/node_modules/"))]
    (js/require (files/join p path))))
