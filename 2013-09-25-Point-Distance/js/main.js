var units = prompt('What are the coordinate units?');
var points = [];
var coordinate;

for (var i = 0; i < 2; i++)
{
  coordinate = {};
  coordinate.x = parseInt(prompt('Enter the x coordinate of point ' + (i+1) + '.'));
  coordinate.y = parseInt(prompt('Enter the y coordinate of point ' + (i+1) + '.'));
  points.push(coordinate);
}

// Pythagoran math
var side_a = points[0].y - points[1].y;
var side_b = points[0].x - points[1].x;
var hypotenuse = Math.sqrt(Math.pow(side_a,2) + Math.pow(side_b, 2));

console.log('The distance between the two points entered is ' + hypotenuse + ' ' + units + '.');
