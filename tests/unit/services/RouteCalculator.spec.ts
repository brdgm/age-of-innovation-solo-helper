import RouteCalculator from '@/services/RouteCalculator'
import { expect } from 'chai'
import mockRound from '../helper/mockRound'
import mockState from '../helper/mockState'

describe('services/RouteCalculator', () => {
  it('getNextRouteTo-round1-turn1-player', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:0, player:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/income')
  })

  it('getNextRouteTo-round1-turn1-bot1', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:1, bot:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/1/2/bot/2')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/0/player/1')
  })

  it('getNextRouteTo_round1-turn1-bot2', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:2, bot:2})
    
    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/2/0/player/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:2, bot:2})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        {round:1, turn:1, turnOrderIndex:0, player:1, pass:true}
      ]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/2/0/bot/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed-bot1passed', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:2, bot:2})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        {round:1, turn:1, turnOrderIndex:0, player:1, pass:true},
        {round:1, turn:1, turnOrderIndex:1, bot:1, pass:true}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/2/0/bot/2')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed-bot1passed-bot2passed', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1, turnOrderIndex:2, bot:2})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        {round:1, turn:1, turnOrderIndex:0, player:1, pass:true},
        {round:1, turn:1, turnOrderIndex:1, bot:1, pass:true},
        {round:1, turn:1, turnOrderIndex:2, bot:2, pass:true}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/end')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/1/bot/1')
  })

  it('getNextRouteTo_round7-turn1-bot2-playerpassed-bot1passed-bot2passed', () => {
    const routeCalculator = new RouteCalculator({round:7, turn:1, turnOrderIndex:2, bot:2})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:7, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        {round:7, turn:1, turnOrderIndex:0, player:1, pass:true},
        {round:7, turn:1, turnOrderIndex:1, bot:1, pass:true},
        {round:7, turn:1, turnOrderIndex:2, bot:2, pass:true}]})
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/endOfGame')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/7/turn/1/1/bot/1')
  })

  it('getFirstTurnRouteTo', () => {
    const routeCalculator = new RouteCalculator({round:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getFirstTurnRouteTo(state)).to.eq('/round/1/turn/1/0/player/1')
  })

  it('getFirstTurnRouteTo_noRounds', () => {
    const routeCalculator = new RouteCalculator({round:1})

    const state = mockState({playerCount:1, botCount:2})
    expect(routeCalculator.getFirstTurnRouteTo(state)).to.eq('')
  })

  it('getLastTurnRouteTo', () => {
    const routeCalculator = new RouteCalculator({round:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        {round:1, turn:1, turnOrderIndex:0, player:1, pass:true},
        {round:1, turn:1, turnOrderIndex:1, bot:1, pass:true},
        {round:1, turn:1, turnOrderIndex:2, bot:2, pass:true}]})
  ]})
    expect(routeCalculator.getLastTurnRouteTo(state)).to.eq('/round/1/turn/1/2/bot/2')
  })

  it('getLastTurnRouteTo-empty', () => {
    const routeCalculator = new RouteCalculator({round:1})

    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})
    ]})
    expect(routeCalculator.getLastTurnRouteTo(state)).to.eq('')
  })
})
