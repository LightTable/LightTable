(ns lt.objs.command
  "Provide command manager and command related fns"
  (:require [lt.object :as object]))

(declare manager)

(def ^:private required-keys #{:command :desc :exec})

(defn command
  "Define a command given a map with the following keys:

  * :command (required) - Unique keyword name for command
  * :desc (required) - Brief description of command
  * :exec (required)  - Function to invoke when command is called
  * :hidden - When true, command is hidden from command bar. Not set by default"
  [cmd]
  (assert (every? cmd required-keys)
          (str "Command doesn't have required keys: " required-keys))
  (object/update! manager [:commands] assoc (:command cmd) cmd)
  (when (:options cmd)
    (object/add-tags (:options cmd) [:command.options]))
  (object/raise manager :added cmd))

(defn- by-id [k]
  (-> @manager :commands (get (if (map? k)
                                (:command k)
                                k))))

(defn- completions [token]
  (if (and token
           (= (subs token 0 1) ":"))
    (map #(do #js {:completion (str (:command %)) :text (str (:command %))}) (vals (:commands @manager)))
    (map #(if-not (:desc %)
            #js {:completion (str (:command %)) :text (str (:command %))}
            #js {:completion (str (:command %)) :text (:desc %)})
         (vals (:commands @manager)))))

(defn exec!
  "Execute a Light Table command with the given args"
  [cmd & args]
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

(def ^:private manager (object/create ::command.manager))
