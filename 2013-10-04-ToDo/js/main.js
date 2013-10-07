'use strict';

$(document).ready(initialize);

function initialize() {
  $('#due').focus();

  $('#task_btn').click(generateTask);

  $('#set').on('click', '.done', finishTask);

  $('#set').on('click', '.remove', removeTask);

  $('#set').on('click', '.up, .down', moveTask);
}

function generateTask() {
  var $tr = $('<tr>');

  $tr.append($('<td>').text($('#due').val()));

  $tr.append($('<td>').text($('#task').val()));

  var $colorDiv = $('<div>').addClass('color').css('background-color', $('#colorInput').val());
  var $color = $('<td>').append($colorDiv);
  $tr.append($color);

  $tr.append($('<td>').append($('<input>').addClass('done').attr('type', 'checkbox')));

  $tr.append($('<td>').append($('<input>').addClass('remove').attr('type', 'button').val('Remove')));

  var $arrowUp = $('<img>').addClass('up').attr('src', 'images/arrow-up.png');
  var $arrowDown = $('<img>').addClass('down').attr('src', 'images/arrow-down.png');
  $tr.append($('<td>').append($arrowUp).append($arrowDown));

  $('#set').append($tr);

  $('#due').val('').focus();
  $('#task').val('');
  $('#colorInput').val('');
}

function finishTask() {
  var $this = $(this);

  if($this.is(':checked')) {
    $this.parent().parent().css('background-color', '#6E7F6C');
    $this.parent().siblings().first().css('text-decoration', 'line-through');
    $this.parent().siblings().eq(1).css('text-decoration', 'line-through');
  }
  else {
    $this.parent().parent().css('background-color', '');
    $this.parent().siblings().first().css('text-decoration', 'none');
    $this.parent().siblings().eq(1).css('text-decoration', 'none');
  }
}

function removeTask() {
  var $this = $(this);

  $this.parent().parent().remove();
}

function moveTask() {
  var $this = $(this);
  var $thisRow = $this.parent().parent();
  var $prevRow = $thisRow.prev();
  var $nextRow = $thisRow.next();

  if($this.hasClass('up') && !$prevRow.hasClass('headRow') ) {
    $prevRow.before($thisRow);
  }
  else if($this.hasClass('down') && $nextRow.length !== 0) {
    $nextRow.after($thisRow);
  }
}