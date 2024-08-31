import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import BonusCardSelection from './enum/BonusCardSelection'
import ScienceDisciplineSelection from './enum/ScienceDisciplineSelection'
import DirectionalSelection from './enum/DirectionalSelection'
import InitialWorkshop from './enum/InitialWorkshop'
import Structure from './enum/Structure'
import TerrainPriority from './enum/TerrainPriority'

const cards = [
  {
    id: '*1',
    starter: true,
    actions: [
      Action.UPGRADE,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPointsDifficultyLevel: true,
    structure: Structure.MARKED,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 2,
    scienceDisciplineSelection: ScienceDisciplineSelection.SCORING_TILE,
    bonusCardSelection: BonusCardSelection.LEFT,
    initialWorkshopMarked: InitialWorkshop.A,
    initialWorkshopUnmarked: InitialWorkshop.B
  },
  {
    id: '*2',
    starter: true,
    actions: [
      Action.BLOCK_POWER_BOOK_ACTION,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPointsDifficultyLevel: true,
    structure: Structure.MARKED,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 1,
    scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.MIDDLE,
    initialWorkshopMarked: InitialWorkshop.A,
    initialWorkshopUnmarked: InitialWorkshop.B,
    pass: true
  },
  {
    id: '*3',
    starter: true,
    actions: [
      Action.SEND_SCHOLAR
    ],
    structure: Structure.UNMARKED_REACHING,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 3,
    scienceDisciplineSelection: ScienceDisciplineSelection.SCORING_TILE,
    bonusCardSelection: BonusCardSelection.RIGHT,
    initialWorkshopMarked: InitialWorkshop.A,
    initialWorkshopUnmarked: InitialWorkshop.B
  },
  {
    id: '*4',
    starter: true,
    actions: [
      Action.TRANSFORM_AND_BUILD
    ],
    structure: Structure.UNMARKED,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 3,
    scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.LEFT,
    initialWorkshopMarked: InitialWorkshop.A,
    initialWorkshopUnmarked: InitialWorkshop.B,
    pass: true
  },
  {
    id: '*5',
    starter: true,
    actions: [
      Action.FACTION_ACTION
    ],
    structure: Structure.MARKED_REACHING,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 2,
    scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.MIDDLE,
    initialWorkshopMarked: InitialWorkshop.A,
    initialWorkshopUnmarked: InitialWorkshop.B
  },
  {
    id: '*6',
    actions: [
      Action.TAKE_INNOVATION,
      Action.ADVANCE_SCIENCE_DISCIPLINE
    ],
    structure: Structure.UNMARKED,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 1,
    scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.RIGHT,
    initialWorkshopMarked: InitialWorkshop.C,
    initialWorkshopUnmarked: InitialWorkshop.D
  },
  {
    id: '7',
    actions: [
      Action.FACTION_ACTION
    ],
    structure: Structure.UNMARKED_REACHING,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 4,
    scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.LEFT,
    initialWorkshopMarked: InitialWorkshop.C,
    initialWorkshopUnmarked: InitialWorkshop.D,
    pass: true
  },
  {
    id: '8',
    actions: [
      Action.SEND_SCHOLAR,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPoints: 3,
    structure: Structure.MARKED_REACHING,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 1,
    scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.MIDDLE,
    initialWorkshopMarked: InitialWorkshop.C,
    initialWorkshopUnmarked: InitialWorkshop.D,
    pass: true
  },
  {
    id: '9',
    actions: [
      Action.SEND_SCHOLAR,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPoints: 3,
    structure: Structure.MARKED_REACHING,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 2,
    scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.RIGHT,
    initialWorkshopMarked: InitialWorkshop.C,
    initialWorkshopUnmarked: InitialWorkshop.D,
    pass: true
  },
  {
    id: '10',
    actions: [
      Action.UPGRADE,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPoints: 2,
    structure: Structure.UNMARKED_REACHING,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 4,
    scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.LEFT,
    initialWorkshopMarked: InitialWorkshop.C,
    initialWorkshopUnmarked: InitialWorkshop.D,
    pass: true
  },
  {
    id: '11',
    actions: [
      Action.UPGRADE,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPointsDifficultyLevel: true,
    structure: Structure.UNMARKED_REACHING,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 2,
    scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.MIDDLE,
    initialWorkshopMarked: InitialWorkshop.E,
    initialWorkshopUnmarked: InitialWorkshop.F,
    pass: true
  },
  {
    id: '12',
    actions: [
      Action.BLOCK_POWER_BOOK_ACTION,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPointsDifficultyLevel: true,
    structure: Structure.UNMARKED_REACHING,
    terrainPriority: TerrainPriority.A,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 3,
    scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.RIGHT,
    initialWorkshopMarked: InitialWorkshop.E,
    initialWorkshopUnmarked: InitialWorkshop.F,
    pass: true
  },
  {
    id: '13',
    actions: [
      Action.TRANSFORM_AND_BUILD,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPoints: 3,
    structure: Structure.MARKED_REACHING,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.LEFT_UP,
    directionalSelectionCount: 1,
    scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.LEFT,
    initialWorkshopMarked: InitialWorkshop.E,
    initialWorkshopUnmarked: InitialWorkshop.F,
    pass: true
  },
  {
    id: '14',
    actions: [
      Action.BLOCK_POWER_BOOK_ACTION,
      Action.GAIN_VICTORY_POINTS
    ],
    victoryPointsDifficultyLevel: true,
    structure: Structure.MARKED_REACHING,
    terrainPriority: TerrainPriority.B,
    directionalSelection: DirectionalSelection.RIGHT_DOWN,
    directionalSelectionCount: 3,
    scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP,
    bonusCardSelection: BonusCardSelection.MIDDLE,
    initialWorkshopMarked: InitialWorkshop.E,
    initialWorkshopUnmarked: InitialWorkshop.F,
    pass: true
  }
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns cards
   */
  getAll() : Card[] {
    return cards
  },

}
