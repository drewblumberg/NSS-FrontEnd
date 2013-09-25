var dogs = [];
var dog = {};

var name = prompt('Enter a dog\'s name or blank to exit:');

while(name)
{
  dog = {};
  dog.name = name;
  dog.age = parseInt(prompt('Age?'));
  dog.breed = prompt('Breed?');
  dogs.push(dog);
  var name = prompt('Enter a dog\'s name or blank to exit:')
}

var sum_age = 0;

for (var i=0; i < dogs.length; i++)
{
  sum_age += dogs[i].age;
}

var avg_age = sum_age/dogs.length;
console.log('You have ' + dogs.length + ' dogs, with an average age of ' + avg_age + '.');