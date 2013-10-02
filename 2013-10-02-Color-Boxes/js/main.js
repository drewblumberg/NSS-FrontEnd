$(document).ready(initialize);

function initialize() {
  $('#colors').focus();
  $('#make').click(generate);
  $('#clearinput').click(clearInput);
  $('#clearboxes').click(clearBoxes);
}

function generate() {
  var colorBoxes = $('#colors').val();
  colorBoxes = colorBoxes.split(', ');
  for(var i = 0; i < colorBoxes.length; i++) {
    $div = $('<div>').addClass('box').css('background-color', colorBoxes[i]);
    $('#boxes').append($div);
  }
}

function clearInput() {
  $('#colors').val('').focus();
}


function clearBoxes() {
  $('#boxes').empty();
}