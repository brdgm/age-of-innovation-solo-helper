<template>
  <h1>{{t('setupGameAutoma.title')}}</h1>

  <div class="instructions">
    <AutomaSetup @playerTerrain="value => playerTerrain = value" @botTerrain="value => botTerrain = value"/>
  </div>

  <div class="container-fluid" v-if="!isValidTerrainSelection">
    <div class="row">
      <div class="col alert alert-warning mt-2">
        {{t('setupGameAutoma.invalidTerrainSelection')}}
      </div>
    </div>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame" :disabled="!isValidTerrainSelection">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGameTiles" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import AutomaSetup from '@/components/setup/AutomaSetup.vue'
import { PlayerOrder, useStateStore } from '@/store/state'
import Terrain from '@/services/enum/Terrain'

export default defineComponent({
  name: 'SetupGameAutoma',
  components: {
    AutomaSetup,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      botTerrain: [] as (Terrain|undefined)[],
      playerTerrain: [] as (Terrain|undefined)[],
    }
  },
  computed: {
    isValidTerrainSelection() : boolean {
      const { playerCount, botCount } = this.state.setup.playerSetup
      const allTerrains = [...this.playerTerrain.slice(0, playerCount), ...this.botTerrain.slice(0, botCount)]
      // ensure no missing terrain
      if (allTerrains.some(terrain => terrain === undefined)) {
        return false
      }
      // ensure no duplicate terrain
      if (new Set(allTerrains).size !== playerCount + botCount) {
        return false
      }
      return true
    }
  },
  methods: {
    startGame() : void {
      this.state.setup.playerTerrain = this.playerTerrain.filter(terrain => terrain !== undefined)
      this.state.setup.botTerrain = this.botTerrain.filter(terrain => terrain !== undefined)
      // prepare first round with initial player order
      const { playerCount, botCount } = this.state.setup.playerSetup
      const playerOrder : PlayerOrder[] = []
      for (let player = 1; player<=playerCount; player++) {
        playerOrder.push({ player })
      }
      for (let bot = 1; bot<=botCount; bot++) {
        playerOrder.push({ bot })
      }
      this.state.storeRound({
        round: 1,
        playerOrder,
        turns: []
      })
      // start first round
      this.$router.push('/round/1/income')
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
}
</style>
