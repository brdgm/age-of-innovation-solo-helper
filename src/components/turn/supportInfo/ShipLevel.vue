<template>
  <div>
    <AppIcon type="ship-level" :name="shipLevel.toString()" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'ShipLevel',
  components: {
    AppIcon
  },
  props: {
    shipLevel: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  margin-top: 0.25rem;
  width: 2rem;
}
</style>
