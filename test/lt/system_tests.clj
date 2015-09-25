(ns lt.system-tests
  (:import
    (org.openqa.selenium Keys)
    (java.io File)
    (java.nio.file Path)
    (java.nio.file Paths)
    (java.nio.file Files)
    (java.nio.file.attribute FileAttribute)
    (java.nio.file OpenOption)
    (java.io File))
  (:require
    [lt.webdriver-helper :as lt-webdriver-helper]
    [clj-webdriver.taxi :as taxi]
    [clj-webdriver.core :as core]
    [clj-webdriver.element :as element]
    [clojure.string :as str] 
    [clojure.test :refer :all :as test]))


(defn create-temporary-file []
    "Creates a temporary file. Caller is responsible for removing file."
(-> (Files/createTempFile (String. "temp-file-name") (String. ".tmp") (into-array FileAttribute []))
                          (.toAbsolutePath)
                          (.toString)))


(defn read-file-contents [path]
    "Fetches all contents of a file located at path."
    (-> (Paths/get path (into-array String []))
        (Files/readAllBytes)
        (String. )))


(defn wait-until-true 
    "Repeatedly calls function until function produces non-null value within max-time. 
     Throws Exception if function does not produce a non-false value within max-time."
    ([max-time fn] 
        (let [future-time  (+ (System/currentTimeMillis)  max-time)]
        (loop [return-value (fn)]
            (if return-value
                return-value
                (if (<= future-time (System/currentTimeMillis))
                    (throw (Exception. "Wait-until-true never passed."))
                    (do
                        (Thread/sleep 100)
                         (recur (fn))))))))
    ([fn] (wait-until-true 1000 fn)))
                
              
            
    
   
(defn helper-open-command-list []
  "Opens command list window (ctrl+space)."
  (taxi/send-keys (taxi/find-element {:css "body"}) (Keys/chord [ (core/key-code :control) (core/key-code :space)]))
  (wait-until-true #(taxi/find-element {:css ".search"})))

(defn helper-select-command-list-command [name] 
  (-> (taxi/switch-to-active)
      (.sendKeys (into-array CharSequence (list name (core/key-code :enter))))))

(defn helper-select-files [files]
   (-> (wait-until-true #(taxi/find-element {:css "#debug-file-path"} ))
       (taxi/send-keys (str (first files))))
   ;TODO make more deterministic to make sure we are clicking "Okay"
   (taxi/click {:css ".button.active"}))

(defn get-file-name-from-path [path]
    (-> (File. path)
        (.getName)))

(defn lt-fixture [func]
    (try 
        (lt-webdriver-helper/start-chromedriver!)
        (lt-webdriver-helper/start-light-table!)

        ;Nasty hack. mitigates possibility of running into bug 
        ;in older version of electron where packages (atom.asar)
        ;is freed when using chromedriver.
        (Thread/sleep 2000)
        (lt-webdriver-helper/connect-to-light-table!)

        (func)
        (finally 
            (lt-webdriver-helper/stop-chromedriver!)
            (lt-webdriver-helper/stop-light-table!))))

(use-fixtures :each lt-fixture)

(deftest new-file
    
  ;TODO figure out a better way to determine if program finished booting.
  ;Current checking for the position element, showing line numbers in the bottom
  ;right of the screen.
  (wait-until-true 40000 #(taxi/find-element {:tag :span :class "pos"}))

  ;Create temporary file
  (def temp-file-path (create-temporary-file))

  ;Enable test mocks for testing
  (helper-open-command-list)
  (helper-select-command-list-command "Test Env:")

  ;Create new file
  (helper-open-command-list)
  (helper-select-command-list-command "new file")

  ;Wait for editor to appear
  (wait-until-true #(taxi/find-element {:css "div.codemirror-focused"}))

  ;Type some content
  (-> (element/init-element (taxi/switch-to-active))
        (taxi/send-keys "File Persistence Test"))


  ;Save file
  (helper-open-command-list)
  (helper-select-command-list-command "Save File")
  (helper-select-files [temp-file-path])

  ;Verify file contents. Waits up to 2 seconds before
  ;determining content failed to save.
    
  (is (wait-until-true 2000 #(= "File Persistence Test" (read-file-contents temp-file-path))))

  ;Close Tab
  (core/->actions (lt-webdriver-helper/get-webdriver)
    (core/move-to-element 
        (taxi/find-element {:tag :span :class "file-name" :text (get-file-name-from-path temp-file-path) })))

  (taxi/click {:css ".tabset.active .list li.active .tab-close"})

  ;Open file
  (helper-open-command-list)
  (helper-select-command-list-command "Open File")
  (helper-select-files [temp-file-path])

  ;assert editor has correct  text
  (is (wait-until-true #(= "File Persistence Test" (taxi/text {:css ".CodeMirror-code span"}))))
  
  ;Close Tab
  (core/move-to-element (lt-webdriver-helper/get-webdriver) (wait-until-true #(taxi/find-element {:tag :span :class "file-name" :text (get-file-name-from-path temp-file-path) })))
  (taxi/click {:css ".tabset.active .list li.active .tab-close"})
)
