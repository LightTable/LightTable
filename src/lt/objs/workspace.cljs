(ns lt.objs.workspace
  (:require [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.settings :as settings]
            [lt.objs.command :as cmd]
            [lt.objs.window :as window]
            [cljs.reader :as reader]
            [lt.util.load :as load]
            [lt.util.js :refer [now]]
            [lt.util.cljs :refer [->dottedkw]]))

;;*********************************************************
;; Watching
;;*********************************************************

(def watchr (load/node-module "watchr"))

(defn stop-watching [ws]
  (doseq [w (::watch @ws)
          :when w]
    (.close w))
  (object/merge! ws {::watch nil}))

(defn watch-workspace [ws]
  (stop-watching ws)
  (object/merge! ws {::watch
                     (.watch watchr (js-obj "paths" (apply array (concat (:files @ws) (:folders @ws)))
                                            "interval" 1000
                                            "preferredMethods" (array "watchFile" "watch")
                                            "duplicateDelay" 30
                                            "ignoreCustomPatterns" files/ignore-pattern
                                            "listener" (fn [type path stat ostat]
                                                         (object/raise current-ws (->dottedkw :watched type) path stat)
                                                         )
                                            "next" (fn [e w]
                                                     (when e
                                                       (.error js/console e)))))}))

(object/behavior* ::stop-watch-on-blur
                  :triggers #{:blur}
                  :reaction (fn [window]
                              ;(stop-watching current-ws)
                              ))

(object/behavior* ::watch-workspace
                  :triggers #{:focus}
                  :reaction (fn [window]
                              ;(watch-workspace current-ws)
                              ))

(object/tag-behaviors :window [::stop-watch-on-blur ::watch-workspace])

;;*********************************************************
;; Files and folders
;;*********************************************************

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

(defn open [ws file]
  (let [loc (if-not (> (.indexOf file files/separator) -1)
              (files/lt-home (files/join "core" "cache" "workspace" file))
              file)]
    (object/merge! ws {:file (new-cached-file)})
    (try
      (reconstitute ws (file->ws loc))
      (save ws (:file @ws))
      (files/delete! loc)
      (catch js/Error e
        ))))

(defn save [ws file]
  (files/save (files/lt-home (files/join "core" "cache" "workspace" file)) (pr-str (serialize @ws)))
  (object/raise ws :save))

(defn cached []
  (filter #(> (.indexOf % ".clj") -1) (files/full-path-ls (files/lt-home (files/join "core" "cache" "workspace")))))

(defn file->ws [file]
  (-> (files/open-sync file)
      (:content)
      (reader/read-string)
      (assoc :path file)))

(defn all []
  (let [fs (sort > (cached))]
    (println fs)
    ;;if there are more than 20, delete the extras
    (doseq [file (drop 20 fs)]
      (files/delete! file))
    (map file->ws (take 20 fs))))

(defn ws-empty? [ws]
  (not (or (seq (:files @ws))
           (seq (:folders @ws)))))

(object/behavior* ::store-on-save
                  :triggers #{:save}
                  :reaction (fn [this]
                              (settings/store! :last-workspace (:file @this))))

(object/behavior* ::serialize-workspace
                  :triggers #{:updated}
                  :reaction (fn [this]
                              (when-not (@this :file)
                                (object/merge! this {:file (new-cached-file)}))
                              (when (and (@this :initialized?)
                                         (not (ws-empty? this)))
                                (save this (:file @this)))))

(object/behavior* ::reconstitute-last-workspace
                  :triggers #{:post-init}
                  :reaction (fn [app]
                              (when (and (= (window/window-number) 0)
                                         (not (:initialized @current-ws)))
                                (if (settings/fetch :last-workspace)
                                  (open current-ws (settings/fetch :last-workspace))
                                  (reconstitute current-ws (settings/fetch :workspace)))) ;;for backwards compat
                              (object/merge! current-ws {:initialized? true})))

(object/behavior* ::new!
                  :triggers #{:new!}
                  :reaction (fn [this]
                              (object/merge! this {:file (new-cached-file)})
                              (object/raise this :clear!)))

(object/behavior* ::store-last-workspace
                  :triggers #{:close}
                  :reaction (fn [app]
                              (when-not (ws-empty? current-ws)
                                (settings/store! :last-workspace (:file @current-ws)))))

(object/behavior* ::add-file!
                  :triggers #{:add.file!}
                  :reaction (fn [this f]
                              (add! this :files f)
                              (object/raise this :add f)
                              (object/raise this :updated)))

(object/behavior* ::add-folder!
                  :triggers #{:add.folder!}
                  :reaction (fn [this f]
                              (add! this :folders f)
                              (object/raise this :add f)
                              (object/raise this :updated)))

(object/behavior* ::remove-file!
                  :triggers #{:remove.file!}
                  :reaction (fn [this f]
                              (remove! this :files f)
                              (object/raise this :remove f)
                              (object/raise this :updated)))

(object/behavior* ::remove-folder!
                  :triggers #{:remove.folder!}
                  :reaction (fn [this f]
                              (remove! this :folders f)
                              (object/raise this :remove f)
                              (object/raise this :updated)))

(object/behavior* ::rename!
                  :triggers #{:rename!}
                  :reaction (fn [this f neue]
                              (let [key (if (files/file? f)
                                          :files
                                          :folders)]
                                (remove! this key f)
                                (add! this key neue)
                                (object/raise this :rename f neue)
                                (object/raise this :updated))))

(object/behavior* ::clear!
                  :triggers #{:clear!}
                  :reaction (fn [this]
                              (let [old @this]
                                (object/merge! this {:files []
                                                     :folders []
                                                     :ws-behaviors {:+ {} :- {}}})
                                (object/raise this :set old)
                                (object/raise this :updated))))

(object/behavior* ::set!
                  :triggers #{:set!}
                  :reaction (fn [this fs]
                              (let [old @this]
                                (object/merge! this fs)
                                (object/raise this :set old)
                                (object/raise this :updated))))

(object/behavior* ::watch-on-set
                  :triggers #{:updated}
                  :reaction (fn [this]
                              ;(watch-workspace this)
                              ))

(object/behavior* ::stop-watch-on-close
                  :triggers #{:close :refresh}
                  :reaction (fn [app]
                              (stop-watching current-ws)))

(object/object* ::workspace
                :tags #{:workspace}
                :files []
                :folders []
                :ws-behaviors {:+ {}
                               :- {}}
                :init (fn [this]
                        nil))

(def current-ws (object/create ::workspace))

(cmd/command {:command :workspace.new
              :desc "Workspace: Create new workspace"
              :exec (fn []
                      (object/raise current-ws :new!)
                      )})
