<template>
  <div class="actionCol">
    <AppIcon v-if="isDruids" type="action" name="advance-science-discipline-2" class="actionIcon"/>
    <AppIcon v-else type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol">
    <SupportInfo :bot-action="botAction" :directional-selection="true"/>
  </div>
  <div class="actionCol text-muted small">
    <ol>
      <li v-if="isDruids"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.advanceScienceDiscipline.factionDruids')"></span></li>
      <li v-if="isPowerMongers"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.advanceScienceDiscipline.factionPowerMongers')"></span></li>
      <li v-html="t('botAction.advanceScienceDiscipline.canAdvance')"></li>
      <SendScholarTrackSelection :bot-action="botAction"/>
      <li v-html="t('botAction.advanceScienceDiscipline.execute.title')"></li>
      <ol type="a">
        <li v-if="isDruids" v-html="t('botAction.advanceScienceDiscipline.execute.factionDruids')"></li>
        <li v-else v-html="t('botAction.advanceScienceDiscipline.execute.advance')"></li>
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
  name: 'ActionAdvanceScienceDiscipline',
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
