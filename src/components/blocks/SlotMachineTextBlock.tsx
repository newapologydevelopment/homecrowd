'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlotMachineTextBlock as SlotMachineTextBlockType } from '@/types'

interface SlotMachineTextBlockProps {
  block: SlotMachineTextBlockType
}

export function SlotMachineTextBlock({ block }: SlotMachineTextBlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  const animationSpeed = block.animationSpeed || 2000
  const texts = block.rotatingTexts

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, animationSpeed)

    return () => clearInterval(interval)
  }, [texts.length, animationSpeed, isVisible])

  // Get previous, current, and next text for 3D effect
  const getPreviousIndex = () => (currentIndex - 1 + texts.length) % texts.length
  const getNextIndex = () => (currentIndex + 1) % texts.length

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          onViewportEnter={() => setIsVisible(true)}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Text Container with 3D Perspective */}
          <div className="relative h-32 flex items-center justify-center perspective-1000">
            <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-none">
              {/* Prefix */}
              {block.prefix && (
                <span className="mr-4">{block.prefix}</span>
              )}

              {/* Slot Machine Container */}
              <div className="inline-block relative slot-container">
                {/* Previous text (blurred, above) */}
                <motion.div
                  key={`prev-${getPreviousIndex()}`}
                  className="slot-text absolute inset-0 blur"
                  style={{
                    transform: 'translateY(-100%) rotateX(45deg) scale(0.8)',
                    transformOrigin: 'center bottom',
                  }}
                >
                  {texts[getPreviousIndex()]}
                </motion.div>

                {/* Current text (active, center) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`current-${currentIndex}`}
                    initial={{ 
                      y: 100, 
                      rotateX: -90, 
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{ 
                      y: 0, 
                      rotateX: 0, 
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{ 
                      y: -100, 
                      rotateX: 90, 
                      opacity: 0,
                      scale: 0.8,
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: 'easeInOut',
                      type: 'spring',
                      stiffness: 100,
                    }}
                    className="slot-text active relative"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {texts[currentIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Next text (blurred, below) */}
                <motion.div
                  key={`next-${getNextIndex()}`}
                  className="slot-text absolute inset-0 blur"
                  style={{
                    transform: 'translateY(100%) rotateX(-45deg) scale(0.8)',
                    transformOrigin: 'center top',
                  }}
                >
                  {texts[getNextIndex()]}
                </motion.div>
              </div>

              {/* Suffix */}
              {block.suffix && (
                <span className="ml-4">{block.suffix}</span>
              )}
            </div>
          </div>

          {/* Progress Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center mt-12 gap-2"
          >
            {texts.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-12' 
                    : 'bg-gray-300 w-8'
                }`}
              />
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Experience the future of home transformation with our innovative approach to design and construction.
          </motion.p>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating geometric shapes */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute top-1/4 left-10 w-32 h-32 border border-blue-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute bottom-1/4 right-10 w-24 h-24 border border-purple-200 rounded-full opacity-20"
        />
      </div>
    </section>
  )
}

