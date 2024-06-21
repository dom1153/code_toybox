# Building

## For Nix Users (script):

Call nix shell and build:

```
./build-nix.sh
```

## Non-nix builds:

Requires cmake:

```
$ cmake -B build
$ cmake --build build
```

# LSP

Running a build will generate a `./build/compile_commands.json` which can be used with clangd lsp support.

Depending on your editor it may be be smart enough to search for `./build/compile_commands.json` automatically.

Otherwise you can link it to your root path:

```
ln -s ./build/compile_commands.json
```
