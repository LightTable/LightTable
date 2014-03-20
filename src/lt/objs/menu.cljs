(ns lt.objs.menu
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.keyboard :as keyboard]
            [lt.objs.platform :as platform]
            [lt.objs.app :as app]
            [lt.util.dom :as dom]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [behavior]]))

(def gui (js/require "nw.gui"))

(defn create-menu [type]
  (let [m (.-Menu gui)]
    (if type
      (m. (js-obj "type" type))
      (m.))))

(def menu-instance (create-menu))

(defn submenu [items]
  (let [menu (create-menu nil)]
    (doseq [i items
            :when i]
      (.append menu (menu-item i)))
    menu))

(defn menu-item [opts]
  (let [mi (.-MenuItem gui)
        opts (if-not (:submenu opts)
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
    (mi. (clj->js opts))))

(defn clear! [menu]
  (dotimes [i (.-items.length (or menu menu-instance))]
    (.removeAt (or menu menu-instance) 0)))

(defn menu [items]
  (clear!)
  (doseq [i items]
    (.append menu-instance (menu-item i)))
  menu-instance)

(defn zoom-adjust [zoom v]
  (cond
   (= 0 zoom) v
   (> zoom 0) (int (* v (+ 1 (* zoom 0.20))))
   (< zoom 0) (int (* v (/ -1 (+ -1 (* zoom 0.27)))))))

(defn show-menu [m x y]
  (let [[x y] (if-let [zoom (app/zoom-level)]
                [(zoom-adjust zoom x) (zoom-adjust zoom y)]
                [x y])]
    (.popup m x y)))

(dom/on (dom/$ :body) :contextmenu (fn [e]
                                     (dom/prevent e)
                                     (dom/stop-propagation e)
                                     false))

(def menubar
  (create-menu "menubar"))

(defn set-menubar [items]
  (clear! menubar)
  (doseq [i items
          :when i]
    (.append menubar (menu-item i)))
  (when-not (.-menu app/win)
    (set! (.-menu app/win) menubar)))


(defn command->menu-binding [cmd]
  (let [ks (first (keyboard/cmd->current-binding cmd))
        multi-part? (next (string/split ks " "))
        ks (string/split ks "-")]
    (when (and (seq ks) (not multi-part?))
      {:key (if (= "space" (last ks))
              " "
              (last ks))
       :modifiers (when (> (count ks) 1)
                    (string/join "-" (butlast ks)))})))

(defn cmd-item
  ([label cmd] (cmd-item label cmd {}))
  ([label cmd opts]
   (merge
    {:label label
     :click (fn [] (cmd/exec! cmd))}
    opts
    (command->menu-binding cmd opts))))


(defn main-menu []
  (set-menubar [
                (when (platform/mac?)
                  {:label "" :submenu [(cmd-item "About Light Table" :version)
                                       {:type "separator"}
                                       {:label "Hide Light Table" :key "h" :selector "hide:"}
                                       {:label "Hide Others" :key "h" :modifiers "cmd-alt" :selector "hideOtherApplications:"}
                                       {:type "separator"}
                                       (cmd-item "Quit Light Table" :quit {:key "q"})]})
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
                  {:label "Edit" :submenu [(cmd-item "Undo" :editor.undo {:selector "undo:" :key "z"})
                                           (cmd-item "Redo" :editor.redo {:selector "redo:" :key "z" :modifiers "cmd-shift"})
                                           {:type "separator"}
                                           (cmd-item "Cut" :editor.cut {:selector "cut:" :key "x"})
                                           (cmd-item "Copy" :editor.copy {:selector "copy:" :key "c"})
                                           (cmd-item "Paste" :editor.paste {:selector "paste:" :key "v"})
                                           (cmd-item "Select All" :editor.select-all {:selector "selectAll:" :key "a"})
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
                                         (cmd-item "Console" :toggle-console)]}

                {:label "Window" :submenu [(cmd-item "Minimize" :window.minimize)
                                           (cmd-item "Maximize" :window.maximize)
                                           (cmd-item "Fullscreen" :window.fullscreen)]}
                {:label "Help" :submenu [(cmd-item "Documentation" :show-docs)
                                         (when-not (platform/mac?)
                                           (cmd-item "About Light Table" :version))]}
                ]))

(behavior ::create-menu
           :triggers #{:init}
           :reaction (fn [this]
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
                              (when (or (platform/mac?)
                                        (not (.-menu app/win)))
                                (set! (.-menu app/win) menubar))))

(behavior ::remove-menu-close
                  :triggers #{:closed :blur}
                  :reaction (fn [this]
                              (when (platform/mac?)
                                (set! (.-menu app/win) nil))))

(behavior ::menu!
                  :triggers #{:menu!}
                  :reaction (fn [this e]
                              (let [items (sort-by :order (filter identity (object/raise-reduce this :menu+ [])))]
                                (-> (menu items)
                                    (show-menu (.-clientX e) (.-clientY e))))
                              (dom/prevent e)
                              (dom/stop-propagation e)))
