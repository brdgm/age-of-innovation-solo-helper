import { CardDeckPersistence } from '@/store/state'
import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import DifficultyLevel from './enum/DifficultyLevel'

/**
 * Deck of cards with action/support cards and reserve.
 */
export default class CardDeck {

  private static readonly CARD_3 = '*3'
  private static readonly CARD_13 = '13'

  private _deck : Card[]
  private readonly _reserve : Card[]
  private _discard : Card[]

  public constructor(deck : Card[], reserve : Card[], discard : Card[]) {
    this._deck = deck
    this._reserve = reserve
    this._discard = discard
  }

  public get deck() : readonly Card[] {
    return this._deck
  }

  public get reserve() : readonly Card[] {
    return this._reserve
  }

  public get discard() : readonly Card[] {
    return this._discard
  }

  public get actionCard() : Card|undefined {
    return this._deck[0]
  }

  public get supportCard() : Card|undefined {
    return this._discard[0]
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      deck: this._deck.map(card => card.id),
      reserve: this._reserve.map(card => card.id),
      discard: this._discard.map(card => card.id)      
    }
  }

  /**
   * Draw a new card. Topmost card on discard pile is support card, topmost card on deck is action card.
   * @return true if a card was drawn and there is still an action card left. if false, automa will pass.
   */
  public draw() : boolean {
    const drawnCard = this._deck.shift()
    if (drawnCard) {
      this._discard.unshift(drawnCard)
    }
    return drawnCard != undefined && this._deck.length >= 1
  }

  /**
   * Checks if Automa passes in this round.
   */
  public isPass() : boolean {
    return (this._deck.length == 0)
        || (this._deck.length <= 2 && (this.actionCard?.pass || false))
  }

  /**
   * Prepare card deck for new round, adding additional card from reserve.
   */
  public prepareForNextRound() : void {
    // discard all remaining cards
    for (const card of this._deck) {
      this._discard.push(card)
    }
    this._deck = []
    // pull in a reserve card
    const reserveCard = this._reserve.shift()
    if (reserveCard) {
      this._discard.push(reserveCard)
    }
    // shuffle discard as new deck
    this._deck = shuffle(this._discard)
    this._discard = []
  }

  /**
   * Creates a shuffled new card deck with random advanced cards.
   */
  public static new(difficultyLevel : DifficultyLevel) : CardDeck {
    let deck = shuffle(Cards.getAll().filter(card => card.starter))
    let reserve = shuffle(Cards.getAll().filter(card => !card.starter))

    if (difficultyLevel == DifficultyLevel.AUTOMAECHTIG) {
      // add 1 random card from reserve to deck
      deck.push(reserve.pop()!)
    }
    else if (difficultyLevel == DifficultyLevel.ULTOMA) {
      // add 2 random card from reserve to deck
      deck.push(reserve.pop()!)
      deck.push(reserve.pop()!)
    }
    else if (difficultyLevel == DifficultyLevel.ALPTRAUMA) {
      // add 1 random card from reserve to deck and card 13
      reserve = reserve.filter(card => card.id != CardDeck.CARD_13)
      deck.push(Cards.get(CardDeck.CARD_13))
      deck.push(reserve.pop()!)
    }

    // shuffle decks
    deck = shuffle(deck)
    reserve = shuffle(reserve)

    if (difficultyLevel == DifficultyLevel.AUTOMALEIN) {
      // remove card *3 from deck and put it on top of reserve deck
      deck = deck.filter(card => card.id != CardDeck.CARD_3)
      reserve.unshift(Cards.get(CardDeck.CARD_3))
    }

    return new CardDeck(deck, reserve, [])
  }

  /**
   * Re-creates a card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.deck.map(Cards.get),
      persistence.reserve.map(Cards.get),
      persistence.discard.map(Cards.get)
    )
  }

}
