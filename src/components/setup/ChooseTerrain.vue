<template>
  <div class="terrainSelection">
    <div class="form-check form-check-inline" v-for="terrain in terrains" :key="terrain">
      <label class="form-check-label" :data-testid="`terrain-${terrain}`">
        <input class="form-check-input" type="radio" :name="inputName" v-model="selectedTerrain" :value="terrain">
        <AppIcon type="terrain" :name="terrain" extension="webp" class="terrainIcon"/>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '../structure/AppIcon.vue'
import Terrain from '@/services/enum/Terrain'
import { uniqueId } from 'lodash'

export default defineComponent({
  name: 'ChooseTerrain',
  emits: ['update:modelValue'],
  components: {
    AppIcon
  },
  props: {
    modelValue: {
      type: String as PropType<Terrain>,
      required: false
    }
  },
  data() {
    return {
      selectedTerrain: this.modelValue
    }
  },
  computed: {
    terrains() : Terrain[] {
      return Object.values(Terrain)
    },
    inputName() : string {
      return uniqueId()
    }
  },
  watch: {
    selectedTerrain: {
      handler(newValue) {
        this.$emit('update:modelValue', newValue)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.terrainSelection .form-check-label {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
}
.terrainIcon {
  margin: 0.25rem;
  height: 1.75rem;
  filter: drop-shadow(2px 2px 2px #888);
  cursor: pointer;
}
</style>