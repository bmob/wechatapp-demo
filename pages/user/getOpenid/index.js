// pages/other/other.js
var that;
var common = require('../../../utils/common.js');
Page({
  data: {
    loading: true
  },
  onLoad: function () {
    that = this;
    // 页面初始化 options为页面跳转所带来的参数
  },
  getOpenId: function () {
    //获取open id，请在官网填写微信小程序key
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code)
          wx.Bmob.User.requestOpenId(res.code).then(result=>{
            that.setData({
              loading: true,
              url: result.openid
            })
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
          common.showTip('获取用户登录态失败！', 'loading');
        }
      }
    });
  }
})