# Initial setup

## Install Leiningen and Node.js

First install or update [leiningen](http://leiningen.org/).

1. Download the lein script. For Windows, download lein.bat.
2. Place it on your $PATH where your shell can find it (eg. ~/bin).
3. Set it to be an executable (chmod a+x ~/bin/lein).
4. Run the Lein script (eg. "./lein" or "sh lein") without quotes.

You can also install it with your package manager but be sure to get version
2.x. Windows users can use this [installer](https://raw.github.com/technomancy/leiningen/stable/bin/lein.bat).

Then install [node and npm](http://nodejs.org/download/).

## Cygwin on Windows

On Windows (Cygwin), you may need to change */etc/fstab* (path in Cygwin) to fix a directory permission error when building. Change this line:

```
none /cygdrive cygdrive binary,posix=0,user 0 0
```

Add `,noacl` to the line:

```
none /cygdrive cygdrive binary,posix=0,user,noacl 0 0
```

Close and re-open Cygwin Terminal.

The issue:

 - ["mkdir: cannot create directory" error running "atom-shell" branch build on Windows 7 · Issue #1918 · LightTable/LightTable](https://github.com/LightTable/LightTable/issues/1918)

# Build

To build LightTable from scratch on OSX, Windows Cygwin or Linux:

```bash
$ git clone https://github.com/LightTable/LightTable.git
$ cd LightTable
# Creates a directory in builds/
$ script/build.sh
```

This will take a few minutes the first time as atom-shell and plugins are downloaded. Subsequent invocations are faster.
To override the output directory, specify `$VERSION` e.g. `VERSION=0.8.1-pre script/build.sh`.

On subsequent builds, use `script/build-app.sh` for quicker builds that don't require updating plugins or atom-shell.
If any ClojureScript files change, you must run `lein cljsbuild once`.  On Windows, you may need to comment out the :source-map
line before compiling ClojureScript to get around [issue 1025](https://github.com/LightTable/LightTable/issues/1025).

# Usage

Once you've built LightTable, run it in one of the following ways:

* OSX
  * As a commandline executable: `builds/lighttable-0.8.0-mac/light`
  * As an application: `open -a $PWD/builds/lighttable-0.8.0-mac/LightTable.app`
* Linux
  * As a commandline executable: `builds/lighttable-0.8.0-linux/light`
  * As an application: `builds/lighttable-0.8.0-linux/LightTable`
* Windows
  * As an application: `builds/lighttable-0.8.0-windows/LightTable.exe`

You can also run LightTable with `script/light.sh`. This script allows you to
skip running `script/build-app.sh`. While it's useful as a dev convenience,
final changes should be QAed with a fresh build from `script/build-app.sh`.
