var app = getApp();
var util = require('../../tools/md5.js');
var time = require('../../tools/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: "",
    myInfo:{},
    list:[],
    show:false,
    message:"",
    head: '../../image/head.png'
  },
  onLoad(){
    
    
    
  },
  onShow(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var id = app.globalData.openid;
    var that = this;
    wx.request({
      url: app.globalData.url + '/Home/User/index?openid=' + id,
      success: res => {
        console.log(res);
        var obj = {};
        obj.jifen = res.data.data.myinfo.jifen;
        obj.money = res.data.data.myinfo.money;
        obj.chenghu = res.data.data.myinfo.chenghu;
        that.setData({
          myInfo: obj,
          list: res.data.data.list
        });
        wx.hideLoading()
      }
    })
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  moneyWrapShow(){
    this.setData({
      show:true
    })
  },
  inputvalue(e) {
    var that = this;
    var message = e.detail.value;
    var messages = time.clear(message)
    that.setData({
      message: messages
    })
  },
  pay(e) {
    var that = this;
    var input = that.data.message;
    if (input > 0) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      var timeStamp = time.timeStamp();//获取时间戳
      var randomString = time.randomString();//获取随机数
      var openid = app.globalData.openid;
      var appid = app.globalData.appId;
      var order_id = timeStamp + randomString;//订单号
      var money = that.data.message;//提现的金额
      var str = order_id + "-" + money + "-" + timeStamp + "-" + openid
      //用md5加密两次
      var sig = util.hexMD5(str);
      var strin = sig + appid;
      var sign = util.hexMD5(strin);
      wx.request({
        url: "https://www.fansba.com.cn/home/Cash/index?order_id=" + order_id + "&money=" + money + "&openid=" + openid + "&create_time=" + timeStamp + "&sign=" + sign,//提现请求地址
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          var code = res.data.code;
          if (code > 0) {
            console.log(res)
            wx.showModal({
              title: '温馨提示',
              content: res.data.message,
              showCancel: false
            });
          }
          if (code == 0) {
            wx.showModal({
              title: '温馨提示',
              content: res.data.message,
              showCancel: false
            })
            wx.reLaunch({
              url: "/pages/mine/mine",
              success: function () {
                console.log(1)
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }
          that.setData({
            show: false,
            message:""
          })
          wx.hideLoading();
        },
        fail: function (err) {
          wx.hideLoading();
        }
      })
    } else {
      wx.showToast({
        title: '请重新输入',
      })
    }
  },
  no_pay(){
    this.setData({
      show: false
    })
  }
})