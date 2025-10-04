import { State } from '@/store/state'

/**
 * Generate list of all player/bot turns - leaving out steps after player/bot has passed.
 * @param state State
 * @param round Current round
 * @param currentTurn Current turn number
 */
export default function getTurnOrder(state: State, currentRound: number, currentTurn: number) : TurnOrder[] {
  const round = state.rounds.find(item => item.round==currentRound)
  if (!round) {
    return []
  }
  const { playerOrder, turns } = round
  const steps : TurnOrder[] = []

  let invalidTurn = false
  for (let turn=1; turn<=currentTurn+1; turn++) {
    let turnOrderIndex = 0
    for (const player of playerOrder) {
      const hasPassed = turns.find(item => item.turn<turn
            && item.player==player.player && item.bot==player.bot && item.pass) != undefined
      if (!hasPassed) {
        if (turn > MAX_TURN) {
          // not a valid round as not all have passed in time, return empty list of steps
          invalidTurn = true
        }
        if (player.player) {
          steps.push({round:round.round, turn, turnOrderIndex, player:player.player})
          turnOrderIndex++
        }
        else if (player.bot) {
          steps.push({round:round.round, turn, turnOrderIndex, bot:player.bot})
          turnOrderIndex++
        }
      }
    }
  }
  if (invalidTurn) {
    return []
  }
  else {
    return steps
  }
}

export interface TurnOrder {
  readonly round: number
  readonly turn: number
  readonly turnOrderIndex: number
  readonly player?: number
  readonly bot?: number
}

export const MAX_TURN = 99
