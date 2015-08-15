(ns tests.tests-runner
  (:require [cemerick.cljs.test :as t :refer-macros [is deftest with-test run-tests testing test-var]]
            [tests.dummy]))

(enable-console-print!)

(t/test-ns tests.dummy)

;; (deftest test-numbers
;;   (is (= 1 1)))
