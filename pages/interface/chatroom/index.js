// 简单的小程序 WebSocket 信道封装
const bmobSocketIo = require('../../../dist/bmobSocketIo');
var Bmob = require('../../../dist/Bmob-1.4.4.min.js');
var that = this;

var app = getApp();

/**
 * 生成一条聊天室的消息的唯一 ID
 */
function msgUuid() {
  if (!msgUuid.next) {
    msgUuid.next = 0;
  }
  return 'msg-' + (++msgUuid.next);
}

/**
 * 生成聊天室的系统消息
 */
function createSystemMessage(content) {
  return { id: msgUuid(), type: 'system', content };
}

/**
 * 生成聊天室的聊天消息
 */
function createUserMessage(content, user, isMe) {
  return { id: msgUuid(), type: 'speak', content, user, isMe };
}

// 声明聊天室页面
Page({

  /**
   * 聊天室使用到的数据，主要是消息集合以及当前输入框的文本
   */
  data: {
    messages: [],
    inputContent: '欢迎见到大家',
    lastMessageId: 'none',
    msgObjectId: "",
    objectId: ""
  },

  /**
   * 页面渲染完成后，启动聊天室
   * */
  onReady() {
    // console.log(BmobSocketIo)
    // var BmobSocketIo = this.BmobSocketIo = new BmobSocketIo('e9978deb922a3ee549d8ca3266edff09');
    wx.setNavigationBarTitle({ title: 'Bmob聊天室' });

    var pageReady = app.globalData.pageReady;
    console.log(pageReady);
    console.log(this.pageReady);

    // if (!this.pageReady) {
    this.pageReady = pageReady;


    this.enter();
    //开始连接Socket

    console.log("99999999");

    // }
  },

  onShareAppMessage: function () {
    var that = this;
    return {
      title: 'Bmob 聊天室',
      path: 'pages/interface/chatroom/chatroom',
      success: function (res) {
        // 转发成功
        console.log('成功', res)

        var currentUser = Bmob.User.current();
        that.pushMessage(createSystemMessage('恭喜' + currentUser.get('nickName') + '把聊天室成功分享给他人...'));
        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success(res) {



          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 后续后台切换回前台的时候，也要重新启动聊天室
   */
  onShow() {
    if (this.pageReady) {
      // this.enter();
    }
  },
  onLoad() {
    var that = this;
  },

  /**
   * 页面卸载时，退出聊天室
   */
  onUnload() {
    this.quit();
  },

  /**
   * 页面切换到后台运行时，退出聊天室
   */
  onHide() {
    this.quit();
  },

  /**
   * 启动聊天室
   */
  enter() {


    // 如果登录过，会记录当前用户openid
    var newOpenid = wx.getStorageSync('openid')
    if (!newOpenid) {
      this.pushMessage(createSystemMessage('您当前未登陆...'));
    } else {
      var currentUser = Bmob.User.current();
      var userData = wx.getStorageSync("userData")
      this.setData({ objectId: userData.objectId });
      console.log(userData.objectId);
      //加载默认数据
      loadDefault(this);
      this.connect();
    }
  },

  /**
   * 连接到聊天室信道服务
   */
  connect() {

    console.log("hello")

    var that = this;

    that.pushMessage(createSystemMessage('欢迎加入群聊...'));

    //记录进入房间
    welcome(that);

    // new BmobSocketIo("39ee83f92ff3a195130596a4eaec5ddf");
    var BmobSocketIo = this.bmobSocketIo = new bmobSocketIo('39ee83f92ff3a195130596a4eaec5ddf');
    console.log("333")



    //初始连接socket.io服务器后，需要监听的事件都写在这个函数内
    BmobSocketIo.onInitListen = function () {
      console.log('kkk')
      //订阅GameScore表的数据更新事件
      BmobSocketIo.updateTable("Chat"); //聊天记录表
      BmobSocketIo.updateTable("welcome");//欢迎进入表
      that.tunnel = true;
      that.pushMessage(createSystemMessage('成功加入群聊...'));

    };

    //监听服务器返回的更新表的数据
    BmobSocketIo.onUpdateTable = function (tablename, data) {

      if (tablename == "Chat") {
        that.pushMessage(createUserMessage(data.content, data, data.own === that.data.objectId));
      }

      if (tablename == "welcome") {
        if (data.online != 1) {
          that.pushMessage(createSystemMessage(`${data.nickName}已加入群聊。`));
        } else {
          that.pushMessage(createSystemMessage(`${data.nickName}已退出群聊。`));
        }
      }
    };


    if (!this.pageReady) {
      // BmobSocketIo.init();
      app.globalData.pageReady = true;
    } else {
      //第二次进来
      that.tunnel = true;
    }


  },

  /**
   * 退出聊天室
   */
  quit() {
    //更新在线状态
    editRow(this);


    // BmobSocketIo.unsubUpdateTable("Chat"); //
    // BmobSocketIo.unsubUpdateTable("welcome");//

    //退出聊天室
    // BmobSocketIo.obj.socket.disconnect();

    // BmobSocketIo.obj.socket.reconnect();
  },

  /**
   * 通用更新当前消息集合的方法
   */
  updateMessages(updater) {
    var messages = this.data.messages;
    updater(messages);

    this.setData({ messages });

    // 需要先更新 messagess 数据后再设置滚动位置，否则不能生效
    var lastMessageId = messages.length ? messages[messages.length - 1].id : 'none';
    console.log(lastMessageId);
    this.setData({ lastMessageId });
  },

  /**
   * 追加一条消息
   */
  pushMessage(message) {
    this.updateMessages(messages => messages.push(message));
  },

  /**
   * 替换上一条消息
   */
  amendMessage(message) {
    this.updateMessages(messages => messages.splice(-1, 1, message));
  },

  /**
   * 删除上一条消息
   */
  popMessage() {
    this.updateMessages(messages => messages.pop());
  },

  /**
   * 用户输入的内容改变之后
   */
  changeInputContent(e) {
    this.setData({ inputContent: e.detail.value });
  },

  /**
   * 点击「发送」按钮，通过信道推送消息到服务器
   **/
  sendMessage(e) {
    // 信道当前不可用
    if (!this.tunnel) {
      this.pushMessage(createSystemMessage('您还没有加入群聊，请稍后重试'));

      return;
    }

    var that = this;


    var content = this.data.inputContent;
    if (!content) {
      return false;
    }

    var currentUser = Bmob.User.current();
    var userData = wx.getStorageSync("userData");
    var pointer = Bmob.Pointer("_User");
    var objectId = userData.objectId;

    //添加一条记录
    var diary = Bmob.Query("Chat");
    var poiID = pointer.set(objectId);
    diary.set("own", poiID);

    //写入用户信息方便判断谁发送的消息
    diary.set("nickName", userData.nickName);
    diary.set("avatarUrl", userData.userPic);



    diary.set("content", content);
    //添加数据，第一个入口参数是null
    diary.save().then(result=>{
      console.log("日记创建成功, objectId:" + result.objectId);
      that.setData({ inputContent: '' });
    }).catch(err=>{
      // 添加失败
      console.log('创建日记失败');

    })
  },
});


//记录用户加入聊天
function welcome(that) {

  var currentUser = Bmob.User.current();
  var userData = wx.getStorageSync("userData");
  var pointer = Bmob.Pointer("_User");

  var objectId = that.data.objectId;
  console.log(objectId);
  var poiID = pointer.set(objectId);


  //添加一条记录
  var diary = Bmob.Query("welcome");

  diary.set("own", poiID);
  diary.set("online", 0);
  diary.set("nickName", userData.nickName);
  //添加数据，第一个入口参数是null
  diary.save().then(result => {
    // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
    console.log("日记创建成功, objectId:" + result.objectId);
    that.setData({ msgObjectId: result.objectId });
  }).catch(error=>{
    // 添加失败
    console.log('创建日记失败');

  })

}

function editRow(that) {
  var objectId = that.data.msgObjectId;
  console.log(objectId);
  var query = Bmob.Query("welcome");
  // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
  query.get(objectId).then(result=>{
    // 回调中可以取得这个 diary 对象的一个实例，然后就可以修改它了
    result.set("online", 1);
    result.save();
      // The object was retrieved successfully.
  }).catch(error=>{

  })
}


function loadDefault(t) {

  var that = t;
  //进入聊天室先加载之前最后3条聊天记录
  // var Diary = Bmob.Object.extend("Chat");
  // var query = new Bmob.Query(Diary);
  const query = Bmob.Query('Chat');
  query.order("-createdAt");
  query.limit(3);
  // 查询所有数据
  query.find().then(results=>{
    console.log("共查询到 " + results.length + " 条记录");
    // 循环处理查询到的数据
    for (var i = results.length - 1; i >= 0; i--) {
      var object = results[i];
      console.log(results + ' - ' + object.own.objectId);
      that.pushMessage(createUserMessage(object.content, object, object.own.objectId === that.data.objectId));
    }
  }).catch(error=>{
    console.log("查询失败: " + error.code + " " + error.message);
  })
}