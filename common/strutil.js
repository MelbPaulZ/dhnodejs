var Util = {};

module.exports = Util;

/** 
一个用作js模板替换的代码 
template格式和数组格式如下 
var template = "<div><h1>{title}</h1><p>{content}</p></div>"; 
var data = [{title:"a",content:"aaaa"},{title:"b",content:"bbb"},{title:"c",content:"ccc"}]; 
只需要数据格式对应 
*/  
Util.replaceTpl = function(template,data){  
    var outPrint="";  
    for(var i = 0 ; i < data.length ; i++){  
        var matchs = template.match(/\{[a-zA-Z0-9_]+\}/gi);  
        var temp="";  
        for(var j = 0 ; j < matchs.length ;j++){  
            if(temp == "")  
                temp = template;  
            var re_match = matchs[j].replace(/[\{\}]/gi,"");  
            temp = temp.replace(matchs[j],data[i][re_match]);  
        }  
        outPrint += temp;  
    }  
    return outPrint;  
} 

Util.encode = function(str, key){
    return authcode(str,'ENCODE',key);
}

Util.decode = function(str, key){
    return authcode(str,'DECODE',key);
}

//如果是中文，需要转成utf-8编码，否则可能解密不出来
function authcode(str, operation, key, expiry) {
     var operation = operation ? operation : 'DECODE';
    var key = key ? key : '';
    var expiry = expiry ? expiry : 0;
     
    var ckey_length = 4;
    key = md5(key);
     
    // 密匙a会参与加解密
    var keya = md5(key.substr(0, 16));
    // 密匙b会用来做数据完整性验证
    var keyb = md5(key.substr(16, 16));
    // 密匙c用于变化生成的密文
    var keyc = ckey_length ? (operation == 'DECODE' ? str.substr(0, ckey_length): md5(microtime()).substr(-ckey_length)) : '';  
    // 参与运算的密匙
    var cryptkey = keya+md5(keya+keyc);
     
    var strbuf;
    if(operation == 'DECODE') {
        str = str.substr(ckey_length);
        strbuf = new Buffer(str,'base64');
        //string = b.toString();
    }
    else {
        expiry = expiry ? expiry + time() : 0;
        tmpstr = expiry.toString();
        if(tmpstr.length>=10)
            str = tmpstr.substr(0,10)+md5(str+keyb).substr(0, 16)+str;
        else {
            var count = 10 - tmpstr.length;
            for(var i=0;i<count;i++) {
                 tmpstr = '0'+tmpstr;
            } 
            str = tmpstr+md5(str+keyb).substr(0, 16)+str;
        }
        strbuf = new Buffer(str);
    }

     
    var box = new Array(256);
    for(var i=0; i < 256; i++) {
        box[i] = i;
    }
    var rndkey = new Array();
    // 产生密匙簿
    for(var i=0; i < 256; i++) {  
        rndkey[i] = cryptkey.charCodeAt(i % cryptkey.length);
    }
    // 用固定的算法，打乱密匙簿，增加随机性，好像很复杂，实际上对并不会增加密文的强度  
    for(var j = i = 0; i < 256; i++) {  
        j = (j + box[i] + rndkey[i]) % 256;  
        tmp = box[i];  
        box[i] = box[j];  
        box[j] = tmp;  
    }
     
     
    // 核心加解密部分
    var s = '';
    for(var a = j = i = 0; i < strbuf.length; i++) {
        a = (a + 1) % 256;
        j = (j + box[a]) % 256;
        tmp = box[a];
        box[a] = box[j];
        box[j] = tmp;
        // 从密匙簿得出密匙进行异或，再转成字符
        //s += String.fromCharCode(string[i] ^ (box[(box[a] + box[j]) % 256]));
        strbuf[i] = strbuf[i] ^ (box[(box[a] + box[j]) % 256])
    }

    if(operation == 'DECODE') {
        var s = strbuf.toString();
        if((s.substr(0, 10) == 0 || s.substr( 0, 10) - time() > 0) && s.substr(10, 16) == md5(s.substr(26)+keyb).substr(0, 16)) {
            s = s.substr(26);
        } else {
            s = '';
        }
    }
    else {
        var s = strbuf.toString('base64');

        var regex = new RegExp('=', "g");
        s = s.replace(regex, '');
        s = keyc+s;
    }

    return s;
}
 
function md5(str){
    var hash = require('crypto').createHash('md5');
    return hash.update(str+"").digest('hex');
}
 
function time() {
    var unixtime_ms = new Date().getTime();
    return parseInt(unixtime_ms / 1000);
}
 
function microtime(get_as_float) {
    var unixtime_ms = new Date().getTime();
    var sec = parseInt(unixtime_ms / 1000);
    return get_as_float ? (unixtime_ms/1000) : (unixtime_ms - (sec * 1000))/1000 + ' ' + sec;
}