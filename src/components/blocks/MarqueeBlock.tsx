"use client";

import { motion } from "framer-motion";
import { MarqueeBlock as MarqueeBlockType } from "@/types";
import { SanityLogo } from "../ui/SanityLogo";

interface MarqueeBlockProps {
  block: MarqueeBlockType;
}

export function MarqueeBlock({ block }: MarqueeBlockProps) {
  const speed = block.speed || 200;
  const color = block.color || "#00C8FF";
  const direction = block.direction || "left";

  // Calculate animation duration based on speed
  const duration = (100 / speed) * 20;

  return (
    <section className=" text-accent  overflow-hidden h-[152px] relative">
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
              {/* Logo separator */}
              {block.logo && (
                <div className="mx-[63px]">
                  <SanityLogo
                    logo={block.logo}
                    // className="w-8 h-8 object-contain"
                    alt="Logo"
                  />
                </div>
              )}

              <span
                style={{ color: color }}
                className="font-baikal-extracondensed-bold text-[143px]"
              >
                {block.text}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
