(ns lt.util.load)

(def fpath (js/require "path"))
(def fs (js/require "fs"))

(def pwd (.resolve fpath "."))

(defn node-module [path]
  (js/require (str pwd "/core/node_modules/" path)))

(defn- prep [code file]
  (str code "\n\n//# sourceURL=" file))

(defn js
  ([file] (js file false))
  ([file sync]
   (if sync
     (js/window.eval (-> (.readFileSync fs (.join fpath pwd file))
                         (.toString)
                         (prep file)))
     (.readFile fs (.join fpath pwd file) (fn [content]
                                            (js/window.eval (-> (.toString content)
                                                                (prep file))))))))

(defn css [file]
   (let [link (js/document.createElement "link")]
     (set! (.-type link) "text/css")
     (set! (.-rel link) "stylesheet")
     (set! (.-href link) (if (= (first file) (.-sep fpath))
                           (str "file://" file)
                           file))
     (js/document.head.appendChild link)
     link))

