#! /usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd "${DIR}/../shell"
	npm install -g grunt-cli
	npm install
	grunt download-atom-shell
popd

"${DIR}/../shell/atom-shell/Atom.app/Contents/MacOS/Atom" $DIR
