<template>
  <div class="float-end">{{t('roundTurn.turnInfo', {round, turn})}}</div>
  <h1>
    <AppIcon v-if="navigationState.botTerrain" type="terrain" :name="navigationState.botTerrain" extension="webp" class="terrainIcon"/>
    {{t('roundTurn.titleBot', {bot, faction:t('botFaction.'+botFaction)}, botCount)}}
  </h1>

  <BotTurn :navigationState="navigationState"/>
  <BotBackgroundImage v-if="botFaction" :botFaction="botFaction"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import BotTurn from '@/components/turn/BotTurn.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import RouteCalculator from '@/services/RouteCalculator'
import { useStateStore } from '@/store/state'
import BotBackgroundImage from '@/components/structure/BotBackgroundImage.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'RoundTurnBot',
  components: {
    BotTurn,
    BotBackgroundImage,
    FooterButtons,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, turnOrderIndex, bot, botCount, botFaction } = navigationState
    const routeCalculator = new RouteCalculator({round, turn, turnOrderIndex, bot})

    return { t, navigationState, state, routeCalculator, round, turn, bot, botCount, botFaction }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    }
  },
  methods: {
    next() : void {
      this.state.storeRoundTurn({
        round:this.navigationState.round,
        turn:this.navigationState.turn,
        turnOrderIndex:this.navigationState.turnOrderIndex,
        bot:this.navigationState.bot,
        cardDeck: this.navigationState.cardDeck?.toPersistence(),
        pass: this.navigationState.cardDeck?.isPass() ? true : undefined
      })
      this.$router.push(this.routeCalculator.getNextRouteTo(this.state))
    }
  }
})
</script>

<style lang="scss" scoped>
.terrainIcon {
  height: 2.25rem;
  filter: drop-shadow(2px 2px 2px #888);
  margin-top: -0.5rem;
}
</style>