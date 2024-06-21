#!/usr/bin/env bash

echo ">>> Sourcing shell.nix, building"
nix-shell --run ./build.sh
# ./run.sh

./run.sh >./build/image.ppm
feh ./build/image.ppm
