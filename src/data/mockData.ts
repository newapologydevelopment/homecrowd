import { PageData, PageBlock } from '@/types'

// Mock Sanity image reference
const createMockImage = (filename: string) => ({
  _type: 'image' as const,
  asset: {
    _ref: 'image-placeholder0000000001-1920x1080-jpg',
    _type: 'reference' as const,
  },
  alt: `Mock image: ${filename}`,
})

// Mock Sanity video reference
const createMockVideo = (filename: string) => ({
  _type: 'file' as const,
  asset: {
    _ref: `file-${filename}`,
    _type: 'reference' as const,
    url: `/mock-video.mp4`,
  },
  title: `Mock video: ${filename}`,
})

// Mock blocks data
export const mockBlocks: PageBlock[] = [


  // Hero
  {
    _type: 'hero',
    _key: 'hero-1',
    backgroundMedia: createMockVideo('hero-main'),
    title: 'Transform Your Space with HomeCrowd',
    subtitle: 'Premium home transformation services that bring your vision to life',
  },

  // Video Testimonials
  {
    _type: 'videoTestimonialsBlock',
    _key: 'testimonials-1',
    title: 'What Our Clients Say',
    autoplay: true,
    autoplayInterval: 5000,
    videos: [
      {
        _key: 'testimonial-1',
        muxPlaybackId: 'cLbG6RpaDcNDue2CiqvyD3K5sCgEL0079WVs3TkJ8gec',
        institution: 'Harvard University',
        testimonialText: 'HomeCrowd transformed our campus housing completely. The attention to detail was exceptional.',
        authorName: 'Dr. Sarah Johnson',
        authorRole: 'Campus Housing Director',
      },
      {
        _key: 'testimonial-2',
        muxPlaybackId: 'JkiNPQT01KtYZl7xUU6E7qh2r0102u2jL028NEOqirHWNE8',
        institution: 'MIT',
        testimonialText: 'The innovative solutions and premium quality exceeded all our expectations.',
        authorName: 'Prof. Michael Chen',
        authorRole: 'Facilities Manager',
      },
    ],
  },

  // Animated Cards
  {
    _type: 'animatedCardsBlock',
    _key: 'cards-1',
    title: 'Why Choose HomeCrowd',
    cards: [
      {
        _key: 'card-1',
        title: 'Premium Quality',
        description: 'We use only the finest materials and work with skilled craftsmen to ensure exceptional results.',
        media: createMockImage('quality-materials'),
        eyebrowText: 'Excellence',
      },
      {
        _key: 'card-2',
        title: 'Innovative Design',
        description: 'Our design team creates unique solutions tailored to your specific needs and lifestyle.',
        media: createMockVideo('design-process'),
        eyebrowText: 'Innovation',
      },
      {
        _key: 'card-3',
        title: 'Timely Delivery',
        description: 'We respect your time and always deliver projects on schedule without compromising quality.',
        media: createMockImage('project-timeline'),
        eyebrowText: 'Reliability',
      },
    ],
  },

  // Marquee
  {
    _type: 'marqueeBlock',
    _key: 'marquee-1',
    text: 'Transform Your Space • Premium Quality • Innovative Design • Exceptional Service',
    logo: createMockImage('homecrowd-icon'),
    speed: 50,
    direction: 'left',
  },

  // Stacked Cards (How it works)
  {
    _type: 'stackedCardsBlock',
    _key: 'stacked-1',
    title: 'How It Works',
    eyebrowText: 'Our Process',
    cards: [
      {
        _key: 'stack-1',
        title: 'Consultation & Planning',
        description: 'We start with a detailed consultation to understand your vision, needs, and budget. Our team creates a comprehensive plan tailored to your space.',
        image: createMockImage('consultation'),
        variant: 'light',
        eyebrowText: 'Step 01',
      },
      {
        _key: 'stack-2',
        title: 'Design & Development',
        description: 'Our designers create detailed plans and 3D visualizations so you can see exactly how your space will look before we begin construction.',
        image: createMockImage('design-3d'),
        variant: 'light',
        eyebrowText: 'Step 02',
      },
      {
        _key: 'stack-3',
        title: 'Construction & Completion',
        description: 'Our skilled craftsmen bring the design to life with meticulous attention to detail, ensuring every element is perfect.',
        image: createMockImage('construction'),
        variant: 'light',
        eyebrowText: 'Step 03',
      },
    ],
  },

  // Slot Machine
  {
    _type: 'slotMachineTextBlock',
    _key: 'slot-1',
    items: [
      { number: '1,200,000', text: 'in savings' },
      { number: '250', text: 'projects delivered' },
      { number: '98%', text: 'satisfaction' },
      { number: '24', text: 'months warranty' },
    ],
  },

  // Stacked Cards (Dark version)
  {
    _type: 'stackedCardsBlock',
    _key: 'stacked-2',
    title: 'Our Services',
    eyebrowText: 'What We Offer',
    cards: [
      {
        _key: 'dark-1',
        title: 'Residential Renovation',
        description: 'Complete home makeovers from kitchen and bathroom renovations to whole-house transformations.',
        image: createMockImage('residential'),
        variant: 'dark',
        eyebrowText: 'Homes',
      },
      {
        _key: 'dark-2',
        title: 'Commercial Spaces',
        description: 'Office buildings, retail spaces, and hospitality venues designed for maximum impact and functionality.',
        image: createMockImage('commercial'),
        variant: 'dark',
        eyebrowText: 'Business',
      },
      {
        _key: 'dark-3',
        title: 'Educational Facilities',
        description: 'Universities, schools, and learning centers designed to inspire and facilitate education.',
        image: createMockImage('educational'),
        variant: 'dark',
        eyebrowText: 'Education',
      },
    ],
  },

  // CTA
  {
    _type: 'ctaBlock',
    _key: 'cta-1',
    title: 'Ready to Transform Your Space?',
    description: 'Schedule a consultation with our experts and see how HomeCrowd can bring your vision to life.',
    buttonText: 'Schedule a Demo',
    buttonLink: 'https://calendly.com/homecrowd/consultation',
    backgroundMedia: { mediaType: 'image' as const, image: createMockImage('cta-background'), video: null },
  },

  // Email Signup
  {
    _type: 'emailSignupBlock',
    _key: 'email-1',
    title: 'Stay Updated',
    description: 'Get the latest design trends and project updates delivered to your inbox.',
    placeholder: 'Enter your email address',
    buttonText: 'Subscribe',
    successMessage: 'Thank you for subscribing! We\'ll be in touch soon.',
  },

  // Footer
  {
    _type: 'footerBlock',
    _key: 'footer-1',
    copyrightText: '©2025 HOMECROWD. ALL RIGHTS RESERVED',
    contactEmail: 'INFO@HOMECROWD.ONLINE',
  },
]

// Main page data
export const mockPageData: PageData = {
  _id: 'homepage',
  title: 'HomeCrowd - Homepage',
  slug: {
    current: 'homepage',
  },
  seo: {
    title: 'HomeCrowd - Transform Your Space with Premium Design',
    description: 'Experience premium home transformation services with HomeCrowd. From consultation to completion, we create beautiful, functional spaces that inspire.',
    keywords: [
      'home renovation',
      'interior design',
      'home transformation',
      'premium renovation',
      'residential design',
      'commercial spaces',
      'educational facilities',
    ],
    ogImage: createMockImage('og-homepage'),
  },
  blocks: mockBlocks,
}

// Navigation data
export const mockNavigation = {
  logo: createMockImage('homecrowd-logo'),
  ctaButton: {
    text: 'Schedule a Demo',
    link: 'https://calendly.com/homecrowd/consultation',
  },
}

