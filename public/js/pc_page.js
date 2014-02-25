
/**
 * 每一大页的类
 */
function page(){
	this.ajaxUrl = {}; 
	this.isScrolling = false;
	this.index = 0;
}
page.prototype = {

	test: function(){
		alert(this.ajaxUrl.add);
	},
	//url = {add,delete,update}
	setUrl: function(url){
		this.ajaxUrl = url;
	},
	/**
	 * @param function callback
	 */
	addPage: function(callback){
		var tPage = this;//保存this变量
	    $.ajax({
	        async:false,
	        type:'post',
	        url: this.ajaxUrl.add,
	        dataType:'json',
	        data:{'submitted':'submitted'},
	        success:function(msg){
	            callback(msg);
	        }
	    });
	},
	/**
	 * 生成一页，然后追加到最后一页的后面
	 * @param int pageId
	 */
	appendPage: function(pageId){
		var temp = $('.pc_nomalwebsite:first');
	    var newpage = temp.clone(true);
	    var noWeb = $('#template .pc_right_noweb').clone(true);
	    noWeb.attr('alt',pageId);
	    newpage.attr('alt',pageId);
	    newpage.empty();
	    newpage.append(noWeb);
	    // newpage.children('a.siteSquare').remove();
	    $('#include_web').append(newpage);
	    // $('.pc_right_noweb').unbind('click');
	},

	deletePage: function(pageId,callback){
		var tPage = this;//保存this变量
	    $.ajax({
	        async:false,
	        type:'post',
	        url: this.ajaxUrl.delete,
	        dataType:'json',
	        data:{'pageId':pageId,'submitted':'submitted'},
	        success:function(msg){
	            callback(msg);
	        }
	    });
	},

	/**
	 * 更新分类，
	 * @params int pageId
	 * @params string title
	 * @params function callback(msg);
	 */
	updatePage: function(pageId,title,callback){
		$.ajax({
	        async:false,
	        type:'post',
	        url: this.ajaxUrl.update,
	        dataType:'json',
	        data:{'pageId':pageId,'title':title,'submitted':'submitted'},
	        success:function(msg){
	            callback(msg);
	        }
	    });
	},

}

/**
 * 检查现在有多少页
 */
page.prototype.checkPageNum = function() {
	var bool = false;
	$.ajax({
        async:false,
        type:'post',
        url: this.ajaxUrl.checkPageNum,
        dataType:'json',
        data:{'submitted':'submitted'},
        success:function(msg){
            if (msg.status==1) {
            	$('.lower_list').find('.last_li').show()
            	bool = true;
            }else{
            	$('.lower_list').find('.last_li').hide();
            	bool = false;
            }
        }
    });
    return bool;
};

page.prototype.test2 = function(){
	alert($('.pc_nomalwebsite').length);
}

/**
 * 获取有多少页
 */
page.prototype.getLength = function(){
	return $('.pc_nomalwebsite').length;
}

/**
 * 通过index，获取pageId
 */
page.prototype.getPageId = function(index) {
	return $('.pc_nomalwebsite:eq('+index+')').attr('alt');
};

/**
 * 切换显示
 * @param int direction 方向
 * @param int num 一次性滚动的页数
 */
page.prototype.scrollTo = function(dir,num){
	var parent = this;
	if (parent.isScrolling) {
		return false;
	}
	var scrollul = $('.pc_nomalwebsite');
	var s_width = parsePxToInt(scrollul.css('width'));
	var s_margin_right = parsePxToInt(scrollul.css('margin-right'));
	var s_margin_left = parsePxToInt(scrollul.css('margin-left'));
	var scrollWidth = s_width + s_margin_right+s_margin_left;
		// alert(scrollWidth);
	var element = $('#include_web');

	var oldLeft = scrollWidth*(-this.index);

	scrollWidth = scrollWidth*num;

	if (dir>0) {
		if (parent.index<=0) {return false;}
		newleft = oldLeft + scrollWidth-200;
		newleft = newleft + 'px';
		parent.isScrolling = true;
		element.animate({'left':newleft},300,function(){
			parent.isScrolling = false;
			parent.index -= num;
			parent.addLowerListOn();
		});
	}else{
		if (parent.index>=parent.getLength()-1) {return false;}
		newleft = oldLeft - scrollWidth-200;
		newleft = newleft + 'px';
		parent.isScrolling = true;
		element.animate({'left':newleft},300,function(){
			parent.isScrolling = false;
			parent.index += num;
			parent.addLowerListOn();
		});
	}
}

/**
 * 添加底部导航的hover事件
 */
page.prototype.addLowerListOn = function(){
	var lowerUl = $('.lower_list');
	var lowerLi = lowerUl.find('li:eq('+this.index+')');
	var lowerA = lowerLi.find('a');
	$('.lower_list').find('li').removeClass('li_onselect');
	lowerLi.addClass('li_onselect');
	// alert(lowerA.text());
}

/**
 *
 */
page.prototype.appendLowerList = function(title) {
	var lower_li = $('.lower_list').find('li:first').clone(true);
	var lower_a = lower_li.find('a');
	var lower_input = lower_li.find('input');
	lower_a.text(title);
	lower_input.val(title);
	$('.lower_list').find('li:last').before(lower_li);
	lower_a.hide();
	lower_input.show().focus();
}

/**
 * 移除当前页的lower_list 的 li
 */
page.prototype.removeLowerLi = function() {
	$('.lower_list').find('li:eq('+this.index+')').remove();
};

/**
 * 清空当前页的网址
 */
page.prototype.emptyPage = function(callback) {
	var pageId = this.getPageId(this.index);
	$.ajax({
        async:false,
        type:'post',
        url: this.ajaxUrl.emptyPage,
        dataType:'json',
        data:{'pageId':pageId, 'submitted':'submitted'},
        success:function(msg){
            callback(msg);
        }
    });
};