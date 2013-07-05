(ns lt.objs.context
  (:require [lt.object :as object]))

(def contexts (atom #{}))
(def groups (atom {}))
(def ctx->obj (atom {}))
(def ctx->group (atom {}))
(def group->ctxs (atom {}))
(def ctx-obj nil)

(defn append-group [group name]
  (swap! groups (fn [all]
                  (if (all group)
                    (update-in all [group] conj name)
                    (assoc all group #{name})))))

(defn in? [k]
  (@contexts k))

(defn out! [ctxs]
  (let [ctxs (if (coll? ctxs)
               ctxs
               [ctxs])]
    (swap! contexts #(apply disj % ctxs))
    (swap! ctx->obj #(apply dissoc % ctxs))
    (object/raise ctx-obj :out! ctxs)
    (doseq [c ctxs
            :when (in? c)]
      (object/raise ctx-obj (keyword (str "out!" (name c)))))))

(defn in! [ctxs & [obj]]
  (let [ctxs (if (coll? ctxs)
               ctxs
               [ctxs])]
    (swap! contexts #(apply conj % ctxs))
    (swap! ctx->obj #(merge % (zipmap ctxs (repeat obj))))
    (object/raise ctx-obj :in! ctxs)
    (doseq [c ctxs]
      (when-let [group (@group->ctxs (@ctx->group c))]
        (out! group))
      (object/raise ctx-obj (keyword (str "in!" (name c)))))))

(defn toggle! [ctxs & [obj]]
  (doseq [c ctxs]
    (if (in? c)
      (out! c)
      (in! c obj))))

(defn current []
  @contexts)

(defn group! [ctx group]
  (swap! ctx->group assoc ctx group)
  (swap! group->ctx update-in [group] conj ctx))

(defn ->obj [ctx]
  (@ctx->obj ctx))

(object/behavior* ::log-on-in
                  :triggers #{:in!}
                  :reaction (fn [obj ctxs]
                              (log :context-in ctxs))
                  )

(object/behavior* ::log-on-out
                  :triggers #{:out!}
                  :reaction (fn [obj ctxs]
                              (log :context-out ctxs))
                  )

(object/object* ::context
                :triggers [:in! :out! :in!context-name :out!context-name]
                :behaviors []
                :init (fn []))

(set! ctx-obj (object/create ::context))

