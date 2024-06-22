#!/usr/bin/env bash

echo ">>> Sourcing shell.nix, building"
nix-shell --run ./build.sh

./run.sh >./build/image.ppm
case $(uname) in
Darwin*)
	open ./build/image.ppm
	;;
Linux-*)
	feh ./build/image.ppm
	;;
*) ;;
esac
