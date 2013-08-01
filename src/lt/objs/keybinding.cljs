(ns lt.objs.keybinding
  (:require [lt.object :as object]
            [lt.objs.tabs :as tabs]
            [lt.objs.keyboard :as keyboard]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.command :as manager]
            [lt.objs.notifos :as notifos]
            [lt.util.dom :as dom]
            [clojure.string :as string]
            [cljs.reader :as reader]
            [crate.binding :refer [bound subatom computed]])
  (:require-macros [lt.macros :refer [defui]]))


(object/behavior* ::destroy-on-close
                  :triggers #{:close}
                  :reaction (fn [this]
                              (tabs/rem! this)))

(defn cmd->bindings [cmd]
    (filter #(-> % second seq)
            (for [[ctx ms] @keyboard/keys]
              [ctx (-> (filter #(= (-> % second first) cmd) ms)
                       first
                       first)])))

(defui key-box [this]
  [:input#key-box {:placeholder "key(s)"}]
  :focus (fn []
           )
  :blur (fn []
           ))

(defui capture-box [this]
  [:input#capture {:value (bound this :keystr) :placeholder "key(s)"}]
  :focus (fn []
           (keyboard/disable))
  :blur (fn []
           (keyboard/enable))
  :keypress (fn [ev]
              (when this
                (object/raise this :capture! (js/String.fromCharCode (.-charCode ev))))
              (dom/prevent ev)
              (dom/stop-propagation ev))

  :keydown (fn [ev]
             (when-not keyboard/altgr
               (when this
                 (object/raise this :capture! (keyboard/->keystr ev)))
               (dom/prevent ev)
               (dom/stop-propagation ev))))

(defui ->mappings [mappings]
  [:div
   [:ul
    (for [[ctx mapping] mappings
          :when (should-print? mapping)]
      [:li [:em ctx] " - " (print-mapping mapping)])]])

(defui ->keys [keystr]
  [:ul.keys
   (for [k (string/split keystr "-")]
     [:li k])])

(defn should-print? [[_ _ [command]]]
  (not= command :passthrough))

(defn print-mapping [v]
  (let [[a b c & r] v]
    (cond
     (= [a b] [:commandbar :exec!]) (apply str (:desc (cmd/by-id (first c)))
                                           " "
                                           (when (next c) (map pr-str (next c))))
     :else (string/join " " (rest v))
     )
    ))

(defui remove-binding [ctx k]
  [:span.remove "x"]
  :click (fn []
           ))

(defui ->all-mappings [mappings]
  [:table
   (for [[ctx ms] (sort-by first mappings)]
     [:tr
      [:td.ctx ctx]
      [:td
       [:ul
        (for [[k v] (sort-by first ms)
              :when (should-print? v)]
          [:li
           (->keys k)
           [:em (print-mapping v)]
           (remove-binding ctx k)])]]])
   ])

(def command-list (cmd/filter-list {:items (computed [(subatom manager/manager [:commands])]
                                                     (fn [cmds]
                                                       (vals cmds)))
                                    :key :desc
                                    :set-on-select true
                                    :placeholder "Command"}))

(def context-list (cmd/filter-list {:items (computed [keyboard/keys]
                                                     (fn [cmds]
                                                       (map #(do {:ctx (name %)}) (keys cmds))))
                                    :key :ctx
                                    :set-on-select true
                                    :placeholder "Context"}))

(def options (cmd/options-input {:placeholder "Options"}))

(defui add-button [this]
  [:button "add binding"]
  :click (fn []
           (object/raise this :add-binding!)))

(defn ->options [v]
  (when-not (empty? v)
    (map reader/read-string (string/split v ","))))

(object/behavior* ::capture!
                  :triggers #{:capture!}
                  :debounce 150
                  :reaction (fn [this keystr]
                              (object/merge! this {:keystr keystr})
                              (object/raise this :captured keystr)
                              ))

(object/behavior* ::show-mappings
                  :triggers #{:captured}
                  :reaction (fn [this keystr]
                              (object/merge! this {:captured-mappings (keyboard/all-mappings keystr)})))

(object/behavior* ::add-binding!
                  :triggers #{:add-binding!}
                  :reaction (fn [this]
                              (let [keys (dom/val (:kb @this))
                                    context (or (cmd/current-selected context-list) {:ctx (cmd/input-val context-list)})
                                    command (or (cmd/current-selected command-list) {:command (cmd/input-val command-list)})
                                    opts (->options (cmd/input->value options))
                                    ]

                                (notifos/set-msg! (str "Bound " keys " to '" (:desc command) "' in the " (:ctx context) " context"))
                                )))

(object/object* ::keybinding
                :name "Key bindings"
                :tags #{:keybinding}
                :keystr ""
                :init (fn [this]
                        (let [capture (capture-box this)
                              capture2 (capture-box this)
                              kb (key-box this)]
                          (object/merge! this {:kb capture2})
                          [:div#keybinding
                           [:div.binder
                            [:h3 "Add binding for key "]
                            capture2
                            [:h3 "in the context"]
                            (object/->content context-list)
                            [:h3 "which executes"]
                            (object/->content command-list)
                            [:h3 "with options"]
                            (object/->content options)
                            (add-button this)
                            [:div.capture
                             [:h3 "Currently bound to:"]
                             [:div.mappings
                              (bound (subatom this :captured-mappings) ->mappings)]]]
                           [:div.all-mappings
                            (bound keyboard/keys ->all-mappings)]
                           ]
                        )))

(def keybinding (delay (object/create ::keybinding)))

(object/tag-behaviors :keybinding [::destroy-on-close ::capture! ::show-mappings ::add-binding!])

(defn add []
  (swap! keyboard/keys identity)
  (object/raise context-list :refresh!)
  (object/raise command-list :refresh!)
  (tabs/add-or-focus! @keybinding))

(cmd/command {:command :bind-keys
              :desc "Settings: Change key bindings/shortcuts"
              :exec (fn []
                      (add))})

(object/behavior* ::show-keybinding-after-command
                  :triggers #{:selected-exec}
                  :reaction (fn [this cmd]
                              (let [bs (cmd->bindings (:command cmd))]
                                (when (seq bs)
                                  (notifos/set-msg! (reduce
                                                     (fn [res [ctx bind]]
                                                       (str res " and to " bind " [ " ctx " ]"))
                                                     (str "'" (:desc cmd) "' is bound to " (-> bs first second) " [ " (-> bs first first) " ]")
                                                     (rest bs))
                                                    {:class "tip"})))
                              ))

(object/tag-behaviors :sidebar.command [::show-keybinding-after-command])
