import { SLEEP_STYLE } from '../config/sleepStyle.js'
import { SPO_DATA, SPONEW_TO_SPOOLD, SPONEW_TO_EX, SPO38000 } from '../config/spo.js'
import { SLEEP_CALC_POKEMONS, SLEEP_CALC_UP } from '../config/act.js'
import { pokedex } from '../config/pokedex.js'
import {
  sortInObjectOptions,
  getRandomArr,
  getNumberInMap,
  get,
  fnAccumulation,
  getPercent
} from '../utils/index.js'
export function getTargetPokemonsSleeps(pokeSleepId, mapId) {
  if (SLEEP_STYLE[pokeSleepId]) {
    return {
      ...SLEEP_STYLE[pokeSleepId],
      sleepType: pokedex[SLEEP_STYLE[pokeSleepId].pokeId].sleepType,
      spo: getSPOById(pokeSleepId, mapId),
      spoId: SPO_DATA[pokeSleepId].id
    }
  }
  return {}
}
export function getUnLockSleeps(mapId, levelList, curStageIndex) {
  let unLockSleeps = []
  let curUnlockSleeps = []

  // 预计算常用值以减少重复访问
  const currentLevelSleepStyles = levelList[curStageIndex].sleepStyles

  if (curStageIndex > 0) {
    const aResLast = []

    // 使用普通 for 循环替代 forEach 提升性能
    for (let levelKey = 0; levelKey < curStageIndex; levelKey++) {
      const levelItem = levelList[levelKey]
      const sleepStyles = levelItem.sleepStyles
      const sleepStylesLength = sleepStyles.length

      if (sleepStylesLength > 0) {
        for (let j = 0; j < sleepStylesLength; j++) {
          const sItem = sleepStyles[j]
          if (SLEEP_STYLE[sItem]) {
            aResLast.push({
              ...getTargetPokemonsSleeps(sItem, mapId),
              unLockLevel: levelKey
            })
          }
          // else {
          //   console.log(sItem)
          // }
        }
      }
    }

    unLockSleeps = sortInObjectOptions(
      aResLast,
      ['sleepType', 'pokeId', 'star'],
      'up'
    )
  }

  if (currentLevelSleepStyles.length > 0) {
    const aRes = []
    const currentSleepStylesLength = currentLevelSleepStyles.length

    for (let j = 0; j < currentSleepStylesLength; j++) {
      const sItem = currentLevelSleepStyles[j]
      if (SLEEP_STYLE[sItem]) {
        aRes.push({
          ...getTargetPokemonsSleeps(sItem, mapId),
          unLockLevel: curStageIndex
        })
      }
      // else {
      //   console.log(sItem)
      // }
    }

    curUnlockSleeps = sortInObjectOptions(
      aRes,
      ['sleepType', 'pokeId', 'star'],
      'up'
    )
  }

  return {
    unLockSleeps,
    curUnlockSleeps,
    allUnlockSleepsList: [...unLockSleeps, ...curUnlockSleeps]
  }
}


const getShinyPoke = isShinyUp => {
  if (isShinyUp) {
    // console.log('闪率up')
    return parseInt(Math.floor(Math.random() * 40), 10) === 4
  }
  return parseInt(Math.floor(Math.random() * 140), 10) === 44
}
const spacialPokemons = {
  ...SLEEP_CALC_POKEMONS,
  isGet: { // 露营券判断是否重复使用
    243: false,
    244: false,
    245: false
  }
}

const inRandomSleepStyleGetSleepStyles = (orgSleepList, options) => {
  if (options === undefined) {
    return orgSleepList
  }

  // 保持原有的 upCoefficient 计算逻辑（支持配置表）
  let upCoefficient = SLEEP_CALC_UP.small // 默认small
  if (options.upType === 'mid') {
    upCoefficient = SLEEP_CALC_UP.mid
  } else if (options.upType === 'large') {
    upCoefficient = SLEEP_CALC_UP.large
  }

  if (options.ids && options.ids.length > 0) {
    // 使用 Set 优化 includes 性能
    const idsSet = new Set(options.ids)
    const needUseSleepStyles = orgSleepList.filter(item => idsSet.has(item.pokeId))

    if (needUseSleepStyles.length > 0) {
      // 预分配数组长度，避免动态扩容
      const repeatCount = upCoefficient - 1
      const totalLength = needUseSleepStyles.length * repeatCount + orgSleepList.length
      const newRes = new Array(totalLength)

      let index = 0
      // 高效填充重复的权重睡姿
      for (let i = 0; i < repeatCount; i++) {
        for (let j = 0; j < needUseSleepStyles.length; j++) {
          newRes[index++] = needUseSleepStyles[j]
        }
      }
      // 高效填充原始睡姿列表
      for (let j = 0; j < orgSleepList.length; j++) {
        newRes[index++] = orgSleepList[j]
      }

      return newRes
    }
  }
  return orgSleepList
}

function fnGetZeroPokemon(isActRandom, curUnLockSleepType, catchNumByActRandom, extraSleepStyleOptions, spoZeroPoke, spoZeroPokeByType) {
  let pushZero = {
    ...spoZeroPoke,
    isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp)
    // extra: 'SPO<2' //debug
  }
  // 类型非无症状的活动随机类型
  if (isActRandom && +curUnLockSleepType !== 999 && catchNumByActRandom > 0) {
    pushZero = {
      ...spoZeroPokeByType,
      isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp)
      // extra: 'SPO<2' //debug
    }
  }
  return pushZero
}
// 随机抽一次卡池
export function getRandomSleepStyle(mapData, curUnLockSleepType, score, curStageIndex, extraSleepStyleOptions) {
  extraSleepStyleOptions = {
    banPokes: [],
    noLastPokes: [],
    useIncensePokemonId: '',
    isUseTicket: false,
    isActRandom: false,
    shinyUp: false,
    actRandomNum: 0.3,
    ...extraSleepStyleOptions // 合并参数
  }
  // console.log(extraSleepStyleOptions)
  const res = []

  // 优化：直接使用属性访问替代 get 函数
  const useIncensePokemonId = extraSleepStyleOptions.useIncensePokemonId || ''
  const isActRandom = !!extraSleepStyleOptions.isActRandom
  const isUseTicket = !!extraSleepStyleOptions.isUseTicket

  spacialPokemons.list.forEach(spitem => {
    spacialPokemons.isGet[spitem] = false //重置
  })

  const cathPokeCount = getNumberInMap(
    score,
    mapData.scoreList
  )
  const curSpo = getSPOByScore(score)
  // 只调用一次 getUnLockSleeps 来优化性能
  const unlockData = getUnLockSleeps(
    mapData.id,
    mapData.levelList,
    curStageIndex
  )
  let orgSleepList = unlockData.allUnlockSleepsList

  // 使用浅拷贝替代深拷贝来优化性能
  let orgSleepListByActType = [...orgSleepList]
  const catchNumByActRandom = cathPokeCount - Math.floor(cathPokeCount * extraSleepStyleOptions.actRandomNum) // 活动带类型的无症状 固定前几个无症状
  // console.log(isActRandom, catchNumByActRandom, orgSleepListByActType)

  // 睡眠类型图鉴筛选
  if (+curUnLockSleepType !== 999) {
    orgSleepList = orgSleepList.filter(
      item => item.sleepType === +curUnLockSleepType
    )
  }

  // 优化：直接检查数组长度替代 get 函数
  const hasBanPokes = Array.isArray(extraSleepStyleOptions.banPokes) && extraSleepStyleOptions.banPokes.length > 0
  const hasNoLastPokes = Array.isArray(extraSleepStyleOptions.noLastPokes) && extraSleepStyleOptions.noLastPokes.length > 0

  // 特殊宝可梦使用熏香，也只能出1只
  if (spacialPokemons.list.includes(+useIncensePokemonId)) {
    // 如果存在ban的宝可梦列表则合并
    if (hasBanPokes) {
      extraSleepStyleOptions.banPokes = extraSleepStyleOptions.banPokes.concat([...spacialPokemons.list])
    } else {
      extraSleepStyleOptions.banPokes = [...spacialPokemons.list]
    }
    // console.log('使用该熏香', useIncensePokemonId, extraSleepStyleOptions.banPokes)
  }
  // 如果存在额外不进保底的宝可梦列表则合并
  if (hasNoLastPokes) {
    extraSleepStyleOptions.noLastPokes = extraSleepStyleOptions.noLastPokes.concat([...spacialPokemons.noLastList])
  } else {
    extraSleepStyleOptions.noLastPokes = [...spacialPokemons.noLastList]
  }
  // console.log(extraSleepStyleOptions.noLastPokes)
  // 如果存在去除宝可梦
  if (hasBanPokes) {
    orgSleepList = orgSleepList.filter(
      item => !extraSleepStyleOptions.banPokes.includes(+item.pokeId)
    )
    // 如果是活动随机类型
    if (isActRandom) {
      orgSleepListByActType = orgSleepListByActType.filter(
        item => !extraSleepStyleOptions.banPokes.includes(+item.pokeId)
      )
    }
  }

  // 优化：为嵌套属性创建专用检查函数
  const hasUpIds = upIds => upIds && upIds.ids && upIds.ids.length > 0

  // 部分宝可梦权重
  if (hasUpIds(extraSleepStyleOptions.upIdsMid)) {
    orgSleepList = inRandomSleepStyleGetSleepStyles(orgSleepList, extraSleepStyleOptions.upIdsMid)
  }
  if (hasUpIds(extraSleepStyleOptions.upIdsSmall)) {
    orgSleepStyleOptions.orgSleepList = inRandomSleepStyleGetSleepStyles(orgSleepList, extraSleepStyleOptions.upIdsSmall)
  }
  if (hasUpIds(extraSleepStyleOptions.upIdsLarge)) {
    orgSleepList = inRandomSleepStyleGetSleepStyles(orgSleepList, extraSleepStyleOptions.upIdsLarge)
  }
  // 随机洗牌，如果10倍长度少于1000，则默认1000次
  orgSleepList = getRandomArr(
    orgSleepList,
    orgSleepList.length * 10 < 1000 ? 1000 : orgSleepList.length * 10
  )
  // 如果是活动随机类型
  if (isActRandom) {
    // 部分宝可梦权重
    if (hasUpIds(extraSleepStyleOptions.upIdsMid)) {
      orgSleepListByActType = inRandomSleepStyleGetSleepStyles(orgSleepListByActType, extraSleepStyleOptions.upIdsMid)
    }
    if (hasUpIds(extraSleepStyleOptions.upIdsSmall)) {
      orgSleepListByActType = inRandomSleepStyleGetSleepStyles(orgSleepListByActType, extraSleepStyleOptions.upIdsSmall)
    }
    if (hasUpIds(extraSleepStyleOptions.upIdsLarge)) {
      orgSleepListByActType = inRandomSleepStyleGetSleepStyles(orgSleepListByActType, extraSleepStyleOptions.upIdsLarge)
    }
    orgSleepListByActType = getRandomArr(
      orgSleepListByActType,
      orgSleepListByActType.length * 10 < 1000 ? 1000 : orgSleepListByActType.length * 10
    )
  }

  // SPO 值最小，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
  const spoZeroPoke = sortInObjectOptions(
    orgSleepList,
    ['spo', 'unLockLevel', 'spoId'],
    'up'
  )[0]
  let spoZeroPokeByType = {}
  // 类型非无症状的活动随机类型
  if (isActRandom && +curUnLockSleepType !== 999) {
    spoZeroPokeByType = sortInObjectOptions(
      orgSleepListByActType,
      ['spo', 'unLockLevel', 'spoId'],
      'up'
    )[0]
  }
  // console.log(`等级解锁睡姿——${orgSleepList.length}个`, orgSleepList)

  let isSleepOnStomach = false

  // 使用局部变量优化循环性能
  let currentCathPokeCount = cathPokeCount
  let currentCatchNumByActRandom = catchNumByActRandom
  let currentCurSpo = curSpo

  while (currentCathPokeCount > 1) {
    let sleepList = orgSleepList.filter(
      item =>
        item.spo <= currentCurSpo && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
    )
    sleepList = getRandomArr(sleepList, sleepList.length * 10)

    let sleepListByActRandom = []
    // 类型非无症状的活动随机类型
    if (isActRandom && +curUnLockSleepType !== 999) {
      sleepListByActRandom = orgSleepListByActType.filter(
        item =>
          item.spo <= currentCurSpo && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
      )
      sleepListByActRandom = getRandomArr(sleepListByActRandom, sleepListByActRandom.length * 10)
    }
    //当剩余的 SPO 小于 2 时(即小于可用的睡姿的 SPO 时)，将固定抽出 SPO 值最小，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
    if (currentCurSpo < 2) {
      const pushZero = fnGetZeroPokemon(isActRandom, curUnLockSleepType, currentCatchNumByActRandom, extraSleepStyleOptions, spoZeroPoke, spoZeroPokeByType)
      res.push(pushZero)
      currentCurSpo = 1
    } else {
      let useSleepList = [...sleepList]
      // 类型非无症状的活动随机类型
      if (isActRandom && +curUnLockSleepType !== 999 && currentCatchNumByActRandom > 0) {
        useSleepList = [...sleepListByActRandom]
      }
      const rdmIndex = parseInt(
        Math.floor(Math.random() * useSleepList.length),
        10
      )
      let rdmRes = useSleepList[rdmIndex]
      if (useSleepList.length === 0) {
        rdmRes = fnGetZeroPokemon(isActRandom, curUnLockSleepType, currentCatchNumByActRandom, extraSleepStyleOptions, spoZeroPoke, spoZeroPokeByType)
      }
      // console.log(useSleepList, currentCurSpo, rdmRes)
      // 大肚子睡只能1次
      if (rdmRes.sleepNameId && rdmRes.sleepNameId === 4) {
        isSleepOnStomach = true
      }
      // console.log(rdmRes)
      // 抽到特殊宝可梦后，接下来不会再出现该宝可梦
      if (spacialPokemons.list.includes(rdmRes.pokeId)) {
        // console.log('抽到特殊宝可梦', rdmRes.pokeId)
        orgSleepList = orgSleepList.filter(
          item =>
            !spacialPokemons.list.includes(item.pokeId)
        )
        // 类型非无症状的活动随机类型
        if (isActRandom && +curUnLockSleepType !== 999) {
          orgSleepListByActType = orgSleepListByActType.filter(
            item =>
              !spacialPokemons.list.includes(item.pokeId)
          )
        }
        spacialPokemons.list.forEach(spitem => {
          spacialPokemons.isGet[spitem] = true
        })
      }
      res.push({
        ...rdmRes,
        isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp)
      })
      currentCurSpo -= rdmRes.spo
      if (currentCurSpo < 2) {
        currentCurSpo = 1
      }
    }
    // console.log(currentCurSpo)
    currentCathPokeCount--
    currentCatchNumByActRandom--
  }
  //当抽取到最后一个睡姿的时候，将根据剩余的 SPO 固定抽出最后一个 SPO 最大，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
  if (currentCurSpo < 2) {
    res.push({
      ...spoZeroPoke,
      isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp)
    })
  } else {
    // 保底计算
    let lastList = orgSleepList.filter(
      item =>
        !extraSleepStyleOptions.noLastPokes.includes(item.pokeId) && // 去除特殊宝可梦保底
        item.spo <= currentCurSpo && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
    )
    if (lastList.length === 0) {
      lastList = [spoZeroPoke]
    } else {
      // console.log('curSpo', extraSleepStyleOptions, currentCurSpo, orgSleepList, lastList)
      lastList = sortInObjectOptions(lastList, ['spo'], 'down')
      if (spacialPokemons.probabilityLastList.includes(lastList[0].pokeId) && (Math.random() < 0.8)) {
        lastList = sortInObjectOptions(lastList.filter(item => item.pokeId !== lastList[0].pokeId), ['spo'], 'down')
      }
      const lastMostSpo = lastList[0].spo
      lastList = lastList.filter(item => item.spo === lastMostSpo)
      if (lastList.length > 0) {
        lastList = sortInObjectOptions(lastList, ['unLockLevel', 'spoId'], 'up')
      }
    }
    // 大肚子睡只能1次
    if (lastList[0].sleepNameId && lastList[0].sleepNameId === 4) {
      isSleepOnStomach = true
    }
    res.push({
      ...lastList[0],
      isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp)
    })
  }

  // 使用熏香 / 露营券 公用参数
  let useOptionsCurSpo = getSPOByScore(score)
  let targetPokemonAllSleep = []
  // console.log(isSleepOnStomach)
  if (useIncensePokemonId || isUseTicket) {
    // 获取当前地图所有睡姿
    targetPokemonAllSleep = getUnLockSleeps(
      mapData.id,
      mapData.levelList,
      34
    ).allUnlockSleepsList.filter(sitem => (isSleepOnStomach ? sitem.sleepNameId !== 4 : true))
  }
  // 使用熏香
  if (useIncensePokemonId) {
    let incensePokemonSleeps = targetPokemonAllSleep.filter(sitem => +sitem.pokeId === +useIncensePokemonId)
    incensePokemonSleeps = sortInObjectOptions(incensePokemonSleeps, ['spo'], 'up')
    // console.log(incensePokemonSleeps, extraSleepStyleOptions, useOptionsCurSpo)
    const resList = incensePokemonSleeps.filter(sitem => sitem.spo <= useOptionsCurSpo)
    // 大于1个结果随机分配睡姿
    if (resList.length > 1) {
      const rdmIndexIn = parseInt(
        Math.floor(Math.random() * resList.length),
        10
      )
      // 大肚子睡只能1次
      if (resList[rdmIndexIn].sleepNameId && resList[rdmIndexIn].sleepNameId === 4) {
        isSleepOnStomach = true
      }
      res.push({
        ...resList[rdmIndexIn],
        isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp),
        extra: extraSleepStyleOptions.extraTextIncense
      })
    } else {
      // 否则最低spo睡姿
      // 大肚子睡只能1次
      if (incensePokemonSleeps[0].sleepNameId && incensePokemonSleeps[0].sleepNameId === 4) {
        isSleepOnStomach = true
      }
      res.push({
        ...incensePokemonSleeps[0],
        isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp),
        extra: extraSleepStyleOptions.extraTextIncense
      })
    }
  }

  // 使用露营券
  if (isUseTicket) {
    // 转换 banPokes 为 Set 以提高 includes 性能
    const banPokesSet = new Set(extraSleepStyleOptions.banPokes)

    let ticketSleeps = [...targetPokemonAllSleep].filter(
      item => !banPokesSet.has(+item.pokeId) && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
    )

    // 睡眠类型图鉴筛选
    if (+curUnLockSleepType !== 999) {
      ticketSleeps = ticketSleeps.filter(
        item => item.sleepType === +curUnLockSleepType
      )
    }

    // 特殊宝可梦筛选，抽过的露营券不会再出
    const isGetPokes = []
    spacialPokemons.list.forEach(spitem => {
      if (spacialPokemons.isGet[spitem]) {
        isGetPokes.push(+spitem)
      }
    })
    // console.log('已经抽过的特殊宝可梦', isGetPokes)
    if (isGetPokes.length > 0) {
      const isGetPokesSet = new Set(isGetPokes)
      ticketSleeps = ticketSleeps.filter(
        item => !isGetPokesSet.has(+item.pokeId)
      )
    }

    // 露营券dpr最低为2
    useOptionsCurSpo = useOptionsCurSpo <= 2 ? 2 : useOptionsCurSpo
    const resList = ticketSleeps.filter(sitem => sitem.spo <= useOptionsCurSpo)
    res.push({
      ...resList[parseInt(
        Math.floor(Math.random() * resList.length),
        10
      )],
      isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp),
      isUseTicket: true,
      extra: `+${extraSleepStyleOptions.extraTextTicket}`
    })
  }

  // console.log(
  //   mapData.name,
  //   levelList[curStageIndex].name,
  //   3000000,
  //   `剩余SPO:${currentCurSpo}`,
  //   SLEEP_TYPES[curUnLockSleepType],
  //   `${getNumberInMap(score, mapData.scoreList)}只`
  // )
  // console.log('res', res)
  return res
}

// x次期望分析
export function getRandomHopeWithMulti(mapData, curUnLockSleepType, score, curStageIndex, getTimes, extraSleepStyleOptions, callback) {
  const time = new Date().getTime()
  getTimes = getTimes || 4000
  const lastGetList = new Set()
  const acc = {
    exp: 0,
    shards: 0,
    spoValidity: 0
  }

  // 预计算固定数据，避免在循环中重复计算
  const shouldCalculateAcc = !extraSleepStyleOptions.isNoMoreData
  const scoreGtSPO38000 = score > SPO38000
  const currentSPO = getSPOByScore(score)

  // 使用普通对象代替 Map，减少内存分配开销
  const mergeResObj = {}

  for (let i = 0; i < getTimes; i++) {
    const onceGetRes = getRandomSleepStyle(
      mapData,
      curUnLockSleepType,
      score,
      curStageIndex,
      extraSleepStyleOptions
    )

    if (shouldCalculateAcc) {
      acc.exp += fnAccumulation(onceGetRes, 'exp')
      acc.shards += fnAccumulation(onceGetRes, 'shards')
      if (scoreGtSPO38000) {
        acc.spoValidity += getPercent(
          fnAccumulation(onceGetRes, 'spo'),
          currentSPO,
          0
        )
      }
    }

    // 将唯一 ID 存入 Set
    const lastItemId = onceGetRes[onceGetRes.length - 1].id
    lastGetList.add(lastItemId)

    // 使用对象代替 Map，减少方法调用开销
    onceGetRes.forEach(item => {
      if (mergeResObj[item.id]) {
        mergeResObj[item.id].count += 1
      } else {
        mergeResObj[item.id] = { ...item, count: 1 }
      }
    })
  }

  // 处理合并后的结果
  const res = []
  const pokeIdMap = {} // 用于快速查找已存在的 pokeId

  for (const itemId in mergeResObj) {
    const item = mergeResObj[itemId]
    const pokeId = item.pokeId

    if (!pokeIdMap[pokeId]) {
      const resItem = {
        pokeId: pokeId,
        count: item.count,
        shardsSum: item.count * item.shards,
        expSum: item.count * item.exp,
        candysSum: item.count * item.candys
      }
      if (shouldCalculateAcc) {
        resItem.list = [item]
      }
      res.push(resItem)
      pokeIdMap[pokeId] = resItem
    } else {
      const findTargetResItem = pokeIdMap[pokeId]
      if (shouldCalculateAcc) {
        findTargetResItem.list.push(item)
      }
      findTargetResItem.count += item.count
      findTargetResItem.shardsSum += item.count * item.shards
      findTargetResItem.expSum += item.count * item.exp
      findTargetResItem.candysSum += item.count * item.candys
    }
  }

  if (shouldCalculateAcc) {
    res.forEach(item => {
      item.list = sortInObjectOptions(item.list, ['count'], 'down')
    })
  }

  // 排序结果
  res.sort((a, b) => b.count - a.count || a.pokeId - b.pokeId)

  console.log((new Date().getTime() - time) / 1000)
  // console.log(acc)
  if (callback) {
    callback(res, acc)
  }

  return {
    lastGetList,
    res,
    acc
  }
  // console.log({
  //   res,
  //   orgList,
  //   getTimes
  // })
}

export function getLevelIndexByEnergy(curMapLevelList, CurEnergy) {
  let curStageIndex = 0
  for (let gKey = 0; gKey < curMapLevelList.length; gKey++) {
    const gItem = curMapLevelList[gKey]
    if (gKey < curMapLevelList.length - 1) {
      if (
        CurEnergy >= gItem.energy &&
        CurEnergy < curMapLevelList[gKey + 1].energy
      ) {
        curStageIndex = gKey
        break
      }
    } else {
      curStageIndex = gKey
    }
  }
  return curStageIndex
}

export function getSPOById(sleepStyleId, mapId) {
  if (sleepStyleId && SPO_DATA[sleepStyleId] && SPO_DATA[sleepStyleId].spo_n) {
    if (mapId === 'greenex') {
      // console.log(mapId === 'greenex')
      return SPONEW_TO_EX[SPO_DATA[sleepStyleId].spo_n] // 转换最新的spo_n对应数值
    }
    return SPONEW_TO_SPOOLD[SPO_DATA[sleepStyleId].spo_n] // 转换最新的spo_n对应数值
  }
}

export function checkListInLastGet(mapData, curUnLockSleepType, curStageIndex, dataList, canUseSPO, lastSPO) {
  const isLastGetArr = new Array(dataList.length).fill(false)
  let isSleepOnStomach = false

  let orgSleepList = getUnLockSleeps(
    mapData.id,
    mapData.levelList,
    curStageIndex
  ).allUnlockSleepsList

  // 睡眠类型图鉴筛选
  if (+curUnLockSleepType !== 999) {
    orgSleepList = orgSleepList.filter(
      item => item.sleepType === +curUnLockSleepType
    )
  }

  // SPO 值最小，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
  const spoZeroPoke = sortInObjectOptions(
    orgSleepList,
    ['spo', 'unLockLevel', 'spoId'],
    'up'
  )[0]

  dataList.forEach(sleepStyleId => {
    // 有大肚睡
    if (sleepStyleId && SLEEP_STYLE[sleepStyleId] && SLEEP_STYLE[sleepStyleId].sleepNameId === 4) {
      isSleepOnStomach = true
    }
    // 抽到特殊宝可梦后，接下来不会再出现该宝可梦
    if (sleepStyleId && spacialPokemons.list.includes(SLEEP_STYLE[sleepStyleId].pokeId)) {
      // console.log('抽到特殊宝可梦', SLEEP_STYLE[sleepStyleId].pokeId)
      orgSleepList = orgSleepList.filter(
        item =>
          item.pokeId !== SLEEP_STYLE[sleepStyleId].pokeId
      )
    }
  })

  dataList.forEach((sleepStyleId, dataKey) => {
    if (sleepStyleId && (+curUnLockSleepType === 999 || (
      +curUnLockSleepType !== 999 && (pokedex[SLEEP_STYLE[sleepStyleId].pokeId].sleepType === +curUnLockSleepType)))) {
      const curSpo = canUseSPO - (canUseSPO - lastSPO - getSPOById(sleepStyleId, mapData.id))
      let lastPokemon = spoZeroPoke
      // 保底计算
      if (curSpo >= 2) {
        let lastList = orgSleepList.filter(
          item =>
            // !spacialPokemons.noLastList.includes(item.pokeId) && // 去除特殊宝可梦保底
            item.spo <= curSpo && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
        )
        lastList = sortInObjectOptions(lastList, ['spo'], 'down')
        const lastMostSpo = lastList[0].spo
        lastList = lastList.filter(item => item.spo === lastMostSpo)
        if (lastList.length > 0) {
          lastList = sortInObjectOptions(lastList, ['unLockLevel', 'spoId'], 'up')
        }
        lastPokemon = lastList[0]
      }

      isLastGetArr[dataKey] = lastPokemon.id === sleepStyleId
      console.log(isSleepOnStomach, curSpo, sleepStyleId, lastPokemon.id, lastPokemon.id === sleepStyleId)
    }
  })
  return isLastGetArr
}

export function getSPOByScore(score) {
  return Math.floor(score / SPO38000)
}