#!/usr/bin/env bash
set -e

# Create LightTable release using our local Atom Shell installation
# (Mac, Linux, or Cygwin)

# Ensure we start in project root
cd "$(dirname "${BASH_SOURCE[0]}")"; cd ..

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
RELEASE="$NAME-$VERSION-$OS"
RELEASE_DIR="$BUILDS/$RELEASE"
RELEASE_ZIP="$BUILDS/${RELEASE}.zip"
RELEASE_RSRC="$(pwd)/$RELEASE_DIR/$RESOURCES"

rm -rf $RELEASE_DIR $RELEASE_ZIP

#----------------------------------------------------------------------
# Copy Atom installation and app directory into output location
#----------------------------------------------------------------------

echo "Creating $RELEASE_DIR ..."
mkdir -p $RELEASE_DIR
cp -R $ATOM_DIR/Atom.app $RELEASE_DIR/

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

  cp $PLATFORM_DIR/LightTable $RELEASE_DIR/

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
