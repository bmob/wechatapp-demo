var Bmob = require("../../../dist/Bmob-1.4.4.min.js");
var common = require("../../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  formSubmit: function (event) {
    var point = Bmob.GeoPoint({ latitude: 22.052033, longitude: 112.405447 })
    var point1 = Bmob.GeoPoint({ latitude: 24.052033, longitude: 114.405447 })
    var query = Bmob.Query("address");
    query.withinGeoBox("address", point, point1);  //10指的是公里
    query.find().then(res => {
      console.log(res)
      common.showTip(res[0].objectId,"success");
    }).catch(err => {
      console.log(err)
    })
  }
})