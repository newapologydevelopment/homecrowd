'use client'

import { motion } from 'framer-motion'
import { AnimatedCardsBlock as AnimatedCardsBlockType } from '@/types'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCardsBlockProps {
  block: AnimatedCardsBlockType
}

export function AnimatedCardsBlock({ block }: AnimatedCardsBlockProps) {
  const { title, cards } = block;

  useGSAP(() => {
    const cards = gsap.utils.toArray('.card');
    cards.forEach((card, index) => {
      gsap.set(card as HTMLElement, {
        xPercent: -95 * index,
        ease: 'power2.inOut',
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.card',
        start: 'top 50%',
        end: 'bottom top',
      },
    });

    tl.to(cards, {
      xPercent: 0,
      duration: 1,
      ease: 'power2.inOut',
    });
  }, []);

  return (
    <section className='mb-[255px]'>
      <h2 className='font-baikal-light text-black-main text-[40px] mb-[58px] text-center'>{title}</h2>

      <div className='flex gap-[40px] justify-center'>
        {cards.map((card, index) => (
          <div
            className='flex flex-col bg-HC_grey text-black-main px-[20px] py-[24px] rounded-[8px] max-w-[380px] card'
            key={card.title}
          >
            <h2 className='text-[78px] font-baikal-extracondensed-bold leading-[100%] tracking-[-1%] mb-[40px]'>{card.eyebrowText}</h2>
            <div className=' text-[16px] font-baikal-light mb-[10px]'>{card.title}</div>
            <p className='text-textDark text-[14px] font-baikal-light leading-[19px] tracking-[0%]'>{card.description}</p>
          </div>
        ))}
      </div>

    </section>
  )
}

