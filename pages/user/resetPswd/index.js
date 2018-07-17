var common = require("../../../utils/common.js");
var that;
Page({
  data: {
    phone: '',
  },
  onLoad: function () {
    that = this;
  },
  resetByEmail:function(event){
    var email = event.detail.value.email;
    if(email == ""){
      common.showTip("请输入邮箱","loading",2000);
      return false;
    }

    let data = {email:email};
    wx.Bmob.requestPasswordReset(data).then(res=>{
      common.showTip("邮件已发送","success",function(){
        wx.switchTab({
          url: '/pages/user/index',
        })
      },1500);
    }).catch(err=>{
      console.log(err);
    })
  },
  sendSms: function (event) {
    var phone = event.detail.value.phone;

    if (phone == "") {
      common.showTip("请输入号码", "loading");
      return false;
    }
    let params = {
      mobilePhoneNumber: phone
    }
    wx.Bmob.requestSmsCode(params).then(function (response) {
      that.setData({
        phone: phone
      })
      common.showTip("发送成功", "success");
    }).catch(function (error) {
      common.showTip("发送失败", "success");
    })
  },
  verifySmsCode: function (event) {
    var phone = parseInt(this.data.phone);
    var password = event.detail.value.password;
    var smsCode = event.detail.value.verifyCode;
    if (!phone) {
      // common.showTip("请发送验证码", "loading");
      // return false;
    } else if (!smsCode) {
      common.showTip("请输入验证码", "loading");
      return false
    }else if(!password){
      common.showTip("请输入密码", "loading");
      return false
    }

    let data = { password: password};
    wx.Bmob.resetPasswordBySmsCode(smsCode,data).then(res => {
      common.showTip("修改成功", "success", function () {
        wx.switchTab({
          url: '/pages/user/index',
        })
      }, 1500);
    }).catch(err => {
      console.log(err);
    })

  }

})