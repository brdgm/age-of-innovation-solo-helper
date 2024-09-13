import { expect } from 'chai'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import getPlayerOrder from '@/util/getPlayerOrder'
import mockTurn from '../helper/mockTurn'

describe('util/getPlayerOrder', () => {
  it('notTurns', () => {
    const state = mockState({playerCount:1, botCount:2, rounds: [
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})]}
    )
    expect(getPlayerOrder(state, 1)).to.eql([
      {player:1},
      {bot:1},
      {bot:2}
    ])
  })

  it('fullTurns', () => {
    const state = mockState({playerCount:1, botCount:2, rounds: [
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        mockTurn({turn:1,player:1}),
        mockTurn({turn:1,bot:1,pass:true}),
        mockTurn({turn:1,bot:2}),
        mockTurn({turn:2,player:1}),
        mockTurn({turn:2,bot:2,pass:true}),
        mockTurn({turn:3,player:1,pass:true})
      ]})]}
    )
    expect(getPlayerOrder(state, 1)).to.eql([
      {bot:1},
      {bot:2},
      {player:1}
    ])
  })

  it('partialTurns', () => {
    const state = mockState({playerCount:1, botCount:2, rounds: [
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        mockTurn({turn:1,player:1}),
        mockTurn({turn:1,bot:1,pass:true}),
        mockTurn({turn:1,bot:2})
      ]})]}
    )
    expect(getPlayerOrder(state, 1)).to.eql([
      {bot:1},
      {player:1},
      {bot:2}
    ])
  })
})
