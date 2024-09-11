import CardDeck from '@/services/CardDeck'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { CardDeckPersistence, RoundTurn } from '@/store/state'

export default function (params?: MockTurnParams) : RoundTurn {
  return {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1,
    turnOrderIndex: params?.turnOrderIndex ?? 0,
    player: params?.player,
    bot: params?.bot,
    pass: params?.pass,
    cardDeck: params?.cardDeck ?? CardDeck.new(DifficultyLevel.AUTOMALEIN).toPersistence()
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
