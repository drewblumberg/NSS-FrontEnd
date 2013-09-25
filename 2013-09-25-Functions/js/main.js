function square(x) {
  return x * x;
}

function cube(x) {
  return square(x) * x;
}

function area_rect(width, height) {
  return width * height;
}

function area_square(side) {
  return square(side);
}

function area_rt_triangle(width, height) {
  return area_rect(width, height) / 2;
}

function area_circle(radius) {
  return square(radius) * Math.PI;
}

function volume_cylinder(diameter, height) {
  return cubic_feet_to_gallons(square(diameter) / 4 * Math.PI * height);
}

function cubic_feet_to_gallons(volume) {
  return volume * 7.48052;
}

var pool_vol = volume_cylinder(30,9);
console.log('There are ' + pool_vol + ' gallons of water in the pool.')