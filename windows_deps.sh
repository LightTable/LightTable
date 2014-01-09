ZIPFILE=LightTableWin.zip
echo "### Fetching binaries ###"
curl -O http://d35ac8ww5dfjyg.cloudfront.net/playground/bins/0.6.0/$ZIPFILE
unzip $ZIPFILE
rm $ZIPFILE
cp -ar deploy/* LightTable
rm -rf deploy
mv LightTable deploy
chmod u+rwx deploy

# echo "### Building cljs ###"
# This fails on a windows 7(64bit) with lein 2.3.4, java 1.7.0_40
# The failure is an infinite loop of compilations in src/lt/objs
# lein cljsbuild clean && lein cljsbuild once

echo "### Fetching clojure plugin ###"
cd deploy/plugins
rm -rf clojure
git clone https://github.com/LightTable/Clojure.git clojure

echo "### Building clojure plugin ###"
cd clojure
./build.sh
