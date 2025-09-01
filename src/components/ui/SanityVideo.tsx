'use client'

import type { SanityVideo as SanityVideoType } from '@/types'

interface SanityVideoProps {
  video: SanityVideoType
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  controls?: boolean
  poster?: string
}

export function SanityVideo({ 
  video, 
  className = '', 
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  controls = false,
  poster
}: SanityVideoProps) {
  if (!video || !video.asset) return null

  // For file type videos, we need to construct the URL
  // This assumes the asset has a url property or we need to fetch it
  const videoUrl = video.asset.url || `https://cdn.sanity.io/files/mftmflti/production/${video.asset._ref.replace('file-', '')}.mp4`
  
  return (
    <video
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      poster={poster}
    >
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
