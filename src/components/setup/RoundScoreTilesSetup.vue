<template>
  <h4>{{t('setupTiles.roundScore.title')}}</h4>
  <div v-html="t('setupTiles.roundScore.intro')"></div>
  <div class="roundScoreTiles mb-2">
    <img src="@/assets/round-score-tile-background.webp" alt="" class="background"/>
    <AppIcon v-for="(tile,index) of setup.roundScoreTiles" :key="tile" type="round-score" extension="webp"
        :name="`${tile}-${index < 3 ? '123' : '456'}`" class="roundScoreTileIcon"/><br/>
    <AppIcon type="round-score-final" extension="webp" :name="`${setup.roundScoreFinalTile}`" class="roundScoreFinalTileIcon overlay"/>
  </div>
  <button type="button" class="btn btn-sm btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#roundScoreTilesModal">{{t('setupTiles.roundScore.select')}}</button>
  <button type="button" class="btn btn-sm btn-secondary me-2" @click="randomizeRoundScoreTiles">{{t('action.randomize')}}</button>

  <ModalDialog id="roundScoreTilesModal" :title="t('setupTiles.roundScore.title')" :size-lg="true">
    <template #body>
      {{t('setupTiles.roundScore.available')}}<br/>
      <AppIcon v-for="tile of roundScoreTilesAllWithoutSelection" :key="tile" type="round-score" extension="webp" :name="`${tile}-123`"
          class="roundScoreTileIcon select" @click="selectScoringRoundTile(tile)"/><br/>
      <AppIcon v-for="tile of roundScoreFinalTilesAllWithoutSelection" :key="tile" type="round-score-final" extension="webp" :name="`${tile}`"
          class="roundScoreFinalTileIcon select" @click="selectScoringRoundFinalTile(tile)"/>
      <hr/>
      {{t('setupTiles.roundScore.selected')}}<br/>
      <AppIcon v-for="(tile,index) of roundScoreTilesSelection" :key="tile" type="round-score" extension="webp" :name="`${tile}-${index < 3 ? '123' : '456'}`"
          class="roundScoreTileIcon select" @click="deselectScoringRoundTile(tile)"/>
      <AppIcon v-if="roundScoreFinalTileSelection" type="round-score-final" extension="webp" :name="`${roundScoreFinalTileSelection}`" class="roundScoreFinalTileIcon select"
          @click="roundScoreFinalTileSelection=undefined"/>
      <p v-if="roundScoreTilesSelection.length == 0 && !roundScoreFinalTileSelection" class="fst-italic">
        {{t('setupTiles.roundScore.none')}}
      </p>
    </template>
    <template #footer>
      <button type="button" class="btn btn-outline-secondary" @click="roundScoreTilesSelection=[];roundScoreFinalTileSelection=undefined;">{{t('action.reset')}}</button>
      <button type="button" class="btn btn-success" data-bs-dismiss="modal" :disabled="!isValidRoundScoreTiles(roundScoreTilesSelection) || !roundScoreFinalTileSelection" @click="setScoringRoundTileSelection">{{t('setupTiles.roundScore.select')}}</button>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'
import rollDiceMultiDifferentValue from '@brdgm/brdgm-commons/src/util/random/rollDiceMultiDifferentValue'
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import { range } from 'lodash'
import getRoundScoreTile from '@/util/getRoundScoreTile'

const ROUND_SCORE_TILES_TOTAL = 12
const ROUND_SCORE_TILES_COUNT = 6
const ROUND_SCORE_FINAL_TILES_TOTAL = 4

function isValidRoundScoreTiles(tiles : number[]) : boolean {
  return tiles.length == ROUND_SCORE_TILES_COUNT
      // round 5, 6 must not have a spade action
      && !(getRoundScoreTile(tiles[4]).hasSpade || getRoundScoreTile(tiles[5]).hasSpade)
}

export default defineComponent({
  name: 'RoundScoreTilesSetup',
  components: {
    AppIcon,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const { setup } = state

    const getRandomValidRoundScoreTiles = function() : number[] {
      const result = rollDiceMultiDifferentValue(ROUND_SCORE_TILES_TOTAL, ROUND_SCORE_TILES_COUNT)
      if (!isValidRoundScoreTiles(result)) {
        return getRandomValidRoundScoreTiles()
      }
      return result
    }

    setup.roundScoreTiles = setup.roundScoreTiles ?? getRandomValidRoundScoreTiles()
    setup.roundScoreFinalTile = setup.roundScoreFinalTile ?? rollDice(ROUND_SCORE_FINAL_TILES_TOTAL)
    const roundScoreTilesSelection = ref([] as number[])
    const roundScoreFinalTileSelection = ref(undefined as number|undefined)

    return { t, state, setup, roundScoreTilesSelection, roundScoreFinalTileSelection,
        isValidRoundScoreTiles, getRandomValidRoundScoreTiles }
  },
  computed: {
    roundScoreTilesAllWithoutSelection() : number[] {
      return range(1, ROUND_SCORE_TILES_TOTAL+1).filter(tile => !this.roundScoreTilesSelection.includes(tile))
    },
    roundScoreFinalTilesAllWithoutSelection() : number[] {
      return range(1, ROUND_SCORE_FINAL_TILES_TOTAL+1).filter(tile => tile != this.roundScoreFinalTileSelection)
    }
  },
  methods: {
    randomizeRoundScoreTiles() : void {
      this.setup.roundScoreTiles = this.getRandomValidRoundScoreTiles()
      this.setup.roundScoreFinalTile = rollDice(ROUND_SCORE_FINAL_TILES_TOTAL)
      this.roundScoreTilesSelection = []
      this.roundScoreFinalTileSelection = undefined
    },
    selectScoringRoundTile(tile: number) : void {
      if (this.roundScoreTilesSelection.length < ROUND_SCORE_TILES_COUNT) {
        this.roundScoreTilesSelection.push(tile)
      }
    },
    deselectScoringRoundTile(tile: number) : void {
      this.roundScoreTilesSelection = this.roundScoreTilesSelection.filter(t => t != tile)
    },
    selectScoringRoundFinalTile(tile: number) : void {
      this.roundScoreFinalTileSelection = tile
    },
    setScoringRoundTileSelection() : void {
      this.setup.roundScoreTiles = this.roundScoreTilesSelection
      this.setup.roundScoreFinalTile = this.roundScoreFinalTileSelection
    }
  }
})
</script>

<style lang="scss" scoped>
.roundScoreTiles {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  height: 498px;
  .background {
    position: absolute;
    width: 150px;
    opacity: 50%;
    border-radius: 5px;
    z-index: -100;
    filter: drop-shadow(2px 2px 2px #888);
  }
}
.roundScoreTileIcon {
  width: 130px;
  margin-left: 10px;
  margin-bottom: 8px;
  object-fit: contain;
  &.select {
    cursor: pointer;
  }
}
.roundScoreFinalTileIcon {
  width: 65px;
  margin-left: 10px;
  margin-bottom: 8px;
  &.overlay {
    position: absolute;
    left: 66px;
    top: 24px;
  }
  &.select {
    cursor: pointer;
  }
}
</style>
