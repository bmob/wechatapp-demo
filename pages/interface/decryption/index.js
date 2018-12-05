// pages/interface/decryption/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.Bmob.functions('getPhone').then(res => {
      console.log(res, res.result, 333);
    })
    wx.request({
      url: 'http://cloud.bmob.cn/4109ef68482912cb/getPhone',
      success: res => {
        console.log(res, 777)
      }
    })
  },
  weRun: function (e) {
    console.log(e)
    
   
    
    wx.getWeRunData({
      success(res) {
        wx.Bmob.User.decryption(res).then(res => {
          console.log(res)
        })
      }
    })
  },
  getPhoneNumber: function (res) {
    wx.Bmob.User.decryption(res).then(res => {
      console.log(res, 444)
    })
 // 解密后云函数返回数据格式如下
    // { "phoneNumber":"137xxxx6579", "purePhoneNumber":"137xxxx6579", "countryCode":"86", "watermark":{ "timestamp":1516762168, "appid":"wx094ede192e7efff" } }
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

  onShareAppMessage: function (res) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Bmob 示例',
      path: 'pages/index/index',
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success(res) {
            // 调用解密
            wx.Bmob.User.decryption(res).then(res => {
              console.log(res, 444)
            })
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})