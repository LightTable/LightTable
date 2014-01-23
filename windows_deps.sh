# Check if lein is installed
lein version >/dev/null 2>&1 || { echo >&2 "Please install leiningen before running this script."; exit 1; }
if [ "$(echo `lein version` | grep 'Leiningen 1.\|2.0')" ]; then 
	echo "lein version must be 2.1 or above. Do a lein upgrade first"; exit 1;
fi

ZIPFILE=LightTableWin.zip
echo "### Fetching binaries ###"
curl -O http://d35ac8ww5dfjyg.cloudfront.net/playground/bins/0.6.0/$ZIPFILE
unzip $ZIPFILE
rm $ZIPFILE
cp -ar deploy/* LightTable
rm -rf deploy
mv LightTable deploy
chmod u+rwx deploy

echo "### Building cljs ###"
lein cljsbuild clean && lein cljsbuild once

echo "### Fetching clojure plugin ###"
cd deploy/plugins
rm -rf clojure
git clone https://github.com/LightTable/Clojure.git clojure

echo "### Building clojure plugin ###"
cd clojure
./build.sh
