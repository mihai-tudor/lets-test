#!/usr/bin/env bash
export WDIO_CONFIG=$PWD/node_modules/lets-test/wdio/wdio.conf.js
export SPECS_PATTERN="$PWD/test/wdio/*.spec.js $PWD/test/wdio/**/*.spec.js"
cd $PWD"/node_modules/lets-test"
npx wdio $WDIO_CONFIG --spec $SPECS_PATTERN