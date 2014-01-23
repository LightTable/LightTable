(ns lt.objs.plugins
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
            [cljs.reader :as reader]
            [fetch.core :as fetch]
            [crate.core :as crate]
            [crate.binding :refer [bound]]
            [lt.util.kahn :as kahn]
            [lt.util.load :as load]
            [lt.util.dom :as dom]
            [clojure.string :as string]
            [clojure.walk :as walk])
  (:require-macros [lt.macros :refer [behavior defui]]))


(def plugins-dir (files/lt-home "plugins"))
(def user-plugins-dir (files/lt-user-dir "plugins"))
(def plugins-url "http://plugins.lighttable.com")
(def ^:dynamic *plugin-dir* nil)

(defn plugin-dir [name]
  (let [lt-plugin (files/join plugins-dir name)
        user-plugin (files/join plugins-dir name)
        try-dir (fn [path] (if (files/exists? path) path false))]
    (or (try-dir lt-plugin)
        (try-dir user-plugin))))


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

;;*********************************************************
;; Plugin reading
;;*********************************************************

(defn validate [plugin]
  (let [valid? (every? plugin [:name :author :behaviors :desc])]
    (if-not valid?
      (do
        (console/error (str "Invalid plugin.json file: " (:dir plugin) "/plugin.json \nPlugins
                            must include values for name, version, author, behaviors, and desc."))
        nil)
      plugin)))

(defn plugin-edn [dir]
  (when-let [content (files/open-sync (files/join dir "plugin.edn"))]
    (-> (EOF-read (:content content))
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
  (let [ds (concat (files/dirs plugins-dir)
                   (files/dirs user-plugins-dir))]
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
;; Plugin install/uninstall
;;*********************************************************

(defn install-failed [name]
  (when (and (by-name name)
             (not (:version (by-name name))))
    (object/update! app/app [::plugins] dissoc name))
  (notifos/done-working (str "Plugin install failed for: " name)))

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
                                                       (let [munged-dir (first (files/full-path-ls tmp-dir))]
                                                         (when munged-dir
                                                           (files/move! munged-dir (str user-plugins-dir "/" munged-name "/")))
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
  (let [name (-> plugin :info :name)
        ver (-> plugin :version)
        installed? (-> @app/app ::plugins (get name))]
    (if (or (not installed?)
            (and (:version installed?)
                 (deploy/is-newer? (:version installed?) ver)))
      (do
        (object/update! app/app [::plugins] assoc name {})
        (fetch-and-install (-> plugin :tar) name
                           (fn []
                             (when cb
                               (cb true))
                             (object/raise manager :refresh!)
                             )))
      (do
        (notifos/set-msg! (str name " is already installed"))
        (when cb
          (cb false))))))

(defn transitive-install [plugin deps cb]
  (let [cur (or (-> plugin :name) (-> plugin :info :name))
        others (dissoc deps cur)
        counter (atom (count others))
        count-down (fn []
                     (swap! counter dec)
                     ;;then install the actual plugin
                     (when (<= @counter 0)
                       (install-version (deps cur) (fn [installed?]
                                                     (when cb
                                                       (cb installed?))
                                                     (when installed?
                                                       ;;a new plugin has been installed, we should reload everything
                                                       (cmd/exec! :behaviors.reload))))))]
    ;;first get and install all the deps
    ;;count them down and then install the real plugin and reload.
    (if (seq others)
      (doseq [[_ dep] others]
        (install-version dep count-down))
      (count-down))))

(defn discover-deps [plugin cb]
  (fetch/xhr [:post (str plugins-url "/install")] {:name (or (-> plugin :name) (-> plugin :info :name))
                                                   :version (or (-> plugin :version)
                                                                (-> plugin :info :version))}
                                   (fn [data]
                                     (if-not (and data (seq data))
                                       (install-failed (or (-> plugin :name) (-> plugin :info :name)))
                                       (transitive-install plugin (EOF-read data) cb)))))

(defn uninstall [plugin]
  (files/delete! (:dir plugin))
  (object/raise manager :refresh!))

;;*********************************************************
;; Manager ui
;;*********************************************************

(defui url-input []
  [:input {:type "text" :placeholder "Github URL"}]
  :focus (fn []
           (ctx/in! :popup.input))
  :blur (fn []
          (ctx/out! :popup.input)))

(defn submit-url []
  (let [input (url-input)
        p (popup/popup! {:header "Submit a plugin to the central repository"
                         :body [:div
                                [:p "You can submit a github url to add a plugin to the central repository.
                                 All plugin repos must have at least one tag in version format, e.g. 0.1.2 and must have a plugin.json
                                 with name, version, desc, and behaviors keys. To refresh the available versions, just resubmit the plugin."]
                                [:label "Github URL for plugin: "]
                                input
                                ]
                         :buttons [{:label "cancel"}
                                   {:label "submit"
                                    :action (fn []
                                              (object/raise manager :submit-plugin! (dom/val input)))}]})]
    (dom/focus input)
    (.setSelectionRange input 1000 1000)))

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
  [:span.source [:a {:href (:url plugin (:source plugin))} "source"]]
  :click (fn [e]
           (dom/prevent e)
           (dom/stop-propagation e)
           (.Shell.openExternal app/gui (:url plugin (:source plugin)))))

(defui update-button [plugin]
  [:span.update]
  :click (fn [e]
           (dom/prevent e)
           (dom/stop-propagation e)
           (discover-deps plugin nil)))

(defui install-button [plugin]
  [:span.install]
  :click (fn [e]
           (this-as me
                    (discover-deps plugin (fn []
                                            (dom/remove (dom/parent me))
                                            )))
           (dom/prevent e)
           (dom/stop-propagation e)))

(defui server-plugin-ui [plugin]
  (let [info (:info plugin)
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
     [:h1 (:name info) [:span.version ver]]
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
  (let [cached (-> @manager :version-cache (get (:name plugin)))
        update? (when cached
                  (deploy/is-newer? (:version plugin) cached))]
    [:li {:class (if update?
                   "has-update")}
     (if update?
       (update-button (assoc plugin :version cached))
       (uninstall-button plugin))
     (source-button plugin)
     [:h1 (:name plugin) [:span.version (:version plugin)]]
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

(behavior ::update-server-plugins
          :triggers #{:fetch-plugins}
          :desc "Plugin Manager: fetch plugins"
          :reaction (fn [this]
                      (notifos/working "Fetching available plugins...")
                      (fetch/xhr [:post (str plugins-url "/versions")] {:names (pr-str (-> @app/app ::plugins keys vec))}
                                 (fn [data]
                                   (let [cache (EOF-read data)]
                                     (when-not (= cache (:version-cache @this))
                                       (object/merge! this {:version-cache cache})
                                       (object/raise this :refresh!)))))
                      (fetch/xhr [:get plugins-url] {}
                                 (fn [data]
                                   (notifos/done-working "")
                                   (when data
                                     (object/raise this :plugin-results (EOF-read data)))
                                   ))))

(behavior ::render-server-plugins
          :triggers #{:plugin-results}
          :desc "Plugin Manager: render plugin results"
          :reaction (fn [this plugins]
                      (let [ul (dom/$ :.server-plugins (object/->content this))]
                        (dom/empty ul)
                        (->> (remove #(installed? (-> % :info :name)) plugins)
                             (map server-plugin-ui)
                             (dom/fragment)
                             (dom/append ul)))))

(behavior ::submit-plugin
          :triggers #{:submit-plugin!}
          :desc "Plugin Manager: submit a new plugin"
          :reaction (fn [this url]
                      (notifos/working (str "Submitting plugin: " url))
                      (fetch/xhr [:post (str plugins-url "/add" )] {:url url}
                                 (fn [data]
                                   (notifos/done-working "")
                                   (let [data (EOF-read data)]
                                     (popup/popup! {:header (condp = (:status data)
                                                              :success "Plugin added!"
                                                              :error "There's a problem with the plugin."
                                                              :refresh "Plugin refreshed!")
                                                    :body [:div
                                                           (if (= (:status data) :error)
                                                             [:div "Url submitted: " url])
                                                           [:p (:description data)]]
                                                    :buttons [{:label "ok"}]}))))))

(behavior ::search-server-plugins
          :triggers #{:search-plugins!}
          :desc "Plugin Manager: search plugins"
          :reaction (fn [this search]
                      (if (empty? search)
                        (object/raise this :fetch-plugins)
                        (do
                          (notifos/working (str "Searching plugins for: " search))
                          (fetch/xhr [:post (str plugins-url "/search")] {:term search}
                                     (fn [data]
                                       (notifos/done-working "")
                                       (when data
                                         (object/raise this :plugin-results (EOF-read data)))
                                       ))))))

(behavior ::render-installed-plugins
          :triggers #{:refresh!}
          :desc "Plugin Manager: refresh installed plugins"
          :reaction (fn [this plugins]
                      (object/merge! app/app {::plugins (available-plugins)})
                      (let [ul (dom/$ :.plugins (object/->content this))]
                        (dom/empty ul)
                        (dom/append ul (dom/fragment (map installed-plugin-ui (->> @app/app ::plugins vals (sort-by :name))))))))

(behavior ::on-close
          :triggers #{:close}
          :reaction (fn [this]
                      (tabs/rem! this)))

;;*********************************************************
;; Manager commands
;;*********************************************************

(cmd/command {:command :plugin-manager.submit
              :desc "Plugins: Submit a plugin"
              :exec (fn []
                      (submit-url))})

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
                      (cmd/exec! :plugin-manager.refresh))})

;;*********************************************************
;; App-level plugin behaviors
;;*********************************************************

(behavior ::init-plugins
          :triggers #{:pre-load}
          :reaction (fn [app]
                      (when-not (files/exists? user-plugins-dir)
                        (files/mkdir user-plugins-dir))
                      ;;load enabled plugins
                      (object/merge! app/app {::plugins (available-plugins)})))

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
                                            (reverse)
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
          :desc "App: Load a javascript file"
          :params [{:label "path"}]
          :type :user
          :reaction (fn [this path]
                      (binding [*plugin-dir* (::dir object/*behavior-meta*)]
                        (let [paths (if (coll? path)
                                      path
                                      [path])]
                          (doseq [path paths]
                            (let [path (adjust-path path)]
                              (when-not (get (::loaded-files @this) path)
                                (try
                                  (load/js path true)
                                  (object/update! this [::loaded-files] #(conj (or % #{}) path))
                                  (catch js/Error e
                                    (.error js/console (str "Error loading JS file: " path " : " e))
                                    (.error js/console (.-stack e)))
                                  (catch js/global.Error e
                                    (.error js/console (str "Error loading JS file: " path " : " e))
                                    (.error js/console (.-stack e)))))))))))

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

;;*********************************************************
;; App-level init
;;*********************************************************

;;This call to tag-behaviors is necessary as there are no behaviors loaded when the
;;app is first run.
(object/tag-behaviors :app [::init-plugins ::plugin-behavior-diffs ::plugin-keymap-diffs])
