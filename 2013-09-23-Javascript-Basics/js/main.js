// This is a multiline
// javascript
// comment

var first_name = prompt('What is your first name?');
var last_name = prompt('What is your last name?');
var full_name = first_name + " " + last_name;
var gender = prompt('What is your gender?');
var age = prompt('How old are you?');
age = parseInt(age);
var bday_month = prompt('What month were you born in?');
var current_month = prompt('What is the current month?');
var sum = 0;
var average = 0;
var test_scores = [];

console.log(full_name);

var test1 = parseFloat(prompt('Score for test 1?'));
console.log(test1);
test_scores.push(test1);

var test2 = parseFloat(prompt('Score for test 2?'));
console.log(test2);
test_scores.push(test2);


var test3 = parseFloat(prompt('Score for test 3?'));
console.log(test3);
test_scores.push(test3);

for (var i=0; i < test_scores.length; i++) {
  sum += test_scores[i];
}

average = sum / test_scores.length;
console.log("Your average test score is: " + average);

if (average < 70)
  console.log('failed');
else if (average < 80)
  console.log('You made a C');
else if (average < 90)
  console.log('You made a B');
else
  console.log('You made an A');

if (first_name == 'Drew' && last_name == 'Blumberg')
  console.log('Hey! I recognize you!')

if (gender == 'female' && age >= 21)
  console.log('Free drinks, ladies night!');
else if (gender == 'male' && age >= 21)
  console.log('Sorry, you gotta pay!');
else
  console.log('You must be old enough or human to get in.');

var can_have_cake = (current_month == bday_month);
var cake = can_have_cake ? "chocolate cake" : "dirt";
console.log('Can I have cake? ' + can_have_cake);
console.log('Marie Antoinette says you can have ' + cake + '.');
switch(bday_month)
{
  case 'January':
    console.log('You are a capricorn');
    break;
  case 'December':
    console.log('You are a sagitarrius');
    break;
  default:
    console.log('I don\'t know what you are.');
}
