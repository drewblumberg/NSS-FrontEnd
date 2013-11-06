var mongoose = require('mongoose');
var Game = mongoose.model('Game');
/*
 * POST /games/start
 */

exports.create = function(req, res){
  new Game(req.query).save(function(err, game){
    console.log(game);
    res.send(game);
  });
};

// PUT /games/:id

exports.update = function(req, res){
  console.log(req.params);
  console.log(req.body);
  Game.findById(req.params.id, function(err, game){
    game.guess = req.body.guess;
    game.didWin = game.guess == game.actual;
    game.save(function(err, updatedGame){
      res.send(updatedGame);
    });
  });
}
