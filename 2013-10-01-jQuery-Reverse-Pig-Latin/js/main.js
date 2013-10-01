$(document).ready(initialize);

function initialize() {
  $('#convert').click(convert_words);

}

function convert_words() {
  var inputs = $('#original').val();
  var reverse_piggies = pig_reverse(inputs);
  $('#converted').val(reverse_piggies.join("; "));
}

function pig_latin(word) {
  return word.slice(1) + word[0] + 'ay';
}

function pig_reverse(words) {
  var word_array = words.split(", ");
  var pig_array = _.map(word_array, function(word){return pig_latin(word)}).reverse();
  return pig_array;
}