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


(defn obj-exists? [s]
  (loop [parts (string/split s ".")
         cur js/window]
    (if-not (first parts)
      cur
      (if-let [cur (aget cur (first parts))]
        (recur (rest parts) cur)))))

(def provided #js {})

(defn provided-ancestors [parent]
  (count (.filter (js/Object.keys provided) #(> (.indexOf % parent) -1))))

(defn only-ancestors? [cur s]
  (<= (.-length (js/Object.keys cur)) (provided-ancestors s)))

(defn provided? [s]
  (let [res (if (aget provided s)
              true
              (when-let [cur (obj-exists? s)]
                (not (only-ancestors? cur s))))]
    (aset provided s true)
    res))
