(ns lt.util.style
  "Provide style related fns")

(defn ->px [s]
  (str (or s 0) "px")) 
