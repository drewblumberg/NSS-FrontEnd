var mongoose = require('mongoose');
var _ = require('lodash');

var Game = mongoose.Schema({
  board: [Number],
  ghosts: [{}],
  player: String,
  boardSize: {type: Number, min: 2, max: 100},
  hp: {type: Number, default: 5},
  start: Number,
  exit: Number,
  currentPosition: Number,
  gold: Number,
  hasGold: { type:Boolean, default: false},
  princess: Number,
  hasPrincess: { type:Boolean, default: false},
  wormholes: [Number],
  hitWormhole: {type: Boolean, default: false},
  isFinished: {type: Boolean, default: false},
  didWin: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now}
});

Game.pre('save', function(next){
  var gameSquares = this.boardSize * this.boardSize;
  if(!this.board.length){
    this.board = _.range(gameSquares);

    this.ghosts = [{name: 'ghost1'}, {name: 'ghost2'}]
    this.ghosts[0].attack = parseInt(_.sample([1,2,3],1).join());
    this.ghosts[1].attack = parseInt(_.sample([1,2,3],1).join());

    var staticPieces = _.sample(this.board, 8);
    this.start = staticPieces[0];
    this.currentPosition = staticPieces[0];
    this.exit = staticPieces[1];
    this.princess = staticPieces[2];
    this.gold = staticPieces[3];
    this.wormholes = [staticPieces[4], staticPieces[5]];
    this.ghosts[0].position = staticPieces[6];
    this.ghosts[1].position = staticPieces[7];
  } else {
    if(this.hasPrincess && this.hasGold && this.currentPosition === this.exit){
      this.isFinished = true;
      this.didWin = true;
    } else if(this.currentPosition === this.exit){
      this.isFinished = true;
    } else {
      if(_.contains(this.wormholes, this.currentPosition)) {
        this.hitWormhole = true;
      }

      if(this.currentPosition === this.princess) {
        this.hasPrincess = true;
      }

      if(this.currentPosition === this.gold) {
        this.hasGold = true;
      }
    }
  }


  next();
});

mongoose.model('Game', Game);