import { expect } from 'chai'
import mockRound from '../helper/mockRound'
import mockState from '../helper/mockState'
import mockTurn from '../helper/mockTurn'
import getPreviousTurns from '@/util/getPreviousTurns'
import { MAX_TURN } from '@/util/getTurnOrder'

describe('util/getPreviousTurns', () => {
  it('round1-turn2-bot1', () => {
    const state = mockState({playerCount:1, botCount:2, rounds: [
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        mockTurn({round:1,turn:1,bot:1}),
        mockTurn({round:1,turn:1,bot:2}),
        mockTurn({round:1,turn:2,bot:1}),
        mockTurn({round:1,turn:2,bot:2}),
        mockTurn({round:1,turn:1,player:1}),
        mockTurn({round:1,turn:2,player:1})
      ]})]}
    )

    let turns = getPreviousTurns({state, round:1, turn:2, bot:1})
    expect(turns.length).to.eq(1)
    expect(turns[0].turn).to.eq(1)
    expect(turns[0].bot).to.eq(1)

    turns = getPreviousTurns({state, round:1, turn:MAX_TURN-1, bot:1})
    expect(turns.length).to.eq(2)
    expect(turns[0].turn).to.eq(1)
    expect(turns[0].bot).to.eq(1)
    expect(turns[1].turn).to.eq(2)
    expect(turns[1].bot).to.eq(1)
  })
})
