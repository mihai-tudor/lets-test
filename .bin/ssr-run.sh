#!/usr/bin/env bash
mkdir -p screenshots/ssr/withJS
mkdir -p screenshots/ssr/withoutJS
cd $PWD"/node_modules/lets-test"
npx mocha "./ssr" --timeout 60000