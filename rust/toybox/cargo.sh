#!/usr/bin/env nix-shell
#!nix-shell -i bash --packages cargo rustc

### ensure our context is always the repo home
cd $(dirname "$0")
cd ./
cargo $*
