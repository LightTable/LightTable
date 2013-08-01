(ns lt.objs.clients
  (:refer-clojure :exclude [send])
  (:require [lt.object :as object]
            [lt.objs.window :as window]
            [lt.util.js :refer [wait]]
            [lt.objs.notifos :as notifos]
            [clojure.string :as string]))

(when-not (window/fetch :clients)
  (window/store! :clients (atom {})))

(def cs (window/fetch :clients))
(def types (atom {}))

(defn register-type [type func]
  (swap! types assoc type func))

(defn type-func [client]
  (@types (@client :type)))

(defn by-id [n]
  (when n
    (@cs n)))

(defn ->id [obj]
  (object/->id obj))

(defn by-name [n]
  (first (filter #(= n (:name @%)) (vals @cs))))

(defn ->name [client]
  (if (map? client)
    (:name client)
    client))

(defn merge-info [client info]
  (let [{:keys [commands type tags]} info
        info (dissoc info :tags)]
    (object/merge! client (merge info {:commands (set (map keyword commands))}))
    (when tags
      (object/add-tags client tags))))

(defn handle-connection! [info]
  (if-let [client (by-id (:client-id info))]
    (do
      (merge-info client info)
      (object/raise client :connect)
      (object/raise clients :connect client)
      client)
    (let [c (client! (:tag info))]
      (handle-connection! (assoc info :client-id (->id c))))))

(defn rem! [client]
  (let [id (by-id (->id client))]
    (swap! cs dissoc (->id client))
    (object/raise client :disconnect)
    (object/destroy! client)
    (object/raise clients :disconnect cname)))

(defn available? [client]
  (by-id (->id client)))

;;**********************************************************
;; callbacks
;;**********************************************************

(def cb-gc-timeout (* 60 60 1000))
(def callbacks (atom {}))
(def cb-id (atom -1))

(defn ->cb [only? cb]
  (cond
   (and only? cb) [only? cb]
   only? [nil only?]
   :else [only? cb]))

(defn store-cb [cb id]
  (swap! callbacks assoc id cb))

(defn rem-cb [cb]
  (swap! callbacks #(into {} (remove (fn [[k [_ v]]]
                                       (= v cb)) %))))

(defn callback? [id]
  (@callbacks id))

(defn call [id command data]
  (let [[only? obj] (callback? id)]
    (when obj
      (if (fn? obj)
        (obj command data)
        (object/raise obj command data))
      (when (and (not only?)
                 (not (fn? obj)))
        (object/raise clients command data)))))

(defn cb->obj [id]
  (let [[only? obj] (callback? id)]
    (when obj
      (when-not (fn? obj)
        obj))))

(defn ->message [command data only? cb]
  (let [cb-id (swap! cb-id inc)
        [only? cb :as pair] (->cb only? cb)]
    (when cb
      (store-cb pair cb-id))
    (array cb-id (name command) (clj->js data))))

;;**********************************************************
;; common
;;**********************************************************

(defn subpath? [root sub]
  (when root
    (= (.indexOf (string/lower-case sub) (string/lower-case root)) 0)))

;;return client based on path and type
(defn discover* [command {:keys [path]}]
  (filter (fn [cur]
            (let [{:keys [dir commands]} (if (satisfies? IDeref cur)
                                           @cur
                                           cur)]
              (and (if (and path dir)
                     (subpath? dir path)
                     true)
                   (get commands command))))
          (vals @cs)))

(defn discover [command info]
  (let [[found & others :as all] (discover* command info)]
    (cond
     (not found) [:none]
     (and found (not (seq others))) [:found found]
     :else [:select all])))

(defn send [client command & [data only? cb]]
  (let [message (->message command data only? cb)]
    (object/raise client :try-send! message)))

(defn close! [client]
  (send client :client.close))

(defn cancel-all! [client]
  (send client :client.cancel-all))

;;**********************************************************
;; object
;;**********************************************************

(object/object* ::clients
                :triggers [:connect :disconnect :message]
                :behaviors [::handle-message ::notify-connect]
                :tags #{:clients}
                :init (fn []
                        ))

(def clients (object/create ::clients))

(object/behavior* ::close-clients-on-closed
                  :triggers #{:closing}
                  :reaction (fn [app]
                              (doseq [[_ c] @cs]
                                (close! c))))

(object/behavior* ::on-destroy-remove-cb
                  :triggers #{:destroy}
                  :reaction (fn [this]
                              (rem-cb this)))

(object/behavior* ::raise-on-object
                  :triggers #{:clients.raise-on-object}
                  :reaction (fn [this [id command data]]
                              (object/raise (object/by-id id) (keyword command) data)))

(object/behavior* ::handle-message
                  :triggers #{:message}
                  :reaction (fn [obj [cb-id command data :as msg]]
                              (if (callback? cb-id)
                                (call cb-id (keyword command) data)
                                (object/raise clients (keyword command) data))))

(object/behavior* ::notify-connect
                  :triggers #{:connect}
                  :reaction (fn [obj client]
                              (notifos/set-msg! (str "Connected to " (:name @client)))))

;;**********************************************************
;; individual Clients
;;**********************************************************

(defn client! [type]
  (let [obj (object/create ::client)]
    (object/add-tags obj [type])
    (swap! cs assoc (->id obj) obj)
    obj))

(defn placeholder []
  (-> (object/create ::client)
      (object/add-tags [:client.placeholder])))

(defn placeholder? [c]
  (object/has-tag? c :client.placeholder))

(defn swap-client! [a b]
  (doseq [item (:queue @a)]
    (object/raise b :try-send! item))
  (object/raise a :swapped b))

(object/object* ::client
                :queue []
                :tags #{:client})

(object/behavior* ::try-send
                  :triggers #{:try-send!}
                  :reaction (fn [this msg]
                              (if (:connected @this)
                                (object/raise this :send! msg)
                                (object/raise this :queue! msg))))

(object/behavior* ::queue!
                  :triggers #{:queue!}
                  :reaction (fn [this msg]
                              (object/update! this [:queue] conj msg)))

(object/behavior* ::on-connect-drain
                  :triggers #{:connect}
                  :reaction (fn [this]
                              (object/merge! this {:connected true})
                              (doseq [q (:queue @this)]
                                (object/raise this :send! q)
                                ;;Tremendous hack to sleep for a tiny bit before sending the next.
                                (doall (range 10000)))
                              (object/merge! this {:queue []})))

(object/behavior* ::remove-placeholder-on-swapped
                  :triggers #{:swapped}
                  :reaction (fn [this]
                              (object/destroy! this)))
