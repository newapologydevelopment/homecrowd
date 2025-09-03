'use client'

import { ValuePropositionBlock as ValuePropositionBlockType } from '@/types'

interface ValuePropositionBlockProps {
  block: ValuePropositionBlockType
}

export function ValuePropositionBlock({ block }: ValuePropositionBlockProps) {
  const { title_before_accent, title_accent_part, title_after_accent, description } = block

  return (
    <section className='mb-[268px]'>
      <h2 className='font-baikal-light text-[40px] text-center mb-[24px]'>
        {title_before_accent}{title_before_accent ? ' ' : ''}
        {title_accent_part && (
          <span className='font-baikal-light text-accent'>{title_accent_part}</span>
        )}
        {title_after_accent ? ` ${title_after_accent}` : ''}
      </h2>
      
      {description && (
        <p className='text-textDark text-center max-w-[1000px] mx-auto text-[20px] font-baikal-light leading-[29px]'>
          {description}
        </p>
      )}
    </section>
  )
}
