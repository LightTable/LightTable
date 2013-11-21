(ns lt.objs.console
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.bottombar :as bottombar]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.statusbar :as statusbar]
            [lt.objs.tabs :as tabs]
            [crate.binding :refer [bound]]
            [clojure.string :as string]
            [lt.util.js :refer [wait]]
            [lt.util.dom :refer [$ append empty] :as dom])
  (:require-macros [crate.def-macros :refer [defpartial]]
                   [lt.macros :refer [defui]]))

(def console-limit 50)
(def util-inspect (.-inspect (js/require "util")))
(def core-log (.. (js/require "fs") (createWriteStream (str "logs/window" (app/window-number) ".log"))))

(.on js/process "uncaughtException" #(error %))

(defui console-ui [this]
  [:ul.console]
  :contextmenu (fn [e]
                 (object/raise this :menu! e)))

(object/behavior* ::on-close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (object/merge! this {:current-ui :bottom})
                              (tabs/rem! this)))

(object/object* ::console
                :tags #{:console}
                :name "console"
                :dirty false
                :init (fn [this]
                        (object/merge! this {:current-ui :bottom})
                        (console-ui this)
                        ))

(defn inspect [thing]
  (util-inspect thing false 2))

(defpartial ->item [l & [class]]
  [:li {:class class} l])

(defn ->ui [c]
  (object/->content c))

(defn write [$console msg]
  (when (> (count (dom/children $console)) console-limit)
    (dom/remove (aget (dom/children $console) 0)))
  (when-not (bottombar/active? console)
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

(defn try-update [{:keys [content id]}]
  (when id
    (when-let [pre (dom/$ (str "#console" id) (->ui console))]
      (dom/append pre (dom/text-node content))
      true)))

(defn loc-log [{:keys [file line content class str-version id] :as msg}]
  (when content
  (when (or (string? content) str-version) (.write core-log (str file "[" line "]: " (if (string? content)
                                                                      content
                                                                      str-version) "\n")))
  (when-not (try-update msg)
    (verbatim [:table
               [:tr
                [:td.loc
                 [:em.file file
                  (when line [:em.line "[" line "]"])
                  ": "]]
                [:td [:pre (when id {:id (str "console" id)}) (if (string? content)
                                                                (string/replace content #"^\s+" "")
                                                                content)]]]]
              class))))

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
                :tags #{:console}
                :label "console"
                :order 4
                :init (fn [this]
                        (console-ui this)
                        ))

(def console (object/create ::console))

(object/behavior* ::menu+
                  :triggers #{:menu+}
                  :reaction (fn [this]
                              (conj items
                                    {:label "Clear"
                                     :order 1
                                     :click (fn []
                                              (cmd/exec! :clear-console))}
                                    (when (not= :tab (:current-ui @console))
                                      {:label "Hide console"
                                       :order 2
                                       :click (fn []
                                                (cmd/exec! :toggle-console))})
                                    (when (not= :tab (:current-ui @console))
                                      {:label "Open console tab"
                                       :order 3
                                       :click (fn []
                                                (cmd/exec! :toggle-console)
                                                (cmd/exec! :console-tab))}))))

(object/behavior* ::statusbar-console-toggle
                  :triggers #{:toggle}
                  :reaction (fn [this]
                              (object/raise bottombar/bottombar :toggle console)
                              (when (bottombar/active? console)
                                (dom/scroll-top (object/->content console) 10000000000)
                                (statusbar/clean))
                              ))

(bottombar/add-item console)

(cmd/command {:command :console-tab
              :desc "Console: Open the console in a tab"
              :exec (fn []
                      (object/merge! console {:current-ui :tab})
                      (tabs/add! console)
                      )})

(cmd/command {:command :toggle-console
              :desc "Console: Toggle console"
              :exec (fn []
                      (if (= (:current-ui @console) :tab)
                        (do (tabs/active! console) (statusbar/clean))
                        (object/raise statusbar/console-toggle :toggle)))})

(cmd/command {:command :clear-console
              :desc "Console: Clear console"
              :exec (fn [this]
                      (doseq [o (object/by-tag :clients.devtools)]
                        (object/raise o :clear!))
                      (clear))})
