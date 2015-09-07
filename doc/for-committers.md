## Dependencies


### ClojureScript

Current ClojureScript version and libraries we use are in [project.clj](https://github.com/LightTable/LightTable/blob/master/project.clj).

### Notable JS dependencies

* [CodeMirror](http://codemirror.org/) for the editor
* [Mousetrap](https://github.com/LightTable/LightTable/blob/686c9b1e5e24fcb08ff44eb57eb7889e31e37806/deploy/core/node_modules/lighttable/util/keyevents.js) for handling keyboard shortcuts
* [jQuery throttle/debounce plugin](https://github.com/LightTable/LightTable/blob/686c9b1e5e24fcb08ff44eb57eb7889e31e37806/deploy/core/node_modules/lighttable/util/throttle.js)

### Node packages

Node package installs last done with io.js v2.5.0 and npm v2.13.2.

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

### Electron

Allows us to build cross platfrom desktop apps. See [Electron guide](electron-guide.md)

## Other

### Code Reading

When reading LT's source you may come across a fn that doesn't have an obvious use and may appear to
be unused. Some tips to confirm how it is/was used:

* Do a LightTable user search for the given fn. For example, to see where [proc/exec is used](https://github.com/search?utf8=%E2%9C%93&q=proc%2Fexec+user%3ALightTable&type=Code&ref=searchresults)
* `git log -u -S WORD` will do a code history search for WORD
