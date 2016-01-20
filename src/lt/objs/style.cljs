(ns lt.objs.style
  "Provide styling behaviors, themes and skins"
  (:require [lt.object :as object]
            [lt.objs.sidebar.command :as cmd]
            [lt.objs.app :as app]
            [lt.objs.tabs :as tabs]
            [lt.objs.context :as ctx]
            [lt.objs.plugins :as plugins]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.files :as files]
            [lt.objs.deploy :as deploy]
            [lt.util.dom :as dom]
            [lt.util.load :as load]
            [crate.binding :refer [bound -value subatom]]
            [crate.compiler :refer [dom-attr]]
            [clojure.string :as string])
  (:require-macros [lt.macros :refer [behavior defui]]))

(defn css-expr [k v]
  (str (name k) ":" v " !important; "))

(defn selector [sel & body]
  (str sel " { " (apply str body) " }"))

(defn str-font-family [x]
  (if (vector? x)
    (string/join ", " (map pr-str x))
    (pr-str x)))

(defn ->css [settings]
  (selector ".CodeMirror"
            (when (:line-height settings)
              (css-expr :line-height (str (:line-height settings) "em")))
            (when (:font-family settings)
              (css-expr :font-family (str-font-family (:font-family settings))))
            (when (:font-size settings)
              (css-expr :font-size (str (:font-size settings) "pt")))))

(object/object* ::styles
                :init (fn [this]
                        [:div
                         [:style {:type "text/css"}
                          (bound (subatom this :font-settings) ->css)
                          ]]))

(def styles (object/create ::styles
                           :theme "default"))

(behavior ::style-on-init
          :triggers #{:init}
          :reaction (fn [app]
                      (dom/append (dom/$ :head) (:content @styles))
                      ))

(behavior ::font-settings
          :desc "App: Font settings"
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
                            final (if (and line-height
                                           (> line-height 0))
                                    (assoc final :line-height line-height)
                                    final)]
                        (object/merge! styles {:font-settings final}))))

;;**********************************************************
;; Skins
;;**********************************************************

(defn load-skin [skin]
  (let [skins (object/raise-reduce app/app :skins+ {})
        path (get skins skin (plugins/adjust-path "core/css/skins/new-dark.css"))]
    (let [elem (load/css path)]
      (dom-attr elem {:id (str "skin-" skin)})
      elem)))

(defn inject-skin [skin]
  (when (:skin @styles)
    (dom/remove-class (dom/$ :body) (str "skin-" (:skin @styles)))
    (dom/remove (dom/$ (str "#skin-" (:skin @styles)))))
  (object/merge! styles {:skin skin})
  (dom/add-class (dom/$ :body) (str "skin-" skin))
  (when-not (dom/$ (str "#skin-" skin))
    (dom/append (dom/$ :head) (load-skin skin))))

(defn get-skins []
  (sort-by #(.-text %)
           (for [[skin path] (object/raise-reduce app/app :skins+ {})]
              #js {:text (pr-str skin) :completion (pr-str skin)})))

(behavior ::set-skin
          :triggers #{:object.instant}
          :desc "Style: Set Light Table skin"
          :params [{:label "skin"
                    :type :list
                    :items get-skins}]
          :type :user
          :reaction (fn [this skin]
                      (inject-skin skin)))

(behavior ::provide-skin
          :desc "Style: Provide skin"
          :triggers #{:skins+}
          :type :user
          :params [{:label "name"} {:label "path"}]
          :reaction (fn [this skins name path]
                      (assoc skins name (plugins/adjust-path path))))

;;**********************************************************
;; themes
;;**********************************************************

(defn load-theme [theme]
  (let [themes (object/raise-reduce app/app :themes+ {})
        path (get themes theme (plugins/adjust-path "core/css/themes/default.css"))]
    (let [elem (load/css path)]
      (dom-attr elem {:id (str "theme-" theme)})
      elem)))

(defn inject-theme [theme]
  (when (:theme @styles)
    (dom/remove-class (dom/$ :#multi) (str "theme-" (:theme @styles))))
  (object/merge! styles {:theme theme})
  (dom/add-class (dom/$ :#multi) (str "theme-" theme))
  (when-not (dom/$ (str "#theme-" theme))
    (dom/append (dom/$ :head) (load-theme theme))))

(defn get-themes []
  (sort-by #(.-text %)
           (for [[theme path] (object/raise-reduce app/app :themes+ {})]
              #js {:text (pr-str theme) :completion (pr-str theme)})))


(behavior ::provide-theme
          :desc "Style: Provide editor theme"
          :triggers #{:themes+}
          :type :user
          :params [{:label "name"} {:label "path"}]
          :reaction (fn [this themes name path]
                      (assoc themes name (plugins/adjust-path path))))

(behavior ::remove-theme
          :triggers #{:deactivated :destroy}
          :reaction (fn [this]
                      (when-not (object/has-tag? (tabs/active-tab) :editor)
                        (when-not (empty? (:theme @styles))
                          (dom/remove-class (dom/$ :#multi) (str "theme-" (:theme @styles)))))))


(behavior ::set-theme
          :triggers #{:object.instant :show}
          :desc "Style: Set the editor theme"
          :params [{:label "theme"
                    :type :list
                    :items get-themes}]
          :type :user
          :exclusive true
          :reaction (fn [this sel]
                      (inject-theme sel)
                      (editor/set-options this {:theme sel})))
