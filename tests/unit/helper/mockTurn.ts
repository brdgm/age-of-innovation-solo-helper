import { CardDeckPersistence, RoundTurn } from '@/store/state'

export default function mockTurn(params?: MockTurnParams) : RoundTurn {
  return {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1,
    turnOrderIndex: params?.turnOrderIndex ?? 0,
    player: params?.player,
    bot: params?.bot,
    pass: params?.pass,
    cardDeck: params?.cardDeck
  }
}

export interface MockTurnParams {
  round? : number
  turn? : number
  turnOrderIndex? : number
  player?: number
  bot?: number
  pass?: boolean
  cardDeck?: CardDeckPersistence
}
