(ns tests.dummy
  (:require [cemerick.cljs.test :as t :refer-macros [is deftest with-test run-tests testing test-var]]))

(deftest test-numbers
  (is (= 1 1)))
