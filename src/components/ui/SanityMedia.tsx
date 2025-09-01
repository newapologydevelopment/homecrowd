'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { MediaUnion } from '@/types'

interface SanityMediaProps {
  media: MediaUnion
  className?: string
  alt?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
}

export function SanityMedia({ 
  media, 
  className = '', 
  alt = '', 
  fill = false,
  sizes = '100vw',
  priority = false
}: SanityMediaProps) {
  if (!media) return null

  if (media._type === 'image') {
    const imageUrl = urlFor(media).url()
    
    if (fill) {
      return (
        <Image
          src={imageUrl}
          alt={alt || media.alt || ''}
          fill
          className={className}
          sizes={sizes}
          priority={priority}
        />
      )
    }

    return (
      <Image
        src={imageUrl}
        alt={alt || media.alt || ''}
        width={800}
        height={600}
        className={className}
        priority={priority}
      />
    )
  }

  if (media._type === 'file') {
    return (
      <video
        className={className}
        autoPlay
        muted
        loop
        playsInline
        poster={media.title ? undefined : undefined}
      >
        <source src={media.asset.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }

  return null
}
