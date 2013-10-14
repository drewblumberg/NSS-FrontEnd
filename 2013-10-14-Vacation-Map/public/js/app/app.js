'use strict';

// Firebase Schema
var Δdb, Δlocations;

// Local Schema
var db = {};
db.locations = [];
db.locations.coordinates = {};
db.map = null;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://db-vacation.firebaseio.com/');
  Δlocations = Δdb.child('locations');
  Δlocations.on('child_added', dbLocationAdded);
  $('#set_zoom').click(setZoom);
  $('#set_add').click(setLocation);
  $('#set_location').click(goToLocation);
  initMap(36.17, -86.78, 5);
}

function goToLocation() {
  var name = $('#locations').val();
  var local = _.find(db.locations, function(location){ return location.name === name;});
  var latlng = new google.maps.LatLng(local.coordinates.lb, local.coordinates.mb);
  db.map.panTo(latlng);
}

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function dbLocationAdded(snapshot) {
  var location = snapshot.val();
  db.locations.push(location);

  // Add location option to DOM
  var $option = $('<option>');
  $option.val(location.name).text(location.name);
  $('#locations').append($option);

  // Add marker to map
  var latlng = new google.maps.LatLng(location.coordinates.lb, location.coordinates.mb);
  var marker = new google.maps.Marker({map: db.map, position: latlng, title: location.name});

}

function setZoom() {
  var zoom = parseInt($('#zoom').val(), 10);
  db.map.setZoom(zoom);
}

function setLocation() {
  var name = $('#add').val();
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: name}, function(results, status) {
    if(status === google.maps.GeocoderStatus.OK) {
      var result = results[0];
      var coordinates = result.geometry.location;

      var location = {};
      location.name = result.formatted_address;
      location.coordinates = coordinates;

      Δlocations.push(location);
    }
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

  $('#add').val('').focus();
}
