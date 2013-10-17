'use strict';

// Firebase Schema
var Δdb, Δpositions, Δlocations;

// Local Schema (defined in keys.js)

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δlocations = Δdb.child('locations');
  Δpositions.on('child_added', dbAddPosition);
  Δlocations.on('child_added', dbAddLocation);
  $('#start').click(clickStart);
  $('#stop').click(clickStop);
  $('#add').click(clickAdd);
  initMap(36, -86, 5);
  Δpositions.remove();
  db.positions = [];
}

// Click Handlers------------------------------------------------------ //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickStart() {
  var geoOptions = {
    enableHighAccuracy: true,
    maximumAge        : 1000,
    timeout           : 27000
  };

  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

function clickStop() {
  var currentLocation = db.positions[db.positions.length - 1];
  var latLng = new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
  htmlAddStopIcon(latLng);

  navigator.geolocation.clearWatch(db.watchId);
}

function clickAdd() {
  var currentLocation = db.positions[db.positions.length - 1];
  var latLng = new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
  var location = {};
  location.latLng = latLng;
  location.title = $('#secret').val();
  Δlocations.push(location);

  htmlAddLocationIcon(latLng, location);
}

// Database functions-------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbAddPosition(snapshot) {
  var position = snapshot.val();
  var latLng = new google.maps.LatLng(position.latitude, position.longitude);

  db.positions.push(position);

  if (db.positions.length === 1) {
    htmlAddStartIcon(latLng);
    initializePolyLine();
  }

  db.path.push(latLng);
  centerAndZoom(latLng);
}

function dbAddLocation(snapshot) {
  var location = snapshot.val();
}

// HTML insertions----------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddStartIcon(latLng) {
  var image = '/img/green_flag.png';
  var marker = new google.maps.Marker({map: db.map, position: latLng, icon: image});
  db.markers.push(marker);
  marker.setPosition(latLng);
}

function htmlAddLocationIcon(latLng, location) {
  var image = '/img/rebel.png';
  var marker = new google.maps.Marker({map: db.map, position: latLng, icon: image, title: location.title});
  db.markers.push(marker);
  marker.setPosition(latLng);
}

function htmlAddStopIcon(latLng) {
  var image = '/img/stop.jpg';
  var marker = new google.maps.Marker({map: db.map, position: latLng, icon: image});
  db.markers.push(marker);
  marker.setPosition(latLng);
}

function initializePolyLine() {
  var polyLine = new google.maps.Polyline({
      map: db.map,
      geodesic: true,
      strokeColor:'#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

  db.path = polyLine.getPath();
}


// Miscellaneous------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function geoSuccess(pos) {
  var position = {};
  position.altitude = pos.coords.altitude || 0;
  position.latitude = pos.coords.latitude;
  position.longitude = pos.coords.longitude;
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a');

  Δpositions.push(position);
}

function geoError() {
  console.log('Sorry, no position available.');
}

function centerAndZoom(latLng) {
  db.map.setCenter(latLng);
  db.map.setZoom(20);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //