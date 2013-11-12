$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();

  $('#auth-button').on('click',clickAuthenticationButton);

  $('#register').on('click', clickRegister);
  $('#login').on('click', clickLogin);
  $('.toggleAdmin').on('click', toggleAdmin);
  if($('#auth-button').data('email') !== 'anonymous'){
    $('#todos').removeClass('hidden');
  }
}


function clickAuthenticationButton(e){
  $('#errorMsg').empty();

  var isAnonymous = $('#auth-button[data-email="anonymous"]').length === 1;

  if(isAnonymous){
    $('form#authentication').toggleClass('hidden');
    $('input[name="email"]').focus();
  } else {
    clickLogout(e);
  }
  e.preventDefault();
}

function clickRegister(e){
  var url = '/users';
  var data = $('#authentication').serialize();
  sendAjaxRequest(url, data, 'post', null, e, function(data, status, jqXHR){
    checkForErrors(data);
  });

  e.preventDefault();
}

function toggleAdmin(e){
  var id = $(this).parent().parent().data('id');
  var url = '/users/' + id;
  sendAjaxRequest(url, {}, 'post', 'put', null, e, function(data){
    console.log(data);
  });
}

function clickLogin(e){
  var url = '/login';
  var data = $('#authentication').serialize();
  sendAjaxRequest(url, data, 'post', 'put', e, function(data, status, jqXHR){
    htmlUpdateLoginStatus(data);
  });

  e.preventDefault();
}

function clickLogout(e){
  var url = '/logout';
  var data = {};
  sendAjaxRequest(url, data, 'post', 'delete', null, function(data){
    htmlLogout(data);
  })
}

function checkForErrors(data){
  if(data.status === 'error'){
    $('#errorMsg').append('<div class="error">There was an issue creating your account. Please try again.</div>');
  } else {
    $('#auth-button').trigger('click');
    $('#errorMsg').append('<div class="successful">Your account was created successfully! Please log in.</div>');
  }
}

function htmlUpdateLoginStatus(result){
  $('input[name="email"]').val('');
  $('input[name="password"]').val('');

  if(result.status === 'ok') {
    $('#authentication').toggleClass('hidden');
    $('#auth-button').attr('data-email', result.email);
    $('#auth-button').text(result.email);
    $('#auth-button').addClass('alert');
    $('#todos').removeClass('hidden');
  }
}

function htmlLogout(result){
  $('input[name="email"]').val('');
  $('input[name="password"]').val('');
  if(result.status === 'ok'){
    $('#auth-button').attr('data-email', 'anonymous');
    $('#auth-button').text('Login | Sign Up');
    $('#auth-button').removeClass('alert');
    $('#todos').addClass('hidden');
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
