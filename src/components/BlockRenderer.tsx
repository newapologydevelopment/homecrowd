import { PageBlock } from '@/types'
import { PreloaderBlock } from './blocks/PreloaderBlock'
import { HeroBlock } from './blocks/HeroBlock'
import { VideoTestimonialsBlock } from './blocks/VideoTestimonialsBlock'
import { AnimatedCardsBlock } from './blocks/AnimatedCardsBlock'
import { MarqueeBlock } from './blocks/MarqueeBlock'
import { StackedCardsBlock } from './blocks/StackedCardsBlock'
import { SlotMachineTextBlock } from './blocks/SlotMachineTextBlock'
import { CTABlock } from './blocks/CTABlock'
import { EmailSignupBlock } from './blocks/EmailSignupBlock'
import { FooterBlock } from './blocks/FooterBlock'

interface BlockRendererProps {
  block: PageBlock
  isPreloaderComplete?: boolean
  onPreloaderComplete?: () => void
}

export function BlockRenderer({ 
  block, 
  isPreloaderComplete = true,
  onPreloaderComplete 
}: BlockRendererProps) {
  console.log("block", block);
  switch (block._type) {
    case 'preloaderBlock':
      return (
        <PreloaderBlock 
          block={block} 
          onComplete={onPreloaderComplete || (() => {})} 
        />
      )
    
    case 'hero':
      return (
        <HeroBlock 
          block={block} 
          isVisible={isPreloaderComplete} 
        />
      )
    
    case 'videoTestimonialsBlock':
      return <VideoTestimonialsBlock block={block} />
    
    case 'animatedCards':
      return <AnimatedCardsBlock block={block} />
    
    case 'marqueeBlock':
      return <MarqueeBlock block={block} />
    
    case 'stackedCards':
      return <StackedCardsBlock block={block} />
    
    case 'slotMachineText':
      return <SlotMachineTextBlock block={block} />
    
    case 'cta':
      return <CTABlock block={block} />
    
    case 'emailSignup':
      return <EmailSignupBlock block={block} />
    
    case 'footer':
      return <FooterBlock block={block} />
    
    default:
      console.warn(`Unknown block type: ${(block as any)._type}`)
      return null
  }
}

