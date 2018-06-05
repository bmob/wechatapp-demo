var Bmob = require("../../../dist/Bmob-1.4.4.min.js");
var common = require("../../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  pay: function () {
    var openId = wx.getStorageSync('openid');
    //传参数金额，名称，描述,openid
    Bmob.Pay.weApp(0.01, '哇哈哈1瓶', '哇哈哈饮料，杭州生产', openId).then(function (resp) {
      console.log(resp);

      that.setData({
        loading: true,
        dataInfo: resp
      })

      //服务端返回成功
      var timeStamp = resp.timestamp,
        nonceStr = resp.noncestr,
        packages = resp.package,
        orderId = resp.out_trade_no,//订单号，如需保存请建表保存。
        sign = resp.sign;

      //打印订单号
      console.log(orderId);

      //发起支付
      wx.requestPayment({
        'timeStamp': timeStamp,
        'nonceStr': nonceStr,
        'package': packages,
        'signType': 'MD5',
        'paySign': sign,
        'success': function (res) {
          //付款成功,这里可以写你的业务代码
          console.log(res);
        },
        'fail': function (res) {
          //付款失败
          console.log('付款失败');
          console.log(res);
        }
      })

    }, function (err) {
      common.showTip("暂不支持支付","loading");
      console.log('服务端返回失败');
      console.log(err);
    });

  }
})