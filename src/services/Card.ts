import Action from './enum/Action'
import BonusCardSelection from './enum/BonusCardSelection'
import ScienceDisciplineSelection from './enum/ScienceDisciplineSelection'
import DirectionalSelection from './enum/DirectionalSelection'
import InitialDwelling from './enum/InitialDwelling'
import Structure from './enum/Structure'
import TerrainPriority from './enum/TerrainPriority'

export default interface Card {
  id: string
  starter?: boolean
  actions: Action[]
  shipLevel?: number
  victoryPoints?: number
  victoryPointsDifficultyLevel?: boolean
  structure: Structure
  terrainPriority: TerrainPriority
  directionalSelection: DirectionalSelection
  directionalSelectionCount: number
  scienceDisciplineSelection: ScienceDisciplineSelection
  bonusCardSelection: BonusCardSelection
  initialDwellingMarked: InitialDwelling
  initialDwellingUnmarked: InitialDwelling
  pass?: boolean
}
