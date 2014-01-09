echo "### Fetching binaries ###"
TARBALL=LightTableLinux$(getconf LONG_BIT).tar.gz
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
