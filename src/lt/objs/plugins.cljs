(ns lt.objs.plugins
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.files :as files]
            [lt.objs.deploy :as deploy]
            [lt.util.dom :as dom])
  (:require-macros [lt.macros :refer [defui]]))

(def head (dom/$ :head))
(def plugins-dir (files/join deploy/home-path "plugins"))

(defui script [src]
  [:script {:src (str "file://" src) :type "text/javascript" :async "false"}])

(defn load-script [s]
  (dom/append head (script s)))

(defui style [src]
  [:link {:href (str "file://" src) :type "text/css" :rel "stylesheet"}])

(defn load-style [s]
  (dom/append head (style s)))

(defn plugin-json [dir]
  (when-let [content (files/open-sync (files/join dir "plugin.json"))]
    (-> (.parse js/JSON (:content content)) 
        (js->clj :keywordize-keys true)
        (assoc :dir dir))))

(defn available-plugins []
  (let [ds (files/dirs (files/join deploy/home-path "plugins"))]
    (filter identity (map plugin-json ds))))

(defmulti load-plugin-file files/ext)

(defmethod load-plugin-file "js" [f]
  (load-script f))

(defmethod load-plugin-file "css" [f]
  (load-style f))

(defn load-plugin [plug]
  (let [{:keys [files dir]} plug]
    (doseq [f files]
      (load-plugin-file (files/join dir f)))))

(defn local-module [plugin-name module-name]
  (files/join plugins-dir plugin-name "node_modules" module-name))

(object/behavior* ::init-plugins
                  :triggers #{:init}
                  :reaction (fn [app]
                              (doseq [p (available-plugins)]
                                (load-plugin p))
                              ))

(object/add-behavior! app/app ::init-plugins)
