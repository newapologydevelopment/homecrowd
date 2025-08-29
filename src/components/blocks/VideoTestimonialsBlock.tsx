'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { VideoTestimonialsBlock as VideoTestimonialsBlockType } from '@/types'

interface VideoTestimonialsBlockProps {
  block: VideoTestimonialsBlockType
}

export function VideoTestimonialsBlock({ block }: VideoTestimonialsBlockProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null)

  const autoplayOptions = {
    delay: block.autoplayInterval || 5000,
    stopOnInteraction: false,
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      containScroll: 'trimSnaps',
    },
    block.autoplay ? [Autoplay(autoplayOptions)] : []
  )

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        {block.title && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {block.title}
            </h2>
          </motion.div>
        )}

        {/* Video Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {block.videos.map((video, index) => (
                <div
                  key={video._key}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <motion.div
                    className={`testimonial-video rounded-2xl overflow-hidden shadow-xl ${
                      index === selectedIndex ? 'active' : 'inactive'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Video Container */}
                    <div className="relative aspect-video bg-gray-900 group cursor-pointer">
                      {/* Mock Video Thumbnail */}
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                          <p className="text-white font-semibold text-lg">
                            {video.institution}
                          </p>
                        </div>
                      </div>

                      {/* Play Button Overlay */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                              <Play className="w-8 h-8 text-gray-900 ml-1" />
                            </div>
                          </motion.div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-full p-0">
                          <div className="aspect-video bg-black">
                            <video
                              className="w-full h-full"
                              controls
                              autoPlay
                            >
                              <source src="/mock-video.mp4" type="video/mp4" />
                            </video>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Institution Label */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h3 className="text-white font-semibold text-lg">
                          {video.institution}
                        </h3>
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    {(video.testimonialText || video.authorName) && (
                      <div className="p-6 bg-white">
                        {video.testimonialText && (
                          <blockquote className="text-gray-700 mb-4 text-lg leading-relaxed">
                            "{video.testimonialText}"
                          </blockquote>
                        )}
                        {video.authorName && (
                          <div className="flex items-center">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {video.authorName}
                              </p>
                              {video.authorRole && (
                                <p className="text-gray-600 text-sm">
                                  {video.authorRole}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {block.videos.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

