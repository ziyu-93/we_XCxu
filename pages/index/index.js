var app = getApp();
Page({
  data:{
    choosePay:"weixin",
    moneyNum:"",
    userInfo: {},
    hasUserInfo: false,
    pay_money:"",
    btn_message:"创建房间开始游戏",
    fw:'0.00',
    head:'../../image/head.png',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad:function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } 
    else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail:res=>{
          wx.showModal({
            title: '温馨提示',
            content: '请删除小程序，重新添加',
            showCancel: false
          })
        }
      })
    }
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  bindChange: function (e) {
    if(e.detail.value==""){
      this.setData({
        btn_message: "创建房间开始游戏",
        fw:"0.00"
      });
    }else{
      var a = e.detail.value * 1;
      var b = e.detail.value * 0.08;
      a = a + b;
      a = a.toFixed(2);
      b = b.toFixed(2);
      console.log(a);
      this.setData({
        btn_message: '需要支付' + a + '元',
        pay_money:a,
        fw: b
      });
      var moneyNum = parseFloat(e.detail.value);
      this.setData({
        moneyNum: moneyNum
      });
      // this.clear(moneyNum);
    }
  },
  formSubmit:function(e){
    if (e.detail.value.money!=""){
      wx.showLoading({
        title: '加载中',
        mask:true
      })
    var that = this;
    //调用request请求api转换登录凭证  
    wx.login({
      success: function (loginCode) {
        //调用request请求api转换登录凭证  
        wx.request({
          url: app.globalData.url + '/home/Auth/get_user_info?code=' + loginCode.code,
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var obj = {};
            obj.openid = res.data.data.openid;
            obj.login_flag = res.data.data.login_flag;
            wx.setStorageSync("openId", obj);
            if (that.data.hasUserInfo){
              wx.request({
                url: app.globalData.url + '/home/Rooms/createRoom?openid=' + res.data.data.openid + "&login_flag=" + res.data.data.login_flag + "&red_money=" + that.data.moneyNum + "&pay_type=" + that.data.choosePay + "&pay_money=" + that.data.pay_money,
                data: {},
                header: {
                  'content-type': 'application/json'
                },
                success: function (data) {
                  console.log("请求成功");
                  app.globalData.room_id = data.data.data.room_id;
                  //如果是余额支付
                  if (that.data.choosePay == "yuer") {
                    var code = data.data.code;
                    if (code == 0) {
                      wx.showToast({
                        title: "支付成功",
                      })
                      wx.navigateTo({
                        url: 'page/room/room'
                      })
                    } else if (code > 0) {
                      wx.showModal({
                        title: '温馨提示',
                        content: data.data.message,
                        showCancel: false
                      })
                    }
                  }
                  //如果是微信支付
                  if (that.data.choosePay == "weixin") {
                    wx.requestPayment({
                      timeStamp: data.data.data.create_time,
                      nonceStr: data.data.data.nonce_str,
                      package: 'prepay_id=' + data.data.data.prepay_id,
                      'signType': 'MD5',
                      paySign: data.data.data.paySign,
                      'success': function (data) {
                        wx.showToast({
                          title: "支付成功",
                        })
                        wx.navigateTo({
                          url: 'page/room/room'
                        })
                      },
                      'fail': function (data) {
                        console.log(data)
                        wx.showModal({
                          title: '温馨提示',
                          content: '支付失败',
                          showCancel: false
                        })
                      }

                    })
                  }
                  wx.hideLoading();
                }
              }) 
            }else{
              wx.hideLoading();
              wx.showModal({
                title: '温馨提示',
                content: '请先授权登录',
                showCancel:false
              })
            }
          }
        })
      }
    });
    }else{
      wx.showToast({
        title: '请输入金额',
      })
    }
  },
  // 选择支付方式
  choosePayMoney(e){
    if (e.currentTarget.dataset.id == "yuer"){
      this.setData({
        choosePay: "yuer"
      })
    }else{
      this.setData({
        choosePay: "weixin"
      })
    }
  },
  getUserInfo: function (e) {
    var that = this;
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    wx.getUserInfo({
      success: function (res) {
        app.globalData.userInfo = e.detail.userInfo
        that.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
})


