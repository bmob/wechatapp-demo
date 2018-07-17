var common = require("../../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  formSubmit: function (event) {
    var point = wx.Bmob.GeoPoint({ latitude: 22.052033, longitude: 112.405447 })
    var point1 = wx.Bmob.GeoPoint({ latitude: 24.052033, longitude: 114.405447 })
    var query = wx.Bmob.Query("address");
    query.withinGeoBox("address", point, point1);  //10指的是公里
    query.find().then(res => {
      console.log(res)
      common.showTip(res[0].objectId,"success");
    }).catch(err => {
      console.log(err)
    })
  }
})