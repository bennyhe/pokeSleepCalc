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
  nature: 'normal'
})
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
const getRes = () => {
  // 最后一级处理
  if (candyCalcForm.value.fromLevel === 54) {
    candyCalcForm.value.toLevel = 55
  }
  const exp = getExp(
    candyCalcForm.value.fromLevel,
    candyCalcForm.value.toLevel
  )
  const candys = Math.ceil(
    exp / NATURE_ONE_CANDY_EXP[candyCalcForm.value.nature]
  )
  let shards = 0
  if (candyCalcForm.value.toLevel - candyCalcForm.value.fromLevel > 0) {
    let carryNextLevelExp = 0
    for (
      let i = candyCalcForm.value.fromLevel;
      i < candyCalcForm.value.toLevel;
      i++
    ) {
      const needExp = getExp(i, i + 1) - carryNextLevelExp
      const useCandyNumCurLevel = Math.ceil(
        needExp / NATURE_ONE_CANDY_EXP[candyCalcForm.value.nature]
      )
      carryNextLevelExp =
        useCandyNumCurLevel * NATURE_ONE_CANDY_EXP[candyCalcForm.value.nature] -
        needExp
      shards += SHARDS_CANDY[i] * useCandyNumCurLevel
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