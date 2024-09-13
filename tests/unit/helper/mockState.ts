import BotFaction from '@/services/enum/BotFaction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { Round, State } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.AUTOMALEIN,
      playerSetup: {
        playerCount: params?.playerCount ?? 1,
        botCount: params?.botCount ?? 1,
        botFaction: params?.botFaction ?? [BotFaction.SIMPLETONS]
      }
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  difficultyLevel?: DifficultyLevel
  playerCount?: number
  botCount?: number
  botFaction?: BotFaction[]
  rounds?: Round[]
}
