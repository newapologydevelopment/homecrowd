'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SanityImage } from '@/types'

interface StickyNavigationProps {
  logo: SanityImage
  ctaButton: {
    text: string
    link: string
  }
}

export function StickyNavigation({ logo, ctaButton }: StickyNavigationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      
      // Show navigation after hero section
      setIsVisible(scrollY > heroHeight * 0.8)
      
      // Change style after small scroll
      setIsScrolled(scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            'fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300',
            isScrolled 
              ? 'bg-white/95 backdrop-blur-md shadow-lg' 
              : 'bg-transparent'
          )}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center">
                <span className={cn(
                  'text-lg font-bold transition-colors duration-300',
                  isScrolled ? 'text-white' : 'text-black'
                )}>
                  H
                </span>
              </div>
              <span className={cn(
                'ml-2 text-xl font-semibold transition-colors duration-300',
                isScrolled ? 'text-gray-900' : 'text-white'
              )}>
                HomeCrowd
              </span>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="cta"
                size="cta"
                asChild
                className={cn(
                  'transition-all duration-300',
                  !isScrolled && 'bg-white text-gray-900 hover:bg-gray-100'
                )}
              >
                <a href={ctaButton.link} target="_blank" rel="noopener noreferrer">
                  {ctaButton.text}
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

