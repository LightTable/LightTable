(ns lt.plugins.paredit
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.command :as cmd]
            [lt.util.cljs :refer [str-contains?]]

            ))

(def opposites {")" "("
                "(" ")"
                "{" "}"
                "}" "{"
                "[" "]"
                "]" "["})

(def dir-swap {:left :right
               :right :left})

(def form-start #"[\{\(\[]")
(def form-end #"[\}\)\]]")

(defn end-loc [ed]
  (let [last-line (editor/last-line ed)]
    {:line last-line
     :ch (max 0 (dec (editor/line-length ed last-line)))}))

(defn loc>loc [l1 l2]
  (cond
   (> (:line l1) (:line l2)) true
   (> (:line l2) (:line l1)) false
   (> (:ch l1) (:ch l2)) true
   :else false))

(defn move-loc-line [ed loc dir]
  (when loc
    (let [neue (update-in loc [:line] + (if (= dir :up)
                                          -1
                                          1))]
      (cond
       (< (:line neue) 0) nil
       (>= (:line neue) (editor/last-line ed)) nil
       :else (assoc neue :ch (if (= dir :up)
                               (max (dec (editor/line-length ed (:line neue))) 0)
                               0))))))

(defn move-loc [ed loc dir]
  (when loc
    (let [len (editor/line-length ed (:line loc))
          neue (editor/adjust-loc loc (if (= dir :left)
                                        -1
                                        1))]
      (cond
       (< (:ch neue) 0) (move-loc-line ed loc :up)
       (>= (:ch neue) len) (move-loc-line ed loc :down)
       :else neue))))

(defn within-range [[start end] cur]
  (>= end (:line cur) start))

(defn scan [{:keys [dir ed loc regex] :as opts}]
  (let [search-range [(- (:line loc) 100) (+ (:line loc) 100)]]
    (loop [cur loc
           line (editor/line ed (:line loc))]
      (if (or (not cur)
              (not line)
              (not (within-range search-range cur)))
        nil
        (let [ch (get line (:ch cur))
              next-loc (move-loc ed cur dir)
              next-line (if (not= (:line cur) (:line next-loc))
                          (editor/line ed (:line next-loc))
                          line)]
          (if (and ch (re-seq regex ch))
            [ch cur]
            (recur next-loc next-line)))))))

(defn string|comment? [ed cur allow-strings?]
  (let [type (editor/->token-type ed (editor/adjust-loc cur 1))]
    (when type
      (cond
       (str-contains? type "comment") true
       (str-contains? type "string") (when-not allow-strings?
                                       true)
       :else false))))

(defn paired-scan [{:keys [dir ed loc for negation allow-end? allow-strings? only-for?] :as opts}]
  (let [[stack-chars stack-ends] (if (= dir :left)
                                   [form-end form-start]
                                   [form-start form-end])
        final-loc (end-loc ed)
        search-range [(- (:line loc) 100) (+ (:line loc) 100)]]
    (loop [cur loc
           line (editor/line ed (:line loc))
           stack []]
      (if (or (not cur)
              (not line)
              (not (within-range search-range cur)))
        nil
        (let [ch (get line (:ch cur))
              next-loc (move-loc ed cur dir)
              next-line (if (not= (:line cur) (:line next-loc))
                          (editor/line ed (:line next-loc))
                          line)
              valid? (not (string|comment? ed cur allow-strings?))
              stackable? (not (string|comment? ed cur))
              ]
          (cond
           (and allow-end?
                valid?
                (or (= final-loc cur)
                    (not= next-line line))) (if (= dir :right)
                                              [ch (editor/adjust-loc cur 1)]
                                              [ch {:line (:line cur) :ch -1}])

           (and ch
                (re-seq for ch)
                valid?
                (not (seq stack))
                (if negation
                  (negation line cur)
                  true)) [ch cur]

           (and ch
                (not only-for?)
                stackable?
                (re-seq stack-ends ch)
                (not= ch (-> stack last opposites))) nil

           :else (recur next-loc next-line (cond
                                            (and ch stackable? (re-seq stack-chars ch)) (conj stack ch)
                                            (and ch stackable? (= ch (-> stack last opposites))) (pop stack)
                                            :else stack))))))))

(defn form-boundary [ed loc regex]
  (let [[c start] (paired-scan {:dir :left
                                :ed ed
                                :only-for? regex
                                :loc (move-loc ed loc :left)
                                :for (or regex form-start)})
        [c end] (if-not c
                  [nil nil]
                  (paired-scan {:dir :right
                                :ed ed
                                :loc (move-loc ed start :right)
                                :for (re-pattern (str "[\\" (opposites c) "]"))}))]
    [start end]))

(defn escaped-paired-scan [ed loc thing dir]
  (let [[c end] (paired-scan {:dir dir
                              :ed ed
                              :allow-strings? true
                              :loc (move-loc ed loc dir)
                              :negation (fn [line loc]
                                          (not= (get line (editor/adjust-loc loc -1)) "\\"))
                              :for (re-pattern (str "[" thing "]"))})]
    (if (= dir :left)
      [end loc]
      [loc (editor/adjust-loc end 1)])))

(defn string-bounds [ed loc dir]
  (escaped-paired-scan ed loc "\"" dir))

(defn token-bounds [ed loc dir]
  (let [[c end] (paired-scan {:dir dir
                              :ed ed
                              :allow-end? true
                              :loc (move-loc ed loc dir)
                              :for #"[\s\)\}\]\"\(\{\[]"})]
    (if (= dir :left)
      [(editor/adjust-loc end 1) loc]
      [loc end])))

(defn first-non-whitespace [opts]
  (scan (assoc opts :regex #"\S")))

(defn anchored-move [ed loc anchor-side dir]
  (let [[start end] (form-boundary ed loc)
        ends (if (= dir :left)
               form-start
               form-end)
        point (if (= :left anchor-side)
                start
                end)
        [cur i] (first-non-whitespace {:ed ed
                                       :loc (move-loc ed point dir)
                                       :dir dir})
        next (when cur
               (cond
                (re-seq ends cur) nil
                ;; handle begin form
                (opposites cur) (let [right? (= dir :right)
                                      bounds (form-boundary ed (if right?
                                                                 (move-loc ed i dir)
                                                                 i))]
                                  (if right?
                                    [(first bounds) (editor/adjust-loc (second bounds) 1)]
                                    bounds))

                ;;handle string
                (= "\"" cur) (string-bounds ed i dir)

                ;;any other thing
                :else (token-bounds ed i dir)))]
    {:point point
     :boundary [start end]
     :next next}))

(defn grow [{:keys [ed loc] :as orig} dir]
  (let [{:keys [next point boundary]} (anchored-move ed loc dir dir)
        format-point (if (= dir :left)
                       (second boundary)
                       (first boundary))
        neue-point (if (= dir :left)
                     (first next)
                     (second next))]
    (if neue-point
      (update-in orig [:edits] conj
                 {:type :move
                  :from point
                  :to neue-point}
                 {:type :cursor
                  :from loc
                  :to loc}
                 {:type :format
                  :from format-point
                  :to neue-point})
      orig)))

(defn shrink [{:keys [ed loc] :as orig} anchor-side]
  (let [dir (dir-swap anchor-side)
        {:keys [next point boundary] :as anchor-move} (anchored-move ed loc anchor-side dir)
        format-side (if (= anchor-side :right)
                      (second boundary)
                      (first boundary))
        neue-point (if (= anchor-side :left)
                     (second next)
                     (first next))
        [_ neue-point] (when neue-point (first-non-whitespace {:ed ed
                                                               :loc (move-loc ed neue-point dir)
                                                               :dir dir}))
        neue-point (if (and neue-point (= anchor-side :right))
                     (editor/adjust-loc neue-point 1)
                     neue-point)]
    (if neue-point
      (update-in orig [:edits] conj
                 {:type :move
                  :from point
                  :to neue-point}
                 {:type :cursor
                  :from loc
                  :to loc}
                 {:type :format
                  :from format-side
                  :to neue-point})
      orig)))

(defn select [{:keys [ed loc] :as orig} type]
  (let [[start end] (form-boundary ed loc (when type
                                            (re-pattern (str "[\\" type "]"))))]
    (if (and start end)
      (update-in orig [:edits] conj
                 {:type :cursor
                  :from start
                  :to (editor/adjust-loc end 1)})
      orig)))


(defn batched-edits [{:keys [edits ed]}]
  (editor/operation ed (fn []
                         (doseq [e edits]
                           (do-edit e ed)))))

(defmulti do-edit :type)

(defmethod do-edit :move [{:keys [from to]} ed]
  (let [text (editor/range ed from (editor/adjust-loc from 1))]
    (if (loc>loc to from)
      (do
        (do-edit {:type :insert
                  :from to
                  :text text}
                 ed)
        (do-edit {:type :delete
                  :from from
                  :to (editor/adjust-loc from 1)}
                 ed))
      (do
        (do-edit {:type :delete
                  :from from
                  :to (editor/adjust-loc from 1)}
                 ed)
        (do-edit {:type :insert
                  :from to
                  :text text}
                 ed)
        ))))

(defmethod do-edit :insert [{:keys [from text]} ed]
  (editor/replace ed from text))

(defmethod do-edit :delete [{:keys [from to]} ed]
  (editor/replace ed from to ""))

(defmethod do-edit :cursor [{:keys [from to]} ed]
  (if (= from to)
    (editor/move-cursor ed to)
    (editor/set-selection ed from to)))

(defmethod do-edit :format [{:keys [from to]} ed]
  (if (loc>loc to from)
    (editor/indent-lines ed from to "smart")
    (editor/indent-lines ed to from "smart")))

(defn ed->info [ed]
  {:ed ed
   :loc (editor/->cursor ed)
   :edits []})

(cmd/command {:command :paredit.grow.right
              :desc "Paredit: Grow right"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (-> (ed->info ed)
                            (grow :right)
                            (batched-edits)
                            )))})

(cmd/command {:command :paredit.grow.left
              :desc "Paredit: Grow left"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (-> (ed->info ed)
                            (grow :left)
                            (batched-edits)
                            )))})


(cmd/command {:command :paredit.shrink.right
              :desc "Paredit: Shrink right"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (-> (ed->info ed)
                            (shrink :right)
                            (batched-edits)
                            )))})

(cmd/command {:command :paredit.shrink.left
              :desc "Paredit: Shrink left"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (-> (ed->info ed)
                            (shrink :left)
                            (batched-edits)
                            )))})

(cmd/command {:command :paredit.select.parent
              :desc "Paredit: Select expression"
              :exec (fn [type]
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (editor/selection? ed))
                          (object/merge! ed {::orig-pos (editor/->cursor ed)}))
                        (-> (ed->info ed)
                            (select type)
                            (batched-edits)
                            ))
                      )})


(cmd/command {:command :paredit.select.clear
              :desc "Paredit: Clear selection and return cursor"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (cmd/exec! :editor.selection.clear)
                        (when (::orig-pos @ed)
                          (editor/move-cursor ed (::orig-pos @ed))
                          (object/merge! ed {::orig-pos nil}))
                        )
                      )})



