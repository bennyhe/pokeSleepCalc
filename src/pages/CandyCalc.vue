<script setup>
import { ref } from 'vue'
import {
  LEVEL_EXP,
  NATURE_ONE_CANDY_EXP,
  POKEMON_TYPE,
  levelOptions,
  SHARDS_CANDY
} from '../config/candyCalc.js'
import { getNum } from '../utils/index.js'

const candyCalcForm = ref({
  pType: 1,
  fromLevel: 1,
  toLevel: 30,
  nature: 'normal',
  actUp: 'minicandy'
})
const actType = {
  minicandy: {
    useShards: 4,
    useExps: 2
  }
}
const levelOptionsTo = JSON.parse(JSON.stringify(levelOptions))
levelOptionsTo.splice(levelOptionsTo.length - 1, 1)
levelOptionsTo.push({
  label: 55,
  txt: 'Lv.55'
})
const getExp = (fromLevel, toLevel) => {
  const fromExp = Math.round(
    LEVEL_EXP[fromLevel - 1] * candyCalcForm.value.pType
  )
  const toExp = Math.round(LEVEL_EXP[toLevel - 1] * candyCalcForm.value.pType)
  const exp = toExp - fromExp
  return exp
}
const getOnceCandyExp = nature => {
  if (actType[candyCalcForm.value.actUp]) {
    return (
      NATURE_ONE_CANDY_EXP[nature] * actType[candyCalcForm.value.actUp].useExps
    )
  }
  return NATURE_ONE_CANDY_EXP[nature]
}
const getOnceShards = (i, useCandyNumCurLevel) => {
  if (actType[candyCalcForm.value.actUp]) {
    return (
      SHARDS_CANDY[i] *
      useCandyNumCurLevel *
      actType[candyCalcForm.value.actUp].useShards
    )
  }
  return SHARDS_CANDY[i] * useCandyNumCurLevel
}
const getRes = (fromLevel, toLevel, nature) => {
  fromLevel = fromLevel || candyCalcForm.value.fromLevel
  toLevel = toLevel || candyCalcForm.value.toLevel
  nature = nature || candyCalcForm.value.nature
  // 最后一级处理
  if (fromLevel === 54) {
    toLevel = 55
  }
  const exp = getExp(fromLevel, toLevel)
  const candys = Math.ceil(exp / getOnceCandyExp(nature))
  let shards = 0
  if (toLevel - fromLevel > 0) {
    let carryNextLevelExp = 0
    for (let i = fromLevel; i < toLevel; i++) {
      const needExp = getExp(i, i + 1) - carryNextLevelExp
      const useCandyNumCurLevel = Math.ceil(needExp / getOnceCandyExp(nature))
      carryNextLevelExp =
        useCandyNumCurLevel * getOnceCandyExp(nature) - needExp
      shards += getOnceShards(i, useCandyNumCurLevel)
    }
  }
  return {
    exp,
    shards,
    candys
  }
}
</script>

<template>
  <h2>升级经验糖果计算</h2>
  <el-form label-width="90px">
    <el-form-item label="类型">
      <el-radio-group size="small" v-model="candyCalcForm.pType">
        <el-radio-button
          class="radiogroup--level"
          :label="cItem.value"
          v-for="cItem in POKEMON_TYPE"
          v-bind:key="cItem.value"
        >
          <span
            class="cpt-avatar"
            v-for="pokeItem in cItem.sampleIds"
            v-bind:key="pokeItem"
          >
            <img
              class="cpt-avatar__pic"
              v-lazy="`./img/pokedex/${pokeItem}.png`"
              :alt="$t(`POKEMON_NAME.${pokeItem}`)"
            /> </span
          >{{ cItem.txt }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('NATURE_UPDOWN.EXP獲得量')">
      <el-radio-group v-model="candyCalcForm.nature">
        <el-radio-button class="radiogroup--level" :label="'down'">
          <span class="nature-down">▽▽</span>
        </el-radio-button>
        <el-radio-button class="radiogroup--level" :label="'normal'">
          -
        </el-radio-button>
        <el-radio-button class="radiogroup--level" :label="'up'">
          <span class="nature-up">△△</span>
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动加成">
      <el-radio-group v-model="candyCalcForm.actUp">
        <el-radio-button class="radiogroup--level" :label="'none'">
          -
        </el-radio-button>
        <el-radio-button class="radiogroup--level" :label="'minicandy'">
          迷你糖果增强(Exp2倍,梦碎4倍)
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="当前等级(Lv.1-54)">
      <el-slider
        v-model="candyCalcForm.fromLevel"
        show-input
        :min="1"
        :max="54"
      />
      <div style="width: 100%">
        <el-radio-group v-model="candyCalcForm.fromLevel" size="small">
          <el-radio-button
            class="radiogroup--level"
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
        candyCalcForm.fromLevel + 1 < 55
          ? `(Lv.${candyCalcForm.fromLevel + 1}-55)`
          : ''
      }`"
    >
      <el-slider
        v-if="candyCalcForm.fromLevel + 1 < 55"
        v-model="candyCalcForm.toLevel"
        show-input
        :min="candyCalcForm.fromLevel + 1"
        :max="55"
      />
      <template v-else>Lv.55</template>
      <div style="width: 100%">
        <el-radio-group v-model="candyCalcForm.toLevel" size="small">
          <template v-for="cItem in levelOptionsTo" v-bind:key="cItem.label">
            <el-radio-button
              :disabled="candyCalcForm.fromLevel + 1 > cItem.label"
              class="radiogroup--level"
              :label="cItem.label"
              >{{ cItem.txt }}</el-radio-button
            >
          </template>
        </el-radio-group>
      </div>
    </el-form-item>
    <el-form-item label="计算结果">
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