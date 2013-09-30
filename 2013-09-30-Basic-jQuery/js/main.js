$(document).ready(initialize);

function alert_user() {
  alert('You clicked the button!');
}

function change_div_text() {
  var input_text = $('#texter').val();
  var color = $('#color').val();
  $('#div2').text(input_text).css('background-color', color);
}

function verify_age() {
  var age = parseInt($('#age').val());
  var result = $('#age_div');
  if (age < 21)
    result.text('You are too young to drink.');
  else
    result.text('You can drink!');
}

function initialize() {

  $('#clicker').click(change_div_text);

  $('#age_check').click(verify_age);


  // $('div').css('background-color', 'red');
  // $('div').css('color', 'yellow');
  // $('div').css('font-size', '25px');

  // var color = prompt('What color?');
  // $('div').css('background-color', color);
  // var size = prompt('What size text?');
  // $('div').css('font-size', size);

  // var selector = prompt('Which div?')
  // var class_to_add = prompt('Class to add?');
  // var text = prompt('What do you want it to say?')
  // $('#' + selector).addClass(class_to_add);
  // $('#' + selector).text(text);

  // var selector_to_hide = prompt('Which node do you want to hide?');
      // $(selector_to_hide).hide();

}