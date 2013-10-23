'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  // Reset Global Variables Here
  db.products = [];
  db.customers = [];
  db.orders = [];
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

function createTestProduct(name, image, weight, price, off) {
  $('#product-name').val(name);
  $('#product-image').val(image);
  $('#product-weight').val(weight);
  $('#product-price').val(price);
  $('#product-off').val(off);
  $('#add-product').trigger('click');
}
