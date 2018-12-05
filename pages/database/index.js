// pages/database/index.js
var that;
var common = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    writeDiary:false,
    modifyDiarys: false,
    limit: 10,
    windowHeight:0,
    windowWidth:0,
    diaryList:[],
  },
  buf2hex: function (buffer) { // buffer is an ArrayBuffer
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
  },

  hextoString: function (hex) {
    var arr = hex.split("")
    var out = ""
    for (var i = 0; i < arr.length / 2; i++) {
      var tmp = "0x" + arr[i * 2] + arr[i * 2 + 1]
      var charValue = String.fromCharCode(tmp);
      out += charValue
    }
    return out
  },
  stringtoHex: function (str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {
      if (val == "")
        val = str.charCodeAt(i).toString(16);
      else
        val += str.charCodeAt(i).toString(16);
    }
    val += "0a"
    return val
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    // console.log("hllll")
    // const query = wx.Bmob.Query('diary');
    // // 单词最多删除50条
    // query.limit(50)
    // query.find().then(todos => {

    //   todos.destroyAll().then(res => {
    //     // 成功批量修改
    //     console.log(res, 'ok')
    //   }).catch(err => {
    //     console.log(err)
    //   });
    // })

var a='abc'
    var s = this.stringtoHex(a)

    var k = this.hextoString(s)
    console.log(s,k)


console.log('hello')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getList(this);

    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          windowHeight:res.windowHeight,
          windowWidth:res.windowWidth
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  toAddDiary:function(){
    that.setData({
      writeDiary:true
    })
  },
  noneWindows:function(){
    that.setData({
      writeDiary:"",
      modifyDiarys:"",
    })
  },
  addDiary:function(event){
    console.log('add')
    var title = event.detail.value.title;
    var content = event.detail.value.content;
    var formId = event.detail.formId;
    if(title == "" || content == ""){
      common.showTip("请填写完整","loading");
      return false;
    }


    var userData = wx.getStorageSync("userData");
    //新增一行记录
    var diary = wx.Bmob.Query("diary");
    //添加数据关联
    var pointer = wx.Bmob.Pointer("_User");
    var poiID = pointer.set(userData.objectId);

    diary.set("title", title);
    // diary.set("formId", formId);//保存formId
    diary.set("content", content);
    diary.set("own",poiID);
    diary.save().then(res=>{
      common.showTip("添加成功");
      that.setData({
        writeDiary:false,
        loading:false
      })
      getList(that);
    }).catch(err=>{
      console.log(err);
      common.showTip("添加失败","loading");
    })
  },
  deleteDiary:function(event){
    var objectId = event.target.dataset.id;
    wx.showModal({
      title:"提示",
      content:"确定删除日记",
      success:function(res){
        if(res.confirm){
          //删除一行数据
          var query = wx.Bmob.Query("diary");
          query.destroy(objectId).then(res=>{
            common.showTip("删除成功","success",function(){
              getList(that);
            })
          }).catch(err=>{
            console.log(err);
            common.showTip("删除失败","loading");
          })
        }
      }
    })
  },
  toModifyDiary:function(event){
    var nowTitle = event.target.dataset.title;
    var nowContent = event.target.dataset.content;
    var nowId = event.target.dataset.id;
    that.setData({
      modifyDiarys:true,
      nowTitle:nowTitle,
      nowContent:nowContent,
      nowId:nowId
    })

  },
  modifyDiary:function(event){
    modify(that,event);
  },
  pullUpLoad:function(){
    var limit = that.data.limit+2;
    this.setData({
      limit:limit
    })
    this.onShow();
  },
  inputTyping:function(event){
    getList(this,event.detail.value);
    this.setData({
      inputVal: event.detail.value
    });
  },
  showInput:function(){
    this.setData({
      inputShowed:true
    })
  },
  hideInput:function(){
    this.setData({
      inputVal:"",
      inputShowed:false
    })
    getList(this)
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    getList(this);
  }
})

function getList(t,k){
  that = t;
  //条件查询，获取当前用户日记
  var query = wx.Bmob.Query("diary");
  var query1 = wx.Bmob.Query("diary");
  var userData = wx.getStorageSync("userData");
  //模糊查询，付费应用可使用
  if(k){
    query.equalTo("title", "==", { "$regex": "" + k + ".*" });
    query1.equalTo("content", "==", { "$regex": "" + k + ".*" });
  }
  //数据关联,查询Pointer
  query.include('own', '_User')
  //条件查询
  query.equalTo("own","==",userData.objectId);
  //分页查询
  query.limit(that.data.limit);
  //结果排序
  query.order("-createdAt");
  query.statTo("groupby", "title");
  query.find().then(res=>{
    console.log(res);
    that.setData({
      diaryList: res
    })
  }).catch(err=>{
    console.log(err);
  });
}

function modify(t,e){
  var that = t;
  var newTitle = e.detail.value.title;
  var newContent = e.detail.value.content;
  var objectId = that.data.nowId;
  var oldTitle = that.data.nowTitle;
  var oldContent = that.data.nowContent;
  if((newTitle != oldTitle || newContent != oldContent)){
    //修改一行数据
    var query = wx.Bmob.Query("diary");
    query.set('id', objectId); //需要修改的objectId
    query.set('title',newTitle);
    query.set('content', newContent);
    query.save().then(res=>{
      console.log(res);
      common.showTip("修改成功","success",function(){
        that.onShow();
        that.setData({
          modifyDiarys:false
        })
      })
    }).catch(err=>{
      console.log(err)
      common.showTip("修改失败","loading");
    })


  }else if(newTitle == "" || newContent == ""){
    common.showTip("标题或内容不为空","loading");
  }else{
    that.setData({
      modifyDiarys: false
    })
    common.showTip('修改成功', 'loading');
  }

}