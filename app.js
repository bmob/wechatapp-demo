// app.js 
// 源码引入方式，方便调试
// import Bmob from 'utils/bmob-js-sdk-es6/src/lib/app.js'
import Bmob from 'utils/bmob-js-sdk-es6/dist/Bmob-1.6.5.min.js'

// 初始化 Bmob.initialize('你的Application ID', '你的REST API Key');
Bmob.initialize('bb20359e8e7eb634fff2c76089ce0d80', '0dcb80eb0cf198b9facccbf3f0b29b89');

App({
  onLaunch: function () {
    // 一键登录
    Bmob.User.auth().then(res => {
      console.log(res);
      console.log('一键登录成功')
      var userData = { nickName: res.nickName, objectId: res.objectId, openid: res.openid, userPic: res.userPic, username: res.username };
      wx.setStorageSync('userData', userData);
      wx.setStorageSync('openid', res.openid)
    }).catch(err => {
      console.log(err);
    })
  },
  globalData: {
    userInfo: null
  }
})