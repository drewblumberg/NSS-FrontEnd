test("filter even numbers", function() {
  var numbers = _.range(10);
  var output = [0,2,4,6,8];
  deepEqual(filter_evens(numbers), output, "testing the filter_evens function");
});

test("filter odd numbers", function() {
  var numbers = _.range(10);
  var output = [1,3,5,7,9];
  deepEqual(filter_odd_numbers(numbers), output, "testing the filter_odd_numbers function");
});

test('Filter short strings', function() {
  var strings = ['cat', 'elephant', 'a', 'the', 'bibliography'];
  var expected = ['cat', 'a', 'the'];
  deepEqual(filter_short_strings(strings), expected, "testing the filter_short_strings function");
});

test('Filter a strings', function() {
  var strings = ['cat', 'elephant', 'a', 'the', 'bibliography', 'Anteater', 'apple'];
  var expected = ['a', 'Anteater', 'apple'];
  deepEqual(filter_a_strings(strings), expected, "testing the filter_a_strings function");
});

test('Find a string', function() {
  var strings = ['cat', 'elephant', 'a', 'the', 'bibliography', 'Anteater', 'apple'];
  var expected = 'elephant';
  deepEqual(find_a_string(strings, 'elephant'), expected, "testing the find_a_string function");
});

test('Find a string ending in a particular letter', function() {
  var strings = ['dog', 'cats', 'lion', 'tigers']
  deepEqual(find_string_ending_in_letter(strings, "s"), "cats", "should find word");
  deepEqual(find_string_ending_in_letter(strings, 'z'), undefined, "should not find word");
});