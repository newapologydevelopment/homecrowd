"use client";

import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { FooterBlock as FooterBlockType } from "@/types";

interface FooterBlockProps {
  block: FooterBlockType;
}

interface LetterProps {
  letter: string;
  index: number;
}

export function FooterBlock({ block }: FooterBlockProps) {
  return (
    <footer className="relative bg-accent md:h-[471px] h-[174px] overflow-hidden flex flex-col justify-end items-center">
      {/* Main HOMECROWD text */}
      <div className="absolute md:bottom-[-110px] bottom-0 left-0 right-0 px-[35px] flex justify-center items-center">
        {"HOMECROWD".split("").map((letter, index) => (
          <Letter key={index} letter={letter} index={index} />
        ))}
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

function Letter({ letter, index }: LetterProps) {
  const controls = useAnimation();
  const isAnimating = useRef(false);
  const resetTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    controls.set({ y: 0 }); // початковий стан
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, [controls]);

  const handleHover = async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    try {
      // Піднімаємо літеру (енергійно)
      await controls.start({
        y: -110,
        transition: { duration: 0.2, ease: "easeOut", type: "spring", stiffness: 300, damping: 20 },
      });

      // Таймер для опускання назад через 1.5 секунди (плавно)
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => {
        controls.start({
          y: 0,
          transition: { duration: 0.5, ease: "easeInOut" },
        });
      }, 1000);
    } finally {
      isAnimating.current = false;
    }
  };

  return (
    <motion.span
      className="relative inline-block align-bottom cursor-pointer transition-colors duration-200"
      initial={{ y: 0 }}
      animate={controls}
      onMouseEnter={handleHover}
      onTouchStart={handleHover}
      style={{
        willChange: "transform",
        transformOrigin: "bottom center",
      }}
    >
      <span className="md:text-[21.171875rem] text-[70px] text-[#222222] leading-[1] font-baikal-extracondensed-bold">
        {letter}
      </span>
    </motion.span>
  );
}
