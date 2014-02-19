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

NODEWEBKIT_VERSION="v0.7.5"
NODEWEBKIT_BASENAME="node-webkit-$NODEWEBKIT_VERSION-linux-ia32"
if [ $(getconf LONG_BIT) == "64" ]
then
  NODEWEBKIT_BASENAME="node-webkit-$NODEWEBKIT_VERSION-linux-x64"
fi
NODEWEBKIT_URL="https://s3.amazonaws.com/node-webkit/$NODEWEBKIT_VERSION/$NODEWEBKIT_BASENAME.tar.gz"

echo "### Fetching node-webkit binaries ###"
curl -O $NODEWEBKIT_URL
tar -xzf $NODEWEBKIT_BASENAME.tar.gz
mv $NODEWEBKIT_BASENAME/nw deploy/ltbin
mv $NODEWEBKIT_BASENAME/* deploy
rmdir $NODEWEBKIT_BASENAME

echo "### Copying default plugin set ###"
tar --directory=deploy -xzf resources/default-plugins.tar.gz

echo "### copying LightTable script ###"
if [ $(getconf LONG_BIT) == "64" ]
then
  cp platform/linux64/LightTable deploy
else
  cp platform/linux/LightTable deploy
fi
chmod +x deploy/LightTable

echo "### Building cljs ###"
lein cljsbuild clean && lein cljsbuild once

echo "### Fetching clojure plugin ###"
cd deploy/plugins
rm -rf clojure
git clone https://github.com/LightTable/Clojure.git clojure

echo "### Building clojure plugin ###"
cd clojure
./build.sh
