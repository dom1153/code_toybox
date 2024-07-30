#!/usr/bin/env bash
cd "$(dirname $0)"
cd ..

npm i
npm run dev -- --port 3153
