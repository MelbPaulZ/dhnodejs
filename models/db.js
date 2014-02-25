
var settings = require('../settings');
var Db = require('mysql');
var mysql = Db.createConnection(settings);
mysql.connect(function(err){
	console.log(err);
});

function debug(str){
	console.log(str);
}

module.exports = mysql;