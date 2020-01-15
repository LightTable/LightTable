#!/usr/bin/env bash
set -e

# Build LightTable app and CLI and place in builds/.
# Specify $VERSION to override default build version.
# Pass `--release` to build a release version.
# This script primarily installs dependencies and sets up
# the app before calling build-app.sh to build it.

# Check if lein is installed
[ "`which lein`" ] || { echo >&2 "Please install leiningen before running this script."; exit 1; }
if [ "$(echo `lein version` | grep 'Leiningen \(1.\|2.0\)')" ]; then
  echo "lein version must be 2.1 or above. Do a lein upgrade first"; exit 1;
fi

# Check if npm is installed
[ "`which npm`" ] || { echo >&2 "Please install npm before running this script."; exit 1; }

# Ensure we start in project root
cd "$(dirname "${BASH_SOURCE[0]}")"; cd ..

# Ensure we have current version of electron
pushd deploy/electron
  npm install
  node_modules/.bin/grunt download-electron
popd

# Ensure we have current version of core
pushd deploy/core
  npm install
popd

# Build the core cljs

# Workaround for #1025 windows bug
if [ "$(echo $(uname -s) | cut -c 1-9)" == "CYGWIN_NT" ]; then
  sed -i 's/:source-map/;;:source-map/' project.clj
fi
rm -f deploy/core/node_modules/lighttable/bootstrap.js
lein cljsbuild once app

if [ -d "deploy/core/node_modules/clojurescript" ]; then
    rm -i -rf deploy/core/node_modules/clojurescript
fi
lein cljsbuild once cljsdeps

# Fetch plugins
PLUGINS=("Clojure,0.3.3" "CSS,0.0.6" "HTML,0.1.0" "Javascript,0.2.0"
         "Paredit,0.0.4" "Python,0.0.7" "Rainbow,0.0.8")

# Plugins cache
mkdir -p deploy/plugins

pushd deploy/plugins
  for plugin in "${PLUGINS[@]}" ; do
      NAME="${plugin%%,*}"
      VERSION="${plugin##*,}"
      if [ -d $NAME ]; then
        echo "Updating plugin $NAME $VERSION..."
        cd $NAME
        git checkout --quiet master
        git pull --quiet
        git checkout --quiet $VERSION
        cd -
      else
        echo "Cloning plugin $NAME $VERSION..."
        git clone "https://github.com/LightTable/$NAME"
        cd $NAME
        git checkout --quiet $VERSION
        cd -
      fi
  done
popd

script/build-app.sh $@
