<script setup>
import { defineProps } from 'vue'
import CptDialog from '../Dialog/index.vue'
import CptAvatar from '../CptAvatar/ItemIndex.vue'
import CptSleepStyle from '../CptSleepStyle/SleepItem.vue'
import { SPO38000 } from '../../config/spo.js'
import { pokedex } from '../../config/pokedex.js'
import { gameMap } from '../../config/game.js'
import { getTargetPokemonsSleeps, getUnLockSleeps } from '../../utils/sleep.js'
import { getNum, getStageLevelPicId } from '../../utils/index.js'

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
</script>
<template>
  <CptDialog :isShow="isShow" v-bind:key="dialogId">
    <div class="dialog-pokedex-detail" v-if="curDialogPokeId">
      <h3>
        {{ $t(`POKEMON_NAME.${curDialogPokeId}`) }}
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
              v-lazy="`./img/portrait/${curDialogPokeId}.png`"
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
              v-lazy="`./img/portrait/shiny/${curDialogPokeId}.png`"
              :alt="$t(`POKEMON_NAME.${curDialogPokeId}`)"
              style="width: 100%"
            />
          </div>
        </div>
      </div>
      <div class="poke-tb poke-tb--xscorll">
        <template v-for="fKey in 12" v-bind:key="fKey">
          <template
            v-if="getTargetPokemonsSleeps(`${curDialogPokeId}-id-${fKey}`).id"
          >
            <div class="poke-tb__item">
              <CptSleepStyle
                :showCptPoke="false"
                :sleepItem="
                  getTargetPokemonsSleeps(`${curDialogPokeId}-id-${fKey}`)
                "
                :showKey="['sleepType']"
              >
                <p
                  v-if="
                    getTargetPokemonsSleeps(`${curDialogPokeId}-id-${fKey}`)
                      .spoId
                  "
                >
                  ID: #{{
                    getTargetPokemonsSleeps(`${curDialogPokeId}-id-${fKey}`)
                      .spoId
                  }}
                </p>
                <p
                  v-if="
                    getTargetPokemonsSleeps(`${curDialogPokeId}-id-${fKey}`).spo
                  "
                >
                  SPO:
                  {{
                    getTargetPokemonsSleeps(`${curDialogPokeId}-id-${fKey}`).spo
                  }}
                </p>
                <p style="color: #d1813a">
                  {{
                    getNum(
                      getTargetPokemonsSleeps(`${curDialogPokeId}-id-${fKey}`)
                        .spo * SPO38000
                    )
                  }}
                </p>

                <ul class="cpt-select-list">
                  <template v-for="mapItem in gameMap" v-bind:key="mapItem.id">
                    <template
                      v-for="sleepsItem in getUnLockSleeps(
                        mapItem.levelList,
                        34
                      ).allUnlockSleepsList"
                    >
                      <template
                        v-if="`${curDialogPokeId}-id-${fKey}` === sleepsItem.id"
                      >
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