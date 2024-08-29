<template>
  <template v-if="isScoringTileScienceDisciplineSelection">
    <li v-html="t('botAction.advanceScienceDiscipline.scoringTile.title')"></li>
    <li v-html="t('botAction.advanceScienceDiscipline.catchUp.otherwiseTitle')"></li>
  </template>
  <template v-else>
    <li v-html="t('botAction.advanceScienceDiscipline.catchUp.title')"></li>
  </template>
  <ol type="a">
    <li v-html="t('botAction.advanceScienceDiscipline.catchUp.marketAt0')"></li>
    <li v-if="isMultipleHumanPlayers" v-html="t('botAction.advanceScienceDiscipline.catchUp.highestMarkerMultipleHumans')"></li>
    <li v-else v-html="t('botAction.advanceScienceDiscipline.catchUp.highestMarker')"></li>
    <li v-html="t('botAction.advanceScienceDiscipline.catchUp.directionalSelection')"></li>
  </ol>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import ScienceDisciplineSelection from '@/services/enum/ScienceDisciplineSelection'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'AdvanceScienceDisciplineTrackSelection',
  inheritAttrs: false,
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    }
  },
  computed: {
    isScoringTileScienceDisciplineSelection() : boolean {
      return this.botAction.scienceDisciplineSelection == ScienceDisciplineSelection.SCORING_TILE
    },
    isMultipleHumanPlayers() : boolean {
      return this.state.setup.playerSetup.playerCount > 1
    }
  }
})
</script>
