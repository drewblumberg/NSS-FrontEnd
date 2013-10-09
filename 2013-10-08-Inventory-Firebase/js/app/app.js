'use strict';

var Δdb, Δitems;
var items, sum = 0;

$(document).ready(initialize);

function initialize() {
  $(document).foundation();

  $('#add').click(add);

  $('#save').click(save);

  Δdb = new Firebase('https://db-inventory.firebaseIO.com/');
  Δitems = Δdb.child('items');
  Δdb.once('value', receivedDbData);
  Δitems.on('child_added', childAdded);

}

function childAdded(snapshot) {
  var item = snapshot.val();
  addRow(item);

  updateGrandTotal(item);
}

function updateGrandTotal(item) {
  sum += (item.value * item.count);
  $('#total').text('$' + sum + '.00');
}

function receivedDbData(snapshot) {
  var inventory = snapshot.val();
  $('#person').val(inventory.name);
  $('#address').val(inventory.address);

  items = [];
}

function save() {
  var name = $('#person').val();
  var address = $('#address').val();
  var inventory = {};
  inventory.name = name;
  inventory.address = address;

  Δdb.update(inventory);
}

function addRow(dbItem) {
  var row = '<tr><td class="name"></td><td class="count"></td><td class="cost"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(dbItem.name);
  $row.children('.count').text(dbItem.count);
  $row.children('.cost').text('$' + dbItem.value + '.00');
  $row.children('.room').text(dbItem.room);
  $row.children('.condition').text(dbItem.condition);
  $row.children('.date').text(dbItem.date);

  $('#items').append($row);
}

function add() {
  var name = $('#name').val();
  var amount = parseFloat($('#amount').val());
  var value = parseFloat($('#value').val());
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var item = {};
  item.name = name;
  item.count = amount;
  item.value = value;
  item.room = room;
  item.condition = condition;
  item.date = date;

  Δitems.push(item);
}
