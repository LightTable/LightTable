(ns lt.objs.intro
  "Provide intro panel for introducing LT to new users"
  (:require [lt.object :as object]
            [lt.objs.style :as style]
            [lt.objs.deploy :as deploy]
            [lt.objs.cli :as cli]
            [lt.objs.command :as cmd]
            [lt.objs.app :as app]
            [lt.objs.tabs :as tabs]
            [lt.util.dom :as dom]
            [singultus.core :refer [raw]]
            [singultus.binding :refer [bound]])
  (:require-macros [lt.macros :refer [behavior defui]]))

(behavior ::on-close-destroy
                  :triggers #{:close}
                  :reaction (fn [this]
                              (object/raise this :destroy)))

(def ->lt-image (constantly "img/lighttabletextdark.png"))

(defui docs []
  [:button "Light Table's online docs"]
  :click (fn []
           (cmd/exec! :show-docs)))

(defui reports []
  [:button "GitHub"]
  :click (fn []
           (cmd/exec! :add-browser-tab "https://github.com/LightTable/LightTable/issues?state=open")))


(defui changelog []
  [:button "changelog"]
  :click (fn []
           (cmd/exec! :version)))

(object/object* ::intro
                :tags #{:intro}
                :behaviors [::on-close-destroy]
                :name "Welcome"
                :init (fn [this]
                        [:div#intro
                         [:h1
                          [:img {:height 40 :src (bound style/styles ->lt-image)}]]
                         [:p "Welcome to the latest version of Light Table. To see the full list of what's been added/changed, checkout the " (changelog) ".
                          Some of the highlights include deeper Javascript support, inline browsers, and Python eval! If you're new, you might want to take a look at " (docs) " to get started."]
                         [:p "If you run into any problems, report the issue on " (reports) "!"]
                         ]))

(behavior ::show-intro
          :triggers #{:post-init}
          :type :user
          :exclusive [::show-new-file]
          :desc "App: Open the welcome screen when Light Table starts"
          :reaction (fn [this]
                      (when-not (cli/args)
                        (let [intro (object/create ::intro)]
                          (dom/focus (dom/$ :body))
                          (tabs/add! intro)
                          (tabs/active! intro)))))

(behavior ::show-new-file
          :triggers #{:post-init}
          :type :user
          :exclusive [::show-intro]
          :desc "App: Open a new file when Light Table starts"
          :reaction (fn [this]
                      (when-not (cli/args)
                        (cmd/exec! :new-file))))
