(defproject lighttable "0.1.0"
  :description "FIXME: write this!"
  :url "http://exampl.com/FIXME"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 ;:exclusions [org.clojure/clojurescript]]
                 [crate "0.2.4"]
                 [fetch "0.1.0-alpha2" :exclusions [org.clojure/clojure]]
                 [org.clojure/clojurescript "0.0-1806"
                  :exclusions [org.apache.ant/ant]]
                 ]
  :cljsbuild {:builds [{:source-paths ["src"]
                        :compiler {:optimizations :simple
                                   :externs ["externs/jquery.js" "externs/throttle.js" "externs/codemirror.js"]
                                   :output-to "deploy/core/node_modules/lighttable/bootstrap.js"
                                   :output-dir "cljs/"
                                   :pretty-print true}}]}
  :source-paths ["src/"
                 ;"/Users/chris/repos/clojurescript/src/clj"
                 ;"/Users/chris/repos/clojurescript/src/cljs"
                 ]
  )
