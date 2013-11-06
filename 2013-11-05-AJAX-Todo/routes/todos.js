var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');
var Todo = mongoose.model('Todo');
var moment = require('moment');

/*
 * GET /todos
 */

exports.index = function(req, res){
  Priority.find(function(err, priorities){
    Todo.find().populate('priority').exec(function(err, todos) {
      res.render('todos/index', {title: 'Todos', priorities: priorities, todos: todos, moment: moment});
    });
  });
};

/*
 * POST /todos
 */

exports.create = function(req, res){
  new Todo(req.body).save(function(err, todo, count){
    Priority.populate(todo, {path: 'priority', model: 'Priority'}, function(err, todo){
      res.send(todo);
    });
  });
};


/*
 * DELETE /todos/:id
 */

exports.delete = function(req, res){
  Todo.findByIdAndRemove(req.params.id, function(err, todo){
    res.send(todo);
  });
};
