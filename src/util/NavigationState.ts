import BotFaction from '@/services/enum/BotFaction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State, useStateStore } from '@/store/state'
import { RouteLocation } from 'vue-router'
import CardDeck from '@/services/CardDeck'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import getPreviousTurns from './getPreviousTurns'

export default class NavigationState {

  readonly state
  readonly difficultyLevel : DifficultyLevel
  readonly playerCount : number
  readonly botCount : number
  readonly round : number
  readonly turn : number
  readonly turnOrderIndex : number
  readonly player : number
  readonly bot : number
  readonly botFaction? : BotFaction
  readonly cardDeck? : CardDeck

  constructor(route : RouteLocation) {    
    this.state = useStateStore()
    const setup = this.state.setup
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
      this.cardDeck = this.getCardDeck(this.state)
      // draw next card for bot
      this.cardDeck.draw()
    }
  }

  getCardDeck(state : State) : CardDeck {
    const previousTurns = getPreviousTurns({state, round:this.round, turn:this.turn, bot:this.bot})
    for (let i=previousTurns.length-1; i>=0; i--) {
      const turn = previousTurns[i]
      if (turn.cardDeck) {
        return CardDeck.fromPersistence(turn.cardDeck)
      }
    }
    return CardDeck.new(state.setup.difficultyLevel)
  }

}
