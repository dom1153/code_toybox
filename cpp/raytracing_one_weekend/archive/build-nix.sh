#!/usr/bin/env bash

echo ">>> Sourcing shell.nix, building"
nix-shell --run ./build.sh
