(ns tests.dummy
  "Dummy test namespace to ensure tests a run correctly.
  To see how to write tests, documentation is available here: https://github.com/cemerick/clojurescript.test"
  (:require [cemerick.cljs.test :as t :refer-macros [is deftest with-test run-tests testing test-var]]))

(deftest test-numbers
  (is (= 1 1)))
