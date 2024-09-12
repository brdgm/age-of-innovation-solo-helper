<template>
  <div class="actionCol">
    <AppIcon v-if="isDruids || isPowerMongers" type="action" name="advance-science-discipline-no-priest" class="actionIcon"/>
    <AppIcon v-else type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol">
    <SupportInfo :bot-action="botAction" :directional-selection="true" :science-discipline-selection="true"/>
  </div>
  <div class="actionCol text-muted small">
    <ol>
      <li v-if="isDruids"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.sendScholar.factionDruids')"></span></li>
      <li v-if="isPowerMongers"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.sendScholar.factionPowerMongers')"></span></li>
      <li v-html="t('botAction.sendScholar.canAdvance')"></li>
      <SendScholarTrackSelection :bot-action="botAction"/>
      <li v-html="t('botAction.sendScholar.execute.title')"></li>
      <ol type="a">
        <li v-html="t('botAction.sendScholar.execute.placeScholar')"></li>
        <li v-html="t('botAction.sendScholar.execute.noScholar')"></li>
      </ol>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import AppIcon from '@/components/structure/AppIcon.vue'
import SupportInfo from '../supportInfo/SupportInfo.vue'
import SendScholarTrackSelection from './SendScholarTrackSelection.vue'
import BotFaction from '@/services/enum/BotFaction'

export default defineComponent({
  name: 'ActionSendScholar',
  inheritAttrs: false,
  components: {
    AppIcon,
    SupportInfo,
    SendScholarTrackSelection
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    }
  },
  computed: {
    botFaction() : BotFaction|undefined {
      return this.botAction.botFaction
    },
    isDruids() : boolean {
      return this.botFaction == BotFaction.DRUIDS
    },
    isPowerMongers() : boolean {
      return this.botFaction == BotFaction.POWERMONGERS
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
.factionActionIcon {
  height: 1.3rem;
  margin-right: 0.2rem;
}
</style>
