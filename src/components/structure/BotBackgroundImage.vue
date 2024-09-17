<template>
  <AppIcon type="bot-faction" :name="botFaction" extension="webp" class="botImage" :style="{opacity:opacityPercent/100}"/>
</template>

<script lang="ts">
import BotFaction from '@/services/enum/BotFaction'
import { defineComponent, PropType } from 'vue'
import AppIcon from './AppIcon.vue'

export default defineComponent({
  name: 'BotBackgroundImage',
  components: {
    AppIcon
  },
  props: {
    botFaction: {
      type: String as PropType<BotFaction>,
      required: true
    },
    opacityPercent: {
      type: Number,
      default: 20
    }
  }
})
</script>

<style lang="scss" scoped>
.botImage {
  position: fixed;
  right: 0px;
  bottom: 30px;
  max-height: 400px;
  max-width: 80%;
  overflow: hidden;
  z-index: -50;
  @media (max-width: 900px) {
    max-height: 300px;
  }
  @media (max-width: 600px) {
    max-height: 200px;
  }
}
</style>
