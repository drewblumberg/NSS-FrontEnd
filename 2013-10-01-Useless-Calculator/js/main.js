$(document).ready(initialize);

function initialize() {
  $('#calc').click(calculate);
}

function make_nums(length, multiplier) {
  var nums = _.range(1, length + 1);
  return _.map(nums, function(num){ return num * multiplier });
}

function print_calc_string(nums) {
  var sum = _.reduce(nums, function(memo, num){ return memo + num }, 0);
  var left_eq = nums.join(' + ');
  var right_eq = " = " + sum;
  return left_eq + right_eq;
}

function calculate() {
  var length_mult = $('#inputs').val().split(", ");
  var nums = make_nums(parseInt(length_mult[0]), parseInt(length_mult[1]));
  $('#result').val(print_calc_string(nums));
}