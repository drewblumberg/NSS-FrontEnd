var balance = 1000.00;

$(document).ready(initialize);

function initialize() {
  $('#balance').val("$" + balance);
  $('#deposit').click(new_balance_deposit);
  $('#withdraw').click(new_balance_withdraw);
}

function deposit(balance, money) {
  return balance + money;
}

function withdraw(balance, money) {
  return balance - money;
}

function new_balance_deposit() {
  var money = parseFloat($('#amount').val());
  balance = deposit(balance, money);
  $('#balance').val('$' + balance);
  if(balance >= 0) {
    $('#balance').removeClass('overdraft');
    $('#overdraft').css('display', 'none');
  }
}

function new_balance_withdraw() {
  var money = parseFloat($('#amount').val());
  balance = withdraw(balance, money);
  $('#balance').val('$' + balance);
  if (balance < 0) {
    $('#balance').addClass('overdraft');
    $('#overdraft').css('display', 'inline');
  }
}