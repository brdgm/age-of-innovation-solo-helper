<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <EndOfGame :round="round"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import EndOfGame from '@/components/turn/EndOfGame.vue'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons,
    EndOfGame
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()

    const navigationState = new NavigationState(route)
    const { round } = navigationState

    return { t, navigationState, round }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/round/${this.round}/end`
    }
  }
})
</script>
