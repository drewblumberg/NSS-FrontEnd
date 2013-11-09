var mongoose = require('mongoose');
var Game = mongoose.model('Game');

var colors = require('colors');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * POST /games/start
 */

exports.start = function(req, res){
  new Game(req.query).save(function(err, game){
    res.send(game);
  });
}

/*
 * POST /games/:id
 */

exports.update = function(req, res){
  Game.findById(req.params.id, function(err, game){
    game.currentPosition = req.body.newPosition;
    game.save(function(err, updatedGame){
      res.send(updatedGame);
    })
  });
}
