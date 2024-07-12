#!/usr/bin/env bash
cd "$(dirname $0)"
cd ..

echo "$0 : Calling build script"
./scripts/build.sh
status=$?

if [[ $status -eq 0 ]]; then
	fname=image.ppm
	fname_path=./build/${fname}
	./build/One >$fname_path

	# echo "garbage" >$fname_path
	mime_type=$(file -Lb --mime-type -- ${fname_path})
	# echo ">>> " $mime_type
	if [[ $mime_type == 'image/x-portable-pixmap' ]]; then
		case $(uname) in
		Darwin*)
			open ./build/image.ppm
			;;
		Linux*)
			feh ./build/image.ppm
			;;
		*) ;;
		esac
	else
		echo ">>> Error: Image ($fname_path) is not ppm type ($mime_type)"
	fi
else
	echo ">>> Error: Skipping execute due to build fail ($status)"
fi
