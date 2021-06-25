(defproject lighttable "0.9.0"
  :description "Light Table is a next generation code editor that connects you to your creation with instant feedback. Light Table is very customizable and can display anything a Chromium browser can."
  :url "http://www.lighttable.com/"
  :dependencies [[org.clojure/clojure "1.10.3"]
                 [org.clojars.prertik/singultus "1.0.0"]
                 [org.clojars.prertik/fetch "0.4.0" :exclusions [org.clojure/clojure noir]]
                 [org.clojure/clojurescript "1.10.844"
                  :exclusions [org.apache.ant/ant]]
                 [javax.xml.bind/jaxb-api "2.4.0-b180830.0359"]]

  :jvm-opts ["-Xmx1g" "-XX:+UseG1GC"] ; cljsbuild eats memory
  :cljsbuild {:builds [{:id "app"
                        :source-paths ["src"]
                        :compiler {:optimizations :simple
                                   :externs ["externs/jquery.js" "externs/throttle.js" "externs/codemirror.js"]
                                   :source-map "deploy/core/lighttable/bootstrap.js.map"
                                   :output-to "deploy/core/lighttable/bootstrap.js"
                                   :output-dir "deploy/core/lighttable/cljs/"
                                   :pretty-print true}}
                       {:id "cljsdeps"
                        :source-paths ["src-cljsdeps"]
                        :compiler {:optimizations :simple
                                   :output-to "deploy/core/node_modules/clojurescript/cljsDeps.js"
                                   :output-dir "deploy/core/node_modules/clojurescript/cljsDeps/"
                                   :pretty-print true}}]}

  ;; TODO: Remove separate :doc :dependencies after ClojureScript upgrade
  :profiles {:doc {:dependencies [[org.clojure/clojure "1.10.3"]
                                  [org.clojure/clojurescript "1.10.844"
                                   :exclusions [org.apache.ant/ant]]]}}
  :plugins [[lein-cljsbuild "1.1.8"]
            [lein-codox "0.10.7"]
            [lein-cloverage "1.2.2"]]
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
  :source-paths ["src/"])
