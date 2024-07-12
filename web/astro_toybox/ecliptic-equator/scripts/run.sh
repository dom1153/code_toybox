#!/usr/bin/env bash
cd "$(dirname $0)"
cd ..

if [[ ! -d node_modules ]]; then
	npm i
fi
npm run dev
