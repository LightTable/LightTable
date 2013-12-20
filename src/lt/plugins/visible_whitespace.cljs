(ns lt.plugins.visible-whitespace
  (:require [lt.object :as object]
            [lt.objs.editor :as editor]
            [lt.objs.command :as cmd])
  (:require-macros [lt.macros :refer [behavior]]))

(def spaces-regex #"\s")
(def vs (js-obj " " "visible-space"
                "\t" "visible-tab"
                "\n" "visible-newline"))

(def overlay (clj->js {:token (fn [stream]
                                (when-let [cur (.next stream)]
                                  (when (.match cur spaces-regex)
                                    (+ (.-pos stream) "space " (aget vs cur)))))}))

(behavior ::show-whitespace
                  :triggers #{:object.instant}
                  :reaction (fn [this]
                              (.addOverlay (editor/->cm-ed this) overlay)
                              ))

(behavior ::hide-whitespace
                  :triggers #{:object.instant}
                  :reaction (fn [this]
                              (.removeOverlay (editor/->cm-ed this) overlay)
                              ))

(cmd/command {:command :toggle-visible-whitespace
              :desc "Editor: Toggle visible whitespace"
              :exec (fn []
                      (if (object/in-tag? :editor ::show-whitespace)
                        (do
                          (object/remove-tag-behaviors :editor [::show-whitespace])
                          (object/tag-behaviors :editor [::hide-whitespace]))
                        (do
                          (object/remove-tag-behaviors :editor [::hide-whitespace])
                          (object/tag-behaviors :editor [::show-whitespace])))
                      )})
