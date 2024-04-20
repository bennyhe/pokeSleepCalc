<script setup>
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import CptPoke from '../CptPoke/ItemIndex.vue'
import { gameMap } from '../../config/game.js'
import { getStageLevelPicId } from '../../utils/index.js'

const { locale } = useI18n()
const localeLangId = computed(() => {
  return locale.value
})
const props = defineProps({
  sleepItem: {
    type: [Object]
  },
  showKey: {
    type: Array
  },
  showMapLevel: {
    type: [Boolean],
    default: false
  },
  mapLevel: {
    type: [String, Number],
    default: ''
  },
  curMap: {
    type: [String, Number],
    default: ''
  },
  showCptPoke: {
    type: [Boolean],
    default: true
  }
})
</script>

<template>
  <div>
    <CptPoke
      v-if="showCptPoke"
      :pokeId="sleepItem.pokeId"
      :showKey="showKey"
      :isShiny="sleepItem.isShiny"
    />
    <div class="extra-desc">
      <p>
        <span class="star">{{ sleepItem.star }}✩</span>
      </p>
      <p
        class="cpt-pokemon__name"
        :class="{ sptime: sleepItem.sleepNameId === 4 }"
      >
        {{ $t(`SLEEPSTYLE_NAME.${sleepItem.sleepNameId}`) }}
      </p>
      <p>
        <template v-if="localeLangId === 'cn'">
          <span class="sptime">{{
            sleepItem.id.replace(`${sleepItem.pokeId}-id-`, "")
          }}</span
          >号睡姿
        </template>
        <template v-else>
          ID-<span class="sptime">{{
            sleepItem.id.replace(`${sleepItem.pokeId}-id-`, "")
          }}</span>
        </template>
      </p>
      <p>
        <img class="icon" v-lazy="`./img/ui/exp.png`" />
        <span class="sptime">{{ sleepItem.exp }}</span>
      </p>
      <p>
        <img class="icon" v-lazy="`./img/ui/shards.png`" />
        <span class="sptime">{{ sleepItem.shards }}</span>
      </p>
      <p>
        <img class="icon" v-lazy="`./img/ui/candy.png`" />
        <span class="sptime">{{ sleepItem.candys }}</span>
      </p>
      <div v-if="localeLangId === 'jp' && sleepItem.count">
        <span class="sptime">{{ sleepItem.count }}</span
        >回獲得
      </div>
      <div v-else-if="sleepItem.count">
        获得<span class="sptime">{{ sleepItem.count }}</span
        >次
      </div>
      <p class="cpt-tag-important" v-if="sleepItem.extra">
        {{ sleepItem.extra }}
      </p>
      <p v-if="showMapLevel && sleepItem.unLockLevel !== undefined">
        <img
          class="icon"
          v-lazy="
            `./img/ui/${getStageLevelPicId(
              gameMap[curMap].levelList[mapLevel || sleepItem.unLockLevel].name
            )}.png`
          "
        />{{
          $t(
            `LEVEL_TITLE.${
              gameMap[curMap].levelList[mapLevel || sleepItem.unLockLevel]
                .nameId
            }`
          )
        }}{{
          gameMap[curMap].levelList[mapLevel || sleepItem.unLockLevel].nameIndex
        }}
      </p>
    </div>
  </div>
</template>