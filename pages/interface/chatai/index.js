 var app = getApp()
 let ChatAi = {}
 var that = this
// var messages = [] //setdata 数据总是没刷新，使用变量解决
 /**
  * 生成一条聊天室的消息的唯一 ID
  */
 function msgUuid() {
   if (!msgUuid.next) {
     msgUuid.next = 0
   }
   return 'msg-' + (++msgUuid.next)
 }

 /**
  * 生成聊天室的系统消息
  */
 function createSystemMessage(content) {
   return {
     id: msgUuid(),
     type: 'system',
     content
   }
 }

 /**
  * 生成聊天室的聊天消息
  */
 function createUserMessage(content, user, isMe) {
   return {
     id: msgUuid(),
     type: 'speak',
     content,
     user,
     isMe
   }
 }

 //  声明聊天室页面
 Page({

   /**
    * 聊天室使用到的数据，主要是消息集合以及当前输入框的文本
    */
   data: {
     ChatAi: {},
     messages: [],
     inputContent: 'Bmob后端云是什么？',
    //  inputContent: 'hi',
     lastMessageId: 'none',
     msgObjectId: '',
     userData: {}, //用户信息
     objectId: ''
   },

   /**
    * 页面渲染完成后，启动聊天室
    * */
   onReady() {


   },

   onShareAppMessage: function () {
     var that = this
     return {
       title: 'Bmob AI 问答',
       path: 'pages/interface/chatroom/chatai',
       success: function (res) {
         //  转发成功
         console.log('成功', res)

         var currentUser = wx.Bmob.User.current()
         that.pushMessage(createSystemMessage('恭喜' + currentUser.get('nickName') + '把聊天室成功分享给他人...'))
         wx.getShareInfo({
           shareTicket: res.shareTickets,
           success(res) {



           }
         })
       },
       fail: function (res) {
         //  转发失败
       }
     }
   },

   /**
    * 后续后台切换回前台的时候，也要重新启动聊天室
    */
   onShow() {
     if (this.pageReady) {
       //  this.enter()
     }
   },
   onLoad() {
    //  this.messages = []
     let that = this
     wx.setNavigationBarTitle({
       title: 'Bmob AI 问答'
     })

     let userData = wx.Bmob.User.current()
     this.setData({
       userData: userData
     })

     var pageReady = app.globalData.pageReady

     this.pageReady = pageReady


     this.enter()


     // AI测试
     // 初始化AI链接
     this.ChatAi = wx.Bmob.ChatAI()


     // 返回消息处理
     let msg = ''
     let isStart = true
     this.ChatAi.onMessage((res) => {
       if (isStart) {
         isStart = false
        //  that.pushMessage(createUserMessage("loading...", this.data.userData, false))

       }
       if (res == "done") {
        
        //  完成
         if (msg != "") {
           isStart = true
           console.log("done1", msg);
         } else {
         
           console.log("done", msg);
         }
 
         msg = '';
       } else {
         msg = msg + res

         that.amendMessage(createUserMessage(msg, this.data.userData, false))
       }
     })

     this.ChatAi.onClose((c) => {
       console.log("连接被关闭");
       this.ChatAi.connect()
     })

     console.log(this.ChatAi, "xx");
   },

   /**
    * 页面卸载时，退出聊天室
    */
   onUnload() {
     this.quit()
   },

   /**
    * 页面切换到后台运行时，退出聊天室
    */
   onHide() {
     this.quit()
   },

   /**
    * 启动聊天室
    */
   enter() {
     //  如果登录过，会记录当前用户openid
     var newOpenid = wx.getStorageSync('openid')
     if (!newOpenid) {
       this.pushMessage(createSystemMessage('您当前未登陆...'))
     } else {
       var currentUser = wx.Bmob.User.current()
       let userData = wx.Bmob.User.current()
       this.setData({
         objectId: userData.objectId
       })
       console.log(userData.objectId)
       // 加载默认数据
       loadDefault(this)
       this.connect()
     }
   },

   /**
    * 连接到聊天室信道服务
    */
   connect() {

     var that = this

     that.pushMessage(createSystemMessage('欢迎使用Bmob后端云...'))

     // 记录进入房间
     welcome(that)


     that.pushMessage(createSystemMessage('成功链接上AI...'))





   },

   /**
    * 退出聊天室
    */
   quit() {
     // 更新在线状态
     editRow(this)


   },

   /**
    * 通用更新当前消息集合的方法
    */
   updateMessages(updater) {
     var messages = this.data.messages

     updater(messages)

     this.setData({
       messages:messages
     })
     this.messages = messages

     //  需要先更新 messagess 数据后再设置滚动位置，否则不能生效
     var lastMessageId = messages.length ? messages[messages.length - 1].id : 'none'
    //  console.log(lastMessageId)
     this.setData({
       lastMessageId
     })
   },
   updateMessages2(messages) {
    // var messages = this.data.messages

    // updater(messages)

    this.setData({
      messages:messages
    })
 

    //  需要先更新 messagess 数据后再设置滚动位置，否则不能生效
    var lastMessageId = messages.length ? messages[messages.length - 1].id : 'none'
    console.log(lastMessageId)
    this.setData({
      lastMessageId
    })
  },

   /**
    * 追加一条消息
    */
   pushMessage(message) {
     this.updateMessages(messages => messages.push(message))
   },

   /**
    * 替换上一条消息
    */
   amendMessage(message) {
     if(message.content==""){
       return
     }
    //  console.log('amendMessage',messages);
     this.updateMessages(messages => messages.splice(-1, 1, message))
    // let messages = this.data.messages
    // let l = messages.length
    // // let m = messages.splice(-1, 1, message)
    // console.log(666,l,messages,message);
    // messages[l-1] = message
    //  this.updateMessages2(messages)
   },

   /**
    * 删除上一条消息
    */
   popMessage() {
     this.updateMessages(messages => messages.pop())
   },

   /**
    * 用户输入的内容改变之后
    */
   changeInputContent(e) {
     this.setData({
       inputContent: e.detail.value
     })
   },

   /**
    * 点击「发送」按钮，通过信道推送消息到服务器
    **/
   sendMessage(e) {

     var that = this


     var content = this.data.inputContent
     if (!content) {
       return false
     }

     console.log(content, e);


     let userData = wx.Bmob.User.current()
     var objectId = userData.objectId

     if (objectId == "") {
       this.pushMessage(createSystemMessage('您还没有连接上服务器，请稍后重试'))

       return
     }

     let datas = {
       "messages": [{
         "content": content,
         "role": "user"
       }],
       "session": objectId
     }
     this.ChatAi.send(JSON.stringify(datas))

     that.pushMessage(createUserMessage(content, userData, true))
     that.pushMessage(createUserMessage("loading...", userData, false))
   },
 })


 // 记录用户加入聊天
 function welcome(that) {

   var currentUser = wx.Bmob.User.current()
   let userData = wx.Bmob.User.current()
   var pointer = wx.Bmob.Pointer('_User')

   var objectId = that.data.objectId
   console.log(objectId)
   var poiID = pointer.set(objectId)


   // 添加一条记录
   var diary = wx.Bmob.Query('welcome')

   diary.set('own', poiID)
   diary.set('online', 0)
   diary.set('nickName', userData.nickName)
   // 添加数据，第一个入口参数是null
   diary.save().then(result => {
     //  添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
     console.log('日记创建成功, objectId:' + result.objectId)
     that.setData({
       msgObjectId: result.objectId
     })
   }).catch(error => {
     //  添加失败
     console.log('创建日记失败')

   })

 }

 function editRow(that) {
   var objectId = that.data.msgObjectId
   console.log(objectId)
   var query = wx.Bmob.Query('welcome')
   //  这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
   query.get(objectId).then(result => {
     //  回调中可以取得这个 diary 对象的一个实例，然后就可以修改它了
     result.set('online', 1)
     result.save()
     //  The object was retrieved successfully.
   }).catch(error => {

   })
 }


 function loadDefault(t) {

   var that = t
   // 进入聊天室先加载之前最后3条聊天记录
   const query = wx.Bmob.Query('ai_log')
   query.equalTo("session","==",that.data.userData.objectId)
   query.order('-createdAt')
   query.limit(5)
   //  查询所有数据
   query.find().then(results => {
     console.log('共查询到 ' + results.length + ' 条记录')
     //  循环处理查询到的数据
     for (var i = results.length - 1; i >= 0; i--) {
       var object = results[i]
       console.log(results + ' - ' + object.objectId, object.messages, JSON.stringify(object))
       let isMe = object.role === 'assistant' ? false : true;
       that.pushMessage(createUserMessage(object.messages, object, isMe))
     }
   }).catch(error => {
     console.log('查询失败: ' + error.code + ' ' + error.message)
   })
 }