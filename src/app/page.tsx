'use client'

import { useState, useEffect } from 'react'
import { mockPageData, mockNavigation } from '@/data/mockData'
import { BlockRenderer } from '@/components/BlockRenderer'
import { StickyNavigation } from '@/components/navigation/StickyNavigation'

export default function HomePage() {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false)
  const [smoothScrollEnabled, setSmoothScrollEnabled] = useState(false)

  // Enable smooth scroll after preloader
  useEffect(() => {
    if (isPreloaderComplete) {
      const timer = setTimeout(() => {
        setSmoothScrollEnabled(true)
        // Initialize Lenis smooth scroll (when available)
        if (typeof window !== 'undefined') {
          document.documentElement.style.scrollBehavior = 'smooth'
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isPreloaderComplete])

  const handlePreloaderComplete = () => {
    setIsPreloaderComplete(true)
  }

  // Find preloader block
  const preloaderBlock = mockPageData.blocks.find(block => block._type === 'preloader')
  const otherBlocks = mockPageData.blocks.filter(block => block._type !== 'preloader')

  return (
    <main className="min-h-screen">
      {/* Preloader */}
      {!isPreloaderComplete && preloaderBlock && (
        <BlockRenderer 
          block={preloaderBlock} 
          onPreloaderComplete={handlePreloaderComplete}
        />
      )}

      {/* Main Content */}
      {isPreloaderComplete && (
        <>
          {/* Sticky Navigation */}
          <StickyNavigation 
            logo={mockNavigation.logo}
            ctaButton={mockNavigation.ctaButton}
          />

          {/* Page Blocks */}
          <div className={smoothScrollEnabled ? 'smooth-scroll-enabled' : ''}>
            {otherBlocks.map((block) => (
              <BlockRenderer 
                key={block._key} 
                block={block}
                isPreloaderComplete={isPreloaderComplete}
              />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

