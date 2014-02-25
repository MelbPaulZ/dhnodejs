var mysql = require('../models/db');
function debug(str){
	console.log(str);
}

function Site(site){
	this.site = site;
}

module.exports = Site;

Site.prototype.save = function(callback){

}

//静态方法
Site.get = function(id, callback){
	mysql.query("select * from dh_site where id="+id, callback);
}

Site.getSiteByType = function(typeId, callback){
	mysql.query("select * from dh_site where typeId="+typeId, callback);
}