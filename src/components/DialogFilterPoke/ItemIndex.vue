<script setup>
import { computed, defineProps, ref } from 'vue'
import { ElMessage } from 'element-plus'
import CptDialog from '../Dialog/index.vue'
import SvgIcon from '../SvgIcon/IconItem.vue'
import {
  BERRY_TYPES,
  FOOD_TYPES,
  POKE_TYPES,
  SKILL_TYPES,
  SUBSKILLS_NAMES
} from '../../config/valKey.js'
import {
  allHelpType,
  characterOptions,
  skillOptionsExtra,
  skillOptionsExtra2,
  skillOptionsHelpSpeed,
  skillOptionsFoodPer,
  skillOptionsSkillPer,
  levelOptions
} from '../../config/helpSpeed.js'

const props = defineProps({
  showKey: {
    type: Array,
    default: () => {
      return ['isShiny', 'pokeType', 'berryType', 'foodType', 'mainSkill']
    }
  },
  filterObj: {
    type: Object
  },
  handleClickFilterPokes: {
    type: Function
  }
})
const FILTER_OBJECT = computed(() => {
  return props.filterObj
})
const isShowDialog = ref(false)
const dialogId = ref(false)
const handleClickFilter = () => {
  isShowDialog.value = true
  dialogId.value = `filterdialog_${Math.random()}`
}
const closeDialogCB2 = () => {
  ElMessage({
    message: '查找宝可梦成功！',
    type: 'success'
  })
}
</script>
<template>
  <el-button color="#626aef" size="small" plain @click="handleClickFilter()"
    ><SvgIcon type="filter" />筛选</el-button
  >
  <CptDialog
    :isShow="isShowDialog"
    v-bind:key="dialogId"
    :closeCallBack="closeDialogCB2"
  >
    <div class="dialog-filter">
      <h3><SvgIcon type="filter" />筛选宝可梦</h3>
      <el-form label-width="60">
        <el-form-item v-if="showKey && showKey.includes('isShiny')">
          <el-checkbox v-model="FILTER_OBJECT.isShiny">
            {{ $t("PROP.shiny") }}
          </el-checkbox>
        </el-form-item>
        <el-form-item
          label="类型"
          v-if="showKey && showKey.includes('pokeType')"
        >
          <ul class="cpt-select-list cpt-select-list--txt">
            <template
              v-for="(mapItem, key) in POKE_TYPES"
              v-bind:key="`berry_${$t(`POKE_TYPES.${key}`)}`"
            >
              <li
                class="cpt-select-list__item"
                @click="handleClickFilterPokes('pokeTypes', +key)"
                :class="{ cur: FILTER_OBJECT.pokeTypes.includes(+key) }"
              >
                <div class="cpt-select-list__name">
                  {{ $t(`POKE_TYPES.${key}`) }}
                </div>
              </li>
            </template>
          </ul>
        </el-form-item>
        <el-form-item
          label="树果"
          v-if="showKey && showKey.includes('berryType')"
        >
          <ul class="cpt-select-list cpt-select-list--berry">
            <template
              v-for="(mapItem, key) in BERRY_TYPES"
              v-bind:key="`berry_${$t(`BERRY_TYPES.${key}`)}`"
            >
              <li
                class="cpt-select-list__item"
                @click="handleClickFilterPokes('berrys', +key)"
                :class="{ cur: FILTER_OBJECT.berrys.includes(+key) }"
              >
                <div class="cpt-select-list__name">
                  {{ $t(`BERRY_TYPES.${key}`) }}
                  <div>
                    <div class="cpt-food cpt-food--s berry">
                      <div class="cpt-food__item">
                        <img
                          v-lazy="`./img/berry/${+key}.png`"
                          :alt="$t(`BERRY_TYPES.${+key}`)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </el-form-item>
        <el-form-item
          label="食材"
          v-if="showKey && showKey.includes('foodType')"
        >
          <ul
            class="cpt-select-list cpt-select-list--berry cpt-select-list--food"
          >
            <template
              v-for="(mapItem, key) in FOOD_TYPES"
              v-bind:key="`f_${$t(`FOOD_TYPES.${key}`)}`"
            >
              <li
                class="cpt-select-list__item"
                @click="handleClickFilterPokes('foods', +key)"
                :class="{ cur: FILTER_OBJECT.foods.includes(+key) }"
              >
                <div class="cpt-select-list__name">
                  {{ $t(`FOOD_TYPES.${key}`) }}
                  <div>
                    <div class="cpt-food cpt-food--s berry">
                      <div class="cpt-food__item">
                        <img
                          v-lazy="`./img/food/${+key}.png`"
                          :alt="$t(`FOOD_TYPES.${+key}`)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </template></ul
        ></el-form-item>
        <el-form-item
          label="主技能"
          v-if="showKey && showKey.includes('mainSkill')"
        >
          <ul class="cpt-select-list cpt-select-list--txt">
            <template
              v-for="(mapItem, key) in SKILL_TYPES"
              v-bind:key="`st_${$t(`SKILL_TYPES.${key}`)}`"
            >
              <li
                class="cpt-select-list__item"
                @click="handleClickFilterPokes('mainSkills', +key)"
                :class="{ cur: FILTER_OBJECT.mainSkills.includes(+key) }"
              >
                <div class="cpt-select-list__name">
                  {{ $t(`SKILL_TYPES.${key}`) }}
                </div>
              </li>
            </template>
          </ul></el-form-item
        >
        <el-form-item
          label="副技能"
          v-if="showKey && showKey.includes('subSkill')"
        >
          <ul class="cpt-select-list cpt-select-list--txt">
            <template
              v-for="skillItem in skillOptionsExtra2"
              v-bind:key="`sst_${skillItem.label}`"
            >
              <li
                class="cpt-select-list__item"
                @click="handleClickFilterPokes('subSkills', skillItem.label)"
                :class="{
                  cur: FILTER_OBJECT.subSkills.includes(skillItem.label),
                }"
              >
                <div class="cpt-select-list__name">
                  <span class="cpt-skill cpt-skill--3">{{
                    $t(skillItem.txt)
                  }}</span>
                </div>
              </li>
            </template>
            <li
              class="cpt-select-list__item"
              @click="
                handleClickFilterPokes('subSkills', skillOptionsExtra[0].label)
              "
              :class="{
                cur: FILTER_OBJECT.subSkills.includes(
                  skillOptionsExtra[0].label
                ),
              }"
            >
              <div class="cpt-select-list__name">
                <span class="cpt-skill cpt-skill--3">{{
                  $t(skillOptionsExtra[0].txt)
                }}</span>
              </div>
            </li>
            <template
              v-for="skillItem in skillOptionsHelpSpeed"
              v-bind:key="`sst_${skillItem.label}`"
            >
              <li
                class="cpt-select-list__item"
                @click="handleClickFilterPokes('subSkills', skillItem.label)"
                :class="{
                  cur: FILTER_OBJECT.subSkills.includes(skillItem.label),
                }"
              >
                <div class="cpt-select-list__name">
                  <span
                    class="cpt-skill"
                    :class="`cpt-skill--${skillItem.rare}`"
                    >{{ $t(skillItem.txt) }}</span
                  >
                </div>
              </li>
            </template>
            <template
              v-for="skillItem in skillOptionsFoodPer"
              v-bind:key="`sst_${skillItem.label}`"
            >
              <li
                class="cpt-select-list__item"
                @click="handleClickFilterPokes('subSkills', skillItem.label)"
                :class="{
                  cur: FILTER_OBJECT.subSkills.includes(skillItem.label),
                }"
              >
                <div class="cpt-select-list__name">
                  <span
                    class="cpt-skill"
                    :class="`cpt-skill--${skillItem.rare}`"
                    >{{ $t(skillItem.txt) }}</span
                  >
                </div>
              </li>
            </template>
            <template
              v-for="skillItem in skillOptionsSkillPer"
              v-bind:key="`sst_${skillItem.label}`"
            >
              <li
                class="cpt-select-list__item"
                @click="handleClickFilterPokes('subSkills', skillItem.label)"
                :class="{
                  cur: FILTER_OBJECT.subSkills.includes(skillItem.label),
                }"
              >
                <div class="cpt-select-list__name">
                  <span
                    class="cpt-skill"
                    :class="`cpt-skill--${skillItem.rare}`"
                    >{{ $t(skillItem.txt) }}</span
                  >
                </div>
              </li>
            </template>
          </ul>
        </el-form-item>
      </el-form>
    </div>
  </CptDialog>
</template>