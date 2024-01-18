function thousands(num) {
  const str = num.toString()
  const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
  return str.replace(reg, '$1,')
}

export function toHM(decimalHours) {
  let hours = Math.floor(decimalHours) // 获取小时部分
  let minutes = Math.round((decimalHours - hours) * 60) // 获取分钟部分
  if (minutes === 60) {
    minutes = 0
    hours++
  }
  return hours + '小时' + minutes + '分钟'
}

/**
 * 用来判断数据串是否存在
 * @param {*} path 
 * @param {*} parent 
 * @param {*} num 
 * @returns 
 */
export function get(path, parent, num) {
  if (typeof parent !== 'object') {
    parent = this
  }
  const pathArr = path.replace(/\[/g, '.')
    .replace(/\]/g, '')
    .split('.')
  const res = pathArr.reduce((o, k) => (o || {})[k], parent)
  if ((Array.isArray(res) && num)) {
    return res.length >= num ? res.slice(0, num) : undefined
  }
  return res
}

export function getNum(num) {
  if (num) {
    return thousands(parseFloat(((Math.floor(num * 100) / 100).toFixed(2))))
  }
  return num
}

export function getNumberInMap(nowScore, scoreList) {
  // console.log(scoreList, nowScore)
  for (let i = 0; i < scoreList.length; i++) {
    const el = scoreList[i]
    if (i + 1 === scoreList.length && nowScore >= el.startscore) {
      return el.catchNum
    } else if (nowScore >= el.startscore && nowScore <= el.endscore) {
      return el.catchNum
    }
  }
  return 3
}

export function getStageLevelPicId(stageName) {
  if (stageName.indexOf('超级') > -1) {
    return 2
  } else if (stageName.indexOf('高级') > -1) {
    return 3
  } else if (stageName.indexOf('大师') > -1) {
    return 4
  }
  return 1
}


/**
 * 将输入的任意对象转换成 Date，如果装换失败将返回当前时间
 * silly-datetime组件，https://github.com/csbun/silly-datetime/blob/master/src/index.js
 * @param  {any} datetime 需要被格式化的时间
 * @return {Date}         转换好的 Date
 */
function getDateObject(datetime) {
  let t = datetime instanceof Date ? datetime : new Date(datetime)
  if (!t.getDate()) {
    t = new Date()
  }
  return t
}
/**
 * 格式化时间
 * silly-datetime组件，https://github.com/csbun/silly-datetime/blob/master/src/index.js
 * @param  {Date}   datetime  需要被格式化的时间
 * @param  {string} formatStr 格式化字符串，默认为 'YYYY-MM-DD HH:mm:ss'
 * @return {string}           格式化后的时间字符串
 */
export function formatTime(datetime, formatStr) {
  const t = getDateObject(datetime)
  let i = 0
  formatStr = formatStr || 'YYYY-MM-DD HH:mm:ss'
  const hours = t.getHours()
  const o = [
    ['M+', t.getMonth() + 1],
    ['D+', t.getDate()],
    // H 24小时制
    ['H+', hours],
    // h 12小时制
    ['h+', hours > 12 ? hours - 12 : hours],
    ['m+', t.getMinutes()],
    ['s+', t.getSeconds()]
  ]
  // 替换 Y
  if (/(Y+)/.test(formatStr)) {
    formatStr = formatStr.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  // 替换 M, D, H, h, m, s
  for (; i < o.length; i++) {
    if (new RegExp('(' + o[i][0] + ')').test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1, RegExp.$1.length === 1 ? o[i][1] : ('00' + o[i][1]).substr(('' + o[i][1]).length))
    }
  }
  // 替换 a/A 为 am, pm
  return formatStr.replace(/a/ig, hours > 11 ? 'pm' : 'am')
}

/**
 * 从URL获取对应key的参数
 * @param {*} paramName 
 * @param {*} url 
 * @returns 
 */
export function getUrlQuery(paramName, url) {
  let seachUrl = window.location.search.replace('?', '')
  if (url != null) {
    const index = url.indexOf('?')
    url = url.substr(index + 1)
    seachUrl = url
  }
  const ss = seachUrl.split('&')
  let paramNameStr = ''
  let paramNameIndex = -1
  const result = paramName ? '' : {}
  for (let i = 0; i < ss.length; i++) {
    paramNameIndex = ss[i].indexOf('=')
    paramNameStr = ss[i].substring(0, paramNameIndex)
    if (!paramName) {
      const returnValue = ss[i].substring(paramNameIndex + 1, ss[i].length)
      result[paramNameStr] = returnValue
    } else if (paramNameStr === paramName) {
      let returnValue = ss[i].substring(paramNameIndex + 1, ss[i].length)
      if (typeof returnValue === 'undefined') {
        returnValue = ''
      }
      returnValue = returnValue.replace(/\?.*/, '')
      return returnValue.replace(/(#(.*))$/, '')
    }
  }
  return result
}