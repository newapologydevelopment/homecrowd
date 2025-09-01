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
        controls.start({ y: 0, transition: { duration: 0.3, ease: "easeOut" } });
      });
    }, 2000);
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
    <footer className="relative bg-[#00C8FF] min-h-screen flex items-end justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-white rounded-full opacity-25 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-white rounded-full opacity-35 animate-pulse delay-1500"></div>
      </div>

      {/* Top text */}
      <div className="absolute top-8 right-8 text-right">
        <p 
          className="text-[#222222] uppercase text-sm leading-none"
          style={{ 
            fontFamily: 'var(--font-baikal-condensed)',
            fontWeight: 400,
            fontStyle: 'normal'
          }}
        >
          Premium Home Services
        </p>
      </div>

      {/* Main HOMECROWD text */}
      <div className="relative mb-32">
        <div className="flex items-end justify-center">
          {'HOMECROWD'.split('').map((letter, index) => (
            <Letter
              key={index}
              letter={letter}
              index={index}
              registerControls={registerControls}
              scheduleGlobalReset={scheduleGlobalReset}
            />
          ))}
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <div className="text-[#222222] text-sm">
          {block.copyrightText}
        </div>
        <div className="text-[#222222] text-sm">
          {block.contactEmail}
        </div>
      </div>
    </footer>
  );
}

function Letter({ letter, index, registerControls, scheduleGlobalReset }: LetterProps) {
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
      // Move up by 60px (immediate response via whileHover, but controls.start ensures the timed sequence)
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
      initial={{ y: 0 }} // Explicit initial y
      whileInView={{ opacity: 1 }}
      whileHover={{ y: -60 }} // Immediate hover lift
      animate={controls}
      onMouseEnter={handleHover}
      onTouchStart={handleHover}
      style={{ 
        willChange: 'transform',
        transformOrigin: 'bottom center'
      }}
    >
      <span 
        className="text-[clamp(96px,12vw,271px)] text-[#222222] hover:text-[#1a1a1a]"
        style={{ 
          fontFamily: 'var(--font-baikal-extracondensed-bold)',
          fontWeight: 800,
          fontStyle: 'normal'
        }}
      >
        {letter}
      </span>
    </motion.span>
  );
}
