import { expect } from 'chai'
import getRoundScoreTile from '@/util/getRoundScoreTile'

describe('util/getRoundScoreTile', () => {
  it('getRoundScoreTile', () => {
    for (let tile=1; tile<=12; tile++) {
      expect(getRoundScoreTile(tile)).to.not.undefined
    }
  })
})
