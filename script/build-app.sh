#!/usr/bin/env bash
set -e

# Create LightTable release using our local Electron installation
# (Mac, Linux, or Cygwin)

# Ensure we start in project root
cd "$(dirname "${BASH_SOURCE[0]}")"; cd ..

#----------------------------------------------------------------------
# Get OS-specific Electron details
#----------------------------------------------------------------------

ELECTRON_DIR="shell/electron"

# from: http://stackoverflow.com/a/17072017/142317
# Will need to change Atom.app/atom/atom.exe to Electron.app/exe once we move to ^0.24.0 https://github.com/atom/grunt-download-electron/issues/30
if [ "$(uname)" == "Darwin" ]; then
  OS="mac"
  EXE="Atom.app/Contents/MacOS/Atom"
  PLIST="Atom.app/Contents/Info.plist"
  RESOURCES="Atom.app/Contents/Resources"
  PLATFORM_DIR="platform/mac"

elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  OS="linux"
  EXE="electron"
  RESOURCES="resources"
  PLATFORM_DIR="platform/linux"

elif [ "$(expr substr $(uname -s) 1 9)" == "CYGWIN_NT" ]; then
  OS="windows"
  EXE="electron.exe"
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
RELEASE="$NAME-$VERSION-$OS"
RELEASE_DIR="$BUILDS/$RELEASE"
RELEASE_TARBALL="$BUILDS/${RELEASE}.tar.gz"
RELEASE_ZIP="${RELEASE}.zip"
RELEASE_RSRC="$RELEASE_DIR/$RESOURCES"

rm -rf $RELEASE_DIR $RELEASE_TARBALL $RELEASE_ZIP

#----------------------------------------------------------------------
# Copy Electron installation and app directory into output location
#----------------------------------------------------------------------

echo "Creating $RELEASE_DIR ..."
mkdir -p $RELEASE_DIR
cp -R $ELECTRON_DIR/* $RELEASE_DIR
rm -f $RELEASE_DIR/version
cp LICENSE.md $RELEASE_DIR/LICENSE

mkdir $RELEASE_RSRC/app
cp -R deploy/core $RELEASE_RSRC/app/
cp deploy/package.json $RELEASE_RSRC/app/
cp -R deploy/settings $RELEASE_RSRC/app/
cp -R deploy/plugins "${RELEASE_RSRC}"/app/
rm -rf "${RELEASE_RSRC}"/app/plugins/*/.git

#----------------------------------------------------------------------
# Polishing
#----------------------------------------------------------------------

if [ "$OS" == "mac" ]; then

  cp $PLATFORM_DIR/light $RELEASE_DIR/
  cp $PLATFORM_DIR/Info.plist $RELEASE_DIR/$PLIST

  FULL_PLIST="$(pwd)/$RELEASE_DIR/$PLIST"
  defaults write $FULL_PLIST CFBundleShortVersionString $VERSION

  mv $RELEASE_DIR/Atom.app $RELEASE_DIR/LightTable.app

  # Sign app to avoid endless “accept incoming connections” dialogs
  codesign --force --deep --sign - $RELEASE_DIR/LightTable.app

elif [ "$OS" == "linux" ]; then

  cp $PLATFORM_DIR/light $RELEASE_DIR/

  mv $RELEASE_DIR/atom $RELEASE_DIR/LightTable

elif [ "$OS" == "windows" ]; then

  mv $RELEASE_DIR/atom.exe $RELEASE_DIR/LightTable.exe

fi

#----------------------------------------------------------------------
# Create tarball or zip file
#----------------------------------------------------------------------

if [ "$1" == "--tarball" ]; then
  tar -zcvf $RELEASE_TARBALL $RELEASE_DIR
fi

# Create zip file for Cygwin (Windows) using 7-Zip
if [ "$1" == "--zip" ]; then
  pushd "$BUILDS"
  "/cygdrive/c/Program Files/7-Zip/7z.exe" a $RELEASE_ZIP "$RELEASE/*"
  popd
fi

echo DONE!
