import findMandatoryMap from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import ScienceDisciplineBonus, { ScienceDisciplineBonusSteps } from './ScienceDisciplineBonus'
import BotFaction from './enum/BotFaction'
import ScienceDiscipline from './enum/ScienceDiscipline'

const items = [
  {
    botFaction: BotFaction.SIMPLETONS,
    steps: [
      { scienceDiscipline: ScienceDiscipline.BANKING, advanceSteps: 1 },
      { scienceDiscipline: ScienceDiscipline.LAW, advanceSteps: 1 },
      { scienceDiscipline: ScienceDiscipline.ENGINEERING, advanceSteps: 1 },
      { scienceDiscipline: ScienceDiscipline.MEDICINE, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.KUDDLERS,
    steps: [
      { scienceDiscipline: ScienceDiscipline.BANKING, advanceSteps: 1 },
      { scienceDiscipline: ScienceDiscipline.LAW, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.DRUIDS,
    steps: [
      { scienceDiscipline: ScienceDiscipline.MEDICINE, advanceSteps: 2 }
    ]
  },
  {
    botFaction: BotFaction.RACELINGS,
    steps: [
      { scienceDiscipline: ScienceDiscipline.LAW, advanceSteps: 1 },
      { scienceDiscipline: ScienceDiscipline.MEDICINE, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.WANDERERS,
    steps: [
      { scienceDiscipline: ScienceDiscipline.BANKING, advanceSteps: 1 },
      { scienceDiscipline: ScienceDiscipline.ENGINEERING, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.MIMICS,
    steps: [
      { scienceDiscipline: ScienceDiscipline.LAW, advanceSteps: 1 },
      { scienceDiscipline: ScienceDiscipline.ENGINEERING, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.POWERMONGERS,
    steps: [
      { scienceDiscipline: ScienceDiscipline.ENGINEERING, advanceSteps: 1 },
      { scienceDiscipline: ScienceDiscipline.MEDICINE, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.SYMBIONTS,
    steps: [
      { scienceDiscipline: ScienceDiscipline.BANKING, advanceSteps: 1 },
      { scienceDiscipline: ScienceDiscipline.ENGINEERING, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.BLIGHT,
    steps: [
      { scienceDiscipline: ScienceDiscipline.LAW, advanceSteps: 1 },
      { scienceDiscipline: ScienceDiscipline.ENGINEERING, advanceSteps: 1 }
    ]
  },
  {
    botFaction: BotFaction.GOGNOMES,
    steps: [
      { scienceDiscipline: ScienceDiscipline.BANKING, advanceSteps: 1 },
      { scienceDiscipline: ScienceDiscipline.MEDICINE, advanceSteps: 1 }
    ]
  }
]

const itemsMap = new Map<BotFaction,ScienceDisciplineBonus>()
items.forEach(item => itemsMap.set(item.botFaction, item))

export default {

  /**
   * Get cult track bonus for bot faction
   * @param botFaction Bot faction
   * @returns Cult track bonus
   */
  get(botFaction: BotFaction) : ScienceDisciplineBonusSteps[] {
    const item = findMandatoryMap(itemsMap, botFaction)
    return item.steps
  }

}
