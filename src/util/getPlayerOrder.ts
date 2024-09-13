import { PlayerOrder, State } from '@/store/state'

/**
 * Get player order for next round by checking who has passed in which order in the given round.
 * @param state State
 * @param round Current round
 */
export default function getPlayerOrder(state: State, currentRound: number) : PlayerOrder[] {
  const round = state.rounds.find(item => item.round==currentRound)
  if (!round) {
    return []
  }

  const result : PlayerOrder[] = []
  round.turns.forEach(turn => {
    if (turn.pass) {
      if (turn.player) {
        result.push({player:turn.player})
      }
      else {
        result.push({bot:turn.bot})
      }
    }
  })

  // add from current player order if not all have passed
  round.playerOrder.forEach(item => {
    if (!result.find(resultItem => resultItem.player==item.player && resultItem.bot==item.bot)) {
      result.push(item)
    }
  })

  return result
}
