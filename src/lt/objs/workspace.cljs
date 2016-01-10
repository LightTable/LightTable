(ns lt.objs.workspace
  "Provide workspace object and associated behaviors"
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd]
            [lt.objs.cache :as cache]
            [lt.objs.notifos :as notifos]
            [lt.objs.console :as console]
            [cljs.reader :as reader]
            [lt.util.load :as load]
            [lt.util.js :refer [now]]
            [lt.util.cljs :refer [->dottedkw]])
  (:require-macros [lt.macros :refer [behavior]]))

;;*********************************************************
;; Watching
;; TODO: The way I did this is awful. Should get cleaned up
;;*********************************************************

(def fs (js/require "fs"))
(def max-depth 10)
(def watch-interval 1000)

(object/object* ::workspace
                :tags #{:workspace}
                :files []
                :folders []
                :watches {}
                :ws-behaviors ""
                :init (fn [this]
                        nil))

(def current-ws (object/create ::workspace))

(defn unwatch [watches path recursive?]
  (when watches
    (let [removes (cond
                    (coll? path) path
                    (not recursive?) [path]
                    :else (filter #(> (.indexOf % path) -1) (keys watches)))]
      (doseq [r (map watches removes)
              :when (and r (:close r))]
        ((:close r)))
      (apply dissoc watches removes))))

(defn unwatch!
  ([path] (unwatch! path false))
  ([path recursive?]
   (object/merge! current-ws {:watches (unwatch (:watches @current-ws) path recursive?)})))

(defn alert-file [path]
  (fn [cur prev]
    (if (.existsSync fs path)
      (do
        (object/raise current-ws :watched.update path cur))
      (do
        (unwatch! path)
        (object/raise current-ws :watched.delete path)))))

(defn file->watch [path]
  (let [alert (alert-file path)]
    {:path path
     :alert alert
     :close (fn []
              (.unwatchFile fs path alert))}))

(declare folder->watch)

(defn watch!
  ([path] (watch! (transient {}) path nil))
  ([path recursive?] (watch! (transient {}) path recursive?))
  ([results path recursive?]
   (doseq [path (if (coll? path)
                  path
                  [path])]
     (when-not (re-seq files/ignore-pattern path)
       (if (files/dir? path)
         (let [recursive? (cond
                           (not recursive?) 0
                           (number? recursive?) (dec recursive?)
                           :else max-depth)
               watch (folder->watch path)]
           (when-not (get (:watches @current-ws) path)
             (assoc! results path watch)
             (.watchFile fs path (js-obj "interval" watch-interval
                                         "persistent" false)
                         (:alert watch)))
           (when (> recursive? -1)
             (watch! results (files/full-path-ls path) recursive?)))
         (when (and (not (get (:watches @current-ws) path))
                    (not (get results path)))
           (let [watch (file->watch path)]
             (assoc! results path watch)
             (.watchFile fs path (js-obj "interval" watch-interval
                                         "persistent" false)
                         (:alert watch)))))))
     (when-not (number? recursive?)
       (object/update! current-ws [:watches] merge (persistent! results)))))

(defn alert-folder [path]
  (fn [cur prev]
    (if (.existsSync fs path)
      (do
        (let [watches (:watches @current-ws)
              neue (first (filter #(and (not (get watches %))
                                        (not (re-seq files/ignore-pattern %)))
                                  (files/full-path-ls path)))]
          (when neue
            (watch! neue)
            (object/raise current-ws :watched.create neue (.statSync fs neue)))))
      (do
        (unwatch! path :recursive)
        (object/raise current-ws :watched.delete path)))))

(defn folder->watch [path]
  (let [alert (alert-folder path)]
     {:path path
      :alert alert
      :close (fn []
              (.unwatchFile fs path alert))}))

(defn stop-watching [ws]
  (unwatch! (keys (:watches @ws))))

(defn watch-workspace [ws]
  (stop-watching ws)
  (watch! (object/raise-reduce ws :watch-paths+ [])))

;;*********************************************************
;; Files and folders
;;*********************************************************

(def workspace-cache-path (files/join cache/cache-path "workspace"))

(defn files-and-folders [path]
  (reduce (fn [res cur]
            (let [dir? (files/dir? cur)]
              (if (re-seq files/ignore-pattern (str (files/basename cur) (when dir? files/separator)))
                res
                (if dir?
                  (update-in res [:folders] conj cur)
                  (update-in res [:files] conj cur)))))
          {:folders []
           :files []}
          (files/full-path-ls path)))

(defn serialize [ws]
  (select-keys ws [:files :folders :ws-behaviors]))

(defn reconstitute [ws v]
  (object/raise ws :set! {:files (:files v)
                          :folders (filter files/exists? (:folders v))
                          :ws-behaviors (:ws-behaviors v)}))

(defn add! [ws k v]
  (object/update! ws [k] conj v))

(defn remove! [ws k v]
  (object/update! ws [k] #(vec (remove #{v} %))))

(defn new-cached-file []
  (str (now) ".clj"))

(defn file->ws [file]
  (-> (files/open-sync file)
      (:content)
      (reader/read-string)
      (assoc :path file)))

(defn save [ws file]
  (files/save (files/join workspace-cache-path file) (pr-str (serialize @ws)))
  (object/raise ws :save))

(defn open [ws file]
  (let [loc (if-not (> (.indexOf file files/separator) -1)
              (files/join workspace-cache-path file)
              file)]
    (object/merge! ws {:file (new-cached-file)})
    (try
      (reconstitute ws (file->ws loc))
      (save ws (:file @ws))
      (files/delete! loc)
      (catch :default e
        (console/error e)))))

(defn cached []
  (filter #(> (.indexOf % ".clj") -1) (files/full-path-ls workspace-cache-path)))

(defn all []
  (let [fs (sort > (cached))]
    ;;if there are more than 20, delete the extras
    (doseq [file (drop 20 fs)]
      (files/delete! file))
    (map file->ws (take 20 fs))))

(defn ws-empty? [ws]
  (not (or (seq (:files @ws))
           (seq (:folders @ws)))))

(behavior ::serialize-workspace
          :triggers #{:updated :serialize!}
          :reaction (fn [this]
                      (when-not (@this :file)
                        (object/merge! this {:file (new-cached-file)}))
                      (when (and (@this :initialized?)
                                 (not (ws-empty? this)))
                        (save this (:file @this)))))

(behavior ::reconstitute-last-workspace
          :triggers #{:post-init}
          :reaction (fn [app]
                      (when (and (app/first-window?)
                                 (not (:initialized @current-ws)))
                        (when-let [ws (first (all))]
                          (open current-ws (-> ws :path (files/basename))))) ;;for backwards compat
                      (object/merge! current-ws {:initialized? true})))

(behavior ::new!
          :triggers #{:new!}
          :reaction (fn [this]
                      (object/merge! this {:file (new-cached-file)})
                      (object/raise this :clear!)))

(behavior ::add-file!
          :triggers #{:add.file!}
          :reaction (fn [this f]
                      (if-not (contains? (set (:files @this)) f)
                        (do
                          (add! this :files f)
                          (object/raise this :add f)
                          (object/raise this :updated))
                        (notifos/set-msg! "This file is already in your workspace." {:class "error"}))))

(behavior ::add-folder!
          :triggers #{:add.folder!}
          :reaction (fn [this f]
                      (if-not (contains? (set (:folders @this)) f)
                        (do
                          (add! this :folders f)
                          (object/raise this :add f)
                          (object/raise this :updated))
                        (notifos/set-msg! "This folder is already in your workspace." {:class "error"}))))

(behavior ::remove-file!
          :triggers #{:remove.file!}
          :reaction (fn [this f]
                      (remove! this :files f)
                      (object/raise this :remove f)
                      (object/raise this :updated)))

(behavior ::remove-folder!
          :triggers #{:remove.folder!}
          :reaction (fn [this f]
                      (remove! this :folders f)
                      (object/raise this :remove f)
                      (object/raise this :updated)))

(behavior ::rename!
          :triggers #{:rename!}
          :reaction (fn [this f neue]
                      (let [key (if (files/file? f)
                                  :files
                                  :folders)]
                        (remove! this key f)
                        (add! this key neue)
                        (object/raise this :rename f neue)
                        (object/raise this :updated))))

(behavior ::clear!
          :triggers #{:clear!}
          :reaction (fn [this]
                      (let [old @this]
                        (object/merge! this {:files []
                                             :folders []
                                             :ws-behaviors ""})
                        (object/raise this :set old)
                        (object/raise this :updated))))

(behavior ::set!
          :triggers #{:set!}
          :reaction (fn [this fs]
                      (let [old @this]
                        (object/merge! this fs)
                        (object/raise this :set old)
                        (object/raise this :updated))))

(behavior ::watch-on-set
          :triggers #{:set}
          :reaction (fn [this]
                      (watch-workspace this)))

(behavior ::stop-watch-on-close
          :triggers #{:close :refresh}
          :reaction (fn [app]
                      (stop-watching current-ws)))

(behavior ::init-workspace-cache-dir
          :triggers #{:init}
          :reaction (fn [app]
                      (when-not (files/exists? workspace-cache-path)
                        (files/mkdir workspace-cache-path))))

(cmd/command {:command :workspace.new
              :desc "Workspace: Create new workspace"
              :exec (fn []
                      (object/raise current-ws :new!)
                      )})
