<template>
  <div class="actionCol">
    <div class="count">{{botAction.victoryPoints}}</div>
    <AppIcon type="action" name="gain-victory-points" class="actionIcon"/>
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
.count {
  position: absolute;
  width: 4.9rem;
  margin-top: -0.5rem;
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 10px #000, 1px 1px 10px #000;
}
</style>
