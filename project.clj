(defproject lighttable "0.1.0"
  :description "FIXME: write this!"
  :url "http://exampl.com/FIXME"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [crate "0.2.5"]
                 [fetch "0.1.1" :exclusions [org.clojure/clojure]]
                 ;[core.async "0.1.0-SNAPSHOT"]
                 [org.clojure/clojurescript "0.0-2138"
                  :exclusions [org.apache.ant/ant]]
                 ]
  :jvm-opts ["-Xmx4g" "-XX:+UseConcMarkSweepGC"] ; cljsbuild eats memory
  :cljsbuild {:builds [{:source-paths ["src"]
                        :compiler {:optimizations :simple
                                   :externs ["externs/jquery.js" "externs/throttle.js" "externs/codemirror.js"]
                                   :source-map "deploy/core/node_modules/lighttable/bootstrap.js.map"
                                   :output-to "deploy/core/node_modules/lighttable/bootstrap.js"
                                   :output-dir "deploy/core/node_modules/lighttable/cljs/"
                                   :pretty-print true}}]}
  :plugins [[lein-cljsbuild "1.0.1"]]
  :source-paths ["src/"]
  )






