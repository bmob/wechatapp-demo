var common = require("../../utils/common.js");
var grids = [
  {"name":"登录","ico":"login.png","url":"../user/login/index"},
  {"name":"注册","ico":"reg.png","url":"../user/register/index"},
  {"name": "验证码登录", "ico":"sms.png","url":"../user/smsLogin/index"},
  { "name": "一键登录", "ico": "autologin.png","click":"autoLogin" },
  {"name":"获取用户登录信息","ico":"getInfo.png","url":"../user/userInfo/index"},
  {"name": "验证Email", "ico": "checkEmail.png", "url": "../user/checkEmail/index" },
  {"name": "密码重置", "ico": "pswdreset.png", "url": "../user/resetPswd/index" },
  {"name":"更新用户信息","ico":"updateInfo.png","url":"../user/updateInfo/index"},
  {"name": "获取openId", "ico": "getOpenid.png", "url": "../user/getOpenid/index" },
  
];

Page({
  data:{
    grids:grids,
  },
  autoLogin:function(){
    common.showModal("App.js实现小程序访问将数据写入系统User表，具体代码请查看App.js。")
  }
})