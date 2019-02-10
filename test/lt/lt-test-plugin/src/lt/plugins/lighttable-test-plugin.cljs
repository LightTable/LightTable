(ns lt.plugins.lighttable-test-plugin
 "Mocks & extends light table components for auotmated testing."
  (:require [clojure.string :as string]
            [lt.objs/popup :as popup]
            [lt.util.dom :as dom]
            [lt.objs.command :as cmd]))

(def debug-file-path-input (atom ""))

(defn show-file-dialog-mock
  "Mocks show-file-dialog so native file dialog does not show.
   A popup dialog with a text field is shown instead. File paths
   can be specified in the path fields, seperated by commas to donate
   multiple files."
  [type options callback]
  (popup/popup! {:body [:div [:h1 "File Dialog Mock"] [:input {:type "text" :id "debug-file-path"}]]
                 :buttons
                 [
                  {
                   :label "Okay"
                   :action #(swap! debug-file-path-input (fn [_] (dom/val (dom/$ "#debug-file-path"))))
                   :post-action #(callback (string/split @debug-file-path-input #","))
                   }
                  ]
                 }))

(cmd/command {:command :lt.testing.mock
              :desc "Test Env: Mocks light table components for automated tests."
              :exec #(
                        ;TODO error is thrown when evaling this, but it works...
                        (lt.objs.dialogs/set-show-file-dialog-fn! show-file-dialog-mock)
                      )
              })

