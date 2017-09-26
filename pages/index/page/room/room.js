var app = getApp();
var util = require('../../../../tools/md5.js');
var time = require('../../../../tools/util.js');

var context = null; 
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
var canvasPoint=0;
var timer;
var person ="";
//  发送请求到服务器
function sendSocketMessage(msg) {
  wx.sendSocketMessage({
    data: msg
  })
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time:"",// 房间等待时间
    fangzhu:false, // 判定房主
    sendMessage:"", // 发送消息内容
    show:false,  // 等待页面和画画页面切换
    fraction: [0, 0, 0, 0, 0, 0],  // 分数数组
    guessText:[], // 类型
    paintTime:"", // 画画时间
    color: 'black', //画笔颜色默认值
    pen:4, // 画笔号数
    second: 10, // 选词倒计时
    roomid:"",
    fangzhuItem:[],
    room:false,
    say:[], // 发言数组
    success_go:[],
    toView:"",  // 发言滚动条，追踪位置
    isClear:false, // 是否要用画笔
    btnShow:false ,// button 展示,
    xuanti:"", // 选题,
    current_ques:"",
    xuanciBool:false,
    paintId:"", // 画画者
    currentPhone:"",
    gameEnd:false,
    gameOver:true,
    imageUrl:'',
    waitTime:'',
    answer:"",
    canvasShow:false,
    optionId: "",
    cleardraw:false,
    canUse: wx.canIUse('button.open-type.share')
   },
   sayArray:[],
  codeList: [0,0,0,0,0,0],
  stroOpenId:"",
  onLoad(option) {
    console.log(option.id)
    wx.showLoading({
      title: '加载中'
    })
    var that = this;
    context = wx.createCanvasContext('myCanvas');
    wx.getSystemInfo({
      success: function (res) {
        canvasw = res.windowWidth;//设备宽度
        canvash = res.windowWidth * 0.74;
      }
    });
    
    // 分享点击进入用户获取参数
    this.setData({
      room: option.id?true:false, // room 是字符串的值
      optionId: option.id
    })
    // 首次进入的房主是没有id 参数值的.
    // 分享之后,用户点击进入页面之后,才会有id
    // 所以 如果有 id  则调用登录方法,获取用户的 openid 值, 发送后台,记录该用户信息.
  },
  onReady(){
    if (wx.showShareMenu) {
      wx.showShareMenu({
        withShareTicket: true
      })
    } else {
      wx.showShareMenu({
        withShareTicket: false
      })
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用按钮分享功能，请升级到最新微信版本后重试。'
      })
    }

    var that = this;
    wx.connectSocket({
      url: app.globalData.socket + '/wss',
      success:(res)=>{
        console.log(res);
      }
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！');
      if (that.data.room) {
        app.globalData.room_id = that.data.optionId;
        console.log("我是用户，我进房间了");
      wx.login({
        success: function (loginCode) {
          var code = loginCode.code;
          var appid = app.globalData.appId; //填写微信小程序appid  
          var secret = app.globalData.secret; //填写微信小程序secret  
          //调用request请求api转换登录凭证  
          wx.request({
            url: app.globalData.url +'/home/Auth/get_user_info?code=' + code,
            data: {},
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.getUserInfo({
                success: data => {
                  var room_idyh = that.data.optionId;
                  app.globalData.userInfo = data.userInfo;
                      sendSocketMessage('{ "type": "login", "client_name":"' + data.userInfo.nickName + '","headpic":"' + data.userInfo.avatarUrl + '", "room_id":"' + room_idyh + '","openid":"' + res.data.data.openid + '","login_flag":"' + res.data.data.login_flag + '","city":"' + data.userInfo.city + '"}')
                  wx.hideLoading();
                }
              })
            }
          })
        }
      })
      } else if (!that.data.room) {
      console.log("我是房主，我建立房间了");
      that.stroOpenId = wx.getStorageSync("openId");
      var openid = that.stroOpenId.openid;
      var login_flag = that.stroOpenId.login_flag;
      var room_id = app.globalData.room_id; // 首次进入可以拿到
      console.log(room_id);
      var name = app.globalData.userInfo;
      console.log(name);
        that.setData({
          roomid: room_id
        })
            sendSocketMessage('{ "type": "login", "client_name":"' + name.nickName + '","headpic":"' + name.avatarUrl + '", "room_id":"' + room_id + '","openid":"' + openid + '","login_flag":"' + login_flag + '","city":"' + app.globalData.userInfo.city + '"}');
        
    }
  });
    // 后台返回数据  
    wx.onSocketMessage(function (res) {
      
      var data = JSON.parse(res.data);
      if (data.type != "give_over_time" && data.type!= "ping"&&data.type!="draw_coordinate"){
        console.log(data);
      }
      switch (data.type){
        case "login_success":
        wx.hideLoading();
          that.setData({
            currentPhone: data.client_id
          })
          break;
        case "list":  // 返回人数列表
          if (that.stroOpenId.openid == data.room.create_user_open_id){
            that.setData({
              fangzhu:true
            })
          }
          wx.hideLoading();
          var room_num = [];
          room_num = data.client_list;
          that.setData({
            fangzhuItem: room_num,
            btnShow: true
          });
          break;
         // 房间成员进入房间
        case "toastmaster":  // 提示信息
          if (data.stype =="question_prompt"){
            that.data.guessText.push(data.message);
            that.setData({
              guessText: that.data.guessText
            })
          }
          if (data.stype=="in_room"){
            var obj = {};
            obj.text = data.client_name;
            obj.type = "in_room";
            that.sayArray.push(obj);
            var id = "a" + (that.sayArray.length - 1);
              that.setData({
                say: that.sayArray,
                toView: id
              })
          };
          break;
        case "say":   // 发言数组
          var obj={};
          obj.name = data.from_client_name;
          obj.content = data.content;
          obj.type = "say";
          if (data.from_client_name != undefined && data.content != undefined){
            that.sayArray.push(obj);
          }
          // 给每个发言的view 加一个id 
          // 从而scroll-view 可以追踪到
          var id = "a" + (that.sayArray.length-1);
          that.setData({
            say: that.sayArray,
            toView: id
          })
          break;
        case "draw_success":
          var obj = {};
          obj.text = data.content;
          obj.type = "draw_success";
          that.sayArray.push(obj);
          var id = "a" + (that.sayArray.length - 1);
          that.setData({
            say: that.sayArray,
            toView: id
          })
          break;
        case "draw_author": // 展示部分,切换页面,循环改变画画者
          
          that.setData({
            show:true,
            xuanciBool:true,
            paintId: data.client_id,
            canvasShow: true,
            isClear:false,
            color: 'black',
            pen:4
          })
          break;
        case "draw_size":
          canvasPoint = data.data;
          break;
        case "draw_coordinate": // 获取坐标起始点
          if (that.data.currentPhone != that.data.paintId){
            paint(data.x.split(","), data.y.split(","), data.z.split(","), that.data.color, that.data.pen, that.data.isClear, that.data.cleardraw, canvasPoint, canvasw);
          }
          break;
        case "draw_brush_color": // 获取颜色
          that.setData({
            color:data.value,
            isClear:false
          })
          break;
        case "draw_eraser":  // 用了橡皮擦
          that.setData({
            isClear:true
          })
          break;
        case "clear_draw":
            context.clearRect(0, 0, canvasw, canvash);
            context.draw();
          break;
        case "draw_brush_big_min": // 选取画笔粗细
          that.setData({
            pen:data.value,
            isClear:false
          })
          break;
        case "close":  // 踢人
          wx.showModal({
            title: "温馨提示",
            content: data.message,
            showCancel: false,
            success:function(){
              wx.navigateBack({
                delta: 1
              })
            }
          });
          break;
        case "logout": // 退出之后
          for (var i = 0; i < that.data.fangzhuItem.length;i++){
            if (data.client_id == that.data.fangzhuItem[i].client_id){
              that.codeList.splice(i, 1);
              that.setData({
                fraction: that.codeList
              })
            }
          }
          var list = data.clients_list;
          if (data.message){
            var obj = {};
            obj.text = data.message;
            obj.type = "draw_success";
            that.sayArray.push(obj);
            var id = "a" + (that.sayArray.length - 1);
            that.setData({
              fangzhuItem: list,
              say: that.sayArray,
              toView: id
            });
          }
          break;
        case "kill_person": { // 踢人之后返回数组
          that.setData({
            fangzhuItem: data.client_list
          })
        }
          break;
        case "dissolution_room": // 房主退出房间
          wx.showModal({
            title: '温馨提示',
            content: data.message,
            showCancel: false,
            success:res=>{
              wx.navigateBack({
                delta: 1
              })
            }
          })
          break;
        case "select_question": // 选题返回列表
          sendSocketMessage('{"type":"draw_size","data":"' + canvasw + '"}');
          
          that.setData({
            xuanti:data.data
          });
          if (that.data.xuanti){
            that.time();
          }
          break;
        case "close_select_question": // 关闭选题框
          that.setData({
            canvasShow: false,
            xuanciBool:false
          })
          break;
        case "game_start_down_time": // 倒计时

          that.setData({
            time: data.time,
          })
          break;
        case "give_over_time": //画画时间
          that.setData({
            paintTime: data.time
          })
          break;
        case "cur_give_over": // 当前画画者结束画图
          wx.canvasToTempFilePath({
            canvasId: 'myCanvas',
            success: function (res) {
              var create_time = time.timeStamp();//获取时间戳
              var appid = app.globalData.appId;
              var room_id = app.globalData.room_id;
              var cur_draw_id = that.data.paintId;
              var str = cur_draw_id + "-" + room_id + "-" + create_time;
              //用md5加密两次
              var sig = util.hexMD5(str);
              var strin = sig + appid;
              var sign = util.hexMD5(strin); 
              if (that.data.paintId == that.data.currentPhone) {
                wx.uploadFile({
                  url: app.globalData.url + '/Home/Rooms/uploadImg', //仅为示例，非真实的接口地址
                  filePath: res.tempFilePath,
                  name: 'file',
                  formData: {
                    cur_draw_client_id: cur_draw_id,
                    room_id: room_id,
                    create_time: create_time,
                    sign: sign
                  },
                  success: function (res) {
                    console.log("传送成功");
                  },
                  fail: function (res) {
                    console.log(res)
                  }
                })
              }
              that.setData({
                guessText: [],
                imageUrl: res.tempFilePath,
                gameEnd: true,
                canvasShow:true,
                answer: data.data
              })
            }
          })
          break;
        case "next_give_start_time":// 一个画者画完，展示作品时间
          if (data.time == 0) {
            that.setData({
              gameEnd: false,
              waitTime: ''
            })
            return;
          }
          that.setData({
            waitTime:data.time
          })
          break;
        case "give_over": // 游戏结束
          wx.canvasToTempFilePath({
            canvasId: 'myCanvas',
            success: function (res) {
              var create_time = time.timeStamp();//获取时间戳
              var appid = app.globalData.appId;
              var room_id = app.globalData.room_id;
              var cur_draw_id = that.data.paintId;
              var str = cur_draw_id + "-" + room_id + "-" + create_time;
              //用md5加密两次
              var sig = util.hexMD5(str);
              var strin = sig + appid;
              var sign = util.hexMD5(strin);
              if (that.data.paintId == that.data.currentPhone) {
                wx.uploadFile({
                  url: app.globalData.url + '/Home/Rooms/uploadImg', //仅为示例，非真实的接口地址
                  filePath: res.tempFilePath,
                  name: 'file',
                  formData: {
                    cur_draw_client_id: cur_draw_id,
                    room_id: room_id,
                    create_time: create_time,
                    sign: sign
                  },
                  success: function (data) {
                    console.log("传送成功");
                  },
                  fail: function (res) {
                    console.log(res)
                  }
                })
              }
              var cc = 3;
              that.setData({
                canvasShow: true,
                imageUrl: res.tempFilePath,
                gameEnd: true,
                answer: data.data
              })
              timer = setInterval(function () {
                cc--;
                that.setData({
                  waitTime: cc
                })
                if (cc == 0) {
                  that.setData({
                    gameEnd: false
                  })
                  clearInterval(timer);
                  wx.redirectTo({
                    url: '../works/works',
                    success: res => {
                      console.log(res)
                    }
                  })
                }
              }, 1000)
            },
            fail:function(){
              wx.showModal({
                title: '温馨提示',
                content: '图片没有提交',
                success:function(){
                  wx.redirectTo({
                    url: '../works/works'
                  })
                }
              })
            }
          })
          break;
        case "draw_success_jifen": // 计分
          console.log(data);
          for (var i = 0; i < that.data.fangzhuItem.length;i++){
            if (data.data.cur_draw.client_id == that.data.fangzhuItem[i].client_id){
              that.codeList[i] = data.data.cur_draw.add_jifen + that.codeList[i];
            } else if (that.data.fangzhuItem[i].client_id == data.data.draw_success.client_id){
              that.codeList[i] = data.data.draw_success.add_jifen + that.codeList[i];
            }
          }
          that.setData({
            fraction:that.codeList
          })
           
          break;
        case "error":
          wx.showModal({
            title: '温馨提示',
            content: data.message+"["+data.code+"]",
            showCancel: false,
            success: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
          break;
       }  
       // 发送参数，给其他客户端
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查');
    })
  },
  // 踢人的函数
  go_out(e) {
    sendSocketMessage('{"type":"kill_person","client_name":"' + e.target.dataset.name + '","client_id":"' + e.target.dataset.id + '"}');
  },

  touchStart: function (e) {
    if (this.data.currentPhone != this.data.paintId) {
      return ;
    }
    this.setData({
      cleardraw:false
    })
    isButtonDown = true;
    arrz.push(0);
    arrx.push(e.changedTouches[0].x*1);
    arry.push(e.changedTouches[0].y*1);
    if (this.data.isClear) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
      context.setStrokeStyle('white') 
      context.setLineWidth(30)
      context.arc(e.changedTouches[0].x, e.changedTouches[0].y, 5, 0, 2 * Math.PI, true); 
    } else {
      context.save();
      context.setStrokeStyle(this.data.color);
      context.setLineWidth(this.data.pen);
      context.setLineCap('round'); // 让线条圆润 
      context.beginPath();
    }
    context.moveTo(arrx[0], arry[0]);
    context.lineTo(arrx[0], arry[0]);
    context.stroke();
    context.draw(true);
  },
  touchMove: function (e) {
    if (this.data.currentPhone != this.data.paintId) {
      return;
    }
    if (isButtonDown) {
      arrz.push(1);
      arrx.push(e.changedTouches[0].x);
      arry.push(e.changedTouches[0].y);
    };
    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i]);
      } else {
        context.lineTo(arrx[i], arry[i])
      };
    };
    context.stroke();
    context.draw(true);
  },
  touchEnd: function () {
    if (this.data.currentPhone != this.data.paintId) {
      return;
    }
    wx.sendSocketMessage({
      data: '{ "type": "draw_coordinate","x":"' + arrx + '","y":"' + arry + '","z":"' + arrz + '","stype":""}',
      success: res => {
        arrz = [];
        arrx = [];
        arry = [];
      }
    })
    isButtonDown = false;
  },
  cleardraw: function () {
    if (this.data.paintId != this.data.currentPhone) {
      return;
    }
    sendSocketMessage('{"type":"clear_draw"}');
    this.setData({
      cleardraw:true
    })
    wx.showToast({
      title: '已清屏',
    })
    //清除画布
    context.clearRect(0, 0, canvasw, canvash);
    context.draw();
  },
  //启动橡皮擦方法
  clearCanvas() {
    if (this.data.paintId != this.data.currentPhone) {
      return;
    }
    var that = this;
    if (this.data.isClear) {
      this.data.isClear = false;
    } else {
      this.data.isClear = true;
    }
    sendSocketMessage('{ "type":"draw_eraser"}');
    wx.showToast({
      title: '选用橡皮擦'
    });
  },
  penSelect(e) { //更改画笔大小的方法
    if (this.data.paintId != this.data.currentPhone) {
      return;
    }
    sendSocketMessage('{"type":"draw_brush_big_min","value":"'+e.currentTarget.dataset.param+'"}');
    this.setData({ 
      pen: e.currentTarget.dataset.param,
    });
    this.isClear = false;
    wx.showToast({
      title: '画笔已更改'
    });
  },
  colorSelect(e) { //更改画笔颜色的方法
    if (this.data.paintId != this.data.currentPhone) {
      return;
    }
    sendSocketMessage('{"type":"draw_brush_color","value":"' + e.currentTarget.dataset.param + '"}');
    this.setData({ 
      color: e.currentTarget.dataset.param
    });
    this.isClear = false;
    wx.showToast({
      title: '颜色已更改'
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {
    if (this.data.canUse){
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
    }
    return {
      title: '我画你猜赢红包',
      path: '/pages/index/page/room/room?id=' + this.data.roomid + '',
      success: function (res) {
        // 转发成功
        // console.log("转发成功");
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
   * 点击开始游戏
   */
  goPaint(){
    if (this.data.fangzhuItem.length<=1){
      wx.showModal({
        title: '提示',
        content: '房间至少两人开始',
        showCancel:false
      })
      return;
    }
    sendSocketMessage('{ "type": "start"}')
  },
  /**
   * 离开房间
   */
  leave_room(){
    wx.closeSocket({
      success: function () {
        console.log("关闭了");
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  // 当返回上一页的时候，关闭掉socket
  onUnload(){  // wx.navigateBack() 和 wx.redirectTo({}) 的时候使用
    wx.closeSocket({
      success:function(){
        console.log("关闭了")
      }
    })
  },
  /**
   * 发送消息
   */
  formSumbit(e){

    // 输入内容发送消息
    this.setData({
      sendMessage: e.detail.value.text
    })
    if (e.detail.value.text != ''){
      sendSocketMessage('{ "type": "say", "to_client_id":"all","content":"' + e.detail.value.text + '"}')
    }

    // 当点击button 发送之后，再讲input value变为空
    this.setData({
      sendMessage: ""
    })
  },
  
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  
  // 选词
  chooseWord(e){
    console.log(e)
    this.setData({  
      xuanciBool: false,
      current_ques:e.currentTarget.dataset.word
    });
    clearInterval(timer);
    sendSocketMessage('{"type":"start_draw","question_id":"' + e.currentTarget.dataset.id + '"}')
  },
  // 定时
  time(){
    var t = 10;
    var that = this;
    timer = setInterval(function(){
      t--;
      if (t == 0) {
        clearInterval(timer);
        that.setData({
          xuanciBool:false,
          current_ques: that.data.xuanti[0].title
        })
        sendSocketMessage('{"type":"start_draw","question_id":"' + that.data.xuanti[0].id + '"}');
      }
      that.setData({
        second: t
      })
    },1000)
  }
})

function paint(arrx, arry, arrz, color, pen, isClear, cleardraw, canvasPoint, canvasw){
  
  if (isClear) {
    context.setStrokeStyle('white')
    context.setLineWidth(30) //设置线条宽度
    context.beginPath() //开始一个路径 
  } else {
    context.save();
    context.setStrokeStyle(color);
    context.setLineWidth(pen);
    context.setLineCap('round'); // 让线条圆润 
    context.beginPath();
  }
  var zoomMax = canvasw/canvasPoint;
  for (var i in arrx) {
    if (arrz[i] == 0) {
      context.moveTo(arrx[i] * zoomMax, arry[i] * zoomMax);
      if (!isButtonDown) {
        context.lineTo(arrx[i] * zoomMax, arry[i] * zoomMax);
      }
    } else {
      context.lineTo(arrx[i] * zoomMax, arry[i] * zoomMax)
    };
  };
  context.stroke();
  context.draw(true);
}
