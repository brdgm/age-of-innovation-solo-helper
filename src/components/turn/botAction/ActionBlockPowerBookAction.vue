<template>
  <div class="actionCol">
    <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol">
    <SupportInfo :bot-action="botAction" :directional-selection="true"/>
  </div>
  <div class="actionCol text-muted small">
    <ol>
      <li v-html="t('botAction.blockPowerBookAction.power.gameBoard')"></li>
      <ol type="a">
        <li v-html="t('botAction.blockPowerBookAction.power.directionalSelection')"></li>
        <li v-html="t('botAction.blockPowerBookAction.power.gameBoardExecute')"></li>
      </ol>
      <li v-html="t('botAction.blockPowerBookAction.book.gameBoard')"></li>
      <ol type="a">
        <li v-html="t('botAction.blockPowerBookAction.book.directionalSelection')"></li>
        <li v-html="t('botAction.blockPowerBookAction.book.gameBoardExecute')"></li>
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
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'ActionBlockPowerBookAction',
  inheritAttrs: false,
  components: {
    AppIcon,
    SupportInfo
  },
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
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
</style>
