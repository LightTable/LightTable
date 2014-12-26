#!/usr/bin/env bash
set -e

# Ensure we start in assumed directory
cd "$(dirname "${BASH_SOURCE[0]}")"

# Create LightTable release using our local Atom Shell installation
# (Mac, Linux, or Cygwin)

#----------------------------------------------------------------------
# Get OS-specific Atom details
#----------------------------------------------------------------------

ATOM_DIR="shell/atom-shell"

# from: http://stackoverflow.com/a/17072017/142317
if [ "$(uname)" == "Darwin" ]; then
  OS="mac"
  EXE="Atom.app/Contents/MacOS/Atom"
  PLIST="Atom.app/Contents/Info.plist"
  RESOURCES="Atom.app/Contents/Resources"
  PLATFORM_DIR="platform/mac"

elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  OS="linux"
  EXE="atom"
  RESOURCES="resources"
  if [ $(getconf LONG_BIT) == "64" ]; then
    PLATFORM_DIR="platform/linux"
  else
    PLATFORM_DIR="platform/linux64"
  fi

elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]; then
  OS="windows"
  EXE="atom.exe"
  RESOURCES="resources"
  PLATFORM_DIR="platform/win"

else
  echo "Cannot detect a supported OS."
  exit 1
fi

#----------------------------------------------------------------------
# Determine release name and output location
#----------------------------------------------------------------------

META=`head -n 1 project.clj`
NAME=`echo $META | cut -d' ' -f2`
DEFAULT_VERSION=`echo $META | cut -d' ' -f3 | tr -d '"'`
: ${VERSION:="$DEFAULT_VERSION"}

BUILDS=builds
mkdir -p $BUILDS

RELEASE="$NAME-$VERSION-$OS"
RELEASE_DIR="$BUILDS/$RELEASE"
RELEASE_ZIP="$BUILDS/${RELEASE}.zip"
RELEASE_RSRC="$(pwd)/$RELEASE_DIR/$RESOURCES"

rm -rf $RELEASE_DIR $RELEASE_ZIP

#----------------------------------------------------------------------
# Copy Atom installation and app directory into output location
#----------------------------------------------------------------------

echo "Creating $RELEASE_DIR ..."

cp -R $ATOM_DIR $RELEASE_DIR
rm -f $RELEASE_DIR/version
rm -f $RELEASE_DIR/LICENSE

mkdir $RELEASE_RSRC/app
cp -R deploy/core $RELEASE_RSRC/app/
cp deploy/package.json $RELEASE_RSRC/app/
cp -R deploy/settings $RELEASE_RSRC/app/


#----------------------------------------------------------------------
# Fetch plugins and copy into output location
#----------------------------------------------------------------------

# TODO: Handle node/node
PLUGINS=("Clojure,0.1.0" "CSS,0.0.6" "HTML,0.0.2" "Javascript,0.1.2"
         "Paredit,0.0.4" "Python,0.0.5" "Rainbow,0.0.8")

PLUGINS_DIR="$RELEASE_RSRC/app/plugins"
mkdir -p $PLUGINS_DIR
# Plugins cache
mkdir -p deploy/plugins

pushd deploy/plugins
  for plugin in "${PLUGINS[@]}" ; do
      NAME="${plugin%%,*}"
      VERSION="${plugin##*,}"
      if [ -d $NAME ]; then
        echo "Updating plugin $NAME $VERSION..."
        cd $NAME
        git checkout --quiet master
        git pull --quiet
        git checkout --quiet $VERSION
        cd -
      else
        echo "Cloning plugin $NAME $VERSION..."
        git clone "https://github.com/LightTable/$NAME"
        cd $NAME
        git checkout --quiet $VERSION
        cd -
      fi
      cp -R $NAME $PLUGINS_DIR/
      rm -rf "$PLUGINS_DIR/$NAME/.git"
  done
popd

#----------------------------------------------------------------------
# Polishing
#----------------------------------------------------------------------

# Copy over platform-specific files e.g. executables
cp $PLATFORM_DIR/* $RELEASE_DIR/

if [ "$OS" == "mac" ]; then

  FULL_PLIST="$(pwd)/$RELEASE_DIR/$PLIST"

  # TODO: Port keys from previous plist
  defaults write $FULL_PLIST CFBundleIconFile 'app/core/img/lticon.png'
  defaults write $FULL_PLIST CFBundleDisplayName 'Light Table'
  defaults write $FULL_PLIST CFBundleIdentifier 'com.kodowa.LightTable'
  # TODO: Fix enabling causes LSOpenURLsWithRole() failed ... error -10810
  # defaults write $FULL_PLIST CFBundleName 'LightTable'

  mv $RELEASE_DIR/Atom.app $RELEASE_DIR/LightTable.app

elif [ "$OS" == "linux" ]; then

  mv $RELEASE_DIR/atom $RELEASE_DIR/LightTable

elif [ "$OS" == "windows" ]; then

  winresourcer --operation=Update \
               --exeFile=$RELEASE_DIR/atom.exe \
               --resourceType=Icongroup \
               --resourceName:1 \
               --resourceFile:$RELEASE_RSRC/app/core/img/lticon.png

  mv $RELEASE_DIR/atom.exe $RELEASE_DIR/LightTable.exe

fi

#----------------------------------------------------------------------
# Create zip
#----------------------------------------------------------------------

if [ "$1" == "-z" ]; then
  zip -r $RELEASE_ZIP $RELEASE_DIR
fi

echo DONE!
