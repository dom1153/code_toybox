# Code sandbox

This is a monorepo of my general code that I like to mess around with.

The repo contains a lot of unfinished projects and starter code I'm using when learning a new language.

Many of these projects contain a .devcontainer, which can be used with the VS Code devcontainer extension to try the tooling without installing it yourself (docker is required though).

Some directories contain nix flakes for those familiar with the nix packaging system.

## Monorepo structure

The source code is separated by language, then into indvidual projects.

```bash
/
├── cpp/
│   ├── game-premake/
│   └── raytracing_one_weekend/
├── go/
│   ├── my_lsp/
│   └── toybox/
│       └── src/
│           ├── calculator/
│           ├── helloworld/
│           └── mytea/
├── python/
│   └── pixi
├── rust/
├── sh/
└── web/
    ├── astro_toybox/
    │   ├── ecliptic-equator/
    │   ├── learning-threejs_estubmo/
    │   └── shadcn-ui-template/
    ├── nextjs/
    │   ├── fictional-spoon/
    │   └── nextjs-p5js-tutorial_alecrem/
    ├── retype/
    │   └── demo/
    └── workshop/
        ├── frontend_masters_react_expo_intro/
        │   └── taskly/
        └── frontend_masters_sqlite_intro/
```