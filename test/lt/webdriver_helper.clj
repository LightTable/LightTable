(ns lt.webdriver-helper
  (:import
  (java.net URL)
  (java.io File)
  (org.openqa.selenium.remote DesiredCapabilities)
  (org.openqa.selenium.remote RemoteWebDriver)
  (org.openqa.selenium.chrome ChromeOptions)
  (java.lang Runtime)
  (java.nio.file Files)
  (java.nio.file.attribute FileAttribute))
  (:use [clojure.string :only [trim]])
  (:require
      [clj-webdriver.taxi :as taxi]
      [clojure.java.shell :as shell :only [sh]]
      [clj-webdriver.driver :as driver]
      [me.raynes.fs]
    ))


(def lein-project-dir (System/getProperty "user.dir"))

(def chromeOptions  {
  "debuggerAddress" "127.0.0.1:8315"
})

(def capabilities (DesiredCapabilities/chrome))
(.setCapability capabilities ChromeOptions/CAPABILITY chromeOptions)
(.setCapability capabilities "browserName" "electron")

(defn log [msg]
  (println msg))

(defn get-project-directory [] 
  (System/getProperty "user.dir"))


(def lt-process (atom nil))
(def chromedriver-process (atom nil))

;Defines temporary directory for testing light table
(def temp-home-directory
    (str (Files/createTempDirectory "lightable_homedir_for_testing" (into-array FileAttribute []))))

(defn get-chromedriver-path [] 
    "Finds path to chromedriver/"
    (str (first (filter #(re-find #"chromedriver" (.getName %1))
      (-> (File. (str (System/getProperty "user.dir") "/deploy/electron/electron/chromedriver/")) 
        .listFiles)))))
    

(defn get-lighttable-executable-path []
    "Finds path to LightTable"
    (first (filter 
        #(.exists (File. %1))
        (map #(str (System/getProperty "user.dir") %1)
        ["/deploy/electron/electron/Electron.app/Contents/MacOS/Electron"
         "/deploy/electron/electron/electron"
         "/deploy/electron/electron/electron.exe"]))))

(defn copy-test-plugins-into-home-directory!  []
    "Copies LightTable test enivonrment setup plugin into 
     temporary home directory."
    (me.raynes.fs/copy-dir 
        (str lein-project-dir "/test/lt/lt-test-plugin") 
        (str temp-home-directory "/plugins/lt-test-plugin")))

(defn create-process-builder-for-lt-launching [temp-home-directory]
  "Configures process builder to launch LightTable with testing environment variables."
  (let [pb (ProcessBuilder. 
         (into-array String 
         [ 
           (get-lighttable-executable-path)
           "deploy/core"
         ]
        ))
      env (.environment pb )    
     ]
     (.redirectErrorStream pb true)
     (when-let [stdout-redirect-file-path (System/getenv "LT_STDOUT_FILE")]
        (.redirectOutput pb (File. stdout-redirect-file-path)))
     (.put env "LT_USER_DIR" (.toString temp-home-directory))
     (.put env "LT_DEV_CLI" "true")
     pb))
(defn start-light-table! []
  (copy-test-plugins-into-home-directory!)
  (swap! lt-process
  (fn [_]
    (-> (create-process-builder-for-lt-launching temp-home-directory)
        (.start))
)))

(defn start-chromedriver! []
    "Start chromedriver process."
    (swap! chromedriver-process
      (fn [_]
        (-> (ProcessBuilder. (into-array String [
            (get-chromedriver-path) ]))
            (.start)))))

(defn stop-chromedriver! []
    "Kills chromedriver process."
    (when-let [cd @chromedriver-process]
        (.destroy cd))
    (swap! chromedriver-process (fn [p] nil)))


;TODO check if we are already connected to light-table to avoid re-connecting?
(defn connect-to-light-table! []
  "Connects to light table."
  (-> (RemoteWebDriver. (URL. "http://127.0.0.1:9515") capabilities)
    (driver/init-driver)
    (taxi/set-driver!)))

(defn stop-light-table! []
  "Kills light table process"
  (and @lt-process  (.destroy @lt-process))
  (swap! lt-process (fn [p] nil)))

(defn get-webdriver []
  taxi/*driver*)

