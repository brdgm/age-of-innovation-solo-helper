import CardDeck from '@/services/CardDeck'

export default function mockCardDeck(params?: MockCardDeckParams) : CardDeck {  
  return CardDeck.fromPersistence({
    deck: params?.deck ?? [],
    reserve: params?.reserve ?? [],
    discard: params?.discard ?? []
  })
}

export interface MockCardDeckParams {
  deck?: string[]
  reserve?: string[]
  discard?: string[]
}
