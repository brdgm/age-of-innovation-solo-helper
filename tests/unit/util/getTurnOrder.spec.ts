import getTurnOrder from '@/util/getTurnOrder'
import { expect } from 'chai'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'

describe('util/getTurnOrder', () => {
  it('round1-turn2', () => {
    const state = mockState({playerCount:1, botCount:2, rounds: [
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}]})]}
    )
    expect(getTurnOrder(state, 1, 2)).to.eql([
      {round:1, turn:1, turnOrderIndex: 0, player:1},
      {round:1, turn:1, turnOrderIndex: 1, bot:1},
      {round:1, turn:1, turnOrderIndex: 2, bot:2},
      {round:1, turn:2, turnOrderIndex: 0, player:1},
      {round:1, turn:2, turnOrderIndex: 1, bot:1},
      {round:1, turn:2, turnOrderIndex: 2, bot:2},
      {round:1, turn:3, turnOrderIndex: 0, player:1},
      {round:1, turn:3, turnOrderIndex: 1, bot:1},
      {round:1, turn:3, turnOrderIndex: 2, bot:2}
    ])
  })

  it('round1-turn2-passed', () => {
    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
        {round:1,turn:1,turnOrderIndex:0,player:1},
        {round:1,turn:1,turnOrderIndex:1,bot:1,pass:true},
        {round:1,turn:1,turnOrderIndex:2,bot:2},
        {round:1,turn:2,turnOrderIndex:0,player:1,pass:true},
        {round:1,turn:2,turnOrderIndex:1,bot:2}
      ]})
    ]})
    expect(getTurnOrder(state, 1, 2)).to.eql([
      {round:1, turn:1, turnOrderIndex:0, player:1},
      {round:1, turn:1, turnOrderIndex:1, bot:1},
      {round:1, turn:1, turnOrderIndex:2, bot:2},
      {round:1, turn:2, turnOrderIndex:0, player:1},
      {round:1, turn:2, turnOrderIndex:1, bot:2},
      {round:1, turn:3, turnOrderIndex:0, bot:2}
    ])
  })

  it('round1-turn2-passed-playerorder', () => {
    const state = mockState({playerCount:2, botCount:2, rounds:[
      mockRound({round:1, playerOrder:[{player:2},{bot:1},{bot:2},{player:1}], turns:[
        {round:1,turn:1,turnOrderIndex:0,player:2},
        {round:1,turn:1,turnOrderIndex:1,bot:1,pass:true},
        {round:1,turn:1,turnOrderIndex:2,bot:2},
        {round:1,turn:1,turnOrderIndex:3,player:1},
        {round:1,turn:2,turnOrderIndex:0,player:2},
        {round:1,turn:2,turnOrderIndex:1,bot:2},
        {round:1,turn:2,turnOrderIndex:2,player:1,pass:true}
      ]})
    ]})
    expect(getTurnOrder(state, 1, 2)).to.eql([
      {round:1, turn:1, turnOrderIndex:0, player:2},
      {round:1, turn:1, turnOrderIndex:1, bot:1},
      {round:1, turn:1, turnOrderIndex:2, bot:2},
      {round:1, turn:1, turnOrderIndex:3, player:1},
      {round:1, turn:2, turnOrderIndex:0, player:2},
      {round:1, turn:2, turnOrderIndex:1, bot:2},
      {round:1, turn:2, turnOrderIndex:2, player:1},
      {round:1, turn:3, turnOrderIndex:0, player:2},
      {round:1, turn:3, turnOrderIndex:1, bot:2}
    ])
  })
})
