#!/usr/bin/env bash
set -e

# Opens current LightTable without needing to build it.
# Assumes script/build.sh has been run at least once

# Ensure we start in project root
cd "$(dirname "${BASH_SOURCE[0]}")"; cd ..
DIR=$(pwd)

if [ "$(uname)" == "Darwin" ]; then
  CLI="${DIR}/shell/electron/Atom.app/Contents/MacOS/Atom"
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
  CLI="${DIR}/shell/electron/atom"
elif [ "$(expr substr $(uname -s) 1 9)" == "CYGWIN_NT" ]; then
  CLI="${DIR}/shell/electron/atom.exe"
else
  echo "Cannot detect a supported OS."
  exit 1
fi

LT_DEV_CLI=true "$CLI" deploy "$@"
