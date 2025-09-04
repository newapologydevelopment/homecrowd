'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HeroBlock as HeroBlockType } from '@/types'

interface HeroBlockProps {
  block: HeroBlockType
  isVisible: boolean
}

export function HeroBlock({ block, isVisible }: HeroBlockProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsLoaded(true), 500)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0">
        {block.backgroundMedia._type === 'file' ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/mock-video.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200" />
        )}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {block.title || 'Transform Your Space'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
          >
            {block.subtitle || 'Premium home transformation services that bring your vision to life'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Get Started
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
        <p className="text-white text-sm mt-2 text-center">Scroll to explore</p>
      </motion.div>
    </section>
  )
}

