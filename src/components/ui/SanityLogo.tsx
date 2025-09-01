'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { SanityImage } from '@/types'

interface SanityLogoProps {
  logo: SanityImage
  className?: string
  alt?: string
  width?: number
  height?: number
  priority?: boolean
}

export function SanityLogo({ 
  logo, 
  className = '', 
  alt = 'Logo',
  width = 200,
  height = 60,
  priority = false
}: SanityLogoProps) {
  if (!logo || !logo.asset) return null

  const imageUrl = urlFor(logo).url()
  
  return (
    <Image
      src={imageUrl}
      alt={alt || logo.alt || 'Logo'}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
