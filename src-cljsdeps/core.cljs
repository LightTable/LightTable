(ns cljsdeps.core
  "ClojureScript used to build cljsDeps.js as describe in
  https://github.com/LightTable/LightTable/commit/8e73f59891c45f73a1b985fed69795d1061a8ecf#commitcomment-10073128.
  Generated javascript is used in background thread with worker-thread object."
  (:require [clojure.string :as string]
            [clojure.walk :as walk]
            [cljs.reader :as reader]))
