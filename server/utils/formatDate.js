
function formatNumber(num){
  return num <= 9? '0'+num:num
}
let oDay = new Date(); 
let year = oDay.getFullYear(); //完整的年月日（xx年，xx月，xx日）
let month = formatNumber(oDay.getMonth() + 1); //当前的月份(0-11,0代表1月)         // 获取当前的月份是oDay.getMonth()+1;   <br>oDay.getDate(); //当前的日(1-31) 
let day = formatNumber(oDay.getDay()); //当前的星期X(0-6,0代表星期天) 
let h = formatNumber(oDay.getHours()); //当前的小时数(0-23) 
let m = formatNumber(oDay.getMinutes()); //当前的分钟数(0-59) 
let s = formatNumber(oDay.getSeconds()); //当前的秒数(0-59) 

module.exports = `${year}-${month}-${day} ${h}:${m}:${s}`
