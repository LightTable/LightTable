## Dependencies


### ClojureScript

Current ClojureScript version and libraries we use are in [project.clj](https://github.com/LightTable/LightTable/blob/master/project.clj).

### Notable JS dependencies

* [CodeMirror](http://codemirror.org/) for the editor
* [Mousetrap](https://github.com/LightTable/LightTable/blob/686c9b1e5e24fcb08ff44eb57eb7889e31e37806/deploy/core/node_modules/lighttable/util/keyevents.js) for handling keyboard shortcuts
* [jQuery throttle/debounce plugin](https://github.com/LightTable/LightTable/blob/686c9b1e5e24fcb08ff44eb57eb7889e31e37806/deploy/core/node_modules/lighttable/util/throttle.js)

### Node packages

Node package installs last done with node.js v2.5.0 and npm v2.13.2.

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

### Code Conventions

* See the LightTable Style Guide.

### Code Reading

When reading LT's source you may come across a fn that doesn't have an obvious use and may appear to
be unused. Some tips to confirm how it is/was used:

* Do a LightTable user search for the given fn. For example, to see where [proc/exec is used](https://github.com/search?utf8=%E2%9C%93&q=proc%2Fexec+user%3ALightTable&type=Code&ref=searchresults)
* `git log -u -S WORD` will do a code history search for WORD

### Upgrading ClojureScript

When upgrading ClojureScript, cljsDeps.js needs to be rebuilt with `lein cljsbuild once cljsdeps`.
cljsDeps.js is used by
[threadworker.js](https://github.com/cldwalker/LightTable/blob/d79adff78557febf4a3b94691a132fa81fe3aeaa/deploy/core/node_modules/lighttable/background/threadworker.js#L29)
to run javascript in [a background
thread](https://github.com/cldwalker/LightTable/blob/d79adff78557febf4a3b94691a132fa81fe3aeaa/src/lt/objs/thread.cljs#L67).
This background thread is invoked with the `background` macro.

## Release process

This is our release checklist which can be dropped in to an issue:

- [ ] Release 0.X.X
      - [ ] Version updates
         - [ ] Update deploy/core/package.json, deploy/core/version.json and project.clj (including the Codox `:source-uri` value) to 0.X.X
         - [ ] Make sure electron version is up to date in version.json
         - [ ] Make sure plugin versions in script/build.sh are latest versions
      - [ ] Add changelog for release to CHANGELOG.md
      - [ ] Each core developer should QA at least one OS using the [QA checklist](https://github.com/LightTable/LightTable/wiki/QA-Checklist)
      - [ ] When QA passes freeze master
      - [ ] Add changelog to [GH release draft](https://github.com/LightTable/LightTable/releases/new)
      - [ ] Upload binaries from `script/build.sh --release` to draft. Don't forget to click *Save draft*!
         - [ ] Generate an MD5 checksum for the binary package:
            - [ ] Run `certUtil -hashfile lighttable-x.y.z-windows.zip MD5` on Windows.
            - [ ] Run `openssl md5 lighttable-x.y.z-mac.tar.gz` on Mac OS X or Linux.
      - [ ] Publish GH release which creates git tag and notifies users about new release
      - [ ] Update download links on lighttable.com
      - [ ] Mailing list announcement - [example email](https://gist.github.com/cldwalker/3d67153fe1eade2ae3cf)
      - [ ] Optional blog post if a major release
      - [ ] After release, [build api documentation](#build-api-documentation)

## Build api documentation

To build api documentation for current LT version and publish generated docs:

1. In project.clj make sure that `[:codox :source-uri]` points to current LT version.
   This step will be removed once [there is upstream support for version in :source-uri](https://github.com/weavejester/codox/issues/107)
2. Run `script/build-api-docs.sh` on a clean git state. Make sure there are no pending git changes as this script will change git branches and push generated api docs to gh-pages.

Expect to see a ton of warnings e.g. `WARNING: Use of undeclared Var cljs.core/seq at line 197`. This will be noise we have to live with until we upgrade ClojureScript.
