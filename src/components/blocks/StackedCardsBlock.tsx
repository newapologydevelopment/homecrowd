'use client'

import { StackedCardsBlock as StackedCardsBlockType } from '@/types'
import { StackedCards } from '../ui/StackedCard'

interface StackedCardsBlockProps {
  block: StackedCardsBlockType
}

export function StackedCardsBlock({ block }: StackedCardsBlockProps) {
  const { cards } = block;
  return (
    <StackedCards
      cards={block.cards}
    />
  )
}

