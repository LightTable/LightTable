(ns lt.objs.command
  (:require [lt.object :as object]))

(declare manager)

(defn command [cmd]
  (object/update! manager [:commands] assoc (:command cmd) cmd)
  (when (:options cmd)
    (object/add-tags (:options cmd) [:command.options]))
  (object/raise manager :added cmd))

(defn by-id [k]
  (-> @manager :commands (get (if (map? k)
                                (:command k)
                                k))))

(defn exec! [cmd & args]
  (let [cmd (by-id cmd)]
    (when (and cmd
               (:exec cmd))
      (if (:options cmd)
        (apply object/raise (first (object/by-tag :sidebar.command)) :exec! cmd args)
        (apply (:exec cmd) args)))))

;;*********************************************************
;; Object
;;*********************************************************

(object/object* ::command.manager
                :tags #{:command.manager}
                :commands {})

(def manager (object/create ::command.manager))
