
/*
 * GET home page.
 */
var mysql = require('../models/db');
var site = require('../models/site');
function debug(str){
	console.log(str);
}
module.exports = function(app){
	app.get('/', function(req, res){
		var list = null;
		// mysql.query("select * from dh_site",function callback(err, result, fields){
		// 	debug(result);
		// 	list = result;
		// 	res.render('user/user', { list: list, title:'首页'});
		// });
		site.getSiteByType(17, function callback(err, result, fields){
			debug(result);
			list = result;
			res.render('user/user', { list: list, title:'首页'});
		});
	});

}

