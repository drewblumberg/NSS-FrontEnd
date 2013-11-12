// var colors = require('colors');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * GET /
 */

exports.create = function(req, res){
  var user = new User();
  user.email = req.body.email;
  if (req.body.password === null){
    res.send({status: 'error'});
  } else {
    bcrypt.hash(req.body.password, 10, function(err, hash){
      user.password = hash;
      user.save(function(err, user){
        if(err){
          res.send({status: 'error'});
        } else {
          res.send({status: 'ok'});
        }
      });
    });
  }
};

exports.login = function(req, res){
  var email = req.body.email;
  User.findOne({email: req.body.email}, function(err, user){
    if(user){
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if(result){
          req.session.regenerate(function(err){
            req.session.userId = user.id;
            req.session.save(function(err){
              res.send({status: 'ok',email: email});
            });
          });
        } else {
          req.session.destroy(function(err){
            res.send({status: 'Wrong password.'});
          });
        }
      });
    } else {
      res.send({status: 'User not found.'});
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(err){
    if(!err){
      res.send({status: 'ok'});
    } else {
      res.send('Session could not be destroyed.');
    }
  });
};

exports.makeMeAnAdmin = function(req, res){
  if(req.query.password === '12345'){
    res.locals.user.isAdmin = true;
    res.locals.user.save(function(err, user){
      res.send(res.locals.user);
    });
  } else {
    res.send('fail');
  }
};

exports.admin = function(req, res){
  User.find(function(err, users){
    res.render('users/admin', {users: users});
  });
};

exports.delete = function(req, res){
  User.findByIdAndRemove(req.params.id, function(err){
    res.redirect('/admin');
  });
};

exports.update = function(req, res){
  User.findById(req.params.id, function(err, user){
    user.isAdmin = !user.isAdmin;
    user.save(function(err, user){
      res.send(user);
    });
  });
};