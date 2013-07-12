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
              (css-expr :line-height (:line-height settings)))
            (when (:font-family settings)
              (css-expr :font-family (pr-str (:font-family settings))))
            (css-expr :font-size (str (:font-size settings) "pt"))))

(defn ->skin [skin]
  (let [path (deploy/in-lt (str "css/skins/" (or skin "dark") ".css"))
        path (if (files/exists? path)
               path
               (deploy/in-lt (str "css/skins/dark.css")))]
    (:content (files/open-sync path))))

(defui skin-style []
  [:link {:rel "stylesheet"
          :type "text/css"
          :id "skin-style"
          :href (bound (subatom settings/settings [:skin]) #(deploy/in-lt (str "css/skins/" (or % "dark") ".css")))}])

(object/object* ::styles
                :triggers []
                :behaviors []
                :init (fn [this]
                        [:div
                         (skin-style)
                         [:style {:type "text/css"}
                          (bound settings/settings ->css)]]))

(def styles (object/create ::styles))

(object/behavior* ::style-on-init
                  :triggers #{:init}
                  :reaction (fn [app]
                              (dom/append (dom/$ :head) (:content @styles))
                              ))

(object/tag-behaviors :app [::style-on-init])

;;**********************************************************
;; font family
;;**********************************************************

(def font-family-options (cmd/options-input {:placeholder "editor font"}))

(object/behavior* ::set-font-family
                  :triggers #{:select}
                  :reaction (fn [this v]
                              (cmd/exec-active! v)))

(object/add-behavior! font-family-options ::set-font-family)

(cmd/command {:command :font-family
              :desc "Style: Set editor font-face"
              :options font-family-options
              :exec (fn [v]
                      (settings/store! :font-family v)
                      )})


;;**********************************************************
;; font size
;;**********************************************************

(def font-size-options (cmd/options-input {:placeholder "font size"}))

(object/behavior* ::set-font-size
                  :triggers #{:select}
                  :reaction (fn [this v]
                              (cmd/exec-active! v)))

(object/add-behavior! font-size-options ::set-font-size)

(cmd/command {:command :font-size
              :desc "Style: Set font size"
              :options font-size-options
              :exec (fn [v]
                      (settings/store! :font-size v)
                      )})


;;**********************************************************
;; line height
;;**********************************************************

(def line-height-options (cmd/options-input {:placeholder "e.g. 12px or 1.2em"}))

(object/behavior* ::set-line-height
                  :triggers #{:select}
                  :reaction (fn [this v]
                              (cmd/exec-active! v)))

(object/add-behavior! line-height-options ::set-line-height)

(cmd/command {:command :line-height
              :desc "Style: Set line height"
              :options line-height-options
              :exec (fn [v]
                      (settings/store! :line-height v)
                      )})


;;**********************************************************
;; Skins
;;**********************************************************

(defn get-skins []
  (for [f (files/ls-sync (deploy/in-lt "css/skins") {:files true})]
    {:item (files/without-ext f)}))

(def skin-selector (cmd/filter-list {:items get-skins
                                     :key :item
                                     :placeholder "skin"}))

(object/behavior* ::set-skin-on-select
                  :triggers #{:select}
                  :reaction (fn [this sel]
                              (cmd/exec-active! (:item sel))))

(object/tag-behaviors :skin-selector [::set-skin-on-select])
(object/add-tags skin-selector [:skin-selector])

(cmd/command {:command :skin
          :desc "Style: Change skin"
          :options skin-selector
          :exec (fn [sel]
                  (settings/store! :skin sel)
                  (object/raise skin-selector :clear!)
                  )})

(object/behavior* ::set-skin
                  :triggers #{:object.instant}
                  :reaction (fn [this skin]
                              (settings/store! :skin skin)))

;;**********************************************************
;; themes
;;**********************************************************

(def prev-theme "")

(defn get-themes []
  (for [f (files/ls-sync (deploy/in-lt "css/themes") {:files true})]
    {:item (files/without-ext f)}))

(defui stylesheet [name]
  [:link {:rel "stylesheet"
          :type "text/css"
          :id (str "theme-" name)
          :href (deploy/in-lt (str "css/themes/" name ".css"))}])

(defn load-theme [name]
  (dom/add-class (dom/$ :#multi) name)
  (when-not (empty? prev-theme)
    (dom/remove-class (dom/$ :#multi) prev-theme))
  (set! prev-theme name)
  (when-not (dom/$ (str "#theme-" name))
    (dom/append (dom/$ :head) (stylesheet name))))

(def theme-selector (cmd/filter-list {:items get-themes
                                      :key :item
                                      :placeholder "theme"}))

(object/behavior* ::set-theme-on-select
                  :triggers #{:select}
                  :reaction (fn [this sel]
                              (cmd/exec-active! (:item sel))))

(object/behavior* ::load-theme-on-init
                  :triggers #{:init}
                  :reaction (fn [app]
                              (when-let [theme (settings/fetch :theme)]
                                (load-theme theme))))

(object/behavior* ::set-theme
                  :triggers #{:object.instant :show}
                  :exclusive true
                  :reaction (fn [this sel]
                              (load-theme sel)
                              (editor/set-options this {:theme sel})))

(object/tag-behaviors :app [::load-theme-on-init])
(object/tag-behaviors :theme-selector [::set-theme-on-select])
(object/add-tags theme-selector [:theme-selector])

(cmd/command {:command :theme
              :desc "Style: Change editor theme"
              :options theme-selector
              :exec (fn [sel]
                      (load-theme sel)
                      (settings/store! :theme sel)
                      (object/raise pool/pool :theme-change sel)
                      (object/raise theme-selector :clear!))})
