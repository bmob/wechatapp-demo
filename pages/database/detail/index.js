// pages/database/detail/index.js
var Bmob = require("../../../dist/Bmob-1.4.4.min.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rows:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取一行记录
    var objectId = options.objectId;
    var that =this;
    var query = Bmob.Query("diary");
    //数据关联,查询Pointer
    query.include('own', '_User')
    query.get(objectId).then(res=>{
      that.setData({
        rows: res,
      })
    }).catch(err=>{
      console.log(err)
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
  
  }
})