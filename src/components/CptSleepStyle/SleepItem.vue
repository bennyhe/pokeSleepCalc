<script setup>
import { defineProps } from 'vue'
import CptPoke from '../CptPoke/ItemIndex.vue'
import { gameMap } from '../../config/game.js'
import { SLEEP_NAMES } from '../../config/valKey.js'
import { getStageLevelPicId, getPercent } from '../../utils/index.js'

const props = defineProps({
  sleepItem: {
    type: [Object]
  },
  userData: {
    type: [Object]
  },
  showKey: {
    type: Array
  },
  showMapLevel: {
    type: [Boolean],
    default: false
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
        <span class="star"
          ><template v-if="sleepItem.sleepNameId === 4">{{
            SLEEP_NAMES[sleepItem.sleepNameId]
          }}</template
          ><template v-else>{{ sleepItem.star }}✩</template></span
        >
      </p>
      <p>
        <span class="sptime">{{
          sleepItem.id.replace(`${sleepItem.pokeId}-id-`, "")
        }}</span
        >号睡姿
      </p>
      <p>
        <span class="sptime">{{ sleepItem.exp }}</span
        >经验
      </p>
      <p>
        <span class="sptime">{{ sleepItem.shards }}</span
        >梦碎
      </p>
      <p>
        可获得<span class="sptime">{{ sleepItem.candys }}</span
        >糖
      </p>
      <div v-if="sleepItem.count">
        获得<span class="sptime">{{ sleepItem.count }}</span
        >次
      </div>
      <p v-if="sleepItem.extra">
        {{ sleepItem.extra }}
      </p>
      <p v-if="showMapLevel && userData && userData.curStageIndex > 0">
        <img
          class="icon"
          v-lazy="
            `./img/ui/${getStageLevelPicId(
              gameMap[userData.curMap].levelList[userData.curStageIndex].name
            )}.png`
          "
        />{{ gameMap[userData.curMap].levelList[userData.curStageIndex].name }}
      </p>
    </div>
  </div>
</template>