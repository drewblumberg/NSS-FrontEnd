var mongoose = require('mongoose');
var Genre = mongoose.model('Genre');

/*
 * GET /genres
 */

exports.index = function(req, res){
  Genre.find(function(err, genres){
    res.render('genres/index', {title: 'Mix-Master | Genres', genres: genres});
  });
};

/*
 * GET /genres/new
 */

exports.new = function(req, res){
  var genre = new Genre();
  res.render('genres/new', {title: 'New Genre', genre: genre});
};

/*
 * POST /genres/new
 */

exports.create = function(req, res){
  new Genre(req.body).save(function(err, genre, count){
    if(err) {
      res.render('genres/new', {title: 'New Genre', errors: err.errors, genre: new Genre()});
    } else {
      res.redirect('genres/');
    }
  });
};


// /*
//  * GET /songs/:id
//  */

// exports.show = function(req, res){
//   Song.findById(req.params.id, function(err, song){
//     res.render('songs/show', {title: 'Mix-Master | ' + song.title, song: song});
//   });
// };

// /*
//  * DELETE /songs/:id
//  */

// exports.delete = function(req, res){
//   Song.findByIdAndRemove(req.params.id, function(err){
//     res.redirect('/songs');
//   });
// };

/*
 * GET /genres/:id/edit
 */

exports.edit = function(req, res){
  Genre.findById(req.params.id, function(err, genre){
    res.render('genres/edit', {title: 'Edit Genre', genre: genre});
  });
};

/*
 * PUT /genres/:id/
 */

exports.update = function(req, res){
  console.log(req.params.id);
  Genre.findByIdAndUpdate(req.params.id, req.body, function(err, genre){
    if(err)
    {
      console.log(err);
    }
    res.redirect('/genres');
  });
};



