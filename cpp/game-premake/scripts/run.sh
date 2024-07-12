#!/usr/bin/env bash
cd "$(dirname $0)"
cd ..

### os specific branching
case $(uname) in
Darwi*)
	echo ">>> ./premake5.osx gmake2"
	./premake5.osx gmake2
	echo ">>> make"
	make
	echo ">>> run ./bin/Debug/game-premake"
	./bin/Debug/game-premake
	;;
Linu*)
	echo ">>> Clean ./bin/"
	rm -rf ./bin
	echo ">>> premake5 gmake2"
	premake5 gmake2
	echo ">>> make"
	make
	echo ">>> run (steam-run)"
	steam-run ./bin/Debug/game-premake
	;;
esac
