'use strict';

// Firebase Schema
var Δdb, Δpositions;

// Local Schema (defined in keys.js)

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δpositions.on('child_added', dbPositionAdded);
  initMap(36, -86, 5);
  $('#erase').click(clickErase);
  $('#start').click(clickStart);
  $('#stop').click(clickStop);
  Δpositions.remove();
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

function clickErase() {
  Δpositions.remove();
  db.positions = [];
  db.map.setCenter(new google.maps.LatLng(36,-86));
  db.map.setZoom(5);
  _.each(db.markers, function(marker) { marker.setMap(null);});

  db.path = [];
}

function clickStop() {
  navigator.geolocation.clearWatch(db.watchId);
}

// Database Functions-------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbPositionAdded(snapshot) {
  var position = snapshot.val();
  var latLng = new google.maps.LatLng(position.latitude, position.longitude);

  db.positions.push(position);

  if(db.positions.length === 1) {
    htmlAddStartIcon(latLng);
    initializePolyLine();
  }
  db.path.push(latLng);
  db.marker.setPosition(latLng);
  centerAndZoom(latLng);

}

// HTML insertion functions-------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddStartIcon(latLng) {
  var image = 'img/green_flag.png';
  db.marker = new google.maps.Marker({map: db.map, position: latLng, icon: image});
  db.markers.push(db.marker);
}

function initializePolyLine() {
  var polyLine = new google.maps.Polyline({
      map: db.map,
      geodesic: true,
      strokeColor: '#FF0000',
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
  position.latitude = pos.coords.latitude;
  position.longitude = pos.coords.longitude;
  position.altitude = pos.coords.altitude || 0;
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

// function formatCurrency(number){
//   return '$' + number.toFixed(2);
// }

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
