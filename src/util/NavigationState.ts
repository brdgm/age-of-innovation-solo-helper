import BotFaction from '@/services/enum/BotFaction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import CardDeck from '@/services/CardDeck'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import getPreviousTurns from './getPreviousTurns'
import { MAX_TURN } from '@/util/getTurnOrder'

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly playerCount : number
  readonly botCount : number
  readonly isTwoPlayerGame : boolean
  readonly round : number
  readonly turn : number
  readonly turnOrderIndex : number
  readonly player : number
  readonly bot : number
  readonly botFaction? : BotFaction
  readonly cardDeck? : CardDeck

  constructor(route: RouteLocation, state: State) {    
    const setup = state.setup
    this.difficultyLevel = setup.difficultyLevel
    this.playerCount = setup.playerSetup.playerCount
    this.botCount = setup.playerSetup.botCount
    this.isTwoPlayerGame = (this.playerCount + this.botCount) == 2

    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    this.turnOrderIndex = getIntRouteParam(route, 'turnOrderIndex')
    this.player = getIntRouteParam(route, 'player')
    this.bot = getIntRouteParam(route, 'bot')

    if (this.bot > 0) {
      this.botFaction = setup.playerSetup.botFaction[this.bot - 1]
      this.cardDeck = getCardDeck(state, this.round, this.turn, this.bot)
      // draw next card for bot
      this.cardDeck.draw()
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
