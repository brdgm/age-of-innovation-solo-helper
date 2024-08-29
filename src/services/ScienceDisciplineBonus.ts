import BotFaction from './enum/BotFaction'
import ScienceDiscipline from './enum/ScienceDiscipline'

/**
 * Cult track bonus on game start.
 */
export default interface ScienceDisciplineBonus {
  botFaction: BotFaction
  steps: ScienceDisciplineBonusSteps[]
}
export interface ScienceDisciplineBonusSteps {
  scienceDiscipline: ScienceDiscipline
  advanceSteps: number
}
