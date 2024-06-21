#include <iostream>

int main() {
  // image parameters
  int image_width = 1200;  // 256
  int image_height = 1200; // 256

  // render
  // Header
  std::cout << "P3\n" << image_width << ' ' << image_height << "\n255\n";

  // pixels
  for (int j = 0; j < image_height; j++) {
    // width (i) is inner so we can write row-wise
    for (int i = 0; i < image_width; i++) {
      // note: red + green = yellow
      auto r = double(i) / (image_width - 1);
      auto g = double(j) / (image_height - 1);
      auto b = 0.0;

      int ir = int(255.99 * r);
      int ig = int(255.99 * g);
      int ib = int(255.99 * b);

      std::cout << ir << ' ' << ig << ' ' << ib << '\n';
      // std::cout << ir << ' ' << ig << ' ' << ib << '\t';
    }
    // std::cout << std::endl;
  }
}
