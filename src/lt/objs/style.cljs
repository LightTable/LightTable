(ns lt.objs.style
  (:require [lt.object :as object]
            [lt.objs.settings :as settings]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.app :as app]
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

(defn ->skin [skin]
  (let [path (deploy/in-lt (str "core/css/skins/" (or skin "dark") ".css"))
        path (if (files/exists? path)
               path
               (deploy/in-lt (str "core/css/skins/dark.css")))]
    (:content (files/open-sync path))))

(defui skin-style [this]
  [:link {:rel "stylesheet"
          :type "text/css"
          :id "skin-style"
          :href (bound (subatom this [:skin]) #(str "/core/css/skins/" (or % "dark") ".css"))}])

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

(defn get-skins []
  (for [f (files/ls-sync (deploy/in-lt "core/css/skins") {:files true})
        :let [file (files/without-ext f)]]
    {:text (pr-str file) :completion (pr-str file)}))

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
  (for [f (files/ls-sync (deploy/in-lt "core/css/themes") {:files true})
        :let [file (files/without-ext f)]]
    {:text (pr-str file) :completion (pr-str file)}))

(defui stylesheet [name]
  [:link {:rel "stylesheet"
          :type "text/css"
          :id (str "theme-" name)
          :href (str "/core/css/themes/" name ".css")}])

(defn load-theme [name]
  (when-not (empty? prev-theme)
    (dom/remove-class (dom/$ :#multi) prev-theme))
  (set! prev-theme (str "theme-" name))
  (dom/add-class (dom/$ :#multi) (str "theme-" name))
  (when-not (dom/$ (str "#theme-" name))
    (dom/append (dom/$ :head) (stylesheet name))))

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
