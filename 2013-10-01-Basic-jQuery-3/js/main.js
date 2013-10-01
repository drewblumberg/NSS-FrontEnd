function add_vals(num1, num2) {
  return num1 + num2;
}

function add_nums(){
  var num1 = parseFloat($('#num1').val());
  var num2 = parseFloat($('#num2').val());
  var result = add_vals(num1, num2);
  $('#result').text(result);
}

$(document).ready(initialize);

function initialize() {
  $('#add').click(add_nums);
}

