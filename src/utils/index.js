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