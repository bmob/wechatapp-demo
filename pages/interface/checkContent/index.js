var common = require("../../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  uploadCheck:function(){
    var that =this
    that.setData({
      loading: true
    })
    // 2.0图片检测
    wx.chooseImage({
      count:9,
      sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都有
      success: function(res) {
        let userData = wx.Bmob.User.current()
        var open_Id = userData.openid;
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
            var file = wx.Bmob.File(name, tempFilePath);
            
          }
          file.save().then(res => {
            that.setData({
              loading: false
            })
            console.log(res,99)

            for (const key in res) {

                const element = res[key];
                console.log(element,'element');
                let params = {
                  media_url:element.url,
                  media_type:2, //1:音频;2:图片
                  openid:open_Id, //用户的openid（用户需在近两小时访问过小程序）
                  scene:1,
                  version:2
                }
                wx.Bmob.mediaCheckAsync(params).then(res=>{
                  console.log('hh',res);
                })
            }

            
            wx.hideNavigationBarLoading();
            common.showTip("上传成功", "success");
          })
          
        }else{
          common.showTip("请选择图片","loading");
        }
      },
    })
  },
  upload:function(){
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        var file;
        for (let item of tempFilePaths) {
          console.log('itemn',item)
          file = wx.Bmob.File('abc.jpg', item);
        }
        file.imgSecCheck().then(res => {
          console.log("legth",res.length);
          console.log(res);
        }).catch(err=>{
            console.log(err);
        })

      }
    })
  },
  formSubmit: function (e) {
    let content = e.detail.value.content;
    if (content == "") {
      common.showTip("请输入内容", "loading");
      return false;
    }
    // wx.Bmob.checkMsg(content).then(res => {
    //   common.showTip(res.msg,"success");
    // }).catch(err => {
    //   console.log(err);
    // });
    wx.Bmob.User.auth("openid").then(res=>{
      console.log(res);
    })

    let userData = wx.Bmob.User.current()
        var open_Id = userData.openid;
    let data = {
      openid: open_Id,
      scene: 2,
      content:content
  }
    wx.Bmob.checkMsg2(data).then(res => {
      console.log(res);
      common.showTip(res.errmsg,"success");
    }).catch(err => {
      console.log(err);
    });
  }
})