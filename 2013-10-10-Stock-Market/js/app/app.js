'use strict';

var Δdb;
var Δstocks;
var Δfunds;

// Local Schema
var db = {};
db.stocks = [];
db.funds = {};

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://db-stockmarket.firebaseio.com/');
  Δfunds = Δdb.child('funds');
  Δstocks = Δdb.child('stocks');
  Δstocks.on('child_added', stockAdded);
  Δfunds.on('value', fundsAdded);

  $('#set_funds').click(addFunds);

  $('#buy').click(buyStock);

  $('#set_timer').click(updateStock);

}

function fundsAdded(snapshot) {
  var funds = snapshot.val();
  if (!funds) {
    db.funds.available = 0;
    db.funds.cashInStocks = 0;
  }
  else {
    db.funds = funds;
  }

  $('#balance').text(formatCurrency(db.funds.available));
  $('#cashInStocks').text(formatCurrency(db.funds.cashInStocks));
}

function stockAdded(snapshot) {
  var stock = snapshot.val();
  db.stocks.push(stock);
  addRow(stock);
}

function updateStock() {
  var time = parseFloat($('#timer').val(), 10) * 1000;
  setInterval(getStockUpdate, time);
}

function getStockUpdate() {
  _.each(db.stocks, function(stock, index) {
    try {
      getStockQuote(stock.symbol, function(data, textStatus, jqXHR){
        var quote = data.Data;
        var value = quote.LastPrice * stock.purchased;
        var pandl = value - stock.invested;

        $('tr td.quote').eq(index).text(formatCurrency(quote.LastPrice));
        $('tr td.total').eq(index).text(formatCurrency(value));
        $('tr td.pandl').eq(index).text(formatCurrency(pandl));
      });
    } catch(e) {
      console.log(e.message);
    }
  });
}

function addRow(item) {
  var row = '<tr><td class="name"></td><td class="symbol"></td><td class="quote"></td><td class="purchased"></td><td class="total"></td><td class="invested"></td><td class="pandl"></td></tr>';
  var $row = $(row);

  var pandl = item.value - item.invested;

  $row.children('.name').text(item.name);
  $row.children('.symbol').text(item.symbol);
  $row.children('.quote').text(formatCurrency(item.quotedPrice));
  $row.children('.purchased').text(item.purchased);
  $row.children('.total').text(formatCurrency(item.value));
  $row.children('.invested').text(formatCurrency(item.value));
  $row.children('.pandl').text(formatCurrency(pandl));

  $('#stocks').append($row);
}

function addFunds() {
  db.funds.available += parseInt($('#funds').val(), 10);
  $('#balance').text(formatCurrency(db.funds.available));
  Δfunds.set(db.funds);
  $('#funds').val('');
}

function buyStock() {
  var symbol = $('#symbol').val();
  var quantity = parseInt($('#quantity').val(), 10);

  try {
    getStockQuote(symbol, function(data, textStatus, jqXHR){
      var quote = data.Data;
      db.funds.cashInStocks += quote.LastPrice * quantity;
      db.funds.available -= quote.LastPrice * quantity;
      $('#cashInStocks').text(formatCurrency(db.funds.cashInStocks));
      $('#balance').text(formatCurrency(db.funds.available));
      Δfunds.set(db.funds);


      var stockObject = {};
      stockObject.name = quote.Name;
      stockObject.symbol = quote.Symbol;
      stockObject.purchased = quantity;
      stockObject.quotedPrice = quote.LastPrice;
      stockObject.value =stockObject.quotedPrice * quantity;
      stockObject.invested = stockObject.value;
      stockObject.createdAt = quote.Timestamp;
      Δstocks.push(stockObject);
    });
  } catch (e) {
    console.log(e.message);
  }

  $('#symbol').val('');
  $('#quantity').val('');
}

function getStockQuote(symbol, fn) {
  var data = {};
  data.symbol = symbol;
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}

function formatCurrency(number) {
  return '$' + number.toFixed(2);
}