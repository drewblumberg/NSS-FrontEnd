var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Genre = mongoose.model('Genre');
var _ = require('lodash');

/*
 * GET /songs
 */

exports.index = function(req, res){
  // Song.find(function(err, songs){
  //   res.render('songs/index', {title: 'Mix-Master | Songs', songs: songs});
  // });

  Song.find().populate('genres').exec(function(err, songs){
    console.log(songs);
    res.render('songs/index', {title: 'Mix-Master | Songs', songs: songs});
  });
};

/*
 * GET /songs/new
 */

exports.new = function(req, res){
  Genre.find(function(err, genres) {
    res.render('songs/new', {title: 'Mix-Master | New Song', genres: genres});
  });
};

/*
 * POST /songs/new
 */

exports.create = function(req, res){
  new Song(req.body).save(function(err, song, count){
    console.log(req.body);
    if(err) {
      console.log(err);
      res.render('songs/new', {title: 'MixMaster New', errors: err});
    }
    else {
      res.redirect('songs/');
    }
  });
};


/*
 * GET /songs/:id
 */

exports.show = function(req, res){
  Song.findById(req.params.id, function(err, song){
    Genre.populate(song, {path: 'genres', model: 'Genre'}, function(err, song){
      res.render('songs/show', {title: 'Mix-Master | ' + song.title, song: song});
    });
  });
};

/*
 * DELETE /songs/:id
 */

exports.delete = function(req, res){
  Song.findByIdAndRemove(req.params.id, function(err){
    res.redirect('/songs');
  });
};

/*
 * GET /songs/:id/edit
 */

exports.edit = function(req, res){
  Song.findById(req.params.id).populate('genres').exec(function(errSong, song){
    Genre.find().exec(function(errGenre, genres) {
      res.render('songs/edit', {title: 'Mix-Master | Edit ' + song.title, song: song, genres: genres, _:_});
    });
  });
};

/*
 * PUT /songs/:id/
 */

exports.update = function(req, res){
  Song.findByIdAndUpdate(req.params.id, req.body, function(err, song){
    if(err)
    {
      console.log(err);
      res.render('songs/edit', {title: 'Edit', song: song})
    }
    else {
      res.redirect('/songs');
    }
  });
};



