<script setup>
import { defineProps } from 'vue'
import CptDialog from '../Dialog/index.vue'
import CptAvatar from '../CptAvatar/ItemIndex.vue'
import CptSleepStyle from '../CptSleepStyle/SleepItem.vue'
import { SPO38000 } from '../../config/spo.js'
import { pokedex } from '../../config/pokedex.js'
import { gameMap } from '../../config/game.js'
import { getTargetPokemonsSleeps, getUnLockSleeps } from '../../utils/sleep.js'
import {
  getNum,
  getStageLevelPicId,
  extractPrefix
} from '../../utils/index.js'

const props = defineProps({
  curDialogPokeId: {
    type: [String, Number]
  },
  dialogId: {
    type: [String, Number]
  },
  isShow: {
    type: Boolean,
    default: false
  }
})

const gameMapNew = JSON.parse(JSON.stringify(gameMap))
gameMapNew.forEach(gitem => {
  // console.log(gitem.levelList[0].sleepStyles)
  gitem.levelList[0].sleepStyles.push('491-id-1')
  gitem.levelList[0].sleepStyles.push('491-id-2')
  gitem.levelList[0].sleepStyles.push('491-id-3')
})
</script>
<template>
  <CptDialog :isShow="isShow" v-bind:key="dialogId">
    <div class="dialog-pokedex-detail" v-if="curDialogPokeId">
      <h3>
        #{{ curDialogPokeId }} {{ $t(`POKEMON_NAME.${curDialogPokeId}`) }}
        <div
          class="i i-sleeptype"
          :class="`i i-sleeptype--${pokedex[curDialogPokeId].sleepType}`"
        >
          {{ $t(`SLEEP_TYPES.${pokedex[curDialogPokeId].sleepType}`) }}
        </div>
      </h3>
      <div>
        <CptAvatar :pokeId="curDialogPokeId" size="large" />
        <CptAvatar
          :pokeId="curDialogPokeId"
          size="large"
          isShiny
          v-if="curDialogPokeId !== 491"
        />
        <div>
          <div
            class="cpt-pokemon__pic"
            style="display: inline-block; width: 120px; height: 120px"
          >
            <img
              v-lazy="`./img/portrait/${extractPrefix(curDialogPokeId)}.png`"
              :alt="$t(`POKEMON_NAME.${curDialogPokeId}`)"
              style="width: 100%"
            />
          </div>
          <div
            class="cpt-pokemon__pic"
            style="display: inline-block; width: 120px; height: 120px"
            v-if="curDialogPokeId !== 491"
          >
            <img
              v-lazy="
                `./img/portrait/shiny/${extractPrefix(curDialogPokeId)}.png`
              "
              :alt="$t(`POKEMON_NAME.${curDialogPokeId}`)"
              style="width: 100%"
            />
          </div>
        </div>
      </div>
      <div class="poke-tb poke-tb--xscorll">
        <template v-for="fKey in 12" v-bind:key="fKey">
          <template
            v-if="
              getTargetPokemonsSleeps(
                `${extractPrefix(curDialogPokeId)}-id-${fKey}`
              ).id
            "
          >
            <div class="poke-tb__item">
              <CptSleepStyle
                :showCptPoke="false"
                :sleepItem="
                  getTargetPokemonsSleeps(
                    `${extractPrefix(curDialogPokeId)}-id-${fKey}`
                  )
                "
                :showKey="['sleepType']"
              >
                <p
                  v-if="
                    getTargetPokemonsSleeps(
                      `${extractPrefix(curDialogPokeId)}-id-${fKey}`
                    ).spoId
                  "
                >
                  ID: #{{
                    getTargetPokemonsSleeps(
                      `${extractPrefix(curDialogPokeId)}-id-${fKey}`
                    ).spoId
                  }}
                </p>
                <p
                  v-if="
                    getTargetPokemonsSleeps(
                      `${extractPrefix(curDialogPokeId)}-id-${fKey}`
                    ).spo
                  "
                >
                  SPO:
                  {{
                    getTargetPokemonsSleeps(
                      `${extractPrefix(curDialogPokeId)}-id-${fKey}`
                    ).spo
                  }}
                </p>
                <p
                  style="color: #d1813a"
                  v-if="
                    getTargetPokemonsSleeps(
                      `${extractPrefix(curDialogPokeId)}-id-${fKey}`
                    ).spo
                  "
                >
                  {{
                    getNum(
                      getTargetPokemonsSleeps(
                        `${extractPrefix(curDialogPokeId)}-id-${fKey}`
                      ).spo * SPO38000
                    )
                  }}
                </p>
                <ul class="cpt-select-list">
                  <template
                    v-for="mapItem in gameMapNew"
                    v-bind:key="mapItem.id"
                  >
                    <template
                      v-for="sleepsItem in getUnLockSleeps(
                        mapItem.id,
                        mapItem.levelList,
                        34
                      ).allUnlockSleepsList"
                    >
                      <template
                        v-if="
                          `${extractPrefix(curDialogPokeId)}-id-${fKey}` ===
                          sleepsItem.id
                        "
                      >
                        <li
                          style="font-size: 12px"
                          v-bind:key="sleepsItem.id"
                          v-if="
                            mapItem.id === 'greenex' &&
                            getTargetPokemonsSleeps(
                              `${extractPrefix(curDialogPokeId)}-id-${fKey}`,
                              mapItem.id
                            ).spo
                          "
                        >
                          <p
                            v-if="
                              getTargetPokemonsSleeps(
                                `${extractPrefix(curDialogPokeId)}-id-${fKey}`,
                                mapItem.id
                              ).spo
                            "
                          >
                            SPO:
                            {{
                              getTargetPokemonsSleeps(
                                `${extractPrefix(curDialogPokeId)}-id-${fKey}`,
                                mapItem.id
                              ).spo
                            }}
                          </p>
                          <p
                            style="color: #d1813a"
                            v-if="
                              getTargetPokemonsSleeps(
                                `${extractPrefix(curDialogPokeId)}-id-${fKey}`,
                                mapItem.id
                              ).spo
                            "
                          >
                            {{
                              getNum(
                                getTargetPokemonsSleeps(
                                  `${extractPrefix(
                                    curDialogPokeId
                                  )}-id-${fKey}`,
                                  mapItem.id
                                ).spo * SPO38000
                              )
                            }}
                          </p>
                        </li>
                        <li
                          class="cpt-select-list__item cur"
                          v-bind:key="sleepsItem.id"
                        >
                          <div class="cpt-select-list__name">
                            {{ $t(`ILAND.${mapItem.id}`) }}
                            <p>
                              <img
                                class="icon"
                                v-lazy="
                                  `./img/ui/${getStageLevelPicId(
                                    mapItem.levelList[sleepsItem.unLockLevel]
                                      .name
                                  )}.png`
                                "
                              />{{
                                $t(
                                  `LEVEL_TITLE.${
                                    mapItem.levelList[sleepsItem.unLockLevel]
                                      .nameId
                                  }`
                                )
                              }}{{
                                mapItem.levelList[sleepsItem.unLockLevel]
                                  .nameIndex
                              }}
                            </p>
                          </div>
                          <img
                            v-if="mapItem.pic"
                            class="cpt-select-list__bg"
                            v-lazy="`./img/ui/${mapItem.pic}.png`"
                            :alt="mapItem.name"
                          />
                        </li>
                      </template>
                    </template>
                  </template>
                </ul>
              </CptSleepStyle>
            </div>
          </template>
        </template>
      </div>
    </div>
  </CptDialog>
</template>