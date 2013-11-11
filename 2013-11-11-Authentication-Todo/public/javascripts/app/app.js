$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();

  $('#auth-button').on('click',clickAuthenticationButton);

  $('#register').on('click', clickRegister);
  $('#login').on('click', clickLogin);
}


function clickAuthenticationButton(e){
  $('#errorMsg').empty();
  $('form#authentication').toggleClass('hidden');
  $('input[name="email"]').focus();
  e.preventDefault();
}

function clickRegister(e){
  var url = '/users';
  var data = $('#authentication').serialize();
  sendAjaxRequest(url, data, 'post', null, e, function(data, status, jqXHR){
    checkForErrors(data);
  })

  e.preventDefault();
}

function clickLogin(e){
  var url = '/login';
  var data = $('#authentication').serialize();
  sendAjaxRequest(url, data, 'post', 'put', e, function(data, status, jqXHR){
    console.log(data);
  })

  e.preventDefault();
}

function checkForErrors(data){
  if(data.status === 'error'){
    $('#errorMsg').append('<div class="error">There was an issue creating your account. Please try again.</div>');
  } else {
    $('#auth-button').trigger('click');
    $('#errorMsg').append('<div class="successful">Your account was created successfully! Please log in.</div>');
  }
}

function initializeSocketIO(){
  var port = location.port ? location.port : '80';
  var url = location.protocol + '//' + location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}
