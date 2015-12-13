(ns lt.objs.console
  "Provide console object for logging to file and displaying log messages
  in bottom bar"
  (:require [lt.object :as object]
            [lt.objs.app :as app]
            [lt.objs.files :as files]
            [lt.objs.bottombar :as bottombar]
            [lt.objs.command :as cmd]
            [lt.objs.statusbar :as statusbar]
            [lt.objs.tabs :as tabs]
            [clojure.string :as string]
            [lt.util.dom :refer [$ append empty parents] :as dom]
            [lt.objs.platform :as platform])
  (:require-macros [crate.def-macros :refer [defpartial]]
                   [lt.macros :refer [behavior defui]]))

(def console-limit 50)
(def util-inspect (.-inspect (js/require "util")))
(def logs-dir (files/lt-user-dir "logs"))
(def core-log (try
                (when-not (files/exists? logs-dir)
                  (when-not (files/exists? (files/lt-user-dir))
                    (files/mkdir (files/lt-user-dir)))
                  (files/mkdir logs-dir))
                (.. (js/require "fs") (createWriteStream (files/join logs-dir (str "window" (app/window-number) ".log"))))
                (catch :default e
                  (.error js/console (str "Failed to initialize the log writer: " e)))))

(defn ->ui [c]
  (object/->content c))

(defn dom-like? [thing]
  (or (vector? thing)
      (.-nodeType thing)
      (string? thing)))

(declare console)

(defn write [$console msg]
  (when (> (count (dom/children $console)) (dec console-limit))
    (dom/remove (aget (dom/children $console) 0)))
  (when-not (bottombar/active? console)
    (statusbar/dirty))
  (append $console msg))

(defn write-to-log [thing]
  (when core-log
    (.write core-log thing)))

(defpartial ->item [l & [class]]
  [:li {:class class} l])

(defn log
  ([l] (log l nil))
  ([l class] (log l class nil))
  ([l class str-content]
   (when-not (= "" l)
     (let [$console (->ui console)]
       (when (or (string? l) str-content) (write-to-log (if (string? l)
                                                          l
                                                          str-content))
         (write $console (->item [:pre (if-not (dom-like? l)
                                         (pr-str l)
                                         l)] class))
         (dom/scroll-top $console 10000000000)
         nil)))))

(defn error
  "Log errors, strings or any objects as console error(s). If an error,
  its stack is logged"
  [& errors]
  (statusbar/console-class "error")
  (doseq [e errors]
    (log (str (cond
               (.-stack e) (.-stack e)
               (string? e) e
               (not= (pr-str e) "[object Object]") (pr-str e)
               :else (str e)))
         "error")))

(.on js/process "uncaughtException" #(error %))

(defui console-ui [this]
  [:ul.console]
  :contextmenu (fn [e]
                 (object/raise this :menu! e)))

(behavior ::on-close
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

(behavior ::set-console-limit
          :triggers #{:object.instant}
          :desc "Console: Set buffer size"
          :type :user
          :params [{:label "size"}]
          :reaction (fn [this size]
                      (set! console-limit size)))

(defn inspect [thing]
  (util-inspect thing false 2))

(defn verbatim
  ([thing] (verbatim thing nil))
  ([thing class]
   (verbatim thing class nil))
  ([thing class str-content]
   (let [$console (->ui console)]
     (when str-content
       (write-to-log str-content))
     (when class
       (statusbar/console-class class))
     (write $console (->item thing class))
     (dom/scroll-top $console 10000000000)
     nil)))

(defn try-update [{:keys [content id]}]
  (when id
    (when-let [pre (dom/$ (str "#console" id) (->ui console))]
      (dom/append pre (dom/text-node content))
      true)))

(defn loc-log [{:keys [file line content class str-content id] :as msg}]
  (when content
    (when (or (string? content) str-content) (write-to-log (str file "[" line "]: " (if (string? content)
                                                                                      content
                                                                                      str-content) "\n")))
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

(behavior ::menu+
          :triggers #{:menu+}
          :reaction (fn [this items event]
                      (conj items
                            {:label "Clear"
                             :order 1
                             :click (fn []
                                      (cmd/exec! :clear-console))}
                            {:label "Copy"
                             :order 2
                             :click (fn []
                                      (let [target (.-target event)
                                            item (if (= (.toLowerCase (.-tagName target)) "li")
                                                   target
                                                   (dom/parents target "ul.console li"))]
                                        (platform/copy (.-textContent target))))}
                            (when (not= :tab (:current-ui @console))
                              {:label "Hide console"
                               :order 3
                               :click (fn []
                                        (cmd/exec! :toggle-console))})
                            (when (not= :tab (:current-ui @console))
                              {:label "Open console tab"
                               :order 4
                               :click (fn []
                                        (cmd/exec! :toggle-console)
                                        (cmd/exec! :console-tab))}))))

;; @FIXME: rename to statusbar ?
(behavior ::statusbar-console-toggle
          :triggers #{:toggle}
          :reaction (fn [this]
                      (object/raise bottombar/bottombar :toggle console)
                      (when (bottombar/active? console)
                        (dom/scroll-top (object/->content console) 10000000000)
                        (statusbar/clean))
                      ))

;; @FIXME: rename to statusbar ?
(behavior ::statusbar-console-show
          :triggers #{:show!}
          :reaction (fn [this]
                      (object/raise bottombar/bottombar :show! console)
                      (when (bottombar/active? console)
                        (dom/scroll-top (object/->content console) 10000000000)
                        (statusbar/clean))
                      ))

;; @FIXME: rename to statusbar ?
(behavior ::statusbar-console-hide
          :triggers #{:hide!}
          :reaction (fn [this]
                      (object/raise bottombar/bottombar :hide! console)))


(bottombar/add-item console)

(cmd/command {:command :console-tab
              :desc "Console: Open the console in a tab"
              :exec (fn []
                      (when (not= :tab (:current-ui @console)) ; Running the command when tab is already opened in a tab was creating another new tab each time.
                        (object/raise statusbar/console-toggle :hide!)
                        (object/merge! console {:current-ui :tab})
                        (tabs/add! console)
                      ))})


(cmd/command {:command :console.show
              :desc "Console: Show console"
              :hidden true
              :exec (fn []
                      (if (= (:current-ui @console) :tab)
                        (do (tabs/active! console) (statusbar/clean))
                        (object/raise statusbar/console-toggle :show!)))})

(cmd/command {:command :console.hide
              :desc "Console: Hide console"
              :hidden true
              :exec (fn []
                      (if (= (:current-ui @console) :tab)
                        (object/raise console :close)
                        (object/raise statusbar/console-toggle :hide!)))})

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
