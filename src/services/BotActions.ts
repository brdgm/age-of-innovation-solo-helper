import BotAction from './BotAction'
import Card from './Card'
import { DifficultyLevelParameterRound } from './DifficultyLevelParameter'
import DifficultyLevelParameters from './DifficultyLevelParameters'
import Action from './enum/Action'
import BotFaction from './enum/BotFaction'
import ScienceDisciplineSelection from './enum/ScienceDisciplineSelection'
import DifficultyLevel from './enum/DifficultyLevel'

/**
 * Determines actions and parameterization based on current action and support card.
 * Faction actions are resolved, dynamic ship level and victory points as well.
 */
export default class BotActions {

  private readonly _actions : BotAction[]
  private readonly _dlParams : DifficultyLevelParameterRound

  constructor(actionCard : Card, supportCard : Card, round : number,
        botFaction : BotFaction, difficultyLevel : DifficultyLevel) {
    this._dlParams = DifficultyLevelParameters.get(difficultyLevel, round)
    this._actions = actionCard.actions
        .flatMap(action => this.toBotActions(action, actionCard, supportCard, round, botFaction))
  }

  public get actions() : readonly BotAction[] {
    return this._actions
  }

  private toBotActions(action : Action, actionCard : Card, supportCard : Card,
        round : number, botFaction : BotFaction) : BotAction[] {
    let result
    
    if (action == Action.FACTION_ACTION) {
      result = this.getFactionBotActions(botFaction)
    }
    else {
      result = [{action: action}]
    }

    // ongoing benefit for powermongers
    if (botFaction == BotFaction.POWERMONGERS) {
      const benefitApplyIndex = result.findIndex(botAction => botAction.action == Action.TRANSFORM_AND_BUILD || botAction.action == Action.UPGRADE)
      if (benefitApplyIndex >= 0) {
        result = [
          ...result.slice(0, benefitApplyIndex+1),
          {action: Action.ADVANCE_SCIENCE_DISCIPLINE, botFaction: BotFaction.POWERMONGERS, scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP},
          ...result.slice(benefitApplyIndex+1,result.length)
        ] 
      }
    }

    // apply defaults from support card
    result.forEach(botAction => {
      botAction.shipLevel = botAction.shipLevel ?? this._dlParams.shipLevel
      botAction.victoryPointsDifficultyLevel = botAction.victoryPointsDifficultyLevel ?? actionCard.victoryPointsDifficultyLevel
      botAction.victoryPoints = botAction.victoryPoints ?? actionCard.victoryPoints 
      if (botAction.victoryPointsDifficultyLevel) {
        botAction.victoryPoints = Math.max(this._dlParams.victoryPoints + (botAction.victoryPoints ?? 0), 0)
        botAction.victoryPointsDifficultyLevel = undefined
      }
      botAction.structure = botAction.structure ?? supportCard.structure
      botAction.terrainPriority = botAction.terrainPriority ?? supportCard.terrainPriority
      botAction.directionalSelection = botAction.directionalSelection ?? supportCard.directionalSelection
      botAction.directionalSelectionCount = botAction.directionalSelectionCount ?? supportCard.directionalSelectionCount
      botAction.scienceDisciplineSelection = botAction.scienceDisciplineSelection ?? supportCard.scienceDisciplineSelection
    })

    // filter out actions not relevant for current round
    return result.filter(botAction => (botAction.action != Action.TAKE_INNOVATION || round >= 3)
        && (botAction.action != Action.GAIN_VICTORY_POINTS || ((botAction.victoryPoints ?? 0) > 0)))
  }

  private getFactionBotActions(botFaction : BotFaction) : BotAction[] {
    switch (botFaction) {
      case BotFaction.SIMPLETONS:
        return [
          {action: Action.TRANSFORM_AND_BUILD},
          {action: Action.GAIN_VICTORY_POINTS, victoryPointsDifficultyLevel:true}
        ]
      case BotFaction.KUDDLERS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.KUDDLERS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPointsDifficultyLevel:true, victoryPoints: +1}
        ]
      case BotFaction.DRUIDS:
        return [
          {action: Action.TRANSFORM_AND_BUILD},
          {action: Action.ADVANCE_SCIENCE_DISCIPLINE, botFaction: BotFaction.DRUIDS, scienceDisciplineSelection: ScienceDisciplineSelection.CATCH_UP}
        ]
      case BotFaction.RACELINGS:
        return [
          {action: Action.TRANSFORM_AND_BUILD}
        ]
      case BotFaction.WANDERERS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.WANDERERS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPointsDifficultyLevel:true, victoryPoints: -1}
        ]
      case BotFaction.MIMICS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.MIMICS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPointsDifficultyLevel:true, victoryPoints: +1}
        ]
      case BotFaction.POWERMONGERS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.POWERMONGERS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPointsDifficultyLevel:true}
        ]
      case BotFaction.SYMBIONTS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.SYMBIONTS},
          {action: Action.FACTION_SYMBIONTS_PLACE_CUBE, botFaction: BotFaction.SYMBIONTS}
        ]
      case BotFaction.BLIGHT:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.BLIGHT},
          {action: Action.FACTION_BLIGHT_TRANSFORM_FALLOW_LAND, botFaction: BotFaction.BLIGHT},
          {action: Action.GAIN_VICTORY_POINTS, victoryPointsDifficultyLevel:true, victoryPoints: +1}
        ]
      case BotFaction.GOGNOMES:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.GOGNOMES}
        ]
      default:
        throw new Error('Invalid bot faction: ' + botFaction)
    }
  }

}
