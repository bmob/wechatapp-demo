// app.js 
// 源码引入方式，方便调试
import Bmob from 'utils/hydrogen-js-sdk/src/lib/app.js'
// import Bmob from 'dist/Bmob-2.2.5.min.js'

// 初始化 Bmob.initialize('你的Application ID', '你的REST API Key');
Bmob.initialize('bc7814ffb203da9f', '123456');
Bmob.domain('https://apitest.bmob.cn')



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