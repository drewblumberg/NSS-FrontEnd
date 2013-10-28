'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  // Reset Global Variables Here
  db.products = [];
  db.customers = [];
  db.orders = [];
  db.cart.products = [];
  db.pagination.currentPage = 1;
  db.pagination.currentRowCount = 0;
  // Clean Out Test Database Here
  Δdb.remove();
}

function teardownTest(){
}

test('Add Product', function(){
  expect(12);

  $('#product-image').val('ipad-air.png');
  $('#product-name').val('Ipad Air');
  $('#product-weight').val('1.0');
  $('#product-price').val('499.00');
  $('#product-off').val('10');
  $('#add-product').trigger('click');

  equal(db.products.length, 1, 'There should be one product.');
  ok(db.products[0].id, 'Product should have been assigned an id');
  ok(db.products[0] instanceof Product, 'Product should be instance of Product');
  equal(db.products[0].image, 'ipad-air.png', 'Product should have correct image');
  equal(db.products[0].name, 'Ipad Air', 'Product should have correct name');
  equal(db.products[0].weight, 1.0, 'Product should have correct weight');
  equal(db.products[0].salePrice(), 449.1, 'Product should have correct sale price');

  equal($('#products > tbody > tr').length, 2, 'There should be 2 rows in the table');
  equal($('#products > tbody > tr:nth-child(2) > td').length, 6, 'There should be 6 columns in the table');
  equal($('#products .product-name').text(), 'Ipad Air', 'Name column should have the correct product name');
  equal($('#products .product-sale').text(), '$449.10', 'Sale column should have the correct sale price');
  equal($('#products .product-image img').attr('src'), '/img/ipad-air.png', 'Image column should have the correct image');


});

test('Product Pagination', function(){
  expect(18);

  for(var i = 0; i < 12; i++) {
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var weight = Math.random() * 100;
    var price = Math.random() * 1000;
    var off = Math.random() * 100;

    createTestProduct(name, image, weight, price, off);
  }

  equal(db.products.length, 12, 'Should have 12 products');
  equal(db.pagination.perPage, 5, 'Should be 5 products per page');
  equal(db.pagination.currentPage, 1, 'Should be on first page');
  equal($('#products tr').length, 6, 'There should be 5 products in table');
  equal($('#prev.hidden').length, 1, 'The previous button should be hidden');
  equal($('#next:not(.hidden)').length, 1, 'The next button should be visible');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 2, 'Should be on second page');
  equal($('#products tr').length, 6, 'There should be 5 products in table');
  equal($('#prev:not(.hidden)').length, 1, 'The previous button should be visible');
  equal($('#next:not(.hidden)').length, 1, 'The next button should be visible');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 3, 'Should be on third page');
  equal($('#products tr').length, 3, 'There should be 2 products in table');
  equal($('#prev:not(.hidden)').length, 1, 'The previous button should be visible');
  equal($('#next.hidden').length, 1, 'The next button should be hidden');


  $('#prev').trigger('click');
  $('#prev').trigger('click');

  equal(db.pagination.currentPage, 1, 'Should be on first page');
  equal($('#products tr').length, 6, 'There should be 5 products in table');
  equal($('#prev.hidden').length, 1, 'The previous button should be hidden');
  equal($('#next:not(.hidden)').length, 1, 'The next button should be visible');
});

test('Add Customer', function(){
  expect(7);

  $('#customer-image').val('bob.png');
  $('#customer-name').val('Bob Johnson');
  $('#domestic')[0].checked = true;
  $('#add-customer').trigger('click');

  equal(db.customers.length, 1, 'Should have 1 customer in array');
  ok(db.customers[0] instanceof Customer, 'Should be an instance of Customer');
  ok(!$('#domestic')[0].checked, 'Domestic should not be checked');
  equal(db.customers[0].name, 'Bob Johnson', 'Name should be present');
  equal(db.customers[0].image, 'bob.png', 'Image should be present');
  ok(db.customers[0].id, 'Id should be present');
  ok(db.customers[0].isDomestic, 'Customer should be domestic');

});

test('Customer drop down', function(){
  expect(7);

  for(var i = 0; i < 4; i++) {
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var isDomestic = _.shuffle([true, false])[0];
    createTestCustomer(name, image, isDomestic);
  }
  createTestCustomer('Bob', 'bob.png', true);

  equal(db.customers.length, 5, 'There should be 5 customers');
  equal($('select#select-customer option').length, 5, 'Should have 5 options tags');
  equal($('select#select-customer option:first-child').val(), 'Bob', 'First option should have value of Bob');
  equal($('select#select-customer option:first-child').text(), 'Bob', 'First option should have text of Bob');
  ok($('table#cart').length, 'Shopping cart should be visible');
  equal($('table#cart th').length, 6, 'Shopping cart should have 6 columns');
  ok($('input#purchase').length, 'Purchase button exists');

});

test('Add Items to Shopping cart', function(){
  expect(17);

  createTestProduct('iPad Air', 'ipad-air.png', 1, 500, 10);
  createTestProduct('iPhone 5s', 'iphone.png', 0.5, 200, 0);
  createTestProduct('Macbook Pro', 'mbp.png', 3.5, 1000, 15);
  createTestCustomer('Bob', 'bob.png', true);
  createTestCustomer('Sally', 'sally.png', false);

  $('select#select-customer').val('Sally');

  // Select 2 iPhone 5s phones
  $('#products tr:nth-child(3) td.product-image img').trigger('click');
  $('#products tr:nth-child(3) td.product-image img').trigger('click');

  // 1 iPad Air
  $('#products tr:nth-child(2) td.product-image img').trigger('click');

  // 1 Macbook Pro
  $('#products tr:nth-child(4) td.product-image img').trigger('click');

  equal(db.cart.customer.name, 'Sally', 'Cart belongs to Sally');
  ok(db.cart.customer instanceof Customer, 'Sally should be instance of Customer');
  equal(db.cart.products.length, 4, 'Should be 4 products in cart');
  ok(db.cart.products[0] instanceof Product, 'Selected product should be instance of Product');
  equal(db.cart.totals.count, 4, 'Should have chosen 4 items');
  equal(db.cart.totals.amount, 1700, 'Amount total should be 1700');
  equal(db.cart.totals.weight, 5.5, 'Total weight should be 5.5 lbs');

  // Domestic is 50 cents per lb, International is $1.50 per lb
  equal(db.cart.totals.shipping, 8.25, 'Total shipping cost should be 8.25');
  equal(db.cart.totals.grand, 1708.25, 'Total cost should be 1708.25');

  equal($('#cart tbody tr').length, 3, 'Should be 3 rows in cart');
  equal($('#cart tbody tr:nth-child(1) .cartlist-name').text(), 'iPhone 5s', 'Name should be iPhone 5s');
  equal($('#cart tbody tr:nth-child(1) .cartlist-count').text(), '2', 'Count should be 2');

  equal($('#cart tfoot tr .cart-count').text(), '4', 'Should have 4 items in cart');
  equal($('#cart tfoot tr .cart-amount').text(), '$1700.00', 'Should be $1700');
  equal($('#cart tfoot tr .cart-weight').text(), '5.5 lbs', 'Should be 5.5 lbs');
  equal($('#cart tfoot tr .cart-shipping').text(), '$8.25', 'Should be $8.25');
  equal($('#cart tfoot tr .cart-total').text(), '$1708.25', 'Should be $1708.25');

});

test('Add Order', function(){
  expect(13);
  resetCart();

  createTestProduct('iPad Air', 'ipad-air.png', 1, 500, 10);
  createTestProduct('iPhone 5s', 'iphone.png', 0.5, 200, 0);
  createTestProduct('Macbook Pro', 'mbp.png', 3.5, 1000, 15);
  createTestCustomer('Bob', 'bob.png', true);
  createTestCustomer('Sally', 'sally.png', false);

  $('select#select-customer').val('Sally');

  // Select 2 iPhone 5s phones
  $('#products tr:nth-child(3) td.product-image img').trigger('click');
  $('#products tr:nth-child(3) td.product-image img').trigger('click');

  // 1 iPad Air
  $('#products tr:nth-child(2) td.product-image img').trigger('click');

  // 1 Macbook Pro
  $('#products tr:nth-child(4) td.product-image img').trigger('click');
  $('#purchase').trigger('click');

  equal($('#cart tbody tr').length, 0, 'Should be no more rows in the cart body');
  equal($('.cart-total').text(), '', 'Should be no text in the footer');
  equal(db.orders.length, 1, 'Should be one order');
  ok(db.orders[0] instanceof Order, 'Should be an instance of order');
  ok(db.orders[0].id, 'Should have an id');
  equal($('#orders thead th').length, 7, 'Should be 7 columns in orders table');
  equal($('#orders tbody tr').length, 1, 'Should be 1 row in table body');
  equal($('#orders tbody .order-time').text().split(' ').length, 5, 'Should be 5 elements in timestamp');
  equal($('#orders tbody .order-customer').text(), 'Sally', 'Should be Sally as customer');
  equal($('#orders tbody .order-total').text(), '$1700.00', 'Should be 1700 as total');
  equal($('#orders tbody .order-shipping').text(), '$8.25', 'Should be 8.25 as shipping');
  equal($('#orders tbody .order-grand').text(), '$1708.25', 'Should be 1708.25 as grand total');
  equal($('#orders tbody .order-products-list li').length, 4, 'Should have 4 items in order');

});

function createTestProduct(name, image, weight, price, off) {
  $('#product-name').val(name);
  $('#product-image').val(image);
  $('#product-weight').val(weight);
  $('#product-price').val(price);
  $('#product-off').val(off);
  $('#add-product').trigger('click');
}

function createTestCustomer(name, image, isDomestic) {
  $('#customer-name').val(name);
  $('#customer-image').val(name);
  if(isDomestic) {
    $('#domestic')[0].checked = true;
  } else {
    $('#international')[0].checked = true;
  }

  $('#add-customer').trigger('click');
}
