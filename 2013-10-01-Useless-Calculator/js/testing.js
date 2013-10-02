test( "make_nums", function() {
  deepEqual(make_nums(5,3), [3,6,9,12,15], "Make num array with calculations")
});

test( "print_calc_string", function() {
  deepEqual(print_calc_string([3,6,9,12,15]), "3 + 6 + 9 + 12 + 15 = 45" , "Make num array with calculations")
});