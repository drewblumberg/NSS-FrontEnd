$(document).ready(initialize);

function initialize() {
  $('.flip').on('click', flipCoin);
}

function flipCoin() {
  var flipNum = Math.random();
  var currentHeads = parseInt($('.heads').text());
  var currentTails = parseInt($('.tails').text());

  if(flipNum > 0.5) {
    currentHeads++;
    $('.heads').empty();
    $('.heads').text(currentHeads);
  } else {
    currentTails++;
    $('.tails').empty();
    $('.tails').text(currentTails);
  }

  updatePercentages(currentHeads, currentTails);
}

function updatePercentages(h, t) {
  var total = h + t;
  $('.heads_percent').empty();
  $('.tails_percent').empty();
  $('.heads_percent').text(Math.round(h/total * 100) + '%');
  $('.tails_percent').text(Math.round(t/total * 100) + '%');
}