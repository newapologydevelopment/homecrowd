"use client";

import { useState } from "react";
import { motion, AnimationControls, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { FooterBlock as FooterBlockType } from "@/types";

interface FooterBlockProps {
  block: FooterBlockType;
}

export function FooterBlock({ block }: FooterBlockProps) {
  // Brand word to render letter-by-letter
  const brand = "HOMECROWD";

  // Keep controls for all letters to reset them together
  const letterControlsRef = useRef<AnimationControls[]>(Array(brand.length));
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const registerControls = (index: number, controls: AnimationControls) => {
    letterControlsRef.current[index] = controls;
  };

  const scheduleGlobalReset = () => {
    if (resetTimerRef.current) return; // Only start once (first hover)
    resetTimerRef.current = setTimeout(() => {
      letterControlsRef.current.forEach((controls) => {
        controls?.start({ y: 0, transition: { duration: 0.3, ease: "easeInOut" } });
      });
      resetTimerRef.current = null;
    }, 2000);
  };

  return (
    <footer className="relative overflow-hidden bg-[#00C8FF] text-[#222222] py-16 min-h-[400px] flex items-center">
      {/* Top Left - Copyright */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="absolute top-6 left-6"
      >
        <p 
          className="text-[14px] leading-[100%] tracking-[0%] uppercase text-left text-[#222222]"
          style={{
            fontFamily: "Baikal VAR, sans-serif",
            fontWeight: 400,
            fontStyle: "condensed",
          }}
        >
          {block.copyrightText || `©2025 HOMECROWD. ALL RIGHTS RESERVED`}
        </p>
      </motion.div>

      {/* Top Right - Contact Email */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="absolute top-6 right-6"
      >
        <p 
          className="font-baikal text-[14px] leading-[100%] tracking-[0%] uppercase text-right text-[#222222]"
     
        >
          {block.contactEmail || "INFO@HOMECROWD.ONLINE"}
        </p>
      </motion.div>

      {/* Center - HOMECROWD rendered per letter with hover lift */}
      <div className="w-full flex justify-center items-end px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-[-55px] w-full text-center font-baikal font-extrabold uppercase leading-none tracking-tight text-[#222222] whitespace-nowrap text-[clamp(96px,12vw,271px)]"
        >
          {Array.from(brand).map((letter, index) => (
            <Letter
              key={`${letter}-${index}`}
              letter={letter}
              index={index}
              registerControls={registerControls}
              scheduleGlobalReset={scheduleGlobalReset}
            />
          ))}
        </motion.div>
      </div>
    </footer>
  );
}

interface LetterProps {
  letter: string;
  index: number;
  registerControls: (index: number, controls: AnimationControls) => void;
  scheduleGlobalReset: () => void;
}

function Letter({ letter, index, registerControls, scheduleGlobalReset }: LetterProps) {
  const controls = useAnimation();
  const isAnimating = useRef(false);

  useEffect(() => {
    registerControls(index, controls);
  }, [controls, index, registerControls]);

  const handleHover = async () => {
    if (isAnimating.current) return;
    
    isAnimating.current = true;
    
    try {
      // Move up by 60px
      await controls.start({ 
        y: -60, 
        transition: { duration: 0.3, ease: "easeOut" } 
      });
      
      // Schedule a global reset for all letters exactly 2s after the first hover
      scheduleGlobalReset();
    } finally {
      isAnimating.current = false;
    }
  };

  return (
    <motion.span
      className="inline-block align-bottom cursor-pointer transition-colors duration-200"
      animate={controls}
      onMouseEnter={handleHover}
      onTouchStart={handleHover}
      style={{ 
        willChange: 'transform',
        transformOrigin: 'bottom center'
      }}
    >
      {letter}
    </motion.span>
  );
}
