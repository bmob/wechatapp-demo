// pages/interface/index.js
var common = require("../../utils/common.js");
var Bmob = require("../../utils/hydrogen-js-sdk/src/lib/app.js");
var grids = [
  { "name": "上传图片", "ico": "pic.png", "url": "../interface/upload/index" },
  { "name": "生成二维码", "ico": "code.png", "url": "../interface/code/index" },
  { "name": "检测违规内容", "ico": "checkCon.png", "url": "../interface/checkContent/index" },
  { "name": "access_token", "ico": "token.png", "url": "../interface/getToken/index" },
  { "name": "微信支付", "ico": "pay.png", "url": "../interface/pay/index" },
  { "name": "小程序模板信息", "ico": "template.png", "url": "../interface/template/index" },
  { "name": "添加地理位置", "ico": "addAddress.png", "url": "../interface/addAddress/index" },
  { "name": "查询地理位置", "ico": "select.png", "url": "../interface/select/index" },
  { "name": "聊天室", "ico": "chatroom.png", "url": "../interface/chatroom/index" },
  { "name": "ai", "ico": "chatroom.png", "url": "../interface/chatai/index" }
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: grids,
    phoneNumber: ''
  },

  // 获取手机号
  getPhoneNumber: function(e) {
    console.log('获取手机号回调：', e);
    console.log(e.detail.code);  // 动态令牌
    console.log(e.detail.errMsg); // 回调信息（成功失败都会返回）
    console.log(e.detail.errno);  // 错误码（失败时返回）
    
    // 判断是否获取成功
    if (e.detail.errMsg !== 'getPhoneNumber:ok') {
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      });
      this.setData({
        phoneNumber: '用户拒绝授权'
      });
      return;
    }
    
    // 获取成功，通过Bmob API获取手机号
    if (e.detail.code) {
      let code = e.detail.code
      // 调用Bmob获取手机号接口
      Bmob.getPhoneNumber({
        code: code
      }).then(result => {
        console.log('获取手机号成功:', result);
        // 更新页面数据
        this.setData({
          phoneNumber: result.phoneNumber || JSON.stringify(result)
        });
        wx.showToast({
          title: '获取成功',
          icon: 'success'
        });
      }).catch(err => {
        console.log('获取手机号失败:', err);
        this.setData({
          phoneNumber: '获取失败: ' + JSON.stringify(err)
        });
        wx.showToast({
          title: '获取失败',
          icon: 'none'
        });
      });
    } else {
      console.log('没有获取到code');
      this.setData({
        phoneNumber: '没有获取到code'
      });
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      });
    }
  }
})