# Check if lein is installed
lein version >/dev/null 2>&1 || { echo >&2 "Please install leiningen before running this script."; exit 1; }
if [ "$(echo `lein version` | grep 'Leiningen \(1.\|2.0\)')" ]; then 
	echo "lein version must be 2.1 or above. Do a lein upgrade first"; exit 1;
fi


#remove the previously built plugins, binary, and executable
rm -rf deploy/plugins
rm -rf deploy/LightTable.app
rm deploy/light

#get the LightTable.app binary
curl -O http://d35ac8ww5dfjyg.cloudfront.net/playground/bins/0.6.2/LightTableMac.zip
unzip LightTableMac.zip
mv LightTable/* deploy/
rmdir LightTable/
rm LightTableMac.zip

cp -r platform/mac/* deploy/

#build the core cljs of LightTable
lein cljsbuild clean && lein cljsbuild once

#Get the plugins from the binary
cd deploy
mv LightTable.app/Contents/Resources/app.nw/plugins plugins
cd plugins

#Make sure we have the latest clojure
rm -rf clojure
git clone https://github.com/LightTable/Clojure.git clojure
cd clojure
./build.sh

#Remove the app.nw so we use our local copy
cd ../../
rm -rf LightTable.app/Contents/Resources/app.nw
