// Media types
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanityVideo {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
    url?: string
  }
  title?: string
}

export type MediaUnion = SanityImage | SanityVideo

// Block types for modular content
export interface PreloaderBlock {
  _type: 'preloader'
  _key: string
  logo: SanityImage
  backgroundMedia: MediaUnion
  duration?: number
}

export interface HeroBlock {
  _type: 'hero'
  _key: string
  backgroundMedia: MediaUnion
  title?: string
  subtitle?: string
}

export interface VideoTestimonialsBlock {
  _type: 'videoTestimonials'
  _key: string
  title?: string
  videos: Array<{
    _key: string
    video: SanityVideo
    institution: string
    testimonialText?: string
    authorName?: string
    authorRole?: string
  }>
  autoplay?: boolean
  autoplayInterval?: number
}

export interface AnimatedCardsBlock {
  _type: 'animatedCards'
  _key: string
  title?: string
  cards: Array<{
    _key: string
    title: string
    description: string
    media: MediaUnion
    eyebrowText?: string
  }>
}

export interface MarqueeBlock {
  _type: 'marquee'
  _key: string
  text: string
  logo?: SanityImage
  speed?: number
  direction?: 'left' | 'right'
}

export interface StackedCardsBlock {
  _type: 'stackedCards'
  _key: string
  title?: string
  eyebrowText?: string
  cards: Array<{
    _key: string
    title: string
    description: string
    media: MediaUnion
    eyebrowText?: string
  }>
  variant?: 'light' | 'dark'
}

export interface SlotMachineTextBlock {
  _type: 'slotMachineText'
  _key: string
  prefix?: string
  suffix?: string
  rotatingTexts: string[]
  animationSpeed?: number
}

export interface CTABlock {
  _type: 'cta'
  _key: string
  title: string
  description?: string
  buttonText: string
  buttonLink: string
  backgroundMedia?: MediaUnion
}

export interface EmailSignupBlock {
  _type: 'emailSignup'
  _key: string
  title: string
  description?: string
  placeholder?: string
  buttonText?: string
  successMessage?: string
}

export interface FooterBlock {
  _type: 'footer'
  _key: string
  copyrightText?: string
  contactEmail?: string
}

// Union type for all blocks
export type PageBlock = 
  | PreloaderBlock
  | HeroBlock
  | VideoTestimonialsBlock
  | AnimatedCardsBlock
  | MarqueeBlock
  | StackedCardsBlock
  | SlotMachineTextBlock
  | CTABlock
  | EmailSignupBlock
  | FooterBlock

// Page data structure
export interface PageData {
  _id: string
  title: string
  slug: {
    current: string
  }
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: SanityImage
  }
  blocks: PageBlock[]
}

// Navigation types
export interface StickyNavigation {
  logo: SanityImage
  ctaButton: {
    text: string
    link: string
  }
  isVisible: boolean
  isScrolled: boolean
}

// Animation state types
export interface AnimationState {
  isVisible: boolean
  hasAnimated: boolean
  progress?: number
}

// Carousel types
export interface CarouselState {
  currentIndex: number
  isPlaying: boolean
  direction: 'next' | 'prev'
}

// Form types
export interface EmailFormData {
  email: string
}

export interface EmailFormState {
  isSubmitting: boolean
  isSuccess: boolean
  error?: string
}

