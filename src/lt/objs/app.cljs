(ns lt.objs.app
  "Provide app object which manages app startup, app shutdown and
  window related features"
  (:require [lt.object :as object]
            [lt.objs.platform :as platform]
            [lt.objs.command :as cmd]
            [lt.objs.context :as ctx]
            [clojure.string :as string]
            [lt.util.js :refer [now]]
            [lt.util.dom :refer [$] :as dom]
            [lt.util.ipc :as ipc])
  (:require-macros [lt.macros :refer [behavior]]))

(def remote (js/require "remote"))
(def win (.getCurrentWindow remote))
(def frame (js/require "web-frame"))
(def closing true)
(def default-zoom 1)

(defn app-url []
  (.-location.href js/window))

(defn window-number []
  (.-id win))

(defn first-window? []
  (= 1 (window-number)))

(defn prevent-close []
  (set! closing false))

(declare app)

(defn close
  ([] (close false))
  ([force?]
   (if force?
     (do
       (object/raise app :closing)
       (object/raise app :closed)
       (.destroy win))
     (.close win))))

(defn refresh []
  (js/window.location.reload true))

(defn init []
  (object/raise app :deploy)
  (object/raise app :pre-init)
  (object/raise app :init)
  (object/raise app :post-init)
  (object/raise app :show))

(defn fetch [k]
  (when-let [v (aget js/localStorage (name k))]
    (when (not= "null" v)
      (js/JSON.parse v))))

(defn store!
  "Store key and value in localStorage. If value is a string, fetch must be used
  to get back the original value from localStorage."
  [k v]
  (aset js/localStorage (name k) (if (string? v)
                                   (pr-str v)
                                   v)))

(defn store-swap! [k f]
  (let [neue (f (fetch k))]
    (store! k neue)
    neue))


(defn ensure-greater [x cap]
  (let [x (if (string? x)
            (js/parseInt x)
            x)]
    (max x cap)))

(defn zoom-level []
  (when (not= (.getZoomFactor frame) 0)
    (.getZoomFactor frame)))

(defn open-window []
  (ipc/send "createWindow"))

;;*********************************************************
;; Behaviors
;;*********************************************************

(behavior ::refresh
          :triggers #{:refresh}
          :reaction (fn [obj]
                      (set! closing true)
                      (object/raise app :reload)
                      (when closing
                        (refresh))))

(behavior ::close!
          :triggers #{:close!}
          :reaction (fn [this]
                      (set! closing true)
                      (object/raise this :close)
                      (when closing
                        (close true))))

(behavior ::notify-init-window
          :triggers #{:init}
          :reaction (fn [this]
                      (ipc/send "initWindow" (window-number))))

(behavior ::store-position-on-close
          :triggers #{:closed :refresh}
          :reaction (fn [this]
                      (when-not (.isFullScreen win)
                        (let [[width height] (.getSize win)]
                          (store! :width width)
                          (store! :height height))
                        (let [[x y] (.getPosition win)]
                          (store! :x x)
                          (store! :y y)))
                      (set! js/localStorage.fullscreen (.isFullScreen win))))

(behavior ::restore-fullscreen
          :triggers #{:show}
          :reaction (fn [this]
                      (when (= js/localStorage.fullscreen "true")
                        (.setFullScreen win true))))

(behavior ::restore-position-on-init
          :triggers #{:show}
          :reaction (fn [this]
                      (when js/localStorage.width
                        (.setSize win (ensure-greater js/localStorage.width 400) (ensure-greater js/localStorage.height 400))
                        (.setPosition win (ensure-greater js/localStorage.x 0) (ensure-greater js/localStorage.y 0)))))

(behavior ::on-show-bind-navigate
          :triggers #{:show}
          :reaction (fn [this]
                      (dom/on ($ :#canvas) :click (fn [e]
                                                    (when (and (= (.-target.nodeName e) "A")
                                                               (not (.-defaultPrevented e)))
                                                      (dom/prevent e)
                                                      (when-let [href (.-target.href e)]
                                                        (platform/open-url href)
                                                        (.focus win)))))))

(behavior ::track-focus
          :triggers #{:focus :show}
          :reaction (fn [this]
                      (store! :focusedWindow (window-number))))

(behavior ::focus-class
          :triggers #{:focus :show}
          :reaction (fn [this]
                      (dom/add-class (dom/$ :body) :active)
                      (dom/remove-class (dom/$ :body) :inactive)))

(behavior ::blur-class
          :triggers #{:blur}
          :reaction (fn [this]
                      (dom/remove-class (dom/$ :body) :active)
                      (dom/add-class (dom/$ :body) :inactive)))

(defn run-commands [this & commands]
  (when (seq commands)
    (let [commands (if (-> commands first vector?)
                     (first commands)
                     commands)]
      (doseq [c commands]
        (if (coll? c)
          (apply cmd/exec! c)
          (cmd/exec! c))))))

(behavior ::run-pre-init
          :triggers #{:pre-init}
          :desc "App: Run commands before init"
          :params [{:label "commands"
                    :type :list
                    :items cmd/completions}]
          :type :user
          :reaction run-commands)

(behavior ::run-on-init
          :triggers #{:init}
          :desc "App: Run commands on init"
          :params [{:label "commands"
                    :type :list
                    :items cmd/completions}]
          :type :user
          :reaction run-commands)

(behavior ::run-post-init
          :triggers #{:post-init}
          :desc "App: Run commands after init"
          :params [{:label "commands"
                    :type :list
                    :items cmd/completions}]
          :type :user
          :reaction run-commands)

(behavior ::set-default-zoom-level
          :triggers #{:init}
          :desc "App: Set the default zoom level"
          :params [{:label "default-zoom-level"
                    :type :number}]
          :type :user
          :reaction (fn [this default]
                      (set! default-zoom default)
                      (cmd/exec! :window.zoom-reset)))

(behavior ::add-platform-class
          :triggers #{:init}
          :reaction (fn [this]
                      (dom/add-class (dom/$ :body) (name platform/platform))))

;;*********************************************************
;; Object
;;*********************************************************

(object/object* ::app
                :tags #{:app :window}
                :delays 0
                :init (fn [this]
                        (ctx/in! :app this)))

(def app (object/create ::app))

;; Handles events e.g. focus, blur and close
(ipc/on "app" #(object/raise app (keyword %)))


;;*********************************************************
;; Commands
;;*********************************************************

(cmd/command {:command :window.new
              :desc "Window: Open new window"
              :exec (fn []
                      (let [w (open-window)]))})

(cmd/command {:command :window.close
              :desc "Window: Close window"
              :exec (fn []
                      (object/raise app :close!))})


(cmd/command {:command :window.zoom-in
              :desc "Window: Zoom in"
              :exec (fn []
                      (.setZoomFactor frame (+ (.getZoomFactor frame) 0.2)))})

(cmd/command {:command :window.zoom-out
              :desc "Window: Zoom out"
              :exec (fn []
                      (when (> (.getZoomFactor frame) 0)
                        (.setZoomFactor frame (- (.getZoomFactor frame) 0.2))))})

(cmd/command {:command :window.zoom-reset
              :desc "Window: Zoom reset"
              :exec (fn []
                      (.setZoomFactor frame default-zoom))})

(cmd/command {:command :window.fullscreen
              :desc "Window: Toggle fullscreen"
              :exec (fn []
                      (.setFullScreen win (not (.isFullScreen win))))})

(cmd/command {:command :window.minimize
              :desc "Window: Minimize"
              :exec (fn []
                      (.minimize win))})

(cmd/command {:command :window.maximize
              :desc "Window: Maximize"
              :exec (fn []
                      (.maximize win))})
