"use client";

import { motion } from "framer-motion";
import { MarqueeBlock as MarqueeBlockType } from "@/types";

interface MarqueeBlockProps {
  block: MarqueeBlockType;
}

export function MarqueeBlock({ block }: MarqueeBlockProps) {
  const speed = block.speed || 50;
  const direction = block.direction || "left";

  // Calculate animation duration based on speed
  const duration = (100 / speed) * 20;

  return (
    <section className="py-12 bg-gray-900 overflow-hidden">
      <div className="relative">
        {/* Marquee Container */}
        <div className="flex whitespace-nowrap">
          {/* Repeated text elements for seamless loop */}
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="flex items-center shrink-0"
              animate={{
                x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Text with separators */}
              <div className="flex items-center text-white text-2xl md:text-4xl font-bold tracking-wider">
                <span className="px-8">{block.text}</span>

                {/* Logo separator */}
                {block.logo && (
                  <div className="px-8">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-gray-900 text-lg font-bold">H</span>
                    </div>
                  </div>
                )}

                <span className="px-8 font-baikal-extracondensed-bold text-[143px]">
                  {block.text}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gradient overlays for smooth edge effect */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10" />
      </div>
    </section>
  );
}
