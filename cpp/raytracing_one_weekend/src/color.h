#ifndef COLOR_H
#define COLOR_H

#include "vec3.h"

#include <iostream>

using color = vec3;

// just an output function, so w/e on inline
// imma inline to avoid warning
inline void write_color(std::ostream &out, const color &pixel_color,
                        bool newline = false) {
  auto r = pixel_color.x();
  auto g = pixel_color.y();
  auto b = pixel_color.z();

  // scale [0,1] to [0,255]
  int rbyte = int(255.99 * r);
  int gbyte = int(255.99 * g);
  int bbyte = int(255.99 * b);

  if (newline) {
    out << rbyte << ' ' << gbyte << ' ' << bbyte << '\n';
  } else {
    out << rbyte << ' ' << gbyte << ' ' << bbyte << '\t';
  }
}

#endif // !COLOR_H
