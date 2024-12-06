<template>
  <div class="mt-1 mb-1">
    <div v-for="(terrain,index) of terrains" :key="terrain" class="terrain">
      <svg width="30" height="30" viewBox="0 0 100 100" class="arrow" v-if="index > 0">
        <polygon points="25,15 55,50 25,85" fill="#fff" stroke="#000" stroke-width="5px"/>
      </svg>
      <AppIcon type="terrain" :name="terrain" extension="webp" class="terrainIcon"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'
import TerrainPriority from '@/services/enum/TerrainPriority'
import Terrain from '@/services/enum/Terrain'
import getPriorityTerrains from '@/util/getPriorityTerrains'

export default defineComponent({
  name: 'TerrainPriorities',
  components: {
    AppIcon
  },
  props: {
    terrainPriority: {
      type: Object as PropType<TerrainPriority>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    terrains() : Terrain[] {
      const botTerrain = this.navigationState.botTerrain ?? Terrain.LAKE
      return getPriorityTerrains(botTerrain, this.terrainPriority)
    }
  }
})
</script>

<style lang="scss" scoped>
.terrain {
  position: relative;
  display: inline-block;
  .arrow {
    top: 5px;
    left: -10px;
    position: absolute;
    z-index: 10;
  }
  .terrainIcon {
    height: 2.5rem;
    filter: drop-shadow(2px 2px 2px #888);
  }
}
</style>
