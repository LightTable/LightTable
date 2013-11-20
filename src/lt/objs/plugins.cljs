(ns lt.objs.plugins
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.app :as app]
            [lt.objs.files :as files]
            [lt.objs.settings :as settings]
            [lt.objs.editor.pool :as pool]
            [lt.objs.deploy :as deploy]
            [cljs.reader :as reader]
            [lt.util.load :as load]
            [lt.util.dom :as dom]
            [clojure.string :as string]
            [clojure.walk :as walk])
  (:require-macros [lt.macros :refer [defui]]))


(def plugins-dir (files/lt-home "plugins"))

(defn adjust-path [path]
  (if (files/absolute? path)
    path
    (files/join (or (::dir object/*behavior-meta*) (files/lt-home)) path)))

(defn plugin-edn [dir]
  (when-let [content (files/open-sync (files/join dir "plugin.edn"))]
    (-> (reader/read-string (:content content))
        (assoc :dir dir))))

(defn available-plugins []
  (let [ds (files/dirs (files/join deploy/home-path "plugins"))]
    (filterv identity (map plugin-edn ds))))

(defn plugin-behaviors [plug]
  (let [{:keys [behaviors dir]} plug
        behs (-> (files/open-sync (files/join dir behaviors))
                 (:content)
                 (settings/safe-read))]
    (when behs
      (walk/prewalk (fn [x]
                      (when (list? x)
                        (alter-meta! x assoc ::dir dir))
                      x)
                    behs)
      behs)))

(defn local-module [plugin-name module-name]
  (files/join plugins-dir plugin-name "node_modules" module-name))

(object/behavior* ::init-plugins
                  :triggers #{:pre-init}
                  :reaction (fn [app]
                              ;;load enabled plugins
                              (object/merge! app {::plugins (available-plugins)})
                              (cmd/exec! :behaviors.reload)))

(object/behavior* ::behaviors.refreshed-load-keys
                  :triggers #{:behaviors.refreshed}
                  :reaction (fn []
                              (cmd/exec! :keymaps.reload)))

(object/behavior* ::plugin-behavior-diffs
                  :triggers #{:behaviors.diffs.plugin+}
                  :reaction (fn [this diffs]
                              (concat diffs (mapv plugin-behaviors (::plugins @this)))))

(object/behavior* ::plugin-keymap-diffs
                  :triggers #{:keymap.diffs.plugin+}
                  :reaction (fn [this diffs]
                              (concat diffs (mapv settings/parse-key-file (::keymaps @this)))))

(object/behavior* ::load-js
                  :triggers #{:object.instant}
                  :desc "App: Load a javascript file"
                  :params [{:label "path"}]
                  :type :user
                  :reaction (fn [this path sync?]
                              (let [path (adjust-path path)]
                                (when-not (get (::loaded-files @this) path)
                                  (object/update! this [::loaded-files] #(conj (or % #{}) path))
                                  (load/js path true)))))

(object/behavior* ::load-css
                  :triggers #{:object.instant}
                  :desc "App: Load a css file"
                  :params [{:label "path"}]
                  :type :user
                  :reaction (fn [this path]
                              (let [path (adjust-path path)]
                                (when-not (get (::loaded-files @this) path)
                                  (object/update! this [::loaded-files] #(conj (or % #{}) path))
                                  (load/css path)))))

(object/behavior* ::load-keymap
                  :triggers #{:object.instant}
                  :desc "App: Load a keymap file"
                  :params [{:label "path"}]
                  :type :user
                  :reaction (fn [this path]
                              (let [path (adjust-path path)]
                                (if (::keymaps @this)
                                  (object/update! this [::keymaps] conj path)
                                  (object/merge! this {::keymaps #{path}})))))

(object/behavior* ::check-for-plugin-file
                  :triggers #{:create}
                  :desc "Plugin: Determine if this is a plugin file"
                  :reaction (fn [this]
                              (let [path (-> @this :info :path)
                                    plugin-edn (files/walk-up-find path "plugin.edn")]
                                (when plugin-edn
                                  (object/merge! this {::plugin-path (files/parent plugin-edn)})
                                  (object/add-tags this [:plugin.file])))))

(object/object* ::plugin-manager
                :tags #{:plugin-manager}
                :name "Plugins"
                :init (fn [this]
                        [:div.plugin-manager
                         [:ul.plugins
                          (for [plugin (available-plugins)]
                            [:li
                             [:h1 (:name plugin) [:span.version "0.0.1"]]
                             [:h3 (:author plugin)]
                             [:p (:desc plugin)]
                             ]
                            )]]))


(comment
  (def manager (object/create ::plugin-manager))

  (::plugins app/app)

  (lt.objs.tabs/add! manager)




  )

(object/behavior* ::enable-beta
                  :triggers #{:object.instant}
                  :reaction (fn [this]

                              (cmd/command {:command :build
                                            :desc "Editor: build file or project"
                                            :exec (fn []
                                                    (when-let [ed (pool/last-active)]
                                                      (object/raise ed :build)))})

                              ))

;;This call to tag-behaviors is necessary as there are no behaviors loaded when the
;;app is first run.
(object/tag-behaviors :app [::init-plugins ::plugin-behavior-diffs ::plugin-keymap-diffs])
