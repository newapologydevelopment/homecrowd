'use client'

import { useEffect } from 'react'
import { getImageUrl } from '@/lib/sanity'

interface SEOHeadProps {
  favicon?: {
    asset: any
    alt?: string
  }
  appleTouchIcon?: {
    asset: any
    alt?: string
  }
}

export function SEOHead({ favicon, appleTouchIcon }: SEOHeadProps) {
  useEffect(() => {
    // Update favicon dynamically
    if (favicon?.asset) {
      const faviconUrl = getImageUrl(favicon.asset, 32, 32)
      if (faviconUrl) {
        // Remove existing favicon links
        const existingFavicons = document.querySelectorAll('link[rel*="icon"]')
        existingFavicons.forEach(link => link.remove())
        
        // Add new favicon
        const link = document.createElement('link')
        link.rel = 'icon'
        link.type = 'image/png'
        link.sizes = '32x32'
        link.href = faviconUrl
        document.head.appendChild(link)
      }
    }

    // Update Apple Touch Icon dynamically
    if (appleTouchIcon?.asset) {
      const appleTouchIconUrl = getImageUrl(appleTouchIcon.asset, 180, 180)
      if (appleTouchIconUrl) {
        // Remove existing apple touch icon
        const existingAppleIcon = document.querySelector('link[rel="apple-touch-icon"]')
        if (existingAppleIcon) {
          existingAppleIcon.remove()
        }
        
        // Add new apple touch icon
        const link = document.createElement('link')
        link.rel = 'apple-touch-icon'
        link.sizes = '180x180'
        link.href = appleTouchIconUrl
        document.head.appendChild(link)
      }
    }
  }, [favicon, appleTouchIcon])

  return null
}
