<template>
  <p v-html="t('setupTiles.intro')"></p>
  <ol>
    <li v-html="t('setupTiles.gameBoard', {playerCount:gameBoardPlayerCount})"></li>
    <li v-html="t('setupTiles.federationTokens')"></li>
    <li>
      <span v-html="t('setupTiles.scoringRoundTiles')"></span>:<br/>
      <AppIcon v-for="(tile,index) of setup.roundScoreTiles" :key="tile" type="round-score" extension="webp"
          :name="`${tile}-${index < 3 ? '123' : '456'}`" class="scoringRoundTileIcon"/><br/>
      <button class="btn btn-sm btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#roundScoreTilesModal">{{t('setupTiles.select')}}</button>
      <button class="btn btn-sm btn-secondary me-2" @click="randomizeRoundScoreTiles">{{t('action.randomize')}}</button>
    </li>
  </ol>

  <div>
    <button class="btn btn-outline-secondary me-2 mb-2" data-bs-toggle="collapse" data-bs-target="#randomizedSetup">
      {{t('setupTiles.tileRandomizer.title')}} &#x25BC;      
    </button>
  </div>
  <div class="collapse mt-2" id="randomizedSetup">
    <div class="alert alert-secondary fst-italic">
      <span v-html="t('setupTiles.tileRandomizer.notice')"></span>
      <button class="btn btn-sm btn-secondary ms-2" @click="randomizeOtherTiles">{{t('action.randomize')}}</button>
    </div>

    <h5 v-html="t('setupTiles.tileRandomizer.roundBoosters')"></h5>
    <AppIcon v-for="id of setup.setupRoundBonusTiles" :key="id" type="round-bonus" :name="`${id}`" extension="webp" class="roundBoosterTile"/>

    <h5 v-html="t('setupTiles.tileRandomizer.researchBoard')"></h5>
    <div class="researchBoardWrapper">
      <div class="researchBoard">
        <img src="@/assets/gameboard.webp" alt="" class="background"/>
        <div class="techAdvanced">
          <template v-for="(id,index) of setup.setupInnovationTiles" :key="id">
            <AppIcon type="innovation" :name="`${id}`" extension="webp" class="tile"/>
          </template> 
        </div>
        <div class="techStandard">
          <template v-for="(id,index) of setup.setupInnovationTiles" :key="id">
            <AppIcon type="competency" :name="`${id}`" class="tile" :class="{'column': index < 6, 'common': index >= 6}"/>
          </template>
        </div>
      </div>
    </div>
  </div>

  <ModalDialog id="roundScoreTilesModal" :title="t('setupTiles.scoringRoundTiles')" :size-lg="true">
    <template #body>
      {{t('setupTiles.available')}}<br/>
      <AppIcon v-for="tile of roundScoreTilesAllWithoutSelection" :key="tile" type="round-score" extension="webp" :name="`${tile}-123`"
          class="scoringRoundTileIcon select" @click="selectScoringRoundTile(tile)"/>
      <hr/>
      {{t('setupTiles.selected')}}<br/>
      <AppIcon v-for="(tile,index) of roundScoreTilesSelection" :key="tile" type="round-score" extension="webp" :name="`${tile}-${index < 3 ? '123' : '456'}`"
          class="scoringRoundTileIcon select" @click="deselectScoringRoundTile(tile)"/>
      <p v-if="roundScoreTilesSelection.length == 0" class="fst-italic">
        {{t('setupTiles.none')}}
      </p>
    </template>
    <template #footer>
      <button class="btn btn-outline-secondary" @click="roundScoreTilesSelection=[]">{{t('action.reset')}}</button>
      <button class="btn btn-success" data-bs-dismiss="modal" :disabled="!isValidRoundScoreTiles(roundScoreTilesSelection)" @click="setScoringRoundTileSelection">{{t('setupTiles.select')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
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
const BOOK_ACTIONS_TOTAL = 6
const BOOK_ACTIONS_COUNT = 3
const COMPETENCY_TILES_TOTAL = 12
const COMPETENCY_TILES_COUNT = 12
const INNOVATION_TILES_TOTAL = 18
const INNOVATION_TILES_COUNT_2PLAYER = 6
const INNOVATION_TILES_COUNT_3PLAYER = 8
const PALACE_TILES_TOTAL = 16
const PALACE_TILES_COUNT_2PLAYER = 3
const PALACE_TILES_COUNT_3PLAYER = 4
const ROUND_BONUS_TILES_TOTAL = 10

export default defineComponent({
  name: 'TilesSetup',
  components: {
    AppIcon,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const { setup } = state

    const totalPlayerCount = state.setup.playerSetup.botCount + state.setup.playerSetup.playerCount
    const innovationTilesCount = totalPlayerCount == 2 ? INNOVATION_TILES_COUNT_2PLAYER : INNOVATION_TILES_COUNT_3PLAYER
    const palaceTilesCount = totalPlayerCount == 2 ? PALACE_TILES_COUNT_2PLAYER : PALACE_TILES_COUNT_3PLAYER
    const roundBonusCount = totalPlayerCount + 3

    const isValidRoundScoreTiles = function(tiles : number[]) : boolean {      
      return tiles.length == ROUND_SCORE_TILES_COUNT
          // round 5, 6 must not have a spade action
          && !(getRoundScoreTile(tiles[4]).hasSpade || getRoundScoreTile(tiles[5]).hasSpade)
    }
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

    setup.setupBookActions = setup.setupBookActions ?? rollDiceMultiDifferentValue(BOOK_ACTIONS_TOTAL, BOOK_ACTIONS_COUNT)
    setup.setupCompetencyTiles = setup.setupCompetencyTiles ?? rollDiceMultiDifferentValue(COMPETENCY_TILES_TOTAL, COMPETENCY_TILES_COUNT)
    setup.setupInnovationTiles = setup.setupInnovationTiles ?? rollDiceMultiDifferentValue(INNOVATION_TILES_TOTAL, innovationTilesCount)
    setup.setupPalaceTiles = setup.setupPalaceTiles ?? rollDiceMultiDifferentValue(PALACE_TILES_TOTAL, palaceTilesCount)
    setup.setupRoundBonusTiles = setup.setupRoundBonusTiles ?? rollDiceMultiDifferentValue(ROUND_BONUS_TILES_TOTAL, roundBonusCount)

    return { t, state, setup, totalPlayerCount, innovationTilesCount, palaceTilesCount, roundBonusCount,
        roundScoreTilesSelection, roundScoreFinalTileSelection,
        isValidRoundScoreTiles, getRandomValidRoundScoreTiles }
  },
  computed: {
    gameBoardPlayerCount(): string {
      if (this.totalPlayerCount > 2) {
        return '3-4'
      }
      else {
        return '1-2'
      }
    },
    roundScoreTilesAllWithoutSelection() : number[] {
      return range(ROUND_SCORE_TILES_TOTAL).filter(tile => !this.roundScoreTilesSelection.includes(tile))
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
    },
    randomizeOtherTiles() : void {
      this.setup.setupBookActions = rollDiceMultiDifferentValue(BOOK_ACTIONS_TOTAL, BOOK_ACTIONS_COUNT)
      this.setup.setupCompetencyTiles = rollDiceMultiDifferentValue(COMPETENCY_TILES_TOTAL, COMPETENCY_TILES_COUNT)
      this.setup.setupInnovationTiles = rollDiceMultiDifferentValue(INNOVATION_TILES_TOTAL, this.innovationTilesCount)
      this.setup.setupPalaceTiles = rollDiceMultiDifferentValue(PALACE_TILES_TOTAL, this.palaceTilesCount)
      this.setup.setupRoundBonusTiles = rollDiceMultiDifferentValue(ROUND_BONUS_TILES_TOTAL, this.roundBonusCount)
    }
  }
})
</script>

<style lang="scss" scoped>
li {
  margin-top: 0.5rem;
  li {
    margin-top: 0rem;
  }
}
.scoringRoundTileIcon {
  height: 6rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  &.select {
    cursor: pointer;
  }
}
.scoringFinalTileIcon {
  height: 4rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  &.select {
    cursor: pointer;
  }
}
.roundBoosterTile {
  height: 10rem;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
}
.researchBoardWrapper {
  width: 100%;
  overflow-x: auto;
}
.researchBoard {
  position: relative;
  width: 600px;
  height: calc(600px / 1008px * 539px);
  img {
    filter: drop-shadow(5px 5px 4px #555);
  }
  .background {
    position: absolute;
    width: 600px;
    opacity: 30%;
    border-radius: 5px;
    z-index: -100;
  }
  .federationToken {
    position: absolute;
    height: 4rem;
    left: 5px;
    z-index: 100;
  }
  .techAdvanced {
    .tile {
      margin-top: 50px;
      margin-left: 18.5px;
      width: 81px;
    }
  }
  .techStandard {
    .tile {
      width: 100px;
      margin-top: 35px;
    }
    .tile:nth-child(7), .tile:nth-child(8), .tile:nth-child(9) {
      margin-top: 13px;
    }
    .tile:nth-child(7) {
      margin-left: 36px;
    }
    .tile:nth-child(8) {
      margin-left: 105px;
    }
    .tile:nth-child(9) {
      margin-left: 94px;
    }
  }
}
</style>
