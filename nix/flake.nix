{
  description = "The Everything sandbox";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11"; # use stable branch (good enough for deno 2)
    rust-overlay.url = "github:oxalica/rust-overlay"; # A helper for Rust + Nix
  };

  outputs = {
    self,
    nixpkgs,
    rust-overlay,
  }: let
    allSystems = [
      "x86_64-linux"
      "aarch64-linux"
      "x86_64-darwin"
      "aarch64-darwin"
    ];

    forAllSystems = f:
      nixpkgs.lib.genAttrs allSystems (system:
        f {
          pkgs = import nixpkgs {
            inherit overlays system;
            config.allowUnfree = true;
          };
        });

    overlays = [
      (import rust-overlay)
      (self: super: {
        rustToolchain = super.rust-bin.stable.latest.default;
      })
    ];
  in {
    devShells = forAllSystems ({pkgs}: {
      default = pkgs.mkShell {
        ### rust, go, pythnn, web
        packages =
          (with pkgs; [
            ### golang
            go
            gotools
            # cobra-cli

            ### python
            (python3.withPackages (ps:
              with ps; [
                virtualenv # Virtualenv
                pip # The pip installer
                django
              ]))
            pixi
            poetry

            ### misc
            ngrok

            ### web
            nodejs_20
            yarn
            deno
            bun

            ### rust
            rustToolchain
          ])
          ++ pkgs.lib.optionals pkgs.stdenv.isDarwin (with pkgs; [libiconv]); ### <<< for rust

        shellHook = ''
          poetry config virtualenvs.in-project true
        '';
      };
    });
  };
}
