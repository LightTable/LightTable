(ns lt.objs.status-bar
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [lt.objs.canvas :as canvas]
            [lt.objs.command :as cmd]
            [lt.objs.bottombar :as bottombar]
            [lt.objs.editor :as ed]
            [lt.util.dom :as dom]
            [lt.util.cljs :as cljs]
            [crate.binding :refer [bound map-bound]]
            [lt.util.deprecate])
  (:require-macros [lt.macros :refer [behavior defui]]
                   [lt.deprecate-macros :as deprecate]))

(deprecate/namespace lt.objs.statusbar lt.objs.status-bar)

;;**********************************************************
;; status-bar container
;;**********************************************************

(object/object* ::status-bar
                :tags #{:status-bar}
                :items (sorted-set-by #(-> % deref :order))
                :init (fn [this]
                        [:div#status-bar
                         ]))

(def container (object/create ::status-bar))

(defn add-container
  "Add an object to the status-bar container. When you wish the object to be displayed or hidden,
  raise :show! or :hide! respectively. Objects must have :order and :height keys in order to determine
  the space required for the object."
  [obj]
  (object/add-tags obj [:status-bar-item])
  (object/update! container [:items] conj obj)
  (let [i (cljs/index-of obj (:items @container))]
    (if (= i 0)
      (dom/prepend (object/->content container) (object/->content obj))
      (dom/after (object/->content (get (:items @container) i)) (object/->content obj)))))

(behavior ::on-show!
          :triggers #{:show!}
          :reaction (fn [this]
                      (when-not (::shown @this)
                        (dom/css (object/->content this) {:height (:height @this)})
                        (object/merge! this {::shown true})
                        (object/raise tabs/multi :tabset-bottom! (:height @this)))))

(behavior ::on-hide!
          :triggers #{:hide!}
          :reaction (fn [this]
                      (when (::shown @this)
                        (dom/css (object/->content this) {:height 0})
                        (object/merge! this {::shown false})
                        (object/raise tabs/multi :tabset-bottom! (- (:height @this))))))

(behavior ::init-status-bar
          :triggers #{:init}
          :reaction (fn [app]
                      (dom/append (object/->content tabs/multi) (object/->content container))))

;;**********************************************************
;; status
;;**********************************************************

(defui status-item [content class]
  [:li {:class class} content])

(object/object* ::status
                :items []
                :height 34
                :order 0
                :init (fn [this]
                        [:ul#status
                         (map-bound #(object/->content (deref %)) this {:path [:items]})]
                        ))

(def status (object/create ::status))

(add-container status)

;; @FIXME: Should we rename to `::show-status` ?
(behavior ::show-status-bar
          :desc "App: Show status at the bottom of the editor"
          :type :user
          :triggers #{:init}
          :reaction (fn [this]
                      (object/raise status :show!)))

(deprecate/function ::ns add-statusbar-item add-status-item [item]
  (object/update! status [:items] conj item))

;;**********************************************************
;; cursor
;;**********************************************************

(defn ->cursor-str [{:keys [pos]}]
  [:span.pos (str "" (inc (:line pos)) " / " (inc (:ch pos)))])

(behavior ::update-cursor-location
                  :triggers #{:update!}
                  :reaction (fn [this pos]
                              (object/merge! this {:pos pos})))

(object/object* ::status.cursor
                :triggers #{}
                :behaviors #{::update-cursor-location}
                :pos {:line 0 :ch 0}
                :init (fn [this]
                        (status-item (bound this ->cursor-str) "")
                        ))

(behavior ::report-cursor-location
                  :triggers #{:move :active}
                  :reaction (fn [this]
                              (object/raise status-cursor :update! (ed/->cursor this))))

(def status-cursor (object/create ::status.cursor))
(add-status-item status-cursor)

;;**********************************************************
;; loader
;;**********************************************************

(defn loader-disp [this]
  (if (> (:loaders this) 0)
    ""
    "none"))

(defn arrow-disp [this]
  (if (> (:loaders this) 0)
    "none"
    ""))


(defui loader [this]
  [:span.load-wrapper {:style {:display (bound this loader-disp)}}
   [:span.img]]
  :click (fn []
           (object/raise this :toggle)))

(defui log-item [i]
  [:li (bound i :text)])

(defn ->message-class [m]
  (str "message " (or m "")))

(defui log [this]
  [:div.log
   (loader this)
   [:span {:class (bound this #(-> % :class ->message-class))} (bound this :message)]
   ])

(object/object* ::status.loader
                :tags #{:status.console}
                :loaders 0
                :message ""
                :init (fn [this]
                        (status-item (log this) "left")
                        ))

(defn loader-set []
  (object/merge! status-loader {:loaders 0}))

(defn loader-inc []
  (object/update! status-loader [:loaders] inc))

(defn loader-dec []
  (if (> (:loaders @status-loader) 0)
    (object/update! status-loader [:loaders] dec)))

(def status-loader (object/create ::status.loader))
(add-status-item status-loader)

;;**********************************************************
;; console list
;;**********************************************************

(defui toggle-span [this]
  [:span {:class (bound this toggle-class)}
   (bound this :dirty)]
  :click (fn []
           (cmd/exec! :toggle-console)))

(defn toggle-class [{:keys [dirty class]}]
  (str "console-toggle " (when class (str class " ")) (when (> dirty 0) "dirty")))

(defn dirty []
  (object/update! console-toggle [:dirty] inc))

(defn clean []
  (object/merge! console-toggle {:dirty 0
                                 :class nil}))

(defn console-class [class]
  (object/merge! console-toggle {:class class}))

(object/object* ::status.console-toggle
                :dirty 0
                :tags [:status.console-toggle]
                :init (fn [this]
                        (status-item (toggle-span this))))

(def console-toggle (object/create ::status.console-toggle))
(add-status-item console-toggle)
