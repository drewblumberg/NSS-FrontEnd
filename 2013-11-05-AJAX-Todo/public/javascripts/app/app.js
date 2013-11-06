$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('form#priority').on('submit', submitPriority);
  $('form#todos').on('submit', submitTodo);

  $(document).on('submit','form.deleteTodo', deleteTodo);
  $(document).on('submit','form.updateTodo', updateTodo);

  $(document).on('click', '.completed', completeTask);
}

function submitAjaxForm(e, form, successFn, type) {
  var type = (type == null) ? 'POST' : type;
  var url = $(form).attr('action');
  var data = $(form).serialize();

  var options = {};
  options.url = url;
  options.type = type;
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log('The following error has occurred: ' + error);};

  $.ajax(options);

  e.preventDefault();
}

function submitTodo(e) {
  submitAjaxForm(e, this, function(data, status, jqXHR){
    addTodoToList(data);
  });
}

function submitPriority(e) {
  submitAjaxForm(e, this,  function(data, status, jqXHR){
    addPriorityToSelect(data);
  });
}

function deleteTodo(e) {
  var $form = $(this);
  submitAjaxForm(e, this, function(data, status, jqXHR){
    removeToDo($form);
  });
}

function updateTodo(e) {
  submitAjaxForm(e, this, function(data, status, jqXHR){
    completeTask();
  });
}

function addPriorityToSelect(data){
  var $option = $('<option>');
  $option.val(data._id);
  $option.text(data.name);
  $('#priority-select').append($option);

  $('form#priority input').val('');
}

function addTodoToList(data){
  var $div = $('<div>');
  var formattedDate = moment(data.dueDate).format('MMMM Do YYYY');
  $div.text(data.title + ' is due on ' + formattedDate);
  $div.css('background-color', data.priority.color);
  $div.addClass('todoDiv');

  var $row = $('<div class="row">');
  var $column1 = $('<div class="small-10 columns">');
  var $column2 = $('<div class="small-2 columns"><form action="/todos/' + data._id + '" method="post" class="deleteTodo")><input type="hidden", name="_method", value="delete"></input><button class="delete alert radius small expand value="submit">Delete</button></form></div>');

  $('#todoList').append($row.append($column1.append($div)).append($column2));

  $('form#todos input').val('');
}

function removeToDo($form){
  $form.parent().parent().remove();
}

function completeTask() {
  $(this).closest('div').siblings().first().children().toggleClass('done');
}
