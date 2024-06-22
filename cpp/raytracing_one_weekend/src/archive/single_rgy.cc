#include <iostream>

// create https://raytracing.github.io/images/img-1.01-first-ppm-image.png
// writes image to std out ;
// redirect exe output to foo.ppm too write to file

int main() {
  // image parameters
  int image_width = 256;  // 256 (x)
  int image_height = 256; // 256 (y)
  bool newline = false;

  // render
  // Header
  std::cout << "P3\n" << image_width << ' ' << image_height << "\n255\n";

  // pixels
  for (int j = 0; j < image_height; j++) {
    // log is it's own stream I guess
    // with this \r we can overrwrite the line as we go???
    std::clog << "\rScanlines remaining: " << (image_height - j) << ' '
              << std::flush;
    // width (i) is inner so we can write row-wise
    for (int i = 0; i < image_width; i++) {
      // note: red + green = yellow
      // create a scalar from 0 to 1
      // r -> red x axis
      // g -> green y axis
      // r + g bend to become yellow
      auto r = double(i) / (image_width - 1);
      auto g = double(j) / (image_height - 1);
      auto b = 0.0;

      // 'scale' rg values from 0 to 256 instead of 0 to 1
      int ir = int(255.99 * r);
      int ig = int(255.99 * g);
      int ib = int(255.99 * b);

      if (newline) {
        std::cout << ir << ' ' << ig << ' ' << ib << '\n';
      } else {
        std::cout << ir << ' ' << ig << ' ' << ib << '\t';
      }
    }

    if (!newline) {
      std::cout << std::endl;
    }

    // \r let us overrwrite previous line? or something...
    // std::clog << "\rDone (" << j << ")                      \n";
    std::clog << "\rDone (" << j << ")                      ";
  }
  std::clog << std::endl;
}
