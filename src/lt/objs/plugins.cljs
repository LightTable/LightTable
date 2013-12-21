(ns lt.objs.plugins
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.console :as console]
            [lt.objs.app :as app]
            [lt.objs.files :as files]
            [lt.objs.settings :as settings]
            [lt.objs.editor.pool :as pool]
            [lt.objs.deploy :as deploy]
            [lt.objs.notifos :as notifos]
            [lt.objs.tabs :as tabs]
            [cljs.reader :as reader]
            [fetch.core :as fetch]
            [crate.core :as crate]
            [crate.binding :refer [bound]]
            [lt.util.load :as load]
            [lt.util.dom :as dom]
            [clojure.string :as string]
            [clojure.walk :as walk])
  (:require-macros [lt.macros :refer [behavior defui]]))


(def plugins-dir (files/lt-home "plugins"))

(defn adjust-path [path]
  (if (files/absolute? path)
    path
    (files/join (or (::dir object/*behavior-meta*) (files/lt-home)) path)))

(defn validate [plugin]
  (let [valid? (every? plugin [:name :author :behaviors :desc])]
    (if-not valid?
      (do
        (console/error (str "Invalid plugin.json file: " (:dir plugin) "/plugin.json \nPlugins must include values for name, author, behaviors, and desc."))
        nil)
      plugin)))

(defn plugin-edn [dir]
  (when-let [content (files/open-sync (files/join dir "plugin.edn"))]
    (-> (reader/read-string (:content content))
        (assoc :dir dir)
        (validate))))

(defn plugin-json [dir]
  (when-let [content (files/open-sync (files/join dir "plugin.json"))]
    (-> (js/JSON.parse (:content content))
        (js->clj :keywordize-keys true)
        (assoc :dir dir)
        (validate))))

(defn plugin-info [dir]
  (or (plugin-json dir) (plugin-edn dir)))

(defn available-plugins []
  (let [ds (files/dirs (files/join deploy/home-path "plugins"))]
    (into {}
          (->> ds
               (map plugin-info)
               (filterv identity)
               (map (juxt :name identity))))))

(defn plugin-behaviors [plug]
  (let [{:keys [behaviors dir]} plug
        file (files/join dir behaviors)
        behs (-> (files/open-sync file)
                 (:content)
                 (settings/safe-read file))]
    (when behs
      (walk/prewalk (fn [x]
                      (when (list? x)
                        (alter-meta! x assoc ::dir dir))
                      x)
                    behs)
      behs)))

(defn local-module [plugin-name module-name]
  (files/join plugins-dir plugin-name "node_modules" module-name))

(behavior ::init-plugins
                  :triggers #{:pre-init}
                  :reaction (fn [app]
                              ;;load enabled plugins
                              (object/merge! app/app {::plugins (available-plugins)})
                              (cmd/exec! :behaviors.reload)))

(behavior ::behaviors.refreshed-load-keys
                  :triggers #{:behaviors.refreshed}
                  :reaction (fn []
                              (cmd/exec! :keymaps.reload)))

(behavior ::plugin-behavior-diffs
                  :triggers #{:behaviors.diffs.plugin+}
                  :reaction (fn [this diffs]
                              (concat diffs (mapv plugin-behaviors (vals (::plugins @this))))))

(behavior ::plugin-keymap-diffs
                  :triggers #{:keymap.diffs.plugin+}
                  :reaction (fn [this diffs]
                              (concat diffs (mapv settings/parse-key-file (::keymaps @this)))))

(behavior ::load-js
                  :triggers #{:object.instant}
                  :desc "App: Load a javascript file"
                  :params [{:label "path"}]
                  :type :user
                  :reaction (fn [this path sync?]
                              (let [path (adjust-path path)]
                                (when-not (get (::loaded-files @this) path)
                                  (object/update! this [::loaded-files] #(conj (or % #{}) path))
                                  (load/js path true)))))

(behavior ::load-css
                  :triggers #{:object.instant}
                  :desc "App: Load a css file"
                  :params [{:label "path"}]
                  :type :user
                  :reaction (fn [this path]
                              (let [path (adjust-path path)]
                                (when-not (get (::loaded-files @this) path)
                                  (object/update! this [::loaded-files] #(conj (or % #{}) path))
                                  (load/css path)))))

(behavior ::load-keymap
                  :triggers #{:object.instant}
                  :desc "App: Load a keymap file"
                  :params [{:label "path"}]
                  :type :user
                  :reaction (fn [this path]
                              (let [path (adjust-path path)]
                                (if (::keymaps @this)
                                  (object/update! this [::keymaps] conj path)
                                  (object/merge! this {::keymaps #{path}})))))

(behavior ::check-for-plugin-file
                  :triggers #{:create}
                  :desc "Plugin: Determine if this is a plugin file"
                  :reaction (fn [this]
                              (let [path (-> @this :info :path)
                                    plugin-edn (or (files/walk-up-find path "plugin.json") (files/walk-up-find path "plugin.edn"))]
                                (when plugin-edn
                                  (object/merge! this {::plugin-path (files/parent plugin-edn)})
                                  (object/add-tags this [:plugin.file])))))

(def plugin-url "http://localhost:8082")

(behavior ::update-server-plugins
                :triggers #{:fetch-plugins}
                :desc "Plugin Manager: fetch plugins"
                :reaction (fn [this]

                            (fetch/xhr [:get plugin-url] {}
                                       (fn [data]
                                         (when data
                                           (object/raise this :plugin-results (reader/read-string data)))
                                         ))))

(defui server-plugin-ui [plugin]
  (let [info (:info plugin)]
    [:li
     (when (-> @app/app ::plugins (get (:name info)))
       [:span.installed])
     [:span.source [:a {:href (:url plugin)} "source"]]
     [:h1 (:name info) [:span.version (-> plugin :versions first :version)]]
     [:h3 (:author info)]
     [:p (:desc info)]])
  :click (fn []
           (let [name (-> plugin :info :name)]
             (if-not (-> @app/app ::plugins (get name))
               (do
                 (object/update! app/app [::plugins] assoc name {})
                 (this-as me
                          (fetch-and-install (-> plugin :versions first :tar) name
                                             (fn []
                                               (dom/append me (crate/html [:span.installed]))
                                               ))))
               (notifos/set-msg! (str name " is already installed"))))))

(behavior ::render-server-plugins
                :triggers #{:plugin-results}
                :desc "Plugin Manager: render plugin results"
                :reaction (fn [this plugins]
                            (let [ul (dom/$ :.server-plugins (object/->content this))]
                              (dom/empty ul)
                              (dom/append ul (dom/fragment (map server-plugin-ui plugins))))))

(behavior ::submit-plugin
                  :triggers #{:submit-plugin!}
                  :desc "Plugin Manager: submit a new plugin"
                  :reaction (fn [this url]
                              (fetch/xhr [:post (str plugin-url "/add" )] {:url url}
                                       (fn [data]
                                         (println data)
                                         ))))

(behavior ::on-close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (tabs/rem! this)))

(defui tab [this tab-name label]
  [:button {:class (bound this #(when (= tab-name (:tab %))
                                  "active"))}
   label]
  :click (fn []
           (object/merge! this {:tab tab-name})))

(defui search-input [this]
  [:input {:placeholder "search plugins"}])

(defui tabs-and-search [this]
  [:div.tabs
   (tab this :server "Available")
   (tab this :installed "Installed")
   (search-input this)]
  )

(object/object* ::plugin-manager
                :tags #{:plugin-manager}
                :name "Plugins"
                :tab :server
                :init (fn [this]
                        [:div {:class (bound this #(str "plugin-manager"
                                                        (if (= (:tab %) :server)
                                                          " server")))}
                         (tabs-and-search this)
                         [:ul.server-plugins
                          ]
                         [:ul.plugins
                          (for [plugin (vals (available-plugins))]
                            [:li
                             [:h1 (:name plugin) [:span.version "0.0.1"]]
                             [:h3 (:author plugin)]
                             [:p (:desc plugin)]
                             ]
                            )]]))

(defn fetch-and-install [url name cb]
  (let [tmp-gz (str plugins-dir "/" name "tmp.tar.gz")
        tmp-dir (str plugins-dir "/" name "-tmp")]
    (notifos/working (str "Downloading plugin: " name))
    (deploy/download-file url tmp-gz (fn []
                                       (notifos/done-working)
                                       (notifos/working "Extracting plugin...")
                                       (deploy/untar tmp-gz tmp-dir
                                                     (fn []
                                                       (let [munged-dir (first (files/full-path-ls tmp-dir))]
                                                         (files/move! munged-dir (str plugins-dir "/" name "/"))
                                                         (files/delete! tmp-dir)
                                                         (files/delete! tmp-gz)
                                                         (notifos/done-working (str "Plugin fetched: " name))
                                                         (object/raise manager :plugin.fetched)
                                                         (when cb
                                                           (cb))
                                                         )))))))

(def manager (object/create ::plugin-manager))

(comment

  (::plugins @app/app)

  (object/raise manager :fetch-plugins)
  (object/merge! app/app {::plugins (available-plugins)})

  (object/merge! manager {:tab :server})

  (lt.objs.tabs/add! manager)


  )

(cmd/command {:command :build
              :desc "Editor: build file or project"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (object/raise ed :build)))})


;;This call to tag-behaviors is necessary as there are no behaviors loaded when the
;;app is first run.
(object/tag-behaviors :app [::init-plugins ::plugin-behavior-diffs ::plugin-keymap-diffs])
