#include "color.h"
#include "ray.h"
#include "vec3.h"

#include <iostream>

double hit_sphere(const point3 &center, double radius, const ray &r);
color ray_color(const ray &r);
color lerp(const color &start, const color &end, const double value);

int main() {
  bool newline = false;

  // (user) image parameters
  auto aspect_ratio = 16.0 / 9.0;
  int image_width = 400;

  // height is now calculated
  int image_height = int(image_width / aspect_ratio);
  if (image_height < 1) {
    image_height = 1;
  }

  // camera
  // note: viewport height/width (real values)
  //       we don't use 'aspect_ratio' because pixels are ints
  auto focal_length = 1.0;
  auto viewport_height = 2.0;
  auto viewport_width = viewport_height + (double(image_width) / image_height);
  auto camera_center = point3(0, 0, 0);

  // vectors along the horizontal and vertical viewport
  auto viewport_u = vec3(viewport_width, 0, 0);
  auto viewport_v = vec3(0, -viewport_height, 0);

  // horizontal and vertical delta vectors from pixel to pixel
  auto pixel_delta_u = viewport_u / image_width;
  auto pixel_delta_v = viewport_v / image_height;

  // calculate upper pixel location
  auto viewport_upper_left = camera_center - vec3(0, 0, focal_length) -
                             (viewport_u / 2) - (viewport_v / 2);
  auto pixel00_loc =
      viewport_upper_left + (0.5 * (pixel_delta_u + pixel_delta_v));

  // render
  std::cout << "P3\n" << image_width << ' ' << image_height << "\n255\n";

  for (int j = 0; j < image_height; j++) {
    std::clog << "\rScanlines remaining: " << (image_height - j) << ' '
              << std::flush;
    // width (i) is inner so we can write row-wise
    for (int i = 0; i < image_width; i++) {
      auto pixel_center =
          pixel00_loc + (i * pixel_delta_u) + (j * pixel_delta_v);

      auto ray_direction = pixel_center - camera_center;
      ray r(camera_center, ray_direction);

      color pixel_color = ray_color(r);
      write_color(std::cout, pixel_color, newline);
    }

    if (newline) {
      std::cout << std::endl;
    }

    // \r let us overrwrite previous line? or something...
    // std::clog << "\rDone (" << j << ")                      \n";
    std::clog << "\rDone (" << j << "/" << (image_height - 1) << ")"
              << "                             ";
  }
  std::clog << std::endl;
}

const color RED = color(1, 0, 0);
const color BLUE = color(0, 1, 0);
const color GREEN = color(0, 0, 1);
const color BLACK = color(0, 0, 0);
const color WHITE = color(1, 1, 1);
const color BLUE_SKY = color(0.5, 0.7, 1.0);

double hit_sphere(const point3 &center, double radius, const ray &r) {
  // math
  vec3 oc = center - r.origin();
  // quadratic formula ax^2 + bx + c
  auto a = dot(r.direction(), r.direction()); // a = d  d
  auto b = -2.0 * dot(r.direction(), oc);     // -2d  (C - Q)
  auto c = dot(oc, oc) - radius * radius;     // (C - Q)  (C - Q) - r^2
  auto discriminant = b * b - 4 * a * c;      // t (# of ray hits)

  if (discriminant < 0) {
    // calcs allow for negative ('behind' the camera); don't draw
    return -1.0;
  } else {
    return (-b - sqrt(discriminant)) / (2.0 * a);
  }
}

color ray_color(const ray &r) {
  auto t = hit_sphere(point3(0, 0, -1), 0.5, r);
  if (t > 0.0) {
    vec3 N = unit_vector(r.at(t) - vec3(0, 0, -1)); // sphere normal
    return 0.5 * color(N.x() + 1, N.y() + 1, N.z() + 1);
  }

  // return color(0, 0, 0); // stub for now
  auto unit_direction = unit_vector(r.direction());
  auto a = 0.5 * (unit_direction.y() + 1.0);
  return lerp(WHITE, BLUE_SKY, a);
}

color lerp(const color &start, const color &end, const double a) {
  return ((1.0 - a) * start) + (a * end);
}
