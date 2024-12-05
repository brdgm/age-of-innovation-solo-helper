<template>
  <h4>{{t('setupTiles.roundScore.title')}}</h4>
  <div v-html="t('setupTiles.roundScore.intro')"></div>
  <div class="roundScoreTiles mb-2">
    <img src="@/assets/round-score-tile-background.webp" alt="" class="background"/>
    <AppIcon v-for="(tile,index) of setup.roundScoreTiles" :key="tile" type="round-score" extension="webp"
        :name="`${tile}-${index < 3 ? '123' : '456'}`" class="roundScoreTileIcon"/><br/>
    <AppIcon type="round-score-final" extension="webp" :name="`${setup.roundScoreFinalTile}`" class="roundScoreFinalTileIcon overlay"/>
  </div>
  <button class="btn btn-sm btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#roundScoreTilesModal">{{t('setupTiles.roundScore.select')}}</button>
  <button class="btn btn-sm btn-secondary me-2" @click="randomizeRoundScoreTiles">{{t('action.randomize')}}</button>

  <h4 class="mt-3">{{t('setupTiles.other.title')}}</h4>

  <div>
    <button class="btn btn-outline-secondary me-2 mb-2" data-bs-toggle="collapse" data-bs-target="#randomizedSetup">
      {{t('setupTiles.other.randomizer')}} &#x25BC;      
    </button>
  </div>
  <div class="collapse mt-2" id="randomizedSetup">
    <div class="alert alert-secondary fst-italic">
      <span v-html="t('setupTiles.other.notice')"></span>
      <button class="btn btn-sm btn-secondary ms-2" @click="randomizeOtherTiles">{{t('action.randomize')}}</button>
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
      <button class="btn btn-outline-secondary" @click="roundScoreTilesSelection=[];roundScoreFinalTileSelection=undefined;">{{t('action.reset')}}</button>
      <button class="btn btn-success" data-bs-dismiss="modal" :disabled="!isValidRoundScoreTiles(roundScoreTilesSelection) || !roundScoreFinalTileSelection" @click="setScoringRoundTileSelection">{{t('setupTiles.roundScore.select')}}</button>
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
const PALACE_TILES_COUNT_2PLAYER = 2
const PALACE_TILES_COUNT_3PLAYER = 3

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

    return { t, state, setup, totalPlayerCount, innovationTilesCount, palaceTilesCount,
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
    },
    randomizeOtherTiles() : void {
      this.setup.setupBookActions = rollDiceMultiDifferentValue(BOOK_ACTIONS_TOTAL, BOOK_ACTIONS_COUNT)
      this.setup.setupCompetencyTiles = rollDiceMultiDifferentValue(COMPETENCY_TILES_TOTAL, COMPETENCY_TILES_COUNT)
      this.setup.setupInnovationTiles = rollDiceMultiDifferentValue(INNOVATION_TILES_TOTAL, this.innovationTilesCount)
      this.setup.setupPalaceTiles = rollDiceMultiDifferentValue(PALACE_TILES_TOTAL, this.palaceTilesCount)
    }
  }
})
</script>

<style lang="scss" scoped>
.roundScoreTiles {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
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
.tilesContainerWrapper {
  width: 100%;
  overflow-x: auto;
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
