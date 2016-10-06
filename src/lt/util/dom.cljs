(ns lt.util.dom
  "Provide DOM related functions."
  (:refer-clojure :exclude [parents remove next val empty]))

(defn lazy-nl-via-item
  "Return lazy seq of NodeList."
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
  (-nth
    ([this n]
     (.item this n))
    ([this n not-found]
     (or (.item this n) not-found))))

(extend-type js/NodeList
  ISeqable
  (-seq [this] (lazy-nl-via-item this))

  ICounted
  (-count [this] (.-length this))

  IIndexed
  (-nth
    ([this n]
     (.item this n))
    ([this n not-found]
     (or (.item this n) not-found))))

(defn text-node
  "Create a text node containing string `text`."
  [text]
  (js/document.createTextNode text))

(defn $$
  "Returns a NodeList of all elements within `elem` that match `query`.

  If `elem` is not specified then the entire document is used."
  ([query] ($$ query js/document))
  ([query elem] (.querySelectorAll elem (name query))))

(defn $
  "Returns the first element found within `elem` that matches `query`.

  If `elem` is not specified then the entire document is used.

  Example:
  ```
  ;; Assume there exists a div such as:
  ;; <div class=\"tabsets\">

  ($ \"div .tabsets\")
  ;;=> #<[object HTMLDivElement]>
  ```"
  ([query]  ($ query js/document))
  ([query elem] (.querySelector elem (name query))))

(defn append
  "Append `child` to the `parent` as a child node. If `child` already exists
  as a node then it is moved to the new location.

  Returns `parent`."
  [parent child]
  (.appendChild parent child)
  parent)

(defn prepend
  "Insert `child` as the first child node of `parent`, if there already exist children nodes.
  Otherwise, [[append]] `child`."
  [parent child]
  (if (.-firstChild parent)
    (.insertBefore parent child (.-firstChild parent))
    (append parent child)))

(defn add-class
  "Add `class` to the classList of `elem`."
  [elem class]
  (when (and elem (not (empty? (name class))))
    (.add (.-classList elem) (name class))))

(defn remove-class
  "Remove `class` from the classList of `elem`."
  [elem class]
  (when (and elem (not (empty? (name class))))
    (.remove (.-classList elem) (name class))))

(defn has-class?
  "True when `elem` has `class` in its classList."
  [elem class]
  (when (and elem (not (empty? (name class))))
    (.contains (.-classList elem) (name class))))

(defn toggle-class
  "If `elem` has `class` then remove `class`. Otherwise, `class` is added to `elem`."
  [elem class]
  (if (has-class? elem class)
    (remove-class elem class)
    (add-class elem class)))

(defn set-css
  "Add each key-value pair in `things` to `elem`'s style.

  Returns `nil`, if change was successful.

  Example:
  ```
  ;; Assume there exists a div such as:
  ;; <div class=\"tabsets\" style=\"bottom: 34px;\">

  ;; Returns nil, but makes the change.
  (dom/set-css ($ \"div\") {\"bottom\" \"50px\"})
  ;;=> nil
  ;; div is now: <div class=\"tabsets\" style=\"bottom: 50px;\">
  ```"
  [elem things]
  (doseq [[k v] things]
    (aset (.-style elem) (name k) (if (keyword? v) (name v) v))))

(defn css
  "If `things` is a map, sets the CSS of `elem` via [[set-css]]. Otherwise,
  returns what is located at key `things` in `elem`.

  Example:
  ```
  ;; Assume there exists a div such as:
  ;; <div class=\"tabsets\" style=\"bottom: 34px;\">

  (css ($ \"div .tabsets\") :bottom)
  ;;=> \"34px\"

  ;; Returns nil, but makes the change.
  (css ($ \"div .tabsets\") {\"bottom\" \"50px\"})
  ;;=> nil

  (css ($ \"div .tabsets\") \"bottom\")
  ;;=> \"50px\"
  ```"
  [elem things]
  (let [things (if (= js/Object (type things))
                 (js->clj things)
                 things)]
    (if (map? things)
      (set-css elem things)
      (aget (.-style elem) (name things)))))

(defn set-attr
  "Add each key-value pair in `things` to `elem`'s attributes.

  Returns `nil`, if change was successful.

  Example:
  ```
  ;; Assume there exists a div such as:
  ;; <div class=\"tabsets\">

  ;; Returns nil, but makes the change.
  (dom/set-attr ($ \"div .tabsets\") {:draggable \"true\"})
  ;;=> nil
  ;; div is now: <div class=\"tabsets\" draggable=\"true\";>
  ```"
  [elem things]
  (doseq [[k v] things]
    (.setAttribute elem (name k) (if (keyword? v) (name v) v))))

(defn attr
  "If `things` is a map, sets the attributes of `elem` via [[set-attr]]. Otherwise, returns
  what is located at key `things` in `elem`.

  Example:
  ```
  ;; Assume there exists a div such as:
  ;; <div class=\"tabsets\" draggable=\"true\";>

  (attr ($ \"div .tabsets\") \"draggable\")
  ;;=> \"true\"

  ;; Returns nil, but makes the change.
  (attr ($ \"div .tabsets\") {\"draggable\" \"false\"})
  ;;=> nil

  (attr ($ \"div .tabsets\") \"draggable\")
  ;;=> \"false\"
  ```"
  [elem things]
  (if (map? things)
    (set-attr elem things)
    (.getAttribute elem (name things))))

(defn parent
  "Return the parent node of `elem`.

  Note: using `parent` on the document node will result in a type error.

  Example:
  ```
  (parent ($ \"body\"))
  ;;=> #<[object HTMLHtmlElement]>

  (.-nodeName (parent ($ \"body\")))
  ;;=> \"HTML\"
  ```"
  [elem]
  (.-parentNode elem))

(defn children
  "Return the child nodes of `elem`."
  [elem]
  (.-children elem))

(defn remove
  "Remove `elem` from the DOM tree."
  [elem]
  (when-let [p (parent elem)]
    (.removeChild p elem)))

(defn empty
  "Sets the inner HTML of `elem` to an empty string."
  [elem]
  (set! (.-innerHTML elem) ""))

(defn val
  "If `v` is provided then set the value of `elem` to `v`. Otherwise, return the
  current value of `elem`."
  [elem & [v]]
  (if-not v
    (.-value elem)
    (set! (.-value elem) v)))

(defn prevent
  "Cancel event `e`, if it is cancelable. Does not stop further propagation.

  See [[stop-propagation]]."
  [e]
  (.preventDefault e))

(defn stop-propagation
  "Stop further propagation of event `e`.

  See [[prevent]]."
  [e]
  (.stopPropagation e))

(defn siblings
  "Return child nodes of `elem`'s parent."
  [elem]
  (.-children (parent elem)))

(defn parents
  "Starting with `elem`'s immediate parent going up, returns first parent of
  `elem` that has a selector matching `sel` or `nil` if no match is found."
  [elem sel]
  (let [root (parent ($ :body))]
    (loop [p (parent elem)]
      (when (and p
                 (not= p root))
        (if (.webkitMatchesSelector p (name sel))
          p
          (recur (parent p)))))))

(defn next
  "Returns the next element at the same level of `elem` in the DOM tree.
  `nil` if there are no siblings."
  [elem]
  (.-nextElementSibling elem))

(defn before
  "Insert element `neue` into `elem`'s parent in the position before `elem`.

  See [[after]]."
  [elem neue]
  (.insertBefore (parent elem) neue elem))

(defn after
  "Insert element `neue` into `elem`'s parent in the position after `elem`.

  See [[before]]."
  [elem neue]
  (if-let [n (next elem)]
    (before n neue)
    (append (parent elem) neue)))

(defn replace-with
  "Replace `orig` with `neue`."
  [orig neue]
  (when-let [p (parent orig)]
    (.replaceChild p neue orig)))

(defn height
  "Returns the height of the visible area for `elem`, in pixels. The value
  contains the height with the padding, but it does not include the scrollBar,
  border, and the margin."
  [elem]
  (.-clientHeight elem))

(defn width
  "Returns the width of the visible area for `elem`, in pixels. The value
  contains the width with the padding, but it does not include the scrollBar,
  border, and the margin."
  [elem]
  (.-clientWidth elem))

(defn scroll-width
  "Returns, in pixels, whichever is greater, the width of the content within
  `elem` or the width of `elem` itself."
  [elem]
  (.-scrollWidth elem))

(defn offset-top
  "Return, in pixels, the offset of `elem` relative to the top of the
  parent."
  [elem]
  (.-offsetTop elem))

(defn scroll-top
  "Returns or sets the scrollTop value of `elem` depending on if `v` was
  provided."
  [elem & [v]]
  (if-not v
    (.-scrollTop elem)
    (set! (.-scrollTop elem) v)))

(defn top
  "Return the `:top` style of `elem`."
  [elem]
  (css elem :top))

(defn bottom
  "Return the `:bottom` style of `elem`."
  [elem]
  (css elem :bottom))

(defn left
  "Return the `:left` style of `elem`."
  [elem]
  (css elem :left))

(defn right
  "Return the `:right` style of `elem`."
  [elem]
  (css elem :right))

(defn html
  "Return the inner HTML of `elem` or set the inner HTML to `h`."
  [elem & [h]]
  (if-not h
    (.-innerHTML elem)
    (set! (.-innerHTML elem) h)))

(defn ->ev
  "Convert `ev` to string."
  [ev]
  (str (name ev)))

(defn trigger
  "Trigger a HTMLEvents event named `ev` on `elem` with `opts` set on the
  event."
  [elem ev & [opts]]
  (let [e (.createEvent js/document "HTMLEvents")]
    (.initEvent e (name ev) true true)
    (set! (.-opts e) opts)
    (.dispatchEvent elem e)))

(defn on
  "Add event listener named `ev` on `elem` with callback function `cb`."
  [elem ev cb]
  (.addEventListener elem (->ev ev) cb))

(defn off
  "Remove event listener named `ev` on `elem` with callback function `cb`."
  [elem ev cb]
  (.removeEventListener elem (->ev ev) cb))

(defn on*
  "Add multiple event listeners to `elem`.

  `evs` should be a map of the form `{:ev cb}` where `:ev` is the name and
  `cb` the callback function."
  [elem evs]
  (doseq [[ev cb] evs]
    (.addEventListener elem (->ev ev) cb)))

(defn active-element
  "Return the active element of the document.

  An active element does not necessarily have focus, but an element with focus
  is always the active element in a document."
  []
  (.-activeElement js/document))

(defn focus
  "Sets focus on `elem`."
  [elem]
  (.focus elem))

(defn blur
  "Remove focus from `elem`."
  [elem]
  (.blur elem))

(defn selection
  "Set the current selection range on `elem` with `start` and `stop` being the
  indexes which respectively contain the first and last characters of the
  selection.

  `dir` can be used to set the direction in which selection occurs."
  [elem start stop dir]
  (.setSelectionRange elem start stop dir))

(defn make
  "Create div containing `str` as inner HTML. Returns HTMLCollection of
  resulting div.

  See [[children]]."
  [str]
  (let [d (.createElement js/document "div")]
    (html d str)
    (children d)))

(defn index
  "Returns the index of element `e`, which is where `e` is located inside of its
  parent's list of children, or -1 if there is no parent."
  [e]
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

(defn ready
  "Trigger `func` when `:DOMContentLoaded` fires on the document."
  [func]
  (on js/document :DOMContentLoaded func))

(defn fragment
  "Create and return a document fragment with `items` appended to it as
  children."
  [items]
  (let [frag (.createDocumentFragment js/document)]
    (doseq [i items]
      (.appendChild frag i))
    frag))
