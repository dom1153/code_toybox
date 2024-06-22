#include "color.h"
#include "vec3.h"

#include <iostream>

int main() {
  // image parameters
  int image_width = 256;  // 256 (x)
  int image_height = 256; // 256 (y)
  bool newline = false;

  // render
  std::cout << "P3\n" << image_width << ' ' << image_height << "\n255\n";

  for (int j = 0; j < image_height; j++) {
    std::clog << "\rScanlines remaining: " << (image_height - j) << ' '
              << std::flush;
    // width (i) is inner so we can write row-wise
    for (int i = 0; i < image_width; i++) {
      auto pixel_color = color(double(i) / (image_width - 1),
                               double(j) / (image_height - 1), 0);
      write_color(std::cout, pixel_color, newline);
    }

    if (newline) {
      std::cout << std::endl;
    }

    // \r let us overrwrite previous line? or something...
    // std::clog << "\rDone (" << j << ")                      \n";
    std::clog << "\rDone (" << j << ")                      ";
  }
}
