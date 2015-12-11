#!/usr/bin/env bash
set -e

# Build codox api docs and publish it on gh-pages branch

lein with-profile doc codox

git checkout gh-pages

rm -rf api/
mv codox api

git add api
git commit -m "Build api docs using script/build-api-docs.sh"
git push origin gh-pages:gh-pages
git checkout -
