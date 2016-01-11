(ns lt.objs.menu
  "Provide Electron-based menus and associated behaviors"
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
                                      (catch :default e
                                        (js/lt.objs.console.error e)))))
               opts)]
    (MenuItem. (clj->js opts))))

(defn submenu [items]
  (let [menu (Menu.)]
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
     :click (when-not (:role opts)
              (fn [] (cmd/exec! cmd)))}
    opts
    (command->menu-binding cmd))))

(defn unknown-menu []
  (set-menubar [(when (platform/mac?)
                  {:label "" :submenu [(cmd-item "About Light Table" :version)
                                       {:type "separator"}
                                       {:label "Hide Light Table" :accelerator "Command+H" :role "hide"}
                                       {:label "Hide Others" :accelerator "Command+Alt+H" :role "hideothers"}
                                       {:type "separator"}
                                       (cmd-item "Quit Light Table" :quit {:accelerator "Command+Q"})]})

                {:label "Edit" :submenu [(cmd-item "Undo" :editor.undo {:role "undo" :accelerator "CommandOrControl+Z"})
                                         (cmd-item "Redo" :editor.redo {:role "redo" :accelerator "Command+Shift+Z"})
                                         {:type "separator"}
                                         (cmd-item "Cut" :editor.cut {:role "cut" :accelerator "CommandOrControl+X"})
                                         (cmd-item "Copy" :editor.copy {:role "copy" :accelerator "CommandOrControl+C"})
                                         (cmd-item "Paste" :editor.paste {:role "paste" :accelerator "CommandOrControl+V"})
                                         (cmd-item "Select All" :editor.select-all {:role "selectall" :accelerator "CommandOrControl+A"})
                                         ]}

                {:label "Window" :submenu [(cmd-item "Minimize" :window.minimize {:role "minimize" :accelerator "Command+M"})
                                           (cmd-item "Close window" :window.close {:role "close" :accelerator "Command+W"})]}

                {:label "Help" :submenu []}]))

(defn main-menu []
  (set-menubar [(when (platform/mac?)
                  {:label "" :submenu [(cmd-item "About Light Table" :version)
                                       {:type "separator"}
                                       {:label "Hide Light Table" :accelerator "Command+H" :role "hide"}
                                       {:label "Hide Others" :accelerator "Command+Alt+H" :role "hideothers"}
                                       {:type "separator"}
                                       (cmd-item "Quit Light Table" :quit {:accelerator "Command+Q"})]})

                {:label "&File" :submenu (into [(cmd-item "New file" :new-file)
                                                (cmd-item "Open file" :open-file)
                                                {:label "Open folder" :click #(do
                                                                                (cmd/exec! :workspace.show :force)
                                                                                (cmd/exec! :workspace.add-folder))}
                                                (cmd-item "Open recent workspace" :workspace.show-recents {})
                                                (cmd-item "Save file" :save)
                                                (cmd-item "Save file as.." :save-as)
                                                (cmd-item "Close file" :tabs.close)
                                                {:label "Settings" :submenu [(cmd-item "User keymap" :keymap.modify-user)
                                                                             (cmd-item "User behaviors" :behaviors.modify-user)
                                                                             (cmd-item "User script" :user.modify-user)]}
                                                {:type "separator"}
                                                (cmd-item "New window" :window.new)
                                                (cmd-item "Close window" :window.close)]
                                               (when-not (platform/mac?)
                                                 [{:type "separator"}
                                                  (cmd-item "About Light Table" :version)
                                                  (cmd-item "Quit Light Table" :quit {:accelerator "Control+Q"})]))}

                (if (platform/mac?)
                  {:label "Edit" :submenu [(cmd-item "Undo" :editor.undo {:role "undo" :accelerator "CommandOrControl+Z"})
                                           (cmd-item "Redo" :editor.redo {:role "redo" :accelerator "CommandOrControl+Shift+Z"})
                                           {:type "separator"}
                                           (cmd-item "Cut" :editor.cut {:role "cut" :accelerator "CommandOrControl+X"})
                                           (cmd-item "Copy" :editor.copy {:role "copy" :accelerator "CommandOrControl+C"})
                                           (cmd-item "Paste" :editor.paste {:role "paste" :accelerator "CommandOrControl+V"})
                                           (cmd-item "Select All" :editor.select-all {:role "selectall" :accelerator "CommandOrControl+A"})]}
                  {:label "&Edit" :submenu [(cmd-item "Undo" :editor.undo)
                                            (cmd-item "Redo" :editor.redo)
                                            {:type "separator"}
                                            (cmd-item "Cut" :editor.cut)
                                            (cmd-item "Copy" :editor.copy)
                                            (cmd-item "Paste" :editor.paste)
                                            (cmd-item "Select All" :editor.select-all)]})

                {:label "&View" :submenu [(cmd-item "Workspace" :workspace.show)
                                          (cmd-item "Connections" :show-connect)
                                          (cmd-item "Navigator" :navigate-workspace-transient)
                                          (cmd-item "Commands" :show-commandbar-transient)
                                          (cmd-item "Plugin Manager" :plugin-manager.show)
                                          {:type "separator"}
                                          (cmd-item "Language docs" :docs.search.show)
                                          {:type "separator"}
                                          (cmd-item "Console" :toggle-console)
                                          (cmd-item "Developer Tools" :dev-inspector)]}

                {:label "&Window" :submenu [(cmd-item "Minimize" :window.minimize)
                                            (cmd-item "Maximize" :window.maximize)
                                            (cmd-item "Fullscreen" :window.fullscreen)]}

                {:label "&Help" :submenu [(cmd-item "Documentation" :show-docs)
                                          {:label "Report an Issue" :click #(do
                                                                              (cmd/exec! :add-browser-tab "https://github.com/LightTable/LightTable/issues?state=open"))}
                                          (when-not (platform/mac?)
                                            (cmd-item "About Light Table" :version))]}]))

(behavior ::create-menu
          :triggers #{:init}
          :reaction (fn [this]
                      (when (platform/mac?)
                        (set! (.-menu app/win) nil)
                        )
                      (main-menu)))

(behavior ::recreate-menu
          :debounce 20
          :triggers #{:app.keys.load}
          :reaction (fn [app]
                      (when (platform/mac?)
                        (main-menu))))

(behavior ::set-menu
          :triggers #{:focus}
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
