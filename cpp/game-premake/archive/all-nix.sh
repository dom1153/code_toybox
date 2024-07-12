#!/usr/bin/env bash

echo ">>> Sourcing shell.nix, calling run script"
nix-shell --run ./all.sh
