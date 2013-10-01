function pig_me(word) {
  var ordwa = word.slice(1,word.length) + word[0] + 'ay';
  return ordwa;
}

$(document).ready(initialize);

function initialize() {
  $('#pig').click(pig_word);
}

function pig_word() {
  var word = $('#normal').val();
  $('#piglatin').text(pig_me(word));
}