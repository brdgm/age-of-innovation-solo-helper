<template>
  <h4 class="mt-3">{{t('setupTiles.other.title')}}</h4>

  <div>
    <button type="button" class="btn btn-outline-secondary me-2 mb-2" data-bs-toggle="collapse" data-bs-target="#randomizedSetup">
      {{t('setupTiles.other.randomizer')}} &#x25BC;      
    </button>
  </div>
  <div class="collapse mt-2" id="randomizedSetup">
    <div class="alert alert-secondary fst-italic">
      <span v-html="t('setupTiles.other.notice')"></span>
      <button type="button" class="btn btn-sm btn-secondary ms-2" @click="randomizeOtherTiles">{{t('action.randomize')}}</button>
    </div>

    <div class="tilesContainerWrapper">
      <div class="bookActions mb-2">
        <img src="@/assets/book-actions-background.webp" alt="" class="background"/>
        <div>
          <AppIcon v-for="tile of setup.setupBookActions" :key="tile" type="book-action" extension="webp" :name="`${tile}`" class="tile"/><br/>
        </div>
      </div>
    </div>

    <div class="palaceTiles mb-2">
      <AppIcon v-for="id of setup.setupPalaceTiles" :key="id" type="palace" :name="`${id}`" extension="webp" class="tile"/>
      <AppIcon type="palace" name="17" extension="webp" class="tile"/>
    </div>

    <div class="tilesContainerWrapper" v-if="setup.setupInnovationTiles && setup.setupCompetencyTiles">
      <div class="innovation" :class="{[`player${totalPlayerCount}`]:true}">
        <img v-if="totalPlayerCount == 3" src="@/assets/innovation-display-3player.webp" alt="" class="background"/>
        <img v-else src="@/assets/innovation-display-2player.webp" alt="" class="background"/>
        <div>
          <AppIcon v-for="(id,index) of setup.setupInnovationTiles" :key="id" type="innovation" :name="`${id}`" extension="webp" class="tile"
              :class="{[`row${(index >= setup.setupInnovationTiles.length - 4) ? '2' : '1'}`]:true}"/>
        </div>
      </div>
      <div class="competency">
        <img src="@/assets/competency-display.webp" alt="" class="background"/>
        <AppIcon v-for="(id,index) of setup.setupCompetencyTiles" :key="id" type="competency" :name="`${id}`" extension="webp" class="tile"
            :class="{[`row${Math.floor(index / 4) + 1}`]:true}"/>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import rollDiceMultiDifferentValue from '@brdgm/brdgm-commons/src/util/random/rollDiceMultiDifferentValue'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'

const BOOK_ACTIONS_TOTAL = 6
const BOOK_ACTIONS_EXPANSION_FUTURE_PAST = ['fp-7', 'fp-8', 'fp-9']
const BOOK_ACTIONS_COUNT = 3
const COMPETENCY_TILES_TOTAL = 12
const COMPETENCY_TILES_EXPANSION_FUTURE_PAST = ['fp-13', 'fp-14', 'fp-15', 'fp-16', 'fp-17']
const COMPETENCY_TILES_COUNT = 12
const INNOVATION_TILES_TOTAL = 18
const INNOVATION_TILES_EXPANSION_FUTURE_PAST = ['fp-19', 'fp-20', 'fp-21']
const INNOVATION_TILES_COUNT_2PLAYER = 6
const INNOVATION_TILES_COUNT_3PLAYER = 8
const PALACE_TILES_TOTAL = 16
const PALACE_TILES_EXPANSION_FUTURE_PAST = ['fp-18', 'fp-19', 'fp-20']
const PALACE_TILES_COUNT_2PLAYER = 2
const PALACE_TILES_COUNT_3PLAYER = 3

/**
 * Picks random tiles from the base pool (1..baseTotal), adding the expansion tiles to the pool when enabled.
 */
function randomTiles(baseTotal: number, expansionTiles: string[], count: number, withExpansion: boolean) : string[] {
  const pool : string[] = []
  for (let i = 1; i <= baseTotal; i++) {
    pool.push(`${i}`)
  }
  if (withExpansion) {
    pool.push(...expansionTiles)
  }
  return rollDiceMultiDifferentValue(pool.length, count).map(index => pool[index - 1])
}

export default defineComponent({
  name: 'OtherTilesSetup',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const { setup } = state

    const totalPlayerCount = state.setup.playerSetup.botCount + state.setup.playerSetup.playerCount
    const innovationTilesCount = totalPlayerCount == 2 ? INNOVATION_TILES_COUNT_2PLAYER : INNOVATION_TILES_COUNT_3PLAYER
    const palaceTilesCount = totalPlayerCount == 2 ? PALACE_TILES_COUNT_2PLAYER : PALACE_TILES_COUNT_3PLAYER
    const withExpansion = (setup.expansions ?? []).includes(Expansion.FUTURE_PAST)

    setup.setupBookActions = setup.setupBookActions ?? randomTiles(BOOK_ACTIONS_TOTAL, BOOK_ACTIONS_EXPANSION_FUTURE_PAST, BOOK_ACTIONS_COUNT, withExpansion)
    setup.setupCompetencyTiles = setup.setupCompetencyTiles ?? randomTiles(COMPETENCY_TILES_TOTAL, COMPETENCY_TILES_EXPANSION_FUTURE_PAST, COMPETENCY_TILES_COUNT, withExpansion)
    setup.setupInnovationTiles = setup.setupInnovationTiles ?? randomTiles(INNOVATION_TILES_TOTAL, INNOVATION_TILES_EXPANSION_FUTURE_PAST, innovationTilesCount, withExpansion)
    setup.setupPalaceTiles = setup.setupPalaceTiles ?? randomTiles(PALACE_TILES_TOTAL, PALACE_TILES_EXPANSION_FUTURE_PAST, palaceTilesCount, withExpansion)

    return { t, state, setup, totalPlayerCount, innovationTilesCount, palaceTilesCount, withExpansion }
  },
  methods: {
    randomizeOtherTiles() : void {
      this.setup.setupBookActions = randomTiles(BOOK_ACTIONS_TOTAL, BOOK_ACTIONS_EXPANSION_FUTURE_PAST, BOOK_ACTIONS_COUNT, this.withExpansion)
      this.setup.setupCompetencyTiles = randomTiles(COMPETENCY_TILES_TOTAL, COMPETENCY_TILES_EXPANSION_FUTURE_PAST, COMPETENCY_TILES_COUNT, this.withExpansion)
      this.setup.setupInnovationTiles = randomTiles(INNOVATION_TILES_TOTAL, INNOVATION_TILES_EXPANSION_FUTURE_PAST, this.innovationTilesCount, this.withExpansion)
      this.setup.setupPalaceTiles = randomTiles(PALACE_TILES_TOTAL, PALACE_TILES_EXPANSION_FUTURE_PAST, this.palaceTilesCount, this.withExpansion)
    }
  }
})
</script>

<style lang="scss" scoped>
.tilesContainerWrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
.bookActions {
  position: relative;
  height: 75px;
  width: 400px;
  .background {
    position: absolute;
    width: 400px;
    opacity: 50%;
    border-radius: 5px;
    z-index: -100;
    filter: drop-shadow(2px 2px 2px #888);
  }
  .tile {
    width: 118px;
    margin-top: 7px;
    margin-left: 7px;
    margin-right: 9px;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
.palaceTiles .tile {
  width: 130px;
  margin-right: 10px;
  filter: drop-shadow(2px 2px 2px #888);
}
.innovation {
  position: relative;
  width: 600px;
  height: 300px;
  .background {
    position: absolute;
    width: 600px;
    opacity: 50%;
    z-index: -100;
    filter: drop-shadow(2px 2px 2px #888);
  }
  .tile {
    width: 125px;
    margin-top: 24px;
    margin-left: 8px;
    margin-right: 18px;
  }
  &.player2 {
    .tile.row1 {
      margin-top: 48px;
      margin-left: 90px;
      margin-right: 82px;
    }
    .tile.row2 {
      margin-top: 80px;
      margin-left: 11px
    }
    .tile:nth-child(2), .tile:nth-child(6) {
      margin-right: 0;
    }
  }
  &.player3 {
    .tile.row1 {
      margin-top: 90px;
    }
    .tile:nth-child(4n) {
      margin-right: 0;
    }
  }
}
.competency {
  position: relative;
  width: 600px;
  height: 350px;
  margin-top: -25px;
  .background {
    position: absolute;
    width: 600px;
    opacity: 50%;
    z-index: -150;
    filter: drop-shadow(2px 2px 2px #888);
  }
  .tile {
    width: 74px;
    margin-top: 16px;
    margin-left: 65px;
    margin-right: 9px;
    &:nth-child(4n-2) {
      margin-left: 58px;
    }
    &.row1 {
      margin-top: 80px;
    }
  }
}
</style>
