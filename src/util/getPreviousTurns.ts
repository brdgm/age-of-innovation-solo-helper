import { State, RoundTurn } from '@/store/state'
import getTurnOrder from './getTurnOrder'

/**
 * Get previous turns of given bot/player in turn order.
 * @param params.state State
 * @param params.round Current round
 * @param params.turn Current turn
 * @param params.player Player number
 * @param params.bot Bot number
 */
export default function getPreviousTurns(params:{state: State, round: number, turn: number, player?: number, bot?: number}) : RoundTurn[] {
  const round = params.state.rounds.find(item => item.round==params.round)
  if (!round) {
    return []
  }
  const turnOrder = getTurnOrder(params.state, params.round, params.turn)
  const currentIndex = turnOrder.findIndex(item => item.round==params.round && item.turn==params.turn
      && item.player==params.player && item.bot==params.bot)
  const previousTurnOrder = currentIndex >= 0 ? turnOrder.slice(0, currentIndex) : turnOrder
  const result : RoundTurn[] = []
  for (const item of previousTurnOrder) {
    const matchingTurn = round.turns.find(turn => turn.round==item.round && turn.turn==item.turn
        && turn.player==item.player && turn.bot==item.bot)
    if (matchingTurn) {
      result.push(matchingTurn)
    }
  }
  return result.filter(item => item.bot == params.bot && item.player == params.player)
}
