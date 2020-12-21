#!/bin/bash
set -euo pipefail
repo_root=$(cd $(dirname $0)/.. && pwd)
cd ${repo_root}

echo "Cleaning dist directories..."
rm -rf dist/
rm -rf packages/cdkactions/dist
rm -rf packages/cdkactions-cli/dist

echo "Packaging JSII module..."
jsii-pacmak -v -v packages/cdkactions

echo "Packaging CLI..."
cd packages/cdkactions-cli
yarn package
