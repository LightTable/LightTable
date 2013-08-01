(ns lt.objs.settings2
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.keyboard :as kb]
            [lt.objs.tabs :as tabs]
            [lt.objs.files :as files]
            [lt.objs.notifos :as notifos]
            [lt.objs.workspace :as workspace]
            [clojure.string :as string]
            [cljs.reader :as reader]))

(declare behaviors-editor)

(defn +behaviors [cur m]
  (reduce (fn [res [k v]]
            (update-in res [k] #(apply conj (or % '()) v)))
          cur
          m))

(defn -behaviors [cur m]
  (reduce (fn [res [k v]]
            (update-in res [k] #(remove (set v) %)))
          cur
          m))

(defn behavior-diff [{add :+ rem :-} final]
  (-> final
      (+behaviors add)
      (-behaviors rem)))

(defn reverse-diff [{add :+ rem :-}]
  {:+ rem
   :- add})

(defn apply-diff [diff]
  (reset! object/tags (behavior-diff diff @object/tags)))

(defn store! [behs file]
  (object/update! behaviors-editor [:files] assoc file behs)
  behs)

(defn parse-file [file final]
  (-> (files/open-sync file)
      :content
      (reader/read-string)
      (store! file)
      (behavior-diff final)))

(defn default-dir []
  (if js/process.env.LTLOCAL
    (str js/process.env.LTLOCAL "settings/default/")
    (files/lt-home "settings/default/")))

(defn ordered-files []
  (filter #(= (files/ext %) "behaviors")
          (concat (files/full-path-ls (str files/pwd "/settings/default/"))
                  (files/full-path-ls (files/lt-home "settings/user/")))))

(defn load-all []
  (let [final (reduce (fn [fin cur]
                        (parse-file cur fin))
                      {}
                      (ordered-files))
        final (if-let [ws-diff (:ws-behaviors @workspace/current-ws)]
                (behavior-diff ws-diff final)
                final)]
    (reset! object/tags final)))

(defn refresh-diffed [diff]
  (->> (concat (keys (:+ diff))
               (keys (:- diff)))
       (mapcat object/by-tag)
       (refresh-all)))

(defn refresh-all [objs]
  (if-not (seq objs)
    (notifos/done-working "")
    (do
      (object/refresh! (first objs))
      (js/process.nextTick (fn []
                             (refresh-all (next objs)))))))

(defn behavior-list [behs]
  (println (sort-by first behs))
  (for [[tag bs] (sort-by first behs)]
    [:div
     [:h2 (str tag)]
     [:ul
      (for [b bs
            :let [info (@object/behaviors (if (coll? b)
                                            (first b)
                                            b))]]
        [:li {:class (when (= (:type info) :user)
                       "user")}
         [:h3 (:desc info (pr-str b)) (pr-str (:type info))]
         (when (coll? b) (string/join " " (rest b)))])]]))


;;*********************************************************
;; Object
;;*********************************************************

(object/object* ::behaviors-editor
                :tags #{:behaviors.editor}
                :name "Behaviors"
                :files {}
                :init (fn [this]
                        [:div#behavior-editor
                         (behavior-list (-> @js/lt.objs.workspace.current-ws :ws-behaviors :+))]
                        ))

(def behaviors-editor (object/create ::behaviors-editor))
;(do (tabs/add! behaviors-editor) nil)

;;*********************************************************
;; Behaviors
;;*********************************************************

(object/behavior* ::initial-behaviors
                  :triggers #{:pre-init}
                  :reaction (fn [this]
                              (load-all)
                              (doseq [inst (vals @object/instances)]
                                (object/refresh! inst))))

(object/behavior* ::load-behaviors
                  :triggers #{:behaviors.reload}
                  :reaction (fn [this]
                              (load-all)
                              (notifos/working "loading behaviors...")
                              (refresh-all (vals @object/instances))))

(object/behavior* ::eval-settings
                  :triggers #{:eval :eval.one}
                  :reaction (fn [ed]
                              (object/raise ed :save)))

(object/behavior* ::grab-workspace-behaviors
                  :triggers #{:set}
                  :reaction (fn [workspace old]
                              (apply-diff (-> (:ws-behaviors old)
                                              (reverse-diff)))
                              (refresh-diffed (:ws-behaviors old))
                              (apply-diff (:ws-behaviors @workspace))
                              (refresh-diffed (:ws-behaviors @workspace))))

;;*********************************************************
;; Commands
;;*********************************************************

(cmd/command {:command :behaviors.reload
              :desc "App: Reload behaviors"
              :exec (fn []
                      (object/raise (-> (object/by-tag :app)
                                        (first))
                                    :behaviors.reload))})

(object/behavior* ::on-close-remove
                  :triggers #{:close}
                  :reaction (fn [this]
                              (tabs/rem! this)))

;;This call to tag-behaviors is necessary as there are no behaviors loaded when the
;;app is first run.
(object/tag-behaviors :app [::initial-behaviors])

(defn fix-keys [[k v]]
  [(string/replace k "pmeta" kb/meta) v])

(defn +keys [cur m]
  (reduce (fn [res [k v]]
            (update-in res [k] #(into (or % {}) (map fix-keys v))))
          cur
          m))

(defn -keys [cur m]
  (reduce (fn [res [k v]]
            (update-in res [k] #(apply dissoc % v)))
          cur
          m))

(defn key-diff [{add :+ rem :-} final]
  (-> final
      (+keys add)
      (-keys rem)))

(defn parse-key-file [file final]
  (-> (files/open-sync file)
      :content
      (reader/read-string)
      (key-diff final)))

(defn ordered-key-files []
  (filter #(= (files/ext %) "keymap")
          (concat (files/full-path-ls (default-dir))
                  (files/full-path-ls (files/lt-home "settings/user/")))))

(defn load-all-keys []
  (let [final (reduce (fn [fin cur]
                        (parse-key-file cur fin))
                      {}
                      (ordered-key-files))]
    (reset! kb/keys final)))

(object/behavior* ::load-keys
                  :triggers #{:pre-init}
                  :reaction (fn [this]
                              (load-all-keys)))

(object/tag-behaviors :app [::load-keys])

(object/behavior* ::on-behaviors-editor-save
                  :triggers #{:saved}
                  :reaction (fn [editor]
                              (cmd/exec! :behaviors.reload)))

(object/behavior* ::on-keymap-editor-save
                  :triggers #{:saved}
                  :reaction (fn [editor]
                              (load-all-keys)
                              (notifos/set-msg! "keys loaded")))
