//自定义滚动条部分，转载自[ http://www.cnblogs.com/zjfree/ ]
//相比较原来版本上做出了一些兼容ff的修改
//对于原来滚动滑块的位置计算做出了调整，修复了原来存在的bug
//同时也修复了存在的一个无法捕获onmouseup事件的bug
// var scrollMoveObj = null, scrollPageY = 0, scrollY = 0;
// var scrollDivList = new Array();
// obj需要添加滚动条的对象 w滚动条宽度 className滚动条样式名称
// obj元素 必须指定高度，并设置overflow:hidden;
// 如要兼容IE6 必须给obj元素 指定 overflow:hidden; 
function jsScroll(obj, w, className)
{
    if(typeof(obj) == 'string')    {
        obj = document.getElementById(obj);
    }
    //当内容未超出现在高度时，不添加滚动条    
    if(!obj || obj.scrollHeight <= obj.clientHeight || obj.clientHeight == 0) {
        return;
    }
    obj.scrollBarWidth = w||6;
    obj.style.overflow = 'hidden';
    obj.scrollBar = document.createElement('div');
    obj.appendChild(obj.scrollBar);
    obj.scrollBarIndex = document.createElement('div');
    obj.scrollBar.appendChild(obj.scrollBarIndex);
    obj.scrollBar.style.position = 'absolute';
    obj.scrollBarIndex.style.position = 'absolute';
    obj.scrollBar.className = className || '';
    if(!className) {
        obj.scrollBar.style.backgroundColor = '#fff';
        
    }
    obj.scrollBarIndex.style.backgroundColor = '#ffa60c';
    
    scrollDivList.push(obj);
    scrollResetSize(obj);
    
    //使用鼠标滚轮滚动
    obj.scrollBar.scrollDiv = obj;
    obj.scrollBarIndex.scrollDiv = obj;
	if(obj.addEventListener) {
		obj.addEventListener("DOMMouseScroll", scrollMove, false);
		obj.scrollBar.addEventListener("DOMMouseScroll", scrollMove, false);
		obj.scrollBarIndex.addEventListener("DOMMouseScroll", scrollMove, false);
	}
	obj.onmousewheel = scrollMove;
	obj.scrollBar.onmousewheel = scrollMove;
	obj.scrollBarIndex.onmousewheel = scrollMove;
    
    //拖动滚动条滚动
    obj.scrollBarIndex.onmousedown = function(evt){
        evt = evt || event;
        scrollPageY = evt.clientY;
        scrollY = this.scrollDiv.scrollTop;
        isScrollMove = true;
        document.body.onselectstart = function(){return false};
        scrollMoveObj = this.scrollDiv;
        if(this.scrollDiv.scrollBar.className == '') {
            this.scrollDiv.scrollBarIndex.style.backgroundColor = '#888';
        }
        return false;
    }
}

//当页面大小发生变化时，重新计算滚动条位置
window.onresize = function(){
    for(var i=0; i<scrollDivList.length; i++) {
        scrollResetSize(scrollDivList[i]);
    }
	document.getElementById("includeall").style.width = document.documentElement.clientWidth + "px";
}

//计算滚动条位置
function scrollResetSize(o) {
    if(o.scrollHeight <= o.clientHeight) {
        o.scrollTop = 0;
        o.scrollBar.style.display = 'none';
    } else {
        o.scrollBar.style.display = 'block';
    }
    var x=0, y=0;
    var p = o;
//    while(p) {
//        x += p.offsetLeft;
//        y += p.offsetTop;
//        p = p.offsetParent;
//    }
	var borderTop = parseInt(o.style.borderTopWidth||0);
    var borderBottom = parseInt(o.style.borderBottomWidth||0);
    o.scrollBar.style.width = o.scrollBarWidth + 'px';
    o.scrollBar.style.height = o.clientHeight + o.scrollTop + 'px';
    o.scrollBar.style.top = y + borderTop + 'px';
    o.scrollBar.style.left = x + o.offsetWidth - o.scrollBarWidth + 'px';
    o.scrollBarIndex.style.width = o.scrollBarWidth + 'px';
    var h = o.clientHeight - (o.scrollHeight - o.clientHeight);
    //当滚动条滑块最小20个像素
    if(h < 20) {
        h = 20;
    }
    o.scrollBarHeight = h;
    o.scrollBarIndex.style.height = h + 'px';
    o.scrollBarIndex.style.left = '0px';
    setScrollPosition(o);
}

function setScrollPosition(o) {
    o.scrollBarIndex.style.top = o.scrollTop + (o.clientHeight - o.scrollBarHeight) * o.scrollTop / (o.scrollHeight - o.clientHeight) + 'px';
}

document.documentElement.onmousemove = function(evt){
    if(!scrollMoveObj)return;
	if(scrollMoveObj.setCapture) {
		scrollMoveObj.setCapture();
	}
    evt = evt || event;
    var per = (scrollMoveObj.scrollHeight - scrollMoveObj.clientHeight) / (scrollMoveObj.clientHeight - scrollMoveObj.scrollBarHeight)
    scrollMoveObj.scrollTop = scrollY - (scrollPageY - evt.clientY) * per;
    setScrollPosition(scrollMoveObj);
}
document.documentElement.onmouseup = function(evt){
    if(!scrollMoveObj)return;
	if(scrollMoveObj.releaseCapture) {
		scrollMoveObj.releaseCapture();
	}
    if(scrollMoveObj.scrollBar.className == '') {
        scrollMoveObj.scrollBarIndex.style.backgroundColor = '#aaa';
    }
    scrollMoveObj = null;
    document.body.onselectstart = function(){return true};
}
//document.documentElement.onclick = function(evt) {
//    if(!scrollMoveObj)return;
//    if(scrollMoveObj.scrollBar.className == '') {
//        scrollMoveObj.scrollBarIndex.style.backgroundColor = '#aaa';
//    }
//    scrollMoveObj = null;
//    document.body.onselectstart = function(){return true};
//}

// 鼠标滚轮滚动
function scrollMove(evt){
    var div = this.scrollDiv || this;
    if(div.scrollHeight <= div.clientHeight) return true;
    evt = evt || event;
    var step = 20;
	var detail = evt.wheelDelta || -(evt.detail);
    if(detail < 0) {
        if(div.scrollTop >= (div.scrollHeight - div.clientHeight)) return true;
        div.scrollTop += step;
    } else {
        if(div.scrollTop == 0) return true;
        div.scrollTop -= step;
    }
    setScrollPosition(div);
    
    return false;
}
function removeScrollBar() {
            scrollDivList[0].scrollBar.parentNode.removeChild(scrollDivList[0].scrollBar);
            scrollDivList.pop();
            alert(scrollDivList.length);
        }