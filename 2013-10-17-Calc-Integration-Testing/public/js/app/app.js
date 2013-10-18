'use strict';

// Local Schema (defined in keys.js)

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#op1').focus();

  $('#calculate').click(calcNumbers);
  $('#sumResults').click(sumNumbers);
  $('#multiplyResults').click(multiplyNumbers);
  $('#removeNeg').click(removeNegativeResults);
  $('#removePos').click(removePositiveResults);

  $('#history').on('click', '.remove', removeListItem);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function removeNegativeResults() {
  var results = $('#history .result');
  var negatives = _.filter(results, function(result) {return $(result).text() < 0;});
  _.each(negatives, function(negative) {$(negative).parent().remove();});
}


function removePositiveResults() {
  var results = $('#history .result');
  var positives = _.filter(results, function(result) {return $(result).text() >= 0;});
  _.each(positives, function(positive) {$(positive).parent().remove();});
}

function sumNumbers() {
  var sum = sumResults();
  $('#sum').text(sum);
}

function multiplyNumbers() {
  var product = multiplyResults();
  $('#product').text(product);
}


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

function sumResults() {
  var results = $('#history .result');
  results = _.map(results, function(result) {return parseFloat($(result).text());});
  var sum = _.reduce(results, function(memo, num){ return memo + num; }, 0);
  return sum;
}

function multiplyResults() {
  var results = $('#history .result');
  if(results.length === 0) {return 0;}
  results = _.map(results, function(result) {return parseFloat($(result).text());});
  var product = 1;
  for (var i = 0; i < results.length; i++) {
    product *= results[i];
  }
  return product;
}


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
