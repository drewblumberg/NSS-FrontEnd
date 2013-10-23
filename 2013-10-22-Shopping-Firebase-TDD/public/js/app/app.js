'use strict';

// Firebase Schema
var Δdb, Δproducts, Δcustomers, Δorders;

// Local Schema (defined in keys.js)
db.products = db.customers = db.orders = [];
db.pagination = {};
db.pagination.perPage = 5;
db.pagination.currentPage = 1;
db.pagination.currentRowCount = 0;

$(document).ready(initialize);

function initialize(fn, flag){
  $(document).foundation();
  initializeDatabase();
  turnHandlersOn();
}

// Database Functions-------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbProductAdded(snapshot) {
  var obj = snapshot.val();
  var product = new Product(obj.name, obj.image, obj.price, obj.off, obj.weight);
  product.id = snapshot.name();
  db.products.push(product);
  if(db.pagination.currentRowCount < db.pagination.perPage) {
    htmlAddProductRow(product);
  }

  if(db.products.length > db.pagination.perPage) {
    $('#next').removeClass('hidden');
  }
}

function dbCustomerAdded() {

}

function dbOrderAdded() {

}

// Click Handlers------------------------------------------------------ //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickAddProduct() {
  var name = $('#product-name').val();
  var image = $('#product-image').val();
  var price = parseFloat($('#product-price').val());
  var off = parseFloat($('#product-off').val());
  var weight = parseFloat($('#product-weight').val());

  var product = new Product(name, image, price, off, weight);
  delete product.salePrice;

  Δproducts.push(product);
}

function clickNextButton() {
  $('#products tr:not(.head)').remove();
  var startIndex = db.pagination.perPage * db.pagination.currentPage;
  var endIndex = db.pagination.perPage * (db.pagination.currentPage + 1);

  if (db.products.length >= startIndex && db.products.length <= endIndex) {
    for (var i = startIndex; i < db.products.length; i++) {
      htmlAddProductRow(db.products[i]);
    }
    $('#next').addClass('hidden');
    $('#prev').removeClass('hidden');
  }
  else {
    for (var j = startIndex; j < endIndex; j++) {
      htmlAddProductRow(db.products[j]);
    }
    $('#next').removeClass('hidden');
    $('#prev').removeClass('hidden');
  }
  db.pagination.currentPage++;
}


function clickPrevButton() {
  $('#products tr:not(.head)').remove();
  var startIndex = db.pagination.perPage * (db.pagination.currentPage - 2);
  var endIndex = db.pagination.perPage * (db.pagination.currentPage - 1);

  if (startIndex === 0) {
    for (var i = startIndex; i < db.pagination.perPage; i++) {
      htmlAddProductRow(db.products[i]);
    }
    $('#next').removeClass('hidden');
    $('#prev').addClass('hidden');
  }
  else {
    for (var j = startIndex; j < endIndex; j++) {
      htmlAddProductRow(db.products[j]);
    }
    $('#next').removeClass('hidden');
    $('#prev').removeClass('hidden');
  }
  db.pagination.currentPage--;
}



// HTML functions------------------------------------------------------ //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddProductRow(product) {
  db.pagination.currentRowCount++;
  var $tr = $('<tr>');
  $tr.append($('<td>').addClass('product-name').text(product.name));
  $tr.append($('<td>').addClass('product-image').append($('<img>').attr('src', '/img/' + product.image)));
  $tr.append($('<td>').addClass('product-weight').text(product.weight + ' lbs.'));
  $tr.append($('<td>').addClass('product-price').text(formatCurrency(product.price)));
  $tr.append($('<td>').addClass('product-off').text(product.off + '%'));
  $tr.append($('<td>').addClass('product-sale').text(formatCurrency(product.salePrice())));

  $('#products').append($tr);
}

// Objects------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function Product(name, image, price, off, weight) {
  this.name = name;
  this.image = image;
  this.price = price;
  this.off = off;
  this.weight = weight;

  this.salePrice = function() {
    return this.price - (this.price * this.off / 100);
  };
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initializeDatabase(){
  Δdb = new Firebase(db.keys.firebase);
  Δproducts = Δdb.child('products');
  Δcustomers = Δdb.child('customers');
  Δorders = Δdb.child('orders');

  Δproducts.on('child_added', dbProductAdded);
  Δcustomers.on('child_added', dbCustomerAdded);
  Δorders.on('child_added', dbOrderAdded);
}

function turnHandlersOn(){
  $('#add-product').on('click', clickAddProduct);
  $('#next').on('click', clickNextButton);
  $('#prev').on('click', clickPrevButton);
}

function turnHandlersOff(){
  $('#add-product').off('click');
  $('#next').off('click');
  $('#prev').off('click');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function formatCurrency(number){
  return '$' + number.toFixed(2);
}