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
                spo: SPO_DATA[sItem].spo_n ? SPONEW_TO_SPOOLD[SPO_DATA[sItem].spo_n] : SPO_DATA[sItem].spo, // 转换最新的spo_n对应数值
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
            spo: SPO_DATA[sItem].spo_n ? SPONEW_TO_SPOOLD[SPO_DATA[sItem].spo_n] : SPO_DATA[sItem].spo, // 转换最新的spo_n对应数值
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


const getShinyPoke = () => {
  return parseInt(Math.floor(Math.random() * 140), 10) === 44
}
export function getRandomSleepStyle(mapData, curUnLockSleepType, score, curStageIndex, extraSleepStyleOptions) {
  extraSleepStyleOptions = extraSleepStyleOptions || {
    banPokes: [],
    useIncensePokemonId: '',
    isUseTicket: false
  }
  const res = []
  const spacialPokemons = {
    list: [243], // 特殊宝可梦列表，不进保底，只能一个
    isGet: {
      243: false
    }
  }
  const useIncensePokemonId = get('useIncensePokemonId', extraSleepStyleOptions)

  let cathPokeCount = getNumberInMap(
    score,
    mapData.scoreList
  )
  let curSpo = Math.floor(score / 38000)
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
  // 使用熏香
  if (spacialPokemons.list.includes(useIncensePokemonId)) {
    // 如果存在ban的宝可梦列表则合并
    if (get('banPokes', extraSleepStyleOptions, 1)) {
      extraSleepStyleOptions.banPokes.push(+useIncensePokemonId)
    } else {
      extraSleepStyleOptions.banPokes = [+useIncensePokemonId]
    }
    console.log('使用该熏香', useIncensePokemonId, extraSleepStyleOptions.banPokes)
  }
  // 如果存在去除宝可梦
  if (get('banPokes', extraSleepStyleOptions, 1)) {
    orgSleepList = orgSleepList.filter(
      item => !extraSleepStyleOptions.banPokes.includes(+item.pokeId)
    )
  }
  // 随机洗牌，如果10倍长度少于1000，则默认1000次
  orgSleepList = getRandomArr(
    orgSleepList,
    orgSleepList.length * 10 < 1000 ? 1000 : orgSleepList.length * 10
  )

  // SPO 值最小，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
  const spoZeroPoke = sortInObjectOptions(
    orgSleepList,
    ['spo', 'unLockLevel', 'spoId'],
    'up'
  )[0]
  // console.log(`等级解锁睡姿——${orgSleepList.length}个`, orgSleepList)

  let isSleepOnStomach = false

  while (cathPokeCount > 1) {
    let sleepList = orgSleepList.filter(
      item =>
        item.spo <= curSpo && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
    )
    sleepList = getRandomArr(sleepList, sleepList.length * 10)
    //当剩余的 SPO 小于 2 时(即小于可用的睡姿的 SPO 时)，将固定抽出 SPO 值最小，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
    if (curSpo < 2) {
      res.push({
        ...spoZeroPoke,
        isShiny: getShinyPoke()
        // extra: 'SPO<2' //debug
      })
      curSpo = 1
    } else {
      const rdmIndex = parseInt(
        Math.floor(Math.random() * sleepList.length),
        10
      )
      const rdmRes = sleepList[rdmIndex]
      // 大肚子睡只能1次
      if (rdmRes.sleepNameId && rdmRes.sleepNameId === 4) {
        isSleepOnStomach = true
      }
      // console.log(sleepList[rdmIndex])
      res.push({
        ...rdmRes,
        isShiny: getShinyPoke()
      })
      curSpo -= sleepList[rdmIndex].spo
      if (curSpo < 2) {
        curSpo = 1
      }
    }
    // console.log(curSpo)
    cathPokeCount--
  }
  //当抽取到最后一个睡姿的时候，将根据剩余的 SPO 固定抽出最后一个 SPO 最大，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
  if (curSpo < 2) {
    res.push({
      ...spoZeroPoke,
      isShiny: getShinyPoke()
    })
  } else {
    let lastList = orgSleepList.filter(
      item =>
        !spacialPokemons.list.includes(item.pokeId) && // 去除雷公保底
        item.spo <= curSpo && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
    )
    lastList = sortInObjectOptions(lastList, ['spo'], 'down')
    const lastMostSpo = lastList[0].spo
    lastList = lastList.filter(item => item.spo === lastMostSpo)
    if (lastList.length > 0) {
      lastList = sortInObjectOptions(lastList, ['unLockLevel', 'spoId'], 'up')
    }
    res.push({
      ...lastList[0],
      isShiny: getShinyPoke()
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
      res.push({
        ...resList[parseInt(
          Math.floor(Math.random() * resList.length),
          10
        )],
        isShiny: getShinyPoke(),
        extra: '熏香'
      })
    } else {
      // 否则最低spo睡姿
      res.push({
        ...incensePokemonSleeps[0],
        isShiny: getShinyPoke(),
        extra: '熏香'
      })
    }
  }

  // 使用露营券
  if (get('isUseTicket', extraSleepStyleOptions)) {
    let ticketSleeps = [...targetPokemonAllSleep].filter(
      item => !extraSleepStyleOptions.banPokes.includes(+item.pokeId)
    )
    
    // 睡眠类型图鉴筛选
    if (+curUnLockSleepType !== 999) {
      ticketSleeps = ticketSleeps.filter(
        item => item.sleepType === +curUnLockSleepType
      )
    }
    //当剩余的 SPO 小于 2 时(即小于可用的睡姿的 SPO 时)，将固定抽出 SPO 值最小，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
    if (useOptionsCurSpo < 2) {
      res.push({
        ...spoZeroPoke,
        isShiny: getShinyPoke(),
        extra: '+奖励'
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
          isShiny: getShinyPoke(),
          extra: '+奖励'
        })
      } else {
        // 否则最低spo睡姿
        res.push({
          ...spoZeroPoke,
          isShiny: getShinyPoke(),
          extra: '+奖励'
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
export function getRandomHope(mapData, curUnLockSleepType, score, curStageIndex, getTimes, banPokes, callback) {
  getTimes = getTimes || 4000
  let orgList = []
  for (let i = 0; i < getTimes; i++) {
    orgList = orgList.concat(
      getRandomSleepStyle(
        mapData,
        curUnLockSleepType,
        score,
        curStageIndex,
        {
          banPokes
        }
      )
    )
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

  return res
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