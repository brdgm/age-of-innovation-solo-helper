import DifficultyLevelParameters from '@/services/DifficultyLevelParameters'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'

describe('services/DifficultyLevelParameters', () => {
  it('get', () => {
    const params = DifficultyLevelParameters.get(DifficultyLevel.AUTOMAECHTIG, 5)

    expect(params).not.undefined
    expect(params?.round).to.eq(5)
    expect(params?.shipLevel).to.eq(2)
    expect(params?.victoryPoints).to.eq(3)
  })
})
