#!/usr/bin/env bash
set -e

# Create LightTable release using our local Electron installation
# (Mac, Linux, or Cygwin)

# Ensure we start in project root
cd "$(dirname "${BASH_SOURCE[0]}")"; cd ..

#----------------------------------------------------------------------
# Get OS-specific Electron details
#----------------------------------------------------------------------

ELECTRON_DIR="deploy/electron/electron"

# from: http://stackoverflow.com/a/17072017/142317
if [ "$(uname)" == "Darwin" ]; then
  OS="mac"
  PLIST="Electron.app/Contents/Info.plist"
  RESOURCES="Electron.app/Contents/Resources"
  PLATFORM_DIR="deploy/platform/mac"

elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  OS="linux"
  RESOURCES="resources"
  PLATFORM_DIR="deploy/platform/linux"

elif [ "$(expr substr $(uname -s) 1 9)" == "CYGWIN_NT" ]; then
  OS="windows"
  RESOURCES="resources"
  PLATFORM_DIR="deploy/platform/win"

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
RELEASE_TARBALL="${RELEASE}.tar.gz"
RELEASE_ZIP="${RELEASE}.zip"
RELEASE_RSRC="$RELEASE_DIR/$RESOURCES"

rm -rf $RELEASE_DIR $RELEASE_TARBALL $RELEASE_ZIP
rm -rf $RELEASE_DIR "$BUILDS/$RELEASE_TARBALL" "$BUILDS/$RELEASE_ZIP"

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
cp deploy/core/package.json $RELEASE_RSRC/app/
# sed -i with arg is only cross platform way. -i '' doesn't work across platforms
sed -i.bak 's/"main.js"/"core\/main.js"/' $RELEASE_RSRC/app/package.json
rm $RELEASE_RSRC/app/package.json.bak
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

  mv $RELEASE_DIR/Electron.app $RELEASE_DIR/LightTable.app

  # Sign app to avoid endless “accept incoming connections” dialogs
  codesign --force --deep --sign - $RELEASE_DIR/LightTable.app

elif [ "$OS" == "linux" ]; then

  cp $PLATFORM_DIR/light $RELEASE_DIR/

  mv $RELEASE_DIR/electron $RELEASE_DIR/LightTable

elif [ "$OS" == "windows" ]; then

  mv $RELEASE_DIR/electron.exe $RELEASE_DIR/LightTable.exe
  RCEDIT_PATH=`which rcedit` || { echo "expected to find rcedit; unable to rebrand the exe"; }
  if [ "$RCEDIT_PATH" != "" ]; then
    rcedit "$RELEASE_DIR/LightTable.exe" \
      --set-icon deploy/core/img/lticon.ico \
      --set-file-version "$VERSION" \
      --set-product-version "$VERSION" \
      --set-version-string "FileDescription" "Light Table" \
      --set-version-string "ProductName" "Light Table" \
      --set-version-string "CompanyName" "" \
      --set-version-string "LegalCopyright" "" \
      --set-version-string "OriginalFilename" ""
  fi

fi

#----------------------------------------------------------------------
# Create release version: tarball or zip file
#----------------------------------------------------------------------

if [ "$1" == "--release" ]; then
  # Create zip file for Cygwin (Windows) using 7-Zip
  if [ "$OS" == "windows" ]; then
    pushd "$BUILDS"
    "/cygdrive/c/Program Files/7-Zip/7z.exe" a $RELEASE_ZIP "$RELEASE/*"
    popd
  else
    pushd "$BUILDS"
    tar -zcvf $RELEASE_TARBALL $RELEASE/*
    popd
  fi
fi

echo DONE!
