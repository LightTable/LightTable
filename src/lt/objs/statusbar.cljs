(ns lt.objs.statusbar
  (:require [lt.object :as object]
            [lt.objs.canvas :as canvas]
            [lt.objs.command :as cmd]
            [lt.objs.bottombar :as bottombar]
            [lt.objs.editor :as ed]
            [lt.util.dom :as dom]
            [crate.binding :refer [bound map-bound]])
  (:require-macros [lt.macros :refer [defui]]))

(defui statusbar-item [content class]
  [:li {:class class} content])

(object/object* ::statusbar
                :triggers #{}
                :behaviors []
                :items []
                :init (fn [this]
                        [:ul#statusbar
                         (map-bound #(object/->content (deref %)) this {:path [:items]})]
                        ))

(def statusbar (object/create ::statusbar))

(dom/append (dom/$ :#multi (object/->content canvas/canvas)) (object/->content statusbar))

(object/merge! statusbar {:items []})


(defn add-item [item]
  (object/update! statusbar [:items] conj item))

;;**********************************************************
;; cursor
;;**********************************************************

(defn ->cursor-str [{:keys [pos]}]
  [:span.pos (str "" (inc (:line pos)) " / " (inc (:ch pos)))])

(object/behavior* ::update-cursor-location
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

(object/behavior* ::report-cursor-location
                  :triggers #{:move :active}
                  :reaction (fn [this]
                              (object/raise statusbar-cursor :update! (ed/->cursor this))))

(def statusbar-cursor (object/create ::statusbar.cursor))
(add-item statusbar-cursor)

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
(add-item statusbar-loader)

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
(add-item console-toggle)
