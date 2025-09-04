'use client'
import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
gsap.registerPlugin(ScrollTrigger)

type Card = {
  _key?: string
  eyebrowText?: string
  title: string
  variant?: 'light' | 'dark'
  description: string
  image: any
}

export const StackedCards = ({ cards }: { cards: Card[] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeId, setActiveId] = useState<string | null>(cards?.[0]?._key ?? null)

  useGSAP(
    () => {
      const triggers: ScrollTrigger[] = []
      const els = gsap.utils.toArray<HTMLElement>('.stacked-card')

      els.forEach((el) => {
        const key = el.dataset.key || null
        const t = ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => key && setActiveId(key),
          onEnterBack: () => key && setActiveId(key),
        })
        triggers.push(t)
      })

      return () => {
        triggers.forEach((t) => t.kill())
      }
    },
    { scope: containerRef, dependencies: [cards] } 
  )

  return (
    <section ref={containerRef} className="w-full flex flex-col gap-[38px] items-center mt-[92px] mb-[122px] px-[30px] md:px-0">
      {cards.map((card, i) => {
        const key = card._key ?? String(i) 
        const isActive = activeId === key
        return (
          <div
            key={key}
            data-key={key}
            className={cn(
              'stacked-card sticky md:w-[74vw] md:h-[685px] h-auto rounded-[8px] bg-gray-main md:px-[54px] px-[20px] md:py-[50px] py-[20px]',
              `z-[${cards.length - i}]`,
              { ['bg-dark-card']: card.variant === 'dark' }
            )}
            style={{ top: `${i + 1}0vh` }}
          >
            <div className={cn('flex flex-col md:flex-row h-full gap-[78px] gap-y-[25px]', { ['opacity-60']: !isActive })}>
              <div className="md:w-1/2 w-full">
                <p
                  className={cn(
                    'text-[14px] font-baikal-condensed text-textDark uppercase mb-[12px]',
                    { ['text-accent']: isActive }
                  )}
                >
                  {card.eyebrowText}
                </p>
                <h3
                  className={cn(
                    'font-baikal-extracondensed-bold md:text-[70px] text-[40px] capitalize md:mb-[30px] mb-[18px] leading-[94%]',
                    { ['text-white-main']: card.variant === 'dark' }
                  )}
                >
                  {card.title}
                </h3>
                <p className="font-baikal-light text-[14px] text-textDark capitalize">
                  {card.description}
                </p>
              </div>

              <div className="relative md:w-1/2 w-full md:h-[585px] h-[300px]">
                <Image
                  src={urlFor(card.image).width(1200).height(800).fit('crop').url()}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1024px) 37vw, 90vw"
                  className="object-cover rounded-[8px]"
                  priority={i === 0}
                />
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
