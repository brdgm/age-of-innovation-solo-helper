import { expect } from 'chai'
import Terrain from '@/services/enum/Terrain'
import getPriorityTerrains from '@/util/getPriorityTerrains'
import TerrainPriority from '@/services/enum/TerrainPriority'

describe('util/getPriorityTerrains', () => {
  it('getPriorityTerrains', () => {
    for (let terrain of Object.values(Terrain)) {
      for (let terrainPriority of Object.values(TerrainPriority)) {
        expect(getPriorityTerrains(terrain, terrainPriority).length).to.equal(7)
      }
    }
  })
})
