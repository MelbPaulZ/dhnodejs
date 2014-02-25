var source; //从哪一页开拖动，
var destin; //拖动到哪一页
var isScrolling = false; //是否正在滚动，用于同步

$(document).ready(function() {
	// sortWebsite();
	// var scollArea = document.getElementById('include_web');
	// addScrollListener(scollArea,wheelHandle);
	setIncludeWebWidth();
	// sideScroll();
});	//end of ready


/**
 * 动态设置include_web的宽度
 */
function setIncludeWebWidth(){
    var thea = $('.pc_nomalwebsite');
    var length = thea.length;
    var oldWidth = parsePxToInt(thea.css('width'));
    var marginRight = parsePxToInt(thea.css('margin-right'));
    var marginLeft = parsePxToInt(thea.css('margin-left'));
    var newWidth = (oldWidth+marginLeft+marginLeft)*parseInt(length);
    $('#include_web').css({width:newWidth+'px'});
}





/**
 * 
 */
function wheelHandle(event){
	// alert(1);
	scrollTo(getWheelData(event),1);
	// $('.search_input').val(22);
}




//把像素转化为数字
function parsePxToInt(px){
	var num = px.split('px');
	return parseInt(num[0]);
}

/**
 *获取包括padding_left,right,width的和
 *@param obj thea
 */
function getAllWidth(thea){
	var width,marginRight;
	width = parsePxToInt(thea.css('width'));
	marginRight = parsePxToInt(thea.css('margin-right'));
	marginLeft = parsePxToInt(thea.css('margin-left'));
	return (width+marginRight+marginLeft)*(thea.length-1);
}

/**
 * 拖动时移动到两边进行翻页切换
 *
 */
function sideScroll(){
	var allowScroll = true;
	var isDragging = false;

	var oldPage=1;
	var nowPage=1;

	$('.pc_nomalwebsite a').mousedown(function(){
		
		oldPage = $(this).parent('.pc_nomalwebsite').attr('alt');
		nowPage = oldPage;

		isDragging = true;

	}).mouseup(function(){
		// alert(12);
		isDragging = false;
	});

	$('.pc_nomalwebsite').mousemove(function(event){
		// var nowPage = $(this).index();
		// var len = $(this).children('a').length;
		var left = $(this).parent('#include_web').css('left');
		//这个是插件里面拖动的时候自动生成的一个节点，只在当前拖动的div存在
		var ph = $('[data-placeholder="true"]');
		var page = ph.parent('.pc_nomalwebsite').attr('alt');
		
		// $('.search_input').val(destPage);
		
	});

	$('#leftBar').mouseenter(function(){
		// scrollTo(1);
	});
	$('#rightBar').mouseenter(function(){
		// scrollTo(-1);
	});

	$('.pc_nomalwebsite a.siteSquare').mousemove(function(event){
		// alert(event.pageX);
		// return ;
		if (isDragging) {
			var draggingX = event.clientX-event.offsetX;
			var draggingY = event.clientY-event.offsetY;
			draggingX = parseInt(draggingX);
			if (draggingX<30) {//向左滑动
				setTimeout(function(){allowScroll=true;},800);
				if (allowScroll == true) {
					scrollTo(1);
					allowScroll = false;
				}
				if (nowPage>0) {
					nowPage--;
				}
				
			}

			if (draggingX>1111) {//向右滑动
				setTimeout(function(){allowScroll=true;},800);
				if (allowScroll == true) {
					scrollTo(-1);
					allowScroll = false;
				}
				if (nowPage<4) {
					nowPage++;
				};
			}
			
			if (oldPage != nowPage  ) {
				moveSiteWhenFull(oldPage, nowPage);
				oldPage = nowPage;
			}


		}//end of if isDragging
		
	});

	//当满了的时候，进行方块位置的调整
	var moveSiteWhenFull = function(sourcePage,destPage){
		isDragging = false;
		
		var dp = $('.pc_nomalwebsite[alt="'+destPage+'"]');
		var sp = $('.pc_nomalwebsite[alt="'+sourcePage+'"]');
		var pageNum = $('.pc_nomalwebsite').length;
		var dpIndex = parseInt(destPage);
		var spIndex = parseInt(sourcePage);
		var dpLen = dp.children('a.siteSquare').length;
		var spLen = sp.children('a.siteSquare').length;
		var dpson = dp.find('a.siteSquare');
		


		// 从前一页拖到后一页
		if (spIndex<dpIndex) {
			
			for (var i = spIndex; i < dpIndex; i++) {
				var pre = $('.pc_nomalwebsite[alt="'+i+'"]');
				var next = $('.pc_nomalwebsite[alt="'+(parseInt(i)+1)+'"]');
				var preLen = pre.find('a.siteSquare').length;
				var nextLen = next.find('a.siteSquare').length;
				
				if (dpLen>=8) {
					var temp = next.children('a.siteSquare:first');
					// $('.search_input').val();
					pre.find('a.pc_right_noweb').hide();
					next.find('a.pc_right_noweb').hide();
					pre.append(temp);
					// break;
				};
			}
			return;			
		}

		// // $('.search_input').val('s:'+spIndex+'/d:'+dpIndex+ '/len:'+ pre.children('a.siteSquare').length);

		// //从后一页拖到前一页
		if (spIndex>dpIndex) {
			for (var i = spIndex; i > dpIndex; i--) {
				var pre = $('.pc_nomalwebsite[alt="'+i+'"]');
				var next = $('.pc_nomalwebsite[alt="'+(parseInt(i)+1)+'"]');
				var preLen = pre.find('a.siteSquare').length;
				var nextLen = next.find('a.siteSquare').length;

				if (dpLen>=8) {
					pre.find('a.pc_right_noweb').hide();
					var temp = pre.children('a.siteSquare:last');
					next.prepend(temp);
				}

			}
			return;
		}//end of if

		
	}//end of function
}

