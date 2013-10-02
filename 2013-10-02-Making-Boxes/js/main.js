$(document).ready(initialize);

function initialize() {
  $('#make').click(generate);
}

function generate() {
  var numBoxes = parseInt($('#amount').val());
  $('#boxes').empty();
  for(var i = 0; i < numBoxes; i++) {
    $('#boxes').append('<div>');
    $('#boxes div:nth-child(' + (i+1) + ')').addClass('box').append('<span>' + (i+1) + '</span>');
  }
}