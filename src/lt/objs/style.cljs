(ns lt.objs.style
  (:require [lt.object :as object]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.app :as app]
            [lt.objs.plugins :as plugins]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.files :as files]
            [lt.objs.deploy :as deploy]
            [lt.util.dom :as dom]
            [crate.binding :refer [bound subatom]])
  (:require-macros [lt.macros :refer [defui]]))

(defn css-expr [k v]
  (str (name k) ":" v " !important; "))

(defn selector [sel & body]
  (str sel " { " (apply str body) " }"))

(defn ->css [settings]
  (selector ".CodeMirror"
            (when (:line-height settings)
              (css-expr :line-height (str (:line-height settings) "em")))
            (when (:font-family settings)
              (css-expr :font-family (pr-str (:font-family settings))))
            (when (:font-size settings)
              (css-expr :font-size (str (:font-size settings) "pt")))))

(defui skin-style [this]
  [:link {:rel "stylesheet"
          :type "text/css"
          :id "skin-style"
          :href (bound (subatom this [:skin])
                       #(-> (object/raise-reduce app/app :skins+ {})
                            (get % "/core/css/skins/dark.css")
                            (plugins/adjust-path)))}])

(object/object* ::styles
                :init (fn [this]
                        [:div
                         (skin-style this)
                         [:style {:type "text/css"}
                          (bound this ->css)
                          ]]))

(def styles (object/create ::styles))

(object/behavior* ::style-on-init
                  :triggers #{:init}
                  :reaction (fn [app]
                              (dom/append (dom/$ :head) (:content @styles))
                              ))

(object/behavior* ::font-settings
                  :desc "Editor: Font settings"
                  :params [{:label "Font family"
                            :type :string}
                           {:label "Size (pt)"
                            :type :number}
                           {:label "Line height (em)"
                            :type :number}]
                  :type :user
                  :exclusive true
                  :triggers #{:object.instant}
                  :reaction (fn [this family size line-height]
                              (let [final {:font-family family}
                                    final (if size
                                            (assoc final :font-size size)
                                            final)
                                    final (if line-height
                                            (assoc final :line-height line-height)
                                            final)]
                                (object/merge! styles final))))

;;**********************************************************
;; Skins
;;**********************************************************

(object/behavior* ::provide-skin
                  :desc "Style: Provide skin"
                  :triggers #{:skins+}
                  :type :user
                  :params [{:label "name"} {:label "path"}]
                  :reaction (fn [this skins name path]
                              (assoc skins name path)
                              ))

(defn get-skins []
  (sort-by :text
           (for [[skin path] (object/raise-reduce app/app :skins+ {})]
              {:text (pr-str skin) :completion (pr-str skin)})))

(get-skins)

(object/behavior* ::set-skin
                  :triggers #{:object.instant}
                  :desc "Style: Set Light Table skin"
                  :params [{:label "skin"
                            :type :list
                            :items get-skins}]
                  :type :user
                  :reaction (fn [this skin]
                              (object/merge! styles {:skin skin})))

;;**********************************************************
;; themes
;;**********************************************************

(def prev-theme "")

(defn get-themes []
  (sort-by :text
           (for [[theme path] (object/raise-reduce app/app :themes+ {})]
              {:text (pr-str theme) :completion (pr-str theme)})))

(defui stylesheet [name]
  [:link {:rel "stylesheet"
          :type "text/css"
          :id (str "theme-" name)
          :href (-> (object/raise-reduce app/app :themes+ {})
                    (get name "/core/css/themes/default.css")
                    (plugins/adjust-path))}])

(defn load-theme [name]
  (when-not (empty? prev-theme)
    (dom/remove-class (dom/$ :#multi) prev-theme))
  (set! prev-theme (str "theme-" name))
  (dom/add-class (dom/$ :#multi) (str "theme-" name))
  (when-not (dom/$ (str "#theme-" name))
    (dom/append (dom/$ :head) (stylesheet name))))

(object/behavior* ::provide-theme
                  :desc "Style: Provide editor theme"
                  :triggers #{:themes+}
                  :type :user
                  :params [{:label "name"} {:label "path"}]
                  :reaction (fn [this themes name path]
                              (assoc themes name path)
                              ))


(object/behavior* ::set-theme
                  :triggers #{:object.instant :show}
                  :desc "Style: Set the editor theme"
                  :params [{:label "theme"
                            :type :list
                            :items get-themes}]
                  :type :user
                  :exclusive true
                  :reaction (fn [this sel]
                              (load-theme sel)
                              (editor/set-options this {:theme sel})))
