import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import mockCardDeck from '../helper/mockCardDeck'
import { CardDeckPersistence } from '@/store/state'
import { RouteParams } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import ScienceDiscipline from '@/services/enum/ScienceDiscipline'

const state = mockState({playerCount:1, botCount:2,
  roundScoreTiles: [1,4,5,9,11,12], roundScoreFinalTile: 2,
  rounds:[
    mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
      mockTurn({round:1,turn:1,player:1}),
      mockTurn({round:1,turn:1,bot:1,cardDeck:cardDeck(['*1','*2','*3','*4'],[],['*5'])}),
      mockTurn({round:1,turn:1,bot:2,cardDeck:cardDeck(['8','9','10','11'],[],['12'])}),
      mockTurn({round:1,turn:2,player:1,pass:true}),
      mockTurn({round:1,turn:2,bot:1,cardDeck:cardDeck(['*2','*3','*4'],['*1'],['*5'])}),
      mockTurn({round:1,turn:2,bot:2,cardDeck:cardDeck(['9','10','11'],['8'],['12']),pass:true}),
      mockTurn({round:1,turn:3,bot:1,cardDeck:cardDeck(['*3','*4'],['*2','*1'],['*5']),pass:true})
    ]}),
    mockRound({round:2, playerOrder:[{player:1},{bot:2},{bot:1}], turns:[
      mockTurn({round:2,turn:1,player:1}),
      mockTurn({round:2,turn:1,bot:2,cardDeck:cardDeck(['12','11','10','9','8',],[],[])}),
      mockTurn({round:2,turn:1,bot:1,cardDeck:cardDeck(['*5','*4','*3','*2','*1'],[],[])}),
      mockTurn({round:2,turn:2,player:1}),
      mockTurn({round:2,turn:2,bot:2,cardDeck:cardDeck(['11','10','9','8',],['12'],[])})
    ]})
  ]
})

describe('util/NavigationState', () => {
  it('getCardDeck', () => {
    expect(navigationState({round:'1',turn:'1',bot:'1'}).cardDeck?.toPersistence().reserve.length)
        .to.eq(9, 'round1-turn1-bot1')
    expect(navigationState({round:'1',turn:'1',bot:'2'}).cardDeck?.toPersistence().reserve.length)
        .to.eq(9, 'round1-turn1-bot2')
    expect(navigationState({round:'1',turn:'2',bot:'1'}).cardDeck?.toPersistence())
        .to.eql(cardDeck(['*2','*3','*4'],['*1'],['*5']), 'round1-turn2-bot1')
    expect(navigationState({round:'1',turn:'2',bot:'2'}).cardDeck?.toPersistence())
        .to.eql(cardDeck(['9','10','11'],['8'],['12']), 'round1-turn2-bot2')

    expect(navigationState({round:'2',turn:'1',bot:'2'}).cardDeck?.toPersistence().reserve.length)
        .to.eq(0, 'round2-turn1-bot2')
    expect(navigationState({round:'2',turn:'1',bot:'1'}).cardDeck?.toPersistence().reserve.length)
        .to.eq(0, 'round2-turn1-bot1')
    expect(navigationState({round:'2',turn:'2',bot:'2'}).cardDeck?.toPersistence())
        .to.eql(cardDeck(['11','10','9','8',],['12'],[]), 'round2-turn2-bot2')
    expect(navigationState({round:'2',turn:'2',bot:'1'}).cardDeck?.toPersistence())
        .to.eql(cardDeck(['*4','*3','*2','*1'],['*5'],[]), 'round2-turn2-bot1')
  })

  it('roundScoreTile-round1', () => {
    expect(navigationState({round:'1',turn:'1',bot:'1'}).passVictoryPoints).to.eq(3)
    expect(navigationState({round:'1',turn:'1',bot:'1'}).preferredScienceDiscipline).to.eq(ScienceDiscipline.BANKING)
  })

  it('roundScoreTile-round2', () => {
    expect(navigationState({round:'2',turn:'1',bot:'1'}).passVictoryPoints).to.eq(4)
    expect(navigationState({round:'2',turn:'1',bot:'1'}).preferredScienceDiscipline).to.eq(ScienceDiscipline.LAW)
  })

  it('roundScoreTile-round3', () => {
    expect(navigationState({round:'3',turn:'1',bot:'1'}).passVictoryPoints).to.eq(2)
    expect(navigationState({round:'3',turn:'1',bot:'1'}).preferredScienceDiscipline).to.eq(ScienceDiscipline.LAW)
  })

  it('roundScoreTile-round4', () => {
    expect(navigationState({round:'4',turn:'1',bot:'1'}).passVictoryPoints).to.eq(4)
    expect(navigationState({round:'4',turn:'1',bot:'1'}).preferredScienceDiscipline).to.eq(ScienceDiscipline.ENGINEERING)
  })

  it('roundScoreTile-round5', () => {
    expect(navigationState({round:'5',turn:'1',bot:'1'}).passVictoryPoints).to.eq(5)
    expect(navigationState({round:'5',turn:'1',bot:'1'}).preferredScienceDiscipline).to.eq(ScienceDiscipline.MEDICINE)
  })

  it('roundScoreTile-round6', () => {
    expect(navigationState({round:'6',turn:'1',bot:'1'}).passVictoryPoints).to.eq(6)
    expect(navigationState({round:'6',turn:'1',bot:'1'}).preferredScienceDiscipline).to.eq(ScienceDiscipline.LAW)
  })
})

function cardDeck(deck:string[], discard:string[], reserve:string[]) : CardDeckPersistence {
  return mockCardDeck({deck, discard, reserve}).toPersistence()
}

function navigationState(params:RouteParams) : NavigationState {
  return new NavigationState(mockRouteLocation({params}), state)
}
