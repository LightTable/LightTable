(ns crate.compiler
  (:require [goog.dom :as gdom]
            [goog.style :as gstyle]
            [clojure.string :as string]
            [crate.binding :as bind]))

(def xmlns {:xhtml "http://www.w3.org/1999/xhtml"
            :svg "http://www.w3.org/2000/svg"})

;; ********************************************
;; Element creation via Hiccup-like vectors
;; ********************************************

(declare elem-factory dom-attr dom-style)
(def group-id (atom 0))


;; ********************************************
;; Data binding
;; ********************************************

(def ^:dynamic bindings (atom []))

(defn capture-binding [tag b]
  (swap! bindings conj [tag b]))

(defprotocol Element
  (-elem [this]))

(defn as-content [parent content]
  (doseq[c content]
    (let [child (cond
                 	(satisfies? Element c) (-elem c)
                  (nil? c) nil
                  (map? c) (throw "Maps cannot be used as content")
                  (string? c) (gdom/createTextNode c)
                  (vector? c) (elem-factory c)
                  ;;TODO: there's a bug in clojurescript that prevents seqs from
                  ;; being considered collections
                  (seq? c) (as-content parent c)
                  (bind/binding-coll? c) (do (capture-binding :coll c) (as-content parent [(bind/value c)]))
                  (bind/binding? c) (do (capture-binding :text c) (as-content parent [(bind/value c)]))
                  (.-nodeName c) c
                  (.-get c) (.get c 0)
                  :else (gdom/createTextNode (str c)))]
      (when child
        (gdom/appendChild parent child)))))

(defmulti dom-binding (fn [type _ _] type))
(defmethod dom-binding :text [_ b elem]
  (bind/on-change b (fn [v]
                      (gdom/removeChildren elem)
                      (as-content elem [v]))))

(defmethod dom-binding :attr [_ [k b] elem]
  (bind/on-change b (fn [v]
                      (dom-attr elem k v))))

(defmethod dom-binding :style [_ [k b] elem]
  (bind/on-change b (fn [v]
                      (if k
                        (dom-style elem k v)
                        (dom-style elem v)))))

(defn dom-add [bc parent elem v]
  (if-let [adder (bind/opt bc :add)]
    (adder parent elem v)
    (gdom/appendChild parent elem)))

(defn dom-remove [bc elem]
  (if-let [remover (bind/opt bc :remove)]
    (remover elem)
    (gdom/removeNode elem)))

(defmethod dom-binding :coll [_ bc parent]
  (bind/on-change bc (fn [type elem v]
                       (condp = type
                         :add (dom-add bc parent elem v)
                         :remove (dom-remove bc elem)))))

(defn handle-bindings [bs elem]
  (doseq [[type b] bs]
    (dom-binding type b elem)))

;; ********************************************
;; element handling
;; ********************************************

(defn dom-style
  ([elem v]
   (cond
     (string? v) (. elem (setAttribute "style" v))
     (map? v) (doseq [[k v] v]
                (dom-style elem k v))
     (bind/binding? v) (do
                         (capture-binding :style [nil v])
                         (dom-style elem (bind/value v))))
   elem)
  ([elem k v]
   (let [v (if (bind/binding? v)
             (do
               (capture-binding :style [k v])
               (bind/value v))
             v)]
     (gstyle/setStyle elem (name k) v))))

(defn dom-attr
  ([elem attrs]
   (when elem
     (if-not (map? attrs)
       (. elem (getAttribute (name attrs)))
       (do
         (doseq [[k v] attrs]
           (dom-attr elem k v))
         elem))))
  ([elem k v]
   (if (= k :style)
     (dom-style elem v)
     (let [v (if (bind/binding? v)
               (do
                 (capture-binding :attr [k v])
                 (bind/value v))
               v)]
       (. elem (setAttribute (name k) v))))
   elem))

;; From Weavejester's Hiccup: https://github.com/weavejester/hiccup/blob/master/src/hiccup/core.clj#L57
(def ^{:doc "Regular expression that parses a CSS-style id and class from a tag name." :private true}
  re-tag #"([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?")

(defn- normalize-map-attrs [map-attrs]
  (into {} (map (fn [[n v]] (if (true? v) [n (name n)] [n v]))
                (filter (comp boolean second)
                        map-attrs))))

(defn- normalize-element
  "Ensure a tag vector is of the form [tag-name attrs content]."
  [[tag & content]]
  (when (not (or (keyword? tag) (symbol? tag) (string? tag)))
    (throw (str tag " is not a valid tag name.")))
  (let [[_ tag id class] (re-matches re-tag (name tag))
        [nsp tag]     (let [[nsp t] (string/split tag #":")
                               ns-xmlns (xmlns (keyword nsp))]
                           (if t
                             [(or ns-xmlns nsp) t]
                             [(:xhtml xmlns) nsp]))
        tag-attrs        (into {}
                               (filter #(not (nil? (second %)))
                                       {:id (or id nil)
                                        :class (if class (string/replace class #"\." " "))}))
        map-attrs        (first content)]
    (if (map? map-attrs)
      [nsp tag (merge tag-attrs (normalize-map-attrs map-attrs)) (next content)]
      [nsp tag tag-attrs content])))

(defn parse-content [elem content]
  (let [attrs (first content)]
  (if (map? attrs)
    (do
      (dom-attr elem attrs)
      (rest content))
    content)))

(def create-elem (if (.-createElementNS js/document)
                   (fn [nsp tag]
                     (.createElementNS js/document nsp tag))
                   (fn [_ tag]
                     (.createElement js/document tag))))

(defn elem-factory [tag-def]
  (binding [bindings (atom [])]
    (let [[nsp tag attrs content] (normalize-element tag-def)
          elem (create-elem nsp tag)]
      (dom-attr elem attrs)
      (as-content elem content)
      (handle-bindings @bindings elem)
      elem)))

(defn add-optional-attrs
  "Add an optional attribute argument to a function that returns a vector tag."
  [func]
  (fn [& args]
    (if (map? (first args))
      (let [[tag & body] (apply func (rest args))]
        (if (map? (first body))
          (apply vector tag (merge (first body) (first args)) (rest body))
          (apply vector tag (first args) body)))
      (apply func args))))
