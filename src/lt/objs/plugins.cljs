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

(def plugin-url "http://plugins.lighttable.com")
(def plugin-url "http://localhost:8087")

(behavior ::update-server-plugins
          :triggers #{:fetch-plugins}
          :desc "Plugin Manager: fetch plugins"
          :reaction (fn [this]
                      (fetch/xhr [:post (str plugin-url "/versions")] {:names (pr-str (-> @app/app ::plugins keys vec))}
                                 (fn [data]
                                   (object/merge! this {:version-cache (reader/read-string data)})
                                   (object/raise this :refresh!)
                                   ))
                      (fetch/xhr [:get plugin-url] {}
                                 (fn [data]
                                   (when data
                                     (object/raise this :plugin-results (reader/read-string data)))
                                   ))))


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
  (fetch/xhr [:post (str plugin-url "/install")] {:name (or (-> plugin :name) (-> plugin :info :name))
                                                  :version (or (-> plugin :version)
                                                               (-> plugin :info :version)
                                                               (-> plugin :versions first :version))}
                                   (fn [data]
                                     (transitive-install plugin (reader/read-string data) cb))))

(defui server-plugin-ui [plugin]
  (let [info (:info plugin)
        ver (-> plugin :versions first :version)
        installed (-> @app/app ::plugins (get (:name info)))]
    [:li
     (when installed
       (if (and (:version installed)
                (deploy/is-newer? (:version installed) ver))
         (update-button plugin)
         [:span.installed]))
     (source-button plugin)
     [:h1 (:name info) [:span.version ver]]
     [:h3 (:author info)]
     [:p (:desc info)]])
  :click (fn []
           (this-as me
                    (discover-deps plugin (fn []
                                            (dom/append me (crate/html [:span.installed]))
                                            )))))

(defn uninstall [plugin]
  (println "uninstalling: " (:dir plugin))
  (files/delete! (:dir plugin))
  (object/raise manager :refresh!))

(defui uninstall-button [plugin]
  [:span.uninstall]
  :click (fn []
           (uninstall plugin)))

(defui installed-plugin-ui [plugin]
  (let [cached (-> @manager :version-cache (get (:name plugin)))]
    [:li
     (if (and (deploy/is-newer? (:version plugin) cached))
       (update-button (assoc plugin :version cached))
       (uninstall-button plugin))
     (source-button plugin)
     [:h1 (:name plugin) [:span.version (:version plugin)]]
     [:h3 (:author plugin)]
     [:p (:desc plugin)]
     ]))

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
                                   (let [data (reader/read-string data)]
                                     (popup/popup! {:header "woo"
                                              :body (:description data)}))))))

(behavior ::search-server-plugins
          :triggers #{:search-plugins!}
          :desc "Plugin Manager: search plugins"
          :reaction (fn [this search]
                      (if (empty? search)
                        (object/raise this :fetch-plugins)
                        (fetch/xhr [:post (str plugin-url "/search")] {:term search}
                                   (fn [data]
                                     (when data
                                       (object/raise this :plugin-results (reader/read-string data)))
                                     )))))

(behavior ::render-installed-plugins
          :triggers #{:refresh!}
          :desc "Plugin Manager: refresh installed plugins"
          :reaction (fn [this plugins]
                      (object/merge! app/app {::plugins (available-plugins)})
                      (let [ul (dom/$ :.plugins (object/->content this))]
                        (dom/empty ul)
                        (dom/append ul (dom/fragment (map installed-plugin-ui (-> @app/app ::plugins vals)))))))

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
  [:input {:placeholder "Search available plugins"}]
  :focus (fn []
           (ctx/in! :plugin-manager.search this))
  :blur (fn []
           (ctx/out! :plugin-manager.search)))

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
                         [:ul.plugins]]))

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

;(object/raise manager :submit-plugin! "https://github.com/LightTable/LightTable-Rainbow")


(def manager (object/create ::plugin-manager))

(cmd/command {:command :plugin-manager.search
              :hidden true
              :desc "Plugins: Search"
              :exec (fn [term]
                      (let [term (or term
                                     (dom/val (dom/$ :input (object/->content manager))))]
                        (object/merge! manager {:tab :server})
                        (object/raise manager :search-plugins! term)))})

(cmd/command {:command :plugin-manager.refresh
              :desc "Plugins: refresh plugin list"
              :exec (fn []
                      (object/raise manager :refresh!)
                      (object/raise manager :fetch-plugins))})

(cmd/command {:command :plugin-manager.show
              :desc "Plugins: Show plugin manager"
              :exec (fn []
                      (tabs/add-or-focus! manager)
                      (cmd/exec! :plugin-manager.refresh))})


(defui url-input []
  [:input {:type "text" :placeholder "Github URL"}]
  :focus (fn []
           (ctx/in! :popup.input))
  :blur (fn []
          (ctx/out! :popup.input)))

(defn submit-url []
  (let [input (url-input)
        p (popup/popup! {:header "Submit a plugin."
                         :body [:div
                                [:p ""]
                                [:label "Github URL for plugin: "]
                                input
                                ]
                         :buttons [{:label "cancel"}
                                   {:label "submit"
                                    :action (fn []
                                              (object/raise manager :submit-plugin! (dom/val input)))}]})]
    (dom/focus input)
    (.setSelectionRange input 1000 1000)))

(cmd/command {:command :plugin-manager.submit
              :desc "Plugins: Submit a plugin"
              :exec (fn []
                      (submit-url)
                      )})

(cmd/command {:command :build
              :desc "Editor: build file or project"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (object/raise ed :build)))})


;;This call to tag-behaviors is necessary as there are no behaviors loaded when the
;;app is first run.
(object/tag-behaviors :app [::init-plugins ::plugin-behavior-diffs ::plugin-keymap-diffs])

