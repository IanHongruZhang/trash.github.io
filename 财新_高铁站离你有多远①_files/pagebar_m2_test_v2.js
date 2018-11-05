document.domain = 'caixin.com'
var canTrial = {}
function isLogin() {
  var cxuid = GetCookieValue('SA_USER_UID')
  var cxname = GetCookieValue('SA_USER_NICK_NAME')
  if (cxuid && cxname) {
    //readyContentInfo();
    //buildContentInfo();
  } else {
    console.log('wdl')
    $('#chargeWall').show()
  }
}

function comeFrom() {
  var current = 'WAP'
  var num = parseInt(GetCookieValue('appType'))
  switch (num) {
    case 22:
      current = 'ANDROID'
      break
    case 21:
      current = 'IOS'
      break
    default:
      break
  }
  return current
}

function zfbui() {
  $('.diglozfb').remove()
  $('body').append(
    '<div class="diglozfb" style="background: #000;opacity:0.85; z-index:111111;position:fixed;top:0;left:0;width:100%;height:' +
      $('body').height() +
      'px"><img style="width:100%;margin-top:20px;" src="//file.caixin.com/file/content/images/digozfb.png" alt="" /></div>'
  )
}

//SetCookieValue("SA_USER_AUTH_Statistics","0",1);
function getAdPosition() {
  var $ad = $('.news-ad .adsame-banner-box').html()
  if (!$ad) return
  var tempStr =
    "<div  style='position:relative;padding-bottom:24px;'>" + $ad + '</div>'
  if (location.href.indexOf('utm_source=TouTiao') > 0) {
    $('.news-con').append(tempStr)
  } else {
    if ($('.news-con p').length > 3) {
      $(tempStr).insertAfter($('.news-con p').eq(2))
    } else {
      $('.news-con').append(tempStr)
    }
  }
}

function getSearch(name) {
   var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
   var r = window.location.search.substr(1).match(reg);
   if(r!=null)return  unescape(r[2]); return null;
 }

$(function() {
  // 判断是否有广告.
  if ($('.news-ad .adsame-banner-box').html()) {
    // 重置广告图片大小为100%宽.
    $('.news-ad .adsame-banner-box').css({
      width: '100%',
      height: 'auto'
    })
    $('.news-ad .adsame-banner-box img').css({
      width: '100%',
      height: 'auto',
      'vertical-align': 'top'
    })
    var $ad = $('.news-ad .adsame-banner-box').html()

    var tempStr =
      "<div id='news_ad0' style='position:relative;padding-bottom:24px;'>" +
      $ad +
      '</div>'
    if (typeof attr != 'undefined' && attr != 5) {
      if (location.href.indexOf('utm_source=TouTiao') > 0) {
        $(tempStr).insertAfter($('.news-con'))
      } else {
        if ($('.news-con p').length > 3) {
          $(tempStr).insertAfter($('.news-con p').eq(2))
        }
      }
    }
  }
})

var gatewayApi = '//gateway.caixin.com/'
var gatewayApiHttps = 'https://gateway.caixin.com/'
var authUrl = gatewayApiHttps + 'api/authority'
// var payUrl = gatewayApiHttps + 'api/pay'
var payUrl = 'http://pay.caixin.com/h5/checkout.html' //线上
// var payUrl = 'http://payqa.caixin.com/h5/checkout.html' //准生产

$(function(){
  var tempArr = (window.location.hash).split("&");
  window.targetBackUrl = "";
  if(getSearch("successBackUrl")){
      window.targetBackUrl = encodeURIComponent(getSearch("successBackUrl") + tempArr[0]);
      if(tempArr.length > 1){
        window.targetBackUrl = encodeURIComponent(getSearch("successBackUrl") + tempArr[0]+ "?" + tempArr[1]);
      }
  }
})
window.maVoRules = []
window.getSpeSjjWarn = '&nbsp;'
window.qzsfToProMsg = ''
//window.btnShowVal = "财新网收费文章，请付费阅读";
window.btnShowVal = '全网畅读  请选择订阅方式'

/*
 *	curl： 获取url
 *	currentPage: 获取分页
 *	_JsonIsOK: 获取v55权限内容完成
 *	_DataJson: 获取v55内容定义为全局
 *	_HtmlIsOK: 页面是否初始化完成
 */
window.Config = {
  curl: document.location.href,
  currentPage: 1,
  gatewayApis: 'https://gateway.caixin.com/',
  gatewayApi: 'https://gateway.caixin.com/',
  _DataJson: null,
  _JsonIsOK: false,
  _HtmlIsOK: false,
  counponNum: 0,
  discount: 0,
  channel: 1002003,
  singlePay: true
}

var wxDpsf = {
  isShowBtn: false,
  entity: function() {
    if (this.isWx() && price > 0 && !this.isShowBtn) {
      $('#chargeWall .artline').append(this.render())
      this.isShowBtn = true
      this.style()
      $('#wxDpsf').on('click', wxDpsf.goClickDpsf)
    }
  },
  render: function() {
    return '<div id="wxDpsf">单篇' + price + '元，直接购买</div>'
  },
  style: function() {
    $('#wxDpsf').css({
      /*"border": "1px solid #6377a9",
			 "width": "80%",
			 "margin-left": "10%",*/
      border: '1px solid #f8ad18',
      width: '70%',
      margin: '0 auto',
      'box-sizing': 'border-box',
      /*"position": "absolute",
			 "top": "95px",
			 "left": "0px",*/
      padding: '10px 0',
      /*"color": "#6377a9"*/
      color: '#f8ad18',
      background: '#fff'
    })
    $('.box_title').css({
      padding: '20px 0 15px 0'
    })
    //$(".payment_box").css({"margin-top": "50px"});
    //$(".payment_box").css({"margin-top": "50px","background":"url(http://file.caixin.com/file/content/images/payment_dpsf.png) no-repeat 0 0"})
  },
  isLogin: function() {
    return GetCookieValue('SA_USER_UID') && GetCookieValue('SA_USER_NICK_NAME')
      ? true
      : false
  },
  isWx: function() {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  },
  goWxLogin: function(id, unitNum) {
    var URLConfig = 'https://gateway.caixin.com/api/ucenter'
    var deviceType = getDeviceType()
    var historyUrl = window.location.href
    // 判断是否为登录页，如果为登陆页，则从URL中获取返回地址。否则返回地址为当前页
    if (/(choose|login)\.html/i.test(window.location.href.split('?')[0])) {
      historyUrl = getSearch('url') || 'http://u.caixin.com/m/uclogin.html?url='
    } else {
      historyUrl = getSearch('url') || window.location.href
    }

    var backHmtlUrl =
      'http://file.caixin.com/webchannel/pcuser/third-party-login.html?backUrl='
    var backUrl = base64encode(backHmtlUrl + encodeURIComponent(historyUrl))
    var unit = unitNum || 1
    var url =
      URLConfig +
      '/user/v1/thirdparty/login/' +
      id +
      '/' +
      unit +
      '/' +
      deviceType +
      '/' +
      backUrl
    $.ajax({
      url: url,
      type: 'GET',
      contentType: 'application/json;charset=utf-8',
      dataType: 'jsonp',
      success: function(result) {
        if (result.code == 0) {
          /*if(!GetCookieValue('WXAUTH_OPENID')) {
		  		window.location.href = "http://user.caixin.com/wxsdk/auth.php?url=" + window.location.href;
		  	}else {
		  		wxDpsf.goPayDpsf();
		  	}*/
          SetCookieValue('iswxpay', 1)
          window.location.href = result.data
        } else {
          console.log(result.msg)
        }
      }
    })
  },
  goPayDpsf: function(num) {
    if (GetCookieValue('iswxpay') == 1 || num) {
      SetCookieValue('iswxpay', 0)
      tongji('send', 'event', 'SinglePay', decodeURIComponent(share_desc))
      var url = Config.gatewayApis + 'api/article/article/getOrderSn'
      var params = {
        type: 1,
        channel: '3001001',
        currency: 'CNY',
        orderGoods: {
          appId: 100,
          goodsCode: entity.id,
          goodsName: '【单篇购买】' + decodeURIComponent(share_desc),
          goodsUrl:
            window.location.href.indexOf('?') > 0
              ? window.location.href.substr(
                  0,
                  window.location.href.indexOf('?')
                )
              : window.location.href
        },
        platform: 'WAP',
        returnUrl:
          window.location.href.indexOf('?') > 0
            ? window.location.href.substr(0, window.location.href.indexOf('?'))
            : window.location.href,
        uid: GetCookieValue('SA_USER_UID')
      }
      $.ajax({
        url: url,
        data: { vo: JSON.stringify(params) },
        dataType: 'jsonp',
        success: function(res) {
          if (res.code == 0) {
            //window.location.href = payUrl + "/order?orderSn=" + res.data.orderSn + "&backUrl=" + encodeURIComponent((window.location.href.indexOf('?') > 0 ? window.location.href.substr(0, window.location.href.indexOf('?')) : window.location.href));

            // window.location.href =
            //   'https://pay.caixin.com/h5/forward.html?orderSn=' +
            //   res.data.orderSn +
            //   '&backUrl=' +
            //   encodeURIComponent(
            //     window.location.href.indexOf('?') > 0
            //       ? window.location.href.substr(
            //           0,
            //           window.location.href.indexOf('?')
            //         )
            //       : window.location.href
            //   )
            var url = 'https://pay.caixin.com/h5/forward.html?orderSn=' + res.data.orderSn + '&backUrl=';
            if(targetBackUrl){
              url += targetBackUrl;
            }else{
                url +=
                encodeURIComponent(
                  window.location.href.indexOf('?') > 0
                    ? window.location.href.substr(
                        0,
                        window.location.href.indexOf('?')
                      )
                    : window.location.href
                )
            }
            window.location.href = url ;
          } else {
            if (res.code == 41999) {
              alert(res.msg)
              window.location.reload()
            }
          }
        }
      })
    } else {
    }
    //Payment.payMagazine(5);
  },
  goClickDpsf: function() {
    wxDpsf.isLogin() ? wxDpsf.goPayDpsf(1) : wxDpsf.goWxLogin(4)
  }
}

//产品列表结果集参数
var GetOrderTrem = {
  PRO: {
    'powerType': 'PRO',
    /*'subYear': 12,
    'goodsType': 0,
    'currency': 'RMB',
    'isAssociation': 1,
    'ifShow': 1,*/
    goodsId: 615
  },
  CXZK: {
    'powerType': 'CXZK',
    /*'subYear': 12,
    'isAssociation': 1,
    'goodsType': 0,
    'currency': 'RMB',
    'ifShow': 1,*/
    goodsId: 455
  },
  CXZK2: {
    'powerType': 'CXZK',
    /*'subYear': 24,
    'isAssociation': 1,
    'goodsType': 0,
    'currency': 'RMB',
    'ifShow': 1,*/
    goodsId: 653
  },
  WSXXBG: {
    'powerType': 'WSXXBG',
    /*'goodsType': 0,
    'isAssociation': 1,
    'currency': 'RMB',
    'ifShow': 1,*/
    goodsId: 419
  },
  XPJTK: {
    'powerType': 'XPJTK',
    /*'goodsType': 0,
    'isAssociation': 1,
    'currency': 'RMB',
    'ifShow': 1,*/
    goodsId: 588
  },
  QZSF: {
    'powerType': 'QZSF',
    /*'goodsType': 0,
    'subYear': 12,
    'isAssociation': 1,
    'currency': 'RMB',
    'ifShow': 1,*/
    goodsId: 733,
    purchaserId: GetCookieValue('SA_USER_UID'),
    isOrgTrial: 1
    //'goodsId':650
  },
  QZSF1: {
    'powerType': 'QZSF',
    //'goodsId':651,
    goodsId: 692,
    //'goodsId': 705,
    purchaserId: GetCookieValue('SA_USER_UID'),
    isOrgTrial: 1
  },
  PRO1: {
    'powerType': 'PRO',
    goodsId: 718,
    purchaserId: GetCookieValue('SA_USER_UID'),
    isOrgTrial: 1
  },
  'NOVEL-CL': {
    powerType: 'NOVEL-CL'
  },
  SJQZSF: {
    'powerType': 'CXZK_TO_QZSF',
    /*'goodsType': 0,
    'isAssociation': 1,
    'currency': 'RMB',
    'ifShow': 1,*/
    goodsId: 664
    //'goodsId': 647
  },
  SJPRO: {
    'powerType': 'CXZK_TO_PRO',
    /*'goodsType': 0,
    'isAssociation': 1,
    'currency': 'RMB',
    'ifShow': 1,*/
    goodsId: 674
    //'goodsId': 648
  },
  SJPRO2: {
    'powerType': 'QZSF_TO_PRO',
    /*'goodsType': 0,
    'isAssociation': 1,
    'currency': 'RMB',
    'ifShow': 1,*/
    goodsId: 665
    //'goodsId': 654
  },
  'WS-30BUHUO': {
    goodsId: 699
  }
}

//工具类
var Utils = {
  isUndefinde: function(val) {
    if (typeof val != 'undefined') {
      return true
    }
    return false
  },
  isOrTrem: function(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        return true
      }
    }
    return false
  },
  //isAddTrem: function(trem) {return trem[0];}
  jsonToString: function(json) {
    var str = '?'
    for (var key in json) {
      str += key + '=' + json[key] + '&'
    }
    return str.slice(0, -1)
  },
  getQueryString: function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  },
  formatData: function formatData(data) {
    return decodeURI($.param(data)).replace(
      /(req\[\d+\])\[([^\[\]]+)\]/g,
      function(el, $1, $2) {
        return $1 + '.' + $2
      }
    )
  }
}

$(function() {
  $('body').append(
    '<style>#chargeWall{display: block; position: relative;top: -100px; left: -20px; background: none; min-height: 100px;margin: -5px 0px -100px 20px; width: 100%;}.payment_box dt{border-radius:0;}.box_title{padding:35px 0 0 0;font-size:14px;color:#404040;text-align:center;}.payment_box dt{margin:0 auto 10px;}.payment_box dl{padding:0;}.payment_box dd{font-size:14px;padding-bottom:2%;}</style>'
  )
})
//ui展示
var showUI = {
  getVideoTitleTmpHtml: function() {
    var str = ''
    $(window).scroll(function() {
      var doc = $(document)
      var scT = $(window).height() * 0.5
      if (doc.scrollTop() >= 630) {
        if (
          window.location.href.indexOf('video.caixin.com') != '-1' ||
          window.location.href.indexOf('gbiz.caixin.com') != '-1'
        ) {
          $('.payment_box').show()
        } else {
          $('.payment_box').hide()
        }
      } else {
        $('.payment_box').show()
      }
    })
    var styleStr = '<style>'
    styleStr += '.media_video{position:relative;}'
    styleStr += '#chargeWall{top:5px;left:0;margin: 0 auto;overflow:hidden;}'
    styleStr += '#chargeWall .content{width:100%;}'
    styleStr +=
      '.playwarp,.playwarp2{width: 100%;z-index: 101;max-width: 560px;position: fixed;top:49px;}'
    styleStr +=
      '.playwarp2{position: inherit;min-height: 210px;max-width: 540px; top:0;width: auto;}'
    styleStr += '.media_video{margin: 0;}'
    styleStr +=
      '.payment_box,.payment_box2{position: absolute;background: rgba(0,0,0,0.7);color:#fff ;text-align:center;color: #fff; font-size: 16px;width: 100%;height: 100%;z-index: 9;}'
    styleStr += '.payment_box .box_title{margin: 20px 0 15px;color: #fff;}'
    styleStr +=
      '.payment_box .btn,.payment_box2 .btn{background:#eaaf2d;width:70%;height:36px;line-height:36px;border-radius:5px;margin:0 auto 15px;color:#fff;}'
    styleStr += '.payment_box .btn em,.payment_box2 .btn em{margin-left: 30px;}'
    styleStr +=
      '.payment_box .buy a,.payment_box2 .buy a{margin-left: 20px;color:#eaaf2d ;text-decoration: underline;}'
    styleStr +=
      '.playbg{position: absolute;width: 100%; height: 100%;z-index: 8;overflow: hidden;}'
    styleStr += '.playbg img{width: 100%;}'
    styleStr +=
      '.types{position: inherit; background:none;padding:0;color: inherit;right:0;top:0;}'
    styleStr += '.effectbtn .fl a,.crosslist a,#moreMobile a{color:#333;}'
    styleStr += '</style>'
    $('head').append(styleStr)
    $(function() {
      $('body').append(
        '<style>#chargeWall{top: 5px; margin: -5px 0px 0px 20px;position:absolute;}.payment_box{background:rgba(0,0,0,0.7);}.tb-bar-r{width: 24px;height: 24px;background: url(//file.caixin.com/caixin/image/caixinvideo/relay.png) no-repeat center center;background-size: 24px;margin: 0;}</style>'
      )
      if (entity.id == '101168132' || entity.id == '101140107') {
        $('.payment_box').css({
          background:
            'url(//file.caixin.com/file/content/images/payment_bg.png) no-repeat 0 0'
        })
        $('.payment_box .box_title').css({ margin: '0' })
      }
    })
    if (
      window.location.href.indexOf('video.caixin.com') != '-1' ||
      window.location.href.indexOf('gbiz.caixin.com') != '-1'
    ) {
      $('#chargeWall').height($('.player').height())
    }
    if (Logic.isLogin()) {
      str += '<div class="playwarp playwarp2">'
      str += '<div class="payment_box">'
      str += '<div class="box_title">财新通 会员专享</div>'
      str +=
        "<a href=\"javascript:showUI.showProduct();tongji('send', 'event', 'WAPMF5Ping', 'Buy', 'ZKSell');\" class=\"button\" target=\"_self\">"
      str += '<div class="btn">立即订阅</em></div>'
      str += '</a>'
      str += '<div>' + window.getSpeSjjWarn + '</div>' //单篇
      str += '</div>'
      str += '<div class="playbg">'
      str += '<img src="' + newsPic + '">'
      str += '</div>'
      str += '</div>'
      str += '</div>'
    } else {
      str += '<div class="playwarp playwarp2">'
      str += '<div class="payment_box">'
      str += '<div class="box_title">财新通 会员专享</div>'
      str +=
        '<a href="javascript:openLoginWindow();" class="button js-openLoginChooseLayer" target="_self">'
      str += '<div class="btn">立即订阅</em></div>'
      str += '</a>'
      str +=
        '<div>已购买用户请<span class="buy"><a href="javascript:openLoginWindow();" class="button js-openLoginChooseLayer" target="_self">立即登录</a></span>								'
      str += '</div>'
      str += '</div>'
      str += '<div class="playbg">'
      str += '<img src="' + newsPic + '">'
      str += '</div>'
      str += '</div>'
      str += '</div>'
    }
    $('#loadinWall').hide()
    $('#chargeWall').show()
    return str
  },
  getTitleTmpHtml: function(middle) {
    //var btnShowVal = "财新网";
    //var getSpeSjjWarn = "&nbsp;";
    var noLoginSjjWarn = ''
    var noLoginSjjWarn = ''
    var CXZK = entity.fromchannel.indexOf('19') != -1
    var QZSF = entity.fromchannel.indexOf('16') != -1
    var PRO = entity.fromchannel == '22'
    var WS30BUHUO = entity.fromchannel.indexOf('23') != -1
    var imgPayBtn = CXZK || QZSF || PRO || WS30BUHUO
    var upgradePayBtn = QZSF && window.haveAuth.indexOf('CXZK') != -1
    var upgradeProPayBtn =
      PRO &&
      (window.haveAuth.indexOf('CXZK') != -1 ||
        window.haveAuth.indexOf('QZSF') != -1)

    if (
      (entity.fromchannel.split(',').length < 2 &&
        entity.fromchannel.indexOf('22') != '-1') ||
      entity.ispro > 0
    ) {
      //btnShowVal = "数据通";
      //getSpeSjjWarn = "财新通用户可以<a href='http://mall.caixin.com/mall/web/product/product.html?id=665' style='color: #4485b9;'>升级到数据通</a>";
      //noLoginSjjWarn = "财新通用户可以<a style='line-height: 25px;color: #4485b9;' href='http://mall.caixin.com/mall/web/product/product.html?id=665'>&nbsp;&nbsp;升级到数据通</a><br />";
      noLoginSjjWarn = ''
    }
    var artline =
      '<div class="artline" style="background:url(//file.caixin.com/images/m/artline.png) repeat-x;background-size:contain;padding:45px 0 8px 0;min-height:40px;position:relative;top:6px;">'
    if (imgPayBtn) {
      artline += '<div class="box_title for-img"></div>'
    }
    artline += '</div>'
    if (Logic.isLogin()) {
      //var str = '<div class="artline" style="background:url(http://file.caixin.com/images/m/artline.png) repeat-x;height:100px;position:relative;top:6px;"></div>';
      //str += '<div class="payment_box" style="position:relative;z-index:11;">';
      var str = artline

      if (imgPayBtn) {
        str += '<div class="payment_box img-pay-btn'
      } else {
        str += '<div class="payment_box'
      }

      str += '" style="position:relative;z-index:11;">'
      /*if(imgPayBtn){
				str += '<div class="box_title"></div>';
			}else{*/
      if (!imgPayBtn) {
        str +=
          '<div class="box_title">成为订阅用户<br />阅读十几万篇高质量报道</div>'
      }

      str += '<dl>'
      str +=
        "<a href=\"javascript:showUI.showProduct();tongji('send', 'event', 'WAPMF5Ping', 'Buy', 'ZKSell');\" class=\"button\" target=\"_self\">"
      ////str += '<dt>'+ btnShowVal +'<em><img src="http://file.caixin.com/static/mh5/images/arrow.png"></em></dt>';
      if (WS30BUHUO) {
        str += '<dt><img src="//file.caixin.com/images/pay-ws30-img.jpg"></dt>'
      } else if (PRO) {
        if (upgradeProPayBtn) {
          str +=
            '<dt><img src="//file.caixin.com/appchannel/all/img/upgrade-pro-img.jpg"></dt>'
        } else {
          str +=
            '<dt><img src="//file.caixin.com/appchannel/all/img/pay-pro-img.jpg"></dt>'
        }
      } else if (upgradePayBtn) {
        str +=
          '<dt><img src="//file.caixin.com/appchannel/all/img/upgrade-img.jpg"></dt>'
      } else if (imgPayBtn) {
        str +=
          '<dt><img src="//file.caixin.com/appchannel/all/img/pay-img.jpg"></dt>'
      } else {
        str +=
          '<dt>' +
          btnShowVal +
          '<em><img src="//file.caixin.com/static/mh5/images/arrow.png"></em></dt>'
      }

      str += '</a>'
      // str += '<dd>' + window.getSpeSjjWarn +'<a class="free2weekpro" ' +
      //   'href="http://cchuodong.caixin.com/market/free-cxt/index.html?' +
      //   'utm_source=Caixin&utm_medium=1xian&utm_content=CXTFreeSJT14&utm_campaign=FreePlan&' +
      //   'originURL='+encodeURIComponent(location.href)+'">'+window.qzsfToProMsg+'</a></dd>'
      str += '<dd>' + window.getSpeSjjWarn +'</dd>'

      str += '</dl>'
      str += '</div>'
    } else {
      if (Config._DataJson.status != 3) {
        ////var str = '<div class="artline" style="background:url(http://file.caixin.com/images/m/artline.png) repeat-x;height:100px;position:relative;top:6px;"></div>';
        ////str += '<div class="payment_box" style="position:relative;z-index:11;">';
        ////str += '<div class="box_title">成为订阅用户<br />阅读十几万篇高质量报道</div>';
        var str = artline

        if (imgPayBtn) {
          str += '<div class="payment_box img-pay-btn'
        } else {
          str += '<div class="payment_box'
        }
        str += '" style="position:relative;z-index:11;">'
        /*if(imgPayBtn){
					str += '<div class="box_title"></div>';
				}else{*/
        if (!imgPayBtn) {
          str +=
            '<div class="box_title">成为订阅用户<br />阅读十几万篇高质量报道</div>'
        }

        str += '<dl>'
        str +=
          '<a href="javascript:openLoginWindow();" class="button js-openLoginChooseLayer" target="_self">'
        ////str += '<dt>'+ btnShowVal +'<em><img src="http://file.caixin.com/static/mh5/images/arrow.png"></em></dt>';
        if (WS30BUHUO) {
          str +=
            '<dt><img src="//file.caixin.com/images/pay-ws30-img.jpg"></dt>'
        } else if (PRO) {
          if (upgradeProPayBtn) {
            str +=
              '<dt><img src="//file.caixin.com/appchannel/all/img/upgrade-pro-img.jpg"></dt>'
          } else {
            str +=
              '<dt><img src="//file.caixin.com/appchannel/all/img/pay-pro-img.jpg"></dt>'
          }
        } else if (upgradePayBtn) {
          str +=
            '<dt><img src="//file.caixin.com/appchannel/all/img/upgrade-img.jpg"></dt>'
        } else if (imgPayBtn) {
          str +=
            '<dt><img src="//file.caixin.com/appchannel/all/img/pay-img.jpg"></dt>'
        } else {
          str +=
            '<dt>' +
            btnShowVal +
            '<em><img src="//file.caixin.com/static/mh5/images/arrow.png"></em></dt>'
        }

        str += '</a>'
        str +=
          '<dd>' +
          noLoginSjjWarn +
          '已购买用户请<span><a href="javascript:openLoginWindow();" class="button js-openLoginChooseLayer" target="_self">立即登录</a></span></dd>'
        str += '</dl>'
        str += '</div>'
      }
    }

    $(function() {
      var html = $('.news-ad .adsame-banner-box').html()
      if (html) {
        $('#chargeWall').append(
          "<div  style='position:relative;padding: 0 20px 24px 20px;'>" +
            html +
            '</div>'
        )
      }
    })
    str += '</div>'
    $('#loadinWall').hide()
    $('#chargeWall').show()
    return str
  },
  showProduct: function(channel) {
    if (typeof statisticsAuthNewLogUrl != 'undefined') {
      $('#pay-box').append(
        '<img style="height:0;" src="' +
          statisticsAuthNewLogUrl +
          '&isEvent=1&eventName=ClickSubscribe" />'
      )
    }
    if (channel) {
      Config.channel = channel
    } else {
      try {
        if (entity.category.indexOf('100300263') != -1) {
          Config.channel = 'VIDEO'
        }
        if (entity.category.indexOf('100701768') != -1) {
          Config.channel = 'CNBC'
        }
      } catch (err) {}
    }
    $('#pay-box').show()
  }
}

//业务辅助方法
var Logic = {
  getPage: function() {
    var matcher = Config.curl.match(/(\?|\&)p(\d+)/i)
    if (!matcher) {
      Config.currentPage = 1
    } else {
      try {
        Config.currentPage = parseInt(matcher[2], 10)
      } catch (e) {
        Config.currentPage = 1
      }
    }
    if (Logic.currentPage < 0) {
      Config.currentPage = 1
    }
    return Config.currentPage
  },
  isLogin: function() {
    return GetCookieValue('SA_USER_UID') && GetCookieValue('SA_USER_NICK_NAME')
      ? true
      : false
  },
  isProFromChannle: function() {
    return Utils.isOrTrem([
      entity.fromchannel.indexOf('22') != '-1',
      entity.fromchannel.indexOf('19') != '-1' && entity.ispro > 0
    ])
  },
  clearCookie: function() {
    SetCookieValue('SA_USER_DEVICE_TYPE', '', 1)
    SetCookieValue('SA_USER_UNIT', '', 1)
    SetCookieValue('SA_USER_USER_NAME', '', 1)
    SetCookieValue('USER_LOGIN_CODE', '', 1)
    SetCookieValue('SA_USER_NICK_NAME', '', 1)
    SetCookieValue('SA_USER_UID', '', 1)
    SetCookieValue('SA_USER_auth', '', 1)
    SetCookieValue('UID', '', 1)
  }
}

//权限方法
var auth = {
  grade: 0,
  hasAuth: function(fn) {
    _DataJson = Config._DataJson
    //return (data.status == 3)? true: false;
    if (_DataJson.status == 3) {
      SetCookieValue('SA_USER_AUTH_Statistics', '1', 1)
      var jslink = document.createElement('script')
      jslink.src = 'https://www.googletagmanager.com/gtag/js?id=UA-27956240-3'
      document.body.appendChild(jslink)
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', 'UA-27956240-3')
      if (typeof _DataJson.ka != 'undefined') {
        tongji('send', 'event', 'KA', _DataJson.ka)
      }
      if (
        entity.ispro > 0 ||
        (entity.fromchannel.split(',').length == 1 &&
          entity.fromchannel.indexOf('22') != '-1')
      ) {
        //redpacketShare();
      } else if (entity.redpacket == '1') {
        var fromchann = entity.fromchannel
        if (
          fromchann.indexOf('16') != '-1' &&
          window.haveAuth.indexOf('QZSF') != '-1'
        ) {
          redpacketShare()
        }
        if (
          fromchann.indexOf('19') != '-1' &&
          window.haveAuth.indexOf('CXZK') != '-1'
        ) {
          redpacketShare()
        }
        if (
          fromchann.indexOf('20') != '-1' &&
          window.haveAuth.indexOf('WSXXBG') != '-1'
        ) {
          redpacketShare()
        }
        if (
          fromchann.indexOf('22') != '-1' &&
          window.haveAuth.indexOf('PRO') != '-1'
        ) {
          redpacketShare()
        }
        if (
          fromchann.indexOf('15') != '-1' &&
          window.haveAuth.indexOf('NOVEL-CL') != '-1'
        ) {
          redpacketShare()
        }
        if (
          fromchann.indexOf('21') != '-1' &&
          window.haveAuth.indexOf('XPJTK') != '-1'
        ) {
          redpacketShare()
        }
        if (fromchann.indexOf('23') != '-1') {
          redpacketShare()
        }
        //if(window.haveAuth.split(',').length > 1 && window.haveAuth.indexOf('DPSF') != '-1') {
        //}else {
        //redpacketShare();
        //}
      }
      $('.news-photo').show()
      $('.artPicMain img').show()
      $('.hideimgcontent').css({
        height: 'auto',
        overflow: 'auto'
      })
      $('#Main_Content_Val').show()
      $('.hideimgcontent').show()
      $('.voice').show()
      fn && fn(_DataJson)
      $('#chargeWall').hide()
      this.grade++
      try {
        if (isAuth == 'isauth') {
          zhAHasauthButFn()
        } else {
        }
      } catch (e) {}
    }
  },
  Invalid: function(fn) {
    _DataJson = Config._DataJson
    if (_DataJson.status == '-7' || _DataJson.status == '-8') {
      fn && fn(_DataJson)
      this.grade++
      try {
        if (isAuth == 'isauth') {
          zhANoauthButFn()
        } else {
        }
      } catch (e) {}
    }
  },
  noAuth: function(fn) {
    _DataJson = Config._DataJson
    if (this.grade < 1 || _DataJson.status != 3) {
      wxDpsf.goPayDpsf()
      fn && fn(_DataJson)
      try {
        if (isAuth == 'isauth') {
          zhANoauthButFn()
        } else {
        }
      } catch (e) {}
    }
  }
}

// $(function(){
// 	if(entity.ispro > 0 || (entity.fromchannel.split(',').length < 2 && entity.fromchannel.indexOf("22") != '-1')) {
// 		document.oncontextmenu = function(){return false};
// 	    document.oncopy = function(){return false};
// 	    document.onselectstart = function(){return false};
// 	}
// })

/*
 * getShopList：获取展示产品类型
 * isType： 判断渠道
 * getListType：设置产品类型
 * listData： 初始化产品类型
 * init： 初始化产品类型
 */
var getShopList = {
  isType: function() {
    this.listData = []
    if (entity.ispro > 0) {
      window.btnShowVal = '数据通收费文章，请付费阅读'
      if (entity.fromchannel.indexOf('22') == '-1') {
        if (entity.fromchannel.split(',').length > 0) {
          entity.fromchannel += ',22'
        } else {
          entity.fromchannel += '22'
        }
      }
      this.listData.push('PRO')
      this.listData.push('PRO1')
      if (
        window.haveAuth.indexOf('CXZK') != '-1' &&
        window.haveAuth.indexOf('QZSF') == '-1'
      ) {
        this.listData.push('SJPRO')
        window.btnShowVal = '数据通收费文章，请升级后阅读'
        window.getSpeSjjWarn = '您是周刊通订阅用户'
      }
      if (
        window.haveAuth.indexOf('QZSF') != '-1' &&
        window.haveAuth.indexOf('CXZK') == '-1'
      ) {
        this.listData.push('SJPRO2')
        window.btnShowVal = '数据通收费文章，请升级后阅读'
        window.getSpeSjjWarn = '您是财新通订阅用户'
        window.qzsfToProMsg = '免费试读两周'
      }
      if (
        window.haveAuth.indexOf('QZSF') != '-1' &&
        window.haveAuth.indexOf('CXZK') != '-1'
      ) {
        this.listData.push('SJPRO2')
        window.btnShowVal = '数据通收费文章，请升级后阅读'
        window.getSpeSjjWarn = '您是财新通订阅用户'
        window.qzsfToProMsg = '免费试读两周'
      }

      return false
    }

    if (entity.fromchannel.indexOf('16') != '-1') {
      this.listData.push('QZSF')
      this.listData.push('QZSF1')
    }

    if (entity.fromchannel.indexOf('16') != '-1') {
      this.upgradeQZSF()
      //this.listData.push('QZSF');
    }

    if (entity.fromchannel.indexOf('19') != '-1') {
      if (entity.ispro < 1) {
        //this.listData.push('CXZK');
        //this.listData.push('CXZK2');
      }
    }

    if (entity.ispro > 0) {
      //this.upgradePRO();
      if (entity.fromchannel.indexOf('22') == '-1') {
        if (entity.fromchannel.split(',').length > 0) {
          entity.fromchannel += ',22'
        } else {
          entity.fromchannel += '22'
        }
      }
      this.listData.push('PRO')
      this.listData.push('PRO1')
      //return false;
    }

    if (entity.fromchannel.indexOf('22') != '-1' || entity.ispro > 0) {
      //this.upgradePRO();
      //this.listData.push('PRO');
      if (entity.fromchannel.indexOf('16') != '-1') {
        //this.listData.push('PRO');
      } else {
        if (entity.fromchannel.indexOf('19') != '-1') {
          //this.listData.push('PRO');
        } else {
          this.listData.push('PRO')
          this.listData.push('PRO1')
        }
      }
    }

    if (entity.fromchannel.indexOf('22') != '-1' || entity.ispro > 0) {
      window.btnShowVal = '数据通收费文章，请付费阅读' //*******************
      this.upgradePRO()
      //this.listData.push('PRO');
    }

    //财新通，周刊通，赤龙，谢平，王烁，数据+，单篇
    /*if(entity.fromchannel.indexOf('16') != '-1') {
			this.listData.push('QZSF');
		}*/

    if (entity.fromchannel.indexOf('15') != '-1') {
      this.listData.push('NOVEL-CL')
    }

    if (entity.fromchannel.indexOf('21') != '-1') {
      this.listData.push('XPJTK')
    }

    if (entity.fromchannel.indexOf('20') != '-1') {
      this.listData.push('WSXXBG')
    }

    if (entity.fromchannel.indexOf('23') != '-1') {
      this.listData.push('WS-30BUHUO')
    }
    getShopList.btnText()
    /*if(entity.fromchannel.indexOf('17') != '-1') {
			if(entity.ispro < 1) {
				this.listData.push('QZSF');
			}
		}	*/
  },
  listData: [],
  getListType: function() {
    this.isType()
    /*if(entity.ispro > 0) {
			return false;
		}*/
  },
  arrayrepeat: function(array) {
    var arr = []
    for (var i = 0; i < array.length; i++) {
      if (arr.indexOf(array[i]) == '-1') {
        arr.push(array[i])
      }
    }
    return arr
  },
  getResultParams: function() {
    var paramsObj = GetOrderTrem
    this.getListType()
    var reqVal = []
    this.listData = this.arrayrepeat(this.listData)
    for (var i = 0, len = this.listData.length; i < len; i++) {
      reqVal.push(paramsObj[this.listData[i]])
    }
    return reqVal
  },
  init: function() {
    return this.getResultParams()
  },
  btnText: function() {
    if (
      (entity.ispro > 0 || entity.fromchannel.indexOf('22') != '-1') &&
      entity.fromchannel.indexOf('19') != '-1'
    ) {
      if (
        window.haveAuth.indexOf('CXZK') == '-1' &&
        window.haveAuth.indexOf('QZSF') != '-1' &&
        window.haveAuth.indexOf('PRO') == '-1'
      ) {
        window.btnShowVal = '财新网收费文章，请付费阅读'
      }
    }
    //只有周刊通和数据通权限，收费文章渠道选择财新通
    if (entity.fromchannel.indexOf('16') != '-1') {
      if (
        window.haveAuth.indexOf('CXZK') != '-1' &&
        window.haveAuth.indexOf('QZSF') == '-1' &&
        window.haveAuth.indexOf('PRO') != '-1'
      ) {
        window.btnShowVal = '财新通收费文章，请升级后阅读'
        window.getSpeSjjWarn = '您是周刊通订阅用户'
      }
    }
    //只有数据通权限，收费文章渠道选择周刊通或财新通或周刊通+财新通，购买按钮下面应该显示您是数据通订阅用户
    if (
      window.haveAuth.indexOf('CXZK') == '-1' &&
      window.haveAuth.indexOf('QZSF') == '-1' &&
      window.haveAuth.indexOf('PRO') != '-1'
    ) {
      if (entity.fromchannel.indexOf('16') != '-1') {
        window.getSpeSjjWarn = '您是数据通订阅用户'
      }
      if (entity.fromchannel.indexOf('19') != '-1') {
        window.getSpeSjjWarn = '您是数据通订阅用户'
      }
      if (
        entity.fromchannel.indexOf('19') != '-1' &&
        entity.fromchannel.indexOf('16') != '-1'
      ) {
        window.getSpeSjjWarn = '您是数据通订阅用户'
      }
    }
    //只有财新通和数据通权限，收费文章渠道选择周刊通，文章详情页购买按钮下方应该显示“您是数据通订阅用户”
    if (
      window.haveAuth.indexOf('CXZK') == '-1' &&
      window.haveAuth.indexOf('QZSF') != '-1' &&
      window.haveAuth.indexOf('PRO') != '-1'
    ) {
      if (entity.fromchannel.indexOf('19') != '-1') {
        window.getSpeSjjWarn = '您是数据通订阅用户'
      }
    }
    //只有财新通权限，收费文章渠道选择周刊通，购买按钮下面应该显示您是财新通订阅用户
    if (
      window.haveAuth.indexOf('CXZK') == '-1' &&
      window.haveAuth.indexOf('QZSF') != '-1' &&
      window.haveAuth.indexOf('PRO') == '-1'
    ) {
      if (entity.fromchannel.indexOf('19') != '-1') {
        window.btnShowVal = '全网畅读  请选择订阅方式'
        window.getSpeSjjWarn = '您是财新通订阅用户'
        window.qzsfToProMsg = '免费试读两周'
      }
    }

    if (
      entity.fromchannel.indexOf('19') != '-1' &&
      entity.fromchannel.indexOf('22') != '-1'
    ) {
      window.btnShowVal = '全网畅读  请选择订阅方式'
    }

    if (
      entity.fromchannel.indexOf('16') != '-1' &&
      entity.fromchannel.indexOf('22') != '-1'
    ) {
      window.btnShowVal = '全网畅读  请选择订阅方式'
      if (window.haveAuth.indexOf('CXZK') != '-1') {
        window.btnShowVal = '财新通收费文章，请升级后阅读'
      }
    }

    if (
      entity.fromchannel.indexOf('19') != '-1' &&
      entity.fromchannel.indexOf('22') != '-1' &&
      entity.fromchannel.indexOf('16') != '-1'
    ) {
      window.btnShowVal = '全网畅读  请选择订阅方式'
    }
  },
  upgradePRO: function() {
    _this = this
    if (
      window.haveAuth.indexOf('CXZK') != '-1' &&
      window.haveAuth.indexOf('QZSF') == '-1' &&
      window.haveAuth.indexOf('PRO') == '-1'
    ) {
      window.btnShowVal = '财新通收费文章，请升级后阅读'
      window.getSpeSjjWarn = '您是周刊通订阅用户'
      if (entity.fromchannel.indexOf('16') != '-1') {
        _this.listData.push('SJQZSF')
      } //else{
      if (
        (entity.fromchannel.indexOf('16') != '-1' ||
          entity.fromchannel.indexOf('19') != '-1') &&
        (entity.fromchannel.indexOf('22') != '-1' || entity.ispro > 0)
      ) {
      } else {
        _this.listData.push('SJPRO')
      }
      window.btnShowVal = '数据通收费文章，请升级后阅读'
      //}
    }
    if (
      window.haveAuth.indexOf('QZSF') != '-1' &&
      window.haveAuth.indexOf('PRO') == '-1'
    ) {
      window.btnShowVal = '数据通收费文章，请升级后阅读'
      window.getSpeSjjWarn = '您是财新通订阅用户'
      window.qzsfToProMsg = '免费试读两周'
      //_this.listData.push('SJPRO2');
      if (
        (entity.fromchannel.indexOf('16') != '-1' ||
          entity.fromchannel.indexOf('19') != '-1') &&
        (entity.fromchannel.indexOf('22') != '-1' || entity.ispro > 0)
      ) {
      } else {
        _this.listData.push('SJPRO2')
      }
    }
  },
  upgradeQZSF: function() {
    _this = this
    if (
      window.haveAuth.indexOf('CXZK') != '-1' &&
      window.haveAuth.indexOf('QZSF') == '-1'
    ) {
      window.btnShowVal = '财新通收费文章，请升级后阅读'
      window.getSpeSjjWarn = '您是周刊通订阅用户'
      if (window.haveAuth.indexOf('PRO') != '-1') {
        window.getSpeSjjWarn = '您是数据通订阅用户'
      } else {
        _this.listData.push('SJQZSF')
      }
      //_this.listData.push('SJPRO');
    }
    if (
      window.haveAuth.indexOf('CXZK') != '-1' &&
      window.haveAuth.indexOf('QZSF') == '-1' &&
      window.haveAuth.indexOf('PRO') != '-1'
    ) {
      _this.listData.push('SJQZSF')
    }
  }
}

/*
 * logic实例支持整个文章逻辑
 * action: 对应开发功能
 *		getPage 获取页数
 *		readyContentInfo 获取正文（包含分页）内容
		resetContentInfo 获取v55返回的权限内容并初始化
		buildContentInfo 初始化加载loading函数
		writeContentData 分页数据内容
 */

var domain = {
  readyContentInfo: function() {
    Logic.getPage()
    //if(Logic.isLogin()){
    var v55params = {
      type: 1,
      id: srcinfoid,
      page: Config.currentPage,
      rand: Math.random()
    }
    if (entity.fromchannel == '22' || entity.ispro > 0) {
    } else {
      var pre = document.referrer
      if (/http/.test(pre)) {
        var source = pre.slice(0, pre.indexOf('?'))
        var feeCode = Utils.getQueryString('f')
      }
      v55params['source'] = source
      v55params['feeCode'] = Utils.getQueryString('f')
    }
    window.v55params = v55params
    /*$("<scri" + "pt>" + "</scr" + "ipt>").attr({
			  src: Config.gatewayApis + "api/auth/NewsV56.jsp" + Utils.jsonToString(v55params),
			  type: "text/javascript",
			  id: "load"
			}).appendTo($("head"));*/
    $.ajax({
      url: '//gateway.caixin.com/api/newauth/checkAuthByIdJsonp',
      type: 'GET',
      data: v55params,
      dataType: 'jsonp',
      success: function(res) {
        eval(res.data)
      },
      error: function() {

      }
    })
    //}
    $('#chargeWall').hide()
    $('#loadinWall').hide()
    $('#chargeWall').show()
  },
  resetContentInfo: function(data) {
    Config._DataJson = data
    if (typeof data.haveAuth != 'undefined') {
      window.haveAuth = data.haveAuth
    } else {
      window.haveAuth = ''
    }
    Config._JsonIsOK = true
    if (Config._HtmlIsOK) {
      domain.writeContentInfo()
    }
    bigCustomer(data)
  },
  writeContentInfo: function() {
    if (!Config._DataJson) {
      return false
    }
    if (!GetCookieValue('SA_USER_UID') && Config._DataJson.status != 3) {
      Config._DataJson = {
        status: -1000,
        magazinetype: -1000
      }
    }
    auth.Invalid(function(_DataJson) {
      try {
        if (oneline == 'isTrue') {
          $('.freeConBox')
            .show()
            .css({ background: '#fff' })
        }
      } catch (e) {}
      // Logic.clearCookie();
      if (_DataJson.status == '-8') {
        alert('登录失效请重新登录')
        Logic.clearCookie()
        window.location.reload()
      } else {
        $.ajax({
          url: 'https://gateway.caixin.com/api/ucenter/user/v1/logout',
          type: 'GET',
          dataType: 'jsonp',
          success: function(res) {
            if (res.code == 0) {
              alert(
                '你的帐号已在其他设备上进行登录，本机登录失效，请重新登录。'
              )
              Logic.clearCookie()
              window.location.href =
                'http://u.caixin.com/user/uc/logout.html?url=' +
                encodeURIComponent(window.location.href)
            } else {
              window.location.reload()
            }
          }
        })
      }
    })
    auth.hasAuth(function(_DataJson) {
      try {
        if (oneline == 'isTrue') {
          if (comeFrom() == 'ANDROID') {
            try {
              caixin.getOneLinePowerSuccess()
            } catch (e) {}
          }
          loaded()
          $('.listConBox').html('')
          document.addEventListener(
            'touchmove',
            function(e) {
              e.preventDefault()
            },
            false
          )
          $('#wrapper').show()
          $('#pullDown,#pullUp').show()
          $('#pullDown').css('padding-top', '10px')
          $('.listConBox').css('margin-top', '.78rem')
          addMore()
          // if (
          //   !/\<time/.test(
          //     $('.listConBox')
          //       .first()
          //       .html()
          //   )
          // ) {
          //   var myDate = new Date()
          //   $('.listConBox').prepend(
          //     '<time>' +
          //       myDate.getFullYear() +
          //       '年' +
          //       (myDate.getMonth() + 1) +
          //       '月' +
          //       myDate.getDate() +
          //       '日</time>'
          //   )
          // }
        }
      } catch (e) {}
      $('.audio_area,.news-audio').show()
      $('.main-all').show()
      layer.closeAll()
      domain.writeContentData()
      if (typeof replaceStock != 'undefined') {
        replaceStock()
      }
      if (typeof replaceBond != 'undefined') {
        replaceBond()
      }
      $('#loadinWall').hide()
      $('#chargeWall').show()
      $('#mainLivePart_6').css({ height: 'auto', overflow: 'auto' })
      $('.showbtn').hide()
      if (entity.attr == 4) {
        $('#chargeWall').remove()
      }
      return false
    })
    auth.noAuth(function(_DataJson) {
      try {
        if (oneline == 'isTrue') {
          $('.freeConBox')
            .show()
            .css({ background: '#fff' })
        }
      } catch (e) {}
      if (entity.id == 101216173) {
        location.href = 'http://m.database.caixin.com/m/purchase/'
        return false
      }
      if (
        /learn\.caixin\.com/.test(window.location.href) &&
        /\.html/.test(window.location.href)
      ) {
        $('.audio_area,.news-audio').hide()
        $('#Main_Content_Val').css({ 'margin-top': '10px' })
      }
      var getshoplistinit = getShopList.init()
      window.getshoplistinit = getshoplistinit
      /////***/////////

      var sjMap = {
        /*'CXZK_TO_QZSF':647,
				'CXZK_TO_PRO': 648,
				'QZSF_TO_PRO':654*/
        CXZK_TO_QZSF: 664,
        CXZK_TO_PRO: 674,
        QZSF_TO_PRO: 665
      }

      var sjArr = []
      var sjArrNew = []
      if (GetCookieValue('SA_USER_UID') != '') {
        $.ajax({
          url:
            'https://gateway.caixin.com/api/authority/upgradeProduct/v1/allowUpgrade',
          type: 'get',
          data: {
            uid: GetCookieValue('SA_USER_UID'),
            code: 'CXZK_TO_QZSF,CXZK_TO_PRO,QZSF_TO_PRO'
          },
          dataType: 'jsonp',
          success: function(data) {
            if (data.code == 0) {
              var result = data.data
              for (var key in result) {
                if (!result[key].isPurchase) {
                  sjArr.push(key)
                }
              }

              for (var keys in sjMap) {
                if (sjArr.indexOf(keys) != -1) {
                  sjArrNew.push(sjMap[keys])
                }
              }

              for (var i = 0; i < getshoplistinit.length; i++) {
                if (sjArrNew.indexOf(getshoplistinit[i].goodsId) != -1) {
                  getshoplistinit.splice(i, 1)
                  i--
                }
              }

              // var sddy = null;
              // var itemsNum = 0;
              // for(var i=0;i< getshoplistinit.length;i++) {
              // 	if(getshoplistinit[i].goodsId == 647 || getshoplistinit[i].goodsId == 648 || getshoplistinit[i].goodsId == 654) {
              // 		itemsNum++
              // 	}
              // }
              // for(var i=0;i< getshoplistinit.length;i++) {
              // 	if(getshoplistinit[i].goodsId == 692) {
              // 		sddy = getshoplistinit[i];
              // 		getshoplistinit.splice(i, 1);
              // 		getshoplistinit.splice(itemsNum--,0,sddy);
              // 	}
              // }

              getProductList.writeProductList(
                Utils.formatData({
                  req: getshoplistinit
                })
              )
            }
            //alert(JSON.stringify(data))
          }
        })
      }
      /////***/////////
      /*数字说单篇提示 start*/
      if (typeof wapSpeCostTmp != 'undefined') {
        if (comeFrom() == 'IOS') {
          setTimeout(function() {
            var getAppstoreOrderListStr = ''
            if (caixin != 'undefined') {
              getAppstoreOrderListStr = caixin.getAppstoreOrderList()
            }
            if (!getAppstoreOrderListStr) {
              getAppstoreOrderListStr = ''
            }

            //if(typeof getAppstoreOrderListStr == 'string') {
            if (getAppstoreOrderListStr.length > 0) {
              var getAppstoreOrderListStr = getAppstoreOrderListStr.slice(1)
              getAppstoreOrderListStr = getAppstoreOrderListStr.slice(
                0,
                getAppstoreOrderListStr.length - 1
              )
              getAppstoreOrderListStr = getAppstoreOrderListStr.replace(
                /\"/g,
                ''
              )
            }
            //}else {
            //	getAppstoreOrderListStr = "";
            //}
            $.ajax({
              url: 'https://gateway.caixin.com/api/purchase/auth/validate',
              type: 'get',
              data: {
                productIdList: codeIdChat(getShopList.listData).join(','),
                articleId: entity.srcinfoid,
                appstoreOrderIdList: getAppstoreOrderListStr,
                uid: GetCookieValue('SA_USER_UID'),
                code: GetCookieValue('USER_LOGIN_CODE'),
                unit: GetCookieValue('SA_USER_UNIT'),
                deviceType: GetCookieValue('SA_USER_DEVICE_TYPE')
              },
              dataType: 'jsonp',
              success: function(data) {
                if (data.code == 0 && data.data.power != 0) {
                  $('#chargeWall').hide()
                } else {
                  $('#chargeWall')
                    .html(wapSpeCostTmp())
                    .show()
                }
              }
            })
          }, 1000)
          return false
        } else {
          $('#chargeWall')
            .html(wapSpeCostTmp())
            .show()
          return false
        }
      }
      /*数字说单篇提示 end*/
      if (typeof entity.attr != 'undefined') {
        if (entity.attr != 4) {
          if (
            window.location.href.indexOf('video.caixin.com') != '-1' ||
            window.location.href.indexOf('gbiz.caixin.com') != '-1'
          ) {
            $('#chargeWall .content').html(showUI.getVideoTitleTmpHtml())
          } else {
            $('#chargeWall .content').html(showUI.getTitleTmpHtml())
            wxDpsf.entity()
          }
          //$("#chargeWall .content").html(showUI.getTitleTmpHtml());
          getWordNum()
        } else {
          if (!Logic.isLogin()) {
            $('#cons').css({ 'padding-bottom': '100px' })
          } else {
          }
        }
      } else {
        //$("#chargeWall .content").html(showUI.getTitleTmpHtml());
        if (
          window.location.href.indexOf('video.caixin.com') != '-1' ||
          window.location.href.indexOf('gbiz.caixin.com') != '-1'
        ) {
          $('#chargeWall .content').html(showUI.getVideoTitleTmpHtml())
        } else {
          $('#chargeWall .content').html(showUI.getTitleTmpHtml())
        }
        getWordNum()
      }
    })
  },
  buildContentInfo: function() {
    Config._HtmlIsOK = true
    var html = '<div id="loadinWall" class="loading">'
    html +=
      '<img src="//file.caixin.com/file/content/images/loading.gif">页面加载中...'
    html += '</div>'
    $('#Main_Content_Val').after(html)
    if (Config._JsonIsOK) {
      setTimeout(function() {
        domain.writeContentInfo()
      }, 500)
    }
    if (!GetCookieValue('SA_USER_UID')) {
      domain.writeContentInfo()
    }
    $('#chargeWall').hide()
  },
  writeContentData: function() {
    var pagebar = $('#pageBtn')
    var _DataJson = Config._DataJson
    var currentPage = Config.currentPage
    var param_other = ''
    if (_DataJson != null && _DataJson.status > 0) {
      pagebar.empty()
      $('.pip_none').show()
      $('#Main_Content_Val').html(_DataJson.content)
      if (typeof addStockAndBond != 'undefined') {
        addStockAndBond()
      }
      $(function() {
        getAdPosition()
      })
      if ($('.media_video').length > 0) {
        $('.media_video').show()
      }
      if ($('.news-audio').length > 0) {
        $('.news-audio').show()
      }
      if ($('.news-photo').length > 0) {
        $('.news-photo').show()
      }
      if (_DataJson.audioUrl && _DataJson.audioUrl != '') {
        audioPath = _DataJson.audioUrl
        $('.vioce-box-cons').show()
      }
      if (_DataJson.totalPage > 1) {
        //处理数字页码
        if (currentPage > 1) {
          //处理上一页
          $('<a>上一页</a>')
            .attr('target', '_self')
            .attr('href', '?p' + (currentPage - 1) + param_other)
            .appendTo(pagebar)
        }
        if (currentPage < _DataJson.totalPage) {
          //处理下一页
          $('<a>下一页</a>')
            .attr('target', '_self')
            .attr('href', '?p' + (currentPage + 1) + param_other)
            .appendTo(pagebar)
        }
        if (_DataJson.totalPage > 1 && _DataJson.totalPage != currentPage) {
          $('<a>余下全文</a>')
            .attr('target', '_self')
            .attr(
              'href',
              '?p0' + param_other + '#page' + (parseInt(currentPage) + 1)
            )
            .appendTo(pagebar)
        }
        $('#pageNav')
          .children('#purl' + _DataJson.page)
          .addClass('cur')
          .children('a')
          .attr('href', 'javascript:void(0);')
        $('#pageNext').prepend('<div class="news-page-nav">本文导航</div>')
        $('#pageBtn').show()
        $('#pageNav').show()
      }
      if (_DataJson.page == 0) {
        var vHash = window.location.hash
        if (vHash != '') {
          window.location.href = vHash
        }
      }
    } else {
      $('#loadinWall').hide()
      $('#chargeWall').show()
    }
  }
}
// 打折券
var discountCoupon = {
  formatNum: function(price) {
    var str = price.toString()
    var arr = str.match(/\d+\.\d{2}/g)
    if (arr) {
      return arr[0] * 1
    } else {
      return price * 1
    }
  },
  formatNum6: function(price) {
    var str = price.toString()
    var arr = str.match(/\d+\.\d{2,6}/g)
    if (arr) {
      return arr[0] * 1
    } else {
      return price * 1
    }
  },
  getDisCount: function(price, coupon, amt) {
    var disCount = (price * (100 - coupon * 10)) / 100
    return amt ? this.formatNum6(disCount) : this.formatNum(disCount)
  },
  getRealPrice: function(price, coupon) {
    return this.formatNum(price - this.getDisCount(price, coupon))
  }
}
var Payment = {
  singlePay: function() {
    if (!window.Config.singlePay) {
      return false
    }
    window.Config.singlePay = false
    var goodsid = $('.now').attr('goodsid')
    var trialpricecost = $('.now').attr('trialpricecost')
    var extStr3 = $('.now h4').html()
    var goodsprice = parseFloat(
      $('.dialoguebox .middle .butlist div span').html()
    )
    var goodspricetrial = window.nowProce
    if ($('.now').attr('trialprice') != 'null') {
      if (canTrial[goodsid]) {
        goodspricetrial = trialpricecost
        goodsprice = 0
      } else {
        goodspricetrial = window.nowProce
      }
    }

    var specid = $('.now').attr('specid')
    var goodsname = $('.now h4').html()
    if (goodsid == 1) {
      if (typeof statisticsAuthNewLogUrl != 'undefined') {
        $('#pay-box').append(
          '<img style="height:0;" src="' +
            statisticsAuthNewLogUrl +
            '&isEvent=1&eventName=ClickPay&extNum3=' +
            srcinfoid +
            '" />'
        )
      }
      this.payMagazine(5)
      if (_DataJson.total - _DataJson.count == 0) {
        tongji(
          'send',
          'event',
          'WAPSINGLE' + srcinfoid + 'OverBuy',
          'Buy',
          'ZKSell'
        )
      } else {
        tongji(
          'send',
          'event',
          'WAPSINGLE' + srcinfoid + 'ingBuy',
          'Buy',
          'ZKSell'
        )
      }
    } else {
      if (typeof statisticsAuthNewLogUrl != 'undefined') {
        $('#pay-box').append(
          '<img style="height:0;" src="' +
            statisticsAuthNewLogUrl +
            '&isEvent=1&eventName=ClickPay&extNum3=' +
            goodsid +
            '&extStr3=' +
            decodeURIComponent(extStr3) +
            '" />'
        )
      }
      this.payMagazine(
        1,
        goodsid,
        goodsprice,
        specid,
        goodsname,
        goodspricetrial
      )
      if (_DataJson.total - _DataJson.count == 0) {
        tongji(
          'send',
          'event',
          'WAPCXZK' + goodsid + 'OverBuy',
          'Buy',
          'ZKSell'
        )
      } else {
        tongji('send', 'event', 'WAPCXZK' + goodsid + 'ingBuy', 'Buy', 'ZKSell')
      }
    }
  },
  payMagazine: function(
    mediaType,
    goodsId,
    goodsPrice,
    specId,
    goodsname,
    goodspricetrial
  ) {
    /*if($('.now').attr('trialprice') != "null") {
			goodsPrice = $('.now').attr('trialpricecost');
		}*/
    var params = {
      platform: 'WAP',
      price: goodspricetrial,
      quantity: 1,
      shippingFee: 0,
      goodsId: goodsId,
      //orderAmount: goodsPrice,
      specId: specId,
      channel: window.Config.channel,
      orderAmount: goodspricetrial, //window.nowProce,
      goodsName: goodsname
      // postscript: "测试"
    }

    for (var i = 0; i < window.maVoRules.length; i++) {
      if (window.maVoRules[i].voucherId == $('.chx').attr('pid')) {
        couponCode = window.maVoRules[i].voucherId
        couponName = window.maVoRules[i].marketVouchersRules.vouchersTitle
        couponAmount =
          window.maVoRules[i].marketVouchersRules.vouchersDiscountMoney
        vouchersType = window.maVoRules[i].marketVouchersRules.vouchersType
        if (vouchersType == 1) {
          if (window.nowProce - couponAmount < 0) {
            params.realPayAmount = 0 // 实际支付价格
            params.discountAmt = window.nowProce //  减免金额 （单位为元）
            //params['couponList[0].amt'] = window.nowProce;
          } else {
            params.realPayAmount = (window.nowProce - couponAmount).toFixed(6)
            params.discountAmt = couponAmount
          }
        } else if (vouchersType == 2) {
          params.realPayAmount = discountCoupon.getRealPrice(
            window.nowProce,
            couponAmount
          )
          params.discountAmt = discountCoupon.getDisCount(
            window.nowProce,
            couponAmount
          )
          couponAmount = discountCoupon.getDisCount(
            window.nowProce,
            couponAmount,
            true
          )
        } else if (vouchersType == 3) {
          params.realPayAmount = 0
          params.discountAmt = window.nowProce
          couponAmount = window.nowProce
        }
        params['couponList[0].amt'] = couponAmount
        params['couponList[0].couponId'] = couponCode
        params['couponList[0].voucherOrCode'] = 1
        break
      }
    }

    if (mediaType == 1) {
      $.ajax({
        url: gatewayApi + 'api/mall/unifiedOrders',
        data: params,
        dataType: 'jsonp',
        success: function(res) {
          window.Config.singlePay = true
          if (res.code == 0) {
            // window.location.href =
            //   payUrl +
            //   '?orderSn=' +
            //   res.data.orderSn +
            //   '&backUrl=' +
            //   encodeURIComponent(
            //     window.location.href.indexOf('?') > 0
            //       ? window.location.href.substr(
            //           0,
            //           window.location.href.indexOf('?')
            //         )
            //       : window.location.href
            //   )
            console.log(res);
            var url = payUrl + '?orderSn=' + res.data.orderSn + '&backUrl=';
            if(targetBackUrl){
              url += targetBackUrl;
            }else{
                url +=
                encodeURIComponent(
                  window.location.href.indexOf('?') > 0
                    ? window.location.href.substr(
                        0,
                        window.location.href.indexOf('?')
                      )
                    : window.location.href
                )
            }
            window.location.href = url ;
          } else {
            if (res.code == 4061) {
              layer.confirm(
                '您已开通该商品续订服务，继续购买请先取消续订',
                {
                  title: false,
                  fixed: true,
                  btn: ['取消续订', '暂不购买']
                },
                function() {
                  $('.layui-layer-shade,.layui-layer').remove()
                  setTimeout(function() {
                    window.location.href = 'http://u.caixin.com/m/renew.html'
                  }, 10)
                }
              )
            } else {
              alert('购买失败：' + res.msg)
            }
          }
        }
      })
      return false
    }
    if (mediaType != 5) {
      var data = null
      $.ajax({
        url: gatewayApi + 'api/cxmall/api4ExtenSys/findGoodsByListConf',
        data: Utils.formatData(goodsId),
        dataType: 'jsonp',
        success: function(res) {
          window.Config.singlePay = true
          data = res.data.goodList[0]
          if (res.code == 0) {
            $.ajax({
              url: gatewayApi + 'api/mall/unifiedOrders',
              data: params,
              dataType: 'jsonp',
              success: function(res) {
                if (res.code == 0) {
                  // window.location.href =
                  //   payUrl +
                  //   '?orderSn=' +
                  //   res.data.orderSn +
                  //   '&backUrl=' +
                  //   encodeURIComponent(
                  //     window.location.href.indexOf('?') > 0
                  //       ? window.location.href.substr(
                  //           0,
                  //           window.location.href.indexOf('?')
                  //         )
                  //       : window.location.href
                  //   )
                  var url = payUrl + '?orderSn=' + res.data.orderSn + '&backUrl=';
                  if(targetBackUrl){
                    url += targetBackUrl;
                  }else{
                      url +=
                      encodeURIComponent(
                        window.location.href.indexOf('?') > 0
                          ? window.location.href.substr(
                              0,
                              window.location.href.indexOf('?')
                            )
                          : window.location.href
                      )
                  }
                  window.location.href = url ;
                } else {
                  //alert("购买失败：" + res.msg);
                  if (res.code == 4061) {
                    layer.confirm(
                      '您已开通该商品续订服务，继续购买请先取消续订',
                      {
                        title: false,
                        fixed: true,
                        btn: ['取消续订', '暂不购买']
                      },
                      function() {
                        $('.layui-layer-shade,.layui-layer').remove()
                        setTimeout(function() {
                          window.location.href =
                            'http://u.caixin.com/m/renew.html'
                        }, 10)
                      }
                    )
                  } else {
                    alert('购买失败：' + res.msg)
                  }
                }
              }
            })
          } else {
            if (res.code == 4061) {
              layer.confirm(
                '您已开通该商品续订服务，继续购买请先取消续订',
                {
                  title: false,
                  fixed: true,
                  btn: ['取消续订', '暂不购买']
                },
                function() {
                  $('.layui-layer-shade,.layui-layer').remove()
                  setTimeout(function() {
                    window.location.href = 'http://u.caixin.com/m/renew.html'
                  }, 10)
                }
              )
            } else {
              alert('请求商品失败：' + res.msg)
            }
            //alert('请求商品失败：' + res.msg)
          }
        }
      })
    } else {
      tongji('send', 'event', 'SinglePay', decodeURIComponent(share_desc))
      var url = Config.gatewayApis + 'api/article/article/getOrderSn'
      var couponCode = ''
      var couponName = ''
      var couponAmount = ''

      var params = {
        channel: '3001001',
        currency: 'CNY',
        orderGoods: {
          appId: 100,
          goodsCode: entity.id,
          goodsName: '【单篇购买】' + decodeURIComponent(share_desc),
          goodsUrl:
            window.location.href.indexOf('?') > 0
              ? window.location.href.substr(
                  0,
                  window.location.href.indexOf('?')
                )
              : window.location.href
        },
        platform: 'WAP',
        returnUrl:
          window.location.href.indexOf('?') > 0
            ? window.location.href.substr(0, window.location.href.indexOf('?'))
            : window.location.href,
        uid: GetCookieValue('SA_USER_UID')
      }

      for (var i = 0; i < window.maVoRules.length; i++) {
        if (window.maVoRules[i].voucherId == $('.chx').attr('pid')) {
          couponCode = window.maVoRules[i].voucherId
          couponName = window.maVoRules[i].marketVouchersRules.vouchersTitle
          couponAmount =
            window.maVoRules[i].marketVouchersRules.vouchersDiscountMoney
          params.coupons = {
            bizType: 3,
            businessType: '1001',
            category: entity.category.split(';')[0],
            channel: entity.channel, //频道
            couponAmount: couponAmount,
            couponCode: couponCode,
            couponName: couponName,
            form_channel: entity.fromchannel,
            media: entity.media,
            moneyCode: 'RMB',
            systemType: '100102'
          }
          break
        }
      }

      $.ajax({
        url: url,
        data: { vo: JSON.stringify(params) },
        dataType: 'jsonp',
        success: function(res) {
          window.Config.singlePay = true
          if (res.code == 0) {
            // window.location.href =
            //   payUrl +
            //   '?orderSn=' +
            //   res.data.orderSn +
            //   '&backUrl=' +
            //   encodeURIComponent(
            //     window.location.href.indexOf('?') > 0
            //       ? window.location.href.substr(
            //           0,
            //           window.location.href.indexOf('?')
            //         )
            //       : window.location.href
            //   )
            var url = payUrl + '?orderSn=' + res.data.orderSn + '&backUrl=';
            if(targetBackUrl){
              url += targetBackUrl;
            }else{
                url +=
                encodeURIComponent(
                  window.location.href.indexOf('?') > 0
                    ? window.location.href.substr(
                        0,
                        window.location.href.indexOf('?')
                      )
                    : window.location.href
                )
            }
            window.location.href = url ;
          } else {
            if (res.code == 41999) {
              alert(res.msg)
              window.location.reload()
            }
          }
        }
      })
    }
  }
}

/*
 * getProductList: util
 * Public Util Api { getGoodInfo, setTmp, setFiexd, setDefaultCounpon, setStyle, clickFn}
 * getGoodInfo: 获取提示信息
 * setTmp:生成购买列表模板
 * setFiexd: 设置列表定位位置
 * setDefaultCounpon: 初始化金额
 * clickFn: 点击函数
 */
var getProductList = {
  warnInfoarr: [],
  getGoodInfo: function(index) {
    /*if(powerType == "QZSF") {
      $('.couponwarn').html(this.warnInfoarr[0]);
      return false;
    }
    if(powerType == "CXZK") {
      $('.couponwarn').html(this.warnInfoarr[1]);
      return false;
    }
    if(powerType == "PRO") {
      $('.couponwarn').html(this.warnInfoarr[2]);
      return false;
    }
    if(powerType == "XPJTK") {
      $('.couponwarn').html(this.warnInfoarr[3]);
      return false;
    }
    if(powerType == "WSXXBG") {
      $('.couponwarn').html(this.warnInfoarr[4]);
      return false;
    }
    if(powerType == "single") {
      $('.couponwarn').html(this.warnInfoarr[5]);
      return false;
    }*/
    $('.couponwarn').html('注：' + this.warnInfoarr[index])
  },
  getTile: function(powerType, goodsId) {
    if (powerType == 'QZSF') {
      if (goodsId == 692) {
        return '<h4>财新通包月</h4>'
      }
      return '<h4>财新通</h4>'
    }
    if (powerType == 'CXZK') {
      return '<h4>周刊通</h4>'
    }
    if (powerType == 'PRO') {
      if (goodsId == 718) {
        return '<h4>数据通包月</h4>'
      }
      return '<h4>数据通</h4>'
    }
    if (powerType == 'XPJTK') {
      return '<h4>谢平九课堂</h4>'
    }
    if (powerType == 'WSXXBG') {
      return '<h4>王烁学习报告</h4>'
    }
    if (powerType == 'NOVEL-CL') {
      return '<h4>赤龙小说</h4>'
    }
    if (powerType == 'CXZK_TO_QZSF') {
      return '<h4>升级财新通</h4>'
    }
    if (powerType == 'QZSF_TO_PRO' || powerType == 'CXZK_TO_PRO') {
      return '<h4>升级数据通</h4>'
    }
    if (powerType == 'WS-30BUHUO') {
      return '<h4>30天认知训练</h4>'
    }
  },
  setTmp: function(res) {
    var htmlStr =
      '<div class="subtitle"><img src="//file.caixin.com/static/mh5/images/welcome.png" alt="" /></div>'
    htmlStr += '<div class="itemscontnet">'
    htmlStr += '<div class="pricebox">'
    window.cxzknum = 0

    if (res.data == null || res.data == 'null') {
    } else {
      for (i = 0; i < res.data.goodList.length; i++) {
        var goodResult = res.data.goodList[i]
        if (typeof goodResult.introduce != 'undefined') {
          var powerType = goodResult.powerType
          getProductList.warnInfoarr.push(goodResult.introduce)
        } else {
          getProductList.warnInfoarr.push('')
        }
        if (goodResult.isTrial) {
          canTrial[goodResult.goodsId] =
            goodResult.isTrial == 1 && goodResult.isUseTrial == 1
        }

        //if (i == 0) {
        if (
          Utils.isUndefinde(goodResult.isTrial) &&
          goodResult.isTrial == 1 &&
          Utils.isUndefinde(goodResult.isUseTrial) &&
          goodResult.isUseTrial == 1
        ) {
          if (/*price < 0.000001 && */ i == 0) {
            window.nowProce = goodResult.price
            htmlStr +=
              '<div class="items now" istrial="' +
              goodResult.isTrial +
              '" trialPriceCost="' +
              goodResult.trialPrice +
              '" trialunit="' +
              goodResult.trialUnit +
              '" trialamount="' +
              goodResult.trialAmount +
              '" trialprice="' +
              goodResult.isUseTrial +
              '" powerType="' +
              goodResult.powerType +
              '" goodsid="' +
              goodResult.goodsId +
              '" price="' +
              goodResult.price +
              '" specid="' +
              goodResult.specId +
              '">'
          } else {
            htmlStr +=
              '<div class="items" istrial="' +
              goodResult.isTrial +
              '" trialPriceCost="' +
              goodResult.trialPrice +
              '" trialunit="' +
              goodResult.trialUnit +
              '" trialamount="' +
              goodResult.trialAmount +
              '" trialprice="' +
              goodResult.isUseTrial +
              '" powerType="' +
              goodResult.powerType +
              '" goodsid="' +
              goodResult.goodsId +
              '" price="' +
              goodResult.price +
              '" specid="' +
              goodResult.specId +
              '">'
          }
        } else {
          if (/*price < 0.000001 && */ i == 0) {
            window.nowProce = goodResult.price
            htmlStr +=
              '<div class="items now" istrial="' +
              goodResult.isTrial +
              '" trialPriceCost="' +
              goodResult.trialPrice +
              '" trialunit="' +
              goodResult.trialUnit +
              '" trialamount="' +
              goodResult.trialAmount +
              '" trialprice="null" powerType="' +
              goodResult.powerType +
              '" goodsid="' +
              goodResult.goodsId +
              '" price="' +
              goodResult.price +
              '" specid="' +
              goodResult.specId +
              '">'
          } else {
            htmlStr +=
              '<div class="items" istrial="' +
              goodResult.isTrial +
              '" trialPriceCost="' +
              goodResult.trialPrice +
              '" trialunit="' +
              goodResult.trialUnit +
              '" trialamount="' +
              goodResult.trialAmount +
              '" trialprice="null" powerType="' +
              goodResult.powerType +
              '" goodsid="' +
              goodResult.goodsId +
              '" price="' +
              goodResult.price +
              '" specid="' +
              goodResult.specId +
              '">'
          }
        }
        htmlStr += this.getTile(goodResult.powerType, goodResult.goodsId)
        if (
          goodResult.powerType == 'PRO' ||
          goodResult.powerType == 'CXZK' ||
          goodResult.powerType == 'QZSF'
        ) {
          if (goodResult.goodsId == 692 || goodResult.goodsId == 718) {
            htmlStr +=
              '<div><span class="nowProce">' +
              goodResult.price +
              '</span>元/月</div>'
          } else {
            if (goodResult.powerType == 'CXZK') {
              window.cxzknum++
            }
            if (window.cxzknum > 1 && goodResult.powerType == 'CXZK') {
              htmlStr +=
                '<div><span class="nowProce">' +
                goodResult.price +
                '</span>元/2年</div>'
              window.cxzknum = 0
            } else {
              htmlStr +=
                '<div><span class="nowProce">' +
                goodResult.price +
                '</span>元/年</div>'
            }
          }
        } else if (
          goodResult.powerType == 'XPJTK' ||
          goodResult.powerType == 'WSXXBG' ||
          goodResult.powerType == 'NOVEL-CL'
        ) {
          htmlStr +=
            '<div><span class="nowProce">' +
            goodResult.price +
            '</span>元</div>'
        } else if (
          goodResult.powerType == 'QZSF_TO_PRO' ||
          goodResult.powerType == 'CXZK_TO_QZSF' ||
          goodResult.powerType == 'CXZK_TO_PRO'
        ) {
          htmlStr +=
            '<div><span class="nowProce">' +
            goodResult.price +
            '</span>元</div>'
        } else if (goodResult.powerType == 'WS-30BUHUO') {
          htmlStr +=
            '<div><span class="nowProce">' +
            goodResult.price +
            '</span>元</div>'
        } else {
          htmlStr +=
            '<div><span class="nowProce">' +
            goodResult.price +
            '</span>元/月</div>'
        }
        htmlStr += '<label></label>'
        htmlStr += '</div>'
      }
    }

    if (price > 0) {
      getProductList.warnInfoarr.push('单独购买该篇文章')
      if (res.data.goodList.length < 1) {
        //window.nowProce = price;
        htmlStr +=
          '<div class="items now" istrial="0" trialamount="undefined" powerType="single" trialprice="null" goodsid="1">'
        htmlStr += '<h4>单篇文章</h4>'
        htmlStr += '<div><span class="nowProce">' + price + '</span>元 </div>'
        htmlStr += '<label></label>'
        htmlStr += '</div>'
      } else {
        /* htmlStr += '<div class="items" powerType="single"  goodsid="1">';
          htmlStr += '<h4>单篇文章</h4>';
          htmlStr += '<div><span class="nowProce">'+ price +'</span>元/每篇 </div>';
          htmlStr += '<label></label>';
          htmlStr += '</div>';*/
        //window.nowProce = price;
        htmlStr +=
          '<div class="items" istrial="0" trialamount="undefined" powerType="single" trialprice="null" goodsid="1">'
        htmlStr += '<h4>单篇文章</h4>'
        htmlStr += '<div><span class="nowProce">' + price + '</span>元 </div>'
        htmlStr += '<label></label>'
        htmlStr += '</div>'
      }
    }
    htmlStr +=
      '<div class="items itemslast itemsSwiper" style="background:#c4e3df;"><a href="http://other.caixin.com/mall/" style="color:#222;">'
    htmlStr += '<h4>更多选择</h4>'
    htmlStr +=
      '<div style="font-size:12px; top: 56px;">查看更多产品和<br>优惠活动</div>'
    htmlStr += '<label style="visibility: hidden;"></label></a>'
    htmlStr += '</div>'

    htmlStr += '</div>'
    htmlStr += '</div>'
    htmlStr += '<div class="couponwarn"></div>'
    htmlStr += '<div class="Coupon">'
    htmlStr += '<label>使用优惠券</label>'
    htmlStr += '<span class="chx">不使用优惠券&nbsp;></span>'
    htmlStr += '</div>'
    htmlStr += '<div class="no-info-line"><div></div></div>'
    htmlStr +=
      '<div class="butlist" style="overflow:hidden;"><div>订阅金额:<span>' +
      window.nowProce +
      '<i>元</i></span></div></div>'
    htmlStr +=
      '<div class="probation" style="padding-right: 20px;text-align:right;">&nbsp;</div>'
    htmlStr += '<a class="singlePay" href="javascript:;">立即购买</a>'
    htmlStr += '</div>'
    return htmlStr
  },
  setFiexd: function() {
    var dialoguebox = $('.pricebox')
    var len = $('.types .items').length + 1
    if (len == 1) {
      $('.itemscontnet').css({ overflow: 'hidden' })
      dialoguebox.css({
        'margin-left': 'auto',
        width: '100%',
        'text-align': 'center'
      })
    } else {
      dialoguebox.css({ width: (len + 1) * 100 + 'px' })
    }
    return this
  },
  setDefaultCounpon: function() {
    if (
      $('.types .items')
        .eq(0)
        .attr('powertype') == 'single'
    ) {
      $('.dialoguebox .middle .Coupon span')
        .html('不使用优惠券&nbsp;>')
        .attr('pid', '')
      $('.Coupon').show()
      $('.no-info-line').hide()
      $('.butlist').html(
        '<div>实付金额:<span>' +
          window.nowProce +
          '<i>元<i></i></i></span></div>'
      )
    } else {
      if ($('.now').attr('trialprice') != 'null') {
        $('.butlist').html(
          '<div>订阅金额:<span>' +
            window.nowProce +
            '<i>元<i></i></i></span></div>'
        )
      } else {
        $('.butlist').html(
          '<div>实付金额:<span>' +
            window.nowProce +
            '<i>元<i></i></i></span></div>'
        )
      }
      //$('.dialoguebox .middle .Coupon span').html("无可用优惠券&nbsp;>").attr('pid', '');
      $('.Coupon').hide()
      $('.no-info-line').show()
      $('.probation').html('&nbsp;')
      var trialamount = $('.now').attr('trialamount')
      var trialPriceCost = $('.now').attr('trialPriceCost')
      var trialunit = $('.now').attr('trialunit')
      var goodsId = $('.now').attr('goodsid')
      if (trialamount != 'undefined') {
        if (trialPriceCost != 'undefined' && trialPriceCost > 0) {
          if (trialunit == 'DATE') {
            $('.probation').html(trialPriceCost + '元试读' + trialamount + '天')
          } else if (trialunit == 'MONTH') {
            $('.probation').html(trialPriceCost + '元试读' + trialamount + '天')
          } else if (trialunit == 'YEAR') {
            $('.probation').html(trialPriceCost + '元试读' + trialamount + '天')
          }
        } else {
          if ($('.now').attr('trialprice') != 'null') {
            if (canTrial[goodsId]) {
              $('.probation').html('免费试读' + trialamount + '天')
            } else {
              $('.probation').html('&nbsp;')
            }
          }
        }
      }
    }
    getProductList.getGoodInfo(0)
    $('.butlist span').html(window.nowProce + '<i>元<i>')
    return this
  },
  setDefaultShowCost: function(data) {
    var dataRules = data.marketVouchersRules
    var type = dataRules.vouchersType
    var voucherId = data.voucherId
    if (type == 1) {
      var delval =
        (price * 100000 -
          parseFloat(dataRules.vouchersDiscountMoney) * 100000) /
        100000
      if (delval <= 0) {
        $('.dialoguebox .middle .butlist div span').html('0<i>元</i>')
      } else {
        $('.dialoguebox .middle .butlist div span').html(delval + '<i>元</i>')
      }
    }
    if (type == 2) {
      var zheNum = parseFloat(dataRules.vouchersDiscountMoney)
      $('.dialoguebox .middle .butlist div span').html(
        Number(price * zheNum * 0.1).toFixed(2) + '<i>元</i>'
      )
    }
    if (type == 3) {
      $('.dialoguebox .middle .butlist div span').html('0<i>元</i>')
    }
    $('.dialoguebox .middle .Coupon span')
      .html(dataRules.vouchersTitle + '&nbsp;>')
      .attr('pid', voucherId)
  },
  setStyle: function() {
    $('body').append(
      '<link rel="stylesheet" type="text/css" href="//file.caixin.com/webchannel/article/wapnewart.css"/>'
    )
    return this
  },
  clickFn: function(ele, event, fn) {
    ele.on(event, fn)
  },
  writeProductList: function(data) {
    var magzineTypeData = ''
    $.ajax({
      url: gatewayApi + 'api/cxmall/api4ExtenSys/findGoodsByListConf',
      data: data,
      dataType: 'jsonp',
      success: function(res) {
        if (res.code == 0) {
          window.ProductItem = res.data.goodList
          $('.types').html(getProductList.setTmp(res))
          getProductList.setStyle().setFiexd()
          //设置定位，设置实付金额，设置样式
          getProductList.setDefaultCounpon()
          if (
            $('.types .now')
              .eq(0)
              .attr('powertype') == 'single'
          ) {
            getProductList.getCoupon()
          } else {
            getProductList.getCouponShop(0)
          }

          getProductList.clickFn(
            $('.dialoguebox .middle .Coupon .chx'),
            'click',
            function() {
              $('body').append(
                '<div class="bgzindex" style="z-index:2000;position:fixed;top:0;left:0;bottom:0;background:#f4f4f4;width:100%;height:100%;"></div>'
              )
              if ($('.types .now').attr('powertype') == 'single') {
                getProductList.getCoupon()
              } else {
                $('.items').each(function(index, item) {
                  if ($(item).hasClass('now')) {
                    getProductList.getCouponShop(index)
                  }
                })
              }
              $('#couponz').show()
              $('#pay-box').hide()
              return false
            }
          )

          getProductList.clickFn($('.singlePay'), 'click', function() {
            /*if($('.now').attr('istrial') == '1' && wxDpsf.isWx()) {
				zfbui();
				$('.diglozfb').height($('body').height());
				$(".diglozfb").on('click', function(){
					$('.diglozfb').remove();
				})
			}else{*/
            Payment.singlePay()
            return false
            //}
          })

          $('.types .items').click(function() {
            if ($('.types .items').length - 1 != $(this).index()) {
              var goodsid = $(this).attr('goodsid')
              Config.counponNum = 0
              window.maVoRules = []
              $('.no-info-line').show()
              $('.Coupon').hide()
              getProductList.getGoodInfo($(this).index())
              if ($(this).attr('powertype') == 'single') {
                getProductList.getCoupon()
              } else {
                // if(price > 0) {
                //	getProductList.getCouponShop($(this).index()-1);
                //	}else{
                if (!canTrial[goodsid]) {
                  getProductList.getCouponShop($(this).index())
                }
                //}
              }
              $(this)
                .addClass('now')
                .siblings()
                .removeClass('now')
              window.nowProce = parseFloat($('.now .nowProce').html())
              $('.butlist span').html(window.nowProce + '<i>元<i>')
              if ($(this).attr('trialprice') != 'null') {
                $('.butlist').html(
                  '<div>订阅金额:<span>' +
                    window.nowProce +
                    '<i>元<i></i></i></span></div>'
                )
              } else {
                $('.butlist').html(
                  '<div>实付金额:<span>' +
                    window.nowProce +
                    '<i>元<i></i></i></span></div>'
                )
              }
              $('.chx')
                .attr('pid', '')
                .html('不使用优惠券&nbsp;>')
              $('.probation').html('&nbsp;')
              var trialamount = $('.now').attr('trialamount')
              var trialPriceCost = $('.now').attr('trialPriceCost')
              var trialunit = $('.now').attr('trialunit')
              var goodsId = $('.now').attr('goodsid')
              if (trialamount != 'undefined') {
                if (trialPriceCost != 'undefined' && trialPriceCost > 0) {
                  if (trialunit == 'DATE') {
                    $('.probation').html(
                      trialPriceCost + '元试读' + trialamount + '天'
                    )
                  } else if (trialunit == 'MONTH') {
                    $('.probation').html(
                      trialPriceCost + '元试读' + trialamount + '天'
                    )
                  } else if (trialunit == 'YEAR') {
                    $('.probation').html(
                      trialPriceCost + '元试读' + trialamount + '天'
                    )
                  }
                } else {
                  if ($('.now').attr('trialprice') != 'null') {
                    if (canTrial[goodsId]) {
                      $('.probation').html('免费试读' + trialamount + '天')
                    } else {
                      $('.probation').html('&nbsp;')
                    }
                  }
                }
              }
              return false
            }
          })
        } else {
          alert('请求商品失败：' + res.msg)
        }
      }
    })
  },
  getCoupon: function() {
    $.ajax({
      url:
        '//gateway.caixin.com/api/dataSwitch/marketing/findAvailableVouchersByArticle',
      type: 'get',
      dataType: 'jsonp',
      data: {
        req: JSON.stringify({
          businessType: '1001',
          category: entity.category.split(';')[0],
          channel: entity.channel,
          form_channel: entity.fromchannel,
          media: entity.media,
          moneyCode: 'RMB',
          platform: 'WAP',
          price: price,
          systemType: '100102',
          uid: GetCookieValue('SA_USER_UID'),
          articleId: entity.id
        })
      },
      success: function(result) {
        if (Config.counponNum > 0) {
          //$('#couponz').show();
        } else {
          $('#couponz').remove()
          var str = ''
          if (result.code == '0') {
            window.maVoRules = result.data
            if (window.maVoRules.length > 0) {
              getProductList.setDefaultShowCost(result.data[0])
              $('.Coupon').show()
              $('.no-info-line').hide()
            } else {
              $('.no-info-line').show()
              $('.Coupon').hide()
            }
            str += '<div id="couponz">'
            str +=
              '<div class="c_title"><span class="back"></span>使用优惠券</div>'
            str += '<div class="free">'
            str += '不使用优惠券'
            str += '<label for=""></label>'
            str += '</div>'
            str +=
              '<h4 class="costlen">可用优惠券（' +
              result.data.length +
              '）</h4>'
            str += '<ul class="cost">'
            for (var i = 0; i < result.data.length; i++) {
              var rules = result.data[i].marketVouchersRules
              if (i == 0) {
                str +=
                  '<li class="now" id=' +
                  result.data[i].voucherId +
                  ' vouchertype=' +
                  rules.vouchersType +
                  ' monkey=' +
                  rules.vouchersDiscountMoney +
                  ' >'
              } else {
                str +=
                  '<li id=' +
                  result.data[i].voucherId +
                  ' vouchertype=' +
                  rules.vouchersType +
                  ' monkey=' +
                  rules.vouchersDiscountMoney +
                  ' >'
              }
              str += '<div class="number">'
              if (rules.vouchersType == 1) {
                str +=
                  '<span style="padding-top:8px;"><i>￥</i>' +
                  rules.vouchersDiscountMoney +
                  '</span>'
                if (rules.useConditionsType != 1) {
                  str += '满' + rules.useConditionsMoney + '元可用'
                } else {
                  str += '无金额门槛'
                }
              }
              if (rules.vouchersType == 2) {
                str +=
                  '<span style="padding-top:8px;">' +
                  rules.vouchersDiscountMoney +
                  '<i>折</i></span>'
                if (rules.useConditionsType != 1) {
                  str += '满' + rules.useConditionsMoney + '元可用'
                } else {
                  str += '无金额门槛'
                }
              }
              if (rules.vouchersType == 3) {
                str +=
                  '<span style="font-size: 22px;padding-top: 28px;">免费</span>'
              }
              str += '</div>'
              /*str += '<div class="number">';
              str += '<span><i>￥</i>'+rules.vouchersDiscountMoney+'</span>';
              str += rules.vouchersTitle;
              str += '</div>';*/
              str += '<div class="info">'
              str += '<h4>' + rules.vouchersTitle + '</h4>'
              str +=
                result.data[i].voucherStartTime.slice(0, 10) +
                ' 至 ' +
                result.data[i].voucherEndTime.slice(0, 10)
              str += '</div>'
              str += '<label for=""></label>'
              str += '</li>'
            }
            str += '</ul>'
            str += '</div>'
          }
          $('body').append(str)
          Config.counponNum++
        }

        getProductList.clickFn($('#couponz .back'), 'click', function() {
          $('.bgzindex').remove()
          $('#couponz').hide()
          return false
        })
        getProductList.clickFn($('#couponz li'), 'click', function() {
          $('.bgzindex').remove()
          if (typeof $(this).attr('id') != 'undefined') {
            var type = $(this).attr('vouchertype')
            if (type == 1) {
              var delval =
                (price * 100000 - parseFloat($(this).attr('monkey')) * 100000) /
                100000
              if (delval <= 0) {
                $('.dialoguebox .middle .butlist div span').html('0<i>元</i>')
              } else {
                $('.dialoguebox .middle .butlist div span').html(
                  Number(delval).toFixed(2) + '<i>元</i>'
                )
              }
            }

            if (type == 2) {
              var zheNum = parseFloat($(this).attr('monkey'))
              $('.dialoguebox .middle .butlist div span').html(
                Number(price * zheNum * 0.1).toFixed(2) + '<i>元</i>'
              )
            }

            if (type == 3) {
              $('.dialoguebox .middle .butlist div span').html('0<i>元</i>')
            }
            $('#pay-box').show()
          }
          $('.free').removeClass('now')
          $(this)
            .addClass('now')
            .siblings('li')
            .removeClass('now')
          setTimeout(function() {
            $('#couponz').hide()
          }, 100)
          $('.dialoguebox .middle .Coupon span')
            .html(
              $(this)
                .find('h4')
                .html() + '&nbsp;>'
            )
            .attr('pid', $(this).attr('id'))
          return false
        })
        getProductList.clickFn($('.free'), 'click', function() {
          $('.bgzindex').remove()
          if (typeof $(this).attr('id') != 'undefined') {
            $('.dialoguebox .middle .butlist div span').html('0<i>元</i>')
          }
          $('.cost li').removeClass('now')
          $(this).addClass('now') //.siblings('li').removeClass('now');
          setTimeout(function() {
            $('#couponz').hide()
          }, 100)
          $('.chx')
            .attr('pid', '')
            .html('不使用优惠券&nbsp;>')
          $('.butlist span').html(window.nowProce + '<i>元<i>')
          //$('.dialoguebox .middle .Coupon span').html($(this).find('h4').html()+"&nbsp;>").attr('pid', $(this).attr('id'));
          $('#pay-box').show()
          return false
        })
        return str
      }
    })
    $('#couponz').css({
      height: $(window).height(),
      overflow: 'auto'
    })
  },
  getCouponShop: function(index) {
    $('#pay-box').css({ 'z-index': 10000 })
    var goodsData = window.ProductItem[index]
    var params = {
      businessType: '1001',
      goodsDetail: [
        {
          classId: goodsData.cateId,
          className: goodsData.cateName,
          goodsAmount: goodsData.price,
          goodsId: goodsData.goodsId,
          goodsName: goodsData.goodsName,
          ifSale: goodsData.ifSale,
          itemType: goodsData.type,
          quantity: 1,
          storeGroup: goodsData.storeGroup,
          specId: goodsData.specId
        }
      ],
      moneyCode: 'RMB',
      orderAmount: goodsData.price,
      platform: 'WAP',
      systemType: '100101',
      totalQuantity: 1,
      uid: GetCookieValue('SA_USER_UID')
    }
    $.ajax({
      url:
        '//gateway.caixin.com/api/dataSwitch/marketing/findAvailableVouchersByGoods',
      type: 'get',
      dataType: 'jsonp',
      data: {
        req: JSON.stringify(params)
      },
      success: function(result) {
        if (window.maVoRules.length > 0) {
          $('.Coupon').show()
          $('.no-info-line').hide()
        } else {
          $('.no-info-line').show()
          $('.Coupon').hide()
        }

        console.log('Config.counponNum', Config.counponNum)
        if (Config.counponNum > 0) {
          //$('#couponz').show();
        } else {
          $('#couponz').remove()
          var str = ''
          if (result.code == '0' && typeof result.data != 'undefined') {
            window.maVoRules = result.data
            if (window.maVoRules.length > 0) {
              $('.Coupon').show()
              $('.no-info-line').hide()
            } else {
              $('.no-info-line').show()
              $('.Coupon').hide()
            }
            str += '<div id="couponz" style="display:none;">'
            str +=
              '<div class="c_title"><span class="back"></span>使用优惠券</div>'
            str += '<div class="free now">'
            str += '不使用优惠券'
            str += '<label for=""></label>'
            str += '</div>'
            str +=
              '<h4 class="costlen">可用优惠券（' +
              result.data.length +
              '）</h4>'
            str += '<ul class="cost">'
            var couponUselen = 0
            for (var i = 0; i < result.data.length; i++) {
              if (result.data[i].param1 == 'true') {
                couponUselen++
                var rules = result.data[i].marketVouchersRules
                //str += '<li id='+result.data[i].voucherId+'>';
                //if(i==0) {
                //    str += '<li class="now" id='+result.data[i].voucherId+' vouchertype=' + rules.vouchersType + ' monkey=' + rules.vouchersDiscountMoney + ' >';
                //  }else {
                str +=
                  '<li id=' +
                  result.data[i].voucherId +
                  ' vouchertype=' +
                  rules.vouchersType +
                  ' monkey=' +
                  rules.vouchersDiscountMoney +
                  ' >'
                //  }
                str += '<div class="number">'
                if (rules.vouchersType == 1) {
                  str +=
                    '<span style="padding-top:8px;"><i>￥</i>' +
                    rules.vouchersDiscountMoney +
                    '</span>'
                  if (rules.useConditionsType != 1) {
                    str += '满' + rules.useConditionsMoney + '元可用'
                  } else {
                    str += '无金额门槛'
                  }
                }
                if (rules.vouchersType == 2) {
                  str +=
                    '<span style="padding-top:8px;">' +
                    rules.vouchersDiscountMoney +
                    '<i>折</i></span>'
                  if (rules.useConditionsType != 1) {
                    str += '满' + rules.useConditionsMoney + '元可用'
                  } else {
                    str += '无金额门槛'
                  }
                }
                if (rules.vouchersType == 3) {
                  str +=
                    '<span style="font-size: 22px;padding-top: 21px;">免费</span>'
                }
                str += '</div>'
                str += '<div class="info">'
                str +=
                  '<h4>' +
                  result.data[i].marketVouchersRules.vouchersTitle.slice(0, 9) +
                  '</h4>'
                str +=
                  result.data[i].voucherStartTime.slice(0, 10) +
                  ' 至 ' +
                  result.data[i].voucherEndTime.slice(0, 10)
                str += '</div>'
                str += '<label for=""></label>'
                str += '</li>'
              }
            }
            str += '</ul>'
            str += '</div>'
          }
          $('body').append(str)
          if (couponUselen < 1) {
            $('.Coupon').hide()
            $('.no-info-line').show()
          }
          $('.costlen').html('可用优惠券（' + couponUselen + '）')
          Config.counponNum++
          if ($('.pricebox .now').attr('trialprice') != 'null') {
            $('.no-info-line').show()
            $('.Coupon').hide()
          }
        }

        getProductList.clickFn($('#couponz .back'), 'click', function() {
          $('.bgzindex').remove()
          $('#couponz').hide()
          return false
        })
        getProductList.clickFn($('#couponz li'), 'click', function() {
          $('.bgzindex').remove()
          if (typeof $(this).attr('id') != 'undefined') {
            var type = $(this).attr('vouchertype')
            if (type == 1) {
              var delval =
                (window.nowProce * 10000 -
                  parseFloat($(this).attr('monkey')) * 10000) /
                10000
              if (delval <= 0) {
                $('.dialoguebox .middle .butlist div span').html('0<i>元</i>')
              } else {
                $('.dialoguebox .middle .butlist div span').html(
                  Number(delval).toFixed(2) + '<i>元</i>'
                )
              }
            }

            if (type == 2) {
              var zheNum = parseFloat($(this).attr('monkey'))
              $('.dialoguebox .middle .butlist div span').html(
                Number(window.nowProce * zheNum * 0.1).toFixed(2) + '<i>元</i>'
              )
            }
            if (type == 3) {
              $('.dialoguebox .middle .butlist div span').html('0<i>元</i>')
            }
            $('#pay-box').show()
          }
          $('.free').removeClass('now')
          $(this)
            .addClass('now')
            .siblings('li')
            .removeClass('now')
          setTimeout(function() {
            $('#couponz').hide()
          }, 100)
          $('.dialoguebox .middle .Coupon span')
            .html(
              $(this)
                .find('h4')
                .html() + '&nbsp;>'
            )
            .attr('pid', $(this).attr('id'))
          return false
        })
        getProductList.clickFn($('.free'), 'click', function() {
          $('.bgzindex').remove()
          if (typeof $(this).attr('id') != 'undefined') {
            $('.dialoguebox .middle .butlist div span').html('0<i>元</i>')
          }
          $('.cost li').removeClass('now')
          $(this).addClass('now')
          setTimeout(function() {
            $('#couponz').hide()
          }, 100)
          $('.chx')
            .attr('pid', '')
            .html('不使用优惠券&nbsp;>')
          $('.butlist span').html(window.nowProce + '<i>元<i>')
          $('#pay-box').show()
          return false
        })
        return str
      }
    })
    $('#couponz').css({
      height: $(window).height(),
      overflow: 'auto'
    })
  }
}

//隐藏收费框
$(function() {
  $('#pay-box').hide()
  $('.maskclose').click(function() {
    $('#pay-box').hide()
  })
  //domain.buildContentInfo();
  domain.readyContentInfo()
})

function resetContentInfo(data) {
  domain.resetContentInfo(data)
}

function buildContentInfo() {
  domain.buildContentInfo()
}

function readyContentInfo() {
  domain.readyContentInfo()
}

function getDate() {
  var str = ''
  var date = new Date()
  str += '' + date.getYear() + ''
  str += '' + (date.getMonth() + 1) + ''
  str += '' + date.getDate() + ''
  str += '' + date.getMinutes() + ''
  return str
}

function getWordNum() {
  var href = location.href
  var host = location.host
  var idArr = location.href.match(/(\d*)(\.html)/)
  if (!idArr) {
    return
  }
  var id = idArr[1]
  if (/^m\./.test(host)) {
    host = host.substr(2)
  }
  var url =
    'https://' +
    host +
    '/frag/newsdata/' +
    id.slice(-4) +
    '/' +
    id +
    '.js?times=' +
    getDate()
  var scriptjs = document.createElement('script')
  scriptjs.src = url
  console.log(scriptjs)
  document.getElementById('chargeWall').appendChild(scriptjs)
}
function showCaixinNewsData(reuslt) {
  ////$('.box_title').html('本文共计' + reuslt.words + '字<br />成为付费用户，阅读十几万篇高质量报道');
  var CXZK = entity.fromchannel.indexOf('19') != -1
  var QZSF = entity.fromchannel.indexOf('16') != -1
  var PRO = entity.fromchannel == '22'
  var WS30BUHUO = entity.fromchannel.indexOf('23') != -1
  if (CXZK || QZSF || PRO || WS30BUHUO) {
    $('.box_title').html('本文共计' + reuslt.words + '字')
  } else {
    $('.box_title').html(
      '本文共计' + reuslt.words + '字<br />成为付费用户，阅读十几万篇高质量报道'
    )
  }
  if (
    window.location.href.indexOf('video.caixin.com') != '-1' ||
    window.location.href.indexOf('gbiz.caixin.com') != '-1'
  ) {
    $('.box_title').html('财新通用户专享')
  }
}

function tongji(a, b, c, d, e, f, g) {
  try {
    ga(a, b, c, d, e, f, g)
  } catch (e) {}
}

function share() {
  if (typeof wx != 'undefined' && typeof wx != null) {
    wx.ready(function() {
      wx.onMenuShareTimeline({
        title: shareTitle, // 分享标题
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function() {
          if (typeof setIntegral == 'function') {
            setIntegral('cxGiftArticleShare')
          }
          // 用户确认分享后执行的回调函数
          $('.share-pop-mask').show()
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: descContent, // 分享描述
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
          if (typeof setIntegral == 'function') {
            setIntegral('cxGiftArticleShare')
          }
          // 用户确认分享后执行的回调函数
          $('.share-pop-mask').show()
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareQQ({
        title: shareTitle, // 分享标题
        desc: descContent, // 分享描述n
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function() {
          if (typeof setIntegral == 'function') {
            setIntegral('cxGiftArticleShare')
          }
          // 用户确认分享后执行的回调函数
          $('.share-pop-mask').show()
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      })
      wx.onMenuShareWeibo({
        title: shareTitle, // 分享标题
        desc: descContent, // 分享描述
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function() {
          if (typeof setIntegral == 'function') {
            setIntegral('cxGiftArticleShare')
          }
          // 用户确认分享后执行的回调函数
          $('.share-pop-mask').show()
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
        }
      })
    })
  }
}

//红包分享
function redpacketShare() {
  //判断是否是微信客户端
  var isWeixin = navigator.userAgent.match(/MicroMessenger/gi)
  if (isWeixin) {
    $.getJSON(
      gatewayApiHttps +
        '/api/rps/freeread/share?appId=100&fromChannel=' +
        entity.fromchannel +
        '&entityId=' +
        entity.id +
        '&uid=' +
        GetCookieValue('SA_USER_UID') +
        '&callback=?',
      function(data) {
        if (data.code == 0 && data.msg == 'success') {
          imgUrl =
            data.data.logo || '//file.caixin.com/images/ws-wxact-icon.jpg'
          lineLink = data.data.url
          shareTitle = data.data.title
          descContent = data.data.abstract
          $('.ws-wxact-tip').show()
          share()
        } else if (data.code == 405) {
        }
      }
    )
  } else {
    $('.ws-act-tip').show()
  }
}

function codetoimg(code) {
  if (code == 'CXZK') {
    return '//file.caixin.com/file/content/images/mobile/cxzk.png'
  } else if (code == 'PRO') {
    return '//file.caixin.com/file/content/images/mobile/pro.png'
  } else {
    return '//file.caixin.com/file/content/images/mobile/wifi-cxt-logo.png'
  }
}
function bigCustomer(data) {
  if (typeof data.ka == 'undefined') {
    LabelUser()
    return false
  }
  var description =
    data.description || '您所连接的WiFi已覆盖财新通，您可以畅读财新报道！'
  var str = '<div class="wifi-tips">'
  str += '<span><img src="' + codetoimg(data.productCode) + '"></span>'
  str += '<dl><dt>' + description + '</dt>'
  str +=
    '<dd><a href="http://m.caixin.com/m/subscribe/">了解更多&gt;&gt;</a></dd>'
  str += '</dl>'
  str += '</div>'
  var url = window.location.href
  if (/\.html$/.test(url) || /detail\_/.test(url)) {
    $('head').append(
      '<link rel="stylesheet" href="//file.caixin.com/independent/bigcustomer/wap.css" />'
    )
    $('body').prepend(str)
  }

  $('.wifi-tips .right dt').click(function() {
    $('.wifi-tips').remove()
  })
}

function LabelUser() {
  var language = 0
  if (/\d+\.html$/.test(window.location.href)) {
    if (window.location.host.indexOf('caixin.com') != -1) {
      language = 1
    } else if (window.location.host.indexOf('caixinglobal.com') != -1) {
      language = 2
    }
    $.ajax({
      url: '//gateway.caixin.com/api/usertag/api/userTag/getUserTag',
      type: 'get',
      dataType: 'jsonp',
      data: {
        uid: GetCookieValue('SA_USER_UID'),
        userType: language
      },
      success: function(res) {
        if (typeof res.data == 'string') {
          var data = JSON.parse(res.data)
        } else {
          var data = res.data
        }
        try {
          if (data.length != 0) {
            var description =
              data[0].cxTag.interest ||
              '您所连接的WiFi已覆盖财新通，您可以畅读财新报道！'
            var str = '<div class="wifi-tips">'
            str +=
              '<span><img src="//file.caixin.com/file/content/images/mobile/cx_logo.png"></span>'
            str += '<dl><dt>' + description + '</dt>'
            str +=
              '<dd><a href="http://m.caixin.com/m/subscribe/">了解更多&gt;&gt;</a></dd>'
            str += '</dl>'
            str += '</div>'
            var url = window.location.href
            if (/\.html$/.test(url) || /detail\_/.test(url)) {
              $('head').append(
                '<link rel="stylesheet" href="//file.caixin.com/independent/bigcustomer/wap.css" />'
              )
              $('body').prepend(str)
            }
            $('.wifi-tips .right dt').click(function() {
              $('.wifi-tips').remove()
            })
          }
        } catch (e) {}
      }
    })
  }
}
