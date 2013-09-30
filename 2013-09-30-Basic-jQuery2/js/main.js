$(document).ready(initialize);


function initialize() {
  $('#button1').click(change_to_green);

  $('#name_btn').click(count_chars);
}

function change_to_green() {
  var green_div = $('#greenDiv');
  var button1 = $('#button1');
  if (green_div.hasClass('greenme')) {
    button1.val('Green me');
    green_div.removeClass('greenme');
  }
  else {
    button1.val('Ungreen me')
    green_div.addClass('greenme');
  }
}

function count_chars() {
  var name = $('#name_txt').val();
  $('.result_char_count').text(name.length);
}