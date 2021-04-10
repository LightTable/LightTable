(ns lt.objs.deploy
  "Provide behaviors to check for app updates and fns for downloading
  and unpacking downloaded assets"
  (:require [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.files :as files]
            [lt.objs.popup :as popup]
            [lt.objs.cache :as cache]
            [lt.objs.notifos :as notifos]
            [lt.objs.platform :as platform]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.console :as console]
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
(def zlib (js/require "zlib"))
(def request (load/node-module "request"))
(def tar (load/node-module "tar"))
(def home-path (files/lt-home ""))
;; TODO: get-proxy
;; (def get-proxy (.-App.getProxyForURL (js/require "nw.gui")))
(def get-proxy)
(def request-strict-ssl true)

(defn tar-path [v]
  (if (cache/fetch :edge)
    (str "https://api.github.com/repos/LightTable/LightTable/tarball/master")
    (str "https://api.github.com/repos/LightTable/LightTable/tarball/" v)))

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

(def version-timeout (* 60 60 1000))
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

(defn is-newer?
  "Returns true if second version is newer/greater than first version."
  [v1 v2]
  (compare-versions (str->version v1) (str->version v2)))

(defn download-file [from to cb]
  (let [options (js-obj "url" from
                        "headers" (js-obj "User-Agent" "Light Table")
                        "strictSSL" request-strict-ssl)
        out (.createWriteStream fs to)]
    (when-let [proxy (or js/process.env.http_proxy js/process.env.https_proxy)]
      (set! (.-proxy options) proxy))

    (-> (.get request options cb)
        (.on "response" (fn [resp]
                          (when-not (= (.-statusCode resp) 200)
                            (notifos/done-working)
                            (throw (js/Error. (str "Error downloading: " from " status code: " (.-statusCode resp)))))))
        (.pipe out))))

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
  (let [parent-dir (first (files/full-path-ls (str home-path "/tmp/")))]
    (doseq [file (files/full-path-ls (str parent-dir "/deploy/"))]
      (.cp shell "-rf" file home-path)))
  (.rm shell "-rf" (str home-path "/tmp*")))

(defn fetch-and-deploy [ver]
  (download-zip ver (fn []
                      (notifos/working "Extracting update...")
                      (untar (str home-path "/tmp.tar.gz") (str home-path "/tmp")
                             (fn []
                               (move-tmp)
                               (notifos/done-working)
                               (set! version (assoc version :version ver))
                               (popup/popup! {:header "Light Table has been updated!"
                                              :body (str "Light Table has been updated to " ver "! Just
                                                         restart to get the latest and greatest.")
                                              :buttons [{:label "ok"}]}))))))

(def tags-url "https://api.github.com/repos/LightTable/LightTable/tags")

(defn should-update-popup [data]
  (popup/popup! {:header "There's a newer version of Light Table!"
                 :body (str "Would you like us to download and install version " data "?")
                 :buttons [{:label "Cancel"}
                           {:label "Download and install"
                            :action (fn []
                                      (fetch-and-deploy data))}]}))

(defn ->latest-version
  "Returns latest LT version for github api tags endpoint."
  [body]
  (when-let [parsed-body
             (try (js/JSON.parse body)
               (catch :default e
                 (console/error (str "Invalid JSON response from " tags-url ": " (pr-str body)))))]
    (->> parsed-body
         ;; Ensure only version tags
         (keep #(when (re-find version-regex (.-name %)) (.-name %)))
         sort
         last)))

(defn check-version [& [notify?]]
  (fetch/xhr tags-url {}
             (fn [data]
               (let [latest-version (->latest-version data)]
                 (when (re-find version-regex latest-version)
                   (if (and (not= latest-version "")
                            (not= latest-version (:version version))
                            (is-newer? (:version version) latest-version)
                            (or notify?
                                (not= js/localStorage.fetchedVersion latest-version)))
                     (do
                       (set! js/localStorage.fetchedVersion latest-version)
                       (should-update-popup latest-version))
                     (when notify?
                       (notifos/set-msg! (str "At latest version: " (:version version))))))))))

(defn binary-version
  "Binary/electron version. The two versions are in sync since binaries updates
  only occur with electron updates."
  []
  (aget js/process.versions "electron"))

(defui button [label & [cb]]
       [:div.button.right label]
       :click (fn []
                (when cb
                  (cb))))

(defn alert-binary-update []
  (popup/popup! {:header "There's been a binary update!"
                 :body "There's a new version of the Light Table binary. Clicking below will open the
                                 Light Table website so you can download the updated version."
                 :buttons [{:label "Download latest"
                            :action (fn []
                                      (platform/open-url "http://www.lighttable.com")
                                      (popup/remain-open))}]}))

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::check-deploy
          :triggers #{:deploy}
          :reaction (fn [this]
                      ;; Latest :electron version changes after LT auto-updates and user restarts
                      (when (is-newer? (binary-version) (:electron version))
                        (alert-binary-update))))

(behavior ::check-version
          :triggers #{:init}
          :type :user
          :desc "App: Automatically check for updates"
          :reaction (fn [this]
                      ;;                               (when-let [proxy (proxy?)]
                      ;;                                 (.defaults request (clj->js {:proxy proxy})))
                      (when (app/first-window?)
                        (set! js/localStorage.fetchedVersion nil))
                      (check-version)
                      (every version-timeout check-version)))

(behavior ::strict-ssl
          :triggers #{:object.instant}
          :type :user
          :exclusive [::disable-strict-ssl]
          :desc "Enables strict SSL certificate checking when downloading LT and LT plugin repos (default setting)"
          :reaction (fn [this]
                      (set! request-strict-ssl true)))

(behavior ::disable-strict-ssl
          :triggers #{:object.instant}
          :type :user
          :exclusive [::strict-ssl]
          :desc "Disables strict SSL certificate checking when downloading LT and LT plugin repos"
          :details "In some enterprise environments with SSL proxies strict certificate checking will fail due to MITM certificates used for monitoring SSL traffic. This option allows these network requests to succeed in such environments."
          :reaction (fn [this]
                      (set! request-strict-ssl false)))

(object/tag-behaviors :app [::check-deploy])
