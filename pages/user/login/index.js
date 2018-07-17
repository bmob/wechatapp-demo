// pages/login/index.js
const common = require("../../../utils/common.js");

Page({
  formsubmit:function(event){
    wx.Bmob.User.login(event.detail.value.username,event.detail.value.password).then(res=>{
      common.showTip("登录成功");
      wx.setStorageSync("objectId", res['objectId']);
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/user/index',
        })
      }, 2000);
    }).catch(err=>{
      console.log(err);
      common.showTip("登录失败", "loading");
    })
  },
  getUserInfo:function(){
    let current = wx.Bmob.User.current();
    if(current){
      console.log(current);
    }else{
      common.showTip("请先登录","loading");
    }
  }
})