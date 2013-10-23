'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  // Reset Global Variables Here
  db.products = [];
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
