# Initial setup

## Prerequisites

- [Leiningen 2.x](http://leiningen.org/)
- [io.js and npm](https://iojs.org/). To avoid clobbering an existing node install, [use nvm](https://github.com/creationix/nvm).

## OS Specific Prerequisites

### OSX

None. Skip to [Build](#build).

### Windows

Download [Cygwin](https://cygwin.com/install.html).

You may need to change */etc/fstab* (path in Cygwin) to fix a directory permission error when building. Change this line:

```
none /cygdrive cygdrive binary,posix=0,user 0 0
```

Add `,noacl` to the line:

```
none /cygdrive cygdrive binary,posix=0,user,noacl 0 0
```

Close and re-open Cygwin Terminal.

The issue:

 - ["mkdir: cannot create directory" error running branch build on Windows 7 · Issue #1918 · LightTable/LightTable](https://github.com/LightTable/LightTable/issues/1918)


### Linux

To run electron on Linux you need to have libgconf-2.so.4 installed.


Ref: [Linux (Arch) build depends on libgconf-2.so.4](https://github.com/LightTable/LightTable/issues/1926)

# Build

To build LightTable from scratch on OSX, Windows Cygwin or Linux:

```bash
$ git clone https://github.com/LightTable/LightTable.git
$ cd LightTable
# Creates a directory in builds/
$ script/build.sh
```

This will take a few minutes the first time as electron and plugins are downloaded. Subsequent invocations are faster.
To override the output directory, specify `$VERSION` e.g. `VERSION=0.8.1-pre script/build.sh`.

On subsequent builds, use `script/build-app.sh` for quicker builds that don't require updating plugins or electron.
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
