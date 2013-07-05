(ns lt.objs.shell
  (:require [lt.object :as object]
            [lt.objs.editor :as ed]
            [lt.objs.clients :as clients]
            [lt.objs.eval :as eval]
            [lt.objs.proc :as proc]
            [lt.objs.command :as cmd]))

(comment

(object/object* ::shell.lang
                :tags #{:shell.lang}
                :init (fn [this]
                        ))

(object/behavior* ::on-eval
                  :triggers #{:eval
                              :eval.one}
                  :reaction (fn [editor]
                              (println "here")
                              (let [info {}
                                    meta {:start {:line (-> (ed/->cursor editor "start") :line)}
                                          :end {:line (-> (ed/->cursor editor "end") :line)}}
                                    info (if (ed/selection? editor)
                                           (assoc info
                                             :code (ed/selection editor)
                                             :meta meta)
                                           (assoc info :code (ed/line editor (-> meta :start :line)) :meta meta))]
                                (object/raise shell-lang :eval! {:info info
                                                                 :origin editor}))))

(object/behavior* ::eval!
                  :triggers #{:eval!}
                  :reaction (fn [this event]
                              (let [{:keys [info origin]} event]
                                (clients/send (eval/get-client! {:command :shell.eval
                                                                 :origin origin
                                                                 :create open!
                                                                 :info info})
                                              :shell.eval
                                              info
                                              :only origin))))

(defn shutdown [this]
  (when (-> @this :procs)
    (proc/kill-all (-> @this :procs)))
  (clients/rem! this))

(object/behavior* ::send!
                  :triggers #{:send!}
                  :reaction (fn [this msg]
                              (condp = (-> msg second keyword)
                                :client.close (shutdown this)
                                :shell.eval (-> @this :procs first (.stdin.write (str (.-code (last msg)) " \n")))
                                (println "unknown command: " (second msg)))))

(object/behavior* ::proc.out
                  :triggers #{:proc.out}
                  :reaction (fn [this data]
                              (let [data (.toString data)]
                                (println data))))

(object/tag-behaviors :shell.client [::send! ::proc.out])
(object/tag-behaviors :shell.lang [::eval!])
(object/tag-behaviors :editor.shell [::on-eval])

(def shell-lang (object/create ::shell.lang))

(defn open! []
  (let [c (clients/client! :shell.client)]
    (proc/exec {:command "sh"
                :obj c})
    (clients/handle-connection! {:client-id (clients/->id c)
                                 :commands [:shell.eval]
                                 :type "Local Shell"
                                 :name "Shell"})
    ))

(cmd/command {:command :shell.client.open
              :desc "Shell: start a shell client"
              :exec (fn []
                      (open!)
                      )})

  )