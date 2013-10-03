'use strict';

var balance = 0;

$(document).ready(initialize);

function initialize() {
  $('#deposit').prop('disabled', true);
  $('#withdraw').prop('disabled', true);

  $('#url').focus();
  $('#set_logo').click(setImage);

  $('#set_balance').click(setBalance);

  $('#deposit').click(addFunds);
  $('#withdraw').click(subtractFunds);

  $('#deposits').on('click', '.list li', undoDeposit);
  $('#withdrawals').on('click', '.list li', undoWithdrawal);

}

function setImage() {
  var $url = $('#url');
  $('#logo').attr('src', $url.val());
  $url.hide();
  $('#set_logo').hide();
}

function setBalance() {
  var bal = parseFloat($('#balance_amount').val());
  balance = bal;
  $('#balance').val('$' + balance);

  $('#balance_amount').hide();
  $('#set_balance').hide();

  $('#deposit').prop('disabled', false);
  $('#withdraw').prop('disabled', false);
}

function addFunds() {
  var funds = parseFloat($('#amount').val());
  balance += funds;
  $('#balance').val('$' + balance);

  // Add to deposit list
  var $li = $('<li>');
  $li.text('$' + funds + '.00');
  $('#deposits ul').append($li);

  if(balance >= 0) {
    $('#balance').removeClass('overdraft');
  }
}

function subtractFunds() {
  var funds = parseFloat($('#amount').val());
  balance -= funds;
  $('#balance').val('$' + balance);

  // Add to withdrawals list
  var $li = $('<li>');
  $li.text('$' + funds + '.00');
  $('#withdrawals ul').append($li);

  if(balance < 0) {
    $('#balance').addClass('overdraft');
  }
}

function undoDeposit() {
  var $this = $(this);
  var undo = parseFloat($this.text().slice(1));
  balance -= undo;
  $('#balance').val('$' + balance);

  $this.remove();
}

function undoWithdrawal() {
  var $this = $(this);
  var undo = parseFloat($this.text().slice(1));
  balance += undo;
  $('#balance').val('$' + balance);

  $this.remove();
}

