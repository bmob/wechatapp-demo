var Bmob = require("../../../dist/Bmob-1.4.4.min.js");
var common = require("../../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function (e) {
    let content = e.detail.value.content;
    if (content == "") {
      common.showTip("请输入内容", "loading");
      return false;
    }
    Bmob.checkMsg(content).then(res => {
      common.showTip(res.msg,"success");
    }).catch(err => {
      console.log(err);
    });
  }
})