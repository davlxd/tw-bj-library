#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Testing node backend"
echo "-------------------------------------------------------------------"

$BASE_DIR/../node_modules/mocha/bin/mocha $BASE_DIR/../test/node/*.js
