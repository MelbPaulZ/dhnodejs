// JavaScript Document
var Setter = {
	node:null,
	type:0,
	href:"",
	webname:"",
	doaddWebsite:function() {
		if(this.type == 1) {
			this.forpc_right_noweb();
		}
		else if(this.type == 2) {
			this.forpc_right_aset();
		}
		else if(this.type == 3) {
			this.forpc_site_back();
		}
		else if(this.type == 4) {
			this.forpc_site_web1();
		}
		else return;
		closecover();
	},
	forpc_right_noweb:function() {
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");
		var span3 = document.createElement("span");
		var span4 = document.createElement("span");
		var div1 = document.createElement("div");
		var div2 = document.createElement("div");
		var classname = this.node.className;
		span1.className = "pc_right_span1";
		span2.className = "pc_right_span2";
		span2.innerHTML = this.webname;
		span3.className = "pc_right_aset";
		span3.innerHTML = "设置";
		span4.className = "pc_right_adel";
		span4.innerHTML = "删除";
		div1.className = "pc_right_div1";
		div2.className = "pc_right_div2";
		this.node.appendChild(span1);
		this.node.appendChild(div1);
		this.node.appendChild(div2);
		this.node.appendChild(span2);
		div2.appendChild(span3);
		div2.appendChild(span4);
		this.node.setAttribute("href", this.href);
		this.node.className = classname.replace("pc_right_noweb", "");
		this.node.onclick = function() {
			return true;
		}
		addrightwebevent(this.node);
	},
	forpc_right_aset:function() {
		var span = this.node.parentNode.nextSibling;
		if(span.nodeType != 1) {
			span = span.nextSibling;
		}
		var a = span.parentNode;
		span.innerHTML = this.webname;
		a.setAttribute("href", this.href);
	},
	forpc_site_back:function() {
		var ul = document.getElementById("pc_cwebsite_ul");
		var li = document.createElement("li")
		var a1 = document.createElement("a");
		var a2 = document.createElement("a");
		var a3 = document.createElement("a");
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");
		li.className = "pc_cwebsite_web cl1";
		a1.className = "pc_cwebsite_web1";
		a1.innerHTML = "设置";
		a1.setAttribute("href", "#");
		a1.onclick = function() {
			collect_set(this);
			return false;
		}
		a2.className = "pc_cwebsite_web2"
		a2.innerHTML = "删除";
		a2.setAttribute("href", "#");
		a2.onclick = function() {
			collect_delete(this);
			return false;
		}
		a3.className = "pc_web3_div1";
		a3.setAttribute("href", this.href);
		span1.innerHTML = this.webname;
		span1.className = "pc_web3_span1";
		span2.innerHTML = this.href;
		span2.className = "pc_web3_span2";
		a3.appendChild(span1);
		a3.appendChild(span2);
		li.appendChild(a1);
		li.appendChild(a2);
		li.appendChild(a3);
		ul.appendChild(li);
	},
	forpc_site_web1:function() {
		var span = this.node.parentNode.getElementsByTagName("span");
		span[0].parentNode.setAttribute("href", this.href);
		span[0].innerHTML = this.webname;
		span[1].innerHTML = this.href;
	}
}
//自定义滚动条部分，转载自[ http://www.cnblogs.com/zjfree/ ]
//相比较原来版本上做出了一些兼容ff的修改
//对于原来滚动滑块的位置计算做出了调整，修复了原来存在的bug
//同时也修复了存在的一个无法捕获onmouseup事件的bug
var scrollMoveObj = null, scrollPageY = 0, scrollY = 0;
var scrollDivList = new Array();
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
        obj.scrollBarIndex.style.backgroundColor = '#aaa';
    }
    
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
//滚动条部分结束
//网址库里面的nTab切换变量
var nTabs_webbase = new Object();
nTabs_webbase.divonshow = null;
var webbase_right = new Array();
var A_spanobj = function(a, msg) {
	this.a = a;
	this.href = a.getAttribute("href");
	this.msg = msg;
}
A_spanobj.prototype.copyNode = function() {
	var div = document.getElementById("search_board");
	var a = this.a.cloneNode(true);
	div.appendChild(a);
}
//个人中心的div滚动
var changeObj = new Object();
changeObj.moveList = new Array();
changeObj.onmove = null;
changeObj.divondisplay = null;
window.onload = function() {
	document.getElementById("includeall").style.width = document.documentElement.clientWidth + "px";
	//个人中心的事件函数添加
	//左侧弹出功能窗口的事件函数添加
//	document.getElementById("pc_left_showbtn").onclick = function() {
//		show_pcapp(this);
//		return false;
//	}
//	document.getElementById("pc_left_hidebtn").onclick = function() {
//		hide_pcapp(this);
//		return false;
//	}
	//右侧常用标签div的事件函数添加
	var websitedivlist = document.getElementById("pc_nomalwebsite").getElementsByTagName("a");
	var wlength = websitedivlist.length;
	for(var i=0; i<wlength; i++) {
		if(websitedivlist[i].parentNode.className != "page_divide") {
			addrightwebevent(websitedivlist[i]);
		}
	}
	//右侧网址收藏与常用标签的切换
//	var pc_right_alist = document.getElementById("divide_class_a").getElementsByTagName("a");
//	pc_right_alist[0].onclick = function() {
//		pc_right_tab(this, pc_right_alist[1], "pc_nomalwebsite", "pc_collectwebsite");
//		return false;
//	};
//	pc_right_alist[1].onclick = function() {
//		pc_right_tab(this, pc_right_alist[0], "pc_collectwebsite", "pc_nomalwebsite");
//		return false;
//	}
	document.getElementById("coverdiv").onclick = function() {
		closecover();
	}
	//网址库事件初始化
	var webBase = document.getElementById("addweb_right").getElementsByTagName("a");
	var webBase_length = webBase.length;
	for(var i=0; i<webBase_length; i++) {
		webBase[i].onclick = function() {
			addwebSite(this);
			return false;
		}
		var span = webBase[i].getElementsByTagName("span")[1];
		var a_spanobj = new A_spanobj(webBase[i], span.innerHTML);
		webbase_right.push(a_spanobj);
	}
	document.getElementById("addweb_addbtn").onclick = function() {
		addsearchweb();
		return false;
	}
	//网址收藏事件添加
//	document.getElementById("pc_cwebsite_back").onclick = function() {
//		addcollect(this);
//		return false;
//	}
//	var ul_a = document.getElementById("pc_cwebsite_ul").getElementsByTagName("a");
//	var ul_alength = ul_a.length;
//	for(var i=0; i<ul_alength; i++) {
//		var ulaclassname = ul_a[i].className;
//		if(ulaclassname == "pc_cwebsite_web1") {
//			ul_a[i].onclick = function() {
//				collect_set(this);
//				return false;
//			}
//		}
//		else if(ulaclassname == "pc_cwebsite_web2") {
//				ul_a[i].onclick = function() {
//				collect_delete(this);
//				return false;
//			}
//		}
//	}
	var base_alist = document.getElementById("addweb_ntab").getElementsByTagName("a");
	var base_divlist = document.getElementById("addweb_right").getElementsByTagName("div");
	nTabs_webbase.web_base = new Array();
	for(var i=0; i<7; i++) {
		nTabs_webbase.web_base[i] = new Object();
		nTabs_webbase.web_base[i].a = base_alist[i];
		nTabs_webbase.web_base[i].div = base_divlist[i];
		nTabs_webbase.web_base[i].index = i;
		nTabs_webbase.web_base[i].a.ownpointer = nTabs_webbase.web_base[i];
		base_alist[i].onclick = function() {
			nTabs_webbase.display_div(this);
			return false;
		}
	}
	nTabs_webbase.web_base[0].div.style.display = "block";
	nTabs_webbase.divonshow = nTabs_webbase.web_base[0];
	nTabs_webbase.searchdiv = base_divlist[7];
	document.getElementById("search_btn").onclick = function() {
		showSearchresult();
		return false;
	}
	//添加事件给滚动的div
	var webdiv = document.getElementById("pc_nomalwebsite");
	var webdiv_arr = new Array();
	var page_da = document.getElementById("page_divide").getElementsByTagName("a");
	changeObj.divondisplay = webdiv;	
	webdiv.style.left = 0;
	webdiv_arr.push(webdiv);
	while(webdiv.nextSibling) {
		var n = webdiv.nextSibling;
		if(webdiv.nextSibling.className != "page_divide") {
			webdiv_arr.push(n);
		}
		webdiv = n;
	}
	for(var i=0; i<webdiv_arr.length; i++) {
		if((i-1)>=0 && (i+1)<webdiv_arr.length) {
			changeObj.moveList.push(new moveObj(page_da[i], webdiv_arr[i], webdiv_arr[i+1], webdiv_arr[i-1]));
		}
		else if((i-1)<0) {
			changeObj.moveList.push(new moveObj(page_da[i], webdiv_arr[i], webdiv_arr[i+1], null));
		}
		else {
			changeObj.moveList.push(new moveObj(page_da[i], webdiv_arr[i], null,  webdiv_arr[i-1]));
		}
		page_da[i].onclick = function() {
			changeObj.move(this, "click");
			return false;
		}
	}
	document.body.onmousewheel = function() {
		var e = arguments[0] || window.event;
		if(e.wheelDelta > 0) {
			changeObj.move("last", "scroll");
		}
		else {
			changeObj.move("next", "scroll");
		}
	}
	document.body.addEventListener("DOMMouseScroll", function() {
		var e = arguments[0] || window.event;
		if(e.wheelDelta < 0) {
			changeObj.move("last", "scroll");
		}
		else {
			changeObj.move("next", "scroll");
		}
	}, false); 
}

nTabs_webbase.display_div = function(thea) {
	if(this.divonshow == thea.ownpointer) {return;}
	if(this.searchdiv.style.display == "block") {
		this.searchdiv.style.display = "none";
	}
	var nowebdiv =  document.getElementById("addweb_alertdiv");
	if(nowebdiv.style.display == "block") {
		nowebdiv.style.display = "none";
	}
	var index = thea.ownpointer.index;
	this.web_base[index].a.className = "addweb_ntbchosen";
	this.web_base[index].div.style.display = "block";
	if(this.divonshow != null) {
		this.divonshow.a.className = "";
		this.divonshow.div.style.display = "none";
	}
	this.divonshow = thea.ownpointer;
	var slen = scrollDivList.length;
    for(var i=0; i<slen; i++) {
		if(!scrollDivList[i]) break;
		if(scrollDivList[i].id == "addweb_right") {
			scrollDivList[i].removeChild(scrollDivList[i].scrollBar);
			scrollDivList.splice(i,1);
		}
    }
	var dddiv = document.getElementById("addweb_right");
	jsScroll(dddiv,8);
    for(var i=0; i<scrollDivList.length; i++) {
		if(scrollDivList[i].id == "addweb_right") {
			scrollDivList[i].scrollTop = "0";
			scrollResetSize(scrollDivList[i]);
		}
    }
}
function show_pcapp(thea) {
	var contentdiv = document.getElementById("pc_left_content");
	var outerdiv = contentdiv.parentNode;
	var outerleft = outerdiv.style.left || "-806px";
	var width = parseInt(outerleft);
	width = Math.floor((0 - width) / 10);
	outerleft = parseInt(outerleft);
	if(outerleft < 0) {
		setTimeout(function() {
			if(width < 1) {
				width = 2;
			}
			if(outerleft + width >0) {
				outerdiv.style.left = "0";
			}
			else {
				outerdiv.style.left = outerleft + width + "px";
			}
			show_pcapp(thea);
		},5);
	}
	else if(outerleft == 0) {
		var hide_btn = document.getElementById("pc_left_hidebtn");
		thea.parentNode.style.display = "none";
		hide_btn.parentNode.parentNode.style.display = "block";
		outerdiv.style.width = "857px";
	}
}
function hide_pcapp(thea) {
	var contentdiv = document.getElementById("pc_left_content");
	var outerdiv = contentdiv.parentNode;
	var outerleft = outerdiv.style.left || "0";
	var width = parseInt(outerleft.replace("-", ""));
	width = Math.floor((806 - width) / 10);
	outerleft = parseInt(outerleft);
	if(outerleft > -806) {
		setTimeout(function() {
			if(width < 1) {
				width = 2;
			}
			if(outerleft - width < -806) {
				outerdiv.style.left = "-806px";
			}
			else {
				outerdiv.style.left = outerleft - width + "px";
			}
			hide_pcapp(thea);
		},5);
	}
	else if(outerleft == -806) {
		var show_btn = document.getElementById("pc_left_showbtn");
		thea.parentNode.parentNode.style.display = "none";
		show_btn.parentNode.style.display = "block";
		outerdiv.style.width = "872px";
	}
}
function showacontent(thea) {
	var web_span1 = thea.getElementsByTagName("span")[3];
	var web_div1 = thea.getElementsByTagName("div")[1];
	web_span1.style.display = "block";
	web_div1.style.display = "block";
}
function hideacontent(thea) {
	var web_span1 = thea.getElementsByTagName("span")[3];
	var web_div1 = thea.getElementsByTagName("div")[1];
	web_span1.style.display = "none";
	web_div1.style.display = "none";
}
function pc_right_tab(thea, othera, id1, id2) {
	if(thea.parentNode.className == "divide_class_a") {
		return;
	}
	thea.parentNode.className = "divide_class_a";
	othera.parentNode.className = "";
	document.getElementById(id2).style.display = "none";
	document.getElementById(id1).style.display = "block";
	if(id1 == "pc_collectwebsite") {
		var slen = scrollDivList.length;
		if(slen == 0) {
			jsScroll(document.getElementById("pc_collectwebsite1"), 8);
			return;
		}
		for(var i=0; i<slen; i++) {
			if(scrollDivList[i].id != "pc_collectwebsite1" && i == (slen-1)) {
				jsScroll(document.getElementById("pc_collectwebsite1"), 8);
				return;
			}
		}
	}
}
/**
 *方块添加弹出框事件
 */
function addrightwebevent(thea) {
	if(thea.className == "pc_right_noweb") {
		thea.onclick = function() {
			Setter.type = 1;
			Setter.node = this;
			var e = arguments[0] || window.event;
			//popupdiv_setting(this, e);
			return false;
		}
	}
	else {
		var span = thea.getElementsByTagName("span");
		span[1].onclick = function() {
			Setter.type = 2;
			Setter.node = this;
			var e = arguments[0] || window.event;
			//popupdiv_setting(this, e);
			return false;
		};
		span[2].onclick = function() {
			popupdiv_delete(thea);
		}
		thea.onmouseover = function() {
			showacontent(this);
		}
		thea.onmouseout = function() {
			hideacontent(this);
		}
	}
}
function showcover() {
//	alert("chuandongsb");
	var thediv = document.getElementById("coverdiv");
	thediv.style.width = document.documentElement.clientWidth + "px";
	thediv.style.height = document.documentElement.clientHeight + "px";
	thediv.style.display = "block";
}
function closecover() {
	document.getElementById("addwebsite_div").style.display = "none";
	document.getElementById("coverdiv").style.display = "none";
}
function popupdiv_setting(thea, e) {
	if(window.event) {
		if(e.srcElement.tagName != thea.nodeName) {
			return;
		}
	}
	else if(e) {
		if(e.target.tagName != thea.nodeName) {
			return;
		}
	}
	showcover();
	document.getElementById("addwebsite_div").style.display = "block";
	if(scrollDivList.length == 0) {
		var dddiv = document.getElementById("addweb_right");
		jsScroll(dddiv,8);
	}
	else {
		var slen = scrollDivList.length;
		for(var i=0; i<slen; i++) {
			if(scrollDivList[i].id != "addweb_right" && i == slen-1) {
				jsScroll(document.getElementById("addweb_right"), 8);
			}
		}
	}
}
function popupdiv_delete(thea) {
	thea.onmouseover = null;
	thea.onmouseout = null;
	thea.innerHTML = "";
	var classname = "pc_right_noweb";
	thea.className = classname;
	addrightwebevent(thea);
}


/**
 *在index.html里面重写了
 */
// function addwebSite(thea) {
// 	var href = thea.getAttribute("href");
// 	var span = thea.getElementsByTagName("span");
// 	var webname = span[1].innerHTML;
// 	Setter.href = href;
// 	Setter.webname = webname;
// 	Setter.doaddWebsite();
// }
function addcollect(thea) {
	showcover();
	document.getElementById("addwebsite_div").style.display = "block";
	Setter.node = thea;
	Setter.type = 3;
	if(scrollDivList.length == 0) {
		var dddiv = document.getElementById("addweb_right");
		jsScroll(dddiv,8);
	}
	else {
		var slen = scrollDivList.length;
		for(var i=0; i<slen; i++) {
			if(scrollDivList[i].id != "addweb_right" && i == slen-1) {
				jsScroll(document.getElementById("addweb_right"), 8);
			}
		}
	}
}
function collect_delete(thea) {
	parentNode = thea.parentNode;
	parentNode.parentNode.removeChild(parentNode);
    for(var i=0; i<scrollDivList.length; i++) {
        scrollResetSize(scrollDivList[i]);
    }
}
function collect_set(thea) {
	showcover();
	document.getElementById("addwebsite_div").style.display = "block";
	Setter.node = thea;
	Setter.type = 4;
	if(scrollDivList.length == 0) {
		var dddiv = document.getElementById("addweb_right");
		jsScroll(dddiv,8);
	}
	else {
		var slen = scrollDivList.length;
		for(var i=0; i<slen; i++) {
			if(scrollDivList[i].id != "addweb_right" && i == slen-1) {
				jsScroll(document.getElementById("addweb_right"), 8);
			}
		}
	}
}
function showSearchresult() {
	var value = document.getElementById("search_input").value;
	if(value == "") {
		return;
	}
	var pattern = new RegExp(value, "g");
	var arraylen = webbase_right.length;
	if(nTabs_webbase.divonshow != null) {
		nTabs_webbase.divonshow.a.className = "";
		nTabs_webbase.divonshow.div.style.display = "none";
		nTabs_webbase.divonshow = null;
	}
	nTabs_webbase.searchdiv.innerHTML = "";
	nTabs_webbase.searchdiv.style.display = "block";
	for(var i=0; i<arraylen; i++) {
		if(!pattern.test(webbase_right[i].href) && !pattern.test(webbase_right[i].msg)) {
			continue;
		}
		webbase_right[i].copyNode();
	}
	var slen = scrollDivList.length;
    for(var i=0; i<slen; i++) {
		if(!scrollDivList[i]) break;
		if(scrollDivList[i].id == "addweb_right") {
			scrollDivList[i].removeChild(scrollDivList[i].scrollBar);
			scrollDivList.splice(i,1);
		}
    }
	var dddiv = document.getElementById("addweb_right");
	jsScroll(dddiv,8);
    for(var i=0; i<scrollDivList.length; i++) {
		if(scrollDivList[i].id == "addweb_right") {
			scrollDivList[i].scrollTop = "0";
			scrollResetSize(scrollDivList[i]);
		}
    }
	var elelen = nTabs_webbase.searchdiv.getElementsByTagName("a").length;
	if(elelen == 0) {
		document.getElementById("addweb_alertdiv").style.display = "block";
	}
}
function addsearchweb() {
	document.getElementById("addweb_alertdiv").style.display = "none";
}
var moveObj = function(a, div, next, last) {
	this.a = a;
	this.div = div;
	this.next = next;
	this.last = last;
}
changeObj.move = function(thea, type) {
	if(changeObj.onmove != null) {
		return;
	}
	var mDiv;
	var thediv;
	for(var i=0; i<changeObj.moveList.length; i++) {
		if(changeObj.divondisplay == changeObj.moveList[i].div) {
			thediv = i;
		}
		if(thea == changeObj.moveList[i].a) {
			mDiv = i;
		}
	}
	if(mDiv == thediv) {
		return;
	}
	if(type == "scroll") {
		if(thea == "last") {
			changeObj.tolasts();
		}
		else if(thea == "next") {
			changeObj.tonexts();
		}
	}
	else if(type == "click") {
		if(thediv>mDiv) {
			changeObj.tolast(thediv, mDiv);
		}
		else if(thediv<mDiv) {
			changeObj.tonext(thediv, mDiv);
		}
	}
}
changeObj.tolast = function(thediv, lastdiv) {
	var tdiv = changeObj.moveList[thediv].div;
	var ldiv = changeObj.moveList[lastdiv].div;
	if(ldiv.style.display == "none") {
		ldiv.style.display = "block";
		ldiv.style.left = "-" + ldiv.offsetWidth + "px";
	}
	var left = -(parseInt(ldiv.style.left));
	var movelen = Math.floor(left/2);
	if(left-movelen<20) {
		movelen = 1;
	}
	ldiv.style.left = "-" + (left - movelen) + "px";
	tdiv.style.left = parseInt(tdiv.style.left) + movelen + "px";
	if(parseInt(ldiv.style.left) < 0) {
		changeObj.onmove = setTimeout(function() {
			changeObj.tolast(thediv, lastdiv);
		},20);
	}
	else {
		tdiv.style.display = "none";
		changeObj.divondisplay = ldiv;
		changeObj.onmove = null;
	}
}
changeObj.tonext = function(thediv, nextdiv) {
	var tdiv = changeObj.moveList[thediv].div;
	var ndiv = changeObj.moveList[nextdiv].div;
	if(ndiv.style.display == "none") {
		ndiv.style.display = "block";
		ndiv.style.left = ndiv.offsetWidth + "px";
	}	
	var left = parseInt(ndiv.style.left);
	var movelen = Math.floor(left/2);
	if(left-movelen<20) {
		movelen = 1;
	}
	ndiv.style.left = left - movelen + "px";
	tdiv.style.left = parseInt(tdiv.style.left) - movelen + "px";
	if(parseInt(ndiv.style.left) > 0) {
		changeObj.onmove = setTimeout(function() {
			changeObj.tonext(thediv, nextdiv);
		},20);
	}
	else {
		tdiv.style.display = "none";
		changeObj.divondisplay = ndiv;
		changeObj.onmove = null;
	}
}
changeObj.tolasts = function() {
	var tdiv = changeObj.divondisplay;
	var ldiv;
	for(var i=0; i<changeObj.moveList.length; i++) {
		if(changeObj.moveList[i].div == tdiv) {
			ldiv = changeObj.moveList[i].last;
			break;
		}
	}
	if(ldiv == null) {
		return;
	}
	if(ldiv.style.display == "none") {
		ldiv.style.display = "block";
		ldiv.style.left = "-" + ldiv.offsetWidth + "px";
	}
	var left = -(parseInt(ldiv.style.left));
	var movelen = Math.floor(left/2);
	if(left-movelen<20) {
		movelen = 1;
	}
	ldiv.style.left = "-" + (left - movelen) + "px";
	tdiv.style.left = parseInt(tdiv.style.left) + movelen + "px";
	if(parseInt(ldiv.style.left) < 0) {
		changeObj.onmove = setTimeout(function() {
			changeObj.tolasts();
		},20);
	}
	else {
		tdiv.style.display = "none";
		changeObj.divondisplay = ldiv;
		changeObj.onmove = null;
	}
}
changeObj.tonexts = function() {
	var tdiv = changeObj.divondisplay;
	var ndiv;
	for(var i=0; i<changeObj.moveList.length; i++) {
		if(changeObj.moveList[i].div == tdiv) {
			ndiv = changeObj.moveList[i].next;
			break;
		}
	}
	if(ndiv == null) {
		return;
	}
	if(ndiv.style.display == "none") {
		ndiv.style.display = "block";
		ndiv.style.left = ndiv.offsetWidth + "px";
	}	
	var left = parseInt(ndiv.style.left);
	var movelen = Math.floor(left/2);
	if(left-movelen<20) {
		movelen = 1;
	}
	ndiv.style.left = left - movelen + "px";
	tdiv.style.left = parseInt(tdiv.style.left) - movelen + "px";
	if(parseInt(ndiv.style.left) > 0) {
		changeObj.onmove = setTimeout(function() {
			changeObj.tonexts();
		},20);
	}
	else {
		tdiv.style.display = "none";
		changeObj.divondisplay = ndiv;
		changeObj.onmove = null;
	}
}