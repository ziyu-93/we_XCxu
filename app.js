//app.js
App({
  // code: null,
  globalData: {
    userInfo: null,
    url: "https://www.fansba.com.cn",
    appId:"wx001b6b663cf34fa7",
    secret:'b9fe4d8220e0c8a60d3fb80fc9e683c0',
    socket: "wss://www.fansba.com.cn",
    openid:"",
    login_flag:"",
    room_id:""
  },
  onLaunch: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.globalData.url + '/home/Auth/get_user_info?code=' + res.code,
            success:res=>{
              console.log(res);
              that.globalData.openid = res.data.data.openid;
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    if (!wx.canIUse('getSetting.success')){
        wx.showModal({
          title: '温馨提示',
          content: '请升级您的微信版本，然后使用',
          showCancel:false
        })
      return ;
    }
    wx.getSetting({
      success: res => {
        console.log(11)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onError:function(msg){
    console.log(msg);
  }
  // login(userinfo, callback) {
  //   wx.login({}) // 现在，调用 wx.login 是一个可选项了。只有当你需要使用微信登录鉴别用户，才需要用到它，用来获取用户的匿名识别符
  //   if (userinfo.detail.errMsg == 'getUserInfo:ok') {
  //     wx.request({}) // 将用户信息、匿名识别符发送给服务器，调用成功时执行 callback(null, res)
  //   }
  //   else if (userinfo.detail.errMsg == 'getUserInfo:fail auth deny') { // 当用户点击拒绝时
  //     wx.showModal({}) // 提示用户，需要授权才能登录
  //     callback('fail to modify scope', null)
  //   }
  // }
})