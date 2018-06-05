// pages/center/feedback/index.js
var Bmob = require('../../../dist/Bmob-1.4.4.min.js');
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =  this;
    var userData = wx.getStorageSync("userData");
    that.setData({
      userInfo:userData
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
  addFeedback: function (event) {
    var that = this;
    var contact = event.detail.value.contact;
    var content = event.detail.value.content;

    if (!contact) {
      common.showTip("标题不能为空", "loading");
      return false;
    }
    else if (!content) {
      common.showTip("内容不能为空", "loading");
      return false;
    }
    else {
      that.setData({
        loading: true
      })
      var query = Bmob.Query("feedback");
      query.set("contact", contact);
      query.set("content", content);
      query.save().then(res => {
        common.showModal('保存反馈成功，点击确定返回。', '提示', function () {
          wx.navigateBack();
        });
        that.setData({
          loading: false
        })
      }).catch(err => {
        // 添加失败
        common.showModal('保存反馈失败，请重新发布');

      })
    }

  },
})