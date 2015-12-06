(defproject lighttable "0.8.0-alpha"
  :description "Light Table is a new interactive IDE that lets you modify running programs and embed anything from websites to games. It provides the real time feedback we need to not only answer questions about our code, but to understand how our programs really work."
  :url "http://www.lighttable.com/"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [crate "0.2.5"]
                 [fetch "0.2.0" :exclusions [org.clojure/clojure noir]]
                 [org.clojure/clojurescript "0.0-2138"
                  :exclusions [org.apache.ant/ant]]
                 ]
  :jvm-opts ["-Xmx1g" "-XX:+UseConcMarkSweepGC"] ; cljsbuild eats memory
  :cljsbuild {:builds [{:source-paths ["src"]
                        :compiler {:optimizations :simple
                                   :externs ["externs/jquery.js" "externs/throttle.js" "externs/codemirror.js"]
                                   :source-map "deploy/core/node_modules/lighttable/bootstrap.js.map"
                                   :output-to "deploy/core/node_modules/lighttable/bootstrap.js"
                                   :output-dir "deploy/core/node_modules/lighttable/cljs/"
                                   :pretty-print true}}]}
  :profiles {:doc {:dependencies [[org.clojure/clojure "1.7.0"]
                                  [org.clojure/clojurescript "1.7.145"
                                   :exclusions [org.apache.ant/ant]]]}}
  :plugins [[lein-cljsbuild "1.0.1"]
            [lein-codox "0.9.0"]]
  :codox {:language :clojurescript
          :project {:name "LightTable"}
          :output-path "codox"
          :doc-paths [] ;; Disable including doc/
          :namespaces [lt.macros lt.object lt.objs.command lt.objs.editor
                       lt.objs.editor.pool lt.objs.files lt.objs.notifos]
          ;; :source-uri version needs to be bumped per release until codox supports {version}
          :source-uri "https://github.com/LightTable/LightTable/blob/0.8.0-alpha/{filepath}#L{line}"
          :metadata {:doc "TODO: Add docstring"}}
  :source-paths ["src/"]
  )
