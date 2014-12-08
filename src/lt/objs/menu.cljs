(ns lt.objs.menu
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.keyboard :as keyboard]
            [lt.objs.platform :as platform]
            [lt.objs.app :as app]
            [lt.util.dom :as dom]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [behavior]]))

(def remote (js/require "remote"))
(def Menu (.require remote "menu"))
(def MenuItem (.require remote "menu-item"))

(defn create-menu
  ([] (create-menu nil))
  ([type]
     (if type
       (Menu. (js-obj "type" type))
       (Menu.))))

(declare submenu)

(defn menu-item [opts]
  (let [opts (if-not (:submenu opts)
               opts
               (assoc opts :submenu (submenu (:submenu opts))))
        opts2 (if (:click opts)
               (assoc opts :click (fn []
                                    (try
                                      (when-let [func (:click opts)]
                                        (func))
                                      (catch js/Error e
                                        (.error js/console e))
                                      (catch js/global.Error e
                                        (.error js/console e)))))
               opts)]
    (MenuItem. (clj->js opts))))

(defn submenu [items]
  (let [menu (create-menu)]
    (doseq [i items
            :when i]
      (.append menu (menu-item i)))
    menu))

(defn menu [items]
  (let [menu-instance (Menu.)]
    (doseq [i items]
      (.append menu-instance (menu-item i)))
    menu-instance))

(defn show-menu [m]
  (.popup m (.getCurrentWindow remote)))

(dom/on (dom/$ :body) :contextmenu (fn [e]
                                     (dom/prevent e)
                                     (dom/stop-propagation e)
                                     false))

(defn set-menubar [items]
  (let [menubar (Menu.)]
    (doseq [i items
            :when i]
      (.append menubar (menu-item i)))
    (Menu.setApplicationMenu menubar)))

(def key-mappings {"cmd" "Command"
                   "shift" "Shift"
                   "ctrl" "Control"
                   "alt" "Alt"})

(defn command->menu-binding [cmd]
  (let [ks (first (keyboard/cmd->current-binding cmd))
        parts (string/split ks " ")
        parts (for [part parts
                      :let [ks (for [key (string/split part "-")]
                                 (or (key-mappings key) key))]]
                (string/join "+" ks))]
    ;;OSX can only take single key accelerators
    (when (and (seq parts)
               (or (not (platform/mac?))
                   (= (count parts) 1)))
      {:accelerator (string/join " " parts)})))

(defn cmd-item
  ([label cmd] (cmd-item label cmd {}))
  ([label cmd opts]
   (merge
    {:label label
     :click (when-not (:selector opts)
              (fn [] (cmd/exec! cmd)))}
    opts
    (command->menu-binding cmd))))

(defn unknown-menu []
  (set-menubar [
                (when (platform/mac?)
                  {:label "" :submenu [(cmd-item "About Light Table" :version)
                                       {:type "separator"}
                                       {:label "Hide Light Table" :accelerator "Command+H" :selector "hide:"}
                                       {:label "Hide Others" :accelerator "Command+Alt+H" :selector "hideOtherApplications:"}
                                       {:type "separator"}
                                       (cmd-item "Quit Light Table" :quit {:accelerator "Command+Q"})]})
                {:label "Edit" :submenu [(cmd-item "Undo" :editor.undo {:selector "undo:" :accelerator "CommandOrControl+Z"})
                                         (cmd-item "Redo" :editor.redo {:selector "redo:" :accelerator "Command+Shift+Z"})
                                         {:type "separator"}
                                         (cmd-item "Cut" :editor.cut {:selector "cut:" :accelerator "CommandOrControl+X"})
                                         (cmd-item "Copy" :editor.copy {:selector "copy:" :accelerator "CommandOrControl+C"})
                                         (cmd-item "Paste" :editor.paste {:selector "paste:" :accelerator "CommandOrControl+V"})
                                         (cmd-item "Select All" :editor.select-all {:selector "selectAll:" :accelerator "CommandOrControl+A"})
                                         ]}
                {:label "Window" :submenu [(cmd-item "Minimize" :window.minimize {:selector "performMiniaturize:" :accelerator "Command+M"})
                                           (cmd-item "Close window" :window.close {:selector "performClose:" :accelerator "Command+W"})]}
                {:label "Help" :submenu []}
                ]))

(defn main-menu []
  (set-menubar [
                (when (platform/mac?)
                  {:label "" :submenu [(cmd-item "About Light Table" :version)
                                       {:type "separator"}
                                       {:label "Hide Light Table" :accelerator "Command+H" :selector "hide:"}
                                       {:label "Hide Others" :accelerator "Command+Alt+H" :selector "hideOtherApplications:"}
                                       {:type "separator"}
                                       (cmd-item "Quit Light Table" :quit {:accelerator "Command+Q"})]})
                {:label "File" :submenu [(cmd-item "New file" :new-file {:key "n"})
                                         (cmd-item "Open file" :open-file {:key "o" :modifiers "cmd-shift"})
                                         {:label "Open folder" :click #(do
                                                                         (cmd/exec! :workspace.show :force)
                                                                         (cmd/exec! :workspace.add-folder))}
                                         (cmd-item "Open recent workspace" :workspace.show-recents {})
                                         (cmd-item "Save file" :save {:key "s"})
                                         (cmd-item "Save file as.." :save-as {:key "s" :modifiers "cmd-shift"})
                                         {:type "separator"}
                                         (cmd-item "New window" :window.new {:key "n" :modifiers "cmd-shift"})
                                         (cmd-item "Close window" :window.close {:key "w" :modifiers "cmd-shift"})
                                         {:type "separator"}
                                         (cmd-item "Close file" :tabs.close {:key "w"})
                                         ]}
                (if (platform/mac?)
                  {:label "Edit" :submenu [(cmd-item "Undo" :editor.undo {:selector "undo:" :accelerator "CommandOrControl+Z"})
                                           (cmd-item "Redo" :editor.redo {:selector "redo:" :accelerator "CommandOrControl+Shift+Z"})
                                           {:type "separator"}
                                           (cmd-item "Cut" :editor.cut {:selector "cut:" :accelerator "CommandOrControl+X"})
                                           (cmd-item "Copy" :editor.copy {:selector "copy:" :accelerator "CommandOrControl+C"})
                                           (cmd-item "Paste" :editor.paste {:selector "paste:" :accelerator "CommandOrControl+V"})
                                           (cmd-item "Select All" :editor.select-all {:selector "selectAll:" :accelerator "CommandOrControl+A"})
                                           ]}
                  {:label "Edit" :submenu [(cmd-item "Undo" :editor.undo)
                                           (cmd-item "Redo" :editor.redo)
                                           {:type "separator"}
                                           (cmd-item "Cut" :editor.cut)
                                           (cmd-item "Copy" :editor.copy)
                                           (cmd-item "Paste" :editor.paste)
                                           (cmd-item "Select All" :editor.select-all)
                                           ]}
                  )
                {:label "View" :submenu [(cmd-item "Workspace" :workspace.show)
                                         (cmd-item "Connections" :show-connect)
                                         (cmd-item "Navigator" :navigate-workspace-transient)
                                         (cmd-item "Commands" :show-commandbar-transient)
                                         {:type "separator"}
                                         (cmd-item "Language docs" :docs.search.show)
                                         {:type "separator"}
                                         (cmd-item "Console" :toggle-console)
                                         (cmd-item "Developer Tools" :dev-inspector)]}

                {:label "Window" :submenu [(cmd-item "Minimize" :window.minimize)
                                           (cmd-item "Maximize" :window.maximize)
                                           (cmd-item "Fullscreen" :window.fullscreen)]}
                {:label "Help" :submenu [(cmd-item "Documentation" :show-docs)
                                         {:label "Report an Issue" :click #(do
                                                                             (cmd/exec! :add-browser-tab "https://github.com/LightTable/LightTable/issues?state=open"))}  ;; TODO: Add report an issue on GitHub menu item - TWM
                                         (when-not (platform/mac?)
                                           (cmd-item "About Light Table" :version))]}
                ]))

(behavior ::create-menu
           :triggers #{:init}
           :reaction (fn [this]
                       (when (platform/mac?)
                         (set! (.-menu app/win) nil)
                         )
                       (main-menu)))

(behavior ::recreate-menu
                  :debounce 20
                  :triggers #{:app.keys.load :init}
                  :reaction (fn [app]
                              (when (platform/mac?)
                                (main-menu))))

(behavior ::set-menu
                  :triggers #{:focus :init}
                  :reaction (fn [this]
                              (when (platform/mac?)
                                (main-menu))))

(behavior ::remove-menu-close
                  :triggers #{:closed :blur}
                  :reaction (fn [this]
                               (when (platform/mac?)
                                 (unknown-menu))))

(behavior ::menu!
                  :triggers #{:menu!}
                  :reaction (fn [this e]
                              (let [items (sort-by :order (filter identity (object/raise-reduce this :menu+ [] e)))]
                                (-> (menu items)
                                    (show-menu)))
                              (dom/prevent e)
                              (dom/stop-propagation e)))
