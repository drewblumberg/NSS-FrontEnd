var types = [], items = [];
var item = {};

var type_response = prompt('Enter a category for the menu or leave blank to exit:');
var item_response;

//Function to print the menu in the console

function print_menu(categories, foods) {
  for(var k =0; k < categories.length; k++) {
    console.log(categories[k]);
    for (var j = 0; j < foods.length; j++) {
      if (categories[k] == foods[j].type)
        console.log('- ' + foods[j].name + ' (' + foods[j].ingredients.join() + ') $' + foods[j].price);
    }
  }
}

// Enter menu categories

while(type_response)
{
  types.push(type_response);
  type_response = prompt('Enter a category for the menu or leave blank to exit:');
}

// Add menu items to each category

for(var i = 0; i < types.length; i++) {
  item_response = prompt('Enter a menu item for the ' + types[i] + ' category or leave blank to move on.');
  while (item_response) {
    item = {};
    item.name = item_response;
    item.type = types[i];
    item.price = parseFloat(prompt('What is the cost of this item?'));
    item.calories = parseFloat(prompt('How many calories does this item contain?'));
    item.ingredients = prompt('Enter each ingredient, separated by a comma.').split(',');
    items.push(item);
    item_response = prompt('Enter a menu item for the ' + types[i] + ' category or leave blank to move on.');
  }
}

//Print the menu in the console

print_menu(types, items);

// Calculate menu items and costs

var num_items = items.length;
var num_types = types.length;
var total_calories = 0, total_cost = 0;
for (var m = 0; m < items.length; m++) {
  total_calories += items[m].calories;
  total_cost += items[m].price;
}
var avg_cost = total_cost / items.length;
var avg_calories = total_calories / items.length;

console.log('The total number of items is ' + num_items + '.');
console.log('The total number of types is ' + num_types + '.');
console.log('The total number of calories is ' + total_calories + '.');
console.log('The total cost of the menu is ' + total_cost + '.');
console.log('The average cost of the menu items is ' + avg_cost + '.');
console.log('The average calories of the menu items is ' + avg_calories + '.');


