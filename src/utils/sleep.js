import { SLEEP_STYLE } from '../config/sleepStyle.js'
import { SPO_DATA, SPONEW_TO_SPOOLD } from '../config/spo.js'
import { pokedex } from '../config/pokedex.js'
import {
  sortInObjectOptions,
  getRandomArr,
  getNumberInMap,
  get
} from '../utils/index.js'
export function getUnLockSleeps(levelList, curStageIndex) {
  let unLockSleeps = []
  let curUnlockSleeps = []
  if (curStageIndex > 0) {
    const aResLast = []
    levelList
      .slice(0, curStageIndex)
      .forEach((levelItem, levelKey) => {
        if (levelItem.sleepStyles.length > 0) {
          levelItem.sleepStyles.forEach(sItem => {
            if (SLEEP_STYLE[sItem]) {
              aResLast.push({
                ...SLEEP_STYLE[sItem],
                sleepType: pokedex[SLEEP_STYLE[sItem].pokeId].sleepType,
                spo: getSPOById(sItem),
                spoId: SPO_DATA[sItem].id,
                unLockLevel: levelKey
              })
            }
            // else {
            //   console.log(sItem)
            // }
          })
        }
      })
    unLockSleeps = sortInObjectOptions(
      aResLast,
      ['sleepType', 'pokeId', 'star'],
      'up'
    )
  }
  if (
    levelList[curStageIndex].sleepStyles.length >
    0
  ) {
    const aRes = []
    levelList[curStageIndex].sleepStyles.forEach(
      sItem => {
        if (SLEEP_STYLE[sItem]) {
          aRes.push({
            ...SLEEP_STYLE[sItem],
            sleepType: pokedex[SLEEP_STYLE[sItem].pokeId].sleepType,
            spo: getSPOById(sItem),
            spoId: SPO_DATA[sItem].id,
            unLockLevel: curStageIndex
          })
        }
        // else {
        //   console.log(sItem)
        // }
      }
    )
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
  list: [243, 244, 245], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 194, 195], // 不进保底
  probabilityLastList: [906, 907, 908, 909, 910, 911, 912, 913, 914], //概率进保底
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
  let upCoefficient = 4 // 默认small
  if (options.upType === 'mid') {
    upCoefficient = 6
  }
  if (options.ids && options.ids.length > 0) {
    const needUseSleepStyles = orgSleepList.filter(item => options.ids.includes(item.pokeId))
    if (needUseSleepStyles.length > 0) {
      let newRes = []
      for (let i = 0; i < upCoefficient - 1; i++) {
        newRes = [...newRes, ...needUseSleepStyles]
      }
      newRes = [
        ...newRes,
        ...orgSleepList
      ]
      return newRes
    }
  }
  return orgSleepList
}

// 随机抽一次卡池
export function getRandomSleepStyle(mapData, curUnLockSleepType, score, curStageIndex, extraSleepStyleOptions) {
  extraSleepStyleOptions = extraSleepStyleOptions || {
    banPokes: [],
    useIncensePokemonId: '',
    isUseTicket: false,
    isActRandom: false,
    shinyUp: false
  }
  const res = []
  const useIncensePokemonId = get('useIncensePokemonId', extraSleepStyleOptions)


  spacialPokemons.list.forEach(id => {
    spacialPokemons.isGet[id] = false //重置
  })

  let cathPokeCount = getNumberInMap(
    score,
    mapData.scoreList
  )
  let curSpo = Math.floor(score / 38000)
  let orgSleepList = getUnLockSleeps(
    mapData.levelList,
    curStageIndex
  ).allUnlockSleepsList

  let orgSleepListByActType = JSON.parse(JSON.stringify(orgSleepList))
  const isActRandom = get('isActRandom', extraSleepStyleOptions)
  let catchNumByActRandom = cathPokeCount - Math.floor(cathPokeCount * 0.4) // 活动带类型的无症状 固定前几个无症状
  // console.log(isActRandom, catchNumByActRandom, orgSleepListByActType)

  // 睡眠类型图鉴筛选
  if (+curUnLockSleepType !== 999) {
    orgSleepList = orgSleepList.filter(
      item => item.sleepType === +curUnLockSleepType
    )
  }

  // 特殊宝可梦使用熏香，也只能出1只
  if (spacialPokemons.list.includes(+useIncensePokemonId)) {
    // 如果存在ban的宝可梦列表则合并
    if (get('banPokes', extraSleepStyleOptions, 1)) {
      extraSleepStyleOptions.banPokes = extraSleepStyleOptions.banPokes.concat([...spacialPokemons.list])
    } else {
      extraSleepStyleOptions.banPokes = [...spacialPokemons.list]
    }
    // console.log('使用该熏香', useIncensePokemonId, extraSleepStyleOptions.banPokes)
  }
  // 如果存在去除宝可梦
  if (get('banPokes', extraSleepStyleOptions, 1)) {
    orgSleepList = orgSleepList.filter(
      item => !extraSleepStyleOptions.banPokes.includes(+item.pokeId)
    )
    // 如果是活动无症状
    if (isActRandom) {
      orgSleepListByActType = orgSleepListByActType.filter(
        item => !extraSleepStyleOptions.banPokes.includes(+item.pokeId)
      )
    }
  }
  // 部分宝可梦权重
  if (get('upIdsMid.ids', extraSleepStyleOptions, 1)) {
    orgSleepList = inRandomSleepStyleGetSleepStyles(orgSleepList, extraSleepStyleOptions.upIdsMid)
  }
  if (get('upIdsSmall.ids', extraSleepStyleOptions, 1)) {
    orgSleepList = inRandomSleepStyleGetSleepStyles(orgSleepList, extraSleepStyleOptions.upIdsSmall)
  }
  // 随机洗牌，如果10倍长度少于1000，则默认1000次
  orgSleepList = getRandomArr(
    orgSleepList,
    orgSleepList.length * 10 < 1000 ? 1000 : orgSleepList.length * 10
  )
  // 如果是活动无症状
  if (isActRandom) {
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
  // 类型非无症状的活动无症状
  if (isActRandom && +curUnLockSleepType !== 999) {
    spoZeroPokeByType = sortInObjectOptions(
      orgSleepListByActType,
      ['spo', 'unLockLevel', 'spoId'],
      'up'
    )[0]
  }
  // console.log(`等级解锁睡姿——${orgSleepList.length}个`, orgSleepList)

  let isSleepOnStomach = false

  while (cathPokeCount > 1) {
    let sleepList = orgSleepList.filter(
      item =>
        item.spo <= curSpo && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
    )
    sleepList = getRandomArr(sleepList, sleepList.length * 10)

    let sleepListByActRandom = []
    // 类型非无症状的活动无症状
    if (isActRandom && +curUnLockSleepType !== 999) {
      sleepListByActRandom = orgSleepListByActType.filter(
        item =>
          item.spo <= curSpo && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
      )
      sleepListByActRandom = getRandomArr(sleepListByActRandom, sleepListByActRandom.length * 10)
    }
    //当剩余的 SPO 小于 2 时(即小于可用的睡姿的 SPO 时)，将固定抽出 SPO 值最小，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
    if (curSpo < 2) {
      let pushZero = {
        ...spoZeroPoke,
        isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp)
        // extra: 'SPO<2' //debug
      }
      // 类型非无症状的活动无症状
      if (isActRandom && +curUnLockSleepType !== 999 && catchNumByActRandom > 0) {
        pushZero = {
          ...spoZeroPokeByType,
          isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp)
          // extra: 'SPO<2' //debug
        }
      }
      res.push(pushZero)
      curSpo = 1
    } else {
      let useSleepList = [...sleepList]
      // 类型非无症状的活动无症状
      if (isActRandom && +curUnLockSleepType !== 999 && catchNumByActRandom > 0) {
        useSleepList = [...sleepListByActRandom]
      }
      const rdmIndex = parseInt(
        Math.floor(Math.random() * useSleepList.length),
        10
      )
      const rdmRes = useSleepList[rdmIndex]
      // 大肚子睡只能1次
      if (rdmRes.sleepNameId && rdmRes.sleepNameId === 4) {
        isSleepOnStomach = true
      }
      // console.log(useSleepList[rdmIndex])
      // 抽到特殊宝可梦后，接下来不会再出现该宝可梦
      if (spacialPokemons.list.includes(useSleepList[rdmIndex].pokeId)) {
        // console.log('抽到特殊宝可梦', useSleepList[rdmIndex].pokeId)
        orgSleepList = orgSleepList.filter(
          item =>
            !spacialPokemons.list.includes(item.pokeId)
        )
        // 类型非无症状的活动无症状
        if (isActRandom && +curUnLockSleepType !== 999) {
          orgSleepListByActType = orgSleepListByActType.filter(
            item =>
              !spacialPokemons.list.includes(item.pokeId)
          )
        }
        spacialPokemons.isGet[spacialPokemons.list[0]] = true
        spacialPokemons.isGet[spacialPokemons.list[1]] = true
      }
      res.push({
        ...rdmRes,
        isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp)
      })
      curSpo -= useSleepList[rdmIndex].spo
      if (curSpo < 2) {
        curSpo = 1
      }
    }
    // console.log(curSpo)
    cathPokeCount--
    catchNumByActRandom--
  }
  //当抽取到最后一个睡姿的时候，将根据剩余的 SPO 固定抽出最后一个 SPO 最大，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
  if (curSpo < 2) {
    res.push({
      ...spoZeroPoke,
      isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp)
    })
  } else {
    // 保底计算
    let lastList = orgSleepList.filter(
      item =>
        !spacialPokemons.noLastList.includes(item.pokeId) && // 去除特殊宝可梦保底
        item.spo <= curSpo && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
    )
    lastList = sortInObjectOptions(lastList, ['spo'], 'down')
    if (spacialPokemons.probabilityLastList.includes(lastList[0].pokeId) && (Math.random() < 0.8)) {
      lastList = sortInObjectOptions(lastList.filter(item => item.pokeId !== lastList[0].pokeId), ['spo'], 'down')
    }
    const lastMostSpo = lastList[0].spo
    lastList = lastList.filter(item => item.spo === lastMostSpo)
    if (lastList.length > 0) {
      lastList = sortInObjectOptions(lastList, ['unLockLevel', 'spoId'], 'up')
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
  const useOptionsCurSpo = Math.floor(score / 38000)
  let targetPokemonAllSleep = []
  // console.log(isSleepOnStomach)
  if (useIncensePokemonId || get('isUseTicket', extraSleepStyleOptions)) {
    // 获取当前地图所有睡姿
    targetPokemonAllSleep = getUnLockSleeps(
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
  if (get('isUseTicket', extraSleepStyleOptions)) {
    let ticketSleeps = [...targetPokemonAllSleep].filter(
      item => !extraSleepStyleOptions.banPokes.includes(+item.pokeId) && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
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
      ticketSleeps = ticketSleeps.filter(
        item => !isGetPokes.includes(+item.pokeId)
      )
    }

    //当剩余的 SPO 小于 2 时(即小于可用的睡姿的 SPO 时)，将固定抽出 SPO 值最小，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
    if (useOptionsCurSpo < 2) {
      res.push({
        ...spoZeroPoke,
        isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp),
        isUseTicket: true,
        extra: `+${extraSleepStyleOptions.extraTextTicket}`
        // extra: 'SPO<2' //debug
      })
    } else {
      const resList = ticketSleeps.filter(sitem => sitem.spo <= useOptionsCurSpo)
      if (resList.length > 0) {
        res.push({
          ...resList[parseInt(
            Math.floor(Math.random() * resList.length),
            10
          )],
          isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp),
          isUseTicket: true,
          extra: `+${extraSleepStyleOptions.extraTextTicket}`
        })
      } else {
        // 否则最低spo睡姿
        res.push({
          ...spoZeroPoke,
          isShiny: getShinyPoke(extraSleepStyleOptions.shinyUp),
          isUseTicket: true,
          extra: `+${extraSleepStyleOptions.extraTextTicket}`
        })
      }
    }
  }

  return res
  // console.log(
  //   mapData.name,
  //   levelList[curStageIndex].name,
  //   3000000,
  //   `剩余SPO:${curSpo}`,
  //   SLEEP_TYPES[curUnLockSleepType],
  //   `${getNumberInMap(score, mapData.scoreList)}只`
  // )
  // console.log('res', res)
}

// x次期望分析
export function getRandomHope(mapData, curUnLockSleepType, score, curStageIndex, getTimes, extraSleepStyleOptions, callback) {
  getTimes = getTimes || 4000
  let orgList = []
  const lastGetList = []
  for (let i = 0; i < getTimes; i++) {
    const curGetRes = getRandomSleepStyle(
      mapData,
      curUnLockSleepType,
      score,
      curStageIndex,
      extraSleepStyleOptions
    )
    orgList = [
      ...orgList,
      ...curGetRes
    ]
    if (!lastGetList.includes(curGetRes[curGetRes.length - 1].id)) {
      lastGetList.push(curGetRes[curGetRes.length - 1].id)
    }
  }
  const mergeRes = []
  orgList.forEach(item => {
    const findTargetResItem = mergeRes.find(
      resItem => resItem.id === item.id
    )
    if (!findTargetResItem) {
      delete item.isShiny
      mergeRes.push({
        ...item,
        count: 1
      })
    } else {
      findTargetResItem.count++
    }
  })
  let res = []
  // 合并同个pokemon的数据
  mergeRes.forEach(item => {
    const findTargetResItem = res.find(
      resItem => resItem.pokeId === item.pokeId
    )
    if (!findTargetResItem) {
      res.push({
        pokeId: item.pokeId,
        list: [item],
        count: item.count,
        shardsSum: item.count * item.shards,
        expSum: item.count * item.exp,
        candysSum: item.count * item.candys
      })
    } else {
      // console.log(res)
      findTargetResItem.list.push(item)
      findTargetResItem.count += item.count
      findTargetResItem.shardsSum += item.count * item.shards
      findTargetResItem.expSum += item.count * item.exp
      findTargetResItem.candysSum += item.count * item.candys
    }
  })
  res.forEach(item => {
    item.list = sortInObjectOptions(item.list, ['count'], 'down')
  })
  res = sortInObjectOptions(res, ['count', 'pokeId'], 'down')

  if (callback) {
    callback(res)
  }

  return {
    lastGetList,
    res
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

export function getSPOById(sleepStyleId) {
  if (sleepStyleId && SPO_DATA[sleepStyleId] && SPO_DATA[sleepStyleId].spo_n) {
    return SPONEW_TO_SPOOLD[SPO_DATA[sleepStyleId].spo_n] // 转换最新的spo_n对应数值
  } else if (SPO_DATA[sleepStyleId] && SPO_DATA[sleepStyleId].spo) {
    return SPO_DATA[sleepStyleId].spo
  }
}

export function checkListInLastGet(mapData, curUnLockSleepType, curStageIndex, dataList, canUseSPO, lastSPO) {
  const isLastGetArr = new Array(dataList.length).fill(false)
  let isSleepOnStomach = false

  let orgSleepList = getUnLockSleeps(
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
      const curSpo = canUseSPO - (canUseSPO - lastSPO - getSPOById(sleepStyleId))
      let lastPokemon = spoZeroPoke
      // 保底计算
      if (curSpo >= 2) {
        let lastList = orgSleepList.filter(
          item =>
            !spacialPokemons.noLastList.includes(item.pokeId) && // 去除特殊宝可梦保底
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