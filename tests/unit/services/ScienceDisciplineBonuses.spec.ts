import ScienceDisciplineBonuses from '@/services/ScienceDisciplineBonuses'
import BotFaction from '@/services/enum/BotFaction'
import ScienceDiscipline from '@/services/enum/ScienceDiscipline'
import { expect } from 'chai'

describe('ScienceDisciplineBonuses', () => {
  it('get', () => {
    const steps = ScienceDisciplineBonuses.get(BotFaction.GOGNOMES)

    expect(steps.length).to.eq(2)
    expect(steps[0].scienceDiscipline).to.eq(ScienceDiscipline.BANKING)
    expect(steps[0].advanceSteps).to.eq(1)
    expect(steps[1].scienceDiscipline).to.eq(ScienceDiscipline.MEDICINE)
    expect(steps[1].advanceSteps).to.eq(1)
  })
})
