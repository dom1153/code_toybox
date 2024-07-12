#!/usr/bin/env bash
cd "$(dirname $0)"
cd ..

rm -rf ./build
cmake -B build ### -DCMAKE_EXPORT_COMPILE_COMMANDS=1
cmake --build build --config release
