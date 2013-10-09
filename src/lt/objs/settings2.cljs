(ns lt.objs.settings2
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.keyboard :as kb]
            [lt.objs.tabs :as tabs]
            [lt.objs.files :as files]
            [lt.objs.console :as console]
            [lt.objs.notifos :as notifos]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool2]
            [lt.objs.workspace :as workspace]
            [clojure.string :as string]
            [lt.objs.sidebar.command :as scmd]
            [lt.util.dom :as dom]
            [lt.util.cljs :refer [str-contains?]]
            [cljs.reader :as reader])
  (:require-macros [lt.macros :refer [defui]]))

(defn safe-read [s file]
  (try
    (reader/read-string s)
    (catch js/global.Error e
      (console/error (str "Invalid settings file: " file "\n" e))
      nil)
    (catch js/Error e
      (console/error (str "Invalid settings file: " file "\n" e))
      nil)))

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
  (reset! object/tags (behavior-diff diff @object/tags)))

(defn parse-file [file final]
  (-> (files/open-sync file)
      :content
      (safe-read file)
      (behavior-diff final file)))

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
        ws-diff (:ws-behaviors @workspace/current-ws)
        final (if (and false ws-diff (not (empty? ws-diff)))
                (behavior-diff (safe-read ws-diff "workspace.behaviors") final)
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
      (try
        (object/refresh! (first objs))
        (catch js/global.Error e
          (.error js/console e))
        (catch js/Error e
          (.error js/console e)))
      (js/global.setImmediate (fn []
                             (refresh-all (next objs)))))))

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
                              (let [old (:ws-behaviors old)
                                    old (when-not (empty? old)
                                          (reader/read-string old))
                                    neue (:ws-behaviors @workspace)
                                    neue (when-not (empty? neue)
                                             (reader/read-string neue))]
                                (when old
                                  (apply-diff (reverse-diff old))
                                  (refresh-diffed old))
                                (when neue
                                  (apply-diff neue)
                                  (refresh-diffed neue)))))

(object/behavior* ::workspace-save
                  :triggers #{:save}
                  :reaction (fn [editor]
                              (let [{:keys [path]} (@editor :info)
                                    final (object/raise-reduce editor :save+ (editor/->val editor))]
                                (object/merge! workspace/current-ws {:ws-behaviors final})
                                (object/merge! editor {:dirty false})
                                (object/raise editor :saved)
                                (object/raise editor :clean)
                                (object/raise workspace/current-ws :serialize!))))

(def user-behaviors-path (files/lt-home "/settings/user/user.behaviors"))
(def user-keymap-path (files/lt-home "/settings/user/user.keymap"))

(object/behavior* ::create-user-settings
                  :triggers #{:init}
                  :reaction (fn [app]
                              (when-not (files/exists? user-behaviors-path)
                                (files/copy (files/lt-home "/core/misc/example.behaviors") user-behaviors-path))
                              (when-not (files/exists? user-keymap-path)
                                (files/copy (files/lt-home "/core/misc/example.keymap") user-keymap-path))))

;;*********************************************************
;; Commands
;;*********************************************************

(cmd/command {:command :behaviors.reload
              :desc "App: Reload behaviors"
              :exec (fn []
                      (object/raise (-> (object/by-tag :app)
                                        (first))
                                    :behaviors.reload))})

(cmd/command {:command :behaviors.modify-user
              :desc "Settings: User behaviors"
              :exec (fn []
                      (cmd/exec! :open-path (files/lt-home "/settings/user/user.behaviors")))})

(cmd/command {:command :behaviors.view-default
              :desc "Settings: Default behaviors"
              :exec (fn []
                      (cmd/exec! :open-path (files/lt-home "/settings/default/default.behaviors")))})

(cmd/command {:command :behaviors.modify-workspace
              :desc "Settings: Workspace behaviors"
              :exec (fn []
                      (cmd/exec! :opener.open-info {:path "workspace.behaviors"
                                                    :mime "text/x-clojure"
                                                    :name "workspace.behaviors"
                                                    :tags [:editor.behaviors :editor.behaviors.workspace]
                                                    :content (:ws-behaviors @workspace/current-ws "")}))})

(cmd/command {:command :keymap.modify-user
              :desc "Settings: User keymap"
              :exec (fn []
                      (cmd/exec! :open-path (files/lt-home "/settings/user/user.keymap")))})

(cmd/command {:command :keymap.view-default
              :desc "Settings: Default keymap"
              :exec (fn []
                      (cmd/exec! :open-path (files/lt-home "/settings/default/default.keymap")))})

(object/behavior* ::on-close-remove
                  :triggers #{:close}
                  :reaction (fn [this]
                              (tabs/rem! this)))

;;This call to tag-behaviors is necessary as there are no behaviors loaded when the
;;app is first run.
(object/tag-behaviors :app [::initial-behaviors])

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
         (when (str-contains? k "alt")
           "alt-")
         (when (str-contains? k "altgr")
           "altgr-")
         (when (str-contains? k "shift")
           "shift-")
         char)))

(defn fix-keys [[k v]]
  (let [k (string/replace k "pmeta" kb/meta)
        keys (string/split k " ")]
  ;;ctrl cmd alt altgr shift
  [(reduce #(str % " " %2) (map ->ordered-keystr keys)) v]))

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
                              (load-all-keys)
                              (kb/refresh)))

(object/tag-behaviors :app [::load-keys])

(object/behavior* ::on-behaviors-editor-save
                  :triggers #{:saved}
                  :reaction (fn [editor]
                              (cmd/exec! :behaviors.reload)))

(object/behavior* ::on-keymap-editor-save
                  :triggers #{:saved}
                  :reaction (fn [editor]
                              (load-all-keys)
                              (kb/refresh)
                              (notifos/set-msg! "keys loaded")))


