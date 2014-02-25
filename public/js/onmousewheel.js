// function mouseWheel(obj,handler){//¸øobj°ó¶¨Êó±ê¹öÂÖÊÂ¼þ
//  var node=typeof obj=="string"?$(obj):obj;//¿ÉÒÔ´«Èë×Ö·û£¬Ò²¿ÉÒÔ´«Èë¶ÔÏó
//   bind(node,'mousewheel',function(event){//¸ønode½áµã°ó¶¨Õâ¸öº¯Êý
//     var data=-getWheelData(event);
//     handler(data);
//     if(document.all){//¸ønode½áµãÈ¡ÏûÊÂ¼þµÄÄ¬ÈÏ¶¯×÷¡£
//       window.event.returnValue=false;
//     }else{
//       event.preventDefault();
//     }
//   });
//   //»ðºü
//   bind(node,'DOMMouseScroll',function(event){//»ðºü°ó¶¨Êó±ê¹öÂÖÊÂ¼þÒªÓÃDOMMouseScroll
//    var data=getWheelData(event);
//    handler(data);
//    event.preventDefault();
//   });
//   function getWheelData(event){
//    var e=event||window.event;
//    return e.wheelDelta?e.wheelDelta:e.detail*40;//e.detailÒ»°ãµÈÓÚ3£¬e.wheelDeltaÊÇ120
//   }
// }

// function bind(obj,type,handler){
//  var node=typeof obj=="string"?$(obj):obj;
//  if(node.addEventListener){
//   node.addEventListener(type,handler,false);
//  }else if(node.attachEvent){
//   node.attachEvent('on'+type,handler);
//  }else{
//   node['on'+type]=handler;
//  }
// }


/***********************************************/
/* 下面是另一种方法  */
function addScrollListener(element, wheelHandle) {
    if(typeof element != 'object') return;
    if(typeof wheelHandle != 'function') return;
   
    if(typeof arguments.callee.browser == 'undefined') {
        var user = navigator.userAgent;
        var b = {};
        b.opera = user.indexOf("Opera") > -1 && typeof window.opera == "object";
        b.khtml = (user.indexOf("KHTML") > -1 || user.indexOf("AppleWebKit") > -1 || user.indexOf("Konqueror") > -1) && !b.opera;
        b.ie = user.indexOf("MSIE") > -1 && !b.opera;
        b.gecko = user.indexOf("Gecko") > -1 && !b.khtml;
        arguments.callee.browser = b;
    }

    if(element == window)
        element = document;
    if(arguments.callee.browser.ie)
        element.attachEvent('onmousewheel', wheelHandle);
    else
        element.addEventListener(arguments.callee.browser.gecko ? 'DOMMouseScroll' : 'mousewheel', wheelHandle, false);
}

// function wheelHandle(event) {
//     var data = getWheelData(event);
//     alert(data);
// }

 function getWheelData(event){
    event.preventDefault();
    var e=event||window.event;
    return e.wheelDelta?e.wheelDelta:e.detail*40;
}