#!/usr/bin/env nix-shell
#!nix-shell -i bash --packages dotnet-sdk_7

### ensure our context is always the repo home
cd $(dirname "$0")
cd ../
nix develop
