(ns crate.util
  (:require [clojure.string :as str]))

(def ^:dynamic *base-url* nil)

(defn as-str
  ([] "")
  ([x]
    ; TODO: Maybe use something like (satisfies? INamed x) instead?
    (if (or (symbol? x) (keyword? x))
      (name x)
      (str x)))
  ([x & xs]
    ((fn [s more]
       (if more
         (recur (str s (as-str (first more))) (next more))
         s))
     (as-str x) xs)))

(defn escape-html
  "Change special characters into HTML character entities."
  [text]
  (-> (as-str text)
    (str/replace "&"  "&amp;")
    (str/replace "<"  "&lt;")
    (str/replace ">"  "&gt;")
    (str/replace "\"" "&quot;")))

(defn to-uri
  "Prepends the base-url to the supplied URI."
  [uri]
  (if (re-matches #"^\w+:.*" uri)
    uri
    (str *base-url* uri)))

(defn url-encode-component [s]
  "urlencode"
  (js/encodeURIComponent (as-str s)))

(defn url-encode
  "Turn a map of parameters into a urlencoded string."
  [params]
  (str/join "&"
    (for [[k v] params]
      (str (url-encode-component k) "=" (url-encode-component v)))))

(defn url
  "Creates a URL string from a variable list of arguments and an optional
  parameter map as the last argument. For example:
    (url \"/group/\" 4 \"/products\" {:page 9})
    => \"/group/4/products?page=9\""
  [& args]
  (let [params (last args)
        args   (butlast args)]
    (str
      (to-uri
        (str (apply str args)
             (if (map? params)
               (str "?" (url-encode params))
               params))))))
