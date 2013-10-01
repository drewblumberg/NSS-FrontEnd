test( "pig latin", function() {
  deepEqual(pig_latin("hello"), "ellohay", 'standard word to pig latin success!');
});

test( "pig latin reverse", function() {
  deepEqual(pig_reverse("hello, nashville, code"), ["odecay", "ashvillenay","ellohay"], 'word array to reverse pig latin array success!');
});