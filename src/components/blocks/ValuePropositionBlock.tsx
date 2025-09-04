'use client'

import { ValuePropositionBlock as ValuePropositionBlockType } from '@/types'
import { motion } from 'framer-motion'

interface ValuePropositionBlockProps {
  block: ValuePropositionBlockType
}

export function ValuePropositionBlock({ block }: ValuePropositionBlockProps) {
  const { title_before_accent, title_accent_part, title_after_accent, description } = block

  return (
    <section className="mt-[165px] mb-[268px] px-[30px] md:px-0">
      <motion.h2
        className="font-baikal-light md:text-[40px] text-[20px] text-center max-w-[250px] md:max-w-none mx-auto md:mx-0 mb-[24px] leading-[22px] md:leading-[100%]"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {title_before_accent}{title_before_accent ? ' ' : ''}
        {title_accent_part && (
          <span className="font-baikal-light text-accent">{title_accent_part}</span>
        )}
        {title_after_accent ? ` ${title_after_accent}` : ''}
      </motion.h2>

      {description && (
        <motion.p
          className="text-textDark text-center max-w-[1000px] mx-auto md:text-[20px] text-[14px] font-baikal-light md:leading-[29px] leading-[140%]"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
      )}
    </section>
  )
}
