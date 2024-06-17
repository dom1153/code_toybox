{
  description = "Example C++ development environment for Zero to Nix";

  # Flake inputs
  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.2305.491812.tar.gz";
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
          pkgs = import nixpkgs {inherit system;};
        });
  in {
    # Development environment output
    devShells = forAllSystems ({pkgs}: {
      default = pkgs.mkShell {
        # The Nix packages provided in the environment
        packages = with pkgs; [
          boost # The Boost libraries
          gcc # The GNU Compiler Collection
          cmake
          ### https://discourse.nixos.org/t/help-with-raylib-glfw-xlib/42453
          xorg.libX11.dev
          xorg.libXrandr
          xorg.libXinerama
          xorg.libXcursor
          xorg.xinput
          xorg.libXi.dev
          glfw
          mesa
        ];
        ### https://discourse.nixos.org/t/problems-building-raylib-rs/45142
        LD_LIBRARY_PATH = with pkgs;
          lib.makeLibraryPath [
            libGL
            xorg.libXrandr
            xorg.libXinerama
            xorg.libXcursor
            xorg.libXi
          ];
        LIBCLANG_PATH = "${pkgs.llvmPackages_11.libclang.lib}/lib";
      };

      ### https://www.reddit.com/r/NixOS/comments/1c0vdap/flakes_and_raylib/
    });
  };
}
