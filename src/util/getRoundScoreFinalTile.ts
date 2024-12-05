import ScienceDiscipline from '@/services/enum/ScienceDiscipline'

/**
 * Get round score final tile metadata.
 * @param scoringRoundTile Scoring round final tile
 * @returns Round score final tile metadata
 */
export default function getRoundScoreFinalTile(roundScoreFinalTile: number) : RoundScoreFinalTile {
  switch (roundScoreFinalTile) {
    case 1: return { vpRound6: 8, scienceDiscipline: ScienceDiscipline.MEDICINE }
    case 2: return { vpRound6: 6, scienceDiscipline: ScienceDiscipline.LAW }
    case 3: return { vpRound6: 7, scienceDiscipline: ScienceDiscipline.ENGINEERING }
    case 4: return { vpRound6: 7, scienceDiscipline: ScienceDiscipline.BANKING }
    default:
      throw new Error(`Invalid round score tile: ${roundScoreFinalTile}`)
  }
}

export interface RoundScoreFinalTile {
  vpRound6: number
  scienceDiscipline: ScienceDiscipline
}
