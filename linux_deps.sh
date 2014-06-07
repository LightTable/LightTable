#!/usr/bin/env bash

# Check if lein is installed
lein version >/dev/null 2>&1 || { echo >&2 "Please install leiningen before running this script."; exit 1; }
if [ "$(echo `lein version` | grep 'Leiningen 1.\|2.0')" ]; then 
	echo "lein version must be 2.1 or above. Do a lein upgrade first"; exit 1;
fi

which curl &> /dev/null
if [ $? -ne 0 ]; then
	echo "Please install curl before running this."
	exit
fi

echo "### Fetching binaries ###"
BITS=""
if [ $(getconf LONG_BIT) == "64" ]; then BITS="64"; fi
TARBALL=LightTableLinux$BITS.tar.gz
curl -O http://d35ac8ww5dfjyg.cloudfront.net/playground/bins/0.6.0/$TARBALL
tar -xzf $TARBALL
rm $TARBALL
cp -ar deploy/* LightTable
rm -rf deploy
mv LightTable deploy

echo "### Building cljs ###"
lein cljsbuild clean && lein cljsbuild once

echo "### Fetching clojure plugin ###"
cd deploy/plugins
rm -rf clojure
git clone https://github.com/LightTable/Clojure.git clojure

echo "### Building clojure plugin ###"
cd clojure
./build.sh
