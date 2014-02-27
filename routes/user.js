
/*
 * GET users listing.
 */
var mysql = require('../models/db');
var fs = require('fs');
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


	app.post('/user/login', function(req, res){
		var form = req.body;
		debug(form);
		res.send(form);
	});



	app.get('/user/upload', function(req, res){
		// res.send("<h1>/user/test</h1>");
		res.render('user/test', {title : 'test'});
	});

	app.post('/user/upload', function(req, res){
		var form = req.body;
		var files = req.files;
		debug(files);
		var tmpPath = files.pic.path;
		var targetPath = './uploads/'+files.pic.name;
		fs.rename(tmpPath, targetPath, function(err){
			if(err) throw err;
			fs.unlink(tmpPath, function(){
				if (err) throw err;
				res.send('File uploaded to: ' + targetPath + ' - ' + files.pic.size + ' bytes');
			});
		});
	});
}

