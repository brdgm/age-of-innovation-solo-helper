import Terrain from '@/services/enum/Terrain'
import TerrainPriority from '@/services/enum/TerrainPriority'

/**
 * Get list of prioritized terrains.
 * @param terrain Terrain
 * @param terrainPriority Terrain priority
 * @returns List of prioritized terrains
 */
export default function getPriorityTerrains(terrain: Terrain, terrainPriority: TerrainPriority) : Terrain[] {
  switch (terrainPriority) {
    case TerrainPriority.A:
      switch (terrain) {
        case Terrain.LAKE: return [Terrain.LAKE, Terrain.SWAMP, Terrain.FOREST, Terrain.PLAINS, Terrain.WASTELAND, Terrain.MOUNTAIN, Terrain.DESERT]
        case Terrain.PLAINS: return [Terrain.PLAINS, Terrain.DESERT, Terrain.SWAMP, Terrain.WASTELAND, Terrain.FOREST, Terrain.LAKE, Terrain.MOUNTAIN]
        case Terrain.FOREST: return [Terrain.FOREST, Terrain.LAKE, Terrain.MOUNTAIN, Terrain.SWAMP, Terrain.DESERT, Terrain.WASTELAND, Terrain.PLAINS]
        case Terrain.WASTELAND: return [Terrain.WASTELAND, Terrain.MOUNTAIN, Terrain.DESERT, Terrain.FOREST, Terrain.SWAMP, Terrain.PLAINS, Terrain.LAKE]
        case Terrain.SWAMP: return [Terrain.SWAMP, Terrain.PLAINS, Terrain.LAKE, Terrain.DESERT, Terrain.MOUNTAIN, Terrain.FOREST, Terrain.WASTELAND]
        case Terrain.DESERT: return [Terrain.DESERT, Terrain.WASTELAND, Terrain.PLAINS, Terrain.MOUNTAIN, Terrain.LAKE, Terrain.SWAMP, Terrain.FOREST]
        case Terrain.MOUNTAIN: return [Terrain.MOUNTAIN, Terrain.FOREST, Terrain.WASTELAND, Terrain.LAKE, Terrain.PLAINS, Terrain.DESERT, Terrain.SWAMP]
        default:
          throw new Error(`Invalid terrain: ${terrain}`)
      }
    case TerrainPriority.B:
      switch (terrain) {
        case Terrain.LAKE: return [Terrain.LAKE, Terrain.FOREST, Terrain.SWAMP, Terrain.MOUNTAIN, Terrain.DESERT, Terrain.PLAINS, Terrain.WASTELAND]
        case Terrain.PLAINS: return [Terrain.PLAINS, Terrain.SWAMP, Terrain.DESERT, Terrain.LAKE, Terrain.MOUNTAIN, Terrain.WASTELAND, Terrain.FOREST]
        case Terrain.FOREST: return [Terrain.FOREST, Terrain.MOUNTAIN, Terrain.LAKE, Terrain.WASTELAND, Terrain.PLAINS, Terrain.SWAMP, Terrain.DESERT]
        case Terrain.WASTELAND: return [Terrain.WASTELAND, Terrain.DESERT, Terrain.MOUNTAIN, Terrain.PLAINS, Terrain.LAKE, Terrain.FOREST, Terrain.SWAMP]
        case Terrain.SWAMP: return [Terrain.SWAMP, Terrain.LAKE, Terrain.PLAINS, Terrain.FOREST, Terrain.WASTELAND, Terrain.DESERT, Terrain.MOUNTAIN]
        case Terrain.DESERT: return [Terrain.DESERT, Terrain.PLAINS, Terrain.WASTELAND, Terrain.SWAMP, Terrain.FOREST, Terrain.MOUNTAIN, Terrain.LAKE]
        case Terrain.MOUNTAIN: return [Terrain.MOUNTAIN, Terrain.WASTELAND, Terrain.FOREST, Terrain.DESERT, Terrain.SWAMP, Terrain.LAKE, Terrain.PLAINS]
        default:
          throw new Error(`Invalid terrain: ${terrain}`)
      }
    default:
      throw new Error(`Invalid terrain priority: ${terrainPriority}`)
  }
}
