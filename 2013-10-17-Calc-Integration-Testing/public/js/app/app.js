'use strict';

// Local Schema (defined in keys.js)

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#op1').focus();

  $('#calculate').click(calcNumbers);

  $('#history').on('click', '.remove', removeListItem);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function calcNumbers() {
  var calc = {};
  calc.op1 = parseFloat($('#op1').val());
  calc.op2 = parseFloat($('#op2').val());
  calc.operator = $('#operator').val();
  calc.result = 0;

  switch(calc.operator)
  {
  case '*':
    calc.result = calc.op1 * calc.op2;
    break;
  case '+':
    calc.result = calc.op1 + calc.op2;
    break;
  case '-':
    calc.result = calc.op1 - calc.op2;
    break;
  case '/':
    calc.result = calc.op1 / calc.op2;
    break;
  case '%':
    calc.result = calc.op1 % calc.op2;
    break;
  default:
    console.log('Invalid operator entered.');
  }

  $('#op1').val('').focus();
  $('#op2').val('');
  $('#operator').val('');

  $('#result').text(calc.result);

  htmlAddHistory(calc);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddHistory(calc) {
  var $li = $('<li><span class="op1"></span> <span class="operator"></span> <span class="op2"></span> = <span class="result"></span></li>');
  $li.children('.op1').text(calc.op1);
  $li.children('.operator').text(calc.operator);
  $li.children('.op2').text(calc.op2);
  $li.children('.result').text(calc.result);
  $li.append('<input type="button" class="remove" value="X"></input>');

  $('#history').prepend($li);
}

function removeListItem() {
  var $this = $(this);
  $this.parent().remove();
}

function canRun(flag) {
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}
