# Initial setup

First install or update [leiningen](http://leiningen.org/).

1. Download the lein script. For Windows, download lein.bat.
2. Place it on your $PATH where your shell can find it (eg. ~/bin).
3. Set it to be an executable (chmod a+x ~/bin/lein).
4. Run the Lein script (eg. "./lein" or "sh lein") without quotes.

You can check your package manager. However, be sure you get version 2.x. Windows users can use this [installer](https://raw.github.com/technomancy/leiningen/stable/bin/lein.bat).

Then we have to do some juggling (unless you fancy building node-webkit from source).

On OS X:

``` bash
git clone https://github.com/LightTable/LightTable.git
cd LightTable
sh osx_deps.sh
export LT_HOME=$(pwd)/deploy
./deploy/light
```

On Linux:

``` bash
git clone https://github.com/LightTable/LightTable.git
cd LightTable
bash linux_deps.sh
./deploy/LightTable
```

On Windows (using Cygwin) (note: this may trigger [issue 1025](https://github.com/LightTable/LightTable/issues/1025)):

``` bash
git clone https://github.com/LightTable/LightTable.git
cd LightTable
bash windows_deps.sh
chmod -R u+rwx deploy/
./deploy/LightTable
```

On Windows (manual):

1. Clone the repo https://github.com/LightTable/LightTable.git
2. Download http://d35ac8ww5dfjyg.cloudfront.net/playground/bins/0.6.0/LightTableWin.zip
3. Unzip LightTableWin.zip
4. Copy the following files from the zip into the cloned repo at LightTable/deploy/
   - ffmpegsumo.dll
   - icudt.dll
   - libEGL.dll
   - libGLESv2.dll
   - LightTable.exe
   - nw.pak
5. You can also either copy the plugins/ folder over too or git clone the ones you want to modify down from github. You'll want at least the Clojure plugin and the Rainbow plugin.
6. Double click LightTable.exe

# Building

After the initial setup, you can compile the ClojureScript source at any time with `lein cljsbuild once`.
