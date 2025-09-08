"use client";

import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { FooterBlock as FooterBlockType } from "@/types";

interface FooterBlockProps {
  block: FooterBlockType;
}

interface LetterProps {
  letter: string;
  index: number;
  mousePosition: { x: number; y: number };
  letterRefs: React.RefObject<HTMLSpanElement>[];
}

export function FooterBlock({ block }: FooterBlockProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        // Calculate mouse position relative to footer, even when mouse is outside
        const relativeX = e.clientX - rect.left;
        const relativeY = e.clientY - rect.top;
        
        // Only trigger animation if mouse is within a reasonable distance of the footer
        const distanceFromFooter = Math.abs(e.clientY - (rect.top + rect.height));
        const maxTriggerDistance = window.innerHeight * 0.7; // 70vh trigger distance
        
        if (distanceFromFooter <= maxTriggerDistance) {
          setMousePosition({
            x: relativeX,
            y: relativeY,
          });
        } else {
          setMousePosition({ x: 0, y: 0 });
        }
      }
    };

    // Add global mouse move listener
    document.addEventListener('mousemove', handleGlobalMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative bg-accent md:h-[471px] h-[174px] overflow-hidden flex flex-col justify-end items-center"
    >
      {/* Invisible hover area above footer letters */}
      <div className="absolute bottom-0 left-0 right-0 h-[70vh] bg-transparent" />
      
      {/* Main HOMECROWD text */}
      <div className="absolute md:translate-y-[105px] translate-y-[40px] left-0 right-0 md:px-[35px] px-[15px] flex justify-center items-center">
        {"HOMECROWD".split("").map((letter, index) => (
          <Letter 
            key={index} 
            letter={letter} 
            index={index} 
            mousePosition={mousePosition}
            // @ts-ignore
            letterRefs={letterRefs}
          />
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

function Letter({ letter, index, mousePosition, letterRefs }: LetterProps) {
  const controls = useAnimation();
  const letterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // @ts-ignore
    letterRefs.current[index] = letterRef.current;
  }, [index, letterRefs]);

  useEffect(() => {
    if (!letterRef.current || mousePosition.x === 0) {
      controls.start({ y: 0 });
      return;
    }

    const letterRect = letterRef.current.getBoundingClientRect();
    const letterCenterX = letterRect.left + letterRect.width / 2;
    const letterCenterY = letterRect.top + letterRect.height / 2;
    
    // Get footer container to calculate relative position
    const footerElement = letterRef.current.closest('footer');
    if (!footerElement) return;
    
    const footerRect = footerElement.getBoundingClientRect();
    const relativeMouseX = mousePosition.x;
    const relativeMouseY = mousePosition.y;
    
    // Calculate distance from mouse to letter center
    const distanceX = Math.abs(relativeMouseX - (letterCenterX - footerRect.left));
    const distanceY = Math.abs(relativeMouseY - (letterCenterY - footerRect.top));
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Maximum distance for effect (adjust this to control the "wave radius")
    const maxDistance = 500;
    
    // Calculate lift amount based on distance (closer = higher lift)
    let liftAmount = 0;
    if (distance < maxDistance) {
      // Inverse relationship: closer mouse = higher lift
      const proximity = 1 - (distance / maxDistance);
      // Apply easing for smoother effect
      const easedProximity = proximity * proximity;
      liftAmount = easedProximity * -100; 
    }
    
    // Add wave effect based on letter position relative to mouse
    const letterIndex = index;
    const totalLetters = 9; // "HOMECROWD" has 9 letters
    const letterPosition = letterIndex / (totalLetters - 1); // 0 to 1
    
    // Calculate wave offset based on mouse Y position and letter position
    const mouseYNormalized = relativeMouseY / footerRect.height;
    const waveOffset = Math.sin((letterPosition * Math.PI * 2) + (mouseYNormalized * Math.PI)) * 10;
    
    const finalLift = liftAmount + waveOffset;
    
    controls.start({
      y: finalLift,
      transition: { 
        duration: 0.3, 
        ease: "easeOut",
        type: "spring",
        stiffness: 150,
        damping: 15
      },
    });

  }, [mousePosition, index, controls]);

  return (
    <motion.span
      ref={letterRef}
      className="relative inline-block align-bottom"
      initial={{ y: 0 }}
      animate={controls}
      style={{
        willChange: "transform",
        transformOrigin: "bottom center",
      }}
    >
      {/* <span className="md:text-[21.171875rem] text-[70px] text-[#222222] leading-[1] font-baikal-extracondensed-bold"> */}
      <span className="md:text-[19vw] text-[70px] text-[#222222] leading-[1] font-baikal-extracondensed-bold">
        {letter}
      </span>
    </motion.span>
  );
}
