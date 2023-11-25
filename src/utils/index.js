function thousands(num) {
  const str = num.toString()
  const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
  return str.replace(reg, '$1,')
}

export function toHM(decimalHours) {
  const hours = Math.floor(decimalHours) // 获取小时部分
  const minutes = Math.round((decimalHours - hours) * 60) // 获取分钟部分
  return hours + '小时' + minutes + '分钟'
}

export function getNum(num) {
  if (num) {
    return thousands(parseFloat(((Math.floor(num * 100) / 100).toFixed(2))))
  }
  return num
}