'use strict';

$(document).ready(initialize);

var photos = [], currentIndex = 0, timer = 0;
var page = 1, PER_PAGE = 3;
var API_KEY = 'c34a96c6d41f9f342505c5d6f649b7bf';
var query = null, url = null;


function initialize(){
  $(document).foundation();

  $('#search').click(searchFlickr);
}

function searchFlickr() {
  query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, results);
}

function results(data) {
  photos = data.photos.photo;
  timer = setInterval(createImage, 1000);
}

function createImage() {
  var photo = photos[currentIndex];

  try {
    currentIndex++;
    url = 'url(http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
    var $div = $('<div>');
    $div.addClass('photo').css('background-image', url);
    $('#photos').prepend($div);

    if (currentIndex === photos.length) {
      clearInterval(timer);
      currentIndex = 0;
      page++;
      searchFlickr();
    }
  }
  catch(err) {
    clearInterval(timer);
    currentIndex = 0;
    searchFlickr();
  }
}