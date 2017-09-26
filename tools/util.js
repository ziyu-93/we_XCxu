const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function timeStamp() {
  return parseInt(new Date().getTime() / 1000) + ''
}
function randomString() {
  var chars = '0123456789';   
  var maxPos = chars.length;
  var pwd = '';
  for (var i = 0; i < 4; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}  
function clear(obj) {
  obj = obj.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的

  var c = obj.split("."); // 防止第二次输入 "."
  if (c.length == 3) {
    var d = [c[0], c[1]];
    obj = d.join(".");
  }
  if (obj.indexOf(".") == 0) {  // 如果输入的第一个是 "." 则替换成 "0."
    obj = obj.replace(/\.{1}/g, "0.");
  }
  obj = obj.replace(/[a-z/A-Z]/g, ""); //只保留第一个. 清除多余的

  obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
  if (obj.indexOf(".") < 0 && obj != "") {//如果没有小数点，首位不能为类似于 01、02的金额   
    obj = parseFloat(obj);
  }
  return obj;
}

module.exports = {
  formatTime: formatTime,
  timeStamp: timeStamp,
  randomString: randomString,
  clear:clear
}
