'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('Calculate 2 numbers', function(){
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#op1').val(), '', 'op1 should be blank');
  deepEqual($('#op2').val(), '', 'op2 should be blank');
  deepEqual($('#operator').val(), '', 'operator should be blank');
  deepEqual($('#result').text(), '6', 'result should equal 6');
});

test('Check calculation history', function() {
  expect(14);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#history li').length, 2, 'There should be two list items');
  deepEqual($('#history li:first-child span').length, 4, 'There should be 4 spans');
  deepEqual($('#history li:first-child span:first-child').hasClass('op1'), true, 'Span 1 should have class of op1');
  deepEqual($('#history li:first-child span:nth-child(2)').hasClass('operator'), true, 'Span 2 should have class of operator');
  deepEqual($('#history li:first-child span:nth-child(3)').hasClass('op2'), true, 'Span 3 should have class of op2');
  deepEqual($('#history li:first-child span:nth-child(4)').hasClass('result'), true, 'Span 4 should have class of result');
  deepEqual($('#history li:first-child span:first-child').text(), '7', 'Span 1 should have  text of 7');
  deepEqual($('#history li:first-child span:nth-child(2)').text(), '*', 'Span 2 should have text of *');
  deepEqual($('#history li:first-child span:nth-child(3)').text(), '8', 'Span 3 should have text of 8');
  deepEqual($('#history li:first-child span:nth-child(4)').text(), '56', 'Span 4 should have text of 56');
  deepEqual($('#history li:nth-child(2) span:first-child').text(), '3', 'Span 1 should have  text of 3');
  deepEqual($('#history li:nth-child(2) span:nth-child(2)').text(), '+', 'Span 2 should have text of +');
  deepEqual($('#history li:nth-child(2) span:nth-child(3)').text(), '2', 'Span 3 should have text of 2');
  deepEqual($('#history li:nth-child(2) span:nth-child(4)').text(), '5', 'Span 4 should have text of 5');
});

test('Remove button and row background color', function() {
  expect(10);

  $('#op1').val('36');
  $('#op2').val('9');
  $('#operator').val('/');
  $('#calculate').trigger('click');

  $('#op1').val('12');
  $('#op2').val('4');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  ok($('.remove').length === 4, 'There should be 4 remove buttons');
  ok($('#history li:nth-child(1)').css('background-color') === 'rgba(0, 0, 0, 0)', 'Odd rows white background');
  ok($('#history li:nth-child(3)').css('background-color') === 'rgba(0, 0, 0, 0)', 'Odd rows white background');
  ok($('#history li:nth-child(2)').css('background-color') === 'rgb(220, 220, 220)', 'Even rows gray background');
  ok($('#history li:nth-child(4)').css('background-color') === 'rgb(220, 220, 220)', 'Even rows gray background');

  $('.remove').eq(2).trigger('click');
  ok($('.remove').length === 3, 'There should now be 3 remove buttons');
  ok($('.operator:contains(-)').length === 0, 'The subtraction should be deleted');
  ok($('#history li:nth-child(1)').css('background-color') === 'rgba(0, 0, 0, 0)', 'Odd rows white background');
  ok($('#history li:nth-child(3)').css('background-color') === 'rgba(0, 0, 0, 0)', 'Odd rows white background');
  ok($('#history li:nth-child(2)').css('background-color') === 'rgb(220, 220, 220)', 'Even rows gray background');

});

test('Sum button sums the results', function() {
  expect(1);
  addNumsToHistory();
  $('#sumResults').trigger('click');
  deepEqual($('#sum').text(), '-14', 'Sum of results should equal -14');
});

test('Product button multiplies the results', function() {
  expect(1);
  addNumsToHistory();
  $('#multiplyResults').trigger('click');
  deepEqual($('#product').text(), '8400', 'Product of results should equal 8400');
});

test('No results return zero for product', function() {
  expect(1);
  $('#multiplyResults').trigger('click');
  deepEqual($('#product').text(), '0', 'Product of results should equal 0');
});

test('Remove negative lines from the history', function() {
  expect(4);
  addNumsToHistory();
  ok($('#history li').length === 4, 'Now 4 rows');
  $('#removeNeg').trigger('click');
  ok($('#history li').length === 2, 'Now only 2 rows');
  ok($('#history li:first-child .result').text() === '5', 'First row result is 5');
  ok($('#history li:nth-child(2) .result').text() === '10', 'Second row result is 10');
});

test('Remove positive lines from the history', function() {
  expect(4);
  addNumsToHistory();
  ok($('#history li').length === 4, 'Now 4 rows');
  $('#removePos').trigger('click');
  ok($('#history li').length === 2, 'Now only 2 rows');
  ok($('#history li:first-child .result').text() === '-21', 'First row result is -21');
  ok($('#history li:nth-child(2) .result').text() === '-8', 'Secpnd row result is -8');
});

function addNumsToHistory() {
  $('#op1').val('7');
  $('#op2').val('15');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  $('#op1').val('6');
  $('#op2').val('4');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('-5');
  $('#op2').val('-1');
  $('#operator').val('/');
  $('#calculate').trigger('click');

  $('#op1').val('-3');
  $('#op2').val('7');
  $('#operator').val('*');
  $('#calculate').trigger('click');
}


