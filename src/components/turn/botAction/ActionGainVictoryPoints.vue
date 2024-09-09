<template>
  <div class="actionCol">
    <AppIcon type="gain-victory-point" :name="botAction.victoryPoints?.toString() ?? ''" class="actionIcon"/>
  </div>
  <div class="actionCol"></div>
  <div class="actionCol text-muted small">
    <p v-html="t('botAction.gainVictoryPoints.text', {count:botAction.victoryPoints}, botAction.victoryPoints!)"></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'ActionGainVictoryPoints',
  inheritAttrs: false,
  components: {
    AppIcon
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
  width: 5rem;
}
</style>
