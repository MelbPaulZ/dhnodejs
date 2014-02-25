// JavaScript Document
var textscroll = new Object();
var dividescroll = new Object();
var divright = null;
var divleft = null;
window.onresize = function() {
	document.getElementById("includeall").style.width = document.documentElement.clientWidth + "px";
}
window.onload = function() {
	document.getElementById("includeall").style.width = document.documentElement.clientWidth + "px";
	//广外导航首页的事件函数添加
	//为切换分类添加事件函数
	dividescroll["firstchange"] = new Divmove("firstchange", 184);
	dividescroll["secondchange"] = new Divmove("secondchange", 149);
	dividescroll["thirdchange"] = new Divmove("thirdchange", 150);
	document.getElementById("firstchange").onclick = function() {
		firstClass(this);
		return false;
	};
	document.getElementById("secondchange").onclick = function() {
		secondClass(this);
		return false;
	};
	document.getElementById("thirdchange").onclick = function() {
		thirdClass(this);
		return false;
	};
	document.getElementById("firstchange").style.width = "184px";
	//上一页和下一页事件函数添加
	var a_list = document.getElementsByTagName("a");
	var a_classname;
	var websitediv;
	var websitedivname;
	var alist_length = a_list.length;
	for(var i=0; i < alist_length; i++) {
		a_classname = a_list[i].className;
		if(a_classname == "lastpage_btn") {
			websitediv = a_list[i].parentNode.parentNode.getElementsByTagName("div")[0];
			websitediv.style.top = "0";
			websitedivname = websitediv.parentNode.className;
			if(websitedivname.length > 12) {
					a_list[i].onclick = function() {						
						toLastPage(this, this.parentNode.parentNode.getElementsByTagName("div")[0], 75, 0, 75);
						return false;
				}
			}
			else {
					a_list[i].onclick = function() {
						toLastPage(this, this.parentNode.parentNode.getElementsByTagName("div")[0], 50, 0, 50);
						return false;
				}
			}
		}
		else if(a_classname == "nextpage_btn") {
			websitediv = a_list[i].parentNode.parentNode.getElementsByTagName("div")[0];
			websitediv.style.top = "0";
			websitedivname = websitediv.parentNode.className;
			if(websitedivname.length > 12) {
					a_list[i].onclick = function() {
						toNextPage(this, this.parentNode.parentNode.getElementsByTagName("div")[0], 75, 0, 75);
						return false;
				}
			}
			else {
					a_list[i].onclick = function() {
						toNextPage(this, this.parentNode.parentNode.getElementsByTagName("div")[0], 50, 0, 50);
						return false;
				}
			}
		}
	}
	//为最热最火网站添加hover事件
	var hotdiv = document.getElementById("sidebar_hot");
	hotdiv.onmouseover = function() {
		addborder(this);
	}
	hotdiv.onmouseout = function() {
		cutborder(this);
	}
	//连接的文字溢出事件
	var content_maindiv = document.getElementById("content_main");
	var aincon = content_maindiv.getElementsByTagName("a");
	var aincon_length = aincon.length;
	for(var i=0; i < aincon_length; i++) {
		if(aincon[i].parentNode.nodeName == "LI") {
			aincon[i].parentNode.style.position = "relative";
			aincon[i].style.position = "absolute";
			aincon[i].style.left = "0";
			aincon[i].id = "a" + i;
			textscroll["a"+i] = new Textmove("a"+i);
			aincon[i].onmouseover = function() {
				textscroll[this.id].moveleft();
			}
			aincon[i].onmouseout = function() {
				textscroll[this.id].moveright();
			}
		}
	}
	//提交建议框的滑动
	var movediv1 = document.getElementById("movediv1");
	document.getElementById("movediv2").style.left = "0";
	movediv1.onmouseover = movedivf1;
	movediv1.onmouseout = movedivf2;
	//为社团添加弹出菜单
	addpopupdivf(document.getElementById("partyclass"));
	addpopupdivf(document.getElementById("workclass"));
	addpopupdivf(document.getElementById("unionclass"));
	addpopupdivf(document.getElementById("specialclass"));
	document.body.onclick = function() {
		var e = window.event || arguments[0];
		hidepopupdiv1(e);
		if(document.getElementById("loginbtn")) {
			hidepopupdiv2(e);
		}
	}
	if(document.getElementById("loginbtn")) {
		
		document.getElementById("loginbtn").onclick = function() {
			showlogindiv();
			return false;
		}
	}
}
function toLastPage(thea, thediv, movepx, havemove, needpx) {
	var divposition = thediv.style.top;
	var move;
	var posrest;
	divposition = parseInt(divposition);
	if(divposition + needpx >= needpx) {
		thediv.style.top = "0";
		return;
	}
	if(havemove >= needpx) {
		return;
	}
	divposition = -divposition;
	move = Math.floor(movepx / 2);
	posrest = divposition % needpx;
	//alert(posrest + "," + move);
	if(posrest + move <= needpx) {
		if(move > 1) {
			thediv.style.top = (-(divposition - move)) + "px";
			havemove = havemove + move;
		}
		else {
			thediv.style.top = (-(divposition - 1)) + "px";
			havemove = havemove + 1;
		}
	}
	setTimeout(function() {
		toLastPage(thea, thediv, move, havemove, needpx);
	},20);
}
function toNextPage(thea, thediv, movepx, havemove, needpx) {
	var divposition = thediv.style.top;
	var move;
	var posrest;
	var maxposition;
	var divheight = parseInt(thediv.offsetHeight);
	divposition = divposition.replace("-", "");
	divposition = parseInt(divposition);
	if(divheight % needpx >= 0) {
		maxposition = Math.ceil(divheight / needpx) *needpx;
	}
	if(maxposition == (divposition + needpx)) {
		return;
	}
	if(havemove >= needpx) {
		return;
	}
	move = Math.floor(movepx / 2);
	posrest = divposition % needpx;
	if(posrest + move <= needpx) {
		if(move > 1) {
			thediv.style.top = (-divposition) - move + "px";
			havemove = havemove + move;
		}
		else {
			thediv.style.top = (-divposition) - 1 + "px";
			havemove = havemove + 1;
		}
	}
	setTimeout(function() {
		toNextPage(thea, thediv, move, havemove, needpx);
	},20);
}
function takeSibling(thenode) {
	if(thenode.nextSibling.nodeType == 1) {
		return thenode.nextSibling;
	}
	if(thenode.nextSibling.nextSibling.nodeType == 1) {
		return thenode.nextSibling.nextSibling;
	}
}
function firstClass(thea) {
	if(thea.className == "content_entertain1") {
		thea.className = "content_entertain2";
		dividescroll[thea.id].show();
		var second = document.getElementById("secondchange");
		var third = document.getElementById("thirdchange");
		document.getElementById("learnclass").style.display = "block";
		document.getElementById("lifeclass").style.display = "block";
		document.getElementById("entertainclass").style.display = "block";
		if(second.className == "content_stuunion2") {
			//dividescroll[second.id].hide();
			document.getElementById("partyclass").style.display = "none";
			document.getElementById("workclass").style.display = "none";
			document.getElementById("unionclass").style.display = "none";
			document.getElementById("specialclass").style.display = "none";
			var thediv = document.getElementById("partyclass1");
				addposclass(thediv);
		}
		if(third.className == "content_flag2") {
			//dividescroll[third.id].hide();
			document.getElementById("educlass").style.display = "none";
			document.getElementById("searchclass").style.display = "none";
			document.getElementById("shitclass").style.display = "none";
			var thediv = document.getElementById("educlass1");
				addposclass(thediv);
		}
		document.getElementById("footer").className = "footer";
	}
}
function secondClass(thea) {
	if(thea.className == "content_stuunion1") {
		thea.className = "content_stuunion2";
		dividescroll[thea.id].show();
		var first = document.getElementById("firstchange");
		var third = document.getElementById("thirdchange");
		document.getElementById("partyclass").style.display = "block";
		document.getElementById("workclass").style.display = "block";
		document.getElementById("unionclass").style.display = "block";
		document.getElementById("specialclass").style.display = "block";
		if(first.className == "content_entertain2") {
			//dividescroll[first.id].hide();
			document.getElementById("learnclass").style.display = "none";
			document.getElementById("lifeclass").style.display = "none";
			document.getElementById("entertainclass").style.display = "none";
			var thediv = document.getElementById("learnclass1");
				addposclass(thediv);
		}
		if(third.className == "content_flag2") {
			//dividescroll[third.id].hide();
			document.getElementById("educlass").style.display = "none";
			document.getElementById("searchclass").style.display = "none";
			document.getElementById("shitclass").style.display = "none";
			var thediv = document.getElementById("educlass1");
				addposclass(thediv);
		}
		document.getElementById("footer").className = "footer footer1";
	}
}
function thirdClass(thea) {
	if(thea.className == "content_flag1") {
		thea.className = "content_flag2";
		dividescroll[thea.id].show();
		var first = document.getElementById("firstchange");
		var second = document.getElementById("secondchange");
		document.getElementById("educlass").style.display = "block";
		document.getElementById("searchclass").style.display = "block";
		document.getElementById("shitclass").style.display = "block";
		if(first.className == "content_entertain2") {
			//dividescroll[first.id].hide();
			document.getElementById("learnclass").style.display = "none";
			document.getElementById("lifeclass").style.display = "none";
			document.getElementById("entertainclass").style.display = "none";
			var thediv = document.getElementById("learnclass1");
				addposclass(thediv);
		}
		if(second.className == "content_stuunion2") {
			//dividescroll[second.id].hide();
			document.getElementById("partyclass").style.display = "none";
			document.getElementById("workclass").style.display = "none";
			document.getElementById("unionclass").style.display = "none";
			document.getElementById("specialclass").style.display = "none";
			var thediv = document.getElementById("partyclass1");
				addposclass(thediv);
		}
		document.getElementById("footer").className = "footer";
	}
}
function addborder(thediv) {
	thediv.style.marginLeft = "0";
	thediv.style.marginTop = "0";
	thediv.style.border = "3px solid #818181";
}
function cutborder(thediv) {
	thediv.style.border = "none";
	thediv.style.marginLeft = "3px";
	thediv.style.marginTop = "3px";
}
function Textmove(id) {
	this.id = id;
	this.left = false;
	this.right = false;
	this.onleft = null;
	this.onright = null;
}
Textmove.prototype = {
	moveleft: function() {
		var a = document.getElementById(this.id);
		var liwidth = a.parentNode.offsetWidth;
		var awidth = a.offsetWidth;
		if(awidth > liwidth) {
			if(this.right == true) {
				clearTimeout(this.onright);
			}
			var needwidth = awidth - liwidth;
			var pos = a.style.left;
			var pos2 = pos.replace("-", "");
			pos2 = parseInt(pos2);
			if(pos2 < needwidth) {
				a.style.left = -(pos2) - 1 + "px";
				this.left = true;
				this.onleft = setTimeout(function() {
					textscroll[a.id].moveleft();
				}, 15);
			}
		}
	},
	moveright: function() {
		var a = document.getElementById(this.id);
		var liwidth = a.parentNode.offsetWidth;
		var awidth = a.offsetWidth;
		if(awidth > liwidth) {
			if(this.left == true) {
				clearTimeout(this.onleft);
			}
			var needwidth = awidth - liwidth;
			var pos = a.style.left;
			var pos2 = pos.replace("-", "");
			pos2 = parseInt(pos2);
			if(pos2 > 0) {
				a.style.left = -(pos2) + 1 + "px";
				this.right = true;
				this.onright = setTimeout(function() {
					textscroll[a.id].moveright();
				}, 15);
			}
		}
	}
};
function Divmove(id, width) {
	this.id = id;
	this.ongo = false;
	this.onstop = false;
	this.onhide = null;
	this.onshow = null;
	this.width = width;
}
Divmove.prototype = {
	show:function() {
		var a = document.getElementById(this.id);
		var awidth = a.offsetWidth;
		if(awidth < this.width) {
			if(this.onstop == true) {
				clearTimeout(this.onhide);
				this.onstop = false;
			}
			var width1 = this.width - awidth;
			width1 = Math.floor(width1/2);
			if(width1 < 1) {
				width1 = 1;
			}
			a.style.width = awidth + width1 + "px";
			this.ongo = true;
			this.onshow = setTimeout(function() {
				dividescroll[a.id].show();
			},20)
		}
		if(awidth == this.width) {
			var a1 = document.getElementById("firstchange"),
				a2 = document.getElementById("secondchange"),
				a3 = document.getElementById("thirdchange");
				if(a1.className == "content_entertain2" && a1.id != a.id) {
					dividescroll[a1.id].hide();
				}
				if(a2.className == "content_stuunion2" && a2.id != a.id) {
					dividescroll[a2.id].hide();
				}
				if(a3.className == "content_flag2" && a3.id != a.id) {
					dividescroll[a3.id].hide();
				}
		}
	},
	hide:function() {
		var a = document.getElementById(this.id);
		var awidth = a.offsetWidth;
		if(awidth > 74) {
			if(this.ongo == true) {
				clearTimeout(this.onshow);
				this.ongo = false;
			}
			var width1 = awidth - 74;
			width1 = Math.floor(width1/2);
			if(width1 < 1) {
				width1 = 1;
			}
			a.style.width = awidth - width1 + "px";
			this.onstop = true;
			this.onhide = setTimeout(function() {
				dividescroll[a.id].hide();
			},20)
		}
		else if(awidth == 74) {
			var cname = a.className;
			cname = cname.replace("2", "1");
			a.className = cname;
		}
	}
}
function textright(thea) {
		var pos = thea.style.left;
		var pos2 = pos.replace("-", "");
		pos2 = parseInt(pos2);
		if(pos2 > 0) {
			if(texttoleft != null && thea.id == overid) {
				clearTimeout(texttoleft);
			}
			thea.style.left = -(pos2) + 1 + "px";
			texttoright = setTimeout(function() {
				textright(thea);
			},25);
	}
}
function movedivf1() {
	if(divright != null) {
		clearTimeout(divleft);
	}
	var thediv = document.getElementById("movediv2");
	var pos = thediv.style.left;
	var pos2 = parseInt(pos);
	if(pos2 < 209) {
		if(pos2 < 200) {
			thediv.style.left = pos2 + 10 + "px";
		}
		else {
			thediv.style.left = pos2 + 1 + "px";
		}
		divright = setTimeout(function() {
			movedivf1();
		}, 10);
	}
}
function movedivf2() {
	if(divright != null) {
		clearTimeout(divright);
	}
	var thediv = document.getElementById("movediv2");
	var pos = thediv.style.left;
	var pos2 = parseInt(pos);
	document.getElementById("sidebar_txt").blur();
	if(pos2 > 0) {
		if(pos2 > 9) {
			thediv.style.left = pos2 - 10 + "px";
		}
		else {
			thediv.style.left = pos2 - 1 + "px";
		}
		divleft = setTimeout(function() {
			movedivf2();
		}, 10);
	}
}
function addpopupdivf(thediv) {
	var a = thediv.getElementsByTagName("a");
	var alength = a.length;
	for(var i=0; i<alength-2; i++) {
		var sibling = takeSibling(a[i]);
		if(sibling != null) {
			a[i].onclick = function() {
				var e = window.event || arguments[0];
				showpopupdiv1(this, e);
			}
		}
	}
}
function showpopupdiv1(thea, e) {
	var thediv = document.getElementById("popup_div1");
	var a = thediv.getElementsByTagName("a");
	var alength = a.length;
	var x = e.clientX;
	var y = e.clientY;
	var sibling;
	for(var i=0; alength>i; i++) {
		if(i < 1) {
			sibling = takeSibling(thea);
			a[i].href = sibling.innerHTML;
		}
		else {
			sibling = takeSibling(sibling);
			a[i].href = sibling.innerHTML;
		}
	}
	thediv.style.top = y - 135 +"px";
	thediv.style.left = x - 12 +"px";
	thediv.style.display = "block";
}
function hidepopupdiv1(e) {
	var eele = e.srcElement || e.target;
	if(eele.parentNode.nodeName != "LI") {
		document.getElementById("popup_div1").style.display = "none";
	}
}
function hidepopupdiv2(e) {
	var eele = e.srcElement || e.target;
	var childarray = document.getElementById("login_div").getElementsByTagName("*");
	var childlen = childarray.length;
	for(var i=0; i<childlen; i++) {
		if(eele == childarray[i]) {
			return;
		}
	}
	if(eele.id == "loginbtn") {
		return;
	}
	document.getElementById("login_div").style.display = "none";
}
function showlogindiv() {
	document.getElementById("login_div").style.display = "block";	
}
function addposclass(thediv) {
	if(thediv.id == "learnclass1") {
		var div1 = document.getElementById("lifeclass1");
		var div2 = document.getElementById("entertainclass1");
		thediv.className = thediv.className + " " + "controlpos";
		div1.className = div1.className + " " + "controlpos";
		div2.className = div2.className + " " + "controlpos";
	}
	else if(thediv.id == "partyclass1") {
		var div1 = document.getElementById("workclass1");
		var div2 = document.getElementById("unionclass1");
		var div3 = document.getElementById("specialclass1");
		div1.className = div1.className + " " + "controlpos";
		div2.className = div2.className + " " + "controlpos";
		div3.className = div2.className + " " + "controlpos";
		thediv.className = thediv.className + " " + "controlpos";
	}
	else if(thediv.id == "educlass1") {
		var div1 = document.getElementById("searchclass1");
		var div2 = document.getElementById("shitclass1");
		div1.className = div1.className + " " + "controlpos";
		div2.className = div2.className + " " + "controlpos";
		thediv.className = thediv.className + " " + "controlpos";
	}
}
function baidusearch(){
	var a=document.getElementById("search_input").value;
	if(a!="")
	{
		 document.getElementById("baidu_form").submit();
	}
}
