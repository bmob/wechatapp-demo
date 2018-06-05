var Bmob = require("../../../dist/Bmob-1.4.4.min.js");
var common = require("../../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  formSubmit: function (event) {
    var latitude = event.detail.value.latitude;
    var longitude = event.detail.value.longitude;

    if(latitude == "" || longitude == ""){
      common.showTip("请填写完整","loading");
      return false;
    }

    var point = Bmob.GeoPoint({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }) //创建地理位置对象
    var query = Bmob.Query('address'); //数据库名
    query.set("address", point)  //字段名
    query.save().then(res => {
      console.log(res)
      common.showTip("添加成功", "success");
    }).catch(err => {
      console.log(err)
    })
  }
})