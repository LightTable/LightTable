#!/usr/bin/env bash

buildVer=0.6.0

# Check if lein is installed
lein version >/dev/null 2>&1 || { echo >&2 "Please install leiningen before running this script."; exit 1; }
if [ "$(echo `lein version` | grep 'Leiningen 1.\|2.0')" ]; then 
	echo "ERROR: lein version must be 2.1 or above. Do a lein upgrade first"; exit 1;
fi

which curl &> /dev/null
retCode=$?
if [ $retCode -ne 0 ]; then
    echo "ERROR: curl not found. Please install curl before running this script."
    exit $retCode
fi

# Use linux-specific directories not to break non-linux builds by any dumb coicidence.
deployDir=deploy
binariesDir=binaries

echo "INFO: Fetching binaries"

bits_cpu=$(getconf LONG_BIT)  # bits_cpu can be 32 or 64
bits_tarball=${bits_cpu//32}  # bits_tarball can be 64 or undefined

node_webkit_tarball=$binariesDir/node-webkit/LightTableLinux$bits_cpu-$buildVer.tar.gz
if [ ! -e "$node_webkit_tarball" ]; then
    curl -o $node_webkit_tarball \
	https://d35ac8ww5dfjyg.cloudfront.net/playground/bins/$buildVer/LightTableLinux$bits_tarball.tar.gz
fi
sha1sum --check $node_webkit_tarball.sha1
retCode=$?
if [ $retCode -ne 0 ]; then
    exit $retCode
fi

tar -xzf $node_webkit_tarball

# $deployDir doesn't exist when building for the 1st time
if [ -e $deployDir ]; then
    cp -ar $deployDir/* LightTable
    rm -rf $deployDir
fi
mv LightTable $deployDir

echo "INFO: Building cljs"
lein cljsbuild clean && lein cljsbuild once
#lein cljsbuild once

echo "INFO: Building clojure plugin"
workingDir=$(pwd)
clojureDir=$binariesDir/clojure

cd $clojureDir

# $clojureDir/.git doesn't exist when building for the 1st time
if [ -e .git ]; then
    # TODO add runner/target/lein-light-standalone.jar to the .gitignore
    # in the https://github.com/LightTable/Clojure.git repository
    git checkout runner/target/lein-light-standalone.jar
    git pull --rebase
else
    git submodule init
    git submodule update

    # We're on a detached branch now. We need to...
    git checkout master
    # ...otherwise git won't know what to pull on consecutive builds.
    # See the if-then block above.
fi
cp -r . $workingDir/$deployDir/plugins/
./build.sh
# cd $workingDir
