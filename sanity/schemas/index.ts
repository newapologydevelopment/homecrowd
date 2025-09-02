import { page } from './documents/page'
import { preloaderBlock } from './blocks/preloaderBlock'
import { heroBlock } from './blocks/heroBlock'
import { videoTestimonialsBlock } from './blocks/videoTestimonialsBlock'
import { animatedCardsBlock } from './blocks/animatedCardsBlock'
import { marqueeBlock } from './blocks/marqueeBlock'
import { stackedCardsBlock } from './blocks/stackedCardsBlock'
import { slotMachineTextBlock } from './blocks/slotMachineTextBlock'
import { ctaBlock } from './blocks/ctaBlock'
import { emailSignupBlock } from './blocks/emailSignupBlock'
import { footerBlock } from './blocks/footerBlock'
import { mediaUnion } from './objects/mediaUnion'
import { seoSettings } from './objects/seoSettings'
import { scheduleButton } from './objects/scheduleButton'

export const schemaTypes = [
  // Documents
  page,
  
  // Blocks
  preloaderBlock,
  heroBlock,
  videoTestimonialsBlock,
  animatedCardsBlock,
  marqueeBlock,
  stackedCardsBlock,
  slotMachineTextBlock,
  ctaBlock,
  emailSignupBlock,
  footerBlock,
  
  // Objects
  mediaUnion,
  seoSettings,
  scheduleButton,
]

