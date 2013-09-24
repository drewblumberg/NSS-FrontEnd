// This is a multiline
// javascript
// comment

//Get user name
var name = prompt('What is your name?');

//Get and parse balance, deposits, and withdrawals
var balance = prompt('What is your current account balance?');
balance = parseFloat(balance);
var dep1 = prompt('Enter deposit 1:'), dep2 = prompt('Enter deposit 2:'), dep3 = prompt('Enter deposit 3:');
dep1 = parseFloat(dep1);
dep2 = parseFloat(dep2);
dep3 = parseFloat(dep3);
var with1 = prompt('Enter withdrawal 1:'), with2 = prompt('Enter withdrawal 2:'), with3 = prompt('Enter withdrawal 3:');
with1 = parseFloat(with1);
with2 = parseFloat(with2);
with3 = parseFloat(with3);

// Balance calculations
var current_balance = balance + (dep1 + dep2 + dep3) - (with1 + with2 + with3);
var final_balance = (current_balance >= 0) ? current_balance : (current_balance - 50);

console.log('The final balance for ' + name + ' is ' + final_balance);


