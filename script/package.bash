#!/usr/bin/env bash
set -e

# Ensure we start in project root
cd "$(dirname "${BASH_SOURCE[0]}")"; cd ..


if [ "$(uname)" == "Darwin" ]; then
  OS="mac"
  # TODO:
  #PACKAGE_SUBDIR=""

elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  OS="linux"
  # TODO:
  #PACKAGE_SUBDIR=""

elif [ "$(expr substr $(uname -s) 1 9)" == "CYGWIN_NT" ]; then
  OS="windows"
  PACKAGE_SUBDIR="package/LightTableWin/LightTable"

else
  echo "Cannot detect a supported OS."
  exit 1
fi

rm -rf package
mkdir -p "$PACKAGE_SUBDIR"


META=`head -n 1 project.clj`
NAME=`echo $META | cut -d' ' -f2`
DEFAULT_VERSION=`echo $META | cut -d' ' -f3 | tr -d '"'`
: ${VERSION:="$DEFAULT_VERSION"}

BUILDS=builds
RELEASE="$NAME-$VERSION-$OS"
RELEASE_DIR="$BUILDS/$RELEASE"

cp -r "$RELEASE_DIR"/* "$PACKAGE_SUBDIR"

cp -r deploy/* "$PACKAGE_SUBDIR"

if [ "$OS" == "mac" ]; then
  # TODO: Implement
  :
elif [ "$OS" == "linux" ]; then
  # TODO: Implement
  :
elif [ "$OS" == "windows" ]; then
  pushd shell
    node_modules/.bin/grunt compress:windows
  popd
fi
