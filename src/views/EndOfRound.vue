<template>
  <template v-if="isLastRound">
    <EndOfGame/>
  </template>
  <template v-else>
    <div class="float-end">{{t('endOfRound.turnInfo', {round})}}</div>
    <h1>{{t('endOfRound.title')}}</h1>

    <ol>
      <li v-html="t('endOfRound.scienceBonus')"></li>
      <li v-html="t('endOfRound.returnActionTokens')"></li>
      <li v-html="t('endOfRound.bonusCardsCoin')"></li>
      <li v-html="t('endOfRound.removeScoringTile')"></li>
    </ol>

    <button class="btn btn-primary btn-lg mt-4" @click="next()">
      {{t(isLastRound ? 'endOfGame.title' : 'action.nextRound')}}
    </button>
  </template>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" :endGameButtonType="isLastRound ? 'endGame' : 'abortGame'"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import RouteCalculator from '@/services/RouteCalculator'
import { useStateStore } from '@/store/state'
import getPlayerOrder from '@/util/getPlayerOrder'
import EndOfGame from '@/components/turn/EndOfGame.vue'

export default defineComponent({
  name: 'EndOfRound',
  components: {
    FooterButtons,
    EndOfGame
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round } = navigationState

    const routeCalculator = new RouteCalculator({round})

    return { t, state, navigationState, round, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getLastTurnRouteTo(this.state)
    },
    isLastRound() : boolean {
      return this.round == 6
    }
  },
  methods: {
    next() : void {
      // prepare next round with new player order
      const playerOrder = getPlayerOrder(this.state, this.round)
      this.state.storeRound({
        round: this.round+1,
        playerOrder,
        turns: []
      })
      this.$router.push(`/round/${this.round+1}/income`)
    }
  }
})
</script>

<style lang="scss" scoped>
ol > li {
  margin-top: 0.5rem;
}
</style>
