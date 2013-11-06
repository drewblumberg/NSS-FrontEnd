$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('form#nameInput').on('submit', submitGame);
  $(document).on('click', '.cup', clickCup);
}

//---------------------------------------------//
//---------------------------------------------//
//---------------------------------------------//

function submitGame(e){
  var url = $(this).attr('action') + '?player=' + $('input[name="player"]').val();
  sendGenericAjaxRequest(url, {}, 'post', null, e, function(data, status, jqXHR){
    htmlStartGame(data);
  });
}

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

function htmlStartGame(game) {
  $('#stars').empty();
  $('input[name="player"]').val('');
  $('body').css('background-color', '#cccccc');


  for(var i=0; i<3; i++) {
    $div = $('<div>').attr('data-game', game._id);
    $img = $('<img>').attr('src','../../images/deathstar.png').attr('data-position', i).addClass('cup');

    $div.append($img);
    $('#stars').append($div);
  }
  $('.playerName').text(game.player);
  $('.hiddenName').show();
}

function clickCup() {
  var position = $(this).data('position');
  var gameId = $(this).parent().data('game');
  var url = '/games/' + gameId;
  sendGenericAjaxRequest(url, {guess: position}, 'post', 'put', null, function(data, status, jqXHR){
    if(data.didWin) {
      $('body').css('background-color', 'green');
      $('.hiddenName').hide();
      $('#stars').empty();
      $('.hiddenName span').text('');
      $('#stars').append($('<h1>YOU GOT LUCKY DUMBASS</h1>'));
    } else {
      $('body').css('background-color', 'red');
      $('.hiddenName').hide();
      $('#stars').empty();
      $('.hiddenName span').text('');
      $('#stars').append($('<h1>NICE GOING LOSER</h1>'));
    }

  });
}
