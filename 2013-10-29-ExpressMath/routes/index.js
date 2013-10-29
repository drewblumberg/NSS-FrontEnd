
/*
 * GET home page.
 */

var math = require('../modules/math');

exports.index = function(req, res){
  res.render('index', { title: 'Express', x: math.square(3), area: math.area(3,4), volume: math.volume(3,3,3) });
};