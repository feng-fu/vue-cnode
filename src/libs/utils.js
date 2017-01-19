'use strict'
// 间隔时间获取
/*
* 时间格式："2017-01-17T03:06:12.591Z"
*/

exports.getIntervalTime = (time) => {
//  2014-10-07T13:05:32.158Z
  var now = new Date()
  var nowYear = now.getFullYear()
  var nowMonth = now.getMonth() + 1
  var nowDate = now.getDate()
  var nowHour = now.getHours()
  var nowMin = now.getMinutes()
  var nowSec = now.getSeconds()
  var year = nowYear - Number(time.substr(0, 4))
  var month = nowMonth - Number(time.substr(5, 2))
  var date = nowDate - Number(time.substr(8, 2))
  var hour = nowHour - Number(time.substr(11, 2))
  var min = nowMin - Number(time.substr(14, 2))
  var sec = nowSec - Number(time.substr(18, 2))
  var timesec = year * 365 * 24 * 60 * 60 + month * 30 * 24 * 60 * 60 + date * 24 * 60 * 60 + hour * 60 * 60 + min * 60 + sec
  var timeNow = timesec / 60 / 60 / 24 / 365
  if (timeNow >= 1) {
    return parseInt(timeNow) + '年前'
  } else if (timeNow * 365 / 30 >= 1) {
    return parseInt(timeNow * 365 / 30) + '月前'
  } else if (timeNow * 365 >= 1) {
    return parseInt(timeNow * 365) + '天前'
  } else if (timeNow * 365 * 24 >= 1) {
    return parseInt(timeNow * 365 * 24) + '小时前'
  } else if (timeNow * 365 * 24 * 60 >= 1) {
    return parseInt(timesec / 60) + '分钟前'
  } else {
    return timesec + '秒前'
  }
}

// NOTE: 判断类目
exports.getCategory = (top, good, tab) => {
  var str = ''
  var className = ''
  if (top) {
    str = '置顶'
    className = 'top'
  } else if (good) {
    str = '精华'
    className = 'good'
  } else {
    switch (tab) {
      case 'share':
        str = '分享'
        className = 'share'
        break
      case 'ask':
        str = '问答'
        className = 'ask'
        break
      case 'job':
        str = '招聘'
        className = 'job'
        break
      default:
        str = '暂无'
        className = 'default'
        break
    }
  }
  return {
    str: str,
    className: className
  }
}
