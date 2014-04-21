$(document).ready(initialize);

function initialize() {
  $('.square_it').on('click', assignNums);
}

function assignNums(){
  $('.odds').empty();
  $('.evens').empty();

  var nums = $('.square_nums').val().split(',');
  for(var i = 0; i < nums.length; i++){
    var squared = Math.pow(parseInt(nums[i]), 2);
    var even = squared % 2 != 0 ? false : true;
    appendNum(squared, even);
  }
}

function appendNum(squared, even) {
  even ? $('.evens').append("<div class='result'>" + squared + "</div>") : $('.odds').append("<div class='result'>" + squared + "</div>");
}

