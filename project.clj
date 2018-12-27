(defproject lighttable "0.8.1"
  :description "Light Table is a next generation code editor that connects you to your creation with instant feedback. Light Table is very customizable and can display anything a Chromium browser can."
  :url "http://www.lighttable.com/"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [crate "0.2.5"]
                 [fetch "0.3.0" :exclusions [org.clojure/clojure noir]]
                 [org.clojure/clojurescript "1.7.145"
                  :exclusions [org.apache.ant/ant]]
                 ]
  :jvm-opts ["-Xmx1g" "-XX:+UseConcMarkSweepGC"] ; cljsbuild eats memory
  :cljsbuild {:builds [{:id "app"
                        :source-paths ["src"]
                        :compiler {:optimizations :simple
                                   :externs ["externs/jquery.js" "externs/throttle.js" "externs/codemirror.js"]
                                   :source-map "deploy/core/node_modules/lighttable/bootstrap.js.map"
                                   :output-to "deploy/core/node_modules/lighttable/bootstrap.js"
                                   :output-dir "deploy/core/node_modules/lighttable/cljs/"
                                   :pretty-print true}}
                       {:id "cljsdeps"
                        :source-paths ["src-cljsdeps"]
                        :compiler {:optimizations :simple
                                   :output-to "deploy/core/node_modules/clojurescript/cljsDeps.js"
                                   :output-dir "deploy/core/node_modules/clojurescript/cljsDeps/"
                                   :pretty-print true }}]}

  ;; TODO: Remove separate :doc :dependencies after ClojureScript upgrade
  :profiles {:doc {:dependencies [[org.clojure/clojure "1.7.0"]
                                  [org.clojure/clojurescript "1.7.145"
                                   :exclusions [org.apache.ant/ant]]]}}
  :plugins [[lein-cljsbuild "1.1.7"]
            [lein-codox "0.9.5"]]
  :codox {:language :clojurescript
          :project {:name "LightTable"}
          :output-path "codox"
          :doc-paths [] ;; Disable including doc/
          :namespaces [lt.macros lt.object lt.objs.command lt.objs.editor
                       lt.objs.editor.pool lt.objs.files lt.objs.notifos]
          :source-uri "https://github.com/LightTable/LightTable/blob/{version}/{filepath}#L{line}"
          ;; Be explicit that undocumented public fns should be documented
          :metadata {:doc "TODO: Add docstring"
                     :doc/format :markdown}}
  :source-paths ["src/"]
  )
