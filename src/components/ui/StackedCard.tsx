'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
gsap.registerPlugin(ScrollTrigger);

export const StackedCards = ({ cards }: { cards: any }) => {
    console.log('cards in SC', cards);
    const [activeIndex, setActiveIndex] = useState(0);
    // const cards = [
    //     { id: '1', eyebrowText: 'how it works', title: 'Link your existing credit/debit card', variant: 'light', description: 'Schools now need $20 million or more annually just to remain competitive in recruiting and retaining top athletes in the NIL era.' },
    //     { id: '2', eyebrowText: 'how it works', title: 'card2', variant: 'light', description: 'Schools now need $20 million or more annually just to remain competitive in recruiting and retaining top athletes in the NIL era.' },
    //     { id: '3', eyebrowText: 'how it works', title: 'card3', variant: 'light', description: 'Schools now need $20 million or more annually just to remain competitive in recruiting and retaining top athletes in the NIL era.' }
    // ];

    useGSAP(() => {
        const elements = gsap.utils.toArray<HTMLElement>('.stacked-card');
        const triggers: ScrollTrigger[] = [];

        elements.forEach((el, i) => {
            const t = ScrollTrigger.create({
                trigger: el,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveIndex(i),
                onEnterBack: () => setActiveIndex(i),
            });
            triggers.push(t);
        });

        return () => {
            triggers.forEach(t => t.kill());
        };
    }, []);

    return (
        <section
            className="w-full flex flex-col gap-[38px] items-center mb-[122px]"
        >
            {cards.map((card: {
                key: string;
                eyebrowText: string;
                title: string;
                variant: string;
                description: string;
                image: any;
            }, i: number) => (
                <div
                    key={card.key}
                    className={cn(
                        'stacked-card sticky w-[74vw] h-[685px] rounded-[8px] bg-gray-main px-[54px] py-[50px]',
                        `z-[${cards.length - i}]`, {
                        ['bg-dark-card']: card.variant === 'dark',
                    }
                    )}
                    style={{ top: `${i + 1}0vh` }}
                >
                    <div className={cn('flex h-full gap-[78px]', {
                        ['opacity-60']: activeIndex !== i,
                    })}>
                        <div className='w-1/2'>
                            <p className={cn('text-[14px] font-baikal-condensed text-textDark uppercase mb-[12px]', {
                                ['text-accent']: activeIndex === i,
                            })}>{card.eyebrowText}</p>
                            <h3 className='font-baikal-extracondensed-bold text-[70px] capitalize mb-[30px] leading-[94%]'>
                                {card.title}
                            </h3>
                            <p className='font-baikal-light text-[14px] text-textDark capitalize'>{card.description}</p>
                        </div>

                        <div className='relative w-1/2 h-[585px]'>
                            <Image 
                              src={urlFor(card.image).width(1200).height(800).fit('crop').url()}
                              alt={card.title}
                              fill
                              sizes="(min-width: 1024px) 37vw, 90vw"
                              className='object-cover rounded-[8px]'
                              priority={i === 0}
                            />
                        </div>

                    </div>


                </div>
            ))
            }
        </section >
    )
}
