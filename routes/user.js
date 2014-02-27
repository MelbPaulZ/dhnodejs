
/*
 * GET users listing.
 */
var mysql = require('../models/db');
var fs = require('fs');
var strutil = require('../common/strutil');
var sitetype = require('../models/sitetype');
function debug(str){
	console.log(str);
}

module.exports = function(app){	

	//路由拦截器
	app.all('/user*', function(req, res, next){
		debug('user/all-----------------------');
		// debug(req.params);
		next();
	});

	app.get('/user', function(req, res){
		sitetype.getOpenedType(function callback(result){
			res.render('index/index', { list: result, title:'首页'});
		});
	});


	app.post('/user/login', function(req, res){
		var form = req.body;
		debug(form);
		var key = form.uid + "|" + form.studentNumber;
		var authcode = strutil.decode(form.authcode, key);
		authcode = authcode.split('|');
		debug(authcode);
		//判断登陆信息是否正确
		if(form.uid != authcode[0] || form.studentNumber != authcode[1] || form.password != authcode[2]){
			res.redirect('/user');
		}

		var user = {};
		user.username = form.username;
		user.studentNumber = form.studentNumber;
		user.uid = form.uid;
		user.password = form.password;
		req.session.user = user;
		res.send(form);
	});



	app.get('/user/upload', function(req, res){
		// res.send("<h1>/user/test</h1>");
		var user = req.session.user;
		debug(user);
		res.render('user/test', {title : 'upload'});
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

