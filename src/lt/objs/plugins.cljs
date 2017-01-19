(ns lt.objs.plugins
  "Provide plugin manager with ability to search, install (download and unpack),
  remove and update plguins"
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.context :as ctx]
            [lt.objs.console :as console]
            [lt.objs.app :as app]
            [lt.objs.files :as files]
            [lt.objs.settings :as settings]
            [lt.objs.editor.pool :as pool]
            [lt.objs.popup :as popup]
            [lt.objs.deploy :as deploy]
            [lt.objs.notifos :as notifos]
            [lt.objs.tabs :as tabs]
            [lt.util.js :refer [wait]]
            [lt.objs.platform :as platform]
            [cljs.reader :as reader]
            [fetch.core :as fetch]
            [crate.core :as crate]
            [crate.binding :refer [bound]]
            [lt.util.kahn :as kahn]
            [lt.util.load :as load]
            [lt.util.dom :as dom]
            [clojure.set :as set]
            [clojure.string :as string]
            [clojure.walk :as walk])
  (:require-macros [lt.macros :refer [behavior defui]]))


(def plugins-dir (files/lt-home "plugins"))
(def user-plugins-dir (files/lt-user-dir "plugins"))
(def ^:dynamic *plugin-dir* nil)

(declare manager)

(defn EOF-read [s]
  (when (and s
             (seq s))
    (reader/read-string s)))

(defn munge-plugin-name [n]
  (when n
    (-> n
        (string/replace " " "_")
        (string/replace "-" "_")
        (string/replace "." "_"))))

(defn adjust-path [path]
  (if (files/absolute? path)
    path
    (files/join (or (::dir object/*behavior-meta*) (files/lt-home)) path)))

(defn find-plugin [plugin-name]
  (let [plugin-name (munge-plugin-name plugin-name)]
    (cond
     (::dir object/*behavior-meta*) (::dir object/*behavior-meta*)
     (files/exists? (files/join user-plugins-dir plugin-name)) (files/join user-plugins-dir plugin-name)
     (files/exists? (files/join plugins-dir plugin-name)) (files/join plugins-dir plugin-name)
     :else nil)))

(defn local-module [plugin-name module-name]
  (when-let [plugin-path (find-plugin plugin-name)]
    (files/join plugin-path "node_modules" module-name)))

(defn by-name [plugin-name]
  (-> @app/app ::plugins (get plugin-name)))

(defn installed? [plugin-name]
  (boolean (by-name plugin-name)))

(cmd/command {:command :build
              :desc "Editor: build file or project"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (object/raise ed :build)))})

(cmd/command {:command :behaviors.force-reload
              :desc "Plugins: Ignore cache and force reload the current behaviors file"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (when (object/has-tag? ed :editor.behaviors)
                          (swap! manager update-in [::force-reload] #(conj (or % #{}) (get-in @ed [:info :path])))
                          (cmd/exec! :behaviors.reload))))})

;;*********************************************************
;; Plugin reading
;;*********************************************************

(defn validate [plugin filename]
  (let [valid? (every? plugin [:name :author :behaviors :desc])]
    (if-not valid?
      (do
        (console/error (str "Invalid " filename " file: " (:dir plugin) "/" filename "\nPlugins "
                            "must include values for name, version, author, behaviors, and desc."))
        nil)
      plugin)))

(defn plugin-edn [dir]
  (let [file (files/join dir "plugin.edn")]
    (when-let [content (and (files/exists? file) (files/open-sync file))]
      (try
        (-> (EOF-read (:content content))
            (assoc :dir dir)
            (validate "plugin.edn"))
        (catch :default e
          (console/error (str "FAILED to load plugin.edn: " dir)))))))

(defn plugin-json [dir]
  (let [file (files/join dir "plugin.json")]
    (when-let [content (and (files/exists? file) (files/open-sync file))]
      (-> (js/JSON.parse (:content content))
          (js->clj :keywordize-keys true)
          (assoc :dir dir)
          (validate "plugin.json")))))

(defn plugin-info [dir]
  (or (plugin-json dir) (plugin-edn dir)))

(defn missing-deps [all]
  (let [deps (->> (vals all)
                  (mapcat (comp seq :dependencies)))]
    (-> (reduce (fn [final [name version]]
                  (let [name (cljs.core/name name)]
                    (if-let [cur (or (get all name) (get final name))]
                      (if (deploy/is-newer? (:version cur) version)
                        (assoc! final name {:name name
                                            :version version})
                        final)
                      (assoc! final name {:name name
                                          :version version}))))
                (transient {})
                deps)
        (persistent!)
        (vals)
        (seq))))

(defn outdated? [plugin]
  (let [cached (-> @manager :server-plugins (get (:name plugin)) :latest-version)]
    (if cached
      (deploy/is-newer? (:version plugin) cached))))

(defn plugin-behaviors [plug]
  (when (seq plug)
    (try
     (let [{:keys [behaviors dir]} plug
           file (files/join dir behaviors)
           file (files/real-path file)
           behs (settings/parse-file file)
           force? (get (::force-reload @manager) file)]
       (when force?
         (swap! manager update-in [::force-reload] disj file))
       (when behs
         (walk/prewalk (fn [x]
                         (when (coll? x)
                           (alter-meta! x assoc ::dir dir ::force-reload force?))
                         x)
                       behs)
         behs))
     (catch :default e
       (console/error (str "Could not load behaviors for plugin: " (:name plug)))
       {}))))

(defn plugin-dependency-graph [plugins]
  (into {}
      (for [[nme v] plugins]
        [nme (set (map name (keys (:dependencies v))))])))

(defn find-cycles [cur {:keys [seen root stack graph] :as state}]
  (first (filter identity (for [c (remove seen cur)]
                            (if (= c root)
                              (conj stack c)
                              (find-cycles (get graph c) (-> state
                                                             (update-in [:stack] conj c)
                                                             (update-in [:seen] conj c))))))))

(defn ->cycles [graph]
  (filterv identity
           (for [[root deps] graph
                 :let [stack (find-cycles deps {:seen #{} :stack [root] :graph graph :root root})]]
             stack)))

(defn cycle-desc [cycles]
  (for [cycle cycles]
    [:div
     (reduce str (interpose " => " cycle))]))

;;*********************************************************
;; Metadata
;;*********************************************************

(declare install-failed)

(def metadata-commits "https://api.github.com/repos/LightTable/plugin-metadata/commits")
(def metadata-download "https://api.github.com/repos/LightTable/plugin-metadata/tarball/master")
(def metadata-dir (files/lt-user-dir "metadata"))
(def metadata-cache (files/join metadata-dir "cache.json"))

(defn version-sort [a b]
  (cond
   (= a b) 0
   (deploy/is-newer? a b) -1
   :else 1))

(defn- valid-plugin-dir?
  [path]
  (and (files/dir? path)
       (not (= "script" (files/basename path)))))

(defn build-cache [sha]
  (let [items (filter valid-plugin-dir? (files/full-path-ls metadata-dir))
        cache (into {:__sha sha}
                    (for [plugin items
                          :let [versions (->> (files/full-path-ls plugin)
                                              (filter files/dir?)
                                              (map plugin-info)
                                              (sort-by :version version-sort)
                                              (vec))
                                latest (last versions)]]
                      [(:name latest) {:versions (into {} (map (juxt :version identity) versions))
                                       :latest-version (:version latest)}]
                      ))]
    cache))

(defn save-cache [cache]
  (files/save metadata-cache (js/JSON.stringify (clj->js cache))))

(defn latest-metadata-sha []
  (fetch/xhr [:get metadata-commits] {}
             (fn [data]
               (when-let [parsed (try (js/JSON.parse data)
                                   (catch :default e
                                     (console/error (str "Invalid JSON response from " metadata-commits ": " (pr-str data)))))]
                 (let [sha (-> (aget parsed 0)
                               (aget "sha"))]
                   (object/raise manager :metadata.sha sha))))))

(defn download-metadata [sha]
  (let [tmp-gz (files/lt-user-dir "metadata-temp.tar.gz")
        tmp-dir (files/lt-user-dir "metadata-temp")]
    (notifos/working "Updating plugin metadata")
    (deploy/download-file metadata-download tmp-gz (fn []
                                                     (deploy/untar tmp-gz tmp-dir
                                                                   (fn []
                                                                     (notifos/done-working)
                                                                     (let [munged-dir (first (files/full-path-ls tmp-dir))]
                                                                       (when munged-dir
                                                                         (when (files/exists? metadata-dir)
                                                                           (files/delete! metadata-dir))
                                                                         (files/move! munged-dir metadata-dir))
                                                                       (files/delete! tmp-dir)
                                                                       (files/delete! tmp-gz)
                                                                       (if munged-dir
                                                                         (do
                                                                           (save-cache (build-cache sha))
                                                                           (notifos/done-working (str "Plugin metadata updated. "))
                                                                           (object/raise manager :metadata.updated))
                                                                         (install-failed "metadata")))))))))

(defn read-cache []
  (if (files/exists? metadata-cache)
    (-> (files/open-sync metadata-cache)
        (:content)
        (js/JSON.parse)
        (js->clj :keywordize-keys true))))

(defn search-plugins [plugins search]
  (let [search (.toLowerCase search)]
    (filter (fn [plugin]
              (or (> (.indexOf (.toLowerCase (:name plugin "")) search) -1)
                  (> (.indexOf (.toLowerCase (:author plugin "")) search) -1)
                  (> (.indexOf (.toLowerCase (:desc plugin "")) search) -1)))
            plugins)))


(defn latest-version-merge [neue old]
  (let [neue (seq neue)]
    (reduce
     (fn [final [name ver]]
       (if-let [cur-ver (-> name final :version)]
         (if (deploy/is-newer? ver cur-ver)
           (assoc final name ver)
           final)
         (assoc final name ver)))
     old
     neue)))

(defn transitive-deps [plugins [name ver] seen]
  (let [name (keyword name)]
    (if-let [cur (get-in plugins [name :versions (keyword ver)])]
      (let [deps (-> cur :dependencies)
            unique (remove seen (keys deps))
            seen (latest-version-merge {name cur} seen)]
        (reduce
         (fn [seen cur]
           (transitive-deps plugins cur seen))
         seen
         (select-keys deps unique)))
      seen)))


(defn latest-version [plugin]
  (get (:versions plugin) (keyword (:latest-version plugin))))

(defn all-latest [plugins]
  (->> (dissoc plugins :__sha)
       (vals)
       (map latest-version)))

;; (plugin->tar (:Rainbow (transitive-deps (:server-plugins @manager) ["Rainbow" "0.0.8"] {})))
;; (save-cache (build-cache))
;; (object/raise manager :plugin-results (vals (read-cache)))
;; (object/merge! manager {:server-plugins (read-cache)})


;; (build-cache)

;; (download-metadata "foo")

;;*********************************************************
;; Plugin install/uninstall
;;*********************************************************

(defn install-failed [name]
  (when (and (by-name name)
             (not (:version (by-name name))))
    (object/update! app/app [::plugins] dissoc name))
  (notifos/done-working (str "Plugin install failed for: " name)))

(defn plugin->tar [plugin]
  (let [[repo username] (->> (string/split (:source plugin) "/")
                   (reverse)
                   (filter #(not= % ""))
                   (take 2))
        repo (.replace repo #".git" "")]
    (str "https://api.github.com/repos/" username "/" repo "/tarball/" (:version plugin))))

(defn fetch-and-install [url name cb]
  (let [munged-name (munge-plugin-name name)
        tmp-gz (str user-plugins-dir "/" munged-name "-tmp.tar.gz")
        tmp-dir (str user-plugins-dir "/" munged-name "-tmp")]
    (notifos/working (str "Downloading plugin: " name))
    (deploy/download-file url tmp-gz (fn []
                                       (notifos/done-working)
                                       (notifos/working "Extracting plugin...")
                                       (deploy/untar tmp-gz tmp-dir
                                                     (fn []
                                                       (let [munged-dir (first (files/full-path-ls tmp-dir))
                                                             final-path (str user-plugins-dir "/" munged-name "/")]
                                                         (when munged-dir
                                                           (when (files/exists? final-path)
                                                             (files/delete! final-path))
                                                           (files/move! munged-dir final-path))
                                                         (files/delete! tmp-dir)
                                                         (files/delete! tmp-gz)
                                                         (if munged-dir
                                                           (do
                                                             (notifos/done-working (str "Plugin fetched: " name))
                                                             (object/raise manager :plugin.fetched)
                                                             (when cb
                                                               (cb)))
                                                           (install-failed name)))))))))

(defn install-version [plugin cb]
  (let [name (-> plugin :name)
        ver (-> plugin :version)
        installed? (-> @app/app ::plugins (get name))]
    (if (or (not installed?)
            (and (:version installed?)
                 (deploy/is-newer? (:version installed?) ver)))
      (do
        (object/update! app/app [::plugins] assoc name {})
        (fetch-and-install (plugin->tar plugin) name
                           (fn []
                             (when cb
                               (cb true))
                             )))
      (do
        (notifos/set-msg! (str name " is already installed"))
        (when cb
          (cb false))))))

(defn transitive-install [plugin deps cb]
  (let [cur (-> plugin :name keyword)
        others (dissoc deps cur)
        counter (atom (count others))
        count-down (fn []
                     (swap! counter dec)
                     ;;then install the actual plugin
                     (when (<= @counter 0)
                       (install-version (deps cur) (fn [installed?]
                                                     (when cb
                                                       (cb installed?))))))]
    ;;first get and install all the deps
    ;;count them down and then install the real plugin and reload.
    (if (seq others)
      (doseq [[_ dep] others]
        (install-version dep count-down))
      (count-down))))

(defn discover-deps [plugin cb]
  (let [deps (transitive-deps (:server-plugins @manager) [(:name plugin) (:version plugin)] {})]
    (if-not (seq deps)
      (install-failed (:name plugin))
      (transitive-install plugin deps cb))))

(defn install-missing [missing]
  (let [counter (atom (count missing))
        count-down (fn []
                     (swap! counter dec)
                     ;;then install the actual plugin
                     (when (<= @counter 0)
                       (cmd/exec! :behaviors.reload)
                       (object/raise manager :refresh!)
                       (notifos/set-msg! "All missing dependencies installed.")
                       ))]
    ;;first get and install all the deps
    ;;count them down and then install the real plugin and reload.
    (doseq [dep missing]
      (discover-deps dep count-down))))

(defn check-missing
  "Check a plugins map for outdated or missing :dependencies and prompt
  to install missing ones"
  [deps]
  (when-let [missing? (missing-deps deps)]
    (popup/popup! {:header "Some plugin dependencies are missing."
                   :body [:div
                          [:span "We found that the following plugin dependencies are missing: "]
                          (for [{:keys [name version]} missing?]
                            [:div name " " version " "])
                          [:span "Would you like us to install them?"]]
                   :buttons [{:label "Cancel"}
                             {:label "Install all"
                              :action (fn []
                                        (install-missing missing?))}]})))

(defn available-plugins
  "Return a map of plugins by plugin name based on what's read from filesystem"
  []
  (let [ds (concat (files/dirs user-plugins-dir)
                   (files/dirs plugins-dir)
                   [settings/user-plugin-dir])
        plugins (->> ds
                     (map plugin-info)
                     (filterv identity))]
    (-> (reduce (fn [final p]
                  (if-let [cur (get final (:name p))]
                    ;;check if it's newer
                    (if (deploy/is-newer? (:version cur) (:version p))
                      (assoc! final (:name p) p)
                      final)
                    (assoc! final (:name p) p)))
                (transient {})
                plugins)
        (persistent!))))

(defn uninstall [plugin]
  (when (:dir plugin)
    (files/delete! (:dir plugin))
    ;; :ignore-missing b/c uninstalled shows up missing
    (object/raise manager :refresh! :ignore-missing true)
    (notifos/set-msg! (str "Uninstalled " (:name plugin) " " (:version plugin)))))

;;*********************************************************
;; Manager ui
;;*********************************************************

(defui url-input []
  [:input {:type "text" :placeholder "Github URL"}]
  :focus (fn []
           (ctx/in! :popup.input))
  :blur (fn []
          (ctx/out! :popup.input)))

(defui tab [this tab-name label]
  [:button {:class (bound this #(when (= tab-name (:tab %))
                                  "active"))}
   label]
  :click (fn []
           (object/merge! this {:tab tab-name})))

(defui search-input [this]
  [:input {:placeholder "Search available plugins"}]
  :focus (fn []
           (ctx/in! :plugin-manager.search this))
  :blur (fn []
           (ctx/out! :plugin-manager.search)))

(defui tabs-and-search [this]
  [:div.tabs
   (tab this :installed "Installed")
   (tab this :server "Available")
   (search-input this)])

(defui source-button [plugin]
  [:span.source [:a {:href (:url plugin (:source plugin))} "website"]]
  :click (fn [e]
           (dom/prevent e)
           (dom/stop-propagation e)
           (platform/open-url (:url plugin (:source plugin)))))

(defui update-button [plugin]
  [:span.update]
  :click (fn [e]
           (dom/prevent e)
           (dom/stop-propagation e)
           (discover-deps plugin (fn []
                                   (object/raise manager :refresh!)
                                   (cmd/exec! :behaviors.reload)
                                   ;; Wait for behaviors.reload to write its message
                                   (wait 1000 (fn []
                                                (notifos/set-msg! (str "Updated " (:name plugin) " " (:version plugin)))))))))

(defui install-button [plugin]
  [:span.install]
  :click (fn [e]
           (this-as me
                    (discover-deps plugin (fn []
                                            (dom/remove (dom/parent me))
                                            (object/raise manager :refresh!)
                                            (cmd/exec! :behaviors.reload)
                                            ;; Wait for behaviors.reload to write its message
                                            (wait 1000 (fn []
                                                         (notifos/set-msg! (str "Installed " (:name plugin) " " (:version plugin))))))))
           (dom/prevent e)
           (dom/stop-propagation e)))

(defui plugin-link-title [plugin]
  [:span.link (:name plugin)]
  :click (fn [e]
           (dom/prevent e)
           (dom/stop-propagation e)
           (platform/open-url (:url plugin (:source plugin)))))

(defui plugin-title [plugin]
  [:h1
   (plugin-link-title plugin)
   [:span.version (:version plugin)]])

(defui server-plugin-ui [plugin]
  (let [info plugin
        ver (:version info)
        installed (-> @app/app ::plugins (get (:name info)))
        update? (and (:version installed)
                     (deploy/is-newer? (:version installed) ver))]
    [:li {:class (if update?
                   "has-update")}
     (if-not installed
       (install-button plugin)
       (if update?
         (update-button plugin)
         [:span.installed]))
     (source-button plugin)
     (plugin-title plugin)
     [:h3 (:author info)]
     [:p (:desc info)]]))


(defui uninstall-button [plugin]
  [:span.uninstall]
  :click (fn []
           (popup/popup! {:header "Uninstall plugin?"
                          :body [:div "This will delete the plugin from your system, removing any local
                                 changes you may have made, and cannot be undone."]
                          :buttons [{:label "Delete plugin"
                                     :action (fn []
                                               (uninstall plugin))}
                                    {:label "Cancel"}]})))

(defui installed-plugin-ui [plugin]
  (let [cached (-> @manager :server-plugins (get (keyword (:name plugin))) :latest-version)
        update? (when cached
                  (deploy/is-newer? (:version plugin) cached))]
    [:li {:class (if update?
                   "has-update")}
     (when update?
       (update-button (assoc plugin :version cached)))
     (uninstall-button plugin)
     (source-button plugin)
     (plugin-title plugin)
     [:h3 (:author plugin)]
     [:p (:desc plugin)]
     ]))

;;*********************************************************
;; Manager object
;;*********************************************************

(object/object* ::plugin-manager
                :tags #{:plugin-manager}
                :name "Plugins"
                :tab :installed
                :init (fn [this]
                        (object/merge! this {:server-plugins (read-cache)})
                        [:div {:class (bound this #(str "plugin-manager"
                                                        (if (= (:tab %) :server)
                                                          " server")))}
                         (tabs-and-search this)
                         [:ul.server-plugins
                          ]
                         [:ul.plugins]]))

(def manager (object/create ::plugin-manager))



;;*********************************************************
;; Manager behaviors
;;*********************************************************

(behavior ::check-local-metadata-cache
          :triggers #{:metadata.sha}
          :desc "Plugin Manager: check local metadata cache for update"
          :reaction (fn [this sha]
                      (if-not (= (-> @this :server-plugins :__sha) sha)
                        (download-metadata sha)
                        (object/raise this :metadata.updated))))

(behavior ::draw-plugins-on-updated
          :triggers #{:metadata.updated}
          :desc "Plugin Manager: draw plugins on metadata update"
          :reaction (fn [this sha]
                      (object/merge! this {:server-plugins (read-cache)})
                      (object/raise this :plugin-results (all-latest (:server-plugins @this)))))

(behavior ::get-latest-metadata-sha
          :triggers #{:fetch-plugins}
          :desc "Plugin Manager: get the latest metadata sha"
          :reaction (fn [this sha]
                      (latest-metadata-sha)))


(behavior ::render-server-plugins
          :triggers #{:plugin-results}
          :desc "Plugin Manager: render plugin results"
          :reaction (fn [this plugins]
                      (let [ul (dom/$ :.server-plugins (object/->content this))]
                        (dom/empty ul)
                        (->> (remove #(installed? (-> % :name)) plugins)
                             (map server-plugin-ui)
                             (dom/fragment)
                             (dom/append ul)))))

(behavior ::search-server-plugins
          :triggers #{:search-plugins!}
          :desc "Plugin Manager: search plugins"
          :reaction (fn [this search]
                      (let [plugins (all-latest (:server-plugins @manager))]
                        (object/raise this
                                      :plugin-results
                                      (if (empty? search)
                                        plugins
                                        (search-plugins plugins search))))))

(defn save-plugins [plugin-maps]
  (let [plugin-edn-file (files/join settings/user-plugin-dir "plugin.edn")
        plugin-edn (-> plugin-edn-file files/open-sync :content (settings/safe-read plugin-edn-file))
        plugin-name (doto (:name plugin-edn) (assert "User plugin doesn't have a :name"))
        deps (->> plugin-maps
                  vals
                  (remove #(contains? #{plugin-name} (:name %)))
                  (map (juxt :name :version))
                  (into (sorted-map)))
         plugin-edn-body (pr-str (assoc plugin-edn :dependencies deps))]

    (files/save plugin-edn-file
                (-> plugin-edn-body
                    ;; Until clojurescript gets pprint
                    ;; one key/val pair or parent key per line for diffing
                    (string/replace #"(\"\s*,|\{|\},)" #(str % "\n"))
                    (string/replace-first #"^\{\n" "{")
                    (string/replace-first #":dependencies"
                                          ";; Do not edit - :dependencies are auto-generated\n:dependencies")))))

(behavior ::save-user-plugin-dependencies
          :triggers #{:refresh!}
          :desc "Saves dependencies to user's plugin.edn"
          :reaction (fn [this & opts]
                      ;; Use available-plugins b/c ::plugins aren't always up to date e.g. uninstall
                      (save-plugins (available-plugins))))

(behavior ::render-installed-plugins
          :triggers #{:refresh!}
          :desc "Plugin Manager: refresh installed plugins"
          :reaction (fn [this & {:keys [ignore-missing]}]
                      (object/merge! app/app {::plugins (available-plugins)})
                      (when-not ignore-missing
                        (check-missing (::plugins @app/app)))
                      (let [ul (dom/$ :.plugins (object/->content this))]
                        (dom/empty ul)
                        (dom/append ul (dom/fragment (map installed-plugin-ui (->> @app/app ::plugins vals (sort-by #(.toUpperCase (:name %))))))))))

(behavior ::on-close
          :triggers #{:close}
          :reaction (fn [this]
                      (tabs/rem! this)))

;;*********************************************************
;; Manager commands
;;*********************************************************

(cmd/command {:command :plugin-manager.search
              :hidden true
              :desc "Plugins: Search"
              :exec (fn [term]
                      (let [term (or term
                                     (dom/val (dom/$ :input (object/->content manager))))]
                        (object/merge! manager {:tab :server})
                        (object/raise manager :search-plugins! term)))})

(cmd/command {:command :plugin-manager.refresh
              :desc "Plugins: Refresh plugin list"
              :exec (fn []
                      (object/raise manager :refresh!)
                      (object/raise manager :fetch-plugins))})

(cmd/command {:command :plugin-manager.show
              :desc "Plugins: Show plugin manager"
              :exec (fn []
                      (tabs/add-or-focus! manager)
                      (dom/focus (dom/$ :input (object/->content manager)))
                      (cmd/exec! :plugin-manager.refresh))})

(cmd/command {:command :plugin-manager.update-outdated
              :desc "Plugins: Update all outdated"
              :exec (fn []
                      (let [outdated (filter outdated? (->> @app/app ::plugins vals))
                            names (atom #{})
                            countdown (atom (count outdated))]
                        (doseq [plugin outdated
                                :when (seq outdated)
                                :let [cached (-> @manager :server-plugins (get (:name plugin)) :latest-version)]]
                          (discover-deps (assoc plugin :version cached)
                                         (fn []
                                           (swap! names conj (:name plugin))
                                           (swap! countdown dec)
                                           (object/raise manager :refresh!)
                                           (when (<= @countdown 0)
                                             (cmd/exec! :behaviors.reload)
                                             (notifos/set-msg! (apply str "Updated: "
                                                                      (interpose ", " @names)))))))))})


;;*********************************************************
;; App-level plugin behaviors
;;*********************************************************

(behavior ::init-plugins
          :triggers #{:pre-load}
          :reaction (fn [app]
                      (when-not (files/exists? user-plugins-dir)
                        (files/mkdir user-plugins-dir))
                      (object/raise app/app :create-user-plugin)
                      (object/raise app/app :flatten-map-settings)
                      ;;load enabled plugins
                      (object/merge! app/app {::plugins (available-plugins)})
                      (check-missing (::plugins @app/app))))

(behavior ::behaviors.refreshed-load-keys
          :triggers #{:behaviors.refreshed}
          :reaction (fn []
                      (cmd/exec! :keymaps.reload)))

(behavior ::plugin-behavior-diffs
          :triggers #{:behaviors.diffs.plugin+}
          :reaction (fn [this diffs]
                      (let [plugins (::plugins @this)
                            dep-graph (plugin-dependency-graph plugins)
                            dep-ordered (-> dep-graph
                                            (kahn/kahn-sort)
                                            (seq))
                            mapped (if dep-ordered
                                     (map plugins dep-ordered)
                                     (vals plugins))]
                        (when (and plugins
                                   (not dep-ordered)
                                   (not (::cycle-warned @this)))
                          (object/merge! this {::cycle-warned true})
                          (popup/popup! {:header "There's a cycle in your plugin dependencies."
                                         :body [:div "As a result, we can't come up with an optimal way to load them.
                                                This means there may be unexpected consequences to being loaded out of order.
                                                Here are the plugins causing the cycle: "
                                                (-> dep-graph
                                                    (->cycles)
                                                    (cycle-desc))]
                                         :buttons [{:label "ok"}]}))
                        (concat diffs (mapv plugin-behaviors mapped)))))

(behavior ::plugin-keymap-diffs
          :triggers #{:keymap.diffs.plugin+}
          :reaction (fn [this diffs]
                      (concat diffs (filter identity (mapv settings/parse-key-file (::keymaps @this))))))

(behavior ::load-js
          :triggers #{:object.instant-load}
          :desc "App: Load javascript file(s)"
          :params [{:label "path(s)"}]
          :type :user
          :reaction (fn [this path]
                      (binding [*plugin-dir* (::dir object/*behavior-meta*)
                                load/*force-reload* (::force-reload object/*behavior-meta*)]
                        (let [paths (if (coll? path)
                                      path
                                      [path])]
                          (doseq [path paths]
                            (let [path (adjust-path path)]
                              (when (or load/*force-reload*
                                        (not (get (::loaded-files @this) path)))
                                (try
                                  (load/js path true)
                                  (object/update! this [::loaded-files] #(conj (or % #{}) path))
                                  (catch :default e
                                    (console/error (str "Error loading JS file: " path " : " e) e))))))))))

(behavior ::load-css
          :triggers #{:object.instant}
          :desc "App: Load css file(s)"
          :params [{:label "path(s)"}]
          :type :user
          :reaction (fn [this path]
                      (let [paths (map adjust-path (if (coll? path) path [path]))]
                        (doseq [path paths]
                          (when (or load/*force-reload*
                                    (not (get (::loaded-files @this) path)))
                            (object/update! this [::loaded-files] #(conj (or % #{}) path))
                            (load/css path))))))

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

;;*********************************************************
;; App-level init
;;*********************************************************

;;This call to tag-behaviors is necessary as there are no behaviors loaded when the
;;app is first run.
(object/tag-behaviors :app [::init-plugins ::plugin-behavior-diffs ::plugin-keymap-diffs])
