{
  description = "JS Environment Sandbox";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs?rev=2726f127c15a4cc9810843b96cad73c7eb39e443";
  };

  outputs = {
    self,
    nixpkgs,
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
          pkgs = import nixpkgs {inherit system;};
        });
  in {
    devShells = forAllSystems ({pkgs}: {
      default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs_20
          yarn
          deno
          bun
        ];
      };
    });
  };
}
