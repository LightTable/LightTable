(ns lt.objs.deploy
  (:require [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.files :as files]
            [lt.objs.popup :as popup]
            [lt.objs.notifos :as notifos]
            [lt.objs.platform :as platform]
            [lt.objs.settings :as settings]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.window :as window]
            [lt.util.js :refer [every]]
            [fetch.core :as fetch])
  (:require-macros [fetch.macros :refer [letrem]]
                   [lt.macros :refer [defui]]))

(def shell (js/require "shelljs"))
(def fs (js/require "fs"))
(def fs-path (js/require "path"))
(def zlib (js/require "zlib"))
(def request (js/require "request"))
(def tar (js/require "tar"))
(def cur-path (.pwd shell))
(def home-path (files/lt-home ""))

(defn exec-path []
  (.-execPath js/process))

(defn mac-resources-path [p]
  (.resolve fs-path (exec-path) (files/join "../../../../../Resources" p)))

(defn deploy-plugins []
  (let [plugins (if (= platform/platform :mac)
                  (mac-resources-path "plugins")
                  (files/join (files/parent (exec-path)) "plugins"))]
    (when (and (files/exists? plugins)
               (not (.-env.LTLOCAL js/process)))
      ;;copy that directory to lt-home
      (files/copy plugins (files/lt-home "plugins"))
      )))

(def version-regex #"^\d+\.\d+\.\d+(-.*)?$")

(defn up-to-date? []
  (and js/window.setup
       (.-upToDate js/window.setup)))

(defn in-lt [path]
  (str home-path "/" path))

(defn get-versions []
  (let [vstr (:content (if (up-to-date?)
                         (files/open-sync (in-lt "version.json"))
                         (files/open-sync "deploy/version.json")))]
    (js->clj (.parse js/JSON vstr) :keywordize-keys true)))

(def version-timeout (* 5 60 1000))
(def version (get-versions))

(defn tar-path [v]
  (if (settings/fetch :edge)
    (str "http://temp2.kodowa.com.s3.amazonaws.com/playground/releases/" v ".tar.gz")
    (str "https://d35ac8ww5dfjyg.cloudfront.net/playground/releases/" v ".tar.gz")))

(defn download-file [from to cb]
  (let [out (.createWriteStream fs to)]
    (.pipe (request from cb) out)))

(defn download-zip [ver cb]
  (let [n (notifos/working (str "Downloading version " ver " .."))]
    (download-file (tar-path ver) (str home-path "/tmp.tar.gz") (fn [e r body]
                                                               (notifos/done-working)
                                                               (cb e r body)))))

(defn untar [from to cb]
  (let [t (.createReadStream fs from)]
    (.. t
        (pipe (.createGunzip zlib))
        (pipe (.Extract tar (js-obj "path" to)))
        (on "end" cb))
    ))

(defn move-tmp []
  (files/move! (str home-path "/tmp/*") home-path)
  (.rm shell "-rf" (str home-path "/tmp*")))

(defn fetch-and-deploy [ver]
  (download-zip ver (fn []
                      (untar (str home-path "/tmp.tar.gz") (str home-path "/tmp")
                             (fn []
                               (move-tmp)
                               (popup/popup! {:header "Light Table has been updated!"
                                              :body (str "Light Table has been updated to " ver "! Just
                                                        restart to get the latest and greatest.")
                                              :buttons [{:label "ok"}]}))))))

(defn version-url []
  (if (settings/fetch :edge)
    "http://app.kodowa.com/latest-version/nw-edge"
    "http://app.kodowa.com/latest-version/nw"))

(defn check-version [& [notify?]]
  (when-not (settings/fetch :no-update)
    (fetch/xhr (version-url) {}
               (fn [data]
                 (when (re-seq version-regex data)
                   (if (and (not= data "")
                            (not= data (:version version))
                            (.compareVersions js/window.setup data (:version version))
                            (not= js/localStorage.fetchedVersion data))
                     (do
                       (set! js/localStorage.fetchedVersion data)
                       (set! version (assoc version :version data))
                       (fetch-and-deploy data))
                     (when notify?
                       (notifos/set-msg! (str "At latest version: " (:version version))))))))))

(defn deploy []
  (when-not (files/exists? home-path)
    (.mkdir shell home-path))
  (println "local: " js/process.env.LTLOCAL)
  (.cp shell "-rf" (if-not js/process.env.LTLOCAL
                       "deploy/*"
                       (do
                         (println "copying from LTLOCAL")
                         (str js/process.env.LTLOCAL "*")))
              home-path))

(defn binary-version []
  (aget js/process.versions "node-webkit"))

(defui button [label & [cb]]
       [:div.button.right label]
       :click (fn []
                (when cb
                  (cb))))

(defn alert-binary-update [on-yes]
  (popup/popup! {:header "There's been a binary update!"
                 :body "There's a new version of the Light Table binary. Clicking below will open the
                                 Light Table website so you can download the updated version."
                 :buttons [{:label "Download latest"
                            :action (fn []
                                      (.Shell.openExternal (js/require "nw.gui") "http://www.lighttable.com")
                                      (popup/remain-open)
                                      )}]}))

(defn check-setup-version [obj]
  (assoc obj :setup-version (and js/window.setup
                                 (= (:setup version "0.2.3") (.-version js/window.setup)))))

(defn check-nw-version [obj]
  (assoc obj :nw-version (.compareVersions js/window.setup
                                           (binary-version)
                                           (:nw version "0.3.6-pre"))))

(defn check-ltdir [obj]
  (assoc obj :ltdir (files/exists? home-path)))

(defn check-bootstrap [obj]
  ;;we check this in setup.js no point in doing the comparison again
  (assoc obj :bootstrap (up-to-date?)))

(defn check-plugins [obj]
  (assoc obj :plugins? (and (up-to-date?)
                            (files/exists? (files/lt-home "plugins/clojure")))))

(defn notify [obj]
  (let [{:keys [ltdir bootstrap nw-version setup-version plugins?]} obj]
    (cond
     (not setup-version) (alert-binary-update)
     (not nw-version) (alert-binary-update)
     (not ltdir) (deploy)
     (not bootstrap) (deploy)
     :else obj)
    (when-not plugins?
      (deploy-plugins))))

(defn check-all []
  (-> {}
      (check-setup-version)
      (check-nw-version)
      (check-ltdir)
      (check-bootstrap)
      (check-plugins)
      (notify)))

(object/behavior* ::check-deploy
                  :triggers #{:deploy}
                  :reaction (fn [this]
                              (check-all)))

(object/behavior* ::check-version
                  :triggers #{:init}
                  :reaction (fn [this]
                              (when (= (window/window-number) 0)
                                (set! js/localStorage.fetchedVersion nil))
                              (check-version)
                              (every version-timeout check-version)))

(object/tag-behaviors :app [::check-deploy ::check-version])

(cmd/command {:command :toggle-auto-update
              :desc "Settings: Toggle auto-update"
              :exec (fn []
                      (if-not (settings/fetch :no-update)
                        (do
                          (settings/store! :no-update true)
                          (notifos/set-msg! "disabled auto updating"))
                        (do
                          (settings/store! :no-update false)
                          (notifos/set-msg! "auto updating enabled"))))})

