function filter_evens(numbers) {
  return _.filter(numbers, function(num){return (num % 2) == 0;});
}

function filter_odd_numbers(numbers) {
  return _.filter(numbers, function(num){return (num % 2) == 1;});
}

function filter_short_strings(strings) {
  return _.filter(strings, function(string){return string.length < 4})
}

function filter_a_strings(strings) {
  return _.filter(strings, function(string){return string.indexOf('a') == 0 || string.indexOf('A') == 0})
}

function find_a_string(strings, word) {
  return _.find(strings, function(string){return string == word});
}

function find_string_ending_in_letter(strings, letter) {
  return _.find(strings, function(string){return string[string.length-1] == letter});
}