'use strict';

$(document).ready(initialize);

function initialize() {
  $('#add').click(addRow);

  $('table').on('click', '.rsvp', rsvp);

  $('table').on('click', '.nuke_btn', nuke);

  $('table').on('click', '.up, .down', move);
}

function addRow() {
  var $tr = $('<tr>');
  var $name = $('<td>').addClass('name');
  var $food = $('<td>').addClass('food');
  var $ctrl = $('<td>').addClass('ctrl');
  var $nuke = $('<td>').addClass('nuke');
  var $upDown = $('<td>').addClass('upDown');

  var $input = $('<input>').attr('type', 'text');
  var $button = $('<input>').attr('type', 'button').val('RSVP!').addClass('rsvp');
  $ctrl.append($input,$button);

  var $nukeButton = $('<input>').attr('type', 'button').val('NUKE!').addClass('nuke_btn');
  $nuke.append($nukeButton);

  var $upBtn = $('<img>').attr('src', 'images/arrow-up.png').addClass('up');
  var $downBtn = $('<img>').attr('src', 'images/arrow-down.png').addClass('down');
  $upDown.append($upBtn, $downBtn);

  $tr.append($name, $food, $ctrl, $nuke, $upDown);
  $('table').append($tr);

  $input.focus();
}

function rsvp() {
  var $button = $(this);
  var $textbox = $button.prev();
  var text = $textbox.val();
  var items = text.split(', ');
  var name = items[0], food = items[1];

  $button.parent().prev().prev().text(name);
  $button.parent().prev().text(food);
}

function nuke() {
  var $button = $(this);
  var $parent = $button.parent().parent();
  $parent.remove();
}

function move() {
  var $this = $(this);
  var $thisRow = $this.parent().parent();
  var $prevRow = $thisRow.prev();
  var $nextRow = $thisRow.next();

  if ($this.hasClass('up') && !$prevRow.hasClass('headRow')) {
    $prevRow.before($thisRow);
  }
  else if ($this.hasClass('down') && $nextRow.length !== 0) {
    $nextRow.after($thisRow);
  }

}