#!/usr/bin/env bash

echo ">>> Clean ./bin/"
rm -rf ./bin
# rm -rf ./raylib-master

echo ">>> premake5 gmake2"
premake5 gmake2

echo ">>> make"
make

echo ">>> run (steam-run)"
steam-run ./bin/Debug/game-premake
