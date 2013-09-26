var cost_per_window = 250;
var cost_per_sqft = 200;
var cost_per_gallon = 0.25;
var rooms = [];
var total_rooms = 0, total_windows = 0, total_sqft = 0;

function item_cost(num_item, cost) {
  return num_item * cost;
}

function room_area(width, length) {
  return width * length;
}

function cubic_feet_to_gallons(volume) {
  return volume * 7.48052;
}

var response = prompt('Enter a room for the house or leave blank to finish:');
while(response) {
  var room = {};
  room.num_windows = Math.abs(parseInt(prompt('How many windows does the room have?')));
  room.width = Math.abs(parseFloat(prompt('What is the width of the room?')));
  room.length = Math.abs(parseFloat(prompt('What is the length of the room?')));
  rooms.push(room);
  response = prompt('Enter a room for the house or leave blank to finish:');
}

var total_rooms = rooms.length;

for (var i = 0; i < rooms.length; i++) {
  total_windows += rooms[i].num_windows;
  total_sqft += room_area(rooms[i].width, rooms[i].length);
}

var total_cost_windows = item_cost(total_windows, cost_per_window);
var total_cost_sqft = item_cost(total_sqft, cost_per_sqft);
var total_cost = total_cost_sqft + total_cost_windows;

var pool_response = prompt('Do you have a pool? (yes or no)');

if (pool_response.toLowerCase() == 'yes') {
  var pool = {};
  pool.diameter = parseFloat(prompt('What is the pool\'s diameter in feet?'));
  pool.depth = parseFloat(prompt('What is the pool\'s depth in feet?'));

  var pool_area = pool.diameter * pool.diameter / 4 * Math.PI;
  var pool_cost = cubic_feet_to_gallons(pool_area * pool.depth) * cost_per_gallon;
}



console.log('The number of rooms is ' + total_rooms + '.');
console.log('The number of windows is ' + total_windows + '.');
console.log('The number of square feet is ' + total_sqft + '.');

console.log('The total cost of the windows is $' + total_cost_windows + '.');
console.log('The total cost of the rooms is $' + total_cost_sqft + '.');
if (pool_response) {
  console.log('The total cost of the pool is $' + pool_cost + '.');
  console.log('The total cost of the house is $' + (total_cost + pool_cost) + '.');
}
else {
  console.log('The total cost of the house is $' + total_cost + '.');
}


