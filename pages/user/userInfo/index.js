// pages/user/userInfo/index.js
var common = require("../../../utils/common.js");
var that;
Page({
  data:{
    loading:true
  },
  onLoad:function(){
    that=this;
  },
  getUserInfo:function(){
    let current = wx.Bmob.User.current();
    if(current){
      that.setData({
        loading:true,
        username:current['username'],
        objectId:current['objectId'],
      });
      console.log(current);
    }else{
      common.showTip("请先登录","loading");
    }
  }
})