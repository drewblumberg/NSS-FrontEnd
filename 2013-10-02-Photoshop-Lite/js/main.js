'use strict';

var numBoxes = 0;

$(document).ready(initialize);

function initialize() {
  $('#color').focus();

  $('#color').keyup(function(event){
    if(event.keyCode===13){
      $('#add').trigger('click');
    }
  });
  $('#add').click(addColorBox);

  $('#colors').on('click', '.box', boxClicked);

  $('#amount').keyup(function(event){
    if(event.keyCode===13){
      $('#add_box').trigger('click');
    }
  });
  $('#add_box').click(addBoxes);

  $('#boxes').on('mouseover', '.box_small', canvasPaint);

  $('#clear_colors').click(clearColors);
}

function addColorBox() {
  var color = $('#color').val();
  if(color !== '') {
    var $div = $('<div>');
    $div.addClass('box').css('background-color', color);
    $('#colors').prepend($div);
    $('#color').val('').focus();
  }
}

function boxClicked() {
  var color = $(this).css('background-color');
  $('#brush').css('background-color', color);
}

function addBoxes() {
  var amount = parseInt($('#amount').val(), 10);
  for(var i = 0; i < amount; i++) {
    var $div = $('<div>').addClass('box_small');
    $('#boxes').prepend($div);
  }
  numBoxes += amount;
}

function canvasPaint() {
  var $canvas = $(this);
  var color = $('#brush').css('background-color');
  $canvas.css('background-color', color);
}

function clearColors() {
  // for(var i = 0; i < numBoxes; i++) {
  //   var $box = $('#boxes div:nth-child(' + (i + 1) + ')');
  //   if($box.css('background-color') !== 'rgb(255,255,255)') {
  //     $box.css('background-color', 'white');
  //   }
  // }
  $('#boxes').empty().append('<div class="clear"></div>');
  for(var i = 0; i < numBoxes; i++) {
    var $div = $('<div>').addClass('box_small');
    $('#boxes').prepend($div);
  }
}
