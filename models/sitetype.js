var mysql = require('../models/db');
var strutil = require('../common/strutil.js');
var Site = require('./site.js');
function debug(str){
	console.log(str);
}

function SiteType(sitetye){
	this.sitetype = sitetype;
}

module.exports = SiteType;

SiteType.prototype.save = function(callback){

}

//静态方法
SiteType.get = function(typeId, callback){
	mysql.query("select * from dh_site_type where typeId="+typeId+" and ", callback);
}
 

SiteType.getOpenedType = function(callback){
	var arr = {};
	// debug('=========');
	mysql.query(
		strutil.replaceTpl("select typeId from dh_site_type where isOpened={isOpened}",[{isOpened:1}]), 
		function(err, resultType, field){
			
			resultType.forEach(function(key, index){
				// debug(key.typeId +"/"+index);
				Site.getSiteByType(key.typeId, function(err, result, field){
					// debug(result);
					arr[key.typeId] = result;
					// debug(arr);
					if(index == resultType.length -1){
						// debug('end:==============='+key.typeId);
						callback(arr);
					}
				});
			});
			
		}
	);
}