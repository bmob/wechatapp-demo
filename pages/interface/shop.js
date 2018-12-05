// pages/interface/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabContentData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const relation = wx.Bmob.Relation('_User') // 需要关联的表
    // const relID = relation.add(['azHoBBBM', '97d593426d','e399ba2176']) //关联表中需要关联的objectId, 返回一个Relation对象, add方法接受string和array的类型参数
    // const query = wx.Bmob.Query('diary')
    // query.get('de51db4659').then(res => {
    //   res.set('zan', relID); // 将Relation对象保存到two字段中，即实现了一对多的关联
    //   res.save()
    // })

    const query = wx.Bmob.Query('diary')
    query.field('zan','de51db4659')
    query.select('username')
    query.statTo('count',1)
    query.find().then(res => {
      console.log(res);
    })

    // query.count().then(res => {
    //   console.log(res,998);
    // })

  },

  navigateBack: function navigateBack () {

  },
  handleChange: function handleChange (e) {

  },

  onReady: function onReady () {
    this.setData({
    });
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