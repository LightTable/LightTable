(ns lt.objs.statusbar
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [lt.objs.canvas :as canvas]
            [lt.objs.command :as cmd]
            [lt.objs.bottombar :as bottombar]
            [lt.objs.editor :as ed]
            [lt.util.dom :as dom]
            [lt.util.cljs :as cljs]
            [crate.binding :refer [bound map-bound]])
  (:require-macros [lt.macros :refer [behavior defui]]))

;;**********************************************************
;; statusbar container
;;**********************************************************

(object/object* ::statusbar-container
                :tags #{:statusbar-container}
                :items (sorted-set-by #(-> % deref :order))
                :init (fn [this]
                        [:div#statusbar-container
                         ]))

(def container (object/create ::statusbar-container))

(defn add-container
  "Add an object to the statusbar container. When you wish the object to be displayed or hidden,
  raise :show! or :hide! respectively. Objects must have :order and :height keys in order to determine
  the space required for the object."
  [obj]
  (object/add-tags obj [:statusbar-container-item])
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

(behavior ::init-statusbar-container
          :triggers #{:init}
          :reaction (fn [app]
                      (dom/append (object/->content tabs/multi) (object/->content container))))

;;**********************************************************
;; statusbar
;;**********************************************************

(defui statusbar-item [content class]
  [:li {:class class} content])

(object/object* ::statusbar
                :items []
                :height 34
                :order 0
                :init (fn [this]
                        [:ul#statusbar
                         (map-bound #(object/->content (deref %)) this {:path [:items]})]
                        ))

(def statusbar (object/create ::statusbar))

(add-container statusbar)

(behavior ::show-statusbar
          :desc "App: Show statusbar at the bottom of the editor"
          :type :user
          :triggers #{:init}
          :reaction (fn [this]
                      (object/raise statusbar :show!)))

(defn add-statusbar-item [item]
  (object/update! statusbar [:items] conj item))

;;**********************************************************
;; cursor
;;**********************************************************

(defn ->cursor-str [{:keys [pos]}]
  [:span.pos (str "" (inc (:line pos)) " / " (inc (:ch pos)))])

(behavior ::update-cursor-location
                  :triggers #{:update!}
                  :reaction (fn [this pos]
                              (object/merge! this {:pos pos})))

(object/object* ::statusbar.cursor
                :triggers #{}
                :behaviors #{::update-cursor-location}
                :pos {:line 0 :ch 0}
                :init (fn [this]
                        (statusbar-item (bound this ->cursor-str) "")
                        ))

(behavior ::report-cursor-location
                  :triggers #{:move :active}
                  :reaction (fn [this]
                              (object/raise statusbar-cursor :update! (ed/->cursor this))))

(def statusbar-cursor (object/create ::statusbar.cursor))
(add-statusbar-item statusbar-cursor)

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

(object/object* ::statusbar.loader
                :tags #{:statusbar.console}
                :loaders 0
                :message ""
                :init (fn [this]
                        (statusbar-item (log this) "left")
                        ))

(defn loader-set []
  (object/merge! statusbar-loader {:loaders 0}))

(defn loader-inc []
  (object/update! statusbar-loader [:loaders] inc))

(defn loader-dec []
  (if (> (:loaders @statusbar-loader) 0)
    (object/update! statusbar-loader [:loaders] dec)))

(def statusbar-loader (object/create ::statusbar.loader))
(add-statusbar-item statusbar-loader)

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

(object/object* ::statusbar.console-toggle
                :dirty 0
                :tags [:statusbar.console-toggle]
                :init (fn [this]
                        (statusbar-item (toggle-span this))))

(def console-toggle (object/create ::statusbar.console-toggle))
(add-statusbar-item console-toggle)
