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
  registerControls: (index: number, controls: any) => void;
  scheduleGlobalReset: () => void;
}

export function FooterBlock({ block }: FooterBlockProps) {
  const controlsMap = useRef<Map<number, any>>(new Map());
  const globalResetTimer = useRef<NodeJS.Timeout | null>(null);

  const registerControls = (index: number, controls: any) => {
    controlsMap.current.set(index, controls);
  };

  const scheduleGlobalReset = () => {
    // Clear existing timer
    if (globalResetTimer.current) {
      clearTimeout(globalResetTimer.current);
    }

    // Set new timer for 2 seconds
    globalResetTimer.current = setTimeout(() => {
      controlsMap.current.forEach((controls) => {
        controls.start({
          y: 0,
          transition: { duration: 0.3, ease: "easeOut" },
        });
      });
    }, 1500);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (globalResetTimer.current) {
        clearTimeout(globalResetTimer.current);
      }
    };
  }, []);
  return (
    <div>
      <footer className="relative bg-accent md:h-[471px] h-[174px] overflow-hidden flex flex-col justify-end items-center">
        {/* Main HOMECROWD text */}
        <span className="absolute md:bottom-[-110px] bottom-[12.5px] flex justify-center items-center">
          {"HOMECROWD".split("").map((letter, index) => (
            <Letter
              key={index}
              letter={letter}
              index={index}
              registerControls={registerControls}
              scheduleGlobalReset={scheduleGlobalReset}
            />
          ))}
        </span>

        <div className="absolute md:top-[27px] top-[15px] md:left-[45px] left-[15px] md:right-[32px] right-[15px] flex justify-between items-end">
          <div className="text-[0.8rem] md:text-[0.9rem] text-black-main font-baikal-condensed md:max-w-full max-w-[130px]">
            {block.copyrightText}
          </div>
          <div className="text-[0.8rem] md:text-[0.9rem] text-black-main font-baikal-condensed">
            {block.contactEmail}
          </div>
        </div>
      </footer>
      <div className="block md:hidden bg-white-main h-[220px]" />
    </div>
  );
}

function Letter({
  letter,
  index,
  registerControls,
  scheduleGlobalReset,
}: LetterProps) {
  const controls = useAnimation();
  const isAnimating = useRef(false);

  useEffect(() => {
    registerControls(index, controls);
    controls.set({ y: 0 }); // Ensure initial state is set
  }, [controls, index, registerControls]);

  const handleHover = async () => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    try {
      // Move up by 100px
      await controls.start({
        y: -110,
        transition: { duration: 0.3, ease: "easeOut" },
      });

      // Schedule a global reset for all letters exactly 2s after the first hover
      scheduleGlobalReset();
    } finally {
      isAnimating.current = false;
    }
  };
  return (
    <motion.span
      className="relative inline-block align-bottom cursor-pointer transition-colors duration-200"
      initial={{ y: 0 }}
      whileInView={{ opacity: 1 }}
      animate={controls}
      onMouseEnter={handleHover}
      onTouchStart={handleHover}
      style={{
        willChange: "transform",
        transformOrigin: "bottom center",
      }}
    >
      <span className="md:text-[21.171875rem] text-[3.375rem] text-[#222222] leading-[1] font-baikal-extracondensed-bold">
        {letter}
      </span>
    </motion.span>
  );
}
