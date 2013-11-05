var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Artist = mongoose.model('Artist');

/*
 * GET /artists
 */

exports.index = function(req, res){
  Artist.find(function(err, artists){
    res.render('artists/index', {title: 'Mix-Master | Artists', artists: artists});
  });
};

/*
 * GET /artists/new
 */

exports.new = function(req, res){
  Song.find(function(err, songs){
    res.render('artists/new', {title: 'Mix-Master | New Artist', songs: songs});
  });
};

/*
 * POST /artists/new
 */

exports.create = function(req, res){
  console.log('--before--');
  console.log(req.body);

  new Artist(req.body).save(function(err, artist, count){
    console.log('--after--');
    console.log(artist);
    res.redirect('/artists');
  });
};

/*
 * GET /artists/:id
 */

exports.show = function(req, res){
  Artist.findById(req.params.id, function(err, artist){
    Song.populate(artist, {path: 'songids', model: 'Song'}, function(err, artist) {
      res.render('artists/show', {title: 'Mix-Master | Artist Page', artist: artist});
    });
  });
};