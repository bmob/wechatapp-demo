// pages/center/index.js
var Bmob = require('../../dist/Bmob-1.4.4.min.js');
var common = require('../../utils/common.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面初始化 options为页面跳转所带来的参数
    var that = this;
    var value = wx.getStorageSync('openid')
    let current = Bmob.User.current();
    that.setData({
      userInfo: current
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  open: function () {
    var that = this;

    wx.login({
      success: function (res) {
        Bmob.User.auth().then(res => {
          console.log(res);
          var objectId = res.objectId;
          var openid = res.authData.weapp.openid;
          if (res.nickName) {
            wx.setStorageSync('openid', openid);
            that.onLoad();
          } else {
            wx.getUserInfo({
              success: function (result) {
                that.setData({
                  loading: false
                })
                var userInfo = result.userInfo;
                var nickName = userInfo.nickName;
                var userPic = userInfo.avatarUrl;

                var query = Bmob.Query("_User");
                query.get(objectId).then(res => {
                  console.log(res);
                  res.set("nickName", nickName);
                  res.set("userPic", userPic);
                  res.set("openid", openid);
                  res.save();
                  wx.setStorageSync('openid', openid)
                  setTimeout(function () {
                    that.setData({
                      loading: true
                    })
                    that.onLoad()
                  }, 2000);
                })
              }
            })
          }
        }).catch(err => {
          console.log(err);
        })
      }, fail: function (res) {
        that.setData({
          loading: true
        })
      }
    });
  },
  about: function (e) {
    common.showModal('本程序后端使用Bmob简单实现，仅供学习使用，如想加入一起学习，请加QQ群：118541934');
  }
})