(ns lt.objs.github
  "GitHub API features"
  (:require-macros [lt.macros :refer [behavior]]))

(def user-api-username nil)
(def user-api-token nil)

(defn basic-auth-hostname-prefix
  "Generate a basic auth hostname prefix with the user's GitHub username and token (if set) as the user name and password, respectively."
  []
  (when (and (not (nil? user-api-username))
             (not (nil? user-api-token)))
    (str (js/encodeURIComponent user-api-username)
         ":"
         (js/encodeURIComponent user-api-token)
         "@")))

(behavior ::user-public-github-api-token
          :triggers #{:object.instant}
          :type :user
          :exclusive true
          :desc "Set user GitHub API credentials; used for checking LT and LT plugin repos"
          :details "Create a GitHub or personal access token or OAuth token. Either type of token should have *no* scopes granted to this token because they will only be used to access public repo info."
          :params [{:label "username"}
                   {:label "token"}]
          :reaction (fn [this username token]
                      (set! user-api-username username)
                      (set! user-api-token token)))
