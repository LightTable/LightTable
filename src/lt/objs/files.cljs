(ns lt.objs.files
  (:refer-clojure :exclude [open exists?])
  (:require [lt.object :as object]
            [lt.util.load :as load]
            [lt.util.js :refer [now]]))

(def fs (js/require "fs"))
(def fpath (js/require "path"))
(def wrench (load/node-module "wrench"))
(def os (js/require "os"))

(defn typelist->index [cur types]
  (let [full (map (juxt :name identity) types)
        ext (for [cur types
                  ext (:exts cur)]
              [ext (:name cur)])]
    {:types (into (:types cur {}) full)
     :exts (into (:exts cur {}) ext)}))

(object/behavior* ::file-types
                  :triggers #{:object.instant}
                  :type :user
                  :desc "Files: Associate file types"
                  :params [{:label "types"
                            :example "[{:exts [:wisp],\n  :mime \"text/x-clojurescript\",\n  :name \"Wisp\",\n  :tags [:editor.wisp]}]"}]
                  :reaction (fn [this types]
                              (object/merge! files-obj (typelist->index @files-obj types))))

(object/behavior* ::file.ignore-pattern
                  :triggers #{:object.instant}
                  :type :user
                  :exclusive true
                  :desc "Files: Set ignore pattern"
                  :params [{:label "pattern"
                            :example "\"\\\\.git|\\\\.pyc\""}]
                  :reaction (fn [this pattern]
                              (set! ignore-pattern (js/RegExp. pattern))))

(def files-obj (object/create (object/object* ::files
                                              :tags [:files]
                                              :exts {}
                                              :types {})))

(def line-ending (.-EOL os))
(def separator (.-sep fpath))
(def available-drives #{})
(def ignore-pattern #"(^\..*)|\.class$|target/|svn|cvs|\.git|\.pyc|~|\.swp|\.jar|.DS_Store")
(def pwd (.resolve fpath "."))

(when (= separator "\\")
  (.exec (js/require "child_process") "wmic logicaldisk get name"
         (fn [_ out _]
           (let [ds (rest (.split out #"\r\n|\r|\n"))
                 ds (map #(str (.trim %) separator) (remove empty? ds))]
             (set! available-drives (into #{} ds)))
           )))


(defn get-roots []
  (if (= separator "\\")
    available-drives
    #{"/"}))

(defn ext [path]
  (let [i (.lastIndexOf path ".")]
    (when (> i 0)
      (subs path (inc i) (count path)))))

(defn without-ext [path]
  (let [i (.lastIndexOf path ".")]
    (if (> i 0)
      (subs path 0 i)
      path)))

(defn ext->type [ext]
  (let [exts (:exts @files-obj)
        types (:types @files-obj)]
    (-> exts (get ext) types)))

(defn ext->mode [ext]
  (:mime (ext->type ext)))

(defn path->type [path]
  (ext->type (keyword (ext path))))

(defn path->mode [path]
  (ext->mode (keyword (ext path))))

(defn determine-line-ending [text]
  (let [text (subs text 0 1000)
        rn (re-seq #"\r\n" text)
        n (re-seq #"[^\r]\n" text)]
    (cond
      (and rn n) line-ending
      (and (not rn) (not n)) line-ending
      (not n) "\r\n"
      :else "\n")))

(defn open [path cb]
  (try
    (let [content (.readFileSync fs path "utf-8")]
      ;;TODO: error handling
      (when content
        (let [e (ext path)]
          (cb {:content content
               :line-ending (determine-line-ending content)
               :type (or (ext->mode (keyword e)) e)})
          (object/raise files-obj :files.open content))
        ))
    (catch js/Error e
      (object/raise files-obj :files.open.error path)
      (when cb (cb nil e)))
    (catch js/global.Error e
      (object/raise files-obj :files.open.error path)
      (when cb (cb nil e)))
    ))

(defn open-sync [path]
  (try
    (let [content (.readFileSync fs path "utf-8")]
      ;;TODO: error handling
      (when content
        (let [e (ext path)]
          (object/raise files-obj :files.open content)
          {:content content
           :line-ending (determine-line-ending content)
           :type (or (ext->mode (keyword e)) e)}))
        )
    (catch js/Error e
      (object/raise files-obj :files.open.error path)
      nil)
    (catch js/global.Error e
      (object/raise files-obj :files.open.error path)
      nil)
    ))

(defn save [path content & [cb]]
  (try
    (.writeFileSync fs path content)
    (object/raise files-obj :files.save path)
    (when cb (cb))
    (catch js/global.Error e
      (object/raise files-obj :files.save.error path)
      (when cb (cb e))
      )
    (catch js/Error e
      (object/raise files-obj :files.save.error path)
      (when cb (cb e))
      )))

(defn delete! [path]
  (if (dir? path)
    (.rmdirSyncRecursive wrench path)
    (.unlinkSync fs path)))

(defn move! [from to]
  (if (dir? from)
    (do
      (.copyDirSyncRecursive wrench from to)
      (.rmdirSyncRecursive wrench from))
    (do
      (save to (:content (open-sync from)))
      (delete! from))))

(defn copy [from to]
  (if (dir? from)
    (.copyDirSyncRecursive wrench from to)
    (save to (:content (open-sync from)))))

(defn mkdir [path]
  (.mkdirSync fs path))

(defn next-available-name [path]
  (if-not (exists? path)
    path
    (let [ext (ext path)
          name (without-ext (basename path))
          p (parent path)]
      (loop [x 1
             cur (join p (str name x "." ext))]
        (if-not (exists? cur)
          cur
          (recur (inc x) (join p (str name (inc x) (when ext (str "." ext))))))))))

(defn exists? [path]
  (.existsSync fs path))

(defn stats [path]
  (when (exists? path)
    (.statSync fs path)))

(defn dir? [path]
  (when (exists? path)
    (let [stat (.statSync fs path)]
      (.isDirectory stat))))

(defn file? [path]
  (when (exists? path)
    (let [stat (.statSync fs path)]
      (.isFile stat))))

(defn basename [path]
  (.basename fpath path))

(defn writable? [path]
  (let [perm (-> (.statSync fs path)
                 (.mode.toString 8)
                 (js/parseInt 10)
                 (str))
        perm (subs perm (- (count perm) 3))]
    (#{"7" "6" "3" "2"} (first perm))))

(defn resolve [base cur]
  (.resolve fpath base cur))

(defn ->file|dir [path f]
  (if (dir? (str path separator f))
    (str f separator)
    (str f)))

(defn ->type [path]
  (let [e (ext path)]
    (or (ext->mode (keyword e) e))))

(defn ls [path cb]
  (try
    (let [fs (map (partial ->file|dir path) (.readdirSync fs path))]
      (if cb
        (cb fs)
        fs))
    (catch js/global.Error e
      (when cb
        (cb nil))
      nil)))

(defn ls-sync [path opts]
  (try
    (let [fs (remove #(re-seq ignore-pattern %) (map (partial ->file|dir path) (.readdirSync fs path)))]
      (cond
       (:files opts) (filter #(file? (join path %)) fs)
       (:dirs opts) (filter #(dir? (join path %)) fs)
       :else fs))
    (catch js/global.Error e
      nil)))

(defn full-path-ls [path]
  (try
    (doall (map (partial join path) (.readdirSync fs path)))
    (catch js/Error e
      (js/lt.objs.console.error e))
    (catch js/global.Error e
      (js/lt.objs.console.error e))))

(defn dirs [path]
  (try
    (filter dir? (map (partial join path) (.readdirSync fs path)))
    (catch js/Error e)
    (catch js/global.Error e)))

(defn join [& segs]
  (apply (.-join fpath) (filter identity segs)))

(defn home [path]
  (let [h (if (= js/process.platform "win32")
            js/process.env.USERPROFILE
            js/process.env.HOME)]
    (join h (or path separator))))

(defn lt-home [path]
  (if js/process.env.LTHOME
    (join js/process.env.LTHOME (or path ""))
    (home (join ".lighttable" path)))
  (join pwd path))

(defn walk-up-find [start find]
  (let [roots (get-roots)]
    (loop [cur start
           prev ""]
      (if (or (empty? cur)
              (roots cur)
              (= cur prev))
        nil
        (if (exists? (join cur find))
          (join cur find)
          (recur (parent cur) cur))))))

(defn ->name|path [f & [relative]]
  (let [path (if relative
               (.relative fpath relative f)
               f)]
    [(.basename fpath f) path]))

(defn parent [path]
	(.dirname fpath path))

(defn path-segs [path]
  (let [segs (.split path separator)
        segs (if (or (.extname fpath (last segs))
                     (empty? (last segs)))
               (butlast segs)
               segs)]
    (vec (map #(str % separator) segs))))
