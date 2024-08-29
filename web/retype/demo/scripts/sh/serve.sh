#!/usr/bin/env bash

### ensure our context is always the repo home
cd $(dirname "$0")
cd ../../
dotnet tool run retype start
