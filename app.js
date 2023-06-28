// app.js 
// 源码引入方式，方便调试
import Bmob from 'utils/hydrogen-js-sdk/src/lib/app.js'
// import Bmob from 'utils/hydrogen-js-sdk/dist/Bmob-2.4.13.min.js'

Bmob.initialize('bc7814ffb203da9f', '123456');
// 初始化 Bmob.initialize('你的Application ID', '你的REST API Key');
// Bmob.initialize('9731770784b8c006', '111111')
// Bmob.domain('http://website-restful.bmobapp.com')
// Bmob.domain('http://apitest.codenow.cn')
Bmob.domain('https://api.codenow.cn')



App({
  onLaunch: function () {



// 按钮点击发送消息
setTimeout(()=>{
  // 发送消息
  // console.log(ChatAi,"x");
  // console.log(12);
  // session 会话id，可以传用户objectId，或者随机数
  // content 内容，提问的内容，如果希望上下文，可以这样传入
  // {"model":"gpt-3.5-turbo","messages":[{"content":"你好","role":"user"},{"content":"你好，有什么我可以为你提供的帮助吗？","role":"assistant"},{"content":"请问Bmob是什么产品","role":"user"}],"stream":true}
  // let datas = {"messages":[{"content":"你好","role":"user"}],"session":"b1"}
// ChatAi.send(JSON.stringify(datas))
},3000)




const query = Bmob.Query('_User')
// query.equalTo('username','!=','ff')
query.find().then(res => {
    console.log(res)
})
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