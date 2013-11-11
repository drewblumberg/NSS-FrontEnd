var colors = require('colors');
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
  User.findOne({email: req.body.email}, function(err, user){
    if(user){
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if(result){
          req.session.regenerate(function(err){
            req.session.userId = user.id;
            req.session.save(function(err){
              res.send({status: 'ok'});
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
}
