var common = require("../../../utils/common.js");
var that;
Page({
    data:{
      phone:'',
    },
    onLoad:function(){
      that = this;
    },
    sendSms:function(event){
      var phone = event.detail.value.phone;
      
      if(phone == ""){
        common.showTip("请输入号码","loading");
        return false;
      }
      let params = {
        mobilePhoneNumber:phone
      }
      wx.Bmob.requestSmsCode(params).then(function(response){
        that.setData({
          phone: phone
        })
        common.showTip("发送成功", "success");
      }).catch(function(error){
        common.showTip("发送失败", "success");
      })
    },
    verifySmsCode:function(event){
      var phone = parseInt(this.data.phone);
      var smsCode = parseInt(event.detail.value.verifyCode);
      if(!phone){
        common.showTip("请发送验证码","loading");
        return false;
      }else if(!smsCode){
        common.showTip("请输入验证码","loading");
        return false;
      }

      wx.Bmob.User.signOrLoginByMobilePhone(phone,smsCode).then(res=>{
        common.showTip("登录成功","success");
      }).catch(err=>{
        console.log(err);
      })

    }
})