{pkgs ? import <nixpkgs> {config.allowUnfree = true;}}:
pkgs.mkShell {
  buildInputs = with pkgs; [
    ### core
    cmake
    libGL
    xorg.libXrandr
    xorg.libXinerama
    xorg.libXcursor
    xorg.libXi

    ### util
    coreutils ### standardize ls (e.g. macos)
    file ### get file types
  ];
}
