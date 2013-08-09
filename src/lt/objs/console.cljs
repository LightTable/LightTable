(ns lt.objs.console
  (:require [lt.object :as object]
            [lt.objs.window :as window]
            [lt.objs.bottombar :as bottombar]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.statusbar :as statusbar]
            [lt.objs.tabs :as tabs]
            [crate.binding :refer [bound]]
            [lt.util.js :refer [wait]]
            [lt.util.dom :refer [$ append empty] :as dom])
  (:require-macros [crate.def-macros :refer [defpartial]]
                   [lt.macros :refer [defui]]))

(def console-limit 50)
(def util-inspect (.-inspect (js/require "util")))
(def core-log (.. (js/require "fs") (createWriteStream (str "logs/window" (window/window-number) ".log"))))

(.on js/process "uncaughtException" #(error %))

(defui console-ui [this]
       [:ul.console])

(object/behavior* ::on-close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (object/merge! this {:current-ui sidebar-console})
                              (tabs/rem! this)))

(object/object* ::console
                :tags #{:console}
                :name "console"
                :dirty false
                :init (fn [this]
                        (object/merge! this {:current-ui sidebar-console})
                        (console-ui this)
                        ))

(defn inspect [thing]
  (util-inspect thing false 2))

(defpartial ->item [l & [class]]
  [:li {:class class} l])

(defn ->ui [c]
  (if (= (:current-ui @c) :self)
    (object/->content c)
    (object/->content (:current-ui @c))))

(defn write [$console msg]
  (when (> (count (dom/children $console)) console-limit)
    (dom/remove (aget (dom/children $console) 0)))
  (when-not (bottombar/active? sidebar-console)
    (statusbar/dirty))
  (append $console msg))

(defn verbatim [thing class str-version]
  (let [$console (->ui console)]
    (when str-version
      (.write core-log str-version))
    (when class
      (statusbar/console-class class))
    (write $console (->item thing class))
    (dom/scroll-top $console 10000000000)
    nil))

(defn loc-log [file line content class str-version]
  (when (or (string? content) str-version) (.write core-log (str file "[" line "]: " (if (string? content)
                                                                      content
                                                                      str-version) "\n")))
  (verbatim [:table
             [:tr
              [:td.loc
               [:em.file file
                  (when line [:em.line "[" line "]"])
                  ": "]]
              [:td [:pre content]]]]
            class))

(defn log [l class str-version]
  (when-not (= "" l)
    (let [$console (->ui console)]
      (when (or (string? l) str-version) (.write core-log (if (string? l)
                                                            l
                                                            str-version))
      (write $console (->item [:pre l] class))
      (dom/scroll-top $console 10000000000)
      nil))))

(defn error [e]
  (statusbar/console-class "error")
  (log (str (if (.-stack e)
              (.-stack e)
              (str e)))
       "error"))

(defn clear []
  (dom/empty (->ui console)))

(object/object* ::sidebar.console
                :triggers #{}
                :behaviors []
                :label "console"
                :order 4
                :init (fn [this]
                        [:ul.console

                         ]
                        ))

(def sidebar-console (object/create ::sidebar.console))
(def console (object/create ::console))

(object/behavior* ::statusbar-console-toggle
                  :triggers #{:toggle}
                  :reaction (fn [this]
                              (object/raise bottombar/bottombar :toggle sidebar-console)
                              (when (bottombar/active? sidebar-console)
                                (dom/scroll-top (object/->content sidebar-console) 10000000000)
                                (statusbar/clean))
                              ))

(bottombar/add-item sidebar-console)

(cmd/command {:command :console-tab
              :desc "Console: Open the console in a tab"
              :exec (fn []
                      (object/merge! console {:current-ui :self})
                      (tabs/add! console)
                      )})

(cmd/command {:command :toggle-console
              :desc "Console: Toggle bottom console"
              :exec (fn []
                      (object/raise statusbar/console-toggle :toggle))})

(cmd/command {:command :clear-console
              :desc "Console: Clear console"
              :exec (fn [this]
                      (doseq [o (object/by-tag :clients.devtools)]
                        (object/raise o :clear!))
                      (clear))})
