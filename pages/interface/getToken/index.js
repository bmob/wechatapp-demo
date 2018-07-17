// pages/interface/getToken/index.js
var common = require("../../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true
  },
  getToken: function () {
    var that = this;
    wx.Bmob.getAccessToken().then(function (response) {
      that.setData({
        loading: true,
        accessToken:response.access_token
      });
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }
})