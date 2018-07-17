// pages/register/index.js

var common = require("../../../utils/common.js");
var that;
Page({

  onLoad: function () {
    that = this;
  },

  formSubmit: function (event) {
    var username = event.detail.value.username;
    var email = event.detail.value.email;
    var phone = event.detail.value.phone;
    var password = event.detail.value.password;
    var password1 = event.detail.value.password1;

    if(username !=""&&password!=""&&password1!=""&&email !=""&&phone!=""){
      if(password!=password1){
        common.showTip("密码不一致", "loading", 1500);
        return false;
      }
      let params = {
        username:username,
        password:password,
        email:email,
        mobilePhoneNumber:phone
      }
      wx.Bmob.User.register(params).then(res=>{
        common.showTip("注册成功");
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/user/index',
          })
        }, 2000);
      }).catch(err=>{
        console.log(err);
      })
    }else{
      common.showTip("请填写完整","loading",1500);
    }
  }

})