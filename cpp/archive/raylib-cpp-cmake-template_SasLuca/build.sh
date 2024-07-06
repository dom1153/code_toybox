#!/usr/bin/env bash

### generate build folder
cmake -S . -B build

### actually do the build
cmake --build build
