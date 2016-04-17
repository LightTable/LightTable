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
; Update the comment for the following to describe the full situation:
(def original-fs (js/require "original-fs")) ;; Required per [fs - reading asar files fails · Issue #1658 · atom/electron](https://github.com/atom/electron/issues/1658)
(def zlib (js/require "zlib"))
(def request (load/node-module "request"))
(def tar (load/node-module "tar-fs"))
(def zip (load/node-module "node-stream-zip"))
(def home-path (files/lt-home ""))
;; TODO: get-proxy
;; (def get-proxy (.-App.getProxyForURL (js/require "nw.gui")))
(def get-proxy)

; TODO: Cleanup platform name code

; TODO: Rename to release-file-extension
(def tar-extension (if (platform/win?) ".zip" ".tar.gz"))

(defn get-release-download-url
  "Retrieve the download URL for the specified release version and this computer's platform."
  [v cb]
  (let [release-info-url (str "https://api.github.com/repos/LightTable/LightTable/releases/tags/"
                              v)]
    (fetch/xhr release-info-url
               {}
               (fn [data]
                 (let [parsed-data (js/JSON.parse data)
                       assets (.-assets parsed-data)
                       platform-name (name platform/platform)
                       platform-asset-name (str "lighttable-" v "-" platform-name tar-extension)
                       platform-asset (first (filter #(= (.-name %) platform-asset-name)
                                                     assets))
                       download-url (.-browser_download_url platform-asset)
                       ]
                   (cb download-url)
                   )))))

;(get-release-download-url "0.8.1" (fn [u] (console/log u)))

(defn tar-path [v cb]
  (if (cache/fetch :edge)
    (cb (str "https://api.github.com/repos/LightTable/LightTable/tarball/master")) ; TODO: Fix to use CI build artifact.
    (get-release-download-url v cb)))

;(tar-path "0.8.1" (fn [url] (console/log url)))

;

(def version-regex #"^\d+\.\d+\.\d+(-.*)?$")

(defn get-versions []
  (let [vstr (:content (files/open-sync (files/lt-home "core/version.json")))]
    (js->clj (.parse js/JSON vstr) :keywordize-keys true)))

;; (defn proxy? []
;;   (let [p (get-proxy (tar-path "0.5.0"))]
;;     (when (str-contains? p "PROXY")
;;       (-> p
;;           (string/split " ")
;;           (second)))))

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
                        "headers" (js-obj "User-Agent" "Light Table"))
        out (.createWriteStream fs to)]
    (when-let [proxy (or js/process.env.http_proxy js/process.env.https_proxy)]
      (set! (.-proxy options) proxy))

    (-> (.get request options cb)
        (.on "response" (fn [resp]
                          (when-not (= (.-statusCode resp) 200)
                            (notifos/done-working)
                            (throw (js/Error. (str "Error downloading: " from " status code: " (.-statusCode resp)))))))
        (.pipe out))))

(def temp-download-tar-path (str home-path "/tmp" tar-extension))

; TODO: Rename to `download-release-file`?
(defn download-zip [ver cb]
  (let [n (notifos/working (str "Downloading version " ver " .."))]
    (tar-path ver
              (fn [url]
                (console/log url)
                (download-file url
                               temp-download-tar-path
                               (fn [e r body]
                                 (notifos/done-working)
                                 (cb e r body)))))))

;(download-zip "0.8.1" (fn [e r body] nil))

(defn untar [from to cb]
  (let [t (.createReadStream fs from)]
    (.. t
        (pipe (.createGunzip zlib))
        (pipe (.extract tar to (js-obj "fs" original-fs)))
        (on "finish" cb))))

(comment
(untar temp-download-tar-path
       (str home-path "/tmp")
       (fn [] (console/log "Called-back!")))
)

; TODO: Support Linux
(defn release-file-sub-dir
  [v]
  (str "lighttable-"
       v
       "-"
       (name platform/platform)
       (case platform/platform
         :windows "/resources"
         :mac "/LightTable.app/Contents/Resources"
         :linux "/resources") ; TODO: Finish
       "/app/"))

;(release-file-sub-dir "0.8.1")


(defn unzip [from to v cb]
  (let [z (zip. (js-obj "file" from "storeEntries" true))]
    (aset js/process "noAsar" true)
    (if (not (files/exists? to)) (files/mkdir to))
    (.on z "ready" (fn []
                     (.extract z
                               (release-file-sub-dir v)
                               to
                               (fn [error count-]
                                 (.log js/console error)
                                 (console/log (str "Zip file entries extracted: " count-))
                                 (cb)))) )))

; This didn't work initially because of the *lighttable-0.8.1-windows\resources\atom.asar* file but now it works because only the *lighttable-version-platform/resources/app* sub-directory is extracted:
;(unzip temp-download-tar-path (str home-path "/tmp") "0.8.1" (fn [] (console/log "Called-back!")))


(defn move-tmp-tar
  [v]
  (let [parent-dir (str home-path "/tmp/" (release-file-sub-dir v))]
    (doseq [file (files/full-path-ls parent-dir)]
      (.cp shell "-rf" file home-path)))
  (.rm shell "-rf" (str home-path "/tmp*"))
;;       (.rm shell "-rf" (str home-path "/tmp"))
;;       (.rm shell "-f" temp-download-tar-path)
  )

;; (let [parent-dir home-path]
;;   (files/full-path-ls parent-dir))

;; (let [parent-dir (str home-path "/tmp/" (release-file-sub-dir "0.8.1"))]
;;   (files/full-path-ls parent-dir))

; This worked:
;; (.cp shell "-rf" "/Users/kenny/@code/LightTable/builds/lighttable-0.8.1-mac/LightTable.app/Contents/Resources/app/tmp/lighttable-0.8.1-mac/LightTable.app/Contents/resources/app/text.txt" home-path)

; This hung LT when I was manually eval-ing all of the new code but worked with a clean source build:
;; (.cp shell "-rf" "/Users/kenny/@code/LightTable/builds/lighttable-0.8.1-mac/LightTable.app/Contents/Resources/app/tmp/lighttable-0.8.1-mac/LightTable.app/Contents/resources/app/core" home-path)

; This worked:
;; (.rm shell "-rf" (str home-path "/text.txt"))

; This hung LT at first but worked when I commented out the `rm` call and then with the explicit `rm` calls and then it kinda worked as originally written when I swapped the 'fs' required library (but it didn't delete the temp directory or file):
;; (move-tmp-tar "0.8.1")

; This doesn't work:
;; (.rm shell "-rf" (str home-path "/tmp"))

; This doesn't work either:
;; (.rm shell "-rf" (str home-path "/tmp/*"))

;; (.existsSync fs (str home-path "/tmp"))                   ; => true
;; (.rm shell "-r" (str home-path "/tmp"))                   ; Does nothing
;; (.log js/console (.statSync fs (str home-path "/tmp")))
;; (.isFile (.statSync fs (str home-path "/tmp")))           ; => false
;; (.isDirectory (.statSync fs (str home-path "/tmp")))      ; => true


(defn move-tmp-zip []
  (let [parent-dir (str home-path "/tmp/")]
    (doseq [file (files/full-path-ls parent-dir)]
      (.cp shell "-rf" file home-path)))
  (.rm shell "-rf" (str home-path "/tmp*")))

;(move-tmp-zip)


;home-path
;; (files/full-path-ls (str home-path "/tmp/"))

(defn fetch-and-deploy [ver]
  (download-zip ver (fn []
                      (notifos/working "Extracting update...")
                      (let [base-cb (fn []
                                 (notifos/done-working)
                                 (set! version (assoc version :version ver))
                                 (popup/popup! {:header "Light Table has been updated!"
                                                :body (str "Light Table has been updated to " ver "! Just
                                                           restart to get the latest and greatest.")
                                                :buttons [{:label "ok"}]}))]
                        (if (platform/win?)
                              (unzip temp-download-tar-path
                                     (str home-path "/tmp")
                                     ver
                                     (fn []
                                       (move-tmp-zip)
                                       (base-cb)))
                              (untar temp-download-tar-path
                                     (str home-path "/tmp")
                                     (fn []
                                       (move-tmp-tar ver)
                                       (base-cb))))))))

;; (fetch-and-deploy "0.8.1")

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

(object/tag-behaviors :app [::check-deploy])
