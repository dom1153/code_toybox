{
  description = "bun development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    supportedSystems = [
      "x86_64-linux" # 64-bit Intel/AMD Linux
      "aarch64-linux" # 64-bit ARM Linux
      "aarch64-linux"
      "aarch64-darwin"
    ]; # add your system
    forEachSupportedSystem = f:
      nixpkgs.lib.genAttrs supportedSystems (system:
        f {
          pkgs = import nixpkgs {inherit system;};
        });
  in {
    devShells = forEachSupportedSystem ({pkgs}: {
      default = pkgs.mkShell {
        packages = with pkgs; [
          automake
          ccache
          coreutils-full
          gnused
          go
          libiconv
          libtool
          ninja
          pkg-config
          ruby
          rustc
          cargo
          bun
          llvmPackages_16.lldb
          llvmPackages_16.libstdcxxClang
          llvmPackages_16.libllvm
          llvmPackages_16.libcxx
          lld_16
          clang-tools
          clang_16
          autoconf
        ];

        shellHook = ''
          export CC="${pkgs.llvmPackages_16.libstdcxxClang}/bin/clang"
          export CXX="${pkgs.llvmPackages_16.libstdcxxClang}/bin/clang++"
        '';
      };
    });
  };
}
