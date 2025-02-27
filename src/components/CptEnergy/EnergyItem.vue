<script setup>
import { defineProps, computed, ref } from 'vue'
import CptPoke from '../CptPoke/ItemIndex.vue'
import CptDialog from '../Dialog/index.vue'
import SvgIcon from '../SvgIcon/IconItem.vue'
import {
  skillOptionsExtra,
  skillOptionsHelpSpeed,
  skillOptionsFoodPer,
  skillOptionsSkillPer,
  skillOptionsExtra2,
  skillOptionsMaxcarry,
  skillOptionsSkillLevel,
  characterOptions,
  skillOptionsTxt
} from '../../config/helpSpeed.js'
import { getNum, toHMInLang } from '../../utils/index.js'
import { getNatureDetail } from '../../utils/energy.js'
import { pokedex } from '../../config/pokedex.js'

import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const localeLangId = computed(() => {
  return locale.value
})

const props = defineProps({
  pokeKey: {
    type: [String, Number]
  },
  pokeItem: {
    type: [Object]
  },
  showKey: {
    type: Array
  },
  isHightLightBerry: {
    type: [Boolean],
    default: false
  },
  showAfterBonusInfo: {
    type: [Boolean],
    default: false
  },
  pokeItemAfterBonus: {
    type: [Object]
  },
  editPokeData: {
    type: Object
  },
  isEdit: {
    type: [Boolean],
    default: false
  },
  closeDialogCB: {
    type: Function
  }
})

const editData = ref({})
const isShowDialog = ref(false)
const dialogId = ref(false)

const handleClickEdit = () => {
  editData.value = props.editPokeData
  isShowDialog.value = true
  dialogId.value = `energyitem_${Math.random()}`
}
const handleBlurLevel = () => {
  if (!editData.value.level) {
    editData.value.level = 10
  }
}
</script>

<template>
  <div class="poke-tb__item">
    <p>
      <i class="i i-rank" :class="`i-rank--${pokeKey + 1}`">{{
        pokeKey + 1
      }}</i>
    </p>
    <CptPoke
      :pokeId="props.pokeItem.id"
      :helpSpeed="props.pokeItem.helpSpeed"
      :foodPer="props.pokeItem.foodPer"
      :skillPer="props.pokeItem.skillPer"
      :maxcarry="props.pokeItem.maxcarry"
      :showKey="props.showKey"
      :isHightLightBerry="props.isHightLightBerry"
      :isShiny="props.pokeItem.isShiny"
    />
    <div v-if="props.pokeItem.useFoods && props.pokeItem.useFoods.length > 0">
      <div class="cpt-food all-food">
        <div
          class="cpt-food__item cur"
          v-for="(foodItem, foodKey) in props.pokeItem.useFoods"
          v-bind:key="`${foodKey}_${foodItem}`"
        >
          <img
            v-lazy="`./img/food/${foodItem}.png`"
            :alt="$t(`FOOD_TYPES.${foodItem}`)"
          />
          <p class="cpt-food__count">
            {{ props.pokeItem.food.count[foodItem].num[foodKey] }}
          </p>
        </div>
      </div>
    </div>
    <div class="poke-tb__energy">
      <p
        class="cpt-skill"
        :class="{
          'cpt-skill--3': props.pokeItem.nameExtra.indexOf('S') > -1,
        }"
      >
        {{ props.pokeItem.nameExtra }}
      </p>
      <p class="cpt-pokemon__poketype1 xs">
        果{{ getNum(props.pokeItem.oneDayBerryEnergy) }}
      </p>
      <p class="cpt-pokemon__poketype2 xs">
        食{{ getNum(props.pokeItem.oneDayFoodEnergy.allEnergy) }}
      </p>
      <p class="cpt-pokemon__poketype3 xs">
        技{{ getNum(props.pokeItem.oneDayHelpCount.skill) }}次
      </p>
      <div
        v-if="
          props.pokeItem.oneDayFoodEnergy.useFoods &&
          props.pokeItem.oneDayFoodEnergy.useFoods.length > 0
        "
      >
        <div class="cpt-food cpt-food--s all-food cpt-food--energy">
          <div
            class="cpt-food__item cur"
            v-for="(foodItem, foodKey) in props.pokeItem.oneDayFoodEnergy
              .useFoods"
            v-bind:key="foodKey"
          >
            <img
              v-lazy="`./img/food/${foodItem}.png`"
              :alt="$t(`FOOD_TYPES.${foodItem}`)"
            />
            <p class="cpt-food__count">
              {{ props.pokeItem.oneDayFoodEnergy.count[foodKey] }}
            </p>
          </div>
        </div>
      </div>
      <p class="res">
        <img class="icon" v-lazy="`./img/ui/energy.png`" />{{
          getNum(props.pokeItem.oneDayEnergy)
        }}
      </p>
    </div>
    <p class="spscore" v-if="props.pokeItem.level">
      Lv.{{ props.pokeItem.level }}
    </p>
    <pre
      v-if="props.pokeItem.extraDesc"
      class="sptime extra-desc"
      v-html="props.pokeItem.extraDesc"
    ></pre>
    <div class="other-skill" v-if="props.pokeItem.skill">
      <template
        v-for="skillItem in skillOptionsExtra"
        v-bind:key="skillItem.label"
      >
        <span
          v-if="props.pokeItem.skill.includes(skillItem.label)"
          class="cpt-skill"
          :class="`cpt-skill--3`"
          >{{ $t(`${skillItem.txt}`) }}</span
        >
      </template>
      <template
        v-for="skillItem in skillOptionsHelpSpeed"
        v-bind:key="skillItem.label"
      >
        <span
          v-if="props.pokeItem.skill.includes(skillItem.label)"
          class="cpt-skill"
          :class="`cpt-skill--${skillItem.rare}`"
          >{{ $t(`${skillItem.txt}`) }}</span
        >
      </template>
      <template
        v-for="skillItem in skillOptionsFoodPer"
        v-bind:key="skillItem.label"
      >
        <span
          v-if="props.pokeItem.skill.includes(skillItem.label)"
          class="cpt-skill"
          :class="`cpt-skill--${skillItem.rare}`"
          >{{ $t(`${skillItem.txt}`) }}</span
        >
      </template>
      <template
        v-for="skillItem in skillOptionsSkillPer"
        v-bind:key="skillItem.label"
      >
        <span
          v-if="props.pokeItem.skill.includes(skillItem.label)"
          class="cpt-skill"
          :class="`cpt-skill--${skillItem.rare}`"
          >{{ $t(`${skillItem.txt}`) }}</span
        >
      </template>
      <template
        v-for="skillItem in skillOptionsMaxcarry"
        v-bind:key="skillItem.label"
      >
        <span
          v-if="props.pokeItem.skill.includes(skillItem.label)"
          class="cpt-skill"
          :class="`cpt-skill--${skillItem.rare}`"
          >{{ $t(`${skillItem.txt}`) }}</span
        >
      </template>
      <template
        v-for="skillItem in skillOptionsSkillLevel"
        v-bind:key="skillItem.label"
      >
        <span
          v-if="props.pokeItem.skill.includes(skillItem.label)"
          class="cpt-skill"
          :class="`cpt-skill--${skillItem.rare}`"
          >{{ $t(`${skillItem.txt}`) }}</span
        >
      </template>
    </div>
    <div v-if="showAfterBonusInfo">
      <div
        class="cpt-pokemon cpt-pokemon--l"
        style="
          min-height: auto;
          border-top: 2px dashed #d1813a;
          margin-top: 6px;
          padding-top: 6px;
        "
      >
        <p>{{ pokeItemAfterBonus.helpSpeed }}s</p>
        <p class="cpt-pokemon__hshm">
          {{ toHMInLang(pokeItemAfterBonus.helpSpeed, "sec", localeLangId) }}
        </p>
      </div>
      <div class="poke-tb__energy">
        <p class="cpt-pokemon__poketype1 xs">
          果{{ getNum(pokeItemAfterBonus.oneDayBerryEnergy) }}
        </p>
        <p class="cpt-pokemon__poketype2 xs">
          食{{ getNum(pokeItemAfterBonus.oneDayFoodEnergy.allEnergy) }}
        </p>
        <p class="cpt-pokemon__poketype3 xs">
          技{{ getNum(pokeItemAfterBonus.oneDayHelpCount.skill) }}次
        </p>
        <div
          v-if="
            pokeItemAfterBonus.oneDayFoodEnergy.useFoods &&
            pokeItemAfterBonus.oneDayFoodEnergy.useFoods.length > 0
          "
        >
          <div class="cpt-food cpt-food--s all-food cpt-food--energy">
            <div
              class="cpt-food__item cur"
              v-for="(foodItem, foodKey) in pokeItemAfterBonus.oneDayFoodEnergy
                .useFoods"
              v-bind:key="foodKey"
            >
              <img
                v-lazy="`./img/food/${foodItem}.png`"
                :alt="$t(`FOOD_TYPES.${foodItem}`)"
              />
              <p class="cpt-food__count">
                {{ pokeItemAfterBonus.oneDayFoodEnergy.count[foodKey] }}
              </p>
            </div>
          </div>
          <p class="res">
            <img class="icon" v-lazy="`./img/ui/energy.png`" />{{
              getNum(pokeItemAfterBonus.oneDayEnergy)
            }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="props.isEdit" class="mb3" style="margin-top: 6px">
      <el-button size="small" @click="handleClickEdit()" type="primary" plain
        ><SvgIcon type="edits" />编辑</el-button
      >
    </div>
    <!-- S 修改个体弹窗 -->
    <CptDialog
      :isShow="isShowDialog"
      v-bind:key="dialogId"
      :closeCallBack="props.closeDialogCB"
    >
      <div class="page-helpcalc el-form" v-if="editData && editData.pokemonId">
        <h3>
          编辑<span v-if="editData.isShiny" class="sptime">{{
            $t("PROP.shiny")
          }}</span>
          {{ $t(`POKEMON_NAME.${editData.pokemonId}`) }}
        </h3>
        <div v-if="pokedex[editData.pokemonId].food">
          <div
            class="cpt-food cpt-food--noborder"
            v-for="(subFoodItem, subKey) in 3"
            v-bind:key="subKey"
          >
            <el-radio-group size="small" v-model="editData.useFoods[subKey]">
              <template
                v-for="(allFoodItem, allKey) in pokedex[editData.pokemonId].food
                  .type"
                v-bind:key="'2_' + allKey"
              >
                <el-radio-button
                  :label="allKey"
                  v-if="
                    pokedex[editData.pokemonId].food.count[allFoodItem].num[
                      subKey
                    ] > 0
                  "
                  style="--el-radio-button-checked-bg-color: #c2e4ff"
                >
                  <div class="cpt-food__item">
                    <img
                      v-lazy="`./img/food/${allFoodItem}.png`"
                      :alt="$t(`FOOD_TYPES.${allFoodItem}`)"
                    />
                    <div
                      class="cpt-food__count"
                      v-if="
                        pokedex[editData.pokemonId].food.count[allFoodItem].num[
                          subKey
                        ] > 0
                      "
                    >
                      {{
                        pokedex[editData.pokemonId].food.count[allFoodItem].num[
                          subKey
                        ]
                      }}
                    </div>
                  </div>
                </el-radio-button>
              </template>
            </el-radio-group>
          </div>
        </div>
        <h4>当前等级(Lv.10-60)</h4>
        <div>
          <el-input-number
            v-model="editData.level"
            :min="10"
            :max="60"
            @blur="handleBlurLevel"
          />
        </div>
        <div style="display: flex">
          <el-checkbox-group v-model="editData.skill" :min="0" :max="5">
            <el-checkbox
              :label="skillItem.label"
              v-for="skillItem in skillOptionsExtra2"
              v-bind:key="skillItem.label"
            >
              <span class="cpt-skill cpt-skill--3">{{
                $t(skillItem.txt)
              }}</span>
            </el-checkbox>
          </el-checkbox-group>
          <div style="margin-top: 3px; margin-left: 12px">
            <el-checkbox v-model="editData.isShiny">
              {{ $t("PROP.shiny") }}
            </el-checkbox>
          </div>
        </div>
        <h4>{{ $t(skillOptionsHelpSpeed[0].txt).replace("S", "") }}</h4>
        <div>
          <div style="width: 100%">
            <el-checkbox-group
              class="el-checkbox-group--inline"
              v-model="editData.skill"
              :min="0"
              :max="5"
            >
              <el-checkbox-button
                :label="skillItem.label"
                v-for="skillItem in skillOptionsHelpSpeed"
                v-bind:key="skillItem.label"
                ><span class="cpt-skill" :class="`cpt-skill--${skillItem.rare}`"
                  >{{ skillItem.txtExtra.indexOf("7") > -1 ? "S" : "M"
                  }}{{ skillItem.txtExtra }}</span
                ></el-checkbox-button
              >
            </el-checkbox-group>
          </div>
        </div>
        <h4>{{ $t(skillOptionsFoodPer[0].txt).replace("S", "") }}</h4>
        <div>
          <div style="width: 100%">
            <el-checkbox-group
              class="el-checkbox-group--inline"
              v-model="editData.skill"
              :min="0"
              :max="5"
            >
              <el-checkbox-button
                :label="skillItem.label"
                v-for="(skillItem, skillKey) in skillOptionsFoodPer"
                v-bind:key="skillItem.label"
                ><span class="cpt-skill" :class="`cpt-skill--${skillItem.rare}`"
                  >{{ skillOptionsTxt[skillKey] }}{{ skillItem.txtExtra }}</span
                ></el-checkbox-button
              >
            </el-checkbox-group>
          </div>
        </div>
        <h4>{{ $t(skillOptionsSkillPer[0].txt).replace("S", "") }}</h4>
        <div>
          <div style="width: 100%">
            <el-checkbox-group
              class="el-checkbox-group--inline"
              v-model="editData.skill"
              :min="0"
              :max="5"
            >
              <el-checkbox-button
                :label="skillItem.label"
                v-for="(skillItem, skillKey) in skillOptionsSkillPer"
                v-bind:key="skillItem.label"
                ><span class="cpt-skill" :class="`cpt-skill--${skillItem.rare}`"
                  >{{ skillOptionsTxt[skillKey] }}{{ skillItem.txtExtra }}</span
                ></el-checkbox-button
              >
            </el-checkbox-group>
          </div>
        </div>
        <h4>{{ $t(skillOptionsMaxcarry[0].txt).replace("S", "") }}</h4>
        <div>
          <div style="width: 100%">
            <el-checkbox-group
              class="el-checkbox-group--inline"
              v-model="editData.skill"
              :min="0"
              :max="5"
            >
              <el-checkbox-button
                :label="skillItem.label"
                v-for="(skillItem, skillKey) in skillOptionsMaxcarry"
                v-bind:key="skillItem.label"
                ><span class="cpt-skill" :class="`cpt-skill--${skillItem.rare}`"
                  >{{ skillOptionsTxt[skillKey] }}{{ skillItem.txtExtra }}</span
                ></el-checkbox-button
              >
            </el-checkbox-group>
          </div>
        </div>
        <h4>{{ $t(skillOptionsSkillLevel[0].txt).replace("S", "") }}</h4>
        <div>
          <div style="width: 100%">
            <el-checkbox-group
              class="el-checkbox-group--inline"
              v-model="editData.skill"
              :min="0"
              :max="5"
            >
              <el-checkbox-button
                :label="skillItem.label"
                v-for="(skillItem, skillKey) in skillOptionsSkillLevel"
                v-bind:key="skillItem.label"
                ><span class="cpt-skill" :class="`cpt-skill--${skillItem.rare}`"
                  >{{ skillOptionsTxt[skillKey] }}{{ skillItem.txtExtra }}</span
                ></el-checkbox-button
              >
            </el-checkbox-group>
          </div>
        </div>
        <h4 v-if="pokedex[editData.pokemonId].evoLineKey > 0">进化次数</h4>
        <div v-if="pokedex[editData.pokemonId].evoLineKey > 0">
          <el-radio-group size="small" v-model="editData.evoTimes">
            <el-radio-button
              :label="skillItem"
              v-for="skillItem in [0, 1, 2]"
              v-bind:key="skillItem.label"
              >{{ skillItem }}</el-radio-button
            >
          </el-radio-group>
        </div>
        <h4>{{ $t(skillOptionsExtra[0].txt) }}</h4>
        <div>
          <div style="width: 100%">
            <el-checkbox-group
              class="el-checkbox-group--inline"
              v-model="editData.skill"
              :min="0"
              :max="5"
            >
              <el-checkbox-button
                :label="skillItem.label"
                v-for="skillItem in skillOptionsExtra"
                v-bind:key="skillItem.label"
                ><span class="cpt-skill cpt-skill--3">{{
                  skillItem.txtExtra
                }}</span></el-checkbox-button
              >
            </el-checkbox-group>
          </div>
          <div class="cpt-tips">* {{ $t("PAGE_HELPSPEEDCALC.tipsHS") }}</div>
        </div>
        <h4>{{ $t("PROP.nature") }}</h4>
        <div>
          <el-select filterable v-model="editData.character">
            <el-option
              :label="getNatureDetail(cItem, $t)"
              v-for="cItem in characterOptions"
              v-bind:key="cItem.label"
              :class="{ vigour: cItem.txt.indexOf('帮↓') > -1 }"
              :value="cItem.label"
            >
              {{ getNatureDetail(cItem, $t) }}</el-option
            >
          </el-select>
        </div>
      </div>
    </CptDialog>
    <!-- E 修改个体弹窗 -->
    <slot />
  </div>
</template>