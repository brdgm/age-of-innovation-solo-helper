import BotFaction from '@/services/enum/BotFaction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import Terrain from '@/services/enum/Terrain'

export const useStateStore = defineStore(`${name}.store`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.AUTOMALEIN,
        playerSetup: {
          playerCount: 1,
          botCount: 1,
          botFaction: [BotFaction.SIMPLETONS]
        }
      },
      rounds: []
    } as State
  },
  actions: {
    storeRound(round : Round) {
      this.rounds = this.rounds.filter(item => item.round < round.round)
      this.rounds.push(round)
    },
    storeRoundTurn(roundTurn : RoundTurn) {
      const round = this.rounds.find(item => item.round == roundTurn.round)
      if (!round) {
        throw new Error(`Round ${roundTurn.round} not found.`)
      }
      round.turns = round.turns.filter(item => (item.turn < roundTurn.turn) || (item.turn == roundTurn.turn && item.turnOrderIndex < roundTurn.turnOrderIndex))
      round.turns.push(roundTurn)
    },
    resetGame() {
      this.setup.roundScoreTiles = undefined
      this.setup.roundScoreFinalTile = undefined
      this.setup.playerTerrain = undefined
      this.setup.botTerrain = undefined
      this.setup.botSymbiontYouthTerrain = undefined
      this.setup.setupBookActions = undefined
      this.setup.setupCompetencyTiles = undefined
      this.setup.setupInnovationTiles = undefined
      this.setup.setupPalaceTiles = undefined
      this.rounds = []
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  playerSetup: PlayerSetup
  roundScoreTiles?: number[]
  roundScoreFinalTile?: number
  playerTerrain?: Terrain[]
  botTerrain?: Terrain[]
  botSymbiontYouthTerrain?: Terrain
  // parameters not relevant for the application, but persisted for back button support in setup screens
  setupBookActions?: number[]
  setupCompetencyTiles?: number[]
  setupInnovationTiles?: number[]
  setupPalaceTiles?: number[]
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  botFaction: BotFaction[]
}
export interface Round {
  round: number
  playerOrder: PlayerOrder[]
  turns: RoundTurn[]
}
export interface PlayerOrder {
  player?: number
  bot?: number
}
export interface RoundTurn {
  round: number
  turn: number
  turnOrderIndex: number
  player?: number
  bot?: number
  pass?: boolean
  cardDeck?: CardDeckPersistence
}
export interface CardDeckPersistence {
  deck: string[]
  reserve: string[]
  discard: string[]
}
