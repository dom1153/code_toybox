#!/usr/bin/env bash

ext=ppm
exe_path=./build
${exe_path}/One >${exe_path}/One.$ext
${exe_path}/rgy_ppm >${exe_path}/rgy_ppm.$ext
${exe_path}/rgy_ppm_2 >${exe_path}/rgy_ppm2.$ext
${exe_path}/simple_camera >${exe_path}/simple_camera.$ext
${exe_path}/sphere >${exe_path}/sphere.$ext
${exe_path}/sphere_color >${exe_path}/sphere_color.$ext

ls -l1 $exe_path/*.ppm
