import { PlayerOrder, Round, RoundTurn } from '@/store/state'

export default function (params?: MockRoundParams) : Round {
  return {
    round: params?.round ?? 1,
    playerOrder: params?.playerOrder ?? [{bot:1},{player:1}],
    turns: params?.turns ?? []
  }
}

export interface MockRoundParams {
  round? : number
  playerOrder? : PlayerOrder[]
  turns? : RoundTurn[]
}
