document.domain = 'caixin.com'
//SetCookieValue("SA_USER_AUTH_Statistics","0",1);
var gatewayApi = '//gateway.caixin.com/'
var gatewayApiHttps = '//gateway.caixin.com/'
var authUrl = gatewayApiHttps + 'api/authority'
var payUrl = '//pay.caixin.com/web/checkout.html'
// test:'//paytest.caixin.com/web/checkout.html',
// 	pre:'//payqa.caixin.com/web/checkout.html',
// 	master:'//pay.caixin.com/web/checkout.html'
window.maVoRules = []
window.getSpeSjjWarn = '&nbsp;'
window.qzsfToProMsg = ''
//window.btnShowVal = "财新网收费文章，请付费阅读";
window.btnShowVal = '全网畅读  请选择订阅方式'
var canTrial = {}

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
  gatewayApis: '//gateway.caixin.com/',
  gatewayApi: '//gateway.caixin.com/',
  _DataJson: null,
  _JsonIsOK: false,
  _HtmlIsOK: false,
  channel: 1001003
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
    goodsId: 657
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

//ui展示
var showUI = {
  getVideoTitleTmpHtml: function() {
    var str = ''
    $(window).scroll(function() {
      var doc = $(document)
      var scT = $(window).height() * 0.5
      if (doc.scrollTop() >= 430) {
        $('.payment_box,.playbg').hide()
      } else {
        $('.payment_box,.playbg').show()
      }
    })
    var styleStr =
      '<style>#chargeWall{position: absolute;top: -3px;height: 510px;left: 50%;margin-left: -395px;}'
    styleStr +=
      '.payment_box{background:rgba(0,0,0,0.7);overflow:hidden;z-index: 9;position: absolute;width: 790px;height: 500px;text-align:center;color: #fff; font-size: 16px;}'
    styleStr += '.box_title{margin-top: 160px;margin-bottom: 20px;}'
    styleStr +=
      '.payment_box .btn{font-size:18px;background:#eaaf2d;width:400px;height:33px;line-height:100%;border-radius:5px;margin:0 auto 15px;color:#fff;padding-top:15px;}'
    styleStr += '.payment_box .btn em{margin-left: 30px;}'
    styleStr += '.payment_box .btn a{color: #fff;}'
    styleStr +=
      '.payment_box .buy a{margin-left: 20px;color:#eaaf2d ;text-decoration: underline;}'
    styleStr +=
      '.playbg{position: absolute;width: 790px; height: 100%;z-index: 8; top: 23px;}'
    styleStr += '.playbg img{height: 500px;width: 100%;}'
    styleStr += '.dialoguebox .middle .subtitle img{display: inline;}</style>'
    /*if(window.location.href.indexOf('gbiz.caixin.com') != '-1') {
			var gzbaStyleStr = '<style>';
			gzbaStyleStr += '.mediaVideo{position:relative;}';
			gzbaStyleStr += '#chargeWall{position:absolute;left:0;top:8px;margin-left:0; width: 660px;height: 430px;}';
			gzbaStyleStr += '.payment_box{width:660px;}.playbg{top:3px;}';
			gzbaStyleStr += '</style>';
		}*/
    $('head').append(styleStr)
    //$('head').append(gzbaStyleStr);
    if (Logic.isLogin()) {
      if (Config._DataJson.status != 3) {
        str += '<div class="playwarp">'
        str += '<div class="payment_box">'
        str += '<div class="box_title">财新通 会员专享</div>						'
        str +=
          "<a href=\"javascript:showUI.showProduct();tongji('send', 'event', 'WAPMF5Ping', 'Buy', 'ZKSell');\" class=\"button\" target=\"_self\">"
        str += '<div class="btn">立即订阅</em></div>'
        str += '</a>'
        str += '<div>' + window.getSpeSjjWarn + '</div>'
        str += '</div>'
        str += '</div>'
        str += '<div class="playbg">'
        str +=
          '<img src="' +
          decodeURIComponent(share_picUrl).replace(/_\d{2,4}_\d{2,4}/, '') +
          '">'
        str += '</div>'
        //str += '<div class="player">';
        //str += '<script src="//player.caixin.com/player_tide/js/tidePlayer.cx.js"></script>';
        //str += '<script>new tidePlayer({width:"100%",height:"100%", json:"//player.caixin.com/v/g/r/2017/11/17/1510898705712.json",adshowtype:2,channel:"3190,3194"});</script><object id="tdplayer_1914563568" width="100%" height="100%" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="movie" value="//player.caixin.com/player_tide/swf/cxplayer.swf"><param name="FlashVars" value="autoplay=0&amp;alt=0&amp;ast=2&amp;userCall=cx_ad_checkUserLogin&amp;eventCall=playerEventFunction&amp;json=http%3A%2F%2Fplayer.caixin.com%2Fv%2Fg%2Fr%2F2017%2F11%2F17%2F1510898705712.json&amp;channel=3190%2C3194"><param name="wmode" value="opaque"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><embed name="tdplayer_1914563568" width="100%" height="100%" src="//player.caixin.com/player_tide/swf/cxplayer.swf" wmode="opaque" allowfullscreen="true" allowscriptaccess="always" flashvars="autoplay=0&amp;alt=0&amp;ast=2&amp;userCall=cx_ad_checkUserLogin&amp;eventCall=playerEventFunction&amp;json=http%3A%2F%2Fplayer.caixin.com%2Fv%2Fg%2Fr%2F2017%2F11%2F17%2F1510898705712.json&amp;channel=3190%2C3194" type="application/x-shockwave-flash"></object>';
        //str += '</div>';
        str += '</div>'
        str += '</div>'
      }
    } else {
      str += '<div class="playwarp">'
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
      str +=
        '<img src="' +
        decodeURIComponent(share_picUrl).replace(/_\d{2,4}_\d{2,4}/, '') +
        '">'
      str += '</div>'
      /*	str += '<div class="player">';
			str += '<script src="//player.caixin.com/player_tide/js/tidePlayer.cx.js"></script>';
			str += '<script>new tidePlayer({width:"100%",height:"100%", json:"//player.caixin.com/v/g/r/2017/11/17/1510898705712.json",adshowtype:2,channel:"3190,3194"});</script><object id="tdplayer_1914563568" width="100%" height="100%" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="movie" value="//player.caixin.com/player_tide/swf/cxplayer.swf"><param name="FlashVars" value="autoplay=0&amp;alt=0&amp;ast=2&amp;userCall=cx_ad_checkUserLogin&amp;eventCall=playerEventFunction&amp;json=http%3A%2F%2Fplayer.caixin.com%2Fv%2Fg%2Fr%2F2017%2F11%2F17%2F1510898705712.json&amp;channel=3190%2C3194"><param name="wmode" value="opaque"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><embed name="tdplayer_1914563568" width="100%" height="100%" src="//player.caixin.com/player_tide/swf/cxplayer.swf" wmode="opaque" allowfullscreen="true" allowscriptaccess="always" flashvars="autoplay=0&amp;alt=0&amp;ast=2&amp;userCall=cx_ad_checkUserLogin&amp;eventCall=playerEventFunction&amp;json=http%3A%2F%2Fplayer.caixin.com%2Fv%2Fg%2Fr%2F2017%2F11%2F17%2F1510898705712.json&amp;channel=3190%2C3194" type="application/x-shockwave-flash"></object>';
			str += '</div>';*/
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
      //getSpeSjjWarn = "财新通用户可以<a href='//mall.caixin.com/mall/web/product/product.html?id=665' style='color: #4485b9;'>升级到数据通</a>";
      //noLoginSjjWarn = "财新通用户可以<a style='line-height: 25px;color: #4485b9;' href='//mall.caixin.com/mall/web/product/product.html?id=665'>&nbsp;&nbsp;升级到数据通</a><br />";
    }
    if (Logic.isLogin()) {
      var str = ''
      if (imgPayBtn) {
        str += '<div class="payment_box img-pay-btn'
      } else {
        str += '<div class="payment_box'
      }
      str += '">'
      if (imgPayBtn) {
        str += '<div class="box_title"></div>'
      } else {
        str +=
          '<div class="box_title">成为订阅用户<br />阅读十几万篇高质量报道</div>'
      }
      str +=
        '<style>.box_title{padding:45px 0 15px 0;font-size:14px;color:#404040;}.payment_box dt{margin:0 auto 10px;border-radius:0;}.payment_box dl{padding:0;}.payment_box dd{font-size:14px;}</style>'
      str += '<dl>'
      str +=
        "<a href=\"javascript:showUI.showProduct();tongji('send', 'event', 'WAPMF5Ping', 'Buy', 'ZKSell');\" class=\"button\" target=\"_self\">"
      if (WS30BUHUO) {
        str += '<dt><img src="//file.caixin.com/images/pay-ws30-img.jpg"></dt>'
      } else if (PRO) {
        if (upgradeProPayBtn) {
          str +=
            '<dt><img src="//file.caixin.com/images/pc-upgrade-pro-img.jpg"></dt>'
        } else {
          str +=
            '<dt><img src="//file.caixin.com/images/pc-pay-pro-img.jpg"></dt>'
        }
      } else if (upgradePayBtn) {
        str +=
          '<dt><img src="//file.caixin.com/images/pc-upgrade-img.jpg"></dt>'
      } else if (imgPayBtn) {
        str += '<dt><img src="//file.caixin.com/images/pc-pay-img.jpg"></dt>'
      } else {
        str +=
          '<dt>' +
          btnShowVal +
          '<em><img src="//file.caixin.com/static/mh5/images/arrow.png"></em></dt>'
      }
      str += '</a>'
      // str += '<dd>' + window.getSpeSjjWarn + '<a class="free2weekpro" ' +
      //   'href="http://cchuodong.caixin.com/market/free-cxt/index.html?' +
      //   'utm_source=Caixin&utm_medium=1xian&utm_content=CXTFreeSJT14&utm_campaign=FreePlan&' +
      //   'originURL='+encodeURIComponent(location.href)+'">'+window.qzsfToProMsg+'</a></dd>'
      str += '<dd>' + window.getSpeSjjWarn + '</dd>'
      
      str += '</dl>'
      str += '</div>'
    } else {
      if (Config._DataJson.status != 3) {
        var str = ''
        if (imgPayBtn) {
          str += '<div class="payment_box img-pay-btn'
        } else {
          str += '<div class="payment_box'
        }
        str += '">'
        if (imgPayBtn) {
          str += '<div class="box_title"></div>'
        } else {
          str +=
            '<div class="box_title">成为订阅用户<br />阅读十几万篇高质量报道</div>'
        }
        str +=
          '<style>.box_title{padding:45px 0 15px 0;font-size:14px;color:#404040;}.payment_box dt{margin:0 auto 10px;border-radius:0;}.payment_box dl{padding:0;}.payment_box dd{font-size:14px;}</style>'
        str += '<dl>'
        str +=
          '<a href="javascript:openLoginWindow();" class="button js-openLoginChooseLayer" target="_self">'
        if (WS30BUHUO) {
          str +=
            '<dt><img src="//file.caixin.com/images/pay-ws30-img.jpg"></dt>'
        } else if (PRO) {
          if (upgradeProPayBtn) {
            str +=
              '<dt><img src="//file.caixin.com/images/pc-upgrade-pro-img.jpg"></dt>'
          } else {
            str +=
              '<dt><img src="//file.caixin.com/images/pc-pay-pro-img.jpg"></dt>'
          }
        } else if (upgradePayBtn) {
          str +=
            '<dt><img src="//file.caixin.com/images/pc-upgrade-img.jpg"></dt>'
        } else if (imgPayBtn) {
          str += '<dt><img src="//file.caixin.com/images/pc-pay-img.jpg"></dt>'
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
    str += '</div>'
    $('#loadinWall').hide()
    $('#chargeWall').show()
    return str
  },
  showProduct: function(channel) {
    if (typeof statisticsAuthNewLogUrl != 'undefined') {
      $('#pay-box').append(
        '<img src="' +
          statisticsAuthNewLogUrl +
          '&isEvent=1&eventName=ClickSubscribe" />'
      )
    }

    $('.probation').css({ 'padding-bottom': '13px' })
    $('.no-info-line').css({ height: '80px' })
    $('.dialoguebox .middle .Coupon').css({ padding: '44px 0 9px 10px' })

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
      jslink.src = '//www.googletagmanager.com/gtag/js?id=UA-27956240-3'
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
      fn && fn(_DataJson)
      $('#artPicMain,#displayContentDiv').show()
      $('.teshusjzs img').show()
      $('.videoAuthShow').show()
      this.grade++
    }
  },
  Invalid: function(fn) {
    _DataJson = Config._DataJson
    if (_DataJson.status == '-7' || _DataJson.status == '-8') {
      fn && fn(_DataJson)
      this.grade++
    }
  },
  noAuth: function(fn) {
    _DataJson = Config._DataJson
    if (this.grade < 1 || _DataJson.status != 3) {
      fn && fn(_DataJson)
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
      window.btnShowVal = '数据通收费文章，请付费阅读' //单篇
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
      //this.upgradeQZSF();
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
      window.btnShowVal = '数据通收费文章，请付费阅读' //单篇
      this.upgradePRO()
      //this.listData.push('PRO');
    }

    //财新通，周刊通，赤龙，谢平，王烁，数据+，单篇

    /*if(entity.fromchannel.indexOf('16') != '-1') {
			//this.upgradeQZSF();
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

    /*
		 *	test swiper
		 *  @googs sequence
		 *      list:财新通，周刊通，赤龙，谢平，王烁，数据+，单篇
		 *	@params
		 *      len<number> goods number
		 *	@testCode:
		 *		this.listData = [];
		 *		var len = 1;
		 *		for(var i = 0; i < len; i++) {
		 *			this.listData.push('PRO');
		 *		}
		 */
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
        window.btnShowVal = '全网畅读  请选择订阅方式' //单篇
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
      //_this.listData.push('SJPRO');
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
      type: 0,
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
        alert('服务返回异常')
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
    if (_HtmlIsOK) {
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
      // Logic.clearCookie();
      if (_DataJson.status == '-8') {
        alert('登录失效请重新登录')
        Logic.clearCookie()
        window.location.reload()
      } else {
        $.ajax({
          url: '//gateway.caixin.com/api/ucenter/user/v1/logout',
          type: 'GET',
          dataType: 'jsonp',
          success: function(res) {
            if (res.code == 0) {
              alert(
                '你的帐号已在其他设备上进行登录，本机登录失效，请重新登录。'
              )
              Logic.clearCookie()
              window.location.href =
                '//u.caixin.com/user/uc/logout.html?url=' +
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
          $('#moreArticle').show()
          //var data = $('.newsCon .data').clone();
          $('.newsCon').html('')
          $('.moreArt').trigger('click')
        }
      } catch (e) {}
      domain.writeContentData()
      $('.textContent .vedio').show()
      $('#loadinWall').hide()
      $('#chargeWall').show()
      $('#mainLivePart_6').css({ height: 'auto' })
      $('.showbtn').hide()
      return false
    })
    auth.noAuth(function(_DataJson) {
      //console.log(getShopList.init())
      /*getProductList.writeProductList(Utils.formatData({
                  req: getShopList.init()
            }))*/
      var getshoplistinit = getShopList.init()

      /////***/////////
      $('.textContent .vedio').hide()
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
            '//gateway.caixin.com/api/authority/upgradeProduct/v1/allowUpgrade',
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

      if (typeof wapSpeCostTmp != 'undefined') {
        $('#chargeWall').html(wapSpeCostTmp())
        return false
      }
      if (typeof attr != 'undefined') {
        if (attr != 4) {
          if (
            window.location.href.indexOf('video.caixin.com') != '-1' ||
            window.location.href.indexOf('gbiz.caixin.com') != '-1'
          ) {
            $('#chargeWall .content').html(showUI.getVideoTitleTmpHtml())
          } else {
            $('#chargeWall .content').html(showUI.getTitleTmpHtml())
          }
          getWordNum()
        } else {
        }
      } else {
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
    $('.teshusjzs img').hide()
    _HtmlIsOK = true
    var html = '<div id="loadinWall" class="loading">'
    html +=
      '<img src="//file.caixin.com/file/content/images/loading.gif">页面加载中...'
    html += '</div>'
    $('#Main_Content_Val').after(html)
    $('#chargeWall').hide()
    if (Config._JsonIsOK) {
      setTimeout(function() {
        domain.writeContentInfo()
      }, 500)
    }
    if (!GetCookieValue('SA_USER_UID')) {
      domain.writeContentInfo()
    }
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
      try {
        if (typeof oneline == 'undefined' /* && oneline != 'isTrue'*/) {
          if (typeof addStockAndBond != 'undefined') {
            addStockAndBond()
          }
        }
      } catch (e) {}
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
    var goodsid = $('.now').attr('goodsid')
    var extStr3 = $('.now h4').html()
    var goodsprice = parseFloat(
      $('.couponselet')
        .find('option:selected')
        .attr('void')
    )
    var goodspricetrial = window.nowProce
    if ($('.now').attr('trialprice') != 'null') {
      if (canTrial[goodsid]) {
        goodspricetrial = $('.now').attr('trialpricecost')
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
    var params = {
      platform: 'WEB',
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
      if (window.maVoRules[i].voucherId == $('.couponselet').val()) {
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
        /*data: {
		        platform: 'WEB',
		        price: goodsPrice,
		        quantity: 1,
		        shippingFee: 0,
		        goodsId: goodsId,
		        orderAmount: goodsPrice,
		        specId: specId,
		        channel: window.Config.channel
		      },*/
        dataType: 'jsonp',
        success: function(res) {
          if (res.code == 0) {
            window.location.href =
              payUrl +
              '?orderSn=' +
              res.data.orderSn +
              '&backUrl=' +
              encodeURIComponent(
                window.location.href.indexOf('?') > 0
                  ? window.location.href.substr(
                      0,
                      window.location.href.indexOf('?')
                    )
                  : window.location.href
              )
          } else {
            if (res.code == 4061) {
              var con = confirm('您已开通该商品续订服务，继续购买请先取消续订')
              if (con) {
                window.location.href = '//u.caixin.com/user/renew.html'
              }
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
          data = res.data.goodList[0]
          if (res.code == 0) {
            $.ajax({
              url: gatewayApi + 'api/mall/unifiedOrders',
              data: params,
              /*data: {
		              platform: 'WEB',
		              price: data.price,
		              quantity: 1,
		              shippingFee: 0,
		              goodsId: data.goodsId,
		              orderAmount: data.price,
		              specId: data.specId,
		              channel: window.Config.channel
		            },*/
              dataType: 'jsonp',
              success: function(res) {
                if (res.code == 0) {
                  window.location.href =
                    payUrl +
                    '?orderSn=' +
                    res.data.orderSn +
                    '&backUrl=' +
                    encodeURIComponent(
                      window.location.href.indexOf('?') > 0
                        ? window.location.href.substr(
                            0,
                            window.location.href.indexOf('?')
                          )
                        : window.location.href
                    )
                } else {
                  if (res.code == 4061) {
                    var con = confirm(
                      '您已开通该商品续订服务，继续购买请先取消续订'
                    )
                    if (con) {
                      window.location.href =
                        '//u.caixin.com/user/renew.html'
                    }
                  } else {
                    alert('购买失败：' + res.msg)
                  }
                }
              }
            })
          } else {
            if (res.code == 4061) {
              var con = confirm('您已开通该商品续订服务，继续购买请先取消续订')
              if (con) {
                window.location.href = '//u.caixin.com/user/renew.html'
              }
            } else {
              alert('请求商品失败：' + res.msg)
            }
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
        platform: 'WEB',
        returnUrl:
          window.location.href.indexOf('?') > 0
            ? window.location.href.substr(0, window.location.href.indexOf('?'))
            : window.location.href,
        uid: GetCookieValue('SA_USER_UID')
      }

      for (var i = 0; i < window.maVoRules.length; i++) {
        if (window.maVoRules[i].voucherId == $('.couponselet').val()) {
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
          if (res.code == 0) {
            window.location.href =
              payUrl +
              '?orderSn=' +
              res.data.orderSn +
              '&backUrl=' +
              encodeURIComponent(
                window.location.href.indexOf('?') > 0
                  ? window.location.href.substr(
                      0,
                      window.location.href.indexOf('?')
                    )
                  : window.location.href
              )
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
    htmlStr += '<div class="pricebox"><div class="sbmain">'
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

        // if(goodResult.goodsId == 692 || goodResult.goodsId == 718 || goodResult.goodsId == 662) {
        //  		window.isSdShop = {
        //    		isTrial: goodResult.isTrial,
        //    		isUseTrial: goodResult.isUseTrial
        //    	}
        //    }
        //if (i == 0) {
        if (
          Utils.isUndefinde(goodResult.isTrial) &&
          goodResult.isTrial == 1 &&
          Utils.isUndefinde(goodResult.isUseTrial) &&
          goodResult.isUseTrial == 1
        ) {
          if (/*price < 0.0000001 && */ i == 0) {
            window.nowProce = goodResult.price
            htmlStr +=
              '<div class="items now" trialPriceCost="' +
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
              '<div class="items"  trialPriceCost="' +
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
          if (/*price < 0.0000001 && */ i == 0) {
            window.nowProce = goodResult.price
            htmlStr +=
              '<div class="items now" trialPriceCost="' +
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
              '<div class="items" trialPriceCost="' +
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
        htmlStr += this.getTile(goodResult.powerType)
        //htmlStr += '<h4>'+goodResult.goodsName+'</h4>';
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
        htmlStr += '<span class="roundLeft"></span>'
        htmlStr += '</div>'
      }
    }

    if (price > 0) {
      getProductList.warnInfoarr.push('单独购买该篇文章')
      if (res.data.goodList.length < 1) {
        //window.nowProce = price;
        htmlStr +=
          '<div class="items now" trialamount="undefined" powerType="single" trialprice="null" goodsid="1">'
        htmlStr += '<h4>单篇文章</h4>'
        htmlStr += '<div><span class="nowProce">' + price + '</span>元 </div>'
        htmlStr += '<label></label>'
        htmlStr += '</div>'
      } else {
        //window.nowProce = price;
        htmlStr +=
          '<div class="items" trialamount="undefined" powerType="single" trialprice="null" goodsid="1">'
        htmlStr += '<h4>单篇文章</h4>'
        htmlStr += '<div><span class="nowProce">' + price + '</span>元 </div>'
        htmlStr += '<label></label>'
        htmlStr += '</div>'
      }
    }

    htmlStr +=
      '<div class="items itemslast itemsSwiper" style="background:#c4e3df;"><a href="//mall.caixin.com/mall/web/index/index.html" style="color:#222;">'
    htmlStr += '<h4>财新商城</h4>'
    htmlStr +=
      '<div style="font-size:16px; top: 70px;">更多优惠请进入<br>财新商城</div>'
    htmlStr += '<label style="visibility: hidden;"></label></a>'
    htmlStr += '</div>'

    htmlStr += '</div></div>'
    htmlStr += '<div class="couponwarn"></div>'
    htmlStr += '<div class="Coupon">'
    htmlStr += '<lable>使用优惠券</lable>'
    htmlStr +=
      '<select class="couponselet"><option value="0" void="0">请选择</option></select>'
    htmlStr += '</div>'
    htmlStr += '<div class="no-info-line"><div></div></div>'
    htmlStr +=
      '<div class="probation" style="padding-right: 88px;color:#a18b73;text-align:right;overflow:hidden;">&nbsp;</div>'
    htmlStr += '<div class="butlist">'
    htmlStr += '<div>订阅金额:'
    htmlStr += '<span>0.00<i>元</i></span>'
    htmlStr += '</div>'
    htmlStr += '<a class="singlePay" href="javascript:;">立即购买</a>'
    htmlStr += '</div>'
    return htmlStr
  },
  setFiexd: function() {
    var len = $('.types .items').length
    var lenOld = $('.types .items').length
    var sbmain = $('.dialoguebox .middle .sbmain')
    if (lenOld == 1) {
      sbmain.css({ left: '186px' })
    }
    if (lenOld == 2) {
      sbmain.css({ left: '93px' })
    }

    if (len % 3 != 0) {
      len = parseInt(len / 3) + 1
    } else {
      len = parseInt(len / 3)
    }
    sbmain.width(len * 566)
    var clicknum = len
    var appendStr = ''
    appendStr +=
      '<div class="preBtn" style="display:none;cursor:pointer;width:67px;height:173px;background:url(//file.caixin.com/static/mh5/images/box_left_news.png);position:absolute;left:0px;top:93px;z-index:111;"></div>'
    appendStr +=
      '<div class="nextBtn" style="cursor:pointer;width:67px;height:173px;background:url(//file.caixin.com/static/mh5/images/box_right_news_old.png?v=4343);position:absolute;right:0px;top:93px;z-index:111;"></div>'
    if (lenOld > 3) {
      $('.dialoguebox').append(appendStr)
    }
    $('.preBtn').on('click', function() {
      var left = $('.sbmain').css('left')
      if (parseInt(left) <= -556) {
        $('.sbmain').css('left', parseInt(left) + 556)
      } else {
      }
      if (parseInt(left) == -556) {
        $(this).hide()
        $('.nextBtn').show()
      } else {
        $('.preBtn').show()
      }
      if (parseInt(left) == -(len - 2) * 556) {
      } else {
        $('.nextBtn').show()
      }
    })
    $('.nextBtn').on('click', function() {
      var left = $('.sbmain').css('left')
      if (parseInt(left) == -(len - 2) * 556) {
        $(this).hide()
        $('.preBtn').show()
      } else {
        $('.nextBtn').show()
      }

      if (parseInt(left) == -556) {
      } else {
        $('.preBtn').show()
      }

      if (parseInt(left) >= -(len - 1) * 556) {
        $('.sbmain').css('left', parseInt(left) - 556)
      } else {
      }
    })
    return this
  },
  setDefaultCounpon: function() {
    if (
      $('.types .items')
        .eq(0)
        .attr('powertype') == 'single'
    ) {
      this.getCoupon()
    } else {
      this.getCouponShop(0)
      //$('.couponselet').html('<option value="0" void="0">无可用优惠券</option>');
    }

    getProductList.getGoodInfo(0)
    //$(".butlist span").html(window.nowProce + "<i>元<i>");
    return this
  },
  setDefaultShowCost: function(data) {
    var dataRules = data.marketVouchersRules
    var type = dataRules.vouchersType
    var voucherId = data.voucherId
    if (type == 1) {
      var delval =
        (window.nowProce * 100000 -
          parseFloat(dataRules.vouchersDiscountMoney) * 100000) /
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
      var zheNum = parseFloat(dataRules.vouchersDiscountMoney)
      $('.dialoguebox .middle .butlist div span').html(
        Number(price * zheNum * 0.1).toFixed(2) + '<i>元</i>'
      )
    }
    if (type == 3) {
      $('.dialoguebox .middle .butlist div span').html('0<i>元</i>')
    }
  },
  setStyle: function() {
    //$('body').append('<link rel="stylesheet" type="text/css" href="//file.caixin.com/webchannel/article/newart.css"/>');
    return this
  },
  clickFn: function(ele, event, fn) {
    ele.on(event, fn)
  },
  getCouponShop: function(index) {
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
      platform: 'WEB',
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
        var str = ''
        if (result.code == '0' && typeof result.data != 'undefined') {
          window.maVoRules = result.data
          var couponUselen = 0
          for (var i = 0; i < result.data.length; i++) {
            if (result.data[i].param1 == 'true') {
              couponUselen++
              if (i == 0) {
                str +=
                  '<option selecte	 value="' +
                  result.data[i].voucherId +
                  '" void="' +
                  result.data[i].marketVouchersRules.vouchersDiscountMoney +
                  '">' +
                  result.data[i].marketVouchersRules.vouchersTitle +
                  '</option>'
              } else {
                str +=
                  '<option value="' +
                  result.data[i].voucherId +
                  '" void="' +
                  result.data[i].marketVouchersRules.vouchersDiscountMoney +
                  '">' +
                  result.data[i].marketVouchersRules.vouchersTitle +
                  '</option>'
              }
            }
          }
        }
        if (str == '') {
          $('.couponselet').html(
            '<option value="0" void="0">无可用优惠券</option>'
          )
          $('.no-info-line').show()
          $('.dialoguebox .middle .Coupon').hide()
        } else {
          $('.couponselet').html(
            '<option value="0" void="0">请选择</option>' + str
          )
          $('.no-info-line').hide()
          $('.dialoguebox .middle .Coupon').show()
        }
        if (couponUselen < 1) {
          $('.dialoguebox .middle .Coupon').hide()
          $('.no-info-line').show()
        }

        $('.butlist span').html($('.now .nowProce').html() + '<i>元</i>')

        if ($('.pricebox .now').attr('trialprice') != 'null') {
          $('.no-info-line').show()
          $('.dialoguebox .middle .Coupon').hide()
        } else {
          $('.butlist').html(
            $('.butlist')
              .html()
              .replace(/订阅/, '实付')
          )
        }

        $('.probation').html('&nbsp;')
        var trialamount = $('.now').attr('trialamount')
        var trialPriceCost = $('.now').attr('trialPriceCost')
        var trialunit = $('.now').attr('trialunit')
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
            setTrialStyle(goodsData.goodsId, trialamount)
          }
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
          platform: 'WEB',
          price: price,
          systemType: '100102',
          uid: GetCookieValue('SA_USER_UID'),
          articleId: entity.id
        })
      },
      success: function(result) {
        var str = ''
        if (result.code == '0') {
          window.maVoRules = result.data
          var couponUselen = 0
          for (var i = 0; i < result.data.length; i++) {
            couponUselen++
            if (i == 0) {
              str +=
                '<option selected=true value="' +
                result.data[i].voucherId +
                '" void="' +
                result.data[i].marketVouchersRules.vouchersDiscountMoney +
                '">' +
                result.data[i].marketVouchersRules.vouchersTitle +
                '</option>'
            } else {
              str +=
                '<option value="' +
                result.data[i].voucherId +
                '" void="' +
                result.data[i].marketVouchersRules.vouchersDiscountMoney +
                '">' +
                result.data[i].marketVouchersRules.vouchersTitle +
                '</option>'
            }
          }
        }
        if (window.maVoRules.length > 0) {
          getProductList.setDefaultShowCost(result.data[0])
        }
        if (str == '') {
          $('.couponselet').html(
            '<option value="0" void="0">无可用优惠券</option>'
          )
          $('.no-info-line').show()
          $('.dialoguebox .middle .Coupon').hide()
        } else {
          $('.couponselet').html(
            '<option value="0" void="0">请选择</option>' + str
          )
          $('.no-info-line').hide()
          $('.dialoguebox .middle .Coupon').show()
        }

        if (couponUselen < 1) {
          $('.dialoguebox .middle .Coupon').hide()
          $('.no-info-line').show()
        }

        $('.butlist span').html($('.now .nowProce').html() + '<i>元</i>')

        if ($('.pricebox .now').attr('trialprice') != 'null') {
          $('.no-info-line').show()
          $('.dialoguebox .middle .Coupon').hide()
        }
        $('.probation').html('&nbsp;')
        var trialamount = $('.now').attr('trialamount')
        var trialPriceCost = $('.now').attr('trialPriceCost')
        var trialunit = $('.now').attr('trialunit')
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
              $('.probation')
                .html('&nbsp;')
                .css({ 'padding-bottom': '13px' })
              $('.no-info-line').css({ height: '80px' })
              $('.dialoguebox .middle .Coupon').css({
                padding: '44px 0 4px 10px'
              })
            }
          }
        }
      }
    })
  },
  writeProductList: function(data) {
    var magzineTypeData = ''
    $.ajax({
      url: Config.gatewayApi + 'api/cxmall/api4ExtenSys/findGoodsByListConf',
      data: data || {},
      dataType: 'jsonp',
      success: function(res) {
        if (res.code == 0) {
          window.ProductItem = res.data.goodList
          //初始化模板
          $('.types').html(getProductList.setTmp(res))
          //设置定位，设置实付金额，设置样式
          getProductList
            .setDefaultCounpon()
            .setStyle()
            .setFiexd()

          $('body').on('click', '.singlePay', function() {
            Payment.singlePay()
            return false
          })

          getProductList.clickFn($('.Coupon select'), 'change', function() {
            for (var i = 0; i < window.maVoRules.length; i++) {
              var maVoRules = window.maVoRules[i]
              if ($(this).val() == maVoRules.voucherId) {
                // type: 1,现金减免类型
                if (maVoRules.marketVouchersRules.vouchersType == 1) {
                  var delval =
                    (parseFloat(
                      $('.couponselet')
                        .find('option:selected')
                        .attr('void')
                    ) *
                      10000000000 -
                      price * 10000000000) /
                    10000000000
                  if (
                    window.nowProce -
                      maVoRules.marketVouchersRules.vouchersDiscountMoney <
                    0
                  ) {
                    $('.butlist span').html('0<i>元<i>')
                  } else {
                    $('.butlist span').html(
                      (window.nowProce * 1000000 -
                        maVoRules.marketVouchersRules.vouchersDiscountMoney *
                          1000000) /
                        1000000 +
                        '<i>元<i>'
                    )
                    //$('.butlist span').html(window.nowProce - maVoRules.marketVouchersRules.vouchersDiscountMoney+"<i>元<i>");
                  }
                  // type: 2 打折券
                } else if (maVoRules.marketVouchersRules.vouchersType == 2) {
                  var realPayAmount = discountCoupon.getRealPrice(
                    window.nowProce,
                    maVoRules.marketVouchersRules.vouchersDiscountMoney
                  )
                  $('.butlist span').html(realPayAmount + '<i>元<i>')
                  // type: 3 免费商品
                } else if (maVoRules.marketVouchersRules.vouchersType == 3) {
                  $('.butlist span').html('0<i>元<i>')
                }
                break
              } else {
                $('.butlist span').html(window.nowProce + '<i>元<i>')
              }
            }
          })

          getProductList.clickFn($('.types .items'), 'click', function() {
            var thisIndex = $(this).index()
            var goodsId = $(this).attr('goodsid')
            if ($('.types .items').length - 1 != thisIndex) {
              getProductList.getGoodInfo(thisIndex)
              if ($(this).attr('powertype') == 'single') {
                getProductList.getCoupon()
              } else {
                //if(price > 0) {
                //	getProductList.getCouponShop($(this).index()-1);
                //}else{
                if (!canTrial[goodsId]) {
                  getProductList.getCouponShop(thisIndex)
                }
                //}
                //$('.couponselet').html('<option value="0" void="0">无可用优惠券</option>');
              }
              //$('.couponselet').val(0);
              $(this)
                .addClass('now')
                .siblings()
                .removeClass('now')
              window.nowProce = parseFloat($('.now .nowProce').html())
              //$(".butlist span").html(window.nowProce + "<i>元<i>");
              if ($(this).attr('trialprice') != 'null') {
                $('.butlist').html(
                  '<div>订阅金额:<span>' +
                    window.nowProce +
                    '<i>元</i></span></div><a class="singlePay" href="javascript:;">立即购买</a>'
                )
              } else {
                $('.butlist').html(
                  '<div>实付金额:<span>' +
                    window.nowProce +
                    '<i>元</i></span></div><a class="singlePay" href="javascript:;">立即购买</a>'
                )
              }
              $('.probation').html('&nbsp;')
              var trialamount = $('.now').attr('trialamount')
              var trialPriceCost = $('.now').attr('trialPriceCost')
              var trialunit = $('.now').attr('trialunit')
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
                  setTrialStyle(goodsId, trialamount)
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
  }
}

function setTrialStyle(goodsId, trialamount) {
  if ($('.now').attr('trialprice') != 'null') {
    if (goodsId && canTrial[goodsId]) {
      $('.probation')
        .html('免费试读' + trialamount + '天')
        .css({ 'padding-bottom': '13px' })
      $('.no-info-line').css({ height: '80px' })
      $('.dialoguebox .middle .Coupon').css({ padding: '44px 0 4px 10px' })
    } else {
      $('.probation')
        .html('&nbsp;')
        .css({ 'padding-bottom': '13px' })
      $('.no-info-line').css({ height: '80px' })
      $('.dialoguebox .middle .Coupon').css({ padding: '44px 0 4px 10px' })
    }
  }
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

/*function getWordNum() {
	var href = location.href;
	var host = location.host;
	var id = location.href.match(/(\d*)(\.html)/)[1];
	var url = '//' + host + '/frag/newsdata/' + id.slice(-4) + '/' + id + '.js?times='+ getDate();
	var scriptjs = document.createElement('script');
	scriptjs.src = url;
	document.getElementById('chargeWall').appendChild(scriptjs);
}*/

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
    '//' +
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

function resetContentInfo(data) {
  domain.resetContentInfo(data)
}

function buildContentInfo() {
  domain.buildContentInfo()
}

//隐藏收费框
$(function() {
  $('#pay-box').hide()
  $('.maskclose').click(function() {
    $('#pay-box').hide()
  })
  domain.readyContentInfo()
  $('.textContent .vedio').hide()
})

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
  str += '<div class="con cf"><div class="left"><dl>'
  str += '<dt>' + description + '</dt>'
  str +=
    '<dd><a href="//www.caixin.com/subscribe/"> 了解更多&gt;&gt; </a></dd>'
  str += '</dl></div>'
  str += '<div class="right"><dl>'
  str +=
    '<dt><img src="//file.caixin.com/file/content/images/wifi-close.png" width="20"></dt>'
  str +=
    '<dd><img src="' + codetoimg(data.productCode) + '" width="95"></dd></dl>'
  str += '</div></div></div>'
  var url = window.location.pathname
  if (/\.html$/.test(url) || /detail\_/.test(url)) {
    $('head').append(
      '<link rel="stylesheet" href="//file.caixin.com/independent/bigcustomer/pc.css" />'
    )
    $('body').prepend(str)
    renewals.setPos()
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
            str += '<div class="con cf"><div class="left"><dl>'
            str += '<dt>' + description + '</dt>'
            str +=
              '<dd><a href="//www.caixin.com/subscribe/"> 了解更多&gt;&gt; </a></dd>'
            str += '</dl></div>'
            str += '<div class="right"><dl>'
            str +=
              '<dt><img src="//file.caixin.com/file/content/images/wifi-close.png" width="20"></dt>'
            str +=
              '<dd><img src="//file.caixin.com/file/content/images/mobile/pc_cx_logo.png" width="95"></dd></dl>'
            str += '</div></div></div>'
            var url = window.location.href
            if (/\.html$/.test(url) || /detail\_/.test(url)) {
              $('head').append(
                '<link rel="stylesheet" href="//file.caixin.com/independent/bigcustomer/pc.css" />'
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
