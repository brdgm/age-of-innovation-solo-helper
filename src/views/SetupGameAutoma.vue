<template>
  <h1>{{t('setupGameAutoma.title')}}</h1>

  <div class="instructions">
    <AutomaSetup/>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame">
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
  methods: {
    startGame() : void {
      this.state.resetGame()
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
