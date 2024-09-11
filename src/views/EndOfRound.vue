<template>
  <div class="float-end">{{t('endOfRound.turnInfo', {round})}}</div>
  <h1>{{t('endOfRound.title')}}</h1>

  <ol>
    <li v-html="t('endOfRound.cultBonuses')"></li>
    <li v-html="t('endOfRound.returnActionTokens')"></li>
    <li v-html="t('endOfRound.bonusCardsCoin')"></li>
    <li v-html="t('endOfRound.removeScoringTile')"></li>
  </ol>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.nextRound')}}
  </router-link>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import RouteCalculator from '@/services/RouteCalculator'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'EndOfRound',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route)
    const { round } = navigationState

    const routeCalculator = new RouteCalculator({round})

    return { t, state, navigationState, round, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getLastTurnRouteTo(this.state)
    },
    nextButtonRouteTo() : string {
      return `/round/${this.round+1}/income`
    }
  }
})
</script>
