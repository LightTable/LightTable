(ns lt.util.dom
  (:refer-clojure :exclude [parents remove next val]))

(defn lazy-nl-via-item
  ([nl] (lazy-nl-via-item nl 0))
  ([nl n] (when (< n (. nl -length))
            (lazy-seq
             (cons (. nl (item n))
                   (lazy-nl-via-item nl (inc n)))))))

(extend-type js/HTMLCollection
  ISeqable
  (-seq [this] (lazy-nl-via-item this))

  ICounted
  (-count [this] (.-length this))

  IIndexed
  (-nth [this n]
    (.item this n))
  (-nth [this n not-found]
        (or (.item this n) not-found)))

(extend-type js/NodeList
  ISeqable
  (-seq [this] (lazy-nl-via-item this))

  ICounted
  (-count [this] (.-length this))

  IIndexed
  (-nth [this n]
    (.item this n))
  (-nth [this n not-found]
        (or (.item this n) not-found)))

(defn text-node [text]
  (js/document.createTextNode text))

(defn $$ [query elem]
  (let [elem (or elem js/document)
        res (.querySelectorAll elem (name query))]
    res))

(defn $ [query elem]
  (let [elem (or elem js/document)
        res (.querySelector elem (name query))]
    res))

(defn append [parent child]
  (.appendChild parent child)
  parent)

(defn prepend [parent child]
  (if (.-firstChild parent)
    (.insertBefore parent child (.-firstChild parent))
    (append parent child)))

(defn add-class [elem class]
  (when (and elem (not (empty? (name class))))
    (.add (.-classList elem) (name class))))

(defn remove-class [elem class]
  (when (and elem (not (empty? (name class))))
    (.remove (.-classList elem) (name class))))

(defn has-class? [elem class]
  (when (and elem (not (empty? (name class))))
    (.contains (.-classList elem) (name class))))

(defn toggle-class [elem class]
  (if (has-class? elem class)
    (remove-class elem class)
    (add-class elem class)))

(defn set-css [elem things]
  (doseq [[k v] things]
    (aset (.-style elem) (name k) (if (keyword? v) (name v) v))))

(defn css [elem things]
  (let [things (if (= js/Object (type things))
            (js->clj things)
            things)]
    (if (map? things)
      (set-css elem things)
      (aget (.-style elem) (name things)))))

(defn set-attr [elem things]
  (doseq [[k v] things]
    (.setAttribute elem (name k) (if (keyword? v) (name v) v))))

(defn attr [elem things]
  (if (map? things)
    (set-attr elem things)
    (.getAttribute elem (name things))))

(defn parent [elem]
  (.-parentNode elem))

(defn children [elem]
  (.-children elem))

(defn remove [elem]
  (when-let [p (parent elem)]
    (.removeChild p elem)))

(defn empty [elem]
  (set! (.-innerHTML elem) ""))

(defn val [elem & [v]]
  (if-not v
    (.-value elem)
    (set! (.-value elem) v)))

(defn prevent [e]
  (.preventDefault e))

(defn stop-propagation [e]
  (.stopPropagation e))

(defn siblings [elem]
  (.-children (parent elem)))

(defn parents [elem sel]
  (let [root (parent ($ :body))]
    (loop [p (parent elem)]
      (when (and p
                 (not= p root))
        (if (.webkitMatchesSelector p (name sel))
          p
          (recur (parent p)))))))

(defn next [elem]
  (.-nextElementSibling elem))

(defn before [elem neue]
  (.insertBefore (parent elem) neue elem))

(defn after [elem neue]
  (if-let [n (next elem)]
    (before n neue)
    (append (parent elem) neue)))

(defn replace-with [orig neue]
  (when-let [p (parent orig)]
    (.replaceChild p neue orig)))

(defn height [elem]
  (.-clientHeight elem))

(defn width [elem]
  (.-clientWidth elem))

(defn offset-top [elem]
  (.-offsetTop elem))

(defn scroll-top [elem & [v]]
  (if-not v
    (.-scrollTop elem)
    (set! (.-scrollTop elem) v)))

(defn top [elem]
  (css elem :top))

(defn bottom [elem]
  (css elem :bottom))

(defn left [elem]
  (css elem :left))

(defn right [elem]
  (css elem :right))

(defn html [elem & [h]]
  (if-not h
    (.-innerHTML elem)
    (set! (.-innerHTML elem) h)))

(defn ->ev [ev]
  (str (name ev)))

(defn trigger [elem ev & [opts]]
  (let [e (.createEvent js/document "HTMLEvents")]
    (.initEvent e (name ev) true true)
    (set! (.-opts e) opts)
    (.dispatchEvent elem e)))

(defn on [elem ev cb]
  (.addEventListener elem (->ev ev) cb))

(defn off [elem ev cb]
  (.removeEventListener elem (->ev ev) cb))

(defn on* [elem evs]
  (doseq [[ev cb] evs]
    (.addEventListener elem (->ev ev) cb)))

(defn active-element []
  (.-activeElement js/document))

(defn focus [elem]
  (.focus elem))

(defn blur [elem]
  (.blur elem))

(defn selection [elem start stop dir]
  (.setSelectionRange elem start stop dir))

(defn make [str]
  (let [d (.createElement js/document "div")]
    (html d str)
    (children d)))

(defn index [e]
  (let [p (parent e)
        c (if p (children p) (array))
        len (.-length c)]
    (if-not p
      -1
      (loop [i 0]
        (if (>= i len)
          nil
          (if (= (aget c i) e)
            i
            (recur (inc i))))))))

(defn ready [func]
  (on js/document :DOMContentLoaded func))

(defn fragment [items]
  (let [frag (.createDocumentFragment js/document)]
    (doseq [i items]
      (.appendChild frag i))
    frag))

