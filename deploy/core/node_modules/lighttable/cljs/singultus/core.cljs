(ns singultus.core
  (:require [goog.dom :as gdom]
            [singultus.compiler :as compiler]
            [singultus.util :as util]))

(def group-id (atom 0))

(defn raw [html-str]
  (gdom/htmlToDocumentFragment html-str))

(defn html [& tags]
  (let [res (map compiler/elem-factory tags)]
    (if (second res)
      res
      (first res))))

(def ^ {:doc "Alias for singultus.util/escape-html"}
  h util/escape-html)
