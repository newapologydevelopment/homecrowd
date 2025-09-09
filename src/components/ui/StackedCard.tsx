'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

type Card = {
  _key?: string
  eyebrowText?: string
  title: string
  variant?: 'light' | 'dark'
  description: string
  image: any
}

export const StackedCards = ({ cards }: { cards: Card[] }) => {
  const containerRef = useRef<HTMLElement>(null)
  const [activeId, setActiveId] = useState<string | null>(cards?.[0]?._key ?? null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const items = Array.from(container.querySelectorAll<HTMLElement>('.stacked-card'))
    if (!items.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const centered = [...entries]
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        const id = centered?.target.getAttribute('data-key')
        if (id) setActiveId(id)
      },
      { root: null, rootMargin: '-30% 0px -30% 0px', threshold: [0.2, 0.4, 0.6, 0.8, 1] }
    )

    items.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [cards])

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative w-full flex flex-col gap-[38px] items-center mt-[92px] mb-[122px] px-[30px] md:px-0 pb-[160px] md:pb-[200px]',
        '[--stack-step:70px] md:[--stack-step:100px]'
      )}
    >
      {cards.map((card, i) => {
        const key = card._key ?? String(i)
        const isActive = activeId === key

        return (
          <div
            key={key}
            data-key={key}
            className={cn(
              'stacked-card sticky w-full top-[70px] md:top-[100px] md:w-[74vw] lg:max-w-[1176px] rounded-[8px] md:px-[54px] px-[20px] md:py-[50px] py-[20px] border transition-colors',
              card.variant === 'dark'
                ? 'bg-dark-card border-[#FDFDFD]/[0.24]'
                : 'bg-gray-main border-[#222]/[0.08]'
            )}
            // Instead of 100px: use var(--stack-step)
            style={{ transform: `translateY(calc(var(--stack-step) * ${i}))` }}
          >
            <div
              className={cn(
                'flex flex-col md:flex-row h-full gap-[78px] gap-y-[25px] transition-opacity',
                !isActive && 'opacity-60'
              )}
            >
              <div className="md:w-1/2 w-full">
                {card.eyebrowText && (
                  <p
                    className={cn(
                      'text-[14px] font-baikal-condensed uppercase mb-[12px] transition-colors',
                      isActive
                        ? 'text-accent'
                        : (card.variant === 'dark' ? 'text-white-main' : 'text-textDark')
                    )}
                  >
                    {card.eyebrowText}
                  </p>
                )}

                <h3
                  className={cn(
                    'font-baikal-extracondensed-bold md:text-[70px] text-[40px] capitalize md:mb-[30px] mb-[18px] leading-[94%]',
                    card.variant === 'dark' ? 'text-white-main' : ''
                  )}
                >
                  {card.title}
                </h3>

                <p
                  className={cn(
                    'font-baikal-light text-[14px] capitalize md:max-w-[80%]',
                    card.variant === 'dark' ? 'text-white-main/80' : 'text-textDark'
                  )}
                >
                  {card.description}
                </p>
              </div>

              <div className="relative md:w-1/2 w-full md:h-[585px] h-[300px]">
                <Image
                  src={urlFor(card.image).width(1200).fit('max').url()}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1024px) 37vw, 90vw"
                  className="object-cover rounded-[8px]"
                  priority={i === 0}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
