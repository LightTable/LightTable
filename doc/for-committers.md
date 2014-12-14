## Dependencies


### ClojureScript

Current ClojureScript version and libraries we use are in [project.clj](https://github.com/LightTable/LightTable/blob/master/project.clj).

### Node packages

Node dependencies are at deploy/core/node\_modules/. This directory is currently a mix of vendored
dependencies, forked dependencies and Light Table specific libraries:

* Vendored dependencies are `"dependencies"` in [package.json](https://github.com/LightTable/LightTable/blob/master/deploy/core/package.json)
  * These are dependencies that should _not_ be modified and should be updated with upstream versions.
  * To update an individual dependency: `cd deploy/core && npm install NAME@VERSION` e.g. `npm install codemirror@4.8.0`.
  * To see outdated dependencies: `npm outdated`.
  * Dependencies should _not_ be updated without good QA and checking the dependency's changelog.
* Forked dependencies are `"forkedDependencies"` in  [package.json](https://github.com/LightTable/LightTable/blob/master/deploy/core/package.json)
  * These packages have had custom commits that should get sent upstream. These should eventually become vendored dependencies.
  * Some of them differ slightly from the original e.g. shelljs while others vary much more e.g. socket.io.
* Light Table specific libraries
  * clojurescript - Provides cljsDeps.js
  * codemirror\_addons - Provides codemirror addons
  * lighttable - Mostly lighttable js libs _except for_ lighttable/util/{keyevents.js,throttle.js} which should be moved to vendored dependencies.
