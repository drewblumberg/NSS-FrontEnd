'use strict';

// DB schema
var Δdb, Δitems, Δperson, Δstatistics;

// Local Schema
var db = {};
db.person = {};
db.items = [];
db.statistics = {};
db.statistics.grandTotal = 0;

$(document).ready(initialize);

function initialize() {
  $(document).foundation();

  $('#add').click(add);

  $('#save').click(save);

  Δdb = new Firebase('https://db-inventory.firebaseIO.com/');
  Δitems = Δdb.child('items');
  Δperson = Δdb.child('person');
  Δperson.on('value', personChanged);
  Δitems.on('child_added', itemAdded);

}

function itemAdded(snapshot) {
  var item = snapshot.val();
  db.items.push(item);
  addRow(item);
  updateGrandTotal(item);
}

function updateGrandTotal(item) {
  db.statistics.grandTotal += (item.value * item.count);
  $('#total').text('$' + db.statistics.grandTotal + '.00');
}

function personChanged(snapshot) {
  var person = snapshot.val();

  try {
    $('#person').val(person.name);
    $('#address').val(person.address);
  } catch (e) {
    console.log(e.message);
  }

  db.person = person;
}

function save() {
  var name = $('#person').val();
  var address = $('#address').val();
  var person = {};
  person.name = name;
  person.address = address;

  Δperson.set(person);
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
