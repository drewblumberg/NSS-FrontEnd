var db = require('../modules/database');

// GET /people
exports.index = function(req, res){
  var people = db.read(__dirname + '/../db/people.json');
  res.render('people', { title: 'People | Address Book', people: people });
};

exports.new = function(req, res){
  res.render('people/new', { title: 'New | Address Book' });
};

exports.create = function(req, res){
  var name = req.body.name;
  var gender = req.body.gender;
  var age = parseInt(req.body.age);
  var color = req.body.color;

  var people = db.read(__dirname + '/../db/people.json');
  var person = {name: name, age: age, gender: gender, color: color};
  people.push(person);

  db.write(__dirname + '/../db/people.json', people)

  res.redirect('/people');
};