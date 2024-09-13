<template>
  <div class="float-end">
    {{t('income.turnInfo', {round:round})}}
  </div>
  <h1>{{t('income.title')}}</h1>

  <p v-html="t('income.collect')"></p>

  <p v-if="navigationState.isTwoPlayerGame && round == 6" v-html="t('income.twoPlayer')"></p>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'
import RouteCalculator from '@/services/RouteCalculator'

export default defineComponent({
  name: 'RoundIncome',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const route = useRoute()

    const navigationState = new NavigationState(route, state)
    const { round } = navigationState

    const routeCalculator = new RouteCalculator({round})

    return { t, state, round, navigationState, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.round > 1) {
        return `/round/${this.round-1}/end`
      }
      return ''
    },
    nextButtonRouteTo() : string {
      return this.routeCalculator.getFirstTurnRouteTo(this.state)
    }
  }
})
</script>
