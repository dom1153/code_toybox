{
  ### this doesn't work, but nix-shell does. not sure why
  description = "CMake and steamrun to build raylib games";

  # Flake inputs
  inputs = {
    # nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.2305.491812.tar.gz";
    nixpkgs.url = "github:NixOS/nixpkgs?rev=2726f127c15a4cc9810843b96cad73c7eb39e443";
  };

  # Flake outputs
  outputs = {
    self,
    nixpkgs,
  }: let
    # Systems supported
    allSystems = [
      "x86_64-linux" # 64-bit Intel/AMD Linux
      "aarch64-linux" # 64-bit ARM Linux
      "x86_64-darwin" # 64-bit Intel macOS
      "aarch64-darwin" # 64-bit ARM macOS
    ];

    # Helper to provide system-specific attributes
    forAllSystems = f:
      nixpkgs.lib.genAttrs allSystems (system:
        f {
          pkgs = import nixpkgs {
            inherit system;
            config.allowUnfree = true; ### useful snippet for things like steam-run
          };
        });
  in {
    # Development environment output
    devShells = forAllSystems ({pkgs}: {
      default = pkgs.mkShell {
        # The Nix packages provided in the environment
        packages = with pkgs; [
          # boost # The Boost libraries
          # gcc # The GNU Compiler Collection
          cmake
          libGL
          xorg.libXrandr
          xorg.libXinerama
          xorg.libXcursor
          xorg.libXi

          steam-run
        ];
      };
    });
  };
}
