import ScienceDiscipline from '@/services/enum/ScienceDiscipline'

/**
 * Get round score tile metadata.
 * @param scoringRoundTile Scoring round tile
 * @returns Round score tile metadata
 */
export default function getRoundScoreTile(roundScoreTile: number) : RoundScoreTile {
  switch (roundScoreTile) {
    case 1: return { vpRound123: 3, vpRound456: 7, scienceDiscipline: ScienceDiscipline.BANKING }
    case 2: return { vpRound123: 4, vpRound456: 4, scienceDiscipline: ScienceDiscipline.BANKING }
    case 3: return { vpRound123: 3, vpRound456: 5, scienceDiscipline: ScienceDiscipline.BANKING }
    case 4: return { vpRound123: 4, vpRound456: 4, scienceDiscipline: ScienceDiscipline.LAW }
    case 5: return { vpRound123: 2, vpRound456: 5, scienceDiscipline: ScienceDiscipline.LAW }
    case 6: return { vpRound123: 3, vpRound456: 5, scienceDiscipline: ScienceDiscipline.LAW }
    case 7: return { vpRound123: 3, vpRound456: 5, scienceDiscipline: ScienceDiscipline.ENGINEERING, hasSpade: true }
    case 8: return { vpRound123: 2, vpRound456: 5, scienceDiscipline: ScienceDiscipline.ENGINEERING }
    case 9: return { vpRound123: 0, vpRound456: 4, scienceDiscipline: ScienceDiscipline.ENGINEERING }
    case 10: return { vpRound123: 4, vpRound456: 4, scienceDiscipline: ScienceDiscipline.MEDICINE }
    case 11: return { vpRound123: 3, vpRound456: 5, scienceDiscipline: ScienceDiscipline.MEDICINE }
    case 12: return { vpRound123: 2, vpRound456: 5, scienceDiscipline: ScienceDiscipline.MEDICINE }
    default:
      throw new Error(`Invalid round score tile: ${roundScoreTile}`)
  }
}

export interface RoundScoreTile {
  vpRound123: number
  vpRound456: number
  scienceDiscipline: ScienceDiscipline
  hasSpade?: boolean
}
