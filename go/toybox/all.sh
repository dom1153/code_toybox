#!/usr/bin/env bash

### go build is OK too
### go mod init helloworld

cd src/helloworld
# nix develop --command go run ./src/helloworld/foo.go $*

### fetch dependencies if needed
nix develop --command go get helloworld

nix develop --command go run foo.go $*
