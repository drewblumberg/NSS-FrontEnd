var db = require(__dirname + '/../modules/database');
/*
 * GET todo list page.
 */

exports.index = function(req, res){
  var todos = db.read(__dirname + '/../db/todo.json');
  res.render('todo', { title: 'To Do | List',  todos: todos});
};

exports.new = function(req, res){
  res.render('todo/new', { title: 'To Do | New'})
};

exports.create = function(req, res){
  var item = req.body.item;
  var due = req.body.due;
  var color = req.body.color;

  var todos = db.read(__dirname + '/../db/todo.json');
  var todo = {item: item, due: due, color: color};
  todos.push(todo);

  db.write(__dirname + '/../db/todo.json', todos);

  res.redirect('/todo');
};