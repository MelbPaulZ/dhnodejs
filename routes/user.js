
/*
 * GET users listing.
 */
var mysql = require('../models/db');
function debug(str){
	console.log(str);
}

module.exports = function(app){

	app.get('/user', function(req, res){
		var list = null;
		mysql.query("select * from dh_site",function callback(err, result, fields){
			debug(result);
			list = result;
			res.render('user/user', { list: list, title:'users'});
		});
		// res.send("respond with a resource2");
	});


	app.get('/user/test', function(req, res){
		// res.send("<h1>/user/test</h1>");
		res.render('user/test', {title : 'test'});
	});
}

