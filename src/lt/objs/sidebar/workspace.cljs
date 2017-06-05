(ns lt.objs.sidebar.workspace
  "Provide sidebar for managing workspaces and files within a workspace"
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.context :as ctx]
            [lt.objs.files :as files]
            [lt.objs.workspace :as workspace]
            [lt.objs.topbar :as topbar]
            [lt.objs.opener :as opener]
            [lt.objs.popup :as popup]
            [lt.objs.sidebar :as sidebar]
            [lt.objs.dialogs :as dialogs]
            [lt.objs.document :as document]
            [lt.objs.menu :as menu]
            [lt.util.dom :as dom]
            [lt.util.cljs :refer [->dottedkw]]
            [crate.binding :refer [bound subatom]]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [behavior defui]]))

(defn files-and-folders [path]
  (let [fs (workspace/files-and-folders path)]
    {:files (mapv #(object/create ::workspace.file %) (:files fs))
     :folders (mapv #(object/create ::workspace.folder %) (:folders fs))}))

(defn root-folder [path]
  (-> (object/create ::workspace.folder path)
      (object/add-tags [:workspace.folder.root])))

(defn root-file [path]
  (-> (object/create ::workspace.file path)
      (object/add-tags [:workspace.file.root])))

(defn add-child [parent child]
  (if (object/has-tag? child :workspace.file)
    (object/update! parent [:files] (fn [cur] (vec (concat #{child} cur))))
    (object/update! parent [:folders] (fn [cur] (vec (concat #{child} cur))))))

(defn remove-child [p child]
  (if (object/has-tag? child :workspace.file)
    (object/update! p [:files] (fn [cur] (vec (remove #{child} cur))))
    (object/update! p [:folders] (fn [cur] (vec (remove #{child} cur))))))

(defn find-by-path [path]
  (first (filter #(= (:path @%) path) (object/by-tag :tree-item))))

(declare tree)

(behavior ::add-ws-folder
          :triggers #{:workspace.add.folder!}
          :reaction (fn [this path]
                      (object/raise workspace/current-ws :add.folder! path)
                      ))

(behavior ::add-ws-file
          :triggers #{:workspace.add.file!}
          :reaction (fn [this path]
                      (object/raise workspace/current-ws :add.file! path)
                      (object/raise (first (object/by-tag :opener)) :open! path)
                      ))

(behavior ::on-open-ls
          :triggers #{:open!}
          :reaction (fn [this]
                      (object/merge! this {:open? true})
                      (when-not (:realized? @this)
                        (object/merge! this {:realized? true})
                        (object/merge! this (files-and-folders (:path @this)))
                        (let [folder (dom/$ :ul (object/->content this))
                              width (dom/scroll-width folder)]
                          (doseq [child (dom/children folder)]
                            (dom/css child {:width width}))))))

(behavior ::refresh
          :triggers #{:refresh!}
          :reaction (fn [this]
                      (doseq [f (concat (:files @this) (:folders @this))]
                        (object/destroy! f))
                      (object/raise workspace/current-ws :refresh (:path @this))
                      (object/merge! this (files-and-folders (:path @this)))
                      ))

(behavior ::on-close
          :triggers #{:close!}
          :reaction (fn [this]
                      (object/merge! this {:open? false})))

(behavior ::on-open-file
          :triggers #{:open!}
          :reaction (fn [this]
                      (object/raise opener/opener :open! (:path @this))))

(behavior ::on-remove
          :triggers #{:remove!}
          :reaction (fn [this item]
                      (if (object/has-tag? item :workspace.folder)
                        (object/raise workspace/current-ws :remove.folder! (:path @item))
                        (object/raise workspace/current-ws :remove.file! (:path @item)))))

(behavior ::on-clear
          :triggers #{:clear!}
          :reaction (fn [this]
                      (object/raise workspace/current-ws :clear!)))

(behavior ::on-ws-add
          :triggers #{:add}
          :reaction (fn [ws f]
                      (if (files/file? f)
                        (object/update! tree [:files] conj (root-file f))
                        (object/update! tree [:folders] conj (root-folder f)))))

(behavior ::on-ws-remove
          :triggers #{:remove}
          :reaction (fn [ws f]
                      (let [item (find-by-path f)]
                        (if (files/file? f)
                          (object/update! tree [:files] (fn [cur] (vec (remove #{item} cur))))
                          (object/update! tree [:folders] (fn [cur] (vec (remove #{item} cur)))))
                        (object/destroy! item))))

(behavior ::on-ws-set
          :triggers #{:set}
          :reaction (fn [ws]
                      (let [{:keys [folders files]} @ws]
                        (object/merge! tree {:files (mapv root-file files)
                                             :folders (mapv root-folder folders)
                                             :open-dirs #{}}))))

(behavior ::track-and-watch-open-dirs
          :triggers #{:open!}
          :reaction (fn [this]
                      (workspace/watch! (:path @this))
                      (object/update! tree [:open-dirs] conj (:path @this))))

(behavior ::untrack-closed-dirs
          :triggers #{:close!}
          :reaction (fn [this]
                      (object/update! tree [:open-dirs] disj (:path @this))))

(behavior ::watch-open-dirs-paths
          :triggers #{:watch-paths+}
          :reaction (fn [this cur]
                      (concat cur (:open-dirs @tree))))

(behavior ::watched.delete
          :triggers #{:watched.delete}
          :reaction (fn [ws path]
                      (when-let [child (find-by-path path)]
                        (when-let [p (find-by-path (files/parent path))]
                          (remove-child p child))
                        (object/destroy! child))))

(behavior ::watched.create
          :triggers #{:watched.create}
          :reaction (fn [ws path]
                      (when-not (and (find-by-path path)
                                     (not (re-seq files/ignore-pattern (files/basename path))))
                        (when-let [parent (find-by-path (files/parent path))]
                          (when (:realized? @parent)
                            (if (files/dir? path)
                              (object/update! parent [:folders] conj (object/create ::workspace.folder path))
                              (object/update! parent [:files] conj (object/create ::workspace.file path)))
                            )))))

(behavior ::on-drop
          :triggers #{:drop}
          :reaction (fn [this e]
                      (let [size (.-dataTransfer.files.length e)]
                        (loop [i 0]
                          (when (< i size)
                            (let [path (-> (.-dataTransfer.files e)
                                           (aget i)
                                           (.-path))]
                              (if (files/dir? path)
                                (object/raise workspace/current-ws :add.folder! path)
                                (object/raise workspace/current-ws :add.file! path)))
                            (recur (inc i)))))))

(behavior ::on-menu
          :triggers #{:menu!}
          :reaction (fn [this e]
                      (let [items (sort-by :order (object/raise-reduce this :menu-items []))]
                        (-> (menu/menu items)
                            (menu/show-menu)))))

(behavior ::on-root-menu
          :triggers #{:menu-items}
          :reaction (fn [this items]
                      (conj items
                            {:type "separator"
                             :order 9}
                            {:label "Remove from workspace"
                             :order 10
                             :click (fn [] (object/raise tree :remove! this))})
                      ))

(behavior ::subfile-menu
          :triggers #{:menu-items}
          :reaction (fn [this items]
                      (conj items
                            {:label "Duplicate"
                             :order 1
                             :click (fn [] (object/raise this :duplicate!))}
                            {:label "Rename"
                             :order 2
                             :click (fn [] (object/raise this :start-rename!))}
                            {:label "Delete"
                             :order 3
                             :click (fn [] (object/raise this :delete!))})))

(behavior ::subfolder-menu
          :triggers #{:menu-items}
          :reaction (fn [this items]
                      (conj items
                            {:label "New file"
                             :order 0
                             :click (fn [] (object/raise this :new-file!))}
                            {:label "Rename"
                             :order 2
                             :click (fn [] (object/raise this :start-rename!))}
                            {:type "separator"
                             :order 3}
                            {:label "New folder"
                             :order 4
                             :click (fn [] (object/raise this :new-folder!))}
                            {:label "Delete folder"
                             :order 5
                             :click (fn [] (object/raise this :delete!))}
                            {:label "Refresh folder"
                             :order 6
                             :click (fn [] (object/raise this :refresh!))}
                            )))

(behavior ::force-delete-file
          :triggers #{:force-delete!}
          :reaction (fn [this]
                      (files/delete! (:path @this))
                      (dom/remove (object/->content this))
                      (object/raise workspace/current-ws :watched.delete (:path @this))
                      (object/destroy! this)))

(behavior ::delete-file
          :triggers #{:delete!}
          :reaction (fn [this]
                      (popup/popup! {:header "Delete this file?"
                                     :body (str "This will delete " (:path @this) " from disk and cannot be undone.")
                                     :buttons [{:label "Delete file"
                                                :action (fn [] (object/raise this :force-delete!))}
                                               popup/cancel-button]})))

(behavior ::force-delete-folder
          :triggers #{:force-delete!}
          :reaction (fn [this]
                      (files/delete! (:path @this))
                      (dom/remove (object/->content this))
                      (object/raise workspace/current-ws :watched.delete (:path @this))
                      (object/destroy! this)))

(behavior ::delete-folder
          :triggers #{:delete!}
          :reaction (fn [this]
                      (popup/popup! {:header "Delete this folder?"
                                     :body (str "This will delete " (:path @this) " from disk and cannot be undone.")
                                     :buttons [{:label "Delete folder"
                                                :action (fn [] (object/raise this :force-delete!))}
                                               popup/cancel-button]})))

(behavior ::new-file!
          :triggers #{:new-file!}
          :reaction (fn [this]
                      (let [ext (if-let [ffile (-> @this :files first)]
                                  (when-let [path (-> ffile deref :path)] (files/ext path))
                                  "txt")
                            path (files/join (:path @this) (str "untitled." ext))
                            final-path (files/next-available-name path)
                            folder (object/create ::workspace.file final-path)]
                        (object/update! this [:files] conj folder)
                        (object/merge! this {:open? true})
                        (files/save final-path "")
                        (object/raise opener/opener :open! final-path)
                        (object/raise folder :start-rename!))))

(behavior ::new-folder!
          :triggers #{:new-folder!}
          :reaction (fn [this]
                      (let [path (files/join (:path @this) "NewFolder")
                            final-path (files/next-available-name path)
                            folder (object/create ::workspace.folder final-path)]
                        (object/update! this [:folders] conj folder)
                        (object/merge! this {:open? true})
                        (files/mkdir final-path)
                        (object/raise folder :start-rename!))))

(defui rename-input [this path]
  [:input.rename {:type "text" :value path :style {:width "100%"}}]
  :focus (fn []
           (object/raise this :rename.focus))
  :blur (fn []
          (object/raise this :rename.blur)))

(object/object* ::rename-dialog
                :tags #{:tree.rename}
                :max-height 130
                :origin nil
                :renaming? true
                :order 1
                :behaviors #{::rename-focus ::rename-blur ::rename-submit ::rename-cancel ::rename-close! ::rename}
                :init (fn [this origin]
                        (let [t (if (files/dir? (:path @origin))
                                  "folder"
                                  "file")
                              rel-path (:path @origin)]
                          (object/merge! this {:origin origin})
                           [:div.rename-dialog
                            [:p "Enter path for " t ":"]
                            (rename-input this rel-path)
                            ])))

(defn popup-same-name-error
  [filename origin]
  (let [t (if (object/has-tag? origin :workspace.folder)
            "Folder"
            "File")]
    (popup/popup! {:header (str t " already exists.")
                   :body (str t " " filename " already exists, you'll have to pick a different name.")
                   :buttons [{:label "ok"
                              :post-action (fn []
                                             (object/raise origin :rename.cancel)
                                             (object/raise origin :start-rename!))}]})))

(defn popup-invalid-path-error
  [invalid-path origin]
  (popup/popup! {:header "Path does not exist."
                 :body (str "Path '" invalid-path "' does not exist, you'll have to pick a different one.")
                 :buttons [{:label "ok"
                            :post-action (fn []
                                           (object/raise origin :rename.cancel)
                                           (object/raise origin :start-rename!))}]}))

(defn rename-file
  [origin path neue]
  ;; When moving a file, current-ws likes to be told about the change before
  ;; the actual move so the editor tab will not close
  (let [folder-root? (object/has-tag? origin :workspace.folder.root)
        file-root?   (object/has-tag? origin :workspace.file.root)
        old-parent-path  (files/parent path)
        new-parent-path  (files/parent neue)]
    (if (or folder-root? file-root?)
      (object/raise workspace/current-ws :rename! path neue)
      (object/raise workspace/current-ws :watched.rename path neue))
    (files/move! path neue)
    (object/merge! origin {:path neue})
    (when-not (or folder-root? file-root?)
      (remove-child (find-by-path old-parent-path) origin)
      (add-child (find-by-path new-parent-path) origin))))

(defn rename-folder
  [origin path neue]
  (let [folder-root? (object/has-tag? origin :workspace.folder.root)
        file-root?   (object/has-tag? origin :workspace.file.root)
        old-parent-path  (files/parent path)
        new-parent-path  (files/parent neue)]
    (object/merge! origin {:path neue :realized? false})
    (files/move! path neue)
    (when-not (or folder-root? file-root?)
      (remove-child (find-by-path old-parent-path) origin)
      (add-child (find-by-path new-parent-path) origin))
    (let [docs (get-in @document/manager [:files])
          old-path (string/join [path files/separator])
          affected (filter (fn [x] (.startsWith x old-path)) (keys docs))]
      (doseq [old-fpath affected]
        (let [new-fpath (string/replace-first old-fpath path neue)]
          (document/move-doc old-fpath new-fpath))))
    (if (or folder-root? file-root?)
        (object/raise workspace/current-ws :rename! path neue)
        (object/raise workspace/current-ws :watched.rename path neue))))

(behavior ::rename
          :triggers #{:rename}
          :reaction (fn [this n]
                      (let [origin (:origin @this)
                            path (:path @origin)
                            neue n]
                        (when-not (= path neue)
                          ;; In OSX rename is case-sensistive but exists check isn't
                          (if (and (not= (string/lower-case path) (string/lower-case neue)) (files/exists? neue))
                            (popup-same-name-error neue origin)
                            (if (not (files/exists? (files/parent neue)))
                              (popup-invalid-path-error (files/parent neue) origin)
                              (let [is-folder?   (object/has-tag? origin :workspace.folder)
                                    is-file?     (object/has-tag? origin :workspace.file)
                                    folder-root? (object/has-tag? origin :workspace.folder.root)
                                    file-root?   (object/has-tag? origin :workspace.file.root)
                                    old-parent-path  (files/parent path)
                                    new-parent-path  (files/parent neue)]

                                (when is-file?
                                  (rename-file origin path neue))

                                (when is-folder?
                                  (rename-folder origin path neue)))))))))

(behavior ::start-rename
          :triggers #{:start-rename!}
          :reaction (fn [this]
                      (object/merge! this {:renaming? true})
                      (let [p (object/create ::rename-dialog this)]
                        (object/merge! p {:origin this})
                        (topbar/add-item topbar/topbar p)
                        (object/raise topbar/topbar :toggle p)

                        (let [input (dom/$ :input.rename (object/->content p))
                              len (count (-> input (dom/val)))
                              basename (files/basename (:path @this))
                              basename-len (count basename)
                              ext-len (- basename-len (count (files/without-ext basename)))]
                          (dom/focus input)
                          (dom/selection input (- len basename-len) (- len ext-len) "forward")))))

(behavior ::rename-focus
          :triggers #{:rename.focus}
          :reaction (fn [this]
                      (ctx/in! :tree.rename this)))

(behavior ::rename-submit
          :triggers #{:rename.submit!}
          :reaction (fn [this]
                      (let [val (-> (dom/$ :input.rename (object/->content this))
                                    (dom/val))]
                        (object/merge! this {:renaming? false})
                        (object/raise this :rename val)
                        (object/raise this :rename.close!))))

(behavior ::rename-blur
          :triggers #{:rename.blur}
          :reaction (fn [this]
                      (ctx/out! :tree.rename)
                      (when (:renaming? @this)
                        (object/raise this :rename.submit!))))

(behavior ::rename-cancel
          :triggers #{:rename.cancel!}
          :reaction (fn [this]
                      (object/merge! this {:renaming? false})
                      (object/raise this :rename.close!)
                      ))

(behavior ::rename-close!
          :triggers #{:rename.close!}
          :reaction (fn [this]
                      (object/raise topbar/topbar :toggle this)
                      (object/destroy! this)
                      (if-let [others (-> (object/by-tag :tree.rename)
                                          (seq))]
                        (ctx/in! :tree.rename (last others))
                        (ctx/out! :tree.rename)
                        )))

(behavior ::duplicate
          :triggers #{:duplicate!}
          :reaction (fn [this]
                      (let [base-name (files/without-ext (files/basename (:path @this)))
                            new-name (str base-name " copy." (files/ext (:path @this)))
                            new-path (files/join (files/parent (:path @this)) new-name)]
                        (files/copy (:path @this) new-path))))

(behavior ::destroy-sub-tree
          :trigger #{:destroy}
          :reaction (fn [this]
                      (doseq [f (concat (:files @this) (:folders @this))]
                        (object/destroy! f))))

(defui file-toggle [this]
  [:p (bound this #(files/basename (:path @this)))]
  :contextmenu (fn [e]
                 (object/raise this :menu! e)
                 (dom/prevent e)
                 (dom/stop-propagation e))
  :dblclick (fn [e]
              (object/raise this :dblopen!))
  :click (fn [e]
           (object/raise this :open!)))

(defui folder-toggle [this]
  [:p.folder (bound this #(str (files/basename (:path @this)) files/separator))]
  :contextmenu (fn [e]
                 (object/raise this :menu! e)
                 (dom/prevent e)
                 (dom/stop-propagation e))
  :click (fn []
           (if-not (:open? @this)
             (object/raise this :open!)
             (object/raise this :close!))))

(defui sub-folders [{:keys [folders files open? path root?]}]
  [:ul {:class (str (when-not root? "sub ")
                    (when open? "opened"))}
   (for [f (sort-by #(-> @% :path files/basename string/lower-case) folders)]
     (object/->content f))
   (for [f (sort-by #(-> @% :path files/basename string/lower-case) files)]
     (object/->content f))])

(object/object* ::workspace.file
                :tags #{:workspace.file :tree-item}
                :path ""
                :init (fn [this path]
                        (object/merge! this {:path path})
                        [:li
                         [:div.tree-item
                          (file-toggle this)]]))

(object/object* ::workspace.folder
                :tags #{:workspace.folder :tree-item}
                :path ""
                :open? false
                :realized? false
                :folders []
                :files []
                :init (fn [this path]
                        (object/merge! this {:path path})
                        [:li
                         [:div.tree-item
                          (when path
                            (folder-toggle this))
                          [:div
                           (bound this sub-folders)]]]))

(object/object* ::workspace.root
                :tags #{:workspace.root}
                :root? true
                :open-dirs #{}
                :files []
                :folders []
                :open? true
                :init (fn [this]
                        [:div.tree-root
                         (bound this sub-folders)]))

(def tree (object/create ::workspace.root))

(defui input [type event]
  [:input {:type "file" type true :style "display:none;"}]
  :change (fn []
            (this-as me
                     (when-not (empty? (dom/val me))
                       (object/raise tree event (dom/val me))))))

(defn open-folder []
  (dialogs/dir tree :workspace.add.folder!))

(defn open-file []
  (dialogs/file tree :workspace.add.file!))

(defui button [name action]
  [:li name]
  :click action)

(defn recent [this]
  (object/raise this :recent!))

(defui recents-item [this]
  [:li
   [:ul.folders
    (for [f (:folders @this)]
      [:li (files/basename f) files/separator])]
   [:ul.files
    (for [f (:files @this)]
      [:li (files/basename f)])]]
  :contextmenu (fn [e]
                 (object/raise this :menu! e)
                 (dom/prevent e)
                 (dom/stop-propagation e))
  :click (fn []
           (object/raise this :select!)))

(defui back-button [this]
  [:h2 "Select a workspace"]
  :click (fn []
           (object/raise this :tree!)))

(defui recents [this rs]
  [:div
   (back-button this)
   [:ul
    (for [r rs]
      (object/->content r))]])

(declare sidebar-workspace)

(behavior ::recent!
          :triggers #{:recent!}
          :reaction (fn [this]
                      (doseq [r (:recents @this)]
                        (object/destroy! r))
                      (->> (workspace/all)
                           (map #(object/create ::recent-workspace %))
                           (hash-map :recents)
                           (object/merge! this))))

(behavior ::tree!
          :triggers #{:tree!}
          :reaction (fn [this]
                      (doseq [r (:recents @this)]
                        (object/destroy! r))
                      (object/merge! this {:recents nil})))

(behavior ::recent.select!
          :triggers #{:select!}
          :reaction (fn [this]
                      (workspace/open workspace/current-ws (:path @this))
                      (object/raise sidebar-workspace :tree!)
                      ))

(behavior ::recent.delete!
          :triggers #{:delete!}
          :reaction (fn [this]
                      (when (= (:file @workspace/current-ws)
                               (files/basename (:path @this)))
                        (object/raise tree :clear!))
                      (files/delete! (:path @this))
                      (object/raise sidebar-workspace :recent!)))

(object/object* ::recent-workspace
                :tags #{:recent-workspace}
                :init (fn [this r]
                        (object/merge! this r)
                        (recents-item this)))

(defn ws-class [ws]
  (str "workspace" (when (:recents ws)
                     " recents")))

(defui workspace-ui [this]
  [:div {:class (bound this ws-class)}
   [:div.wstree
    [:ul.buttons
     ;[:li.sep "Open:"]
     (button "folder" open-folder)
     [:li.sep "|"]
     (button "file" open-file)
     [:li.sep "|"]
     (button "recent" #(recent this))
     ]
    [:ul.root
     (object/->content tree)]]
   [:div.recent
    (bound this (fn [sw]
                  (recents this (:recents sw))))
    ]]
  :dragover (fn [e]
              (set! (.-dataTransfer.dropEffect e) "move")
              (object/raise this :dragover e)
              (dom/prevent e)
              false)
  :drop (fn [e]
          (object/raise this :drop e)
          (dom/stop-propagation e)
          (dom/prevent e))
  :contextmenu (fn [e]
                 (object/raise this :menu! e)))

(object/object* ::sidebar.workspace
                :tags #{:sidebar.workspace}
                :label "workspace"
                :order -7
                :init (fn [this]
                        (workspace-ui this)
                        ))

;(dom/trigger (input) :click)
(behavior ::sidebar-menu
          :triggers #{:menu-items}
          :reaction (fn [this items]
                      (conj items
                            {:label "Add folder"
                             :click (fn [] (cmd/exec! :workspace.add-folder))}
                            {:label "Add file"
                             :click (fn [] (cmd/exec! :workspace.add-file))}
                            {:label "Open recent workspace"
                             :click (fn [] (cmd/exec! :workspace.show-recents))}
                            {:type "separator"}
                            {:label "Clear workspace"
                             :click (fn [] (object/raise tree :clear!))})))

(behavior ::recent-menu
          :triggers #{:menu-items}
          :reaction (fn [this items]
                      (conj items
                            {:label "Delete Workspace"
                             :click (fn [] (object/raise this :delete!))})))

(behavior ::workspace.open-on-start
          :triggers #{:init}
          :type :user
          :desc "Workspace: Show workspace on start"
          :reaction (fn [this]
                      (cmd/exec! :workspace.show)))

(def sidebar-workspace (object/create ::sidebar.workspace))

(sidebar/add-item sidebar/sidebar sidebar-workspace)

(cmd/command {:command :workspace.add-folder
              :desc "Workspace: add folder"
              :exec (fn []
                      (open-folder))})

(cmd/command {:command :workspace.add-file
              :desc "Workspace: add file"
              :exec (fn []
                      (open-file))})

(cmd/command {:command :workspace.show
              :desc "Workspace: Toggle workspace tree"
              :exec (fn [force?]
                      (object/raise sidebar/sidebar :toggle sidebar-workspace {:transient? false :force? force?}))})

(cmd/command {:command :workspace.rename.cancel!
              :desc "Workspace: Cancel rename"
              :hidden true
              :exec (fn []
                      (when-let [c (ctx/->obj :tree.rename)]
                        (object/raise c :rename.cancel!)))})

(cmd/command {:command :workspace.rename.submit!
              :desc "Workspace: Submit rename"
              :hidden true
              :exec (fn []
                      (when-let [c (ctx/->obj :tree.rename)]
                        (object/raise c :rename.submit!)))})

(cmd/command {:command :workspace.show-recents
              :desc "Workspace: Open recent workspace"
              :exec (fn []
                      (cmd/exec! :workspace.show :force)
                      (recent sidebar-workspace))})
