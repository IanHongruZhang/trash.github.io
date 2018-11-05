function cxLoginSuccess() {
  window.location.reload();
}

function cxLoginError() {
  window.location.reload();
}

function cxPaySuccess() {
  window.location.reload();
}

function cxPayFailed() {
  window.location.reload();
}

function comeFrom(){
    var current = "WAP";
    var num = parseInt(GetCookieValue("appType"));
    switch (num){
        case 22:
            current = "ANDROID";
            break;
        case 21:
            current = "IOS";
            break;
        default:
            break;
    }
    return current;
}


function isFromApp(){
    var fromApp = true;
    if(typeof GetCookieValue("appType") == 'undefined' || GetCookieValue("appType").length < 1){
	  fromApp = false;
	}
	return fromApp;
}

function SetCookieValue(_Name,_Value,_Expires,_Type){
  var _LargeExpDate = new Date();
  if(typeof(_Expires)=='number' && isNaN(_Expires)==false) {
    if(_Expires!=0) {
      if(typeof(_Type)=='number' && isNaN(_Type)==false && _Type==1){
        _LargeExpDate.setTime(_LargeExpDate.getTime()+(_Expires*1000));
      }else{
        _LargeExpDate.setTime(_LargeExpDate.getTime()+(_Expires*24*3600*1000));
      }
    }else{
      _LargeExpDate = null;
    }
  }else{
    _LargeExpDate.setTime(_LargeExpDate.getTime()+(36500*24*3600*1000));
  }
  document.cookie = _Name+"="+escape(_Value)+(_LargeExpDate!=null?";expires="+_LargeExpDate.toGMTString():"")+";path=/;domain=.caixin.com";
}

function GetCookieValue(_Name){
  var _search = _Name+"=";
  if(document.cookie.length>0) {
		var _offset = document.cookie.indexOf(_search);
    	if(_offset!=-1) {
				_offset += _search.length;
        var _end = document.cookie.indexOf(";",_offset);
        if(_end==-1) _end = document.cookie.length;
           var _cook = document.cookie.substring(_offset,_end);
           return _cook.match(/%u/ig)?unescape(_cook):decodeURIComponent(_cook);
       }
       else return '';
   }
}


window.price = 0; 
//对应文章id  srcinfoid
//var srcinfoid = 101146620;
//window.entity = {
	//"srcinfoid":101146620,
	/*"category":"100687656;100689032;101145969",
	"link":"http://weekly.caixin.com/2017-09-15/101145969.html",
	"media":5,
	"channel":160,
	"ispro":0,*/
	//"fromchannel":"16, 22"};
// productId对照表 https://madminv5pre.caixin.com/tmp/config/config.json
//var productIdList = [8, 1000];
var paySourceId = 100;


function isLoginSpe() {
	return (GetCookieValue("SA_USER_UID") && GetCookieValue("SA_USER_NICK_NAME"))? true: false;
}


function wapSpeCostTmp(opts) {
	setStyle();
	return  setSpeTmp(opts);
}
function setStyle() {
	var str = "<style>";
	str += 'a{text-decoration: none;}'
	str += '#chargeWall{height: '+($(window).height()+100)+'px;position: relative;/*background: #3a2323;*/z-index:1111;}';
	str += '#chargeWall{position: fixed;top: 0;left: 0;width: 100%;}';
	str += '#chargeWall .bg-blur{height: '+($(window).height()+100)+'px;background:url(http://file.caixin.com/static/mh5/images/pcspe.jpg);background-size:100% 100%;opacity: 0.98;position: fixed;top: 0;left: 0;width: 100%;width: 100%;}';
	str += '#chargeWall .content{position: fixed;top: 30%;width: 100%;z-index: 11111;}';
	str += '.payreadwarp{margin:0;text-align: center;}';
	str += '.playwarp,.playwarp2{width: 100%;z-index: 101;max-width: 560px;position: fixed;top:49px;}';
	str += '.playwarp2{position: inherit;min-height: 210px;max-width: 540px; top:0;width: auto;}';
	str += '.payment_box{background: none;margin:0 auto;}';
	str += '.payment_box dt{border-radius: 0;}';
	str += '.payment_box .box_title{color: #fff; line-height: 28px; margin-bottom: 10px; font-size: 14px;}';
	str += '.payment_box dl{padding-top: 0;}';
	str += '.payment_box dt{width: 380px;font-size: 18px;}';
	str += '@media screen and (max-width: 1024px) {.payment_box dt em img{margin-left:10px;vertical-align: middle;}.payment_box{margin:0 auto;text-align:center;width: 280px;;height: auto;}.payment_box dt{padding-top:0;width:100%;font-size:16px;background:#f8ad18;height:33px;border-radius:5px;margin:0 auto 15px;color:#000; line-height: 33px;}#chargeWall .content{left:0;}.payment_box dd{text-align:center;}}';
	str += '.payment_box dd{color: #fff;margin-top: 30px;}';
	str += '.payment_box dd a{padding:0 0 2px 0px;color: #fff;border-bottom: 1px solid #f8ad19;margin-left:10px;font-weight: bold;}';
	str += '.dialoguebox .middle .types .items div{color:#4a4a4a;}';
	str += '.dialoguebox .middle .butlist div{color:#000;}';
	str += "</style>";
	$('head').append(str);
}


window.onresize = function() {
	$('#chargeWall .bg-blur').height($(window).height());
}


var appWordbook = {
	"SJQZSF": 1010,
	"SJPRO2": 1030,
	"SJPRO": 1020,
	"QZSF": 1000,
	"PRO": 8
}


function codeIdChat(listData) {
	var arr = [];
	var str = "";
	if(typeof listData != "undefined") {
		str = listData.join(',');
		var newArr = str.split(',');
		for(var i=0;i<newArr.length;i++) {
			for(var key in appWordbook) {
				if(key == newArr[i]) {
					arr.push(appWordbook[key]);
					newArr.splice(i, 1);
					i--;
				}
			}
		}
	}
	return arr;
	//getShopList.listData
}

function showProductApp() {
	caixin.buyWithProductInfo(JSON.stringify({
      "productIdList" : codeIdChat(getShopList.listData),
      "paySourceId" : 100,
      "uid":GetCookieValue('SA_USER_UID'),
      "channel": 1014
    }));
}

/*if(!isFromApp()) {
	if(isLoginSpe()) {
		$.ajax({
	      url: 'http://gateway.caixin.com/api/authority/check/validate',
	      type: 'get',
	      data: {
	         "goodsInfo.type": "PRO",
	         uid: GetCookieValue('SA_USER_UID'), 
	         code: GetCookieValue('USER_LOGIN_CODE'),
	         unit: GetCookieValue('SA_USER_UNIT'),
	         deviceType: GetCookieValue('SA_USER_DEVICE_TYPE')
	      },
	      dataType:'jsonp',
	      success: function(data){
	         if(data.code == 0) {
	         	alert(1)
	          }else{
	          	alert(2)
	            $("#chargeWall").html(wapSpeCostTmp()).show();
	          }
	      },
	      error: function() {
	      	alert('获取数据异常');
	      	$("#chargeWall").html(wapSpeCostTmp()).show();
	      }
	  })
	}
}*/

function setSpeTmp(opts) {
	var str = "";
	str += '<div class="bg bg-blur"></div>';
	str += '<div class="content">';
	str += '<div class="artline"></div>';
	str += '<div class="payment_box">';
	str += '<div class="box_title">成为付费用户<br>阅读十几万篇高质量报道</div>';
	str += '<dl>';
	if(isLoginSpe()) {
		if(isFromApp()) {
			str += "<a href=\"javascript:showProductApp();tongji('send', 'event', 'WAPMF5Ping', 'Buy', 'ZKSell');\" class=\"buttonhide\" target=\"_self\">";
		}else {
			str += "<a href=\"javascript:showUI.showProduct();tongji('send', 'event', 'WAPMF5Ping', 'Buy', 'ZKSell');\" class=\"buttonhide\" target=\"_self\">";
		}
		str += '<dt>'+ getBtnShowVal().replace(/\<\/+br\>/, ',') +'<em><img src="http://file.caixin.com/static/mh5/images/arrow.png"></em></dt>';
		str += '</a>';
		str += '<dd>'+ getgetSpeSjjWarn() +'</dd>';
	 }else{
	 	if(isFromApp()) {
			str += "<a target=\"_self\" href=\"javascript:;\" onclick=\"caixin.cxLogin()\" class=\"buttonhide\">";
			str += '<dt>财新网收费文章，请付费阅读<em><img src="http://file.caixin.com/static/mh5/images/arrow.png"></em></dt>';
			str += '</a>';
			str += '<dd>已购买用户请<a target="_self" href=\"javascript:;\" onclick=\"caixin.cxLogin()\">立即登录</a></dd>';
	 	}else{
			str += "<a target=\"_self\" href=\"http://u.caixin.com/user/login.html?url="+ window.location.href +"\" class=\"buttonhide\">";
			str += '<dt>财新网收费文章，请付费阅读<em><img src="http://file.caixin.com/static/mh5/images/arrow.png"></em></dt>';
			str += '</a>';
			str += '<dd>已购买用户请<a target="_self" href="http://u.caixin.com/user/login.html?url='+ window.location.href +'">立即登录</a></dd>';
	 	}
	 }
	 str += '</dl>';
	 str += '</div>';
	 return str;
}


function getBtnShowVal() {
	return window.btnShowVal?window.btnShowVal: '';

}

function getgetSpeSjjWarn() {
	return window.getSpeSjjWarn?window.getSpeSjjWarn: '';
}

