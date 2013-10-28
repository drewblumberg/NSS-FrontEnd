'use strict';

// Firebase Schema
var Δdb, Δproducts, Δcustomers, Δorders;

// Local Schema (defined in keys.js)
db.products = [];
db.customers = [];
db.orders = [];
db.cart = {};
db.cart.products = [];
db.cart.totals = {};
db.cart.totals.count = 0;
db.cart.totals.amount = 0;
db.cart.totals.weight = 0;
db.cart.totals.shipping = 0;
db.cart.totals.grand = 0;
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

function dbCustomerAdded(snapshot) {
  var obj = snapshot.val();
  var customer = new Customer(obj.name, obj.image, obj.isDomestic);
  customer.id = snapshot.name();
  db.customers.push(customer);
  $('#select-customer').prepend($('<option>').val(customer.name).text(customer.name));
}

function dbOrderAdded(snapshot) {
  var obj = snapshot.val();
  var id = snapshot.name();
  var order = new Order(obj.time, obj.customer, obj.products, obj.total, obj.shipping, obj.grand);
  order.id = id;
  db.orders.push(order);
  addOrderToTable(order);
}

// Click Handlers------------------------------------------------------ //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function addProductToCart() {
  var productName = $(this).parent().parent().children('.product-name').text();
  var product = _.find(db.products, function(p) { return p.name === productName;});
  var isAdded = _.find(db.cart.products, function(p){ return p.name === productName; }) === undefined ? false : true;

  if(db.customers.length) {
    if(!db.cart.customer) {
      db.cart.customer = _.find(db.customers, function(cust) { return cust.name === $('#select-customer').val();});
      $('#cart').removeClass('hidden');
    }

    db.cart.products.push(product);
    db.cart.totals.count++;
    db.cart.totals.amount += product.salePrice();
    db.cart.totals.weight += product.weight;

    var shippingCost = db.cart.customer.isDomestic ? 0.5 : 1.5;
    db.cart.totals.shipping += product.weight * shippingCost;
    db.cart.totals.grand = db.cart.totals.amount + db.cart.totals.shipping;

    if(!isAdded) {
      htmlAddCartRow(product, shippingCost);
    } else {
      htmlUpdateCartRow(product, shippingCost);
    }

    updateFooter();
  }
}

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

function clickAddCustomer() {
  var name = $('#customer-name').val();
  var image = $('#customer-image').val();
  var isDomestic = $('input[name="address"]:checked').attr('id') === 'domestic';

  var customer = new Customer(name, image, isDomestic);
  Δcustomers.push(customer);

  $('#domestic').prop('checked', false);
  $('#international').prop('checked', false);
}

function clickPurchaseButton() {
  if(db.cart.products) {
    $('#cart tbody tr').remove();
    $('#cart tfoot td:not(:first)').empty();

    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var customer = db.cart.customer;
    var products = db.cart.products;
    var total = db.cart.totals.amount;
    var shipping = db.cart.totals.shipping;
    var grand = db.cart.totals.grand;

    var order = new Order(time, customer, products, total, shipping, grand);
    Δorders.push(order);

    resetCart();
  }
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

function htmlAddCartRow(product, shippingCost) {
  var $tr = $('<tr>');
  $tr.append($('<td>').addClass('cartlist-name').text(product.name));
  $tr.append($('<td>').addClass('cartlist-count').text('1'));
  $tr.append($('<td>').addClass('cartlist-amount').text(formatCurrency(product.salePrice())));
  $tr.append($('<td>').addClass('cartlist-weight').text(product.weight + ' lbs'));
  $tr.append($('<td>').addClass('cartlist-shipping').text(formatCurrency(shippingCost)));
  $tr.append($('<td>').addClass('cartlist-total').text(formatCurrency(product.weight * shippingCost + product.salePrice())));

  $('#cart tbody').append($tr);
}

function htmlUpdateCartRow(product, shippingCost) {
  var $row = $('#cart .cartlist-name:contains(' + product.name + ')').parent();
  var currentCount = parseFloat($row.children('.cartlist-count').text());
  var currentAmount = parseFloat($row.children('.cartlist-amount').text().slice(1));
  var currentWeight = parseFloat($row.children('.cartlist-weight').text().slice(0, -4));
  var currentShipping = parseFloat($row.children('.cartlist-shipping').text().slice(1));
  var currentTotal = parseFloat($row.children('.cartlist-total').text().slice(1));

  $row.children('.cartlist-count').text(currentCount + 1);
  $row.children('.cartlist-amount').text(formatCurrency(currentAmount + product.salePrice()));
  $row.children('.cartlist-weight').text((product.weight + currentWeight) + ' lbs');
  $row.children('.cartlist-shipping').text(formatCurrency(currentShipping + shippingCost));
  $row.children('.cartlist-total').text(formatCurrency(currentTotal + (product.weight * shippingCost + product.salePrice())));
}

function updateFooter() {
  var $footer = $('#cart tfoot tr');

  $footer.children('.cart-count').text(db.cart.totals.count);
  $footer.children('.cart-amount').text(formatCurrency(db.cart.totals.amount));
  $footer.children('.cart-weight').text(db.cart.totals.weight + ' lbs');
  $footer.children('.cart-shipping').text(formatCurrency(db.cart.totals.shipping));
  $footer.children('.cart-total').text(formatCurrency(db.cart.totals.grand));
}

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

function addOrderToTable(order) {
  var $tr = $('<tr>');
  $tr.append($('<td>').addClass('order-id').text(order.id));
  $tr.append($('<td>').addClass('order-time').text(order.time));
  $tr.append($('<td>').addClass('order-customer').text(order.customer.name));
  $tr.append($('<td>').append(createProductsListInOrder(order)));
  $tr.append($('<td>').addClass('order-total').text(formatCurrency(order.total)));
  $tr.append($('<td>').addClass('order-shipping').text(formatCurrency(order.shipping)));
  $tr.append($('<td>').addClass('order-grand').text(formatCurrency(order.grand)));

  $('#orders tbody').append($tr);
  $('#cart').addClass('hidden');
}

function createProductsListInOrder(order) {
  var $ol = $('<ol>');
  _.each(order.products, function(p) {
    $ol.append('<li>' + p.name + '</li>');
  });

  $ol.addClass('order-products-list');

  return $ol;
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

function Customer(name, image, isDomestic) {
  this.name = name;
  this.image = image;
  this.isDomestic = isDomestic;
}

function Order(time, customer, products, total, shipping, grand) {
  // var order = new Order(time, customer, products, total, shipping, grand);
  this.time = time;
  this.customer = customer;
  this.products = products;
  _.each(this.products, function (p) { delete p.salePrice;});
  this.total = total;
  this.shipping = shipping;
  this.grand = grand;
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
  $('#add-customer').on('click', clickAddCustomer);
  $('#next').on('click', clickNextButton);
  $('#prev').on('click', clickPrevButton);
  $('#products').on('click', '.product-image img' ,addProductToCart);
  $('#purchase').on('click', clickPurchaseButton);
}

function turnHandlersOff(){
  $('#add-product').off('click');
  $('#add-customer').off('click');
  $('#next').off('click');
  $('#prev').off('click');
  $('#products').off('click', '.product-image img');
  $('#purchase').off('click');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

function resetCart() {
  db.cart = {};
  db.cart.products = [];
  db.cart.totals = {};
  db.cart.totals.count = 0;
  db.cart.totals.amount = 0;
  db.cart.totals.weight = 0;
  db.cart.totals.shipping = 0;
  db.cart.totals.grand = 0;
}