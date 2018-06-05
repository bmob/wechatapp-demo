var Bmob= require("../../../dist/Bmob-1.4.4.min.js");
var common = require("../../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "imageBytes": ""
  },
  noneWindows: function () {
    this.setData({
      imageBytes: ""
    })
  },
  formSubmit: function (event) {
    var path = event.detail.value.path;
    var width = event.detail.value.width;
    var that = this;
    if(path == ""){
      common.showTip("请输入路径","loading");
      return false;
    }
    let qrData = { path: path, width: width, type: 1 };
    Bmob.generateCode(qrData).then(function (res) {
      console.log(res);
      that.setData({
        imageBytes: res.url
      })
    }).catch(function (err) {
        console.log(err);
    });
  }


})