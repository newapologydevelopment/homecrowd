'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { StackedCardsBlock as StackedCardsBlockType } from '@/types'
import { urlFor } from '@/lib/sanity'
import { StackedCards } from '../ui/StackedCard'

interface StackedCardsBlockProps {
  block: StackedCardsBlockType
}

export function StackedCardsBlock({ block }: StackedCardsBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Transform scroll progress to card indices
  const cardProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, block.cards.length - 1]
  )

  useEffect(() => {
    const unsubscribe = cardProgress.onChange((latest) => {
      const newIndex = Math.round(latest)
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < block.cards.length) {
        setActiveIndex(newIndex)
      }
    })

    return unsubscribe
  }, [cardProgress, activeIndex, block.cards.length])

  return (
    <StackedCards 
    cards={block.cards}
     />
  )
}

