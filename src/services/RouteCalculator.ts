import { State } from '@/store/state'
import getTurnOrder, { MAX_TURN } from '@/util/getTurnOrder'

/**
 * Calculate routes for next/back respecting "passed" state of players/bots.
 */
export default class RouteCalculator {

  readonly round : number
  readonly turn : number
  readonly turnOrderIndex : number
  readonly player? : number
  readonly bot? : number

  constructor(params:{round: number, turn?: number, turnOrderIndex?: number, action?: number, workerUsedPreviousAction?: number, player?: number, bot?: number}) {
    this.round = params.round
    this.turn = params.turn ?? MAX_TURN  // when called in EndOfRound/EndOfGame context
    this.turnOrderIndex = params.turnOrderIndex ?? 0
    this.player = params.player
    this.bot = params.bot
  }

  /**
   * Get route to next step in round.
   * If all have passed, returns route to round end/game end.
   */
  public getNextRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.round, this.turn)
    const currentStepIndex = steps.findIndex(item => item.round==this.round && item.turn==this.turn
        && item.player==this.player && item.bot==this.bot)
    if (currentStepIndex < 0) {
      return ''
    }
    const nextStep = steps[currentStepIndex+1]
    if (!nextStep) {
      if (this.round == 7) {
        return `/endOfGame`
      }
      else {
        return `/round/${this.round}/end`
      }
    }
    return RouteCalculator.routeTo(nextStep)
  }

  /**
   * Get route to previous step in round.
   * If this is the first turn in round, returns route to end of previous round (or empty route in first round).
   */
  public getBackRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.round, this.turn)
    const currentStepIndex = steps.findIndex(item => item.round==this.round && item.turn==this.turn
        && item.player==this.player && item.bot==this.bot)
    if (currentStepIndex < 0) {
      return ''
    }
    const previousStep = steps[currentStepIndex-1]
    if (!previousStep) {
      return `/round/${this.round}/income`
    }
    return RouteCalculator.routeTo(previousStep)
  }

  /**
   * Get route to last turn in round (or empty route if no turn exist).
   */
  public getFirstTurnRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.round, 1)
    return RouteCalculator.routeTo(steps[0])
  }

  /**
   * Get route to last turn in round (or empty route if no turn exist).
   */
  public getLastTurnRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.round, this.turn)
    const lastStep = steps[steps.length-1]
    if (lastStep) {
      return RouteCalculator.routeTo(lastStep)
    }
    else {
      return ''
    }
  }

  /**
   * Build route to player/bot step
   */
  private static routeTo(step: Step) : string {
    if (step.bot) {
      return `/round/${step.round}/turn/${step.turn}/${step.turnOrderIndex}/bot/${step.bot}`
    }
    else {
      return `/round/${step.round}/turn/${step.turn}/${step.turnOrderIndex}/player/${step.player}`
    }
  }

}

interface Step {
  readonly round: number
  readonly turn: number
  readonly turnOrderIndex: number
  readonly player?: number
  readonly bot?: number
}
