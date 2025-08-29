'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CTABlock as CTABlockType } from '@/types'

interface CTABlockProps {
  block: CTABlockType
}

export function CTABlock({ block }: CTABlockProps) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0">
        {block.backgroundMedia ? (
          <>
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
              <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800" />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900" />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {block.title}
          </h2>
          
          {block.description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-xl text-gray-200 mb-12 leading-relaxed max-w-2xl mx-auto"
            >
              {block.description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Button
              variant="cta"
              size="cta"
              asChild
              className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-12 py-4 shadow-2xl"
            >
              <motion.a
                href={block.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {block.buttonText}
              </motion.a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

