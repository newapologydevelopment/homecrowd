'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PreloaderBlock as PreloaderBlockType } from '@/types'

interface PreloaderBlockProps {
  block: PreloaderBlockType
  onComplete: () => void
}

export function PreloaderBlock({ block, onComplete }: PreloaderBlockProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = block.duration || 3000
    const interval = 50
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment
        if (newProgress >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsLoading(false)
            setTimeout(onComplete, 800) // Wait for exit animation
          }, 500)
          return 100
        }
        return newProgress
      })
    }, interval)

    return () => clearInterval(timer)
  }, [block.duration, onComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          {/* Background Video/Image */}
          <div className="absolute inset-0 overflow-hidden">
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
              <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
            )}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Logo Mask */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              {/* Logo Container */}
              <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-4xl font-bold text-gray-900"
                >
                  H
                </motion.div>
              </div>

              {/* Company Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-6 text-center"
              >
                <h1 className="text-3xl font-bold text-white tracking-wider">
                  HomeCrowd
                </h1>
                <div className="mt-2 text-sm text-gray-300 tracking-widest uppercase">
                  Transform Your Space
                </div>
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 w-64"
            >
              <div className="h-px bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
              <div className="mt-2 text-center text-xs text-gray-400">
                {Math.round(progress)}%
              </div>
            </motion.div>
          </div>

          {/* Expanding Reveal */}
          <motion.div
            initial={{ scale: 0, borderRadius: '50%' }}
            animate={progress === 100 ? { scale: 20, borderRadius: '0%' } : {}}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-white origin-center"
            style={{ zIndex: progress === 100 ? 5 : -1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

