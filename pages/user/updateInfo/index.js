var Bmob = require("../../../dist/Bmob-1.4.4.min.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    hasUserInfo:true
  },

  getUserInfo: function (e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: false
    })
    Bmob.User.upInfo(e.detail.userInfo).then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })
  }
})