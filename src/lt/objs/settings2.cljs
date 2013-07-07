(ns lt.objs.settings2
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.keyboard :as kb]
            [lt.objs.tabs :as tabs]
            [lt.objs.files :as files]
            [clojure.string :as string]
            [cljs.reader :as reader]))

(defn +behaviors [cur m]
  (reduce (fn [res [k v]]
            (update-in res [k] #(apply conj (or % []) v)))
          cur
          m))

(defn -behaviors [cur m]
  (reduce (fn [res [k v]]
            (update-in res [k] #(-> (remove (set v) %)
                                    vec)))
          cur
          m))

(defn behavior-diff [{add :+ rem :-} final]
  (-> final
      (+behaviors add)
      (-behaviors rem)))

(defn parse-file [file final]
  (println "Parsing: " file)
  (-> (files/open-sync file)
      :content
      (reader/read-string)
      (behavior-diff final)))

(defn default-dir []
  (if js/process.env.LTLOCAL
    (str js/process.env.LTLOCAL "settings/default/")
    (files/lt-home "settings/default/")))

(defn ordered-files []
  (filter #(= (files/ext %) "behaviors")
          (concat (files/full-path-ls (default-dir))
                  (files/full-path-ls (files/lt-home "settings/user/")))))

(defn load-all []
  (let [final (reduce (fn [fin cur]
                        (parse-file cur fin))
                      {}
                      (ordered-files))]
    (reset! object/tags final)))

(defn refresh-all [objs]
  (if-not objs
    (println "Done!")
    (do
      (object/refresh! (first objs))
      (js/process.nextTick (fn []
                             (refresh-all (next objs)))))))

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
                              (refresh-all (vals @object/instances))))

(cmd/command {:command :behaviors.reload
              :desc "App: Reload behaviors"
              :exec (fn []
                      (object/raise (-> (object/by-tag :app)
                                        (first))
                                    :behaviors.reload))})

;(object/raise js/lt.objs.app.app :behaviors.reload)

(defn behavior-list [behs]
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

(object/behavior* ::on-close-remove
                  :triggers #{:close}
                  :reaction (fn [this]
                              (tabs/rem! this)))

(object/object* ::behavior-editor
                :tags #{:behaviors.editor}
                :name "Behaviors"
                :init (fn [this]
                        [:div#behavior-editor
                         (time (behavior-list @object/tags))]))

(def behavior-editor (object/create ::behavior-editor))
;(do (tabs/add! behavior-editor) nil)

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
                              (println "loading keys")
                              (load-all-keys)
                              ))
