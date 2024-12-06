import BotFaction from '@/services/enum/BotFaction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import CardDeck from '@/services/CardDeck'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import getPreviousTurns from './getPreviousTurns'
import { MAX_TURN } from '@/util/getTurnOrder'
import ScienceDiscipline from '@/services/enum/ScienceDiscipline'
import getRoundScoreTile, { RoundScoreTile } from './getRoundScoreTile'
import getRoundScoreFinalTile from './getRoundScoreFinalTile'
import Terrain from '@/services/enum/Terrain'
import { range } from 'lodash'

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly playerCount : number
  readonly botCount : number
  readonly round : number
  readonly turn : number
  readonly turnOrderIndex : number
  readonly player : number
  readonly playerTerrain? : Terrain
  readonly bot : number
  readonly botFaction? : BotFaction
  readonly botTerrain? : Terrain
  readonly botSymbiontYouthTerrain? : Terrain
  readonly playerTerrains? : Terrain[]
  readonly cardDeck? : CardDeck
  readonly passVictoryPoints?: number
  readonly preferredScienceDiscipline?: ScienceDiscipline

  constructor(route: RouteLocation, state: State) {    
    const setup = state.setup
    this.difficultyLevel = setup.difficultyLevel
    this.playerCount = setup.playerSetup.playerCount
    this.botCount = setup.playerSetup.botCount

    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    this.turnOrderIndex = getIntRouteParam(route, 'turnOrderIndex')
    this.player = getIntRouteParam(route, 'player')
    this.bot = getIntRouteParam(route, 'bot')

    if (this.bot > 0) {
      this.botFaction = setup.playerSetup.botFaction[this.bot - 1]
      this.botTerrain = (setup.botTerrain ?? [])[this.bot - 1]
      this.botSymbiontYouthTerrain = setup.botSymbiontYouthTerrain
      this.playerTerrains = range(0, setup.playerSetup.playerCount).map(playerIndex => (setup.playerTerrain ?? [])[playerIndex])

      // card deck: draw next card for bot
      this.cardDeck = getCardDeck(state, this.round, this.turn, this.bot)
      this.cardDeck.draw()

      // round score tile
      const roundScoreTile = getRoundScoreTileForRound(this.round, state)
      if (roundScoreTile) {
        this.passVictoryPoints = this.round < 4 ? roundScoreTile.vpRound123 : roundScoreTile.vpRound456
        this.preferredScienceDiscipline = roundScoreTile.scienceDiscipline
      }
    }
    else {
      this.playerTerrain = (setup.playerTerrain ?? [])[this.player - 1]
    }
  }

}

function getCardDeck(state:State, round:number, turn:number, bot:number) : CardDeck {
  const previousTurns = getPreviousTurns({state, round, turn, bot})
  for (let i=previousTurns.length-1; i>=0; i--) {
    const previousTurn = previousTurns[i]
    if (previousTurn.cardDeck) {
      return CardDeck.fromPersistence(previousTurn.cardDeck)
    }
  }
  if (round > 1) {
    const cardDeck = getCardDeck(state, round-1, MAX_TURN-1, bot)
    cardDeck.prepareForNextRound()
    return cardDeck
  }
  return CardDeck.new(state.setup.difficultyLevel)
}

function getRoundScoreTileForRound(round: number, state: State) : RoundScoreTile|undefined {
  if (round < 6) {
    const roundScoreTile = (state.setup.roundScoreTiles ?? [])[round-1]
    if (roundScoreTile) {
      return getRoundScoreTile(roundScoreTile)
    }
  }
  else {
    const roundScoreFinalTile = state.setup.roundScoreFinalTile
    if (roundScoreFinalTile) {
      return getRoundScoreFinalTile(roundScoreFinalTile)
    }
  }
  return undefined
}
