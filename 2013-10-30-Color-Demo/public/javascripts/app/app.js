$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('#colors td').on('click', clickColor);
}

function clickColor(){
  $(this).css('background-color', 'black');
}
