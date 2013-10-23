'use strict';

// Firebase Schema
var Δdb, Δproducts, Δcustomers, Δorders;

// Local Schema (defined in keys.js)

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

  htmlAddProductRow(product);
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



// HTML functions------------------------------------------------------ //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddProductRow(product) {
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
}

function turnHandlersOff(){
  $('#add-product').off('click');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function formatCurrency(number){
  return '$' + number.toFixed(2);
}