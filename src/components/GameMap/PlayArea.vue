<script setup>
import { defineProps } from 'vue'
import { gameMap } from '../../config/game.js'
import { pokedex } from '../../config/pokedex.js'
const props = defineProps({
  resList: {
    type: [Array]
  },
  curMap: {
    type: [Number, String]
  },
  catchPokeFriendship: {
    type: [Object]
  },
  handleClickPokeItem: {
    type: [Function]
  }
})
</script>
<template>
  <div class="lottery-map-wrap" v-if="resList && resList.length > 0">
    <div class="lottery-map">
      <template
        v-for="(sleepItem, sleepKey) in resList"
        v-bind:key="`map${sleepItem.id}${sleepKey}`"
      >
        <div
          class="lottery-map__item"
          :class="[`lottery-map__item--scalex${sleepItem.isScaleX}`]"
          @click="handleClickPokeItem(sleepItem, sleepKey)"
          :style="`animation-delay: ${0.3 * (sleepKey + 1)}s; left:${
            sleepItem.position.xPercent * 100
          }%; top:${sleepItem.position.yPercent * 100}%`"
        >
          <div class="lottery-map__catch">
            <div class="lottery-map__eattips" :class="{'lottery-map__eattips--1': sleepItem.eatStateType === 1}">
              <template v-if="sleepItem.eatStateType === 1">贪吃</template>
            </div>
            <div
              class="cpt-friendship"
              :class="{
                'cpt-friendship--2row':
                  pokedex[sleepItem.pokeId].friendship > 7,
                'cpt-friendship--txt cpt-friendship--max': sleepItem.eatStateType === 2,
                'cpt-friendship--txt cpt-friendship--full': sleepItem.eatStateType === 4,
              }"
            >
              <template v-if="sleepItem.eatStateType === 2">友情点数MAX</template>
              <template v-else-if="sleepItem.eatStateType === 4">吃饱了</template>
              <template v-else>
                <template v-if="pokedex[sleepItem.pokeId].friendship > 7">
                  <div class="row">
                    <i
                      v-for="(item, key) in parseInt(
                        parseFloat(pokedex[sleepItem.pokeId].friendship / 2),
                        10
                      )"
                      :class="{
                        get: key < catchPokeFriendship[sleepItem.pokeId],
                      }"
                      v-bind:key="`row1_${
                        sleepItem.id
                      }${sleepKey}${Math.random()}_fs${key}`"
                    >
                    </i>
                  </div>
                  <div class="row">
                    <i
                      v-for="(item, key) in pokedex[sleepItem.pokeId]
                        .friendship -
                      parseInt(
                        parseFloat(pokedex[sleepItem.pokeId].friendship / 2),
                        10
                      )"
                      :class="{
                        get:
                          key +
                            parseInt(
                              parseFloat(
                                pokedex[sleepItem.pokeId].friendship / 2
                              )
                            ) <
                          catchPokeFriendship[sleepItem.pokeId],
                      }"
                      v-bind:key="`row1_${
                        sleepItem.id
                      }${sleepKey}${Math.random()}_fs${
                        key +
                        parseInt(
                          parseFloat(pokedex[sleepItem.pokeId].friendship / 2)
                        )
                      }`"
                    >
                    </i>
                  </div>
                </template>
                <template v-else>
                  <i
                    v-for="(item, key) in pokedex[sleepItem.pokeId].friendship"
                    :class="{
                      get: key < catchPokeFriendship[sleepItem.pokeId],
                    }"
                    v-bind:key="`${
                      sleepItem.id
                    }${sleepKey}${Math.random()}_fs${key}`"
                  >
                  </i>
                </template>
              </template>
            </div>
          </div>
          <div class="cpt-pokemon">
            <div class="cpt-pokemon__pic">
              <img
                v-lazy="
                  `./img/portrait/${sleepItem.isShiny ? 'shiny/' : ''}${
                    sleepItem.pokeId
                  }.png`
                "
                :alt="$t(`POKEMON_NAME.${sleepItem.pokeId}`)"
              />
            </div>
          </div>
          <div class="cpt-pokemon__name" :class="{ shiny: sleepItem.isShiny }">
            <p class="star">{{ sleepItem.star }}✩</p>
            <span v-if="sleepItem.isShiny" class="sptime">{{
              $t("PROP.shiny")
            }}</span>
            {{ $t(`SLEEPSTYLE_NAME.${sleepItem.sleepNameId}`) }}
          </div>
        </div>
      </template>
      <!-- <template
                  v-for="sleepItem in 14"
                  v-bind:key="`123${sleepItem}`"
                >
                  <div class="lottery-map__item" :class="[`lottery-map__item--${sleepItem}`]">
                    <CptPoke :pokeId="resList[0].pokeId" />
                  </div>
                </template> -->
      <i class="lottery-map__snorlax"></i>
      <img
        v-if="gameMap[curMap].pic"
        class="lottery-map__bg"
        :src="`./img/ui/${gameMap[curMap].pic}.png`"
        :alt="gameMap[curMap].name"
      />
    </div>
  </div>
</template>