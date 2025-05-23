<template>
  <div class="float-end">{{t('roundTurn.turnInfo', {round:round, turn:turn})}}</div>
  <h1>
    <AppIcon v-if="navigationState.playerTerrain" type="terrain" :name="navigationState.playerTerrain" extension="webp" class="terrainIcon"/>
    {{t('roundTurn.titlePlayer', {player}, playerCount)}}
  </h1>

  <p class="mt-4" v-html="t('playerTurn.text')"></p>

  <button class="btn btn-primary btn-lg mt-4" tag="button" @click="next">
    {{t('action.next')}}
  </button>
  <button class="btn btn-outline-danger btn-lg mt-4 ms-2" data-bs-toggle="modal" data-bs-target="#passModal">
    {{t('action.pass')}}
  </button>

  <ModalDialog id="passModal" :title="t('action.pass')">
    <template #body>
      <p v-html="t('playerTurn.passConfirm')"></p>
      <p v-if="round == 6" v-html="t('playerTurn.passInfoRound6')"></p>
      <p v-else v-html="t('playerTurn.passInfo')"></p>
    </template>
    <template #footer>
      <button class="btn btn-danger" @click="pass" data-bs-dismiss="modal">{{t('action.pass')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import RouteCalculator from '@/services/RouteCalculator'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'RoundTurnPlayer',
  components: {
    FooterButtons,
    ModalDialog,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, turnOrderIndex, player, playerCount } = navigationState
    const routeCalculator = new RouteCalculator({round, turn, turnOrderIndex, player})

    return { t, navigationState, state, routeCalculator, round, turn, player, playerCount }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    }
  },
  methods: {
    next() : void {
      this.nextWithPassed(false)
    },
    pass() : void {
      this.nextWithPassed(true)
    },
    nextWithPassed(passed : boolean) {
      this.state.storeRoundTurn({
        round:this.navigationState.round,
        turn:this.navigationState.turn,
        turnOrderIndex:this.navigationState.turnOrderIndex,
        player:this.navigationState.player,
        pass: passed ? true : undefined
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