import ScienceDiscipline from '@/services/enum/ScienceDiscipline'
import { RoundScoreTile } from './getRoundScoreTile'

/**
 * Get round score final tile metadata.
 * @param scoringRoundTile Scoring round final tile
 * @returns Round score final tile metadata
 */
export default function getRoundScoreFinalTile(roundScoreFinalTile: number) : RoundScoreTile {
  switch (roundScoreFinalTile) {
    case 1: return { vpRound123: 0, vpRound456: 8, scienceDiscipline: ScienceDiscipline.MEDICINE }
    case 2: return { vpRound123: 0, vpRound456: 6, scienceDiscipline: ScienceDiscipline.LAW }
    case 3: return { vpRound123: 0, vpRound456: 7, scienceDiscipline: ScienceDiscipline.ENGINEERING }
    case 4: return { vpRound123: 0, vpRound456: 7, scienceDiscipline: ScienceDiscipline.BANKING }
    default:
      throw new Error(`Invalid round score tile: ${roundScoreFinalTile}`)
  }
}
