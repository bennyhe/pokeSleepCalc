<script setup>
import { ref } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { sortInObjectOptions, convertSecondsToHMS } from '../utils/index.js'
import { pokedex } from '../config/pokedex.js'

const otherLevelShow = [25, 30, 50, 60, 100]
const helpSpeedCalcForm = ref({
  baseHelpSpeed: 2200, // Number
  level: 50, // Number
  skill: ['none'], // Array: ['none', 's', 'm']
  character: 'none' // String: none, up, down
})
const allHelpType = [
  {
    title: '无技能\n性格:帮忙↓',
    skill: ['none'],
    character: 'down'
  },
  {
    title: '帮忙S\n性格:帮忙↓',
    skill: ['s'],
    character: 'down'
  },
  {
    title: '无技能\n性格:无',
    skill: ['none'],
    character: 'none'
  },
  {
    title: '帮忙M\n性格:帮忙↓',
    skill: ['m'],
    character: 'down'
  },
  {
    title: '帮忙S\n性格:无',
    skill: ['s'],
    character: 'none'
  },
  {
    title: '帮忙M\n性格:无',
    skill: ['m'],
    character: 'none'
  },
  {
    title: '无技能\n性格:帮忙↑',
    skill: ['none'],
    character: 'up'
  },
  {
    title: '帮忙S,M\n性格:帮忙↓',
    skill: ['s', 'm'],
    character: 'down'
  },
  {
    title: '帮忙S\n性格:帮忙↑',
    skill: ['s'],
    character: 'up'
  },
  {
    title: '帮忙S,M\n性格:无',
    skill: ['s', 'm'],
    character: 'none'
  },
  {
    title: '帮忙M\n性格:帮忙↑',
    skill: ['m'],
    character: 'up'
  },
  {
    title: '帮忙S,M\n性格:帮忙↑',
    skill: ['s', 'm'],
    character: 'up'
  }
]

const byHelpSpeedRes = ref([])
// 获取选择帮忙速度的宝可梦分组
const initFilterGroup = () => {
  let byHelpSpeedResIn = []
  const byHelpSpeedOrgList = []
  for (const pokeKey in pokedex) {
    if (Object.hasOwnProperty.call(pokedex, pokeKey)) {
      const pokedexItem = pokedex[pokeKey]

      // 帮忙速度分类
      if (
        pokedexItem.helpSpeed &&
        !byHelpSpeedOrgList.includes(pokedexItem.helpSpeed)
      ) {
        byHelpSpeedResIn.push({
          id: pokedexItem.helpSpeed,
          helpSpeed: pokedexItem.helpSpeed,
          title: `${pokedexItem.helpSpeed}s`,
          list: []
        })
        byHelpSpeedOrgList.push(pokedexItem.helpSpeed)
      }
      byHelpSpeedResIn
        .find(item => item.helpSpeed === pokedexItem.helpSpeed)
        .list.push(pokedexItem)
    }
  }
  byHelpSpeedResIn.forEach(item => {
    item.count = item.list.length
    item.list = sortInObjectOptions(
      [...item.list],
      ['pokeType', 'berryType', 'id'],
      'up'
    )
  })
  byHelpSpeedResIn = sortInObjectOptions(byHelpSpeedResIn, ['helpSpeed'], 'up')
  byHelpSpeedRes.value = byHelpSpeedResIn
}
initFilterGroup()

// 获取计算结果
const getNewHelpSpeed = (formData, level, isGoldHelp) => {
  // console.log(formData, level, isGoldHelp)
  // formData: {
  //   baseHelpSpeed, // Number
  //   skill, // Array: ['none', 's', 'm']
  //   character // String: none, up, down
  // }
  // 每级多0.2%
  const levelUp = (level - 1) * 0.002
  let basichelp = 0
  let mainMuti = 0
  if (formData.skill.includes('s')) {
    basichelp += 0.07
  }
  if (formData.skill.includes('m')) {
    basichelp += 0.14
  }
  if (formData.character === 'up') {
    mainMuti = 0.1
  }
  if (formData.character === 'down') {
    mainMuti = -0.1
  }
  // if (isGoldHelp) {
  //   mainMuti += 0.05
  // }
  const res =
    formData.baseHelpSpeed * (1 - levelUp) * (1 - mainMuti) * (1 - basichelp)
  return Math.floor(res)
}
</script>
<template>
  <h2>帮忙速度计算</h2>
  <el-form label-width="90px">
    <el-form-item label="原帮忙速度">
      <el-select
        v-model="helpSpeedCalcForm.baseHelpSpeed"
        placeholder="请选择卡比兽级别"
        class="m-2"
      >
        <el-option
          v-for="helpItem in byHelpSpeedRes"
          :key="helpItem.id"
          :label="`${helpItem.helpSpeed}s`"
          :value="helpItem.id"
        >
          {{ helpItem.helpSpeed }}s
          <img
            class="icon"
            v-lazy="`./img/pokedex/${pokeItem.id}.png`"
            :alt="pokeItem.name"
            v-for="pokeItem in helpItem.list"
            v-bind:key="pokeItem.id"
          />
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="宝可梦等级">
      <el-slider v-model="helpSpeedCalcForm.level" show-input />
    </el-form-item>
    <el-form-item label="技能">
      <el-checkbox-group v-model="helpSpeedCalcForm.skill" class="ml-4">
        <el-checkbox label="s">帮忙速度S(7%)</el-checkbox>
        <el-checkbox label="m">帮忙速度M(14%)</el-checkbox>
        <!-- <el-checkbox label="gold">帮手奖励(5%)</el-checkbox> -->
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="性格:">
      <el-radio-group v-model="helpSpeedCalcForm.character" class="ml-4">
        <el-radio label="none">无加成</el-radio>
        <el-radio label="up">帮忙速度↑(+10%)</el-radio>
        <el-radio label="down"
          ><span class="vigour">帮忙速度↓(-10%)</span></el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item label="计算结果">
      <ul>
        <li>
          {{ helpSpeedCalcForm.level }}级：
          <span class="sptime"
            >{{
              getNewHelpSpeed(helpSpeedCalcForm, helpSpeedCalcForm.level)
            }}s</span
          >
          /
          {{
            convertSecondsToHMS(
              getNewHelpSpeed(helpSpeedCalcForm, helpSpeedCalcForm.level)
            )
          }}
          <!-- <template v-if="helpSpeedCalcForm.skill.includes('gold')">
            (帮手奖励:<span class="sptime"
              >{{
                getNewHelpSpeed(
                  helpSpeedCalcForm,
                  helpSpeedCalcForm.level,
                  helpSpeedCalcForm.skill.includes("gold")
                )
              }}s</span
            >
            {{
              convertSecondsToHMS(
                getNewHelpSpeed(
                  helpSpeedCalcForm,
                  helpSpeedCalcForm.level,
                  helpSpeedCalcForm.skill.includes("gold")
                )
              )
            }})
          </template> -->
        </li>
      </ul>
      <div class="helpprocess">
        <i class="helpprocess__inner"
          ><i
            :style="`width: ${
              ((getNewHelpSpeed(helpSpeedCalcForm, helpSpeedCalcForm.level) -
                getNewHelpSpeed(
                  {
                    baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                    skill: ['none'],
                    character: 'down',
                  },
                  helpSpeedCalcForm.level
                )) /
                (getNewHelpSpeed(
                  {
                    baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                    skill: ['none'],
                    character: 'down',
                  },
                  helpSpeedCalcForm.level
                ) -
                  getNewHelpSpeed(
                    {
                      baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                      skill: ['s', 'm'],
                      character: 'up',
                    },
                    helpSpeedCalcForm.level
                  ))) *
              -100
            }%`"
          ></i
        ></i>
        <div
          v-for="(processItem, processKey) in allHelpType"
          v-bind:key="processItem.title"
          :style="`left: ${
            ((getNewHelpSpeed(
              {
                baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                ...processItem,
              },
              helpSpeedCalcForm.level
            ) -
              getNewHelpSpeed(
                {
                  baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                  skill: ['none'],
                  character: 'down',
                },
                helpSpeedCalcForm.level
              )) /
              (getNewHelpSpeed(
                {
                  baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                  skill: ['none'],
                  character: 'down',
                },
                helpSpeedCalcForm.level
              ) -
                getNewHelpSpeed(
                  {
                    baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                    skill: ['s', 'm'],
                    character: 'up',
                  },
                  helpSpeedCalcForm.level
                ))) *
            -100
          }%`"
          class="helpprocess__tag"
          :class="[
            processItem.character === 'down' ? 'down' : '',
            processItem.character === 'up' ? 'up' : '',
            `helpprocess__tag--${processKey + 1}`,
            getNewHelpSpeed(helpSpeedCalcForm, helpSpeedCalcForm.level) ===
            getNewHelpSpeed(
              {
                baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                ...processItem,
              },
              helpSpeedCalcForm.level
            )
              ? 'cur'
              : '',
          ]"
        >
          <pre class="helpprocess__title" v-html="processItem.title"></pre>
          <div class="helpprocess__value">
            {{
              getNewHelpSpeed(
                {
                  baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                  ...processItem,
                },
                helpSpeedCalcForm.level
              )
            }}s
          </div>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="参考" v-if="helpSpeedCalcForm.level < 100">
      <ul>
        <template v-for="olItem in otherLevelShow" v-bind:key="olItem">
          <li
            v-if="
              helpSpeedCalcForm.level !== olItem &&
              helpSpeedCalcForm.level < olItem
            "
          >
            {{ olItem }}级：
            <span class="sptime"
              >{{ getNewHelpSpeed(helpSpeedCalcForm, olItem) }}s</span
            >
            /
            {{
              convertSecondsToHMS(getNewHelpSpeed(helpSpeedCalcForm, olItem))
            }}
          </li>
        </template>
      </ul>
    </el-form-item>
    <el-form-item>
      <div class="mod-tips">
        <p>* 游戏内不会显示帮手奖励后的时间。</p>
        <p>* 暂不支持帮手奖励相关计算。</p>
      </div>
    </el-form-item>
  </el-form>
</template>