'use strict'
// 间隔时间获取
/*
* 时间格式："2017-01-17T03:06:12.591Z"
*/

exports.getIntervalTime = (time) => {

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
