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
  $url.remove();
  $('#set_logo').remove();

  $('#logo').css('margin', 'auto');
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
  $('#deposits ul').prepend($li);

  checkOverdraft(balance);
}

function subtractFunds() {
  var funds = parseFloat($('#amount').val());
  balance -= funds;
  $('#balance').val('$' + balance);

  // Add to withdrawals list
  var $li = $('<li>');
  $li.text('$' + funds + '.00');
  $('#withdrawals ul').prepend($li);

  checkOverdraft(balance);
}

function undoDeposit() {
  var $this = $(this);
  var undo = parseFloat($this.text().slice(1));
  balance -= undo;
  $('#balance').val('$' + balance);

  $this.remove();

  checkOverdraft(balance);
}

function undoWithdrawal() {
  var $this = $(this);
  var undo = parseFloat($this.text().slice(1));
  balance += undo;
  $('#balance').val('$' + balance);

  $this.remove();

  checkOverdraft(balance);
}

function checkOverdraft(currentBalance) {
  if(currentBalance >= 0) {
    $('#balance').removeClass('overdraft');
  }
  else if(currentBalance < 0) {
    $('#balance').addClass('overdraft');
  }
}

