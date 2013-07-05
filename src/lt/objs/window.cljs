(ns lt.objs.window
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.context :as ctx]
            [lt.objs.app :as app]
            [clojure.string :as string]
            [lt.util.js :refer [now]]
            [lt.util.dom :refer [$] :as dom]))

(def gui (js/require "nw.gui"))
(def me (.Window.get gui))

(when-not (.-ltstore me)
  (set! (.-ltstore me) (atom {})))

(set! (.-onbeforeunload js/window) (fn []
                                    "This will navigate the main LT window and all work will be lost, are you sure you want to do this?"))

(def closing true)

;(.Window.open gui "index.html" (clj->js {:toolbar false}))

(defn window-number []
  (let [n (last (string/split js/window.location.search "="))]
    (if (empty? n)
      0
      (js/parseInt n))))

(when (= 0 (window-number))
  (app/store! :window-id 0))

(set! (.-ltid me) (window-number))

(defn prevent-close []
  (set! closing false))

(defn close [force?]
  (when force?
    (object/raise app :closed))
  (.close win force?))

(defn refresh []
  (js/window.location.reload true))

(defn init []
  (object/raise app :deploy)
  (object/raise app :pre-init)
  (object/raise app :init)
  (object/raise app :post-init)
  (object/raise app :show!))

(defn store! [k v]
  (swap! (.-ltstore me) assoc k v))

(defn fetch [k]
  (@(.-ltstore me) k))

(defn win->key [w k]
  (str (if (number? w)
         w
         (.-id w))
       (name k)))

(defn app-store! [w k v]
  (app/store! (win->key w k) v))

(defn app-fetch [w k]
  (app/fetch (win->key w k)))

(defn app-extract! [w k]
  (let [v (app-fetch w k)]
    (app-store! w k nil)
    v))

(defn zoom-level []
  (when (not= (.-zoomLevel me) 0)
    (.-zoomLevel me)))

(object/behavior* ::refresh
                  :triggers #{:refresh}
                  :reaction (fn [obj]
                              (set! closing true)
                              (object/raise app :reload)
                              (when closing
                                (refresh))))

(object/behavior* ::close!
                  :triggers #{:close!}
                  :reaction (fn [this]
                              (set! closing true)
                              (object/raise this :close)
                              (when closing
                                (object/raise this :closed)
                                (close true))))

(object/behavior* ::show!
                  :triggers #{:show!}
                  :reaction (fn [this]
                              (.show win)
                              (object/raise app :show)
                              ))

(object/behavior* ::delay!
                  :triggers #{:delay!}
                  :reaction (fn [this]
                              (object/update! this [:delays] inc)))

(object/behavior* ::store-position-on-close
                  :triggers #{:closed}
                  :reaction (fn [this]
                              (set! js/localStorage.x (.-x win))
                              (set! js/localStorage.y (.-y win))
                              (set! js/localStorage.width (.-width win))
                              (set! js/localStorage.height (.-height win))
                              (set! js/localStorage.fullscreen (.-isFullscreen win))
                              ))

(object/behavior* ::restore-fullscreen
                  :triggers #{:show}
                  :reaction (fn [this]
                                (when (= js/localStorage.fullscreen "true")
                                  (.enterFullscreen win))
                              ))

(object/behavior* ::restore-position-on-init
                  :triggers #{:init}
                  :reaction (fn [this]
                              (when (.-width js/localStorage)
                                (.resizeTo win (js/parseInt js/localStorage.width) (js/parseInt js/localStorage.height))
                                (.moveTo win (js/parseInt js/localStorage.x) (js/parseInt js/localStorage.y)))
                              ))

(object/behavior* ::on-show-bind-navigate
                  :triggers #{:show}
                  :reaction (fn [this]
                              (dom/on ($ :#canvas) :click (fn [e]
                                                            ;;TODO: when prevent default has been called don't do this.
                                                            (when (= (.-target.nodeName e) "A")
                                                              (dom/prevent e)
                                                              (when-let [href (.-target.href e)]
                                                                (.Shell.openExternal gui href)
                                                                (.focus win)))))))
(object/behavior* ::track-focus
                  :triggers #{:focus :init}
                  :reaction (fn [this]
                              (app/store! :focusedWindow (window-number))))

(object/behavior* ::startup-time
                  :triggers #{:show}
                  :reaction (fn [this]
                              (- (now) js/setup.startTime))
                  )

(object/object* ::window
                :tags #{:window}
                :trigers [:init :close :reload :refresh :close!]
                :behaviors [::refresh ::close! ::show! ::delay! ::startup-time])

(def me-obj (object/create ::window))

(object/tag-behaviors :window [::store-position-on-close ::restore-fullscreen ::track-focus])

(.on me "blur" (fn []
                 (object/raise me-obj :blur)))

(.on me "focus" (fn []
                  (object/raise me-obj :focus)))

(cmd/command {:command :zoom-in
              :desc "Window: Zoom in"
              :exec (fn []
                      (set! (.-zoomLevel me) (+ (.-zoomLevel me) 0.5))
                      )})

(cmd/command {:command :zoom-out
              :desc "Window: Zoom out"
              :exec (fn []
                      (set! (.-zoomLevel me) (- (.-zoomLevel me) 0.5))
                      )})

(cmd/command {:command :zoom-reset
              :desc "Window: Zoom reset"
              :exec (fn []
                      (set! (.-zoomLevel me) 0)
                      )})

(comment
(.on win "close" (fn []
                   (object/raise app :close!)
                   ))

(cmd/command {:command :window.refresh
              :desc "Window: Refresh Light Table"
              :exec (fn []
                      (object/raise app :refresh))})
  )
