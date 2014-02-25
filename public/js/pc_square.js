
function Square(){
	this.ajaxUrl = {}
}

Square.prototype.setUrl = function(url) {
	this.ajaxUrl = url;
};

/**
 * 添加网址
 */
Square.prototype.add = function(data,callback) {
    $.ajax({
        async:false,
        type:'post',
        url:this.ajaxUrl.add,
        dataType:'json',
        data:{'title':data.title, 'url':data.url, 'logo':data.logo,'pageId':data.pageId, 'submitted':'submitted'},
        success:function(msg){
            callback(msg);
        }
    });
};

/**
 * 更新网址
 */
Square.prototype.update = function(id,data,callback) {
	$.ajax({
        async:false,
        type:'post',
        url:this.ajaxUrl.update,
        dataType:'json',
        data:{'id':id, 'title':data.title, 'url':data.url, 'logo':data.logo,'pageId':data.pageId, 'submitted':'submitted'},
        success:function(msg){
            callback(msg);
        }
    });
};

/**
 * 删除网址
 */
Square.prototype.delete = function(id,callback) {
	$.ajax({
        async:false,
        type:'post',
        url:this.ajaxUrl.del,
        dataType:'json',
        data:{'id':id,  'submitted':'submitted'},
        success:function(msg){
            callback(msg);
        }
    });			
};


/**
 * 根据类别，获得该类别下的网址列表
 * @param int typeId
 * @return object
 */
Square.prototype.getSelectWebSite = function(typeId){
	var upload = this.ajaxUrl.upload;
    var squire = $('.example').children('a.selectSite').clone(true);
    var logo = squire.find('img');
    var title = squire.children('.addweb_right_txt');
    var webbase_unit = $('.webbase_unit');
    $.ajax({
        async:false,
        type:'post',
        url:this.ajaxUrl.getSelectWebSite,
        dataType:'json',
        data:{'typeId':typeId,'submitted':'submitted'},
        success:function(msg){
            for (var i = 0; i < msg.length; i++) {
                squire.attr('url',msg[i].site);
                squire.attr('title',msg[i].name);
                squire.attr('logo','webshot/' + msg[i].logo);
                var logoName;
                if (msg[i].logo==null) {
                    logoName =  upload + '/default.jpg';
                }else{
                    logoName =  upload + '/webshot/'+msg[i].logo;
                }
                logo.attr('src',logoName);
                title.text(msg[i].name);
                webbase_unit.append(squire);
            };
        }
    });
   
}


/**
 * 创建一个siteSquare方块
 * @param obj site{title,url,logo}
 * @return jquery obj
 */
Square.prototype.createSqureNode = function(site){
    var template = $('#siteTemplate').children('a.siteSquare');
    var a = template.clone(true);
    a.attr('href',site.url);//设置url
    a.attr('alt',site.id);
    a.attr('page',site.pageId);
    a.find('img').attr('src', this.ajaxUrl.upload + '/'+site.logo);
    
    a.children('.pc_right_span2').text(site.title);//设置标题
    // a.children('.pc_right_span1').css({background:'green'});//设置背景
    return a;
}

/**
 * ajax获取搜索的结果，并显示出来
 */
Square.prototype.searchSite = function(name,site){
	var upload = this.ajaxUrl.upload;
    var squire = $('.example').children('a.selectSite').clone(true);
    var logo = squire.find('img');
    var title = squire.children('.addweb_right_txt');
    var webbase_unit = $('.webbase_unit');
    $.ajax({
        async:false,
        type:'post',
        url:this.ajaxUrl.searchSite,
        dataType:'json',
        data: {'name':name,'site':site},
        success: function(msg){
            if (msg!=='') {
                webbase_unit.empty();
                for (var i = 0; i < msg.length; i++) {
                    squire.attr('url',msg[i].site);
                    squire.attr('title',msg[i].name);
                    squire.attr('logo','webshot/' + msg[i].logo);
                    var logoName;
                    if (msg[i].logo==null) {
	                    logoName =  upload + '/default.jpg';
	                }else{
	                    logoName =  upload + '/webshot/'+msg[i].logo;
	                }
                    logo.attr('src',logoName);
                    title.text(msg[i].name);
                    webbase_unit.append(squire);
                };
           }   
            
        }
    });
}