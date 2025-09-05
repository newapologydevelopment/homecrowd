'use client'

import { useRef } from 'react'
import { AnimatedCardsBlock as AnimatedCardsBlockType } from '@/types'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCardsBlockProps {
  block: AnimatedCardsBlockType
}

export function AnimatedCardsBlock({ block }: AnimatedCardsBlockProps) {
  const { title, cards } = block
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // Прив’язуємо всі селектори до containerRef
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>('.card')

      // ДЕСКТОП (>=768px): “стек” карт, що роз’їжджаються в нуль
      mm.add('(min-width: 768px)', () => {
        // Початкові позиції
        gsap.set(cardEls, {
          xPercent: (i: number) => -95 * i,
          ease: 'power2.inOut',
        })

        // Одна спільна тайм-лінія
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom top',
            invalidateOnRefresh: true,
          },
        })

        tl.to(cardEls, {
          xPercent: 0,
          duration: 1,
          ease: 'power2.inOut',
          stagger: 0.08,
        })
      })

      // МОБІЛЬНІ (<=767px): простий fade-up по одній картці
      mm.add('(max-width: 767px)', () => {
        gsap.set(cardEls, { opacity: 0, y: 24 })

        cardEls.forEach((el, i) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            },
          })
        })
      })
    }, containerRef)

    // Cleanup: знімає всі матчі та тригери
    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={containerRef} className="mt-[95px] mb-[95px] px-[30px] md:px-0">
      <h2 className="font-baikal-light text-black-main md:text-[40px] text-[20px] mb-[30px] md:mb-[58px] text-center">
        {title}
      </h2>

      <div className="flex flex-col md:flex-row md:gap-[40px] gap-[30px] justify-center">
        {cards.map((card) => (
          <div
            className="flex flex-col bg-HC_grey text-black-main px-[20px] py-[24px] rounded-[8px] max-w-[380px] card border border-[#222222]/[0.08]"
            key={card.title}
          >
            <h3 className="md:text-[78px] text-[64px] font-baikal-extracondensed-bold leading-[100%] tracking-[-1%] mb-[40px]">
              {card.eyebrowText}
            </h3>
            <div className="text-[16px] font-baikal-light mb-[10px]">{card.title}</div>
            <p className="text-textDark text-[14px] font-baikal-light leading-[19px] tracking-[0%]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
