// Media types
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanityVideo {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
    url?: string; // extract via asset->url in GROQ, then it will be string
  };
  title?: string;
}

export type MediaUnion = SanityImage | SanityVideo;

// --------------------
// BackgroundMedia (discriminated union)
// --------------------
export type BackgroundMediaImage = {
  mediaType: 'image';
  image: SanityImage;
  video: null;
};

export type BackgroundMediaVideo = {
  mediaType: 'video';
  image: null;
  video: SanityVideo;
};

export type BackgroundMedia = BackgroundMediaImage | BackgroundMediaVideo;

// Optional: type guards (convenient in JSX)
export const isBGImage = (bm: BackgroundMedia | null | undefined): bm is BackgroundMediaImage =>
  !!bm && bm.mediaType === 'image';

export const isBGVideo = (bm: BackgroundMedia | null | undefined): bm is BackgroundMediaVideo =>
  !!bm && bm.mediaType === 'video';

// --------------------
// Block types for modular content
// --------------------
export interface PreloaderBlock {
  _type: 'preloaderBlock';
  _key: string;
  logo: SanityImage;
  preloader_title: string;
  preloader_subtitle?: string;
  backgroundMedia: BackgroundMedia | null; // allow null if sometimes missing
  duration?: number;
}

export interface HeroBlock {
  _type: 'hero';
  _key: string;
  backgroundMedia: MediaUnion; // hero is fine with any media
  title?: string;
  subtitle?: string;
}

export interface VideoTestimonialsBlock {
  _type: 'videoTestimonialsBlock'; // make sure this matches CMS
  _key: string;
  title?: string;
  videos: Array<{
    _key: string;
    video: SanityVideo;
    institution: string;
    testimonialText?: string;
    authorName?: string;
    authorRole?: string;
  }>;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export interface AnimatedCardsBlock {
  _type: 'animatedCardsBlock';
  _key: string;
  title?: string;
  cards: Array<{
    _key: string;
    title: string;
    description: string;
    media: MediaUnion;
    eyebrowText?: string;
  }>;
}

export interface MarqueeBlock {
  _type: 'marqueeBlock';
  _key: string;
  text: string;
  logo?: SanityImage;
  color?: string;
  speed?: number;
  direction?: 'left' | 'right';
}

export interface StackedCardsBlock {
  _type: 'stackedCardsBlock';
  _key: string;
  title?: string;
  eyebrowText?: string;
  cards: Array<{
    _key: string;
    title: string;
    description: string;
    image: SanityImage;
    variant?: 'light' | 'dark';
    eyebrowText?: string;
  }>;
}

export interface SlotMachineTextBlock {
  _type: 'slotMachineTextBlock';
  _key: string;
  items: Array<{
    _key?: string;
    number: string;
    text: string;
  }>;
}

export interface CTABlock {
  _type: 'ctaBlock';
  _key: string;
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  backgroundMedia?: MediaUnion;
}

export interface EmailSignupBlock {
  _type: 'emailSignupBlock';
  _key: string;
  title: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
}

export interface FooterBlock {
  _type: 'footerBlock';
  _key: string;
  copyrightText?: string;
  contactEmail?: string;
}

export interface ValuePropositionBlock {
  _type: 'valuePropositionBlock';
  _key: string;
  title_before_accent?: string;
  title_accent_part?: string;
  title_after_accent?: string;
  description?: string;
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
  | ValuePropositionBlock;

// Schedule Button type
export interface ScheduleButton {
  title: string;
  link: string;
}

// Page data structure
export interface PageData {
  _id: string;
  title: string;
  slug: { current: string };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: SanityImage;
    favicon?: {
      asset: any
      alt?: string
    }
    appleTouchIcon?: {
      asset: any
      alt?: string
    }
  };
  logo?: SanityImage;
  scheduleButton?: ScheduleButton;
  blocks: PageBlock[];
}

// Navigation types
export interface StickyNavigation {
  logo: SanityImage;
  ctaButton: { text: string; link: string };
  isVisible: boolean;
  isScrolled: boolean;
}

// Animation state types
export interface AnimationState {
  isVisible: boolean;
  hasAnimated: boolean;
  progress?: number;
}

// Carousel types
export interface CarouselState {
  currentIndex: number;
  isPlaying: boolean;
  direction: 'next' | 'prev';
}

// Form types
export interface EmailFormData {
  email: string;
}

export interface EmailFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error?: string;
}
