var Bmob = require("../../../dist/Bmob-1.4.4.min.js");
var common = require("../../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function (e) {
    var userData = wx.getStorageSync("userData");
    var open_Id = userData.openid;
    var template_Id = "63rsBPjJqaaCMUeLAMjO01tq2-XVN46Jaq-AMq1RzYo";
    var form_Id = e.detail.formId;
    var keyword1 = e.detail.value.name;
    var keyword2 = e.detail.value.company;
    var keyword3 = e.detail.value.remark;
    if(keyword1=="" || keyword2=="" || keyword3==""){
      common.showTip("请填写完整","loading");
      return false;
    }
    console.log(open_Id);
    let modelData = {
      "touser": open_Id,
      "template_id": template_Id,
      "page": "/pages/user/index",
      "form_id": form_Id,
      "data": {
        "keyword1": {
          "value": keyword1
        },
        "keyword2": {
          "value": keyword2
        },
        "keyword3": {
          "value": keyword3
        }
      },
      "emphasis_keyword": "keyword1.DATA"
    }
    console.log(modelData);
    Bmob.sendWeAppMessage(modelData).then(function (response) {
      console.log(response);
      common.showTip("发送成功","success");
    }).catch(function (error) {
      console.log(error);
      common.showTip("发送失败", "loading");
    });
  }
});