'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type SlotItem = { number: string | number; text: string };

export const SlotMachine = ({ items }: { items: SlotItem[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>('.slot-text'); // усі блоки

      // фарбуємо активний, інші – сірі
      const setActive = (idx: number) => {
        els.forEach((el, i) => {
          gsap.to(el, {
            color: i === idx ? '#222222' : '#DCDCDC',
            duration: 0.2,
            overwrite: 'auto',
          });
        });
      };

      // тригери для кожного елемента
      const triggers = els.map((el, i) =>
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })
      );

      // початковий стан
      setActive(0);

      return () => {
        triggers.forEach(t => t.kill());
      };
    },
    { scope: containerRef, dependencies: [items.length] }
  );

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center gap-[18px] mb-[122px]">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center justify-center slot-text">
          <h3 className="text-[286px] tracking-[-0.02em] leading-[100%] font-baikal-extracondensed-bold">
            {item.number}
          </h3>
          <p className="text-[20px] font-baikal-condensed">{item.text}</p>
        </div>
      ))}
    </div>
  );
};
