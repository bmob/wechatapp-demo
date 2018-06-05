var Bmob = require("../../../dist/Bmob-1.4.4.min.js");
var common = require("../../../utils/common.js");

Page({
  onLoad: function () {
    
  },
  checkEmail:function(event){
    var email = event.detail.value.email;
    if(email!=""){
      Bmob.User.requestEmailVerify(email).then(res=>{
        common.showTip("邮件已发送","success");
      }).catch(err=>{
        console.log(err);
      })
    }else{
      common.showTip("请输入邮箱","loading");
    }
  }

})