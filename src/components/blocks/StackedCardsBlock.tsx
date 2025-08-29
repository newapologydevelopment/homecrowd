'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { StackedCardsBlock as StackedCardsBlockType } from '@/types'

interface StackedCardsBlockProps {
  block: StackedCardsBlockType
}

export function StackedCardsBlock({ block }: StackedCardsBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Transform scroll progress to card indices
  const cardProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, block.cards.length - 1]
  )

  useEffect(() => {
    const unsubscribe = cardProgress.onChange((latest) => {
      const newIndex = Math.round(latest)
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < block.cards.length) {
        setActiveIndex(newIndex)
      }
    })

    return unsubscribe
  }, [cardProgress, activeIndex, block.cards.length])

  const isDark = block.variant === 'dark'

  return (
    <section 
      ref={containerRef}
      className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {block.eyebrowText && (
            <span className={`text-blue-400 font-semibold text-sm uppercase tracking-wider block mb-4`}>
              {block.eyebrowText}
            </span>
          )}
          {block.title && (
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {block.title}
            </h2>
          )}
        </motion.div>

        {/* Stacked Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Cards Stack */}
          <div className="relative h-[600px]">
            {block.cards.map((card, index) => {
              const isActive = index === activeIndex
              const offset = (index - activeIndex) * 20
              
              return (
                <motion.div
                  key={card._key}
                  className={`stacked-card absolute inset-0 rounded-2xl overflow-hidden shadow-xl ${
                    isActive ? 'active' : 'inactive'
                  }`}
                  style={{
                    zIndex: block.cards.length - index,
                  }}
                  animate={{
                    y: offset,
                    scale: isActive ? 1 : 0.95,
                    rotateX: isActive ? 0 : -5,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                  }}
                >
                  <div className={`h-full p-8 flex flex-col justify-center ${
                    isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                  }`}>
                    {card.eyebrowText && (
                      <span className={`font-semibold text-sm uppercase tracking-wider mb-4 ${
                        isActive && !isDark ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {card.eyebrowText}
                      </span>
                    )}
                    
                    <h3 className="text-3xl font-bold mb-6">
                      {card.title}
                    </h3>
                    
                    <p className={`text-lg leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {card.description}
                    </p>

                    {/* Progress indicator */}
                    <div className="mt-8">
                      <div className={`h-1 rounded-full overflow-hidden ${
                        isDark ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          className="h-full bg-blue-500"
                          initial={{ width: '0%' }}
                          animate={{ width: isActive ? '100%' : '0%' }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Media Display */}
          <div className="relative">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="aspect-video rounded-2xl overflow-hidden shadow-2xl"
            >
              {block.cards[activeIndex]?.media._type === 'file' ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  key={activeIndex} // Force re-render when card changes
                >
                  <source src="/mock-video.mp4" type="video/mp4" />
                </video>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
              )}
            </motion.div>

            {/* Card Navigation */}
            <div className="flex justify-center mt-8 gap-2">
              {block.cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-blue-500 w-8'
                      : `${isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

