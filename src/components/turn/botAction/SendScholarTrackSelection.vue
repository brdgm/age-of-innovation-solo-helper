<template>
  <template v-if="isScoringTileScienceDisciplineSelection">
    <li v-html="t('botAction.sendScholar.scoringTile.title')"></li>
    <li v-html="t('botAction.sendScholar.catchUp.otherwiseTitle')"></li>
  </template>
  <template v-else>
    <li v-html="t('botAction.sendScholar.catchUp.title')"></li>
  </template>
  <ol type="a">
    <li v-html="t('botAction.sendScholar.catchUp.marketAt0')"></li>
    <li v-if="isMultipleHumanPlayers" v-html="t('botAction.sendScholar.catchUp.highestMarkerMultipleHumans')"></li>
    <li v-else v-html="t('botAction.sendScholar.catchUp.highestMarker')"></li>
    <li v-html="t('botAction.sendScholar.catchUp.directionalSelection')"></li>
  </ol>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import ScienceDisciplineSelection from '@/services/enum/ScienceDisciplineSelection'
import { useStateStore } from '@/store/state'
import Action from '@/services/enum/Action'

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
          && this.botAction.action == Action.SEND_SCHOLAR
    },
    isMultipleHumanPlayers() : boolean {
      return this.state.setup.playerSetup.playerCount > 1
    }
  }
})
</script>
