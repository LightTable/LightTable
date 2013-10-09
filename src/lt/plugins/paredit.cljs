(ns lt.plugins.paredit
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]))

(def opposites {")" "("
                "(" ")"
                "{" "}"
                "}" "{"
                "[" "]"
                "]" "["})

(def dir-swap {:left :right
               :right :left})

(def dir-fn {:left dec
             :right inc})

(def form-start #"[\{\(\[]")
(def form-end #"[\}\)\]]")

(defn scan [{:keys [dir str loc for ed negation] :as opts}]
  (let [move (if (= dir :left)
               dec
               inc)
        stack-chars (if (= dir :left)
                      form-end
                      form-start)
        len (count str)]
    (loop [i loc
           stack []]
      (let [cur (get str i)]
        (if (and cur
                 (re-seq for cur)
                 (not (seq stack))
                 (if negation
                   (negation str i cur)
                   true))
          [cur i]
          (if (or (not cur) (> i len) (< i 0))
            nil
            (recur (move i) (cond
                             (re-seq stack-chars cur) (conj stack cur)
                             (= cur (-> stack last opposites)) (pop stack)
                             :else stack))))))))

(defn form-boundary [s loc]
  (let [[c start] (scan {:dir :left
                         :str s
                         :loc (dec loc)
                         :for form-start})
        [c end] (if-not c
                  [nil nil]
                  (scan {:dir :right
                       :str s
                       :loc (inc start)
                       :for (re-pattern (str "[\\" (opposites c) "]"))}))]
    [start end]))

(defn escaped-scan [s i thing dir]
  (let [[c end] (scan {:dir dir
                       :str s
                       :loc (inc i)
                       :negation (fn [s i cur]
                                   (not= (get s (dec i)) "\\"))
                       :for (re-pattern (str "[" thing "]"))})]
    (if (= dir :left)
      [end i]
      [i end])))

(defn string-bounds [s i dir]
  (escaped-scan s i "\"" dir))

(defn token-bounds [s i dir]
  (let [[c end] (scan {:dir dir
                       :str s
                       :loc ((dir-fn dir) i)
                       :for #"[\s\)\}\]\"\(\{\[]"})]
    (if (= dir :left)
      [end i]
      [i end])))

(defn first-non-whitespace [string point move]
  (loop [i point
         cur (get string point)]
    (if (or (not cur)
            (re-seq #"\S" cur))
      [i cur]
      (recur (move i) (get string (move i))))))

(defn anchored-move [string loc anchor-side dir]
  (let [move (dir-fn dir)
        [start end] (form-boundary string loc)
        point (if (= :left anchor-side)
                start
                end)
        [i cur] (first-non-whitespace string (move point) move)
        next (when cur
               (cond
                ;; handle begin form
                (opposites cur) (form-boundary string (move i))

                ;;handle string
                (= "\"" cur) (string-bounds string i dir)

                ;;any other thing
                :else (token-bounds string i dir)))]
    {:point point
     :boundary [start end]
     :next next}))

(defn grow [{:keys [string loc] :as orig} dir]
  (let [{:keys [next point]} (anchored-move string loc dir dir)
        neue-point (if (= dir :left)
                     (first next)
                     (second next))]
    (if neue-point
      {:string string
       :loc loc
       :move [point neue-point]}
      orig)))

(defn shrink [{:keys [string loc] :as orig} anchor-side]
    (let [dir (dir-swap anchor-side)
          move (dir-fn dir)
          {:keys [next point boundary] :as anchor-move} (anchored-move string loc anchor-side dir)
          neue-point (if (= anchor-side :left)
                       (second next)
                       (first next))
          [adjusted _] (when neue-point (first-non-whitespace string (move neue-point) move))
          neue-point (if (and adjusted (not= adjust neue-point))
                       ((dir-fn anchor-side) adjusted)
                       neue-point)
          neue-point (cond
                      (and (= anchor-side :left)
                           (> neue-point (second boundary))) (dec (second boundary))
                      (and (= anchor-side :right)
                           (< neue-point (first boundary))) (inc (first boundary))
                      :else neue-point)
          ]
    (if neue-point
      {:string string
       :loc loc
       :move [point neue-point]}
      orig)))

(defn do-move [{:keys [string loc move] :as orig}]
  (if move
    (let [[old neue] move
          o (get string old)
          string (if (> old neue)
                   (str (subs string 0 neue)
                        o
                        (subs string neue old)
                        (subs string (inc old)))
                   (str (subs string 0 old)
                        (subs string (inc old) neue)
                        o
                        (subs string neue)))]
      {:string string
       :loc loc})
    orig))


(def cur "(asdf [] (cool)\n (foo bar) baz)")

(comment
(string-bounds cur 16)

(time(-> (grow {:string cur :loc 6} :right)
    (do-move)
    (shrink :right)
   (do-move)
    (shrink :right)
    (do-move)
    (grow :right)
    (do-move)
    (grow :right)
    (do-move)
    (grow :right)
    (do-move)
    (grow :right)
    (do-move)
    (grow :right)
    (do-move)
    (shrink :left)
    (do-move)

     ))
  )
