function thousands(num) {
  const str = num.toString()
  const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
  return str.replace(reg, '$1,')
}

export function toHM(time, type) {
  if (type === 'sec') { // time传入为x秒
    const _hours = Math.floor(time / 3600)
    const _minutes = parseInt((time % 3600) / 60)
    const _remainingSeconds = time % 60

    let res = _minutes + '分' + _remainingSeconds + '秒'
    if (_hours !== 0) {
      res = _hours + '小时' + res
    }
    // 转换成x小时x分x秒
    return res
  }
  // time传入为x.x小时
  let hours = Math.floor(time) // 获取小时部分
  let minutes = Math.round((time - hours) * 60) // 获取分钟部分
  if (minutes === 60) {
    minutes = 0
    hours++
  }
  if (type === 'mm') {
    // 转换成x分钟
    return hours * 60 + minutes
  }
  // 转换成x小时x分钟
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

export function sortInObjectOptions(arr, options, updown) {
  updown = updown || 'down'
  if (options && options.length > 0) {
    return arr.sort((a, b) => {
      const aa = updown === 'up' ? a : b
      const bb = updown === 'up' ? b : a
      let sort = aa[options[0]] - bb[options[0]]
      for (let i = 0; i < options.length; i++) {
        const item = options[i]
        if (item === 'name') {
          sort = sort || bb[item].localeCompare(aa[item])
        } else if (item === 'time') {
          sort = sort || Date.parse(bb[item]) - Date.parse(aa[item])
        } else {
          sort = sort || aa[item] - bb[item]
        }
      }
      return sort
    })
  }
  return arr
}

export function getPercent(count, sum, decimalPoint) {
  decimalPoint = decimalPoint || 2
  return getDecimalNumber((count / sum) * 100, decimalPoint)
}
/**
 * 获取带指定位数小数点的数字
 * @param {*} number 
 * @param {*} decimalPoint 
 * @returns 
 */
export function getDecimalNumber(number, decimalPoint) {
  decimalPoint = decimalPoint || 2
  return parseFloat(number.toFixed(decimalPoint))
}

export function fnAccumulation(arr, key, isList) {
  const res = arr.reduce((acc, item) => {
    if (isList) {
      return acc + item[key].length
    }
    return acc + item[key]
  }, 0)
  return res
}

import { COOKMENU } from '../config/cookmenu.js'
export function findMenuWithFood(pokemonFoodKey) {
  // console.log('pokemon:', pokemonFoodKey)
  const res = []
  for (const menuItem in COOKMENU) {
    if (Object.hasOwnProperty.call(COOKMENU, menuItem)) {
      const element = COOKMENU[menuItem]
      for (let i = 0; i < element.from.length; i++) {
        if (pokemonFoodKey.includes(element.from[i].id)) {
          res.push(COOKMENU[menuItem])
          break
        }
      }
    }
  }
  return sortInObjectOptions(res, ['baseEnergy'], 'down')
}

//洗牌算法
export function getRandomArr(data, eachNum) {
  let num = eachNum || 100 //默认交换100次位置
  const _arr = [...data]
  let n = _arr.length
  const result = []

  // 先打乱数组
  while (n-- && num--) {
    const index = Math.floor(Math.random() * n); // 随机位置
    [_arr[index], _arr[n]] = [_arr[n], _arr[index]] // 交换数据
    result.push(_arr[n]) // 取出当前最后的值，即刚才交换过来的值
  }
  return result
}