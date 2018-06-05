var that;
var Bmob = require("../../../dist/Bmob-1.4.4.min.js");
var common = require("../../../utils/common.js");
Page({

  data:{
    loading:true
  },
  onLoad:function(){
    that = this;
  },
  upload:function(){
    wx.chooseImage({
      count:9,
      sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都有
      success: function(res) {
        wx.showNavigationBarLoading()
        that.setData({
          loading:false
        })
        var urlArr = new Array();
        var tempFilePaths = res.tempFilePaths;
        var imgLength = tempFilePaths.length;
        if(imgLength > 0){
          var file;
          for (var i = 0; i < imgLength; i++){
            var tempFilePath = tempFilePaths[i];
            var timestamp = Date.parse(new Date());
            var extension = /\.([^.]*)$/.exec(tempFilePath);
            extension = extension[1].toLowerCase();
            var name = timestamp + "." +extension;
            var file = Bmob.File(name, tempFilePath);
            
          }
          file.save().then(res => {
            that.setData({
              loading: true
            })
            wx.hideNavigationBarLoading();
            common.showTip("上传成功", "success");
          })
          
        }else{
          common.showTip("请选择图片","loading");
        }
      },
    })
  }
})