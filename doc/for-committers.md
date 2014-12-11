## Dependencies

### Node packages

Node dependencies live in deploy/core/node_modules/. To update an individual dependency: `cd deploy/core && npm
install NAME@VERSION` e.g. `npm install codemirror@4.8.0`. Following packages are known to be
vendored:

* codemirror - Provides all codemirror files except for themes

Following packages are specific to Light Table i.e. _not_ vendored:

* clojurescript - Provides cljsDeps.js
* codemirror_addons - Provides codemirror addons
* lighttable - Main lighttable js libs
