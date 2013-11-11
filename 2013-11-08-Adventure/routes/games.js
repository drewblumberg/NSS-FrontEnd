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
    game.hitWormhole = req.body.hitWormhole;
    game.save(function(err, updatedGame){
      res.send(updatedGame);
    });
  });
}

exports.attack = function(req, res){
  Game.findById(req.params.id, function(err, game){
    game.ghosts[0].position = req.body.gosPos1;
    game.ghosts[1].position = req.body.gosPos2;
    game.markModified('ghosts');
    game.save(function(err, updatedGame){
      res.send({ghosts: updatedGame.ghosts, currentPosition: updatedGame.currentPosition});
    });
  });
}

exports.died = function(req, res){
  Game.findById(req.params.id, function(err, game){
    game.didWin = req.body.didWin;
    game.isFinished = req.body.isFinished;
    game.save(function(err, updatedGame){
      res.send({didWin: updatedGame.didWin});
    });
  });
}