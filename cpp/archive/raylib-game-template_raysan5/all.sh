#!/usr/bin/env bash

echo ">>> Clean ./build/"
rm -rf build/

### generate build folder
echo ">>> Generating build folder"
cmake -S . -B build

### actually do the build
echo ">>> Building project"
cmake --build build

echo ">>> Running output"
./build/raylib-game-template/raylib-game-template
