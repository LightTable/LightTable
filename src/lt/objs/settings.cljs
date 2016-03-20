(ns lt.objs.settings
  "Provide User plugin functionality - user.cljs, user.behaviors and user.keymap"
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.command :as cmd]
            [lt.objs.keyboard :as kb]
            [lt.objs.tabs :as tabs]
            [lt.objs.files :as files]
            [lt.objs.console :as console]
            [lt.objs.notifos :as notifos]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.workspace :as workspace]
            [clojure.string :as string]
            [lt.objs.sidebar.command :as scmd]
            [lt.util.dom :as dom]
            [lt.util.cljs :refer [str-contains?]]
            [cljs.reader :as reader])
  (:require-macros [lt.macros :refer [behavior defui]]))

(defn safe-read [s file]
  (when s
    (try
      (reader/read-string s)
      (catch :default e
        (console/error (str "Invalid settings file: " file "\n" e))
        nil))))

(defn +behaviors [cur m]
  (assoc cur :+
    (reduce (fn [res [k v]]
              (update-in res [k] #(apply conj (or % '()) v)))
            (:+ cur)
            m)))

(defn -behaviors [cur m]
  (assoc cur
    :+ (reduce (fn [res [k v]]
              (update-in res [k] #(remove (set v) %)))
            (:+ cur)
            m)
    :- (reduce (fn [res [k v]]
              (update-in res [k] #(apply conj (or % '()) v)))
            (:- cur)
            m)))

(defn behavior-diff [{add :+ rem :- :as diff} final]
  (if-not diff
    final
    (-> final
        (+behaviors add)
        (-behaviors rem))))

(defn reverse-diff [{add :+ rem :-}]
  {:+ rem
   :- add})

(defn apply-diff [diff]
  (let [final (behavior-diff diff {:+ @object/tags })]
    (reset! object/tags (:+ final))))

(defn keyword->str [kw]
  (if (keyword? kw)
    (subs (str kw) 1)
    kw))

(defn flat-behaviors->map [flat]
  (let [adds (js-obj)
        removes (js-obj)]
    (doseq [[tag behavior :as all] flat
            :let [[coll behavior] (if (= (aget (keyword->str behavior) 0) "-")
                                    [removes (subs (keyword->str behavior) 1)]
                                    [adds (keyword->str behavior)])
                  tag (keyword->str tag)]]
      (when-not (aget coll tag)
        (aset coll tag (array)))
      (.push (aget coll tag) (if (> (count all) 2)
                               (conj (seq (subvec all 2)) (keyword behavior))
                               (keyword behavior))))
    {:+ (js->clj adds :keywordize-keys true)
     :- (js->clj removes :keywordize-keys true)}))


(defn map->flat-behaviors [behaviors-map]
  (let [flat (array)]
    ;;Handle the adds
    (doseq [[tag behs] (:+ behaviors-map)
            :let [tag-vec [tag]]
            beh behs
            :let [beh (if (coll? beh)
                        beh
                        [beh])]]
      (.push flat (into tag-vec beh)))
    ;;Handle the subtracts
    (doseq [[tag behs] (:- behaviors-map)
            beh behs
            :let [beh (if (coll? beh)
                        beh
                        [beh])
                  tag-vec [tag (keyword (str "-" (keyword->str (first beh))))]]]
      (.push flat (into tag-vec (rest beh))))
    (->> (js->clj flat)
         (sort-by first)
         (vec))))

(defn parse-behaviors [behs file]
  (cond
     (map? behs) behs
     (vector? behs) (flat-behaviors->map behs)
     :else (console/error (str "Invalid behaviors file: " file ". Behaviors must be either a vector or a map."))))

(defn parse-file [file]
  (parse-behaviors (-> (files/open-sync file)
                       :content
                       (safe-read file))
                   file))

(defn pprint-flat-behaviors [flat]
  (-> (reduce (fn [result cur]
                (let [new-tag (first cur)]
                  {:str (str (:str result)
                             (if-not (= new-tag (:tag result))
                               "\n")
                             "\n " (pr-str cur))
                   :tag new-tag}))
              {:tag (-> flat first first) :str "["}
              flat)
      (:str)
      (str "\n]")))

(defn behavior-diffs-in [path]
  (when (files/exists? path)
    (->>
     (filter #(= (files/ext %) "behaviors")
             (files/full-path-ls path))
     (mapv parse-file))))

(defn load-all []
  (let [final (reduce (fn [fin cur]
                        (behavior-diff cur fin))
                      {}
                      (concat (object/raise-reduce app/app :behaviors.diffs.default+ [])
                              (object/raise-reduce app/app :behaviors.diffs.plugin+ [])
                              (object/raise-reduce app/app :behaviors.diffs.user+ [])
                              ))
        ws-diff (:ws-behaviors @workspace/current-ws)
        final (if (and ws-diff (not (empty? ws-diff)))
                (behavior-diff (parse-behaviors (safe-read ws-diff "workspace.behaviors")
                                                "workspace.behaviors")
                               final)
                final)]
    (reset! object/negated-tags (or (:- final) {}))
    (reset! object/tags (or (:+ final) {}))))

(defn refresh-all [objs]
  (if-not (seq objs)
    (do
      (object/raise app/app :behaviors.refreshed)
      (notifos/done-working "Behaviors loaded"))
    (do
      (try
        (object/refresh! (first objs))
        (catch :default e
          (console/error e)))
      (js/process.nextTick (fn []
                             (refresh-all (next objs)))))))

(defn refresh-diffed [diff]
  (->> (concat (keys (:+ diff))
               (keys (:- diff)))
       (mapcat object/by-tag)
       (refresh-all)))


(defn ->ordered-keystr [k]
  (let [char (if (= (last k) "-")
               "-"
               (-> (string/split k "-") last))]
    (str (when (str-contains? k "ctrl")
           "ctrl-")
         (when (str-contains? k "cmd")
           "cmd-")
         (when (str-contains? k "meta")
           "meta-")
         (when (str-contains? k "altgr")
           "altgr-")
         (when (str-contains? k "alt")
           "alt-")
         (when (str-contains? k "shift")
           "shift-")
         char)))


(defn fix-key [k]
  (let [k (string/replace k "pmeta" kb/meta)
        keys (string/split k " ")]
    ;;ctrl cmd alt altgr shift
    (reduce #(str % " " %2) (map ->ordered-keystr keys))))

(defn fix-key-entry [[k v]]
  [(fix-key k) v])

(defn +keys [cur m]
  (reduce (fn [res [k v]]
            (update-in res [k] #(into (or % {}) (map fix-key-entry v))))
          cur
          m))

(defn -keys [cur m]
  (reduce (fn [res [k v]]
            (update-in res [k] #(apply dissoc % (map fix-key (if (map? v)
                                                                (keys v)
                                                                v)))))
          cur
          m))

(defn key-diff [{add :+ rem :-} final]
  (-> final
      (-keys rem)
      (+keys add)))

(defn load-all-keys []
  (let [final (reduce (fn [fin cur]
                        (key-diff cur fin))
                      {}
                      (concat (object/raise-reduce app/app :keymap.diffs.default+ [])
                              (object/raise-reduce app/app :keymap.diffs.plugin+ [])
                              (object/raise-reduce app/app :keymap.diffs.user+ [])))]
    (reset! kb/keys final)))

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::default-behavior-diffs
          :triggers #{:behaviors.diffs.default+}
          :reaction (fn [this diffs]
                      (concat diffs (behavior-diffs-in (files/lt-home "settings/default/")))
                      ))


(def user-plugin-dir (files/lt-user-dir "User"))

(behavior ::user-behavior-diffs
          :triggers #{:behaviors.diffs.user+}
          :reaction (fn [this diffs]
                      (concat diffs (behavior-diffs-in user-plugin-dir))))

(behavior ::initial-behaviors
          :triggers #{:pre-init}
          :reaction (fn [this]
                      (when-not (files/exists? user-plugin-dir)
                        (files/mkdir user-plugin-dir))
                      (object/raise this :pre-load)
                      ;;Load all the behaviors
                      (load-all)
                      (doseq [inst (vals @object/instances)]
                        (object/refresh! inst))
                      ;;Load all the keymaps
                      (load-all-keys)
                      (kb/refresh)
                      ))

(behavior ::load-behaviors
          :triggers #{:behaviors.reload}
          :reaction (fn [this]
                      (notifos/working "loading behaviors...")
                      (load-all)
                      (refresh-all (vals @object/instances))))


(behavior ::eval-settings
          :triggers #{:eval :eval.one}
          :reaction (fn [ed]
                      (object/raise ed :save)))

(behavior ::grab-workspace-behaviors
          :triggers #{:set}
          :reaction (fn [workspace old]
                      (let [old (:ws-behaviors old)
                            old (when-not (empty? old)
                                  (parse-behaviors (reader/read-string old) "workspace.behaviors"))
                            neue (:ws-behaviors @workspace)
                            neue (when-not (empty? neue)
                                   (parse-behaviors (reader/read-string neue) "workspace.behaviors"))]
                        (when old
                          (apply-diff (reverse-diff old))
                          (refresh-diffed old))
                        (when neue
                          (apply-diff neue)
                          (refresh-diffed neue)))))

(behavior ::workspace-save
          :triggers #{:save}
          :reaction (fn [editor]
                      (let [{:keys [path]} (@editor :info)
                            final (object/raise-reduce editor :save+ (editor/->val editor))]
                        (object/merge! workspace/current-ws {:ws-behaviors final})
                        (object/merge! editor {:dirty false})
                        (object/raise editor :saved)
                        (object/raise editor :clean)
                        (object/raise workspace/current-ws :serialize!))))

(def user-behaviors-path (files/join user-plugin-dir "user.behaviors"))
(def user-keymap-path (files/join user-plugin-dir "user.keymap"))
(def user-cljs-path (files/join user-plugin-dir "src" "lt" "plugins" "user.cljs"))
(def user-plugin-paths ["user.behaviors" "user.keymap" "src" "project.clj" "plugin.edn" "user_compiled.js"])

(behavior ::create-user-plugin
          :triggers #{:create-user-plugin}
          :reaction (fn [app]
                      (doseq [path user-plugin-paths]
                        (let [full-path (files/join user-plugin-dir path)]
                          (when-not (files/exists? full-path)
                            (if (and (contains? #{"user.behaviors" "user.keymap"} path)
                                     (files/exists? (files/lt-user-dir (str "/settings/" path))))
                              ;; Copy over files from previous user dir
                              (files/copy (files/lt-user-dir (str "/settings/" path))
                                          full-path)
                              (files/copy (files/lt-home (files/join "core" "User" path))
                                          full-path)))))))

(declare map->flat-keymap)

(defn convert-file
  "If the given keymap or behaviors file is in the old map format,
  backs it up and converts it to the flattened vec format."
  [file]
  (let [config (-> (files/open-sync file)
                   :content
                   (safe-read file))]

    (when (map? config)
      (let [backup-file (str file ".bak")
            _ (files/copy file backup-file)
            convert-fn (case (files/ext file)
                         "keymap" map->flat-keymap
                         "behaviors" map->flat-behaviors
                         identity)
            body (str ";; Your file has been converted to the new flat format.\n"
                      ";; Conversion does not preserve comments or indentation.\n"
                      ";; File is backed up at " backup-file "\n"
                      (pprint-flat-behaviors (convert-fn config)))]
        (files/save file body)))))

(behavior ::flatten-map-settings
          :triggers #{:flatten-map-settings}
          :reaction (fn [app]
                      (doseq [file (filter #(contains? #{"keymap" "behaviors"} (files/ext %))
                                           (files/full-path-ls user-plugin-dir))]
                        (convert-file file))))

;;*********************************************************
;; Commands
;;*********************************************************

(cmd/command {:command :behaviors.reload
              :desc "App: Reload behaviors"
              :exec (fn []
                      (object/raise (-> (object/by-tag :app)
                                        (first))
                                    :behaviors.reload))})

(cmd/command {:command :keymaps.reload
              :desc "App: Reload keymaps"
              :exec (fn []
                      (load-all-keys)
                      (kb/refresh)
                      (object/raise (first (object/by-tag :app)) :app.keys.load)
                      (notifos/set-msg! "keys loaded"))})

(cmd/command {:command :behaviors.modify-user
              :desc "Settings: User behaviors"
              :exec (fn []
                      (cmd/exec! :open-path user-behaviors-path))})

(cmd/command {:command :behaviors.view-default
              :desc "Settings: Default behaviors"
              :exec (fn []
                      (cmd/exec! :open-path (files/lt-home "/settings/default/default.behaviors")))})

(cmd/command {:command :behaviors.modify-workspace
              :desc "Settings: Workspace behaviors"
              :exec (fn []
                      (cmd/exec! :opener.open-info {:mime "text/x-clojure"
                                                    :name "workspace.behaviors"
                                                    :tags [:editor.behaviors :editor.behaviors.workspace]
                                                    :content (:ws-behaviors @workspace/current-ws "")}))})

(cmd/command {:command :keymap.modify-user
              :desc "Settings: User keymap"
              :exec (fn []
                      (cmd/exec! :open-path user-keymap-path))})

(cmd/command {:command :keymap.view-default
              :desc "Settings: Default keymap"
              :exec (fn []
                      (cmd/exec! :open-path (files/lt-home "/settings/default/default.keymap")))})

(cmd/command {:command :user.modify-user
              :desc "Settings: User script"
              :exec (fn []
                      (cmd/exec! :open-path user-cljs-path))})


(cmd/command {:command :user.add-user-plugin-to-workspace
              :desc "Settings: Add User plugin to workspace"
              :exec (fn []
                      (object/raise workspace/current-ws :add.folder! user-plugin-dir))})

(cmd/command {:command :convert-to-flat-format
              :desc "Settings: Convert current file to flat format"
              :exec (fn []
                      (convert-file (get-in @(pool/last-active) [:info :path])))})

(behavior ::on-close-remove
          :triggers #{:close}
          :reaction (fn [this]
                      (tabs/rem! this)))


(defn flat-keymap->map [flat]
  (let [adds (js-obj)
        removes (js-obj)]
    (doseq [[tag key :as all] flat
            :let [[coll key] (if (and (= (aget (keyword->str key) 0) "-")
                                      (> (count (keyword->str key)) 1))
                                    [removes (subs (keyword->str key) 1)]
                                    [adds (keyword->str key)])
                  remove? (identical? coll removes)
                  tag (keyword->str tag)]]
      (when-not (aget coll tag)
        (aset coll tag (if remove?
                         (array)
                         (js-obj))))
      (if remove?
        (.push (aget coll tag) key)
        (aset (aget coll tag) key (subvec all 2))))
    {:+ (into {} (for [[tag keys] (js->clj adds)]
                   [(keyword tag) keys]))
     :- (into {} (for [[tag keys] (js->clj removes)]
                   [(keyword tag) keys]))}))

(defn map->flat-keymap [keymap]
  (let [flat (array)]
    ;;Handle the adds
    (doseq [[tag keys] (:+ keymap)
            [key commands] keys
            :let [tag-vec [tag key]]]
      (.push flat (into tag-vec commands)))
    ;;Handle the subtracts
    (doseq [[tag keys] (:- keymap)
            key keys
            :let [[key command] (if (map? keys)
                                  key
                                  [key []])
                  tag-vec [tag (str "-" key)]]]
      (.push flat (into tag-vec command)))
    (->> (js->clj flat)
         (sort-by first)
         (vec))))

(defn parse-key-file [file]
  (let [keys (-> (files/open-sync file)
                 :content
                 (safe-read file))]
    (cond
     (map? keys) keys
     (vector? keys) (flat-keymap->map keys)
     :else (console/error (str "Invalid keymap file: " file ". Keymaps must be either a vector or a map.")))))

(defn keymap-diffs-in [path]
  (when (files/exists? path)
    (->>
     (filter #(= (files/ext %) "keymap")
             (files/full-path-ls path))
     (map parse-key-file))))

(behavior ::default-keymap-diffs
          :triggers #{:keymap.diffs.default+}
          :reaction (fn [this diffs]
                      (concat diffs (keymap-diffs-in (files/lt-home "/settings/default/")))
                      ))

(behavior ::user-keymap-diffs
          :triggers #{:keymap.diffs.user+}
          :reaction (fn [this diffs]
                      (concat diffs (keymap-diffs-in user-plugin-dir))))

(def pair-keybindings
  {:editor.keys.normal {"\"" ['(:editor.repeat-pair "\"")]
                        "(" ['(:editor.open-pair "(")]
                        ")" ['(:editor.close-pair ")")]
                        "[" ['(:editor.open-pair "[")]
                        "{" ['(:editor.open-pair "{")]
                        "]" ['(:editor.close-pair "]")]
                        "}" ['(:editor.close-pair "}")]}})

(behavior ::pair-keymap-diffs
          :desc "Editor: auto-close parens/brackets/quotes/pairs"
          :type :user
          :triggers #{:keymap.diffs.user+}
          :reaction (fn [this diffs]
                      (console/error (str "[:app " ::pair-keymap-diffs "] is deprecated and will be removed in 0.9.0. Use [:editor :lt.objs.editor/autoclose-brackets] instead"))
                      (concat diffs (list {:+ pair-keybindings}))))

(behavior ::on-behaviors-editor-save
          :triggers #{:saved}
          :reaction (fn [editor]
                      (cmd/exec! :behaviors.reload)))

(behavior ::on-keymap-editor-save
          :triggers #{:saved}
          :reaction (fn [editor]
                      (cmd/exec! :keymaps.reload)))



;;This call to tag-behaviors is necessary as there are no behaviors loaded when the
;;app is first run.
(object/tag-behaviors :app [::initial-behaviors ::create-user-plugin ::flatten-map-settings ::load-behaviors ::default-behavior-diffs ::user-behavior-diffs ::default-keymap-diffs ::user-keymap-diffs])
