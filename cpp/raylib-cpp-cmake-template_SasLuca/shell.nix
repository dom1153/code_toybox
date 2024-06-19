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

    # xorg.libX11

    # xorg.libX11.dev
    # xorg.libXrandr
    # xorg.libXinerama
    # xorg.libXcursor
    # xorg.xinput
    # xorg.libXi.dev
    # glfw
    # mesa

    ### VVV not needed
    # clangStdenv

    # builder
    # gnumake
    # cmake
    # ninja
    # bear

    # debugger
    # llvm.lldb
    # gdb

    # fix headers not found
    # clang-tools

    # LSP and compiler
    # llvm.libstdcxxClang

    # other tools
    # cppcheck
    # llvm.libllvm
    # valgrind
    # mymake
    # conan

    # stdlib for cpp
    # llvm.libcxx

    # libs
    # libGL
    # libGLU
    # faac
    # faad2
    # freeglut
    # glew
    # glfw
    # glm
    # SDL2
    # SDL2_ttf
    # SDL2_net
    # SDL2_gfx
    # SDL2_sound
    # SDL2_mixer
    # SDL2_image
  ];
}
