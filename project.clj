(defproject lighttable "0.1.0"
  :description "FIXME: write this!"
  :url "http://exampl.com/FIXME"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 ;:exclusions [org.clojure/clojurescript]
                 [crate "0.2.4"]
                 [fetch "0.1.1" :exclusions [org.clojure/clojure]]
                 ;[core.async "0.1.0-SNAPSHOT"]
                 [org.clojure/clojurescript "0.0-1934"
                  :exclusions [org.apache.ant/ant]]

                 ;;latest clojurescript :dependencies
                 [org.clojure/data.json "0.2.2"]
                 [org.clojure/tools.reader "0.7.10"]
                 [org.clojure/google-closure-library "0.0-20130212-95c19e7f0f5f"]
                 [com.google.javascript/closure-compiler "v20130603"]

                 ]
  :cljsbuild {:builds [{:source-paths ["src"]
                        :compiler {:optimizations :simple
                                   :externs ["externs/jquery.js" "externs/throttle.js" "externs/codemirror.js"]
                                   ;:source-map "deploy/core/node_modules/lighttable/bootstrap.js.map"
                                   :output-to "deploy/core/node_modules/lighttable/bootstrap.js"
                                   :output-dir "cljs/"
                                   :pretty-print true}}]}
  :plugins [[lein-cljsbuild "0.3.4"]]
  :source-paths ["src/"
                 "/Users/chris/repos/clojurescript/src/clj"
                 "/Users/chris/repos/clojurescript/src/cljs"
                 ]
  :jvm-opts ["-Xmx2g"]
  )
