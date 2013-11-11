$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('form#gameForm').on('submit', startGame);

  $('#board').on('click', '.availableMove', moveGuy);
}

function startGame(e) {
  var url = $(this).attr('action') + '?player=' + $('input[name="player"]').val() + '&boardSize=' + $('input[name="boardSize"]').val();
  sendGenericAjaxRequest(url, {}, 'post', null, e, function(data, status, jqXHR){
    console.log(data);
    buildGameBoard(data);
  });
}

function moveGuy(e, pos) {
  var url = '/games/' + $('#board').data('game');
  var newPosition = null, hitWormhole = false;
  if (pos) {
    newPosition = pos;
  } else {
    newPosition = $(this).data('position');
  }

  sendGenericAjaxRequest(url, {newPosition: newPosition, hitWormhole: hitWormhole}, 'post', 'put', e, function(data, status, jqXHR){
    console.log(data);
    if(data.isFinished){
      gameComplete(data);
    } else {
      refreshGameBoard(data);
    }
  });
}

// ----------------------------------------------------------------------------------//

function buildGameBoard(game){
  var gameSquares = game.boardSize * game.boardSize;
  $('#board').attr('data-game', game._id);
  $('.hp').text(game.hp);
  for (var i=0; i<gameSquares;i++){
    $square = $('<div>');
    $square.addClass('square');
    $square.attr('data-position', i);
    $square.css('width', 100 / game.boardSize + '%');
    $square.css('height', 100 / game.boardSize + '%');

    if(i === game.start){
      $square.text('Start').addClass('startSquare').addClass('currentPosition');
    } else if(i === game.exit){
      $square.text('Exit').addClass('endSquare');
    } else if(i === game.ghosts[0].position || i === game.ghosts[1].position){
      $square.addClass('ghost');
    }

    $('#board').append($square);
  }

  determineAvailableMoves();
}

function refreshGameBoard(game) {
  var length = $('#board div').length - 1;
  $('#board div').removeClass('currentPosition');

  if(game.hitWormhole){
    var newPos = _.random(0, length);
    $('trigger').click($('#board div')[newPos])
    moveGuy(null, newPos);
    return;
  }

  $($('#board div')[game.currentPosition]).addClass('currentPosition');

  if(game.hasPrincess && $('.gotPrincess').length === 0) {
    $('#messages').append($('<li class="gotPrincess">You have rescued the princess!</li>'));
  }

  if(game.hasGold && $('.gotGold').length === 0) {
    $('#messages').append($('<li class="gotGold">You have found the gold!</li>'));
  }

  moveGhosts(game);

  determineAvailableMoves();
}

function moveGhosts(game){
  $('#board div').removeClass('ghost');
  var url = '/games/' + $('#board').data('game') + '/attack';
  var newGhostPos = _.sample(_.range(game.board.length), 2);
  var gosPos1 = newGhostPos[0];
  var gosPos2 = newGhostPos[1];
  sendGenericAjaxRequest(url, {gosPos1: gosPos1, gosPos2: gosPos2}, 'post', 'put', null, function(data, status, jqXHR){
    updateHealth(data);
  });
}

function updateHealth(game) {
  var currentHp = parseInt($('.hp').text());
  $($('#board div')[game.ghosts[0].position]).addClass('ghost');
  $($('#board div')[game.ghosts[1].position]).addClass('ghost');

  if(game.currentPosition == game.ghosts[0].position) {
    var newHp = currentHp-game.ghosts[0].attack;
    $('.hp').text(newHp);
  } else if(game.currentPosition == game.ghosts[1].position) {
    var newHp = currentHp-game.ghosts[1].attack;
    $('.hp').text(newHp);
  }

  currentHp = parseInt($('.hp').text());
  debugger;
  if(currentHp <= 0){
    var url = '/games/' + $('#board').data('game') + '/died';
    sendGenericAjaxRequest(url, {isFinished: true, didWin: false}, 'post', 'put', null, function(data, status, jqXHR){
      gameComplete(data);
    });
  }
}

function gameComplete(game){
  $('#board').empty();
  if(game.didWin) {
    $('#board').append('<iframe width="560" height="315" src="http://www.youtube.com/embed/vFUJrg5GAvs?autoplay=1" frameborder="0" allowfullscreen></iframe>')
  } else {
    $('#board').append('<img src="http://www.bubblews.com/assets/images/news/51979619_1377756130.jpg">');
  }
}

function determineAvailableMoves() {
  var $squares = $('#board div');
  var $oldMoves = $('.availableMove');
  var sqrt = Math.sqrt($squares.length);
  var currentPosition = $('.currentPosition').data('position');

  if($oldMoves.length){
    _.each($oldMoves, function(move){
      $(move).removeClass('availableMove');
    });
  }

  var availableMoves = [];
  availableMoves.push(currentPosition - (sqrt + 1));
  availableMoves.push(currentPosition - (sqrt));
  availableMoves.push(currentPosition - (sqrt - 1));
  availableMoves.push(currentPosition - 1);
  availableMoves.push(currentPosition + 1);
  availableMoves.push(currentPosition + (sqrt - 1));
  availableMoves.push(currentPosition + (sqrt));
  availableMoves.push(currentPosition + (sqrt + 1));

  if(currentPosition % sqrt === 0){
    _.each(availableMoves,function(num){
      if((num+1) % sqrt !== 0 && num >= 0 && num < $squares.length) {
        $($('#board div')[num]).addClass('availableMove');
      }
    });
  } else if((currentPosition+1) % sqrt === 0){
    _.each(availableMoves,function(num){
      if(num % sqrt !== 0 && num >= 0 && num < $squares.length) {
        $($('#board div')[num]).addClass('availableMove');
      }
    });
  } else {
    _.each(availableMoves,function(num){
      $($('#board div')[num]).addClass('availableMove');
    });
  }

}

// ----------------------------------------------------------------------------------//

function sendGenericAjaxRequest(url, data, verb, altVerb, event, successFn){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb;
  $.ajax(options);
  if(event) event.preventDefault();
}
