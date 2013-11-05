
/*
 * GET /
 */

exports.index = function(req, res){
  res.render('home/index', {title: 'Mix-Master | Home'});
};
