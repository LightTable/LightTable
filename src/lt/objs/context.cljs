(ns lt.objs.context
  (:require [lt.object :as object])
  (:require-macros [lt.macros :refer [behavior]]))

(def ctx-obj (object/create ::context))
(def contexts (atom #{}))
(def groups (atom {}))
(def ctx->obj (atom {}))
(def ctx->group (atom {}))
(def group->ctxs (atom {}))

(defn append-group [group name]
  (swap! groups (fn [all]
                  (if (all group)
                    (update-in all [group] conj name)
                    (assoc all group #{name})))))

(defn in? [k]
  (@contexts k))

(defn out!
  ([] (out! nil))
  ([ctxs]
   (let [ctxs (if (coll? ctxs)
                ctxs
                [ctxs])]
     (swap! contexts #(apply disj % ctxs))
     (swap! ctx->obj #(apply dissoc % ctxs))
     (object/raise ctx-obj :log!))))


(defn in! [ctxs & [obj]]
  (let [ctxs (if (coll? ctxs)
               ctxs
               [ctxs])]
    (swap! contexts #(apply conj % ctxs))
    (swap! ctx->obj #(merge % (zipmap ctxs (repeat obj))))
    (object/raise ctx-obj :log!)
    (doseq [c ctxs]
      (when-let [group (@group->ctxs (@ctx->group c))]
        (out! group)))))

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

(defn enqueue [coll buffer size]
  (if (= size
         (count buffer))
    (conj (pop buffer) coll)
    (conj buffer coll)))

(behavior ::log
          :triggers #{:log!}
          :debounce 16
          :reaction (fn [this]
                      (let [size (:buffer-size @this)
                            ctx @contexts]
                        (object/update! this
                                        [:history]
                                        #(enqueue ctx % size)))))

(object/object* ::context
                :tags #{:context}
                :history cljs.core.PersistentQueue.EMPTY
                :buffer-size 8
                :init (fn [this]))
