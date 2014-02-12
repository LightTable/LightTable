(ns lt.objs.deploy
  (:require [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.files :as files]
            [lt.objs.popup :as popup]
            [lt.objs.cache :as cache]
            [lt.objs.notifos :as notifos]
            [lt.objs.platform :as platform]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.app :as app]
            [lt.util.load :as load]
            [lt.util.js :refer [every]]
            [lt.util.cljs :refer [str-contains?]]
            [clojure.string :as string]
            [fetch.core :as fetch])
  (:require-macros [fetch.macros :refer [letrem]]
                   [lt.macros :refer [behavior defui]]))

(def shell (load/node-module "shelljs"))
(def fs (js/require "fs"))
(def fs-path (js/require "path"))
(def zlib (js/require "zlib"))
(def request (load/node-module "request"))
(def tar (load/node-module "tar"))
(def home-path (files/lt-home ""))
(def get-proxy (.-App.getProxyForURL (js/require "nw.gui")))

(def version-regex #"^\d+\.\d+\.\d+(-.*)?$")

(defn get-versions []
  (let [vstr (:content (files/open-sync (files/lt-home "core/version.json")))]
    (js->clj (.parse js/JSON vstr) :keywordize-keys true)))

(defn proxy? []
  (let [p (get-proxy (tar-path "0.5.0"))]
    (when (str-contains? p "PROXY")
      (-> p
          (string/split " ")
          (second)))))

(def version-timeout (* 5 60 1000))
(def version (get-versions))

(defn str->version [s]
  (let [[major minor patch] (string/split s ".")]
    {:major (js/parseInt major)
     :minor (js/parseInt minor)
     :patch (js/parseInt patch)}))

(defn compare-versions [v1 v2]
  (if (= v1 v2)
    false
    (not (or (< (:major v2) (:major v1))
             (and (= (:major v2) (:major v1))
                  (< (:minor v2) (:minor v1)))
             (and (= (:major v2) (:major v1))
                  (= (:minor v2) (:minor v1))
                  (< (:patch v2) (:patch v1)))))))

(defn is-newer? [v1 v2]
  (compare-versions (str->version v1) (str->version v2)))

(defn exec-path []
  (.-execPath js/process))

(defn mac-resources-path [p]
  (.resolve fs-path (exec-path) (files/join "../../../../../Resources" p)))

(defn tar-path [v]
  (if (cache/fetch :edge)
    (str "http://temp2.kodowa.com.s3.amazonaws.com/playground/releases/" v ".tar.gz")
    (str "https://d35ac8ww5dfjyg.cloudfront.net/playground/releases/" v ".tar.gz")))

(defn download-file [from to cb]
  (let [options (js-obj "url" from
                        "headers" (js-obj "User-Agent" "Light Table"))
        out (.createWriteStream fs to)]
    (.pipe (request options cb) out)))

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
        (on "end" cb))))

(defn move-tmp []
  (doseq [file (files/full-path-ls (str home-path "/tmp/"))]
    (.cp shell "-rf" file home-path))
  (.rm shell "-rf" (str home-path "/tmp*")))

(defn fetch-and-deploy [ver]
  (download-zip ver (fn []
                      (notifos/working "Extracting update...")
                      (untar (str home-path "/tmp.tar.gz") (str home-path "/tmp")
                             (fn []
                               (move-tmp)
                               (notifos/done-working)
                               (popup/popup! {:header "Light Table has been updated!"
                                              :body (str "Light Table has been updated to " ver "! Just
                                                        restart to get the latest and greatest.")
                                              :buttons [{:label "ok"}]}))))))

(defn version-url []
  (if (cache/fetch :edge)
    "http://app.kodowa.com/latest-version/nw-edge"
    "http://app.kodowa.com/latest-version/nw"))

(defn should-update-popup [data]
  (popup/popup! {:header "There's a newer version of Light Table!"
                 :body (str "Would you like us to download and install version " data "?")
                 :buttons [{:label "Cancel"}
                           {:label "Download and install"
                            :action (fn []
                                      (fetch-and-deploy data))}]}))

(defn check-version [& [notify?]]
  (fetch/xhr (version-url) {}
             (fn [data]
               (when (re-seq version-regex data)
                 (if (and (not= data "")
                          (not= data (:version version))
                          (is-newer? (:version version) data)
                          (or notify?
                              (not= js/localStorage.fetchedVersion data)))
                   (do
                     (set! js/localStorage.fetchedVersion data)
                     (set! version (assoc version :version data))
                     (should-update-popup data))
                   (when notify?
                     (notifos/set-msg! (str "At latest version: " (:version version)))))))))

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

(defn check-nw-version [obj]
  (assoc obj :nw-version (is-newer? (binary-version) (:nw version))))

(defn notify [obj]
  (let [{:keys [nw-version]} obj]
    (cond
     nw-version (alert-binary-update)
     :else obj)))

(defn check-all []
  (-> {}
      (check-nw-version)
      (notify)))

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::check-deploy
                  :triggers #{:deploy}
                  :reaction (fn [this]
                              (check-all)))

(behavior ::check-version
                  :triggers #{:init}
                  :type :user
                  :desc "App: Automatically check for updates"
                  :reaction (fn [this]
                              (when-let [proxy (proxy?)]
                                (.defaults request (clj->js {:proxy proxy})))
                              (when (= (app/window-number) 0)
                                (set! js/localStorage.fetchedVersion nil))
                              (check-version)
                              (every version-timeout check-version)))

(object/tag-behaviors :app [::check-deploy])
