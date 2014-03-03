
/*
 * GET home page.
 */
var mysql = require('../models/db');
var site = require('../models/site');
var strutil = require('../common/strutil');
var sitetype = require('../models/sitetype');
function debug(str){
	console.log(str);
}
module.exports = function(app){
	app.get('/', function(req, res){
		sitetype.getOpenedType(function callback(result){
			debug(strutil);
			res.render('index/index', { list: result, title:'首页', strutil: strutil});
		});
	});

}

