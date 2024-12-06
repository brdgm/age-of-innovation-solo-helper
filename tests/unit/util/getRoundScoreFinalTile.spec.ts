import { expect } from 'chai'
import getRoundScoreFinalTile from '@/util/getRoundScoreFinalTile'

describe('util/getRoundScoreFinalTile', () => {
  it('getRoundScoreFinalTile', () => {
    for (let tile=1; tile<=4; tile++) {
      expect(getRoundScoreFinalTile(tile)).to.not.undefined
    }
  })
})
