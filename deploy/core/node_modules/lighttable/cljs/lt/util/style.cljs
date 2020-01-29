(ns lt.util.style
  "Provide style related functions.")

(defn ->px
  "Appends \"px\" to `s`. If `s` is falsey then 0 is used.

  Example:
  ```
  (->px 75)    ;;=> \"75px\"

  (->px false) ;;=> \"0px\"
  ```"
  [s]
  (str (or s 0) "px"))
