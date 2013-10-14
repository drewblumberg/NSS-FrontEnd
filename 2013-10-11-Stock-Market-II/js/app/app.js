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
  Δdb = new Firebase('https://db-stockmarket2.firebaseio.com/');
  Δfunds = Δdb.child('funds');
  Δstocks = Δdb.child('stocks');
  Δstocks.on('child_added', stockAdded);
  Δstocks.on('child_removed', stockRemoved);
  Δfunds.on('value', fundsAdded);

  $('#set_funds').click(addFunds);

  $('#buy').click(buyStock);

  $('#set_timer').click(updateStock);

  $('#stock_graphs').on('click', '.sell input', sellStock);

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
  stock.key = snapshot.name();
  db.stocks.push(stock);

  addBlock(stock, name);
}

function stockRemoved(snapshot) {
  var stock = snapshot.val();
  var index = db.stocks.ofIndex(stock);
  if(index > -1) {
    db.stocks.splice(index, 1);
  }
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
        var price = quote.LastPrice;
        var stockPercentage = ((price / 900) * 100) + '%';
        var $block = $('.symbol2:contains(' + stock.symbol + ')');
        $block.parent().children().children('.bar').css('height', stockPercentage);
      });
    } catch(e) {
      console.log(e.message);
    }
  });
}

function addBlock(item) {
  var block = '<div class="stockblock"><div class="bar_container"><div class="bar"></div></div><div class="symbol_image"></div><div class="sell"><input class="button small alert" type="button" value="sell"></div><div class="symbol2"></div></div>';
  var $block = $(block);

  var stockPercentage = ((item.quotedPrice / 900) * 100) + '%';
  $block.children().children('.bar').css('height', stockPercentage);

  var API_KEY = 'c34a96c6d41f9f342505c5d6f649b7bf';
  var query = item.name;
  var symbol = item.symbol;
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=5&page=1&format=json&jsoncallback=?';
  $.getJSON(url, function(data) {
    var photo = data.photos.photo[2];
    var url2 = 'url(http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
    $block.children('.symbol_image').css('background-image', url2);
    $block.children('.symbol_image').append('<span>' + symbol + '</span>');
  });

  $block.children('.symbol2').text(symbol);

  $('#stock_graphs').append($block);
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
      stockObject.key =
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

function sellStock() {
  var $this = $(this);
  var symbol = $this.parent().prev().children().text();
  var currentStock = _.find(db.stocks, function(stock){ return stock.symbol === symbol;});

  getStockQuote(symbol, function(data, textStatus, jqXHR){
      var quote = data.Data;
      db.funds.cashInStocks -= quote.LastPrice * currentStock.purchased;
      if (db.funds.cashInStocks < 0) {
        db.funds.cashInStocks = 0;
      }
      db.funds.available += quote.LastPrice * currentStock.purchased;
      $('#cashInStocks').text(formatCurrency(db.funds.cashInStocks));
      $('#balance').text(formatCurrency(db.funds.available));
      Δfunds.set(db.funds);
    });

  var Δchild = Δstocks.child(currentStock.key);
  Δchild.remove();

  $this.parent().parent().remove();
}

function getStockQuote(symbol, fn) {
  var data = {};
  data.symbol = symbol;
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}

function formatCurrency(number) {
  return '$' + number.toFixed(2);
}