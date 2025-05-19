import { expect } from 'chai'
import getInitialWorkshopPlacements from '@/util/getInitialWorkshopPlacements'

describe('util/getInitialWorkshopPlacements', () => {
  it('returns correct number of placements for 1 bot', () => {
    const result = getInitialWorkshopPlacements(1)

    expect(result.length).to.eq(1)
  })

  it('returns correct number of placements for 2 bots', () => {
    const result = getInitialWorkshopPlacements(2)

    expect(result.length).to.eq(2)
    expect(result[0].initialWorkshopMarked).to.not.eq(result[1].initialWorkshopMarked)
    expect(result[0].initialWorkshopUnmarked).to.not.eq(result[1].initialWorkshopUnmarked)
  })

  it('returns empty array for 0 bots', () => {
    const result = getInitialWorkshopPlacements(0)
    expect(result.length).to.eq(0)
  })
})