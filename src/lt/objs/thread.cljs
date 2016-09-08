(ns lt.objs.thread
  "Provide worker thread for background processes"
  (:require [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.platform :as platform]
            [lt.objs.console :as console]
            [cljs.reader :as reader])
  (:require-macros [lt.macros :refer [behavior background]]))

(def cp (js/require "child_process"))

(declare worker)

(behavior ::try-send
          :triggers #{:try-send!}
          :reaction (fn [this msg]
                      (if-not (:connected @this)
                        (object/raise this :queue! msg)
                        (object/raise this :send! msg))))

(behavior ::queue!
          :triggers #{:queue!}
          :reaction (fn [this msg]
                      (object/update! this [:queue] conj msg)))

(behavior ::send!
          :triggers #{:send!}
          :reaction (fn [this msg]
                      (.send (:worker @this) (clj->js msg))))

(behavior ::connect
          :triggers #{:connect}
          :reaction (fn [this]
                      (doseq [q (:queue @this)]
                        (object/raise this :send! q))
                      (object/merge! this {:connected true
                                           :queue []})))

(behavior ::message
          :triggers #{:message}
          :reaction (fn [this m]
                      (when-let [obj (object/by-id (.-obj m))]
                        (object/raise obj
                                      (if-not (keyword? (.-msg m))
                                        (keyword (.-msg m))
                                        (.-msg m))
                                      (if (= "clj" (.-format m))
                                        (reader/read-string (.-res m))
                                        (.-res m))))))

(behavior ::kill!
          :triggers #{:kill!}
          :reaction (fn [this]
                      (.kill (:worker @this))))

(behavior ::shutdown-worker-on-close
          :triggers #{:closed}
          :reaction (fn [app]
                      (object/raise worker :kill!)))

;; Provides a forked thread, mainly for use with background macro. Parent thread
;; sends messages to child thread. Child thread performs work and sends results
;; back to parent thread.
(object/object* ::worker-thread
                :tags #{:worker-thread}
                :queue []
                :init (fn [this]
                        (let [worker (.fork cp (files/lt-home "/core/node_modules/lighttable/background/threadworker.js")
                                            (clj->js ["--harmony"])
                                            (clj->js {:execPath js/process.execPath
                                                      :silent true
                                                      :env {"ATOM_SHELL_INTERNAL_RUN_AS_NODE" 1}
                                                      :cwd files/cwd}))]
                          (.on (.-stdout worker) "data" (fn [data]
                                                          (console/loc-log {:file "thread"
                                                                            :line "stdout"
                                                                            :content (str data)})))
                          (.on (.-stderr worker) "data" (fn [data]
                                                          (console/loc-log {:file "thread"
                                                                            :line "stderr"
                                                                            :content (str data)
                                                                            :class "error"})))
                          (.on worker "message" (fn [m] (object/raise this :message m)))
                          (.send worker (clj->js {:msg "init"
                                                  :obj (object/->id this)
                                                  :ltpath (files/lt-home)}))
                          (object/merge! this {:worker worker})
                        nil)))

(defn send [msg]
  (object/raise worker :try-send! msg))

(defn thread* [func]
  (let [func-str (str "" func)
        n (gensym "theadfunc")] ;;trim off the errant return and outer function
    (send {:msg "register"
           :name n
           :func func-str})
    (fn [obj & args]
      (send {:msg "call"
             :name n
             :obj (object/->id obj)
             :params (map pr-str args)}))))

;;NOTE: Because functions are defined at load time, we need to pre-add the worker behaviors so that
;;      the defined functions are sent correctly
(object/tag-behaviors :worker-thread [::kill! ::connect ::send! ::queue! ::try-send ::message])

(def worker (object/create ::worker-thread))

(comment

(object/raise test :kill!)
(object/destroy! test)

(def t (background (fn [m]
          (.log js/console "this is a message! " m)
          )))

(t test "blah")


  )
