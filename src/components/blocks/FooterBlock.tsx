"use client";

import { useEffect, useRef } from "react";
import { FooterBlock as FooterBlockType } from "@/types";
import gsap from "gsap";

interface FooterBlockProps {
  block: FooterBlockType;
}

export function FooterBlock({ block }: FooterBlockProps) {
  const footerRef = useRef<HTMLElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<Array<{
    el: SVGPathElement;
    cx: number;
    cy: number;
    h: number;
    maxLift: number;
  }>>([]);

  // вимірюємо літери (позиції/висоти) — і при ресайзі також
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const svg = footer.querySelector("#word-homecrowd") as SVGGElement | null;
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>('path[id^="letter-"]'));

    const measure = () => {
      lettersRef.current = paths.map((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const h = r.height || 1; // guard
        const maxLift = 1.2 * h; // максимум ~120% від висоти літери
        // ставимо origin внизу, щоб "підскакувало" природніше
        gsap.set(el, { transformOrigin: "50% 100%" });
        return { el, cx, cy, h, maxLift };
      });
    };

    measure();

    // спостерігач за розмірами
    const ro = new ResizeObserver(() => measure());
    ro.observe(footer);
    window.addEventListener("scroll", measure, { passive: true }); // на випадок сдвигів лейауту

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", measure);
    };
  }, []);

  useEffect(() => {
    const hover = hoverRef.current;
    if (!hover) return;

    // налаштування впливу
    const influenceRadius = 520; // px — наскільки далеко сусідні "ловлять" ефект
    const falloffPower = 1.6; // >1 — швидше згасає до країв
    const ease = "power2.out";

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      for (const L of lettersRef.current) {
        // горизонтальна близькість до центру літери
        const dx = Math.abs(x - L.cx);

        // можна трохи врахувати вертикаль: хто ближче по Y, той сильніше (опціонально)
        const dy = Math.abs(y - L.cy);
        const d = Math.hypot(dx * 0.9, dy * 0.3); // легкий пріоритет по X

        // 0..1
        const t = Math.max(0, 1 - d / influenceRadius);
        // кривизна згасання
        const weight = Math.pow(t, falloffPower);

        const lift = -weight * L.maxLift; // вгору = від’ємний y
        gsap.to(L.el, { y: lift, duration: 0.18, ease, overwrite: true });
      }
    };

    const onLeave = () => {
      // повернути всі букви на місце
      for (const L of lettersRef.current) {
        gsap.to(L.el, { y: 0, duration: 0.35, ease: "power3.out" });
      }
    };

    hover.addEventListener("mousemove", onMove);
    hover.addEventListener("mouseleave", onLeave);

    return () => {
      hover.removeEventListener("mousemove", onMove);
      hover.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-accent md:h-[471px] h-[174px] overflow-hidden flex flex-col justify-end items-center"
    >
      {/* Невидима зона ховера над літерами (ловить курсор) */}
      <div ref={hoverRef} className="absolute bottom-0 left-0 right-0 h-[70vh]" />

      <div className="w-full h-full translate-y-[60%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 5595.5 873.4"
          fill="currentColor"
          aria-labelledby="title"
          className="w-full h-auto overflow-visible"
        >
          <title id="title">HOMECROWD wordmark</title>
          <g id="word-homecrowd">
            <path id="letter-H" d="M70.2,837.7h181v-325h133v325h181V36.7h-181v320h-133V36.7H70.2v801Z" />
            <path
              id="letter-O1"
              fillRule="evenodd"
              d="M882.2,848.7c179,0,265-69,265-253v-318c0-184-86-253-265-253s-265,69-265,253v318c0,184,86,253,265,253Z
                 M882.2,716.7c-59,0-73-39-73-94V250.7c0-55,14-94,73-94s73,39,73,94v372c0,55-14,94-73,94Z"
            />
            <path
              id="letter-M"
              d="M1199.2,837.7h165V283.7h2l125,554h154l126-554h4l-4,554h181V36.7h-273l-100,479h-2l-99-479h-279в801Z"
            />
            <path id="letter-E" d="M2004.2,837.7h413v-155h-231v-173h217v-156h-217v-162h231V36.7h-413v801Z" />
            <path
              id="letter-C"
              d="M2720.2,848.7c179,0,265-69,265-253v-81h-192v108c0,55-14,94-73,94s-73-39-73-94V250.7c0-55,14-94,73-94s73,39,73,94v84h192v-57c0-184-86-253-265-253s-265,69-265,253v318c0,184,86,253,265,253Z"
            />
            <path
              id="letter-R"
              fillRule="evenodd"
              d="M3328.2,837.7h179v-260c0-70-16-140-87-154v-2c72-28,99-88,99-166v-33c0-134-74-186-265-186h-219v800h182v-337h44c54,0,66,25,66,79l1,259Z
                 M3215.2,369.7v-201h40c53,0,80,15,80,68v65c0,52-22,68-80,68h-40Z"
            />
            <path
              id="letter-O2"
              fillRule="evenodd"
              d="M3822.2,848.7c179,0,265-69,265-253v-318c0-184-86-253-265-253s-265,69-265,253v318c0,184,86,253,265,253Z
                 M3822.2,716.7c-59,0-73-39-73-94V250.7c0-55,14-94,73-94s73,39,73,94v372c0,55-14,94-73,94Z"
            />
            <path id="letter-W" d="M4222.2,837.7h224l87-485h2l88,485h233l128-801h-165l-81,485h-2l-93-485h-195l-92,483h-2l-81-483h-181l130,801Z" />
            <path
              id="letter-D"
              fillRule="evenodd"
              d="M5021.2,839.7h227c167,0,277-50,277-220V254.7c0-173-116-218-277-218h-227v803Z
                 M5204.2,700.7V175.7h35c58,0,96,19,96,107v309c0,87-39,109-96,109h-35Z"
            />
          </g>
        </svg>
      </div>

      <div className="absolute top-0 left-0 right-0 flex justify-between md:items-end items-start md:px-[35px] px-[15px] md:pt-[27px] pt-[15px]">
        <div className="md:text-[0.8rem] text-[12px] max-w-[118px] md:max-w-full text-black-main font-baikal-condensed">
          {block.copyrightText}
        </div>
        <div className="md:text-[0.8rem] text-[12px] text-black-main font-baikal-condensed">
          {block.contactEmail}
        </div>
      </div>
    </footer>
  );
}
