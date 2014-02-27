
/*
 * GET home page.
 */
var mysql = require('../models/db');
var site = require('../models/site');
var util = require('util');
var sitetype = require('../models/sitetype');
function debug(str){
	console.log(str);
}
module.exports = function(app){
	app.get('/', function(req, res){
		sitetype.getOpenedType(function callback(result){

			res.render('index/index', { list: result, title:'首页'});
		});
	});

}

