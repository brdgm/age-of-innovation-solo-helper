<template>
  <div class="actionCol">
    <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol">
    <SupportInfo :bot-action="botAction" :directional-selection="true" :science-discipline-selection="true"/>
  </div>
  <div class="actionCol text-muted small">
    <ol>
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
