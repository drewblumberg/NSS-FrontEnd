'use strict';

var Δdb;
var Δstocks;
var Δfunds;

// Local Schema
var db = {};
db.stocks = [];
db.funds = {};
db.funds.available = 0;

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

}

function fundsAdded(snapshot) {
  var funds = snapshot.val();
  $('#balance').text('$' + funds.available + '.00');
  db.funds = funds;
}

function stockAdded(snapshot) {
  var stock = snapshot.val();
  db.stocks.push(stock);
  addRow(stock);
}

function addRow(item) {
  var row = '<tr><td class="name"></td><td class="symbol"></td><td class="quote"></td><td class="purchased"></td><td class="total"></td><td class="pandl"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(item.name);
  $row.children('.symbol').text(item.symbol);
  $row.children('.quote').text('$' + item.quotedPrice);
  $row.children('.purchased').text(item.purchased);
  $row.children('.total').text(item.value);

  $('#stocks').append($row);
}

function addFunds() {
  db.funds.available += parseInt($('#funds').val(), 10);
  $('#balance').text('$' + db.funds.available + '.00');
  Δfunds.set(db.funds);
}

function buyStock() {
  var symbol = $('#symbol').val();
  var quantity = parseInt($('#quantity').val(), 10);

  getStockQuote(symbol, function(data, textStatus, jqXHR){
    var quote = data.Data;

    var stockObject = {};
    stockObject.name = quote.Name;
    stockObject.symbol = quote.Symbol;
    stockObject.purchased = quantity;
    stockObject.quotedPrice = quote.LastPrice;
    stockObject.value =stockObject.quotedPrice * quantity;
    stockObject.createdAt = quote.Timestamp;

    Δstocks.push(stockObject);
  });
}

function getStockQuote(symbol, fn) {
  var data = {};
  data.symbol = symbol;
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}