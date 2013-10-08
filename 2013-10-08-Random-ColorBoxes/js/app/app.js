'use strict';

$(document).ready(initialize);

var timer;

function initialize(){
  $(document).foundation();

  $('#start').click(generateBoxes);

  $('#stop').click(stopBoxes);
}

function generateBoxes() {
  var speed = parseFloat($('#speed').val()) * 1000;
  timer = setInterval(buildBox, speed);
}

function buildBox() {
  var dimensions = $('#dimensions').val().split(', ');
  var width = parseInt(dimensions[0], 10);
  var height = parseInt(dimensions[1], 10);

  var $div = $('<div>');
  $div.css('width', width);
  $div.css('height', height);
  var color = 'rgba(' + Math.floor(Math.random()*256) + ', ' + Math.floor(Math.random()*256) + ', ' + Math.floor(Math.random()*256) + ', ' + Math.random()+ ')';
  $div.css('background-color', color);

  $('#colors').prepend($div);
}

function stopBoxes() {
  clearInterval(timer);
}
