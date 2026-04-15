<script setup>
import { ref } from 'vue'
import CptAvatar from '../components/CptAvatar/ItemIndex.vue'
import {
  LEVEL_EXP,
  NATURE_ONE_CANDY_EXP,
  POKEMON_TYPE,
  levelOptions,
  SHARDS_CANDY
} from '../config/candyCalc.js'
import { POKEMON_MAX_LEVEL } from '../config/game.js'

import { getNum } from '../utils/index.js'

const candyCalcForm = ref({
  pType: 1,
  fromLevel: 1,
  toLevel: 30,
  nature: 'normal',
  actUp: 'none',
  useShards: 1,
  useExps: 1,
  levelUpExp: 0
})
const actType = {
  none: {
    useShards: 1,
    useExps: 1
  },
  candyup: {
    useShards: 5,
    useExps: 2
  },
  minicandyup: {
    useShards: 4,
    useExps: 2
  }
}
const levelOptionsTo = JSON.parse(JSON.stringify(levelOptions))
levelOptionsTo.splice(0, 1)
levelOptionsTo.splice(levelOptionsTo.length - 1, 1)
levelOptionsTo.push(
  {
    label: 60,
    txt: 'Lv.60'
  },
  {
    label: 65,
    txt: 'Lv.65'
  }
)

/**
 * 根据目标等级确定基础经验值
 */
const getCandyBaseExp = targetLevel => {
  if (targetLevel <= 25) return NATURE_ONE_CANDY_EXP.lv25 // 1-25级
  if (targetLevel <= 30) return NATURE_ONE_CANDY_EXP.lv30 // 25-30级
  return NATURE_ONE_CANDY_EXP.normal // 30-65级
}

/**
 * 计算单个糖果实际提供的经验值
 * 性格倍率调整：up: 1.18, down: 0.82, normal: 1.00
 */
const getCandyExp = (targetLevel, nature) => {
  const baseExp = getCandyBaseExp(targetLevel)
  const natureMultiplier = { up: 1.18, down: 0.82, normal: 1.0 }[nature] || 1.0
  const singleCandyExp = Math.round(baseExp * natureMultiplier)
  return singleCandyExp * candyCalcForm.value.useExps
}

const getLevelExp = level => {
  return (
    Math.round(LEVEL_EXP[level] * candyCalcForm.value.pType) -
    Math.round(LEVEL_EXP[level - 1] * candyCalcForm.value.pType)
  )
}

/**
 * 计算总经验、糖果数、梦碎消耗
 */
const getRes = () => {
  const { fromLevel, toLevel, nature, levelUpExp, useShards } =
    candyCalcForm.value

  // 最后一级处理
  const actualToLevel =
    fromLevel >= POKEMON_MAX_LEVEL - 1 ? POKEMON_MAX_LEVEL : toLevel
  const actualFromLevel = Math.min(fromLevel, POKEMON_MAX_LEVEL - 1)

  if (actualToLevel <= actualFromLevel) {
    return { exp: 0, candys: 0, shards: 0 }
  }

  let totalExp = 0
  let candys = 0
  let shards = 0
  let carryNextLevelExp = 0

  for (let level = actualFromLevel; level < actualToLevel; level++) {
    const levelTotalExp = getLevelExp(level)
    totalExp += levelTotalExp

    let needExp
    if (level === actualFromLevel && levelUpExp > 0) {
      needExp = levelUpExp
      totalExp -= levelTotalExp - levelUpExp
    } else {
      needExp = levelTotalExp - carryNextLevelExp
    }

    const candyExp = getCandyExp(level + 1, nature)
    const useCandyNumCurLevel = Math.ceil(needExp / candyExp)
    candys += useCandyNumCurLevel

    carryNextLevelExp = useCandyNumCurLevel * candyExp - needExp
    shards += SHARDS_CANDY[level] * useCandyNumCurLevel * useShards
  }

  return {
    exp: totalExp,
    candys,
    shards
  }
}
const handleChangeActUp = () => {
  candyCalcForm.value.useExps = actType[candyCalcForm.value.actUp].useExps
  candyCalcForm.value.useShards = actType[candyCalcForm.value.actUp].useShards
}

console.log('init page candycalc...')
</script>

<template>
  <h2>升级经验糖果计算</h2>
  <el-form label-width="90px">
    <el-form-item label="类型">
      <el-radio-group size="small" v-model="candyCalcForm.pType">
        <el-radio-button
          class="radiogroup--primary radiogroup--level"
          :label="cItem.value"
          v-for="cItem in POKEMON_TYPE"
          v-bind:key="cItem.value"
        >
          <CptAvatar
            v-for="pokeItem in cItem.sampleIds"
            v-bind:key="pokeItem"
            :pokeId="pokeItem"
          />
          {{ cItem.txt }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('NATURE_UPDOWN.EXP獲得量')">
      <el-radio-group v-model="candyCalcForm.nature">
        <el-radio-button
          class="radiogroup--primary radiogroup--level"
          :label="'down'"
        >
          <span class="nature-down">▽▽</span>
        </el-radio-button>
        <el-radio-button
          class="radiogroup--primary radiogroup--level"
          :label="'normal'"
        >
          -
        </el-radio-button>
        <el-radio-button
          class="radiogroup--primary radiogroup--level"
          :label="'up'"
        >
          <span class="nature-up">△△</span>
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-radio-group
        v-model="candyCalcForm.actUp"
        size="small"
        @change="handleChangeActUp()"
      >
        <el-radio-button
          class="radiogroup--primary radiogroup--level"
          :label="'none'"
        >
          <span style="display: inline-block; width: 1.5em">-</span>
        </el-radio-button>
        <el-radio-button
          class="radiogroup--primary radiogroup--level"
          :label="'candyup'"
        >
          糖果增强
        </el-radio-button>
        <el-radio-button
          class="radiogroup--primary radiogroup--level"
          :label="'minicandyup'"
        >
          迷你糖果增强
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <div class="el-form-item__content">
    <div class="cpt-form-item-half-wrap el-form-slider--bonus">
      <div class="cpt-form-item-half">
        <div class="el-form-item__label">经验获取倍率</div>
        <el-slider
          size="small"
          v-model="candyCalcForm.useExps"
          show-input
          :min="1"
          :max="5"
        />
      </div>
      <div class="cpt-form-item-half">
        <div class="el-form-item__label">梦碎消耗倍率</div>
        <el-slider
          size="small"
          v-model="candyCalcForm.useShards"
          show-input
          :min="1"
          :max="10"
        />
      </div>
    </div>
  </div>
  <el-form label-width="90px">
    <el-form-item label="升级剩余EXP">
      <el-input
        v-model="candyCalcForm.levelUpExp"
        style="width: 240px"
        type="tel"
      />
    </el-form-item>
    <el-form-item :label="`当前等级(Lv.1-${POKEMON_MAX_LEVEL - 1})`">
      <el-slider
        v-model="candyCalcForm.fromLevel"
        show-input
        :min="1"
        :max="POKEMON_MAX_LEVEL - 1"
      />
      <div style="width: 100%">
        <el-radio-group v-model="candyCalcForm.fromLevel" size="small">
          <el-radio-button
            class="radiogroup--primary radiogroup--level"
            :label="cItem.label"
            v-for="cItem in levelOptions"
            v-bind:key="cItem.label"
            >{{ cItem.txt }}</el-radio-button
          >
        </el-radio-group>
      </div>
    </el-form-item>
    <el-form-item
      :label="`目标等级${
        candyCalcForm.fromLevel + 1 < POKEMON_MAX_LEVEL
          ? `(Lv.${candyCalcForm.fromLevel + 1}-${POKEMON_MAX_LEVEL})`
          : ''
      }`"
    >
      <el-slider
        v-if="candyCalcForm.fromLevel + 1 < POKEMON_MAX_LEVEL"
        v-model="candyCalcForm.toLevel"
        show-input
        :min="candyCalcForm.fromLevel + 1"
        :max="POKEMON_MAX_LEVEL"
      />
      <template v-else>Lv.{{ POKEMON_MAX_LEVEL }}</template>
      <div style="width: 100%">
        <el-radio-group v-model="candyCalcForm.toLevel" size="small">
          <template v-for="cItem in levelOptionsTo" v-bind:key="cItem.label">
            <el-radio-button
              :disabled="candyCalcForm.fromLevel + 1 > cItem.label"
              class="radiogroup--primary radiogroup--level"
              :label="cItem.label"
              >{{ cItem.txt }}</el-radio-button
            >
          </template>
        </el-radio-group>
      </div>
    </el-form-item>
    <el-form-item :label="$t('OPTIONS.calcRes')">
      <ul>
        <li>
          <img class="icon" v-lazy="`./img/ui/exp.png`" />
          <span class="sptime">{{ getNum(getRes().exp) }}</span>
        </li>
        <li>
          <img class="icon" v-lazy="`./img/ui/shards.png`" />
          <span class="sptime">{{ getNum(getRes().shards) }}</span>
        </li>
        <li>
          <img class="icon" v-lazy="`./img/ui/candy.png`" />
          <span class="sptime">{{ getNum(getRes().candys) }}</span>
        </li>
      </ul>
    </el-form-item>
  </el-form>
</template>