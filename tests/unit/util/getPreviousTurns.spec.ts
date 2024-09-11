import { expect } from 'chai'
import mockRound from '../helper/mockRound'
import mockState from '../helper/mockState'
import mockTurn from '../helper/mockTurn'
import getPreviousTurns from '@/util/getPreviousTurns'

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

    const turns = getPreviousTurns({state, round:1, turn:2, bot:1})
    expect(turns.length).to.eq(4)
    expect(turns[0].turn).to.eq(1)
    expect(turns[0].player).to.eq(1)
    expect(turns[1].turn).to.eq(1)
    expect(turns[1].bot).to.eq(1)
    expect(turns[2].turn).to.eq(1)
    expect(turns[2].bot).to.eq(2)
    expect(turns[3].turn).to.eq(2)
    expect(turns[3].player).to.eq(1)
  })
})
