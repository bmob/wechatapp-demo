// pages/interface/index.js
var common = require("../../utils/common.js");
var grids = [
  { "name": "上传图片", "ico": "pic.png", "url": "../interface/upload/index" },
  { "name": "生成二维码", "ico": "code.png", "url": "../interface/code/index" },
  { "name": "检测违规内容", "ico": "checkCon.png", "url": "../interface/checkContent/index" },
  { "name": "access_token", "ico": "token.png", "url": "../interface/getToken/index" },
  { "name": "微信支付", "ico": "pay.png", "url": "../interface/pay/index" },
  { "name": "小程序模板信息", "ico": "template.png", "url": "../interface/template/index" },
  { "name": "添加地理位置", "ico": "addAddress.png", "url": "../interface/addAddress/index" },
  { "name": "查询地理位置", "ico": "select.png", "url": "../interface/select/index" },
  { "name": "聊天室", "ico": "chatroom.png", "url": "../interface/chatroom/index" }


];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: grids,
  },

})