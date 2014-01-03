(ns lt.util.load
  (:require [clojure.string :as string]))

(def fpath (js/require "path"))
(def fs (js/require "fs"))

(def pwd (.resolve fpath "."))

(defn absolute? [path]
  (boolean (re-seq #"^\s*[\\\/]|([\w]+:[\\\/])" path)))

(defn node-module [path]
  (js/require (str pwd "/core/node_modules/" path)))

(defn- prep [code file]
  (str code "\n\n//# sourceURL=" file))

(defn js
  ([file] (js file false))
  ([file sync]
   (let [file (if-not (absolute? file)
                (.join fpath pwd file)
                file)]
   (if sync
     (js/window.eval (-> (.readFileSync fs file)
                         (.toString)
                         (prep file)))
     (.readFile fs (.join fpath pwd file) (fn [content]
                                            (js/window.eval (-> (.toString content)
                                                                (prep file)))))))))

(defn css [file]
   (let [link (js/document.createElement "link")]
     (set! (.-type link) "text/css")
     (set! (.-rel link) "stylesheet")
     (set! (.-href link) (if (absolute? file)
                           (str "file://" file)
                           file))
     (js/document.head.appendChild link)
     link))

(defn provided? [s]
  (loop [parts (string/split s ".")
         cur js/window]
    (if-not (first parts)
      true
      (if-let [cur (aget cur (first parts))]
        (recur (rest parts) cur)))))