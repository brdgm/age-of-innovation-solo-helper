import Card from '@/services/Card'
import Cards from '@/services/Cards'
import InitialWorkshop from '@/services/enum/InitialWorkshop'
import rollDice from '@brdgm/brdgm-commons/src/util/random/rollDice'

/**
 * Get initial workshop placements for a new game.
 * If multiple bots, it will return different placements for each bot.
 * @param botCount Number of bots
 */
export default function getInitialWorkshopPlacements(botCount: number) : InitialWorkshopPlacement[] {
  const result : InitialWorkshopPlacement[] = []
  for (let i = 0; i < botCount; i++) {
    result.push(toInitialWorkshopPlacement(drawDifferentCard(result)))
  }
  return result
}

function drawDifferentCard(existingPlacements: InitialWorkshopPlacement[]) : Card {
  const availableCards = Array.from(Cards.getAll().values())
      .filter(card => !has(existingPlacements, toInitialWorkshopPlacement(card)))
  const selectedIndex = rollDice(availableCards.length)
  return availableCards[selectedIndex -1 ]
}

function toInitialWorkshopPlacement(card: Card) {
  const initialWorkshopMarked = card.initialWorkshopMarked
  const initialWorkshopUnmarked = card.initialWorkshopUnmarked
  return {
    initialWorkshopMarked,
    initialWorkshopUnmarked
  }
}

function has(existingPlacements: InitialWorkshopPlacement[], item:InitialWorkshopPlacement) {
  return existingPlacements.find(i => i.initialWorkshopMarked==item.initialWorkshopMarked 
      && i.initialWorkshopUnmarked==item.initialWorkshopUnmarked)
}

export interface InitialWorkshopPlacement {
  initialWorkshopMarked: InitialWorkshop
  initialWorkshopUnmarked: InitialWorkshop
}
