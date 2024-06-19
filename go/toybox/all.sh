#!/usr/bin/env bash

### go build is OK too
### go mod init helloworld

# cd src/helloworld
# nix develop --command go run ./src/helloworld/foo.go $*

### fetch dependencies if needed
nix develop --command bash -c "cd src/helloworld && go get helloworld"

nix develop --command bash -c "cd src/helloworld && go run foo.go $*"
