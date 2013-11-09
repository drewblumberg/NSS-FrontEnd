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

function moveGuy(e) {
  var url = '/games/' + $('#board').data('game');
  var newPosition = $(this).data('position');

  sendGenericAjaxRequest(url, {newPosition: newPosition}, 'post', 'put', e, function(data, status, jqXHR){
    console.log(data);
    refreshGameBoard(data);
  });
}

// ----------------------------------------------------------------------------------//

function buildGameBoard(game){
  var gameSquares = game.boardSize * game.boardSize;
  $('#board').attr('data-game', game._id);
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
    }

    $('#board').append($square);
  }

  determineAvailableMoves();
}

function refreshGameBoard(game) {
  $('#board div').removeClass('currentPosition');
  var temp = game.currentPosition;
  debugger;
  $($('#board div')[game.currentPosition]).addClass('currentPosition');

  determineAvailableMoves();
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
