(ns tests.tests-runner
  "Namespace used as a test runner. Every other test namespace should be `require`d here,
  as well as tested through the `testrunner/test-ns` call"
  (:require [cemerick.cljs.test :as testrunner :refer-macros [is deftest with-test run-tests testing test-var]]
            [tests.dummy]))

;; Enable printing directly to the javascript console
(enable-console-print!)

;; Run tests of every namespaces
(testrunner/test-ns tests.dummy)
